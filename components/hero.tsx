import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { Parallax } from "@/components/parallax"
import { HeroProductVisual } from "@/components/hero-product-visual"

export function Hero() {
  return (
    <section id="inicio" className="relative scroll-mt-24 overflow-hidden bg-ink">
      {/* Atmosfera: blobs de luz cromada com parallax de scroll, textura de cerdas sutil */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bristle-lines-dark absolute inset-0 opacity-[0.07]" />
        <Parallax speed={0.18} className="absolute -left-24 top-0">
          <div className="animate-drift-a size-[32rem] rounded-full bg-primary/25 blur-[100px]" />
        </Parallax>
        <Parallax speed={-0.14} className="absolute -right-24 top-1/3">
          <div className="animate-drift-b size-[28rem] rounded-full bg-brand-violet/25 blur-[100px]" />
        </Parallax>
        <Parallax speed={0.1} className="absolute bottom-0 left-1/3">
          <div className="size-[24rem] rounded-full bg-brand-teal-bright/15 blur-[100px]" />
        </Parallax>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-2 lg:items-center lg:gap-10 lg:py-24">
        <Reveal>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-brand-teal-bright">
            Escovas Tangle Teezer no Brasil
          </p>
          <h1 className="mt-4 text-balance font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl">
            O fim da
            <br />
            <span className="chrome-gradient-text font-accent italic">dor de pentear.</span>
          </h1>
          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-white/60">
            Duas fileiras de cerdas escovam duas camadas de cabelo ao mesmo tempo, sem puxar, sem quebrar, sem choro
            de manhã.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/produto/the-ultimate-detangler"
              className="chrome-gradient-bg group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 font-heading text-sm font-bold text-white shadow-chrome transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative">Quero desembaraçar meu cabelo</span>
            </Link>
            <a
              href="#colecoes"
              className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-white transition hover:gap-2 hover:text-brand-teal-bright"
            >
              Ver produtos <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Parallax speed={0.06} className="relative">
            <Link href="/produto/ultimate-detangler-chrome-midnight-silver" className="block">
              <HeroProductVisual
                src="/products/desembaracar/ultimate-detangler-mauve.webp"
                alt="Tangle Teezer The Ultimate Detangler Mauve"
              />
              <div className="chrome-gradient-bg-badge absolute -top-4 right-4 flex size-24 flex-col items-center justify-center rounded-full text-center shadow-chrome ring-2 ring-white/40 sm:right-8">
                <span className="font-mono text-lg font-bold leading-none text-white">2</span>
                <span className="mt-1 font-mono text-[9px] font-bold uppercase leading-tight text-white/90">
                  camadas
                  <br />
                  1 escovada
                </span>
              </div>
              <p className="mt-4 text-center text-xs text-white/50">
                Tangle Teezer · The Ultimate Detangler Mauve · Mais vendida
              </p>
            </Link>
          </Parallax>
        </Reveal>
      </div>
    </section>
  )
}
