import { NextRequest, NextResponse } from "next/server"
import { sql, ensureSchema } from "@/lib/db"
import { checkChargeStatus } from "@/lib/payment-gateway"
import { reportOrderToUtmify } from "@/lib/utmify"

// Recebe as notificações de transação da HyperCash (ver lib/payment-gateway.ts
// e https://docs.hypercash.com.br/docs/webhook/transaction) e atualiza o
// pedido correspondente.
//
// A HyperCash não documenta assinatura/segredo de webhook, então o payload
// recebido não é confiável por si só (qualquer um poderia forjar um POST
// alegando "paid"). Por isso, ao invés de confiar no status do corpo da
// requisição, usamos-o só como gatilho: reconsultamos o status real da
// transação direto na API da HyperCash (autenticada com nossa chave secreta)
// antes de marcar qualquer pedido como pago.

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const chargeId = body?.data?.id

  if (typeof chargeId !== "string" || !chargeId) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const verifiedStatus = await checkChargeStatus(chargeId)
  const newStatus = verifiedStatus === "paid" ? "pago" : verifiedStatus === "expired" ? "cancelado" : null

  if (!newStatus) {
    // Status intermediário (processing, waiting_payment, in_analysis...) — nada a atualizar ainda.
    return NextResponse.json({ ok: true })
  }

  await ensureSchema()
  const rows = await sql`
    update orders
    set status = ${newStatus}, gateway_status = ${verifiedStatus}, updated_at = now()
    where gateway_charge_id = ${chargeId}
    returning *
  `

  const order = rows[0]
  if (order) {
    await reportOrderToUtmify({
      orderId: String(order.id),
      status: newStatus === "pago" ? "paid" : "refused",
      paymentMethod: order.payment_method === "pix" ? "pix" : "credit_card",
      createdAt: new Date(order.created_at),
      approvedAt: newStatus === "pago" ? new Date() : null,
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
