import { NextRequest, NextResponse } from "next/server"
import { sql, ensureSchema } from "@/lib/db"
import {
  getKit,
  getCouponDiscount,
  getShippingMethod,
  PIX_DISCOUNT_PERCENT,
  DEFAULT_SHIPPING_METHOD,
  type KitId,
  type ShippingMethodId,
} from "@/lib/checkout"
import { reportOrderToUtmify } from "@/lib/utmify"
import type { UtmParams } from "@/lib/utm"

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ ok: false }, { status: 400 })

  const { sessionId, items, paymentMethod, customer, shippingMethodId, couponCode, utm } = body as {
    sessionId?: string
    items?: { kitId: KitId; quantity: number }[]
    paymentMethod?: "pix" | "cartao"
    customer?: { name?: string; email?: string; phone?: string; cpf?: string }
    shippingMethodId?: ShippingMethodId
    couponCode?: string
    utm?: Partial<UtmParams>
  }

  if (
    typeof sessionId !== "string" ||
    !sessionId ||
    !Array.isArray(items) ||
    items.length === 0 ||
    !customer?.name ||
    (paymentMethod !== "pix" && paymentMethod !== "cartao")
  ) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  await ensureSchema()

  const lines = items.map((item) => ({ kit: getKit(item.kitId), quantity: item.quantity }))
  const subtotal = lines.reduce((sum, l) => sum + l.kit.priceValue * l.quantity, 0)
  const couponPercent = couponCode ? getCouponDiscount(couponCode) ?? 0 : 0
  const pixBonusPercent = paymentMethod === "pix" ? PIX_DISCOUNT_PERCENT : 0
  const discountValue = subtotal * ((couponPercent + pixBonusPercent) / 100)
  const shippingValue = getShippingMethod(shippingMethodId ?? DEFAULT_SHIPPING_METHOD).price
  const total = subtotal - discountValue + shippingValue
  const kitLabel = lines.map((l) => `${l.kit.units} x${l.quantity}`).join(", ")
  const customerIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null

  const rows = await sql`
    insert into orders (
      session_id, status, kit_id, kit_label, customer_name, customer_email, customer_phone, customer_cpf,
      payment_method, shipping_method, shipping_value, subtotal, discount_value, total, coupon_code, customer_ip,
      utm_source, utm_campaign, utm_medium, utm_content, utm_term, src, sck
    ) values (
      ${sessionId}, 'pendente', ${items[0].kitId}, ${kitLabel}, ${customer.name}, ${customer.email ?? null},
      ${customer.phone ?? null}, ${customer.cpf ?? null}, ${paymentMethod}, ${shippingMethodId ?? DEFAULT_SHIPPING_METHOD},
      ${shippingValue}, ${subtotal}, ${discountValue}, ${total}, ${couponCode ?? null}, ${customerIp},
      ${utm?.utm_source ?? null}, ${utm?.utm_campaign ?? null}, ${utm?.utm_medium ?? null}, ${utm?.utm_content ?? null},
      ${utm?.utm_term ?? null}, ${utm?.src ?? null}, ${utm?.sck ?? null}
    )
    returning id, created_at
  `
  const orderId = rows[0]?.id
  const createdAt = rows[0]?.created_at ? new Date(rows[0].created_at) : new Date()

  await sql`insert into checkout_events (session_id, step) values (${sessionId}, 'comprou')`
  await sql`update carts set status = 'converted', updated_at = now() where session_id = ${sessionId}`

  await reportOrderToUtmify({
    orderId: String(orderId),
    status: "waiting_payment",
    paymentMethod: paymentMethod === "pix" ? "pix" : "credit_card",
    createdAt,
    customer: {
      name: customer.name,
      email: customer.email ?? "",
      phone: customer.phone,
      document: customer.cpf,
      ip: customerIp,
    },
    productName: kitLabel,
    totalInCents: Math.round(total * 100),
    trackingParameters: {
      src: utm?.src ?? null,
      sck: utm?.sck ?? null,
      utm_source: utm?.utm_source ?? null,
      utm_campaign: utm?.utm_campaign ?? null,
      utm_medium: utm?.utm_medium ?? null,
      utm_content: utm?.utm_content ?? null,
      utm_term: utm?.utm_term ?? null,
    },
  })

  return NextResponse.json({ ok: true, orderId })
}
