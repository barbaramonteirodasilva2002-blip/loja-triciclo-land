"use client"

import type React from "react"
import { useState } from "react"
import { Check } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail("")
  }

  return (
    <section className="bg-brand-navy py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-balance text-3xl font-bold text-primary-foreground md:text-4xl">
          Ganhe 10% no primeiro pedido
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-primary-foreground/70">
          Assine nossa newsletter e receba ofertas exclusivas, novidades e dicas de hidratação direto no seu e-mail.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor e-mail"
            aria-label="E-mail"
            className="h-12 flex-1 rounded-full border border-white/15 bg-white/10 px-5 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            {sent ? (
              <>
                <Check className="size-5" aria-hidden="true" /> Inscrito!
              </>
            ) : (
              "Quero meu desconto"
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
