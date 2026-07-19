import { NextRequest, NextResponse } from "next/server"
import { sql, ensureSchema } from "@/lib/db"
import { isSameOriginRequest, isValidSessionId } from "@/lib/request-guard"

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ ok: false }, { status: 403 })
  }

  const body = await request.json().catch(() => null)
  const sessionId = body?.sessionId
  const path = typeof body?.path === "string" ? body.path.slice(0, 200) : null

  if (!isValidSessionId(sessionId)) {
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
