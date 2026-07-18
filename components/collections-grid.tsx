import Image from "next/image"
import Link from "next/link"
import { COLLECTIONS } from "@/lib/products"

export function CollectionsGrid() {
  return (
    <section id="colecoes" className="scroll-mt-24 bg-secondary/50 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">O catálogo completo</p>
          <h2 className="mt-3 text-balance font-heading text-2xl font-normal text-foreground md:text-3xl">
            Uma escova para cada tipo de fio.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
            Além da The Original, a Tangle Teezer tem linhas específicas por necessidade.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.slug}
              href={`/colecoes/${c.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-square overflow-hidden bg-white">
                <Image
                  src={c.image}
                  alt={`Tangle Teezer ${c.name}`}
                  fill
                  sizes="(max-width: 640px) 45vw, 220px"
                  className="object-contain p-4 transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1 p-4">
                <h3 className="font-heading text-lg font-normal text-foreground">{c.name}</h3>
                <p className="text-xs leading-snug text-muted-foreground">{c.description}</p>
                <span className="mt-auto pt-2 text-xs font-bold text-primary">Ver produtos →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
