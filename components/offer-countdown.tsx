"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AlertTriangle, ShieldCheck, Clock } from "lucide-react"
import { getKit } from "@/lib/checkout"
import { FEATURED_PRODUCT_SLUG } from "@/lib/products"
import { useCart } from "@/components/cart-provider"

function format(n: number) {
  return n.toString().padStart(2, "0")
}

export function OfferCountdown() {
  const [seconds, setSeconds] = useState(2 * 3600 + 7 * 60 + 31)
  const cart = useCart()
  const kit = getKit(FEATURED_PRODUCT_SLUG)

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  return (
    <section id="oferta" className="scroll-mt-24 bg-background py-12 md:py-16">
      <div className="mx-auto max-w-md px-4">
        <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">The Ultimate Detangler</p>

          <div className="relative mx-auto mt-4 aspect-square w-32 overflow-hidden rounded-xl bg-white">
            <Image src={kit.img} alt={kit.units} fill sizes="128px" className="object-contain p-2" />
          </div>

          <h2 className="mt-4 text-balance font-heading text-xl font-normal text-foreground">
            Sua Tangle Teezer, sem sair de casa.
          </h2>

          <div className="mt-3 flex items-center justify-center gap-3">
            {kit.old && <span className="text-sm text-muted-foreground line-through">{kit.old}</span>}
            <span className="font-heading text-3xl font-bold text-foreground">{kit.price}</span>
          </div>

          <p className="mt-2 flex items-center justify-center gap-2 text-xs font-bold text-primary">
            <AlertTriangle className="size-4" />
            Oferta termina em {format(h)}:{format(m)}:{format(s)}
          </p>

          <button
            type="button"
            onClick={() => {
              cart.addItem(kit.id, 1)
              window.location.href = "/checkout"
            }}
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-primary py-4 font-heading text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110"
          >
            Ver oferta e finalizar compra
          </button>

          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" /> Compra segura
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4 text-primary" /> Garantia 30 dias
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
