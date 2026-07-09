"use client"

import Image from "next/image"
import { CreditCard, QrCode, Truck } from "lucide-react"
import { cn } from "@/lib/utils"
import { detectCardBrand, formatCardNumber, formatExpiry } from "@/lib/format"
import { formatBRL, PIX_DISCOUNT_PERCENT } from "@/lib/checkout"

export type CardFields = {
  number: string
  holderName: string
  expiry: string
  cvv: string
}

export type PaymentMethod = "pix" | "cartao"

export function PaymentSection({
  paymentMethod,
  onPaymentMethodChange,
  card,
  onCardChange,
  installments,
  onInstallmentsChange,
  priceValue,
  errors,
}: {
  paymentMethod: PaymentMethod
  onPaymentMethodChange: (method: PaymentMethod) => void
  card: CardFields
  onCardChange: (field: keyof CardFields, value: string) => void
  installments: number
  onInstallmentsChange: (n: number) => void
  priceValue: number
  errors?: Partial<Record<keyof CardFields, string>>
}) {
  const brand = detectCardBrand(card.number)

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-wide text-foreground">Forma de pagamento</p>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => onPaymentMethodChange("pix")}
          className={cn(
            "relative flex flex-col items-center justify-center gap-0.5 rounded-xl border-2 py-3 text-sm font-semibold transition",
            paymentMethod === "pix" ? "border-brand-navy bg-secondary text-brand-navy" : "border-border text-muted-foreground hover:border-brand-navy/40",
          )}
        >
          <span className="absolute -top-2.5 right-2 whitespace-nowrap rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700">
            {PIX_DISCOUNT_PERCENT}% DE DESCONTO
          </span>
          <span className="flex items-center gap-2">
            <QrCode className="size-4" /> Pix
          </span>
          <span className="text-[11px] font-semibold text-emerald-600">Aprovação imediata</span>
        </button>
        <button
          type="button"
          onClick={() => onPaymentMethodChange("cartao")}
          className={cn(
            "flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition",
            paymentMethod === "cartao" ? "border-brand-navy bg-secondary text-brand-navy" : "border-border text-muted-foreground hover:border-brand-navy/40",
          )}
        >
          <CreditCard className="size-4" /> Cartão de crédito
        </button>
      </div>

      {paymentMethod === "pix" && (
        <div className="mt-4 space-y-2.5">
          <div className="flex items-start gap-3 rounded-xl bg-secondary/60 p-4">
            <QrCode className="mt-0.5 size-5 shrink-0 text-brand-navy" />
            <p className="text-sm text-muted-foreground">
              Ao finalizar o pedido, geramos um QR Code Pix para você pagar pelo app do seu banco. A confirmação
              costuma ser em poucos segundos.
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-secondary/60 p-4">
            <Truck className="mt-0.5 size-5 shrink-0 text-brand-navy" />
            <p className="text-sm text-muted-foreground">
              Pedidos pagos via Pix têm <span className="font-semibold text-foreground">envio imediato</span>, sem
              esperar a compensação.
            </p>
          </div>
        </div>
      )}

      {paymentMethod === "cartao" && (
        <div className="mt-4 space-y-3">
          <div>
            <label htmlFor="cc-number" className="text-xs font-semibold text-muted-foreground">
              Número do cartão
            </label>
            <div className="relative mt-1">
              <input
                id="cc-number"
                name="cc-number"
                autoComplete="cc-number"
                inputMode="numeric"
                placeholder="0000 0000 0000 0000"
                value={card.number}
                onChange={(e) => onCardChange("number", formatCardNumber(e.target.value))}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-3 pr-12 text-sm text-foreground outline-none focus:border-brand-navy"
              />
              {brand && (
                <div className="absolute right-3 top-1/2 h-5 w-8 -translate-y-1/2">
                  <Image src={`/images/cards/${brand}.svg`} alt={brand} fill sizes="32px" className="object-contain" />
                </div>
              )}
            </div>
            {errors?.number && <p className="mt-1 text-xs text-[#d9534f]">{errors.number}</p>}
          </div>

          <div>
            <label htmlFor="cc-name" className="text-xs font-semibold text-muted-foreground">
              Nome impresso no cartão
            </label>
            <input
              id="cc-name"
              name="cc-name"
              autoComplete="cc-name"
              placeholder="Como está no cartão"
              value={card.holderName}
              onChange={(e) => onCardChange("holderName", e.target.value.toUpperCase())}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none focus:border-brand-navy"
            />
            {errors?.holderName && <p className="mt-1 text-xs text-[#d9534f]">{errors.holderName}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="cc-expiry" className="text-xs font-semibold text-muted-foreground">
                Validade
              </label>
              <input
                id="cc-expiry"
                name="cc-exp"
                autoComplete="cc-exp"
                inputMode="numeric"
                placeholder="MM/AA"
                value={card.expiry}
                onChange={(e) => onCardChange("expiry", formatExpiry(e.target.value))}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none focus:border-brand-navy"
              />
              {errors?.expiry && <p className="mt-1 text-xs text-[#d9534f]">{errors.expiry}</p>}
            </div>
            <div>
              <label htmlFor="cc-cvv" className="text-xs font-semibold text-muted-foreground">
                CVV
              </label>
              <input
                id="cc-cvv"
                name="cc-csc"
                autoComplete="cc-csc"
                inputMode="numeric"
                placeholder="000"
                value={card.cvv}
                onChange={(e) => onCardChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none focus:border-brand-navy"
              />
              {errors?.cvv && <p className="mt-1 text-xs text-[#d9534f]">{errors.cvv}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="cc-installments" className="text-xs font-semibold text-muted-foreground">
              Parcelas
            </label>
            <select
              id="cc-installments"
              name="cc-installments"
              value={installments}
              onChange={(e) => onInstallmentsChange(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none focus:border-brand-navy"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}x de R$ {formatBRL(priceValue / n)} {n === 1 ? "à vista" : "sem juros"}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
