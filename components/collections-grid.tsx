import Image from "next/image"
import Link from "next/link"
import { COLLECTIONS } from "@/lib/products"
import { Reveal } from "@/components/reveal"

export function CollectionsGrid() {
  return (
    <section id="colecoes" className="scroll-mt-24 bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink-deep">O catálogo completo</p>
          <h2 className="mt-3 text-balance font-heading text-2xl font-bold text-foreground md:text-3xl">
            Uma escova para cada tipo de fio.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
            Além da The Original, a Tangle Teezer tem linhas específicas por necessidade.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60}>
              <Link
                href={`/colecoes/${c.slug}`}
                className="chrome-border group shadow-premium-hover flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-premium before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
              >
                <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_50%_40%,var(--paper-soft,var(--secondary)),white_70%)]">
                  <Image
                    src={c.image}
                    alt={`Tangle Teezer ${c.name}`}
                    fill
                    sizes="(max-width: 640px) 45vw, 220px"
                    className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1 p-4">
                  <h3 className="font-heading text-lg font-bold text-foreground">{c.name}</h3>
                  <p className="text-xs leading-snug text-muted-foreground">{c.description}</p>
                  <span className="mt-auto flex items-center gap-1 pt-2 text-xs font-bold text-brand-pink-deep transition-all group-hover:gap-2">
                    Ver produtos <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
