"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "Qual o prazo de entrega dos produtos?",
    a: "Trabalhamos com envio imediato. Após a confirmação do pagamento, seu pedido é postado em até 24 horas úteis. O prazo de entrega varia de 3 a 10 dias úteis, dependendo da sua região.",
  },
  {
    q: "As garrafas mantêm a temperatura por quanto tempo?",
    a: "Nossas garrafas térmicas de parede dupla a vácuo mantêm bebidas geladas por até 24 horas e quentes por até 12 horas, garantindo a temperatura ideal o dia todo.",
  },
  {
    q: "Os produtos são livres de BPA?",
    a: "Sim. Todos os nossos produtos são fabricados com materiais 100% livres de BPA, atóxicos e seguros para o contato com alimentos e bebidas.",
  },
  {
    q: "Como funciona a troca ou devolução?",
    a: "Você tem até 7 dias após o recebimento para solicitar troca ou devolução, conforme o Código de Defesa do Consumidor. É simples: entre em contato com nosso suporte e cuidamos de todo o processo.",
  },
  {
    q: "O pagamento é seguro?",
    a: "Totalmente. Utilizamos criptografia de ponta e gateways de pagamento certificados. Aceitamos cartão de crédito, Pix e boleto com total segurança.",
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-secondary/40 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Suporte</span>
          <h2 className="mt-2 text-balance text-3xl font-bold text-foreground md:text-4xl">Dúvidas Frequentes</h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Reunimos as perguntas mais comuns para você comprar com total tranquilidade.
          </p>
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
