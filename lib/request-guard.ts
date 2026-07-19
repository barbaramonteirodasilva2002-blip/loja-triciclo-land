import type { NextRequest } from "next/server"

const SESSION_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function isValidSessionId(value: unknown): value is string {
  return typeof value === "string" && SESSION_ID_RE.test(value)
}

// Bots e scrapers que batem direto na API normalmente não enviam o cabeçalho
// Origin do navegador, ou enviam um valor de outro domínio — diferente do
// fetch() que o próprio site dispara, que sempre inclui a origem real.
export function isSameOriginRequest(request: NextRequest): boolean {
  const origin = request.headers.get("origin")
  if (!origin) return false
  try {
    return new URL(origin).host === request.nextUrl.host
  } catch {
    return false
  }
}
