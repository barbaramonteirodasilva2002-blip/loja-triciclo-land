import { NextRequest, NextResponse } from "next/server"
import { sql, ensureSchema } from "@/lib/db"

const VALID_STATUSES = new Set(["pendente", "pago", "cancelado"])

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json().catch(() => null)
  const status = body?.status

  if (!VALID_STATUSES.has(status) || !/^\d+$/.test(id)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  await ensureSchema()
  await sql`update orders set status = ${status}, updated_at = now() where id = ${Number(id)}`

  return NextResponse.json({ ok: true })
}
