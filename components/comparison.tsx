import { Check, X } from "lucide-react"

const rows = [
  "Motor elétrico de 300W no eixo dianteiro",
  "3 velocidades ajustáveis",
  "Caixa de som Bluetooth com entrada MP3",
  "Banco giratório tipo kart para manobras de drift",
  "Ajuste de eixo entre banco e guidão",
  "Visor de bateria no guidão",
  "Bandeirinha decorativa inclusa",
]

export function Comparison() {
  return (
    <section className="bg-background py-10">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <h2 className="text-balance font-heading text-2xl font-bold text-foreground">
            Por que escolher o Triciclo Elétrico Drift?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-pretty text-sm text-muted-foreground">
            Mais potência, mais diversão e muito mais recursos do que os triciclos elétricos comuns.
          </p>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
          <div className="grid grid-cols-[1fr_auto_auto] items-center bg-secondary text-xs font-bold uppercase tracking-wide text-muted-foreground">
            <span className="px-4 py-3">Recurso</span>
            <span className="w-16 px-2 py-3 text-center text-brand-navy">Nosso</span>
            <span className="w-16 px-2 py-3 text-center">Outros</span>
          </div>
          {rows.map((r, i) => (
            <div
              key={r}
              className={`grid grid-cols-[1fr_auto_auto] items-center ${i % 2 === 0 ? "bg-background" : "bg-secondary/40"}`}
            >
              <span className="px-4 py-3 text-sm text-foreground">{r}</span>
              <span className="flex w-16 justify-center px-2 py-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check className="size-3.5" />
                </span>
              </span>
              <span className="flex w-16 justify-center px-2 py-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-[#d9534f]/10 text-[#d9534f]">
                  <X className="size-3.5" />
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
