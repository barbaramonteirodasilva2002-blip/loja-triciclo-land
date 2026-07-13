import { NextRequest, NextResponse } from "next/server"
import { sql, ensureSchema } from "@/lib/db"

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const sessionId = body?.sessionId
  const path = typeof body?.path === "string" ? body.path.slice(0, 200) : null

  if (typeof sessionId !== "string" || !sessionId) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  await ensureSchema()
  await sql`
    insert into sessions (id, path, last_seen_at)
    values (${sessionId}, ${path}, now())
    on conflict (id) do update set last_seen_at = now(), path = excluded.path
  `

  return NextResponse.json({ ok: true })
}
