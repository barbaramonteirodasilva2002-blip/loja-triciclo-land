import Image from "next/image"
import { Check } from "lucide-react"
import { formatBRL } from "@/lib/checkout"
import type { Kit } from "@/lib/checkout"
import type { CardBrand } from "@/lib/format"

export type ConfirmationData = {
  orderId: string
  customer: { name: string; email: string; phone: string; cpf: string }
  address: { cep: string; street: string; number: string; complement?: string; neighborhood: string; city: string; state: string }
  paymentMethod: "pix" | "cartao"
  installments: number
  cardBrand?: CardBrand
  cardLast4?: string
  lines: { kit: Kit; quantity: number }[]
  subtotal: number
  shippingLabel: string
  shippingValue: number
  total: number
}

export function OrderConfirmation({ data }: { data: ConfirmationData }) {
  const { customer, address, lines } = data

  return (
    <div className="mx-auto max-w-lg space-y-5 px-4 py-8">
      <div className="text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Check className="size-8" />
        </div>
        <h1 className="mt-5 font-heading text-2xl font-bold text-foreground">Pedido confirmado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Você receberá em instantes um e-mail em{" "}
          <span className="font-semibold text-foreground">{customer.email}</span> com os detalhes do seu pedido.
        </p>
        <p className="mt-2 text-sm font-bold text-accent">Número do pedido: {data.orderId}</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-foreground">Dados Pessoais</p>
        <div className="mt-2 space-y-0.5 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">{customer.name}</p>
          <p>{customer.cpf}</p>
          <p>{customer.email}</p>
          <p>{customer.phone}</p>
        </div>

        <p className="mt-4 text-sm font-bold uppercase tracking-wide text-foreground">Endereço do pedido</p>
        <div className="mt-2 space-y-0.5 text-sm text-muted-foreground">
          <p>
            {address.street}, {address.number}
            {address.complement ? `, ${address.complement}` : ""}
          </p>
          <p>
            {address.neighborhood}, {address.city}/{address.state}
          </p>
          <p>{address.cep}</p>
        </div>

        <p className="mt-4 text-sm font-bold uppercase tracking-wide text-foreground">Forma de Pagamento</p>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          {data.paymentMethod === "pix" ? (
            <span>Pix</span>
          ) : (
            <>
              {data.cardBrand && (
                <div className="relative h-4 w-7 shrink-0">
                  <Image src={`/images/cards/${data.cardBrand}.svg`} alt={data.cardBrand} fill sizes="28px" className="object-contain" />
                </div>
              )}
              <span>
                Cartão de crédito {data.installments > 1 ? `(${data.installments}x)` : "(à vista)"}
                {data.cardLast4 ? `, final ${data.cardLast4}` : ""}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-foreground">Resumo do Pedido</p>
        <div className="mt-3 space-y-3">
          {lines.map(({ kit, quantity }) => (
            <div key={kit.id} className="flex items-center gap-3">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-white">
                <Image src={kit.img} alt={kit.units} fill sizes="48px" className="object-contain" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{kit.units}</p>
                <p className="text-xs text-muted-foreground">
                  {kit.subtitle} · {quantity}x
                </p>
              </div>
              <span className="text-sm font-semibold text-foreground">R$ {formatBRL(kit.priceValue * quantity)}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-1.5 border-t border-border pt-3 text-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>R$ {formatBRL(data.subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Frete ({data.shippingLabel})</span>
            <span className={data.shippingValue === 0 ? "font-semibold text-emerald-600" : undefined}>
              {data.shippingValue === 0 ? "Grátis" : `R$ ${formatBRL(data.shippingValue)}`}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-1.5">
            <span className="font-heading font-bold text-foreground">Total</span>
            <span className="font-heading text-lg font-extrabold text-brand-navy">R$ {formatBRL(data.total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
