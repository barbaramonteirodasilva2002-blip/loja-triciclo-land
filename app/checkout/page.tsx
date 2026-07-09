import type { Metadata } from "next"
import { Suspense } from "react"
import { ShieldCheck } from "lucide-react"
import { Logo } from "@/components/logo"
import { CheckoutClient } from "@/components/checkout/checkout-client"

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
          <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <ShieldCheck className="size-4 text-brand-navy" /> Ambiente seguro
          </span>
        </div>
      </header>

      <Suspense fallback={null}>
        <CheckoutClient />
      </Suspense>
    </div>
  )
}
