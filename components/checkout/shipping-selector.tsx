"use client"

import Image from "next/image"
import { Truck, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatBRL, SHIPPING_METHODS, type ShippingMethodId } from "@/lib/checkout"

export function ShippingSelector({
  selected,
  onSelect,
}: {
  selected: ShippingMethodId
  onSelect: (id: ShippingMethodId) => void
}) {
  return (
    <div>
      <p className="text-sm font-bold text-foreground">Escolha o frete:</p>
      <div className="mt-3 space-y-2.5">
        {SHIPPING_METHODS.map((method) => {
          const isSelected = method.id === selected
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelect(method.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition",
                isSelected ? "border-brand-navy bg-secondary/60" : "border-border hover:border-brand-navy/40",
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                    isSelected ? "border-brand-navy" : "border-border",
                  )}
                >
                  {isSelected && <span className="size-2.5 rounded-full bg-brand-navy" />}
                </span>
                <div>
                  <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                    {method.label}
                    {method.id === "sedex" && (
                      <span className="relative h-4 w-9 shrink-0 overflow-hidden rounded-sm">
                        <Image src="/images/sedex-icon.png" alt="SEDEX" fill sizes="36px" className="object-contain" />
                      </span>
                    )}
                    {method.id === "full" && (
                      <span className="flex items-center gap-0.5 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-extrabold italic text-emerald-600">
                        <Zap className="size-3 fill-current" /> FULL
                      </span>
                    )}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {method.id === "pac" ? (
                      <span className="relative h-3.5 w-6 shrink-0">
                        <Image src="/images/correios-icon.png" alt="Correios" fill sizes="24px" className="object-contain" />
                      </span>
                    ) : (
                      <Truck className="size-3.5" />
                    )}
                    {method.eta}
                  </p>
                </div>
              </div>
              <span className="text-sm font-bold text-foreground">
                {method.price === 0 ? "Grátis" : `R$ ${formatBRL(method.price)}`}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
