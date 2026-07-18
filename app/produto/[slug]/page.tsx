import type { Metadata } from "next"
import { notFound } from "next/navigation"
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

      <main>
        <ProductDetail product={product} collection={collection} />

        {related.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 py-8">
            <h2 className="mb-4 font-heading text-xl font-normal text-foreground">
              Mais de {collection.name}
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
      <StickyBuyBar kitId={product.slug} />
    </div>
  )
}
