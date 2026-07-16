import { NextRequest, NextResponse } from "next/server"
import { isValidCPF } from "@/lib/format"
import { getKit, getCouponDiscount, getShippingMethod, PIX_DISCOUNT_PERCENT, DEFAULT_SHIPPING_METHOD, type KitId, type ShippingMethodId } from "@/lib/checkout"
import {
  createCardCharge,
  createPixCharge,
  PaymentGatewayNotConfiguredError,
  type CustomerInfo,
} from "@/lib/payment-gateway"
import { sql, ensureSchema } from "@/lib/db"

type CheckoutBody = {
  items: { kitId: KitId; quantity: number }[]
  paymentMethod: "pix" | "cartao"
  customer: CustomerInfo
  address: {
    cep: string
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
  }
  installments?: number
  couponCode?: string
  shippingMethodId?: ShippingMethodId
  /** ID do pedido criado em /api/checkout/order — usado para vincular a cobrança. */
  internalOrderId?: number
  /** Token do cartão gerado no navegador via FastSoft.encrypt() (ver payment-section.tsx). */
  cardToken?: string
}

export async function POST(request: NextRequest) {
  let body: CheckoutBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body", message: "Requisição inválida." }, { status: 400 })
  }

  const { customer, address, paymentMethod, items } = body

  if (!customer?.name || !customer?.email || !customer?.phone || !isValidCPF(customer?.cpf ?? "")) {
    return NextResponse.json({ ok: false, error: "invalid_customer", message: "Confira seus dados pessoais." }, { status: 422 })
  }

  if (!address?.cep || !address?.street || !address?.number || !address?.neighborhood || !address?.city || !address?.state) {
    return NextResponse.json({ ok: false, error: "invalid_address", message: "Confira o endereço de entrega." }, { status: 422 })
  }

  if (!items || items.length === 0) {
    return NextResponse.json({ ok: false, error: "empty_cart", message: "Seu carrinho está vazio." }, { status: 422 })
  }

  const lines = items.map((item) => ({ kit: getKit(item.kitId), quantity: Math.min(5, Math.max(1, item.quantity)) }))
  const subtotal = lines.reduce((sum, l) => sum + l.kit.priceValue * l.quantity, 0)

  const couponPercent = body.couponCode ? getCouponDiscount(body.couponCode) ?? 0 : 0
  const pixBonusPercent = paymentMethod === "pix" ? PIX_DISCOUNT_PERCENT : 0
  const shippingValue = getShippingMethod(body.shippingMethodId ?? DEFAULT_SHIPPING_METHOD).price
  const total = subtotal * (1 - (couponPercent + pixBonusPercent) / 100) + shippingValue

  const amountInCents = Math.round(total * 100)
  const orderRef = body.internalOrderId ? String(body.internalOrderId) : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const postbackUrl = `${request.nextUrl.origin}/api/webhooks/hypercash`
  const gatewayItems = lines.map((l) => ({
    title: `Triciclo Elétrico Drift - ${l.kit.units}`,
    unitPriceInCents: Math.round(l.kit.priceValue * 100),
    quantity: l.quantity,
  }))
  const shippingFeeInCents = Math.round(shippingValue * 100)

  try {
    if (paymentMethod === "pix") {
      const result = await createPixCharge({
        amountInCents,
        orderId: orderRef,
        customer,
        postbackUrl,
        items: gatewayItems,
        shippingFeeInCents,
      })
      await linkChargeToOrder(body.internalOrderId, result.chargeId)
      return NextResponse.json({ ok: true, pix: result })
    }

    if (paymentMethod === "cartao") {
      if (!body.cardToken) {
        return NextResponse.json({ ok: false, error: "invalid_card", message: "Confira os dados do cartão." }, { status: 422 })
      }
      const result = await createCardCharge({
        amountInCents,
        installments: body.installments ?? 1,
        orderId: orderRef,
        customer,
        postbackUrl,
        cardToken: body.cardToken,
        items: gatewayItems,
        shippingFeeInCents,
      })
      await linkChargeToOrder(body.internalOrderId, result.chargeId)
      return NextResponse.json({ ok: true, card: result })
    }

    return NextResponse.json({ ok: false, error: "invalid_payment_method", message: "Forma de pagamento inválida." }, { status: 422 })
  } catch (err) {
    if (err instanceof PaymentGatewayNotConfiguredError) {
      return NextResponse.json(
        {
          ok: false,
          error: "gateway_not_configured",
          message: "A gateway de pagamento ainda não foi configurada. Veja lib/payment-gateway.ts.",
        },
        { status: 503 },
      )
    }
    const message = err instanceof Error ? err.message : "Não foi possível processar o pagamento."
    return NextResponse.json({ ok: false, error: "unknown", message }, { status: 500 })
  }
}

async function linkChargeToOrder(internalOrderId: number | undefined, chargeId: string) {
  if (!internalOrderId) return
  await ensureSchema()
  await sql`update orders set gateway_charge_id = ${chargeId}, updated_at = now() where id = ${internalOrderId}`
}
