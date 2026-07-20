"use client"

import { useState } from "react"
import { Check, Truck } from "lucide-react"
import { formatCEP } from "@/lib/format"
import { SHIPPING_METHODS, formatBRL } from "@/lib/checkout"

export function ProductShippingCalculator() {
  const [cep, setCep] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ city: string; state: string } | null>(null)
  const [notFound, setNotFound] = useState(false)

  async function handleCalculate() {
    const digits = cep.replace(/\D/g, "")
    if (digits.length !== 8) return
    setLoading(true)
    setNotFound(false)
    setResult(null)
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
      const data = await res.json()
      if (data.erro) {
        setNotFound(true)
      } else {
        setResult({ city: data.localidade, state: data.uf })
      }
    } catch {
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <p className="flex items-center gap-2 text-sm font-bold text-foreground">
        <Truck className="size-4 text-primary" /> Frete e prazos
      </p>
      <div className="mt-3 flex items-center gap-2.5">
        <input
          inputMode="numeric"
          placeholder="00000-000"
          value={cep}
          onChange={(e) => {
            setResult(null)
            setNotFound(false)
            setCep(formatCEP(e.target.value))
          }}
          onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
          className="w-full max-w-[160px] rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-brand-navy"
        />
        <button
          type="button"
          onClick={handleCalculate}
          disabled={loading || cep.replace(/\D/g, "").length !== 8}
          className="shrink-0 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary/70 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "..." : "Calcular"}
        </button>
      </div>
      <a
        href="https://buscacepinter.correios.com.br/app/endereco/index.php"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-xs font-medium text-brand-pink-deep underline underline-offset-2"
      >
        Não sei meu CEP
      </a>

      {notFound && (
        <p className="mt-3 text-xs font-semibold text-[#d9534f]">CEP não encontrado, confira e tente de novo.</p>
      )}

      {result && (
        <div className="mt-4 space-y-2 border-t border-border pt-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check className="size-2.5" />
            </span>
            Entrega em {result.city}/{result.state}
          </p>
          {SHIPPING_METHODS.map((method) => (
            <div key={method.id} className="flex items-center justify-between text-sm">
              <span className="text-foreground">
                {method.label} <span className="text-muted-foreground">· {method.eta}</span>
              </span>
              <span className="font-semibold text-foreground">
                {method.price === 0 ? "Grátis" : `R$ ${formatBRL(method.price)}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
