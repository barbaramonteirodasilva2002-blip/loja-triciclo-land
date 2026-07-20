import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { Parallax } from "@/components/parallax"
import { Reveal } from "@/components/reveal"
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

      <section className="relative overflow-hidden bg-ink py-14">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="bristle-lines-dark absolute inset-0 opacity-[0.06]" />
          <Parallax speed={0.15} className="absolute -left-24 top-0">
            <div className="animate-drift-a size-[26rem] rounded-full bg-primary/20 blur-[100px]" />
          </Parallax>
          <Parallax speed={-0.12} className="absolute -right-24 bottom-0">
            <div className="animate-drift-b size-[22rem] rounded-full bg-brand-violet/20 blur-[100px]" />
          </Parallax>
        </div>
        <div className="relative mx-auto max-w-6xl px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Voltar para a página inicial
          </Link>
          <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-teal-bright">Coleção</p>
          <h1 className="mt-1 text-balance font-heading text-3xl font-bold text-white sm:text-4xl">
            {collection.name}
          </h1>
          <p className="mt-2 max-w-xl text-pretty text-white/60">{collection.description}</p>
          {collection.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {collection.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-14">
        <p className="mb-5 text-sm font-semibold text-foreground">
          {products.length} {products.length === 1 ? "produto" : "produtos"}
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 4) * 60}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
