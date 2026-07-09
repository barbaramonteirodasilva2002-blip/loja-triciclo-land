import { NextRequest, NextResponse } from "next/server"
import { isValidCPF } from "@/lib/format"
import { getKit, getCouponDiscount, PIX_DISCOUNT_PERCENT, type KitId } from "@/lib/checkout"
import {
  createCardCharge,
  createPixCharge,
  PaymentGatewayNotConfiguredError,
  type CustomerInfo,
} from "@/lib/payment-gateway"

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
  card?: {
    number: string
    holderName: string
    expiryMonth: string
    expiryYear: string
    cvv: string
  }
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

  const subtotal = items.reduce((sum, item) => sum + getKit(item.kitId).priceValue * Math.min(5, Math.max(1, item.quantity)), 0)

  const couponPercent = body.couponCode ? getCouponDiscount(body.couponCode) ?? 0 : 0
  const pixBonusPercent = paymentMethod === "pix" ? PIX_DISCOUNT_PERCENT : 0
  const total = subtotal * (1 - (couponPercent + pixBonusPercent) / 100)

  const amountInCents = Math.round(total * 100)
  const orderId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  try {
    if (paymentMethod === "pix") {
      const result = await createPixCharge({ amountInCents, orderId, customer })
      return NextResponse.json({ ok: true, pix: result })
    }

    if (paymentMethod === "cartao") {
      if (!body.card) {
        return NextResponse.json({ ok: false, error: "invalid_card", message: "Confira os dados do cartão." }, { status: 422 })
      }
      const result = await createCardCharge({
        amountInCents,
        installments: body.installments ?? 1,
        orderId,
        customer,
        card: body.card,
      })
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
    return NextResponse.json({ ok: false, error: "unknown", message: "Não foi possível processar o pagamento." }, { status: 500 })
  }
}
