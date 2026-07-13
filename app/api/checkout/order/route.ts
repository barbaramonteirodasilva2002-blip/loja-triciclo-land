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

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ ok: false }, { status: 400 })

  const { sessionId, items, paymentMethod, customer, shippingMethodId, couponCode } = body as {
    sessionId?: string
    items?: { kitId: KitId; quantity: number }[]
    paymentMethod?: "pix" | "cartao"
    customer?: { name?: string; email?: string; phone?: string; cpf?: string }
    shippingMethodId?: ShippingMethodId
    couponCode?: string
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

  const rows = await sql`
    insert into orders (
      session_id, status, kit_id, kit_label, customer_name, customer_email, customer_phone, customer_cpf,
      payment_method, shipping_method, shipping_value, subtotal, discount_value, total, coupon_code
    ) values (
      ${sessionId}, 'pendente', ${items[0].kitId}, ${kitLabel}, ${customer.name}, ${customer.email ?? null},
      ${customer.phone ?? null}, ${customer.cpf ?? null}, ${paymentMethod}, ${shippingMethodId ?? DEFAULT_SHIPPING_METHOD},
      ${shippingValue}, ${subtotal}, ${discountValue}, ${total}, ${couponCode ?? null}
    )
    returning id
  `

  await sql`insert into checkout_events (session_id, step) values (${sessionId}, 'comprou')`
  await sql`update carts set status = 'converted', updated_at = now() where session_id = ${sessionId}`

  return NextResponse.json({ ok: true, orderId: rows[0]?.id })
}
