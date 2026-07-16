// ============================================================================
// INTEGRAÇÃO COM A GATEWAY DE PAGAMENTO — HYPERCASH
//
// Documentação: https://docs.hypercash.com.br
// Autenticação: Basic Auth com "x:CHAVE_SECRETA" em base64.
// Cartão: a tokenização acontece no navegador (components/checkout/payment-section.tsx)
// via SDK da FastSoft — o número/CVV nunca chegam a este servidor, só o token.
// ============================================================================

import QRCode from "qrcode"

export class PaymentGatewayNotConfiguredError extends Error {
  constructor(method: "pix" | "cartão") {
    super(`Gateway de pagamento ainda não configurada para ${method}.`)
    this.name = "PaymentGatewayNotConfiguredError"
  }
}

export type CustomerInfo = {
  name: string
  email: string
  cpf: string
  phone: string
}

export type ShippingAddress = {
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

export type ChargeLineItem = {
  title: string
  unitPriceInCents: number
  quantity: number
}

export type PixChargeParams = {
  amountInCents: number
  orderId: string
  customer: CustomerInfo
  postbackUrl: string
  items: ChargeLineItem[]
  shippingFeeInCents?: number
}

export type PixChargeResult = {
  chargeId: string
  /** Imagem do QR Code (data URI base64, ex: "data:image/png;base64,...") */
  qrCodeImage: string
  /** Código "copia e cola" do Pix */
  copyPasteCode: string
  /** ISO date string de quando o QR Code expira */
  expiresAt: string
}

export type CardChargeParams = {
  amountInCents: number
  installments: number
  orderId: string
  customer: CustomerInfo
  postbackUrl: string
  items: ChargeLineItem[]
  shippingFeeInCents?: number
  /** Token gerado no navegador via FastSoft.encrypt() — nunca o cartão em texto puro. */
  cardToken: string
}

export type CardChargeResult = {
  chargeId: string
  status: "approved" | "pending" | "refused"
}

export type ChargeStatus = "pending" | "paid" | "expired"

const BASE_URL = "https://api.hypercashbrasil.com.br"

function getAuthHeader(): string {
  const secretKey = process.env.HYPERCASH_SECRET_KEY
  if (!secretKey) throw new PaymentGatewayNotConfiguredError("pix")
  const token = Buffer.from(`x:${secretKey}`).toString("base64")
  return `Basic ${token}`
}

type HyperCashTransaction = {
  id: string
  status: string
  pix?: { qrcode: string; expirationDate: string } | null
}

async function hypercashRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init?.headers,
    },
  })
  const body = await res.json()
  if (!res.ok) {
    const reason = body?.error?.refusedReason || body?.message || "Erro desconhecido na gateway."
    throw new Error(`HyperCash: ${reason}`)
  }
  return body.data as T
}

function buildCustomerPayload(customer: CustomerInfo) {
  return {
    name: customer.name,
    email: customer.email,
    document: { number: customer.cpf.replace(/\D/g, ""), type: "CPF" as const },
    phone: customer.phone.replace(/\D/g, ""),
  }
}

function buildItemsPayload(items: ChargeLineItem[]) {
  return items.map((item) => ({
    title: item.title,
    unitPrice: item.unitPriceInCents,
    quantity: item.quantity,
    tangible: true,
  }))
}

function buildShippingPayload(shippingFeeInCents: number | undefined) {
  return shippingFeeInCents !== undefined ? { fee: shippingFeeInCents } : undefined
}

// A HyperCash só aceita expiração em dias inteiros (mínimo 1), mas queremos
// que o cliente veja e sinta uma janela bem mais curta — ver PIX_EXPIRES_IN_MINUTES.
const PIX_EXPIRES_IN_DAYS = 1
const PIX_EXPIRES_IN_MINUTES = 40

/**
 * Cria uma cobrança Pix e devolve o QR Code para o cliente pagar.
 */
export async function createPixCharge(params: PixChargeParams): Promise<PixChargeResult> {
  const data = await hypercashRequest<HyperCashTransaction>("/api/user/transactions", {
    method: "POST",
    body: JSON.stringify({
      amount: params.amountInCents,
      currency: "BRL",
      paymentMethod: "PIX",
      customer: buildCustomerPayload(params.customer),
      items: buildItemsPayload(params.items),
      shipping: buildShippingPayload(params.shippingFeeInCents),
      pix: { expiresInDays: PIX_EXPIRES_IN_DAYS },
      postbackUrl: params.postbackUrl,
      traceable: true,
      metadata: JSON.stringify({ orderId: params.orderId }),
    }),
  })

  const copyPasteCode = data.pix?.qrcode ?? ""
  const qrCodeImage = copyPasteCode ? await QRCode.toDataURL(copyPasteCode, { margin: 1, width: 320 }) : ""

  return {
    chargeId: data.id,
    qrCodeImage,
    copyPasteCode,
    // A HyperCash retorna "expirationDate" com um fuso horário incorreto (fica
    // ~3h no passado, fazendo o QR Code nascer "vencido") — por isso calculamos
    // a expiração nós mesmos, numa janela mais curta que a cobrada na HyperCash
    // (PIX_EXPIRES_IN_DAYS) para criar senso de urgência no cliente.
    expiresAt: new Date(Date.now() + PIX_EXPIRES_IN_MINUTES * 60 * 1000).toISOString(),
  }
}

const PAID_STATUSES = new Set(["PAID"])
const FAILED_STATUSES = new Set(["REFUSED", "CANCELED", "CHARGEDBACK"])

/**
 * Consulta o status atual de uma cobrança (usado como reforço além do webhook).
 */
export async function checkChargeStatus(chargeId: string): Promise<ChargeStatus> {
  const data = await hypercashRequest<HyperCashTransaction>(`/api/user/transactions/${chargeId}`, {
    method: "GET",
  })
  const status = (data.status ?? "").toUpperCase()
  if (PAID_STATUSES.has(status)) return "paid"
  if (FAILED_STATUSES.has(status)) return "expired"
  return "pending"
}

/**
 * Cobra o cartão de crédito a partir do token gerado no navegador.
 */
export async function createCardCharge(params: CardChargeParams): Promise<CardChargeResult> {
  const data = await hypercashRequest<HyperCashTransaction>("/api/user/transactions", {
    method: "POST",
    body: JSON.stringify({
      amount: params.amountInCents,
      currency: "BRL",
      paymentMethod: "CREDIT_CARD",
      installments: params.installments,
      card: { hash: params.cardToken },
      customer: buildCustomerPayload(params.customer),
      items: buildItemsPayload(params.items),
      shipping: buildShippingPayload(params.shippingFeeInCents),
      postbackUrl: params.postbackUrl,
      traceable: true,
      metadata: JSON.stringify({ orderId: params.orderId }),
    }),
  })

  const status = (data.status ?? "").toUpperCase()
  const mapped: CardChargeResult["status"] = PAID_STATUSES.has(status)
    ? "approved"
    : FAILED_STATUSES.has(status)
      ? "refused"
      : "pending"

  return { chargeId: data.id, status: mapped }
}
