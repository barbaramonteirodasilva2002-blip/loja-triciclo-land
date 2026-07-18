"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { getKit, type KitId } from "@/lib/checkout"
import { useCart } from "@/components/cart-provider"

export function StickyBuyBar({ kitId }: { kitId: KitId }) {
  const [visible, setVisible] = useState(false)
  const kit = getKit(kitId)
  const cart = useCart()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!kit.available) return null

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur transition-transform duration-300 supports-[backdrop-filter]:bg-background/85",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0 leading-tight">
          <p className="truncate text-xs text-muted-foreground">
            {kit.old && <span className="line-through">{kit.old}</span>}
            <span className="ml-1.5 font-semibold text-foreground">{kit.units}</span>
          </p>
          <p className="font-heading text-xl font-extrabold text-primary">{kit.price}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            cart.addItem(kitId, 1)
            window.location.href = "/checkout"
          }}
          className="flex shrink-0 items-center justify-center rounded-xl bg-primary px-6 py-3.5 font-heading text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110"
        >
          QUERO ESTE
        </button>
      </div>
    </div>
  )
}
