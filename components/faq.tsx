"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "Qual a autonomia da bateria e quanto tempo leva para carregar?",
    a: "A bateria recarregável acompanha um carregador próprio. Recomendamos carregar totalmente antes do primeiro uso para garantir a melhor autonomia nas pilotagens.",
  },
  {
    q: "Quantas velocidades tem e a partir de qual idade posso usar?",
    a: "São 3 velocidades ajustáveis, ideais para a criança evoluir aos poucos. Indicado para crianças de 3 a 8 anos, com até 100kg.",
  },
  {
    q: "O triciclo tem som Bluetooth? Como funciona?",
    a: "Sim! Ele conta com uma caixa de som Bluetooth com entrada MP3, para tocar as músicas favoritas da criançada direto do celular.",
  },
  {
    q: "Precisa montar quando chega?",
    a: "O triciclo vem praticamente pronto de fábrica. Basta encaixar o guidão e ajustar o eixo entre banco e guidão para o tamanho da criança.",
  },
  {
    q: "É seguro? Tem algum limite de peso?",
    a: "Sim. A estrutura é reforçada e conta com 3 velocidades ajustáveis para começar devagar. Suporta até 100kg e o uso deve ser sempre supervisionado por um adulto.",
  },
  {
    q: "A bandeirinha e o carregador já vêm inclusos?",
    a: "Sim! A bandeirinha decorativa e o carregador de bateria acompanham o produto sem custo adicional.",
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
