import { NextRequest, NextResponse } from "next/server"
import { sql, ensureSchema } from "@/lib/db"
import { checkChargeStatus } from "@/lib/payment-gateway"

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
  await sql`
    update orders
    set status = ${newStatus}, gateway_status = ${verifiedStatus}, updated_at = now()
    where gateway_charge_id = ${chargeId}
  `

  return NextResponse.json({ ok: true })
}
