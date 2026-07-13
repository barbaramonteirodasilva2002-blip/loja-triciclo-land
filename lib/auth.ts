import { SignJWT, jwtVerify } from "jose"

const COOKIE_NAME = "admin_session"
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 dias

function getSecretKey() {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error("SESSION_SECRET não configurado")
  return new TextEncoder().encode(secret)
}

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export async function verifyCredentials(email: string, password: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH
  if (!adminEmail || !adminPasswordHash) return false
  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) return false
  const submittedHash = await sha256Hex(password)
  return submittedHash === adminPasswordHash
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey())
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    return payload.role === "admin"
  } catch {
    return false
  }
}

export { COOKIE_NAME, SESSION_TTL_SECONDS }
