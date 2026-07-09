import { NextRequest, NextResponse } from "next/server"
import { getCouponDiscount } from "@/lib/checkout"

export async function POST(request: NextRequest) {
  const { code } = await request.json().catch(() => ({ code: "" }))

  if (!code || typeof code !== "string") {
    return NextResponse.json({ ok: false }, { status: 422 })
  }

  const percent = getCouponDiscount(code)
  if (percent === null) {
    return NextResponse.json({ ok: false })
  }

  return NextResponse.json({ ok: true, percent })
}
