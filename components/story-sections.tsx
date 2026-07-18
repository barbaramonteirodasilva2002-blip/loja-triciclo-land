export function ProblemSection() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Você conhece essa cena</p>
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
      </div>
    </section>
  )
}

export function MechanismSection() {
  return (
    <section className="bg-secondary/50 py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">O mecanismo</p>
        <h2 className="mt-3 text-balance font-heading text-2xl font-normal text-foreground md:text-3xl">
          Duas camadas de cabelo. Uma escovada.
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 text-left shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">Cerdas longas</p>
            <p className="mt-2 text-sm text-muted-foreground">Trabalham a camada externa do cabelo.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 text-left shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">Cerdas curtas</p>
            <p className="mt-2 text-sm text-muted-foreground">Alcançam a camada mais próxima do couro cabeludo.</p>
          </div>
        </div>

        <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
          As duas fileiras se movem juntas, na mesma escovada, desembaraçando por dentro e por fora ao mesmo tempo,
          sem prender e sem puxar.
        </p>
      </div>
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
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">A diferença</p>
          <h2 className="mt-3 text-balance font-heading text-2xl font-normal text-foreground md:text-3xl">
            Escova comum vs. Tangle Teezer
          </h2>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border">
          <div className="grid grid-cols-3 bg-secondary text-center text-xs font-bold uppercase tracking-wide text-foreground">
            <div className="p-3" />
            <div className="p-3">Escova comum</div>
            <div className="p-3 text-primary">Tangle Teezer</div>
          </div>
          {comparisonRows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 text-center text-sm ${i % 2 ? "bg-card" : "bg-background"}`}
            >
              <div className="border-r border-border p-3 text-left font-medium text-foreground">{row.label}</div>
              <div className="border-r border-border p-3 text-muted-foreground">{row.common}</div>
              <div className="p-3 font-semibold text-foreground">{row.tangle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
