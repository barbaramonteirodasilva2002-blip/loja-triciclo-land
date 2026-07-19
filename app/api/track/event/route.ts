import { NextRequest, NextResponse } from "next/server"
import { sql, ensureSchema } from "@/lib/db"
import { isSameOriginRequest, isValidSessionId } from "@/lib/request-guard"

const VALID_STEPS = new Set(["checkout", "dados_pessoais", "entrega", "pagamento", "comprou"])

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ ok: false }, { status: 403 })
  }

  const body = await request.json().catch(() => null)
  const sessionId = body?.sessionId
  const step = body?.step

  if (!isValidSessionId(sessionId) || !VALID_STEPS.has(step)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  await ensureSchema()
  await sql`insert into checkout_events (session_id, step) values (${sessionId}, ${step})`

  return NextResponse.json({ ok: true })
}
