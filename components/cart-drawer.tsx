"use client"

import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { getKit, formatBRL } from "@/lib/checkout"
import { useCart } from "@/components/cart-provider"

export function CartDrawer() {
  const cart = useCart()

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-300",
        cart.isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!cart.isOpen}
    >
      <div className="absolute inset-0 bg-brand-navy-deep/70 backdrop-blur-sm" onClick={cart.close} />

      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-background shadow-2xl transition-transform duration-300",
          cart.isOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Carrinho de compras"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <p className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
            <ShoppingBag className="size-5 text-brand-navy" /> Seu Carrinho
          </p>
          <button
            type="button"
            onClick={cart.close}
            aria-label="Fechar carrinho"
            className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-secondary"
          >
            <X className="size-5" />
          </button>
        </div>

        {cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="size-10 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">Seu carrinho está vazio.</p>
            <button
              type="button"
              onClick={cart.close}
              className="mt-1 rounded-xl bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Continuar comprando
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {cart.items.map((item) => {
                  const kit = getKit(item.kitId)
                  return (
                    <li key={item.kitId} className="flex gap-3">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-secondary/60">
                        <Image src={kit.img} alt={kit.units} fill sizes="64px" className="object-contain" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{kit.units}</p>
                        <p className="text-xs text-muted-foreground">{kit.subtitle}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-lg border border-border">
                            <button
                              type="button"
                              onClick={() => cart.updateQuantity(item.kitId, item.quantity - 1)}
                              className="flex size-7 items-center justify-center text-muted-foreground transition hover:text-foreground"
                              aria-label="Diminuir quantidade"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-5 text-center text-xs font-semibold text-foreground">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => cart.updateQuantity(item.kitId, item.quantity + 1)}
                              className="flex size-7 items-center justify-center text-muted-foreground transition hover:text-foreground"
                              aria-label="Aumentar quantidade"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-foreground">R$ {formatBRL(kit.priceValue * item.quantity)}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => cart.removeItem(item.kitId)}
                        aria-label="Remover item"
                        className="self-start text-muted-foreground/60 transition hover:text-[#d9534f]"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="border-t border-border px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-foreground">Total</span>
                <span className="font-heading text-xl font-extrabold text-brand-navy">R$ {formatBRL(cart.totalValue)}</span>
              </div>
              <a
                href="/checkout"
                className="chrome-gradient-bg mt-3 flex w-full items-center justify-center rounded-xl py-3.5 font-heading text-sm font-bold text-white shadow-chrome transition-transform duration-300 hover:scale-[1.01]"
              >
                Finalizar Compra
              </a>
              <button
                type="button"
                onClick={cart.close}
                className="mt-2 w-full py-2 text-center text-xs font-medium text-muted-foreground transition hover:text-foreground"
              >
                Continuar comprando
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
