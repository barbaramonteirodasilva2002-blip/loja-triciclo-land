import { NextResponse } from "next/server"
import { verifyCredentials, createSessionToken, COOKIE_NAME, SESSION_TTL_SECONDS } from "@/lib/auth"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const email = body?.email
  const password = body?.password

  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
  }

  const valid = await verifyCredentials(email, password)
  if (!valid) {
    return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 })
  }

  const token = await createSessionToken()
  const response = NextResponse.json({ ok: true })
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  })
  return response
}
