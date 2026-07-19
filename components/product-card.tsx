"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/products"

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart()

  return (
    <div className="chrome-border group shadow-premium-hover flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-premium before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">
      <Link
        href={`/produto/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-[radial-gradient(circle_at_50%_40%,var(--secondary),white_70%)]"
      >
        <Image
          src={product.img || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 45vw, 220px"
          className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.08]"
        />
        {!product.available ? (
          <span className="absolute left-2 top-2 rounded-full bg-foreground/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Indisponível
          </span>
        ) : product.discountPct ? (
          <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
            {product.discountPct}% off
          </span>
        ) : product.bestSeller ? (
          <span className="chrome-gradient-bg absolute left-2 top-2 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-chrome">
            Mais vendido
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-pretty text-sm font-semibold leading-snug text-foreground hover:underline">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto">
          {product.available ? (
            <div className="flex items-baseline gap-1.5">
              {product.oldPrice && (
                <span className="text-xs text-muted-foreground line-through">R$ {product.oldPrice}</span>
              )}
              <span className="font-heading text-lg font-bold text-foreground">R$ {product.price}</span>
            </div>
          ) : (
            <span className="text-sm font-semibold text-muted-foreground">R$ {product.price}</span>
          )}

          <button
            type="button"
            disabled={!product.available}
            onClick={() => {
              cart.addItem(product.slug, 1)
              cart.open()
            }}
            className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-full bg-primary py-2 text-xs font-bold text-primary-foreground transition-all duration-200 hover:bg-brand-pink-deep active:scale-[0.97] disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
          >
            <ShoppingCart className="size-3.5" />
            {product.available ? "Quero este" : "Indisponível"}
          </button>
        </div>
      </div>
    </div>
  )
}
