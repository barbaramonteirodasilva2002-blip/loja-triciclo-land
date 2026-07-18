import { Star, BadgeCheck, ShieldCheck, Truck } from "lucide-react"

// Depoimentos: troque pelos relatos reais dos seus clientes (com autorização) antes
// de publicar. Não atribuímos avaliações a nomes específicos para evitar
// conteúdo que pareça um depoimento real fabricado.
const reviews = [
  {
    name: "Cliente verificado(a)",
    text: "Escova excelente, desembaraça sem puxar e sem doer. Uso todo dia depois do banho.",
  },
  {
    name: "Cliente verificado(a)",
    text: "Comprei pela autenticidade da revenda autorizada. Chegou rápido e original, com selo de autenticidade.",
  },
  {
    name: "Cliente verificado(a)",
    text: "Meu cabelo cacheado nunca desembaraçou tão fácil. Recomendo a versão Naturally Curly.",
  },
]

export function Reviews() {
  return (
    <section id="avaliacoes" className="scroll-mt-24 bg-background py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Quem já usa</p>
          <h2 className="mt-3 text-balance font-heading text-2xl font-normal text-foreground md:text-3xl">
            Espaço para avaliações reais
          </h2>
        </div>

        <div className="mt-6 space-y-3">
          {reviews.map((r, i) => (
            <div key={i} className="rounded-2xl bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-sm font-bold text-foreground">
                  {r.name}
                  <BadgeCheck className="size-3.5 text-primary" />
                </p>
                <div className="flex text-[#f5a623]">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="size-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{r.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center gap-1.5 rounded-xl bg-card p-4 text-center shadow-sm">
            <ShieldCheck className="size-5 text-primary" />
            <span className="text-xs font-medium text-foreground">Compra 100% segura</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 rounded-xl bg-card p-4 text-center shadow-sm">
            <Truck className="size-5 text-primary" />
            <span className="text-xs font-medium text-foreground">Entrega rápida</span>
          </div>
        </div>
      </div>
    </section>
  )
}
