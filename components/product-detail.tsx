"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, ShieldCheck, ShoppingCart, Truck } from "lucide-react"
import { formatBRL } from "@/lib/checkout"
import { useCart } from "@/components/cart-provider"
import { PaymentMethods } from "@/components/payment-methods"
import type { Product } from "@/lib/products"
import type { Collection } from "@/lib/products"

const trustPoints = [
  "Produto original, com selo de autenticidade",
  "Revenda autorizada, sem risco de falsificação",
]

export function ProductDetail({ product, collection }: { product: Product; collection: Collection }) {
  const cart = useCart()
  const installment = formatBRL(product.priceValue / 12)

  return (
    <section className="mx-auto max-w-6xl px-4 py-6 lg:grid lg:grid-cols-2 lg:gap-10 lg:py-10">
      <div>
        <Link
          href={`/colecoes/${collection.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Voltar para {collection.name}
        </Link>

        <div className="relative mt-4 aspect-square overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_40%,var(--secondary),white_70%)] shadow-premium">
          <Image
            src={product.img || "/placeholder.svg"}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-6 drop-shadow-[0_14px_20px_rgba(20,20,20,0.12)]"
          />
          {product.discountPct && (
            <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
              {product.discountPct}% OFF
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 lg:mt-0">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">{collection.name}</p>
        <h1 className="mt-2 text-balance font-heading text-2xl font-normal leading-tight text-foreground sm:text-3xl">
          {product.name}
        </h1>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{product.description}</p>

        <div className="mt-5 rounded-2xl border border-border bg-secondary/60 p-5 shadow-premium">
          {product.available ? (
            <>
              <div className="flex items-center gap-3">
                {product.oldPrice && (
                  <span className="text-sm text-muted-foreground line-through">R$ {product.oldPrice}</span>
                )}
                {product.discountPct && (
                  <span className="rounded-full bg-brand-navy-deep px-2.5 py-1 text-xs font-bold text-white">
                    {product.discountPct}% OFF
                  </span>
                )}
              </div>
              <p className="mt-1 font-heading text-4xl font-bold leading-none tracking-tight text-foreground sm:text-5xl">
                R$ {product.price}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                no Pix ou em até <span className="font-semibold text-foreground">12x de R$ {installment}</span> no
                cartão
              </p>
            </>
          ) : (
            <p className="font-heading text-2xl font-bold text-muted-foreground">Produto indisponível no momento</p>
          )}
        </div>

        <div className="mt-5 space-y-2">
          {trustPoints.map((t) => (
            <p key={t} className="flex items-start gap-2.5 text-sm text-foreground/90">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Check className="size-3.5" />
              </span>
              {t}
            </p>
          ))}
        </div>

        <div className="mt-5 space-y-2.5">
          <button
            type="button"
            disabled={!product.available}
            onClick={() => {
              cart.addItem(product.slug, 1)
              window.location.href = "/checkout"
            }}
            className="flex w-full items-center justify-center rounded-xl bg-primary py-4 font-heading text-lg font-bold text-primary-foreground shadow-premium transition-all duration-300 hover:shadow-[var(--shadow-pink)] hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
          >
            {product.available ? "Quero este" : "Indisponível"}
          </button>
          {product.available && (
            <button
              type="button"
              onClick={() => {
                cart.addItem(product.slug, 1)
                cart.open()
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary py-3.5 font-heading text-sm font-bold text-primary transition hover:bg-secondary"
            >
              <ShoppingCart className="size-4" /> Adicionar ao carrinho
            </button>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 border-t border-border pt-5 text-center">
          <div className="flex flex-col items-center gap-1.5">
            <ShieldCheck className="size-5 text-primary" />
            <span className="text-xs text-muted-foreground">Compra segura</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Truck className="size-5 text-primary" />
            <span className="text-xs text-muted-foreground">Frete grátis</span>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <PaymentMethods />
        </div>
      </div>
    </section>
  )
}
