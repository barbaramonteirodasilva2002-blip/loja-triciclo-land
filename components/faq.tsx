"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "Qual é o comprimento do fio que vem junto?",
    a: "O AquaLux Digital acompanha um cabo de alimentação de aproximadamente 1 metro, ideal para alcançar tomadas próximas à pia sem necessidade de extensões.",
  },
  {
    q: "Funciona em qualquer torneira?",
    a: "Funciona na maioria das torneiras com bico externo. Acompanha um kit de adaptadores universais. Não é compatível com torneiras de chuveirinho retrátil ou bica embutida.",
  },
  {
    q: "Qual a voltagem? Funciona em 110V?",
    a: "Sim! O aparelho é bivolt automático e funciona em 110V, 127V e 220V, sem necessidade de chave seletora.",
  },
  {
    q: "Quanto tempo leva para esquentar?",
    a: "A água quente sai em apenas 3 segundos após abrir o fluxo, graças à resistência de alta eficiência e ao aquecimento instantâneo.",
  },
  {
    q: "Precisa de encanador para instalar?",
    a: "Não. A instalação é feita em poucos minutos, sem obras e sem ferramentas especiais. Basta desrosquear o bico aerador e encaixar o aquecedor.",
  },
  {
    q: "É seguro? Tem proteção?",
    a: "Sim. O AquaLux Digital possui proteção inteligente contra superaquecimento, vedação eficiente contra vazamentos e desligamento automático de segurança.",
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
    <section id="faq" className="scroll-mt-24 bg-background py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-balance font-heading text-2xl font-bold text-foreground md:text-3xl">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="overflow-hidden rounded-xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-foreground">{item.q}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
            )
          })}
        </div>
      </div>
    </section>
  )
}
