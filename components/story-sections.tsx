import { Check, X } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Parallax } from "@/components/parallax"

export function ProblemSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <Reveal className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink-deep">Você conhece essa cena</p>
        <h2 className="mt-3 text-balance font-heading text-2xl font-bold text-foreground md:text-3xl">
          7h da manhã. Escova comum na mão, nó atrás do nó.
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          E aquele puxão que arranca fio de cabelo, e a paciência, junto. No fim, cabelo quebrado, couro cabeludo
          dolorido e mais um dia começando estressado.
        </p>
        <p className="mt-4 font-accent text-xl italic text-brand-pink-deep">
          O problema nunca foi o seu cabelo. Foi a escova.
        </p>
      </Reveal>
    </section>
  )
}

export function MechanismSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-16 md:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bristle-lines-dark absolute inset-0 opacity-[0.06]" />
        <Parallax speed={0.15} className="absolute right-0 top-0">
          <div className="animate-drift-b size-[26rem] rounded-full bg-brand-violet/20 blur-[110px]" />
        </Parallax>
        <Parallax speed={-0.12} className="absolute bottom-0 left-0">
          <div className="animate-drift-a size-[22rem] rounded-full bg-primary/15 blur-[110px]" />
        </Parallax>
      </div>
      <Reveal className="relative mx-auto max-w-3xl px-4 text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-brand-teal-bright">O mecanismo</p>
        <h2 className="mt-3 text-balance font-heading text-2xl font-bold text-white md:text-3xl">
          Duas camadas de cabelo. Uma escovada.
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-chrome backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.08]">
            <p className="font-mono text-xs font-bold uppercase tracking-wide text-brand-teal-bright">
              Cerdas longas
            </p>
            <p className="mt-2 text-sm text-white/70">Trabalham a camada externa do cabelo.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-chrome backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.08]">
            <p className="font-mono text-xs font-bold uppercase tracking-wide text-primary">Cerdas curtas</p>
            <p className="mt-2 text-sm text-white/70">Alcançam a camada mais próxima do couro cabeludo.</p>
          </div>
        </div>

        <p className="mt-6 text-pretty leading-relaxed text-white/60">
          As duas fileiras se movem juntas, na mesma escovada, desembaraçando por dentro e por fora ao mesmo tempo,
          sem prender e sem puxar.
        </p>
      </Reveal>
    </section>
  )
}

const comparisonRows = [
  { label: "Sensação ao escovar", common: "Puxa e machuca", tangle: "Desliza sem dor" },
  { label: "Quebra e queda", common: "Aumenta com o atrito", tangle: "Reduz o atrito nos fios" },
  { label: "Cabelo molhado", common: "Não recomendado", tangle: "Pode usar molhado ou seco" },
  { label: "Tempo na rotina", common: "Várias passadas por nó", tangle: "Menos passadas, mais rápido" },
]

export function ComparisonSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink-deep">A diferença</p>
          <h2 className="mt-3 text-balance font-heading text-2xl font-bold text-foreground md:text-3xl">
            Escova comum vs. Tangle Teezer
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-10 overflow-hidden rounded-2xl border border-border shadow-premium">
          <div className="chrome-gradient-bg grid grid-cols-[1.2fr_1fr_1fr] text-center text-xs font-bold uppercase tracking-wide text-white">
            <div className="p-4 text-left" />
            <div className="p-4 text-white/80">Escova comum</div>
            <div className="p-4">Tangle Teezer</div>
          </div>
          {comparisonRows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1.2fr_1fr_1fr] items-center text-sm ${i % 2 ? "bg-card" : "bg-background"}`}
            >
              <div className="border-r border-border p-4 text-left font-medium text-foreground">{row.label}</div>
              <div className="flex items-center justify-center gap-1.5 border-r border-border p-3 text-center text-xs text-muted-foreground sm:p-4 sm:text-sm">
                <X className="size-3.5 shrink-0 text-muted-foreground/60" />
                <span>{row.common}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-3 text-center text-xs font-semibold text-foreground sm:p-4 sm:text-sm">
                <Check className="size-3.5 shrink-0 text-accent" />
                <span>{row.tangle}</span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
