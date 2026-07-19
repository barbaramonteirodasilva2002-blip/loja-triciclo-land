"use client"

import { useMemo } from "react"
import Image from "next/image"
import { Plus, Sparkles } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { getOrderBumpProduct } from "@/lib/products"

export function OrderBump() {
  const cart = useCart()

  const suggestion = useMemo(
    () => getOrderBumpProduct(cart.items.map((i) => i.kitId)),
    [cart.items],
  )

  if (cart.items.length === 0 || !suggestion) return null

  return (
    <div className="chrome-border relative overflow-hidden rounded-xl border border-dashed border-primary/40 bg-secondary/40 p-3">
      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-primary">
        <Sparkles className="size-3.5" />
        Combina com o que você escolheu
      </p>
      <div className="mt-2 flex items-center gap-3">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-white">
          <Image src={suggestion.img} alt={suggestion.name} fill sizes="56px" className="object-contain p-1" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{suggestion.name}</p>
          <p className="text-sm font-bold text-primary">R$ {suggestion.price}</p>
        </div>
        <button
          type="button"
          onClick={() => cart.addItem(suggestion.slug, 1)}
          className="flex shrink-0 items-center gap-1 rounded-full bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition hover:bg-brand-pink-deep active:scale-[0.97]"
        >
          <Plus className="size-3.5" />
          Adicionar
        </button>
      </div>
    </div>
  )
}
