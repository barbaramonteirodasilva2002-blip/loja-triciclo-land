// Limitador simples em memória — não é distribuído (cada instância serverless
// tem seu próprio estado), mas já eleva bastante o custo de um brute-force
// ingênuo sem precisar de infraestrutura extra (Redis/KV). Se um dia
// observarmos abuso de verdade, vale trocar por algo distribuído.
const attempts = new Map<string, { count: number; resetAt: number }>()

const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now()
  const entry = attempts.get(key)

  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true }
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) }
  }

  entry.count += 1
  return { allowed: true }
}

export function resetRateLimit(key: string) {
  attempts.delete(key)
}
