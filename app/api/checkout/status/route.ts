import { NextRequest, NextResponse } from "next/server"
import { checkChargeStatus, PaymentGatewayNotConfiguredError } from "@/lib/payment-gateway"

export async function GET(request: NextRequest) {
  const chargeId = request.nextUrl.searchParams.get("chargeId")
  if (!chargeId) {
    return NextResponse.json({ ok: false, error: "missing_charge_id" }, { status: 400 })
  }

  try {
    const status = await checkChargeStatus(chargeId)
    return NextResponse.json({ ok: true, status })
  } catch (err) {
    if (err instanceof PaymentGatewayNotConfiguredError) {
      // Gateway ainda não conectada: a tela de espera do Pix deve continuar
      // aguardando normalmente em vez de mostrar um erro a cada consulta.
      return NextResponse.json({ ok: true, status: "pending" })
    }
    return NextResponse.json({ ok: false, error: "unknown" }, { status: 500 })
  }
}
