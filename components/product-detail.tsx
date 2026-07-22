"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Check, Minus, Plus, ShieldCheck, ShoppingBag, ShoppingCart, Truck } from "lucide-react"
import { formatBRL } from "@/lib/checkout"
import { cn } from "@/lib/utils"
import { useCart } from "@/components/cart-provider"
import { PaymentMethods } from "@/components/payment-methods"
import { ProductFeatures } from "@/components/product-features"
import { ProductShippingCalculator } from "@/components/product-shipping-calculator"
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
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const zoomRef = useRef<HTMLDivElement>(null)
  const [zoomOrigin, setZoomOrigin] = useState<string | null>(null)

  function handleZoomMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = zoomRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomOrigin(`${x}% ${y}%`)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-6 lg:grid lg:grid-cols-2 lg:gap-10 lg:py-10">
      <div>
        <div
          ref={zoomRef}
          onMouseMove={handleZoomMove}
          onMouseLeave={() => setZoomOrigin(null)}
          className="relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_40%,var(--secondary),white_70%)] shadow-premium"
        >
          <Image
            key={images[activeImage]}
            src={images[activeImage] || "/placeholder.svg"}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={zoomOrigin ? { transformOrigin: zoomOrigin, transform: "scale(2.2)" } : undefined}
            className="animate-fade-in-up object-contain p-6 drop-shadow-[0_14px_20px_rgba(20,20,20,0.12)] transition-transform duration-200 ease-out"
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

        {product.available && (
          <div className="mt-5 flex items-center gap-3">
            <div className="flex shrink-0 items-center rounded-xl border border-border">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Diminuir quantidade"
                className="flex size-11 items-center justify-center text-foreground transition hover:bg-secondary"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center font-heading font-bold text-foreground">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                aria-label="Aumentar quantidade"
                className="flex size-11 items-center justify-center text-foreground transition hover:bg-secondary"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                cart.addItem(product.slug, quantity)
                window.location.href = "/checkout"
              }}
              className="chrome-gradient-bg flex flex-1 items-center justify-center rounded-xl py-4 font-heading text-lg font-bold text-white shadow-chrome transition-transform duration-300 hover:scale-[1.01] active:scale-[0.98]"
            >
              Quero este
            </button>
          </div>
        )}
        {!product.available && (
          <button
            type="button"
            disabled
            className="mt-5 flex w-full cursor-not-allowed items-center justify-center rounded-xl bg-muted py-4 font-heading text-lg font-bold text-muted-foreground"
          >
            Indisponível
          </button>
        )}
        {product.available && (
          <button
            type="button"
            onClick={() => {
              cart.addItem(product.slug, quantity)
              setAdded(true)
              setTimeout(() => {
                setAdded(false)
                cart.open()
              }, 550)
            }}
            className={cn(
              "mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border-2 py-3.5 font-heading text-sm font-bold transition",
              added
                ? "border-accent bg-accent/10 text-accent"
                : "border-primary text-brand-pink-deep hover:bg-secondary",
            )}
          >
            {added ? (
              <>
                <ShoppingBag className="size-4" /> Adicionado!
              </>
            ) : (
              <>
                <ShoppingCart className="size-4" /> Adicionar ao carrinho
              </>
            )}
          </button>
        )}

        <ProductShippingCalculator />

        <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">{product.description}</p>

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
