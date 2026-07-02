import { Check, X } from "lucide-react"

const rows = [
  "Água quente instantânea em 3 segundos",
  "Display digital com temperatura em tempo real",
  "Barra LED RGB indicadora",
  "Instalação sem ferramentas e sem obras",
  "Compatível com a maioria das torneiras",
  "Temperatura constante enquanto o fluxo ativo",
  "Proteção contra superaquecimento",
]

export function Comparison() {
  return (
    <section className="bg-background py-10">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <h2 className="text-balance font-heading text-2xl font-bold text-foreground">
            Por que escolher o AquaLux Digital?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-pretty text-sm text-muted-foreground">
            Mais tecnologia, mais economia e instalação mais simples do que aquecedores comuns.
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
                <span className="flex size-6 items-center justify-center rounded-full bg-[#e11d2a]/10 text-[#e11d2a]">
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
