// Máscaras e validações usadas no formulário de checkout.

export function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

export function isValidCPF(value: string): boolean {
  const cpf = value.replace(/\D/g, "")
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false

  const digits = cpf.split("").map(Number)
  const calc = (len: number) => {
    let sum = 0
    for (let i = 0; i < len; i++) sum += digits[i] * (len + 1 - i)
    const rest = (sum * 10) % 11
    return rest === 10 ? 0 : rest
  }

  return calc(9) === digits[9] && calc(10) === digits[10]
}

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim().replace(/-$/, "")
  }
  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim().replace(/-$/, "")
}

export function formatCEP(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8)
  return digits.replace(/(\d{5})(\d{1,3})$/, "$1-$2")
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4)
  return digits.replace(/(\d{2})(\d{1,2})$/, "$1/$2")
}

export function luhnCheck(value: string): boolean {
  const digits = value
    .replace(/\D/g, "")
    .split("")
    .reverse()
    .map(Number)
  if (digits.length < 12) return false
  let sum = 0
  for (let i = 0; i < digits.length; i++) {
    let d = digits[i]
    if (i % 2 === 1) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
  }
  return sum % 10 === 0
}

export function isValidExpiry(value: string): boolean {
  const match = value.match(/^(\d{2})\/(\d{2})$/)
  if (!match) return false
  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  if (month < 1 || month > 12) return false
  const now = new Date()
  const expiry = new Date(year, month)
  return expiry > now
}

export type CardBrand = "visa" | "mastercard" | "amex" | "diners" | "hipercard" | "elo" | null

export function detectCardBrand(value: string): CardBrand {
  const digits = value.replace(/\D/g, "")
  if (/^4/.test(digits)) return "visa"
  if (/^(5[1-5]|2(2[2-9]|[3-6]\d|7[01])\d)/.test(digits)) return "mastercard"
  if (/^3[47]/.test(digits)) return "amex"
  if (/^3(0[0-5]|[68])/.test(digits)) return "diners"
  if (/^(606282|3841)/.test(digits)) return "hipercard"
  if (/^(636368|438935|504175|451416|509\d{3}|627780|636297)/.test(digits)) return "elo"
  return null
}
