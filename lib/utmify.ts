// ============================================================================
// UTMIFY — Envio de Vendas (server-side)
// Documentação: https://docs.utmify.com.br/envio-de-vendas
//
// Reporta cada pedido (criação e mudanças de status) para a Utmify, para que
// o Facebook Ads receba a conversão real associada à campanha que trouxe o
// cliente (utm_source/campaign/medium/content/term capturados no navegador
// em lib/utm.ts e salvos junto do pedido).
// ============================================================================

const UTMIFY_ORDERS_URL = "https://api.utmify.com.br/api-credentials/orders"

export type UtmifyOrderStatus = "waiting_payment" | "paid" | "refused" | "refunded" | "chargedback"

export type UtmifyOrderInput = {
  orderId: string
  status: UtmifyOrderStatus
  paymentMethod: "pix" | "credit_card"
  createdAt: Date
  approvedAt?: Date | null
  refundedAt?: Date | null
  customer: {
    name: string
    email: string
    phone?: string | null
    document?: string | null
    ip?: string | null
  }
  productName: string
  totalInCents: number
  trackingParameters: {
    src: string | null
    sck: string | null
    utm_source: string | null
    utm_campaign: string | null
    utm_medium: string | null
    utm_content: string | null
    utm_term: string | null
  }
}

function formatUtcTimestamp(date: Date): string {
  return date.toISOString().slice(0, 19).replace("T", " ")
}

/**
 * Envia (ou atualiza) um pedido na Utmify. Falhas aqui nunca devem quebrar o
 * checkout do cliente — apenas registramos no log do servidor.
 */
export async function reportOrderToUtmify(order: UtmifyOrderInput): Promise<void> {
  const apiToken = process.env.UTMIFY_API_TOKEN
  if (!apiToken) return

  try {
    const res = await fetch(UTMIFY_ORDERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-token": apiToken,
      },
      body: JSON.stringify({
        orderId: order.orderId,
        platform: "DriftKids",
        paymentMethod: order.paymentMethod,
        status: order.status,
        createdAt: formatUtcTimestamp(order.createdAt),
        approvedDate: order.approvedAt ? formatUtcTimestamp(order.approvedAt) : null,
        refundedAt: order.refundedAt ? formatUtcTimestamp(order.refundedAt) : null,
        customer: {
          name: order.customer.name,
          email: order.customer.email,
          phone: order.customer.phone ?? null,
          document: order.customer.document ?? null,
          country: "BR",
          ip: order.customer.ip ?? undefined,
        },
        products: [
          {
            id: "triciclo-drift-300w",
            name: order.productName,
            planId: null,
            planName: null,
            quantity: 1,
            priceInCents: order.totalInCents,
          },
        ],
        trackingParameters: order.trackingParameters,
        commission: {
          totalPriceInCents: order.totalInCents,
          gatewayFeeInCents: 0,
          userCommissionInCents: order.totalInCents,
          currency: "BRL",
        },
      }),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      console.error("Utmify: falha ao reportar pedido", res.status, text)
    }
  } catch (err) {
    console.error("Utmify: erro de rede ao reportar pedido", err)
  }
}
