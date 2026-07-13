"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Lock, Loader2 } from "lucide-react"
import { Logo } from "@/components/logo"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? "Não foi possível entrar.")
        setLoading(false)
        return
      }
      router.push("/admin")
      router.refresh()
    } catch {
      setError("Erro de conexão. Tente novamente.")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex justify-center">
          <Logo className="h-9" />
        </div>
        <h1 className="mt-5 text-center font-heading text-lg font-bold text-foreground">Painel Administrativo</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Entre com suas credenciais de acesso.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-xs font-semibold text-foreground">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-brand-navy"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs font-semibold text-foreground">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-brand-navy"
            />
          </div>

          {error && <p className="text-sm font-semibold text-[#d9534f]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-navy py-3 font-heading text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-60"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" />}
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
