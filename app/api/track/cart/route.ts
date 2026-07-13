import { NextRequest, NextResponse } from "next/server"
import { sql, ensureSchema } from "@/lib/db"

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const sessionId = body?.sessionId
  const items = Array.isArray(body?.items) ? body.items : null
  const customer = body?.customer ?? null

  if (typeof sessionId !== "string" || !sessionId || !items) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  await ensureSchema()

  if (items.length === 0) {
    await sql`delete from carts where session_id = ${sessionId}`
    return NextResponse.json({ ok: true })
  }

  await sql`
    insert into carts (session_id, items, customer_name, customer_email, customer_phone, status, updated_at)
    values (
      ${sessionId}, ${JSON.stringify(items)}, ${customer?.name ?? null}, ${customer?.email ?? null},
      ${customer?.phone ?? null}, 'active', now()
    )
    on conflict (session_id) do update set
      items = excluded.items,
      customer_name = coalesce(excluded.customer_name, carts.customer_name),
      customer_email = coalesce(excluded.customer_email, carts.customer_email),
      customer_phone = coalesce(excluded.customer_phone, carts.customer_phone),
      status = 'active',
      updated_at = now()
  `

  return NextResponse.json({ ok: true })
}
