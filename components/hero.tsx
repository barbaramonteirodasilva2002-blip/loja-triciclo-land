import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/reveal"

export function Hero() {
  return (
    <section id="inicio" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-secondary/70 to-background">
      <div aria-hidden="true" className="bristle-lines pointer-events-none absolute inset-0 opacity-[0.05]" />

      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:items-center lg:gap-10 lg:py-20">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Parceiro(a) oficial · Tangle Teezer no Brasil
          </p>
          <h1 className="mt-3 text-balance font-heading text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            O fim da
            <br />
            <span className="italic text-primary">dor de pentear.</span>
          </h1>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            Duas fileiras de cerdas escovam duas camadas de cabelo ao mesmo tempo, sem puxar, sem quebrar, sem choro
            de manhã.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <Link
              href="/produto/the-ultimate-detangler"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-7 py-3.5 font-heading text-sm font-bold text-primary-foreground shadow-premium transition-all duration-300 hover:shadow-[var(--shadow-pink)] hover:brightness-105 active:scale-[0.98]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative">Quero desembaraçar meu cabelo</span>
            </Link>
            <a
              href="#colecoes"
              className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-foreground transition hover:gap-2 hover:text-primary"
            >
              Ver produtos <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[2rem] bg-white shadow-premium sm:max-w-md">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(236,29,110,0.08),transparent_65%)]"
              />
              <Image
                src="/products/desembaracar/ultimate-detangler-purple-hero.png"
                alt="Tangle Teezer The Ultimate Detangler Fresh Purple"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 480px"
                className="relative object-contain p-6 drop-shadow-[0_18px_24px_rgba(20,20,20,0.14)]"
              />
            </div>
            <div className="absolute -top-4 right-4 flex size-24 flex-col items-center justify-center rounded-full bg-brand-teal-soft text-center shadow-premium ring-4 ring-background sm:right-8">
              <span className="text-lg font-bold leading-none text-accent">2</span>
              <span className="mt-1 text-[9px] font-bold uppercase leading-tight text-accent">
                camadas
                <br />
                1 escovada
              </span>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Tangle Teezer · The Ultimate Detangler Fresh Purple
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
