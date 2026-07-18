"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { PaymentMethods } from "@/components/payment-methods"

export function CheckoutFooter() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <>
      <footer className="border-t border-border bg-brand-navy-deep py-8 text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-sm font-semibold">Formas de pagamento</p>
          <div className="mt-3 flex justify-center">
            <PaymentMethods />
          </div>
          <button
            type="button"
            onClick={() => setShowInfo(true)}
            className="mt-4 text-xs font-medium text-primary-foreground/70 underline underline-offset-2 transition hover:text-primary-foreground"
          >
            Informações da loja
          </button>
          <p className="mt-3 text-xs text-primary-foreground/50">Revendedor(a) autorizado(a) da marca Tangle Teezer | Todos os direitos reservados</p>
        </div>
      </footer>

      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center" onClick={() => setShowInfo(false)}>
          <div
            className="w-full max-w-sm rounded-2xl bg-card p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="font-heading text-sm font-bold text-foreground">Informações de contato</p>
              <button type="button" onClick={() => setShowInfo(false)} aria-label="Fechar" className="text-muted-foreground hover:text-foreground">
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-3 space-y-1 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">[Razão Social da sua loja]</p>
              <p>Revendedor(a) autorizado(a) da marca Tangle Teezer</p>
              <p className="pt-2">
                <span className="font-semibold text-foreground">Telefone:</span> [Telefone de contato]
              </p>
              <p>
                <span className="font-semibold text-foreground">E-mail:</span> [email@sualoja.com.br]
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
