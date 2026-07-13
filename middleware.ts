import { NextResponse, type NextRequest } from "next/server"
import { COOKIE_NAME, verifySessionToken } from "@/lib/auth"

const PUBLIC_PATHS = new Set(["/admin/login", "/api/admin/login", "/api/admin/logout"])

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PUBLIC_PATHS.has(pathname)) return NextResponse.next()

  const token = request.cookies.get(COOKIE_NAME)?.value
  const valid = token ? await verifySessionToken(token) : false

  if (!valid) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
    }
    const loginUrl = new URL("/admin/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
