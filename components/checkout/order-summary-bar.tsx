"use client"

import Image from "next/image"
import { Minus, Plus, Tag, Trash2, ShieldCheck } from "lucide-react"
import { formatBRL } from "@/lib/checkout"
import type { Kit, KitId } from "@/lib/checkout"

export type CouponStatus = "idle" | "loading" | "applied" | "invalid"

export type SummaryLine = {
  kit: Kit
  quantity: number
}

export function OrderSummaryBar({
  lines,
  onQuantityChange,
  onRemove,
  couponCode,
  onCouponCodeChange,
  onApplyCoupon,
  couponStatus,
  subtotal,
  discountValue,
  pixDiscountPercent,
  shippingValue,
  total,
}: {
  lines: SummaryLine[]
  onQuantityChange: (kitId: KitId, quantity: number) => void
  onRemove: (kitId: KitId) => void
  couponCode: string
  onCouponCodeChange: (v: string) => void
  onApplyCoupon: () => void
  couponStatus: CouponStatus
  subtotal: number
  discountValue: number
  pixDiscountPercent: number
  shippingValue: number
  total: number
}) {
  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0)

  return (
    <div className="border-b border-border bg-card shadow-sm">
      <div className="bg-brand-navy-deep">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-2 px-4 py-2.5 text-center text-xs font-semibold text-white sm:text-sm">
          <span aria-hidden="true" className="text-base leading-none">🚚</span>
          <span>
            Produto original com <span className="text-accent">selo de autenticidade</span> Tangle Teezer
          </span>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-3">
        <span className="text-sm font-semibold text-foreground">Resumo do pedido</span>
        <span className="font-heading text-lg font-extrabold text-brand-navy">R$ {formatBRL(total)}</span>
      </div>

      <div className="mx-auto max-w-3xl space-y-4 border-t border-border px-4 pb-4 pt-3">
          <div className="space-y-3">
            {lines.map(({ kit, quantity }) => (
              <div key={kit.id} className="flex items-center gap-3">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-white">
                  <Image src={kit.img} alt={kit.units} fill sizes="56px" className="object-contain" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{kit.units}</p>
                  <p className="text-xs text-muted-foreground">{kit.subtitle}</p>
                </div>
                <div className="flex items-center gap-1 rounded-lg border border-border">
                  <button
                    type="button"
                    onClick={() => onQuantityChange(kit.id, quantity - 1)}
                    className="flex size-8 items-center justify-center text-muted-foreground transition hover:text-foreground"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-foreground">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => onQuantityChange(kit.id, quantity + 1)}
                    className="flex size-8 items-center justify-center text-muted-foreground transition hover:text-foreground"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
                <span className="w-20 shrink-0 text-right text-sm font-semibold text-foreground">
                  R$ {formatBRL(kit.priceValue * quantity)}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(kit.id)}
                  aria-label="Remover item"
                  className="shrink-0 text-muted-foreground/60 transition hover:text-[#d9534f]"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-dashed border-emerald-400/60 bg-emerald-50 p-3">
            <ShieldCheck className="size-6 shrink-0 text-emerald-600" />
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">Revenda autorizada Tangle Teezer</p>
              <p className="text-xs text-emerald-600">Produto original, sem risco de falsificação</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <label htmlFor="coupon-code" className="sr-only">
                  Cupom de desconto
                </label>
                <Tag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="coupon-code"
                  name="coupon-code"
                  autoComplete="off"
                  value={couponCode}
                  onChange={(e) => onCouponCodeChange(e.target.value.toUpperCase())}
                  placeholder="Digite um cupom"
                  className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm text-foreground outline-none focus:border-brand-navy"
                />
              </div>
              <button
                type="button"
                onClick={onApplyCoupon}
                disabled={!couponCode || couponStatus === "loading"}
                className="shrink-0 rounded-lg bg-secondary px-3.5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary/70 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {couponStatus === "loading" ? "..." : "Aplicar"}
              </button>
            </div>
            {couponStatus === "applied" && <p className="mt-1.5 text-xs font-semibold text-emerald-600">Cupom aplicado!</p>}
            {couponStatus === "invalid" && <p className="mt-1.5 text-xs font-semibold text-[#d9534f]">Cupom inválido ou expirado.</p>}
          </div>

          <div className="space-y-1.5 border-t border-border pt-3 text-sm">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Produtos ({itemCount})</span>
              <span>R$ {formatBRL(subtotal)}</span>
            </div>
            {discountValue > 0 && (
              <div className="flex items-center justify-between text-emerald-600">
                <span className="flex items-center gap-1.5">
                  Desconto
                  {pixDiscountPercent > 0 && (
                    <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                      Pix
                    </span>
                  )}
                </span>
                <span>-R$ {formatBRL(discountValue)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Frete</span>
              <span className={shippingValue === 0 ? "font-semibold text-emerald-600" : undefined}>
                {shippingValue === 0 ? "Grátis" : `R$ ${formatBRL(shippingValue)}`}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-1.5">
              <span className="font-heading font-bold text-foreground">Total</span>
              <div className="text-right">
                <span className="font-heading text-xl font-extrabold text-brand-navy">R$ {formatBRL(total)}</span>
                <p className="text-xs text-muted-foreground">ou 12x de R$ {formatBRL(total / 12)}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
