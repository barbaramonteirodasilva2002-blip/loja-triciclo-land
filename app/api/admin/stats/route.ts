import { NextRequest, NextResponse } from "next/server"
import { sql, ensureSchema } from "@/lib/db"

const FUNNEL_STEPS = ["checkout", "dados_pessoais", "entrega", "pagamento", "comprou"] as const
const FUNNEL_LABELS: Record<(typeof FUNNEL_STEPS)[number], string> = {
  checkout: "Checkout",
  dados_pessoais: "Dados pessoais",
  entrega: "Entrega",
  pagamento: "Pagamento",
  comprou: "Comprou",
}

const RANGE_LABELS: Record<string, string> = {
  today: "hoje",
  yesterday: "ontem",
  week: "na semana",
  month: "no mês",
  year: "no ano",
  custom: "no período",
}

function getDateBounds(range: string, customDate: string | null): { from: Date; to: Date } {
  const now = new Date()

  if (range === "custom" && customDate && /^\d{4}-\d{2}-\d{2}$/.test(customDate)) {
    const from = new Date(`${customDate}T00:00:00`)
    const to = new Date(`${customDate}T23:59:59.999`)
    return { from, to }
  }

  if (range === "yesterday") {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    start.setDate(start.getDate() - 1)
    const end = new Date()
    end.setHours(0, 0, 0, 0)
    return { from: start, to: end }
  }

  if (range === "week") {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    const day = start.getDay()
    const diffToMonday = day === 0 ? 6 : day - 1
    start.setDate(start.getDate() - diffToMonday)
    return { from: start, to: now }
  }

  if (range === "month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    return { from: start, to: now }
  }

  if (range === "year") {
    const start = new Date(now.getFullYear(), 0, 1)
    return { from: start, to: now }
  }

  // "today" (padrão)
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  return { from: start, to: now }
}

export async function GET(request: NextRequest) {
  await ensureSchema()

  const { searchParams } = request.nextUrl
  const range = searchParams.get("range") ?? "today"
  const customDate = searchParams.get("date")
  const { from, to } = getDateBounds(range, customDate)

  const [onlineRows, funnelRows, orderStatusRows, kitRows, abandonedRows, recentOrdersRows] = await Promise.all([
    sql`select count(*)::int as count from sessions where last_seen_at > now() - interval '60 seconds'`,
    sql`
      select step, count(distinct session_id)::int as count
      from checkout_events
      where created_at > now() - interval '10 minutes'
      group by step
    `,
    sql`
      select status, count(*)::int as count, coalesce(sum(total),0)::float as total
      from orders
      where created_at >= ${from.toISOString()} and created_at <= ${to.toISOString()}
      group by status
    `,
    sql`
      select kit_id, count(*)::int as count
      from orders
      where created_at >= ${from.toISOString()} and created_at <= ${to.toISOString()}
      group by kit_id
    `,
    sql`
      select session_id, items, customer_name, customer_email, customer_phone, updated_at
      from carts
      where status = 'active' and updated_at < now() - interval '30 minutes'
      order by updated_at desc
      limit 20
    `,
    sql`
      select id, status, kit_label, customer_name, customer_phone, payment_method, total::float as total, created_at
      from orders
      where created_at >= ${from.toISOString()} and created_at <= ${to.toISOString()}
      order by created_at desc
      limit 15
    `,
  ])

  const funnelCounts = new Map(funnelRows.map((r) => [r.step as string, r.count as number]))
  const funnel = FUNNEL_STEPS.map((step) => ({
    step,
    label: FUNNEL_LABELS[step],
    count: funnelCounts.get(step) ?? 0,
  }))

  const ordersByStatus = new Map(orderStatusRows.map((r) => [r.status as string, { count: r.count as number, total: r.total as number }]))
  const pago = ordersByStatus.get("pago") ?? { count: 0, total: 0 }
  const pendente = ordersByStatus.get("pendente") ?? { count: 0, total: 0 }
  const cancelado = ordersByStatus.get("cancelado") ?? { count: 0, total: 0 }
  const totalOrders = pago.count + pendente.count + cancelado.count

  return NextResponse.json({
    ok: true,
    onlineNow: onlineRows[0]?.count ?? 0,
    range,
    rangeLabel: RANGE_LABELS[range] ?? RANGE_LABELS.today,
    funnel,
    funnelWindowMinutes: 10,
    orders: {
      pago,
      pendente,
      cancelado,
      total: totalOrders,
    },
    salesByKit: kitRows.map((r) => ({ kitId: r.kit_id as string, count: r.count as number })),
    abandonedCarts: abandonedRows.map((r) => ({
      sessionId: r.session_id as string,
      items: r.items,
      customerName: r.customer_name as string | null,
      customerEmail: r.customer_email as string | null,
      customerPhone: r.customer_phone as string | null,
      updatedAt: r.updated_at as string,
    })),
    recentOrders: recentOrdersRows.map((r) => ({
      id: r.id as number,
      status: r.status as string,
      kitLabel: r.kit_label as string,
      customerName: r.customer_name as string,
      customerPhone: r.customer_phone as string | null,
      paymentMethod: r.payment_method as string,
      total: r.total as number,
      createdAt: r.created_at as string,
    })),
  })
}
