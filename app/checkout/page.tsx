import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import { Logo } from "@/components/logo"
import { CheckoutClient } from "@/components/checkout/checkout-client"

export const metadata: Metadata = {
  title: "Finalizar Compra | Tangle Teezer Brasil",
  description: "Finalize sua compra com segurança na loja Tangle Teezer Brasil.",
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-secondary/30">
      {/* SDK da HyperCash (FastSoft) — tokeniza o cartão no navegador antes de
          enviarmos qualquer dado ao nosso servidor (ver checkout-client.tsx). */}
      <Script src="https://js.fastsoftbrasil.com/security.js" strategy="beforeInteractive" />

      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5">
          <Link href="/" aria-label="Tangle Teezer - página inicial">
            <Logo />
          </Link>
          <span className="flex items-center gap-1.5 text-right uppercase leading-[1.15] tracking-wide">
            <Image src="/images/icone-cadeado.png" alt="" width={102} height={114} className="size-3.5 shrink-0 object-contain" />
            <span className="flex flex-col">
              <span className="text-[10px] font-extrabold text-[#1a1a2e]">Pagamento</span>
              <span className="text-[10px] font-extrabold text-[#1a1a2e]">100% seguro</span>
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
