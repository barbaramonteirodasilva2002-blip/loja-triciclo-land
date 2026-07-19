import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { StickyBuyBar } from "@/components/sticky-buy-bar"
import { ProductDetail } from "@/components/product-detail"
import { ProductCard } from "@/components/product-card"
import { PRODUCTS, getCollection, getProduct, getProductsByCollection } from "@/lib/products"

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}
  return {
    title: `${product.name} | Tangle Teezer Brasil`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const collection = getCollection(product.collection)
  if (!collection) notFound()

  const related = getProductsByCollection(collection.slug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-background pb-20">
      <SiteHeader />

      <section className="relative overflow-hidden bg-ink py-5">
        <div aria-hidden="true" className="bristle-lines-dark pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="relative mx-auto max-w-6xl px-4">
          <Link
            href={`/colecoes/${collection.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Voltar para {collection.name}
          </Link>
        </div>
      </section>

      <main>
        <ProductDetail product={product} collection={collection} />

        {related.length > 0 && (
          <section className="bg-secondary/50 py-10">
            <div className="mx-auto max-w-6xl px-4">
              <h2 className="mb-4 font-heading text-xl font-bold text-foreground">
                Mais de {collection.name}
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
      <StickyBuyBar kitId={product.slug} />
    </div>
  )
}
