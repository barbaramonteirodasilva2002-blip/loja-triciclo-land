import { NextRequest, NextResponse } from "next/server"
import { sql, ensureSchema } from "@/lib/db"
import { reportOrderToUtmify, type UtmifyOrderStatus } from "@/lib/utmify"

const VALID_STATUSES = new Set(["pendente", "pago", "cancelado"])
const UTMIFY_STATUS: Record<string, UtmifyOrderStatus> = {
  pendente: "waiting_payment",
  pago: "paid",
  cancelado: "refused",
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json().catch(() => null)
  const status = body?.status

  if (!VALID_STATUSES.has(status) || !/^\d+$/.test(id)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  await ensureSchema()
  const rows = await sql`update orders set status = ${status}, updated_at = now() where id = ${Number(id)} returning *`

  const order = rows[0]
  if (order) {
    await reportOrderToUtmify({
      orderId: String(order.id),
      status: UTMIFY_STATUS[status],
      paymentMethod: order.payment_method === "pix" ? "pix" : "credit_card",
      createdAt: new Date(order.created_at),
      approvedAt: status === "pago" ? new Date() : null,
      customer: {
        name: order.customer_name,
        email: order.customer_email ?? "",
        phone: order.customer_phone,
        document: order.customer_cpf,
        ip: order.customer_ip,
      },
      productName: order.kit_label,
      totalInCents: Math.round(Number(order.total) * 100),
      trackingParameters: {
        src: order.src,
        sck: order.sck,
        utm_source: order.utm_source,
        utm_campaign: order.utm_campaign,
        utm_medium: order.utm_medium,
        utm_content: order.utm_content,
        utm_term: order.utm_term,
      },
    })
  }

  return NextResponse.json({ ok: true })
}
