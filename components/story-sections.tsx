import { Check, X } from "lucide-react"
import { Reveal } from "@/components/reveal"

export function ProblemSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <Reveal className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Você conhece essa cena</p>
        <h2 className="mt-3 text-balance font-heading text-2xl font-normal text-foreground md:text-3xl">
          7h da manhã. Escova comum na mão, nó atrás do nó.
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          E aquele puxão que arranca fio de cabelo — e a paciência — junto. No fim, cabelo quebrado, couro cabeludo
          dolorido e mais um dia começando estressado.
        </p>
        <p className="mt-4 font-heading text-lg font-normal italic text-foreground">
          O problema nunca foi o seu cabelo. Foi a escova.
        </p>
      </Reveal>
    </section>
  )
}

export function MechanismSection() {
  return (
    <section className="relative overflow-hidden bg-secondary/50 py-16 md:py-24">
      <div aria-hidden="true" className="bristle-lines pointer-events-none absolute inset-0 opacity-[0.04]" />
      <Reveal className="relative mx-auto max-w-3xl px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">O mecanismo</p>
        <h2 className="mt-3 text-balance font-heading text-2xl font-normal text-foreground md:text-3xl">
          Duas camadas de cabelo. Uma escovada.
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="shadow-premium-hover rounded-2xl border border-border bg-card p-6 text-left shadow-premium">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">Cerdas longas</p>
            <p className="mt-2 text-sm text-muted-foreground">Trabalham a camada externa do cabelo.</p>
          </div>
          <div className="shadow-premium-hover rounded-2xl border border-border bg-card p-6 text-left shadow-premium">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">Cerdas curtas</p>
            <p className="mt-2 text-sm text-muted-foreground">Alcançam a camada mais próxima do couro cabeludo.</p>
          </div>
        </div>

        <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
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
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">A diferença</p>
          <h2 className="mt-3 text-balance font-heading text-2xl font-normal text-foreground md:text-3xl">
            Escova comum vs. Tangle Teezer
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-10 overflow-hidden rounded-2xl border border-border shadow-premium">
          <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-secondary text-center text-xs font-bold uppercase tracking-wide text-foreground">
            <div className="p-4 text-left" />
            <div className="p-4 text-muted-foreground">Escova comum</div>
            <div className="p-4 text-primary">Tangle Teezer</div>
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
