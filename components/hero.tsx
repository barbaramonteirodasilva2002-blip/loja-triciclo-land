import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section id="inicio" className="scroll-mt-24 overflow-hidden bg-gradient-to-b from-secondary/70 to-background">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:items-center lg:gap-10 lg:py-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Parceiro(a) oficial · Tangle Teezer no Brasil
          </p>
          <h1 className="mt-3 text-balance font-heading text-4xl font-normal leading-[1.05] text-foreground sm:text-5xl">
            O fim da
            <br />
            <span className="italic text-primary">dor de pentear.</span>
          </h1>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Duas fileiras de cerdas escovam duas camadas de cabelo ao mesmo tempo, sem puxar, sem quebrar, sem choro
            de manhã.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/produto/the-ultimate-detangler"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 font-heading text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110"
            >
              Quero desembaraçar meu cabelo
            </Link>
            <a
              href="#colecoes"
              className="inline-flex items-center justify-center gap-1 px-2 py-3.5 text-sm font-semibold text-foreground transition hover:text-primary"
            >
              Ver produtos →
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl bg-white sm:max-w-md">
            <Image
              src="/products/desembaracar/ultimate-detangler-purple-hero.png"
              alt="Tangle Teezer The Ultimate Detangler Fresh Purple"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-contain p-6"
            />
          </div>
          <div className="absolute -top-4 right-4 flex size-24 flex-col items-center justify-center rounded-full bg-brand-teal-soft text-center shadow-lg sm:right-8">
            <span className="text-lg font-bold leading-none text-accent">2</span>
            <span className="mt-1 text-[9px] font-bold uppercase leading-tight text-accent">
              camadas
              <br />
              1 escovada
            </span>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Tangle Teezer · The Ultimate Detangler Fresh Purple
          </p>
        </div>
      </div>
    </section>
  )
}
