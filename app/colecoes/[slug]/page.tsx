import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { COLLECTIONS, getCollection, getProductsByCollection } from "@/lib/products"

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const collection = getCollection(slug)
  if (!collection) return {}
  return {
    title: `${collection.name} | Tangle Teezer Brasil`,
    description: collection.description,
  }
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = getCollection(slug)
  if (!collection) notFound()

  const products = getProductsByCollection(collection.slug)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative overflow-hidden bg-secondary/50 py-14">
        <div aria-hidden="true" className="bristle-lines pointer-events-none absolute inset-0 opacity-[0.04]" />
        <div className="relative mx-auto max-w-6xl px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Voltar para a página inicial
          </Link>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">Coleção</p>
          <h1 className="mt-1 text-balance font-heading text-3xl font-normal text-foreground sm:text-4xl">
            {collection.name}
          </h1>
          <p className="mt-2 max-w-xl text-pretty text-muted-foreground">{collection.description}</p>
          {collection.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {collection.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground/80 shadow-premium"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-14">
        <p className="mb-5 text-xs text-muted-foreground">
          Nome, preço, disponibilidade e foto reais, usados com autorização de revendedor(a) oficial.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
