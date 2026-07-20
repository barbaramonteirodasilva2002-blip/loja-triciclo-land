"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, ShieldCheck, ShoppingCart, Truck } from "lucide-react"
import { formatBRL } from "@/lib/checkout"
import { cn } from "@/lib/utils"
import { useCart } from "@/components/cart-provider"
import { PaymentMethods } from "@/components/payment-methods"
import { ProductFeatures } from "@/components/product-features"
import type { Product } from "@/lib/products"
import type { Collection } from "@/lib/products"

const trustPoints = [
  "Produto original",
  "Compra 100% segura, com nota fiscal",
]

export function ProductDetail({ product, collection }: { product: Product; collection: Collection }) {
  const cart = useCart()
  const installment = formatBRL(product.priceValue / 12)
  const images = [product.img, ...(product.gallery ?? [])].filter(Boolean)
  const [activeImage, setActiveImage] = useState(0)

  return (
    <section className="mx-auto max-w-6xl px-4 py-6 lg:grid lg:grid-cols-2 lg:gap-10 lg:py-10">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_40%,var(--secondary),white_70%)] shadow-premium">
          <Image
            src={images[activeImage] || "/placeholder.svg"}
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
        {images.length > 1 && (
          <div className="mt-3 grid grid-cols-4 gap-3">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => setActiveImage(i)}
                aria-label={`Ver foto ${i + 1} de ${product.name}`}
                aria-current={activeImage === i}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-xl bg-white shadow-premium ring-2 transition",
                  activeImage === i ? "ring-primary" : "ring-transparent hover:ring-border",
                )}
              >
                <Image src={src} alt="" fill sizes="120px" className="object-contain p-1.5" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 lg:mt-0">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-pink-deep">{collection.name}</p>
        <h1 className="mt-2 text-balance font-heading text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          {product.name}
        </h1>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{product.description}</p>

        <ProductFeatures features={product.features} />

        <div className="mt-5 rounded-2xl border border-border bg-secondary/60 p-5 shadow-premium">
          {product.available ? (
            <>
              <div className="flex flex-wrap items-center gap-2.5">
                {product.oldPrice && (
                  <span className="text-sm text-muted-foreground line-through">R$ {product.oldPrice}</span>
                )}
                <p className="font-heading text-3xl font-bold leading-none tracking-tight text-foreground sm:text-4xl">
                  R$ {product.price}
                </p>
                {product.discountPct && (
                  <span className="rounded-full bg-brand-navy-deep px-2.5 py-1 text-xs font-bold text-white">
                    {product.discountPct}% OFF
                  </span>
                )}
              </div>
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
            className={cn(
              "flex w-full items-center justify-center rounded-xl py-4 font-heading text-lg font-bold transition-transform duration-300",
              product.available
                ? "chrome-gradient-bg text-white shadow-chrome hover:scale-[1.01] active:scale-[0.98]"
                : "cursor-not-allowed bg-muted text-muted-foreground",
            )}
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
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary py-3.5 font-heading text-sm font-bold text-brand-pink-deep transition hover:bg-secondary"
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
