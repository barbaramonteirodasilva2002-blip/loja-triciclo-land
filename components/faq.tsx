"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Reveal } from "@/components/reveal"

const faqs = [
  {
    q: "Funciona em cabelo cacheado ou crespo?",
    a: "Sim. A linha Desembaraçar tem versões específicas para cachos e fios crespos, com cerdas espaçadas que respeitam o formato natural do cacho sem abrir o fio.",
  },
  {
    q: "Uso no cabelo molhado ou seco?",
    a: "As escovas de desembaraço podem ser usadas nos dois casos, inclusive no banho, ajudando a espalhar condicionador e máscara pelos fios sem o puxão da escovação comum.",
  },
  {
    q: "Preciso usar creme ou óleo antes de escovar?",
    a: "Não é obrigatório, mas usar um leave-in ou óleo em fios muito secos facilita ainda mais o deslizar das cerdas.",
  },
  {
    q: "Como sei que é um produto original?",
    a: "Somos ponto de venda autorizado da marca. Todos os produtos vêm com selo de autenticidade e nota fiscal, sem risco de falsificação.",
  },
  {
    q: "Qual escova escolher para o meu tipo de fio?",
    a: "A linha Desembaraçar é segmentada por tipo de cabelo: finos e frágeis, médios, grossos e volumosos, e cacheados e crespos. Veja as coleções para encontrar a ideal.",
  },
  {
    q: "Em quanto tempo recebo?",
    a: "Enviamos em até 24h úteis após a confirmação do pagamento. O prazo de entrega é de 3 a 10 dias úteis, dependendo da sua região, com frete grátis para todo o Brasil.",
  },
  {
    q: "E se eu não gostar do produto?",
    a: "Você conta com garantia de 30 dias. Se não ficar satisfeito, entre em contato com nosso suporte que resolvemos a troca ou devolução de forma simples.",
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-24 bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Antes de comprar</p>
          <h2 className="mt-3 text-balance font-heading text-2xl font-normal text-foreground md:text-3xl">
            Perguntas frequentes
          </h2>
        </Reveal>

        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={Math.min(i, 5) * 40}>
                <div className="overflow-hidden rounded-xl border border-border bg-card transition-shadow duration-300 hover:shadow-premium">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-foreground">{item.q}</span>
                    <ChevronDown
                      className={`size-5 shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 leading-relaxed text-muted-foreground">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
