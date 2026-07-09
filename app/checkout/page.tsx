import type { Metadata } from "next"
import { Suspense } from "react"
import { Logo } from "@/components/logo"
import { CheckoutClient } from "@/components/checkout/checkout-client"

// Ícone de cadeado sólido (o Lock do lucide é feito de traços finos e fica
// deformado ao forçar preenchimento — este é desenhado já fechado/sólido).
function SolidLockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 11V7a5 5 0 0 1 10 0v4h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zm2 0h6V7a3 3 0 0 0-6 0z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: "Finalizar Compra | DriftKids",
  description: "Finalize sua compra com segurança na DriftKids.",
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5">
          <Logo />
          <span className="flex items-center gap-1.5 text-right uppercase leading-[1.15] tracking-wide">
            <SolidLockIcon className="size-3.5 shrink-0 text-[#1a1a2e]" />
            <span className="flex flex-col">
              <span className="text-[10px] font-extrabold text-[#1a1a2e]">Pagamento</span>
              <span className="text-[10px] font-extrabold text-[#f4511e]">100% seguro</span>
            </span>
          </span>
        </div>
      </header>

      <Suspense fallback={null}>
        <CheckoutClient />
      </Suspense>
    </div>
  )
}
