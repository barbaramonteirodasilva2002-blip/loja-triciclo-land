"use client"

import { useState } from "react"
import {
  Droplet,
  Gauge,
  Wrench,
  ShieldCheck,
  Zap,
  Plug,
  Thermometer,
  Flame,
  Ruler,
  Package,
  ChevronDown,
  FileText,
  Tag,
  Box,
  Truck,
  Info,
} from "lucide-react"

const chips = [
  { icon: Droplet, title: "Água quente em 3 segundos" },
  { icon: Gauge, title: "Display digital de temperatura" },
  { icon: Wrench, title: "Instalação sem ferramentas" },
  { icon: ShieldCheck, title: "Proteção contra superaquecimento" },
]

const specs = [
  { icon: Wrench, label: "Modelo", value: "AquaLux Digital Premium" },
  { icon: Zap, label: "Potência", value: "3500W" },
  { icon: Plug, label: "Voltagem", value: "110V/127V/220V (Bivolt)" },
  { icon: Thermometer, label: "Temperatura", value: "Até 60°C ajustável" },
  { icon: Flame, label: "Aquecimento", value: "Instantâneo em 3 segundos" },
  { icon: Ruler, label: "Dimensões", value: "15 × 13 cm" },
  { icon: Package, label: "Peso", value: "Aprox. 0,5 KG" },
]

const details = [
  {
    icon: FileText,
    title: "Descrição",
    body: "O AquaLux Digital é um aquecedor de água instantâneo que se encaixa diretamente na sua torneira, entregando água quente em apenas 3 segundos sem a necessidade de boiler ou obras. Ideal para cozinhas e banheiros que não possuem água quente.",
  },
  {
    icon: Tag,
    title: "Especificações Técnicas",
    body: "Potência de 3500W, voltagem bivolt automática (110V/127V/220V), temperatura ajustável até 60°C, display digital com barra LED RGB indicadora e proteção inteligente contra superaquecimento.",
  },
  {
    icon: Box,
    title: "O Que Vem na Caixa",
    body: "1x Aquecedor AquaLux Digital, 1x Kit de adaptadores universais, 1x Bico aerador, 1x Manual de instalação em português.",
  },
  {
    icon: Truck,
    title: "Envio e Entrega",
    body: "Envio imediato em até 24h úteis após a confirmação do pagamento. Prazo de entrega de 3 a 10 dias úteis conforme a região. Frete grátis para todo o Brasil.",
  },
  {
    icon: ShieldCheck,
    title: "Garantia e Segurança",
    body: "Garantia de 30 dias. Produto com proteção contra superaquecimento e vedação eficiente. Compra 100% segura com pagamento criptografado.",
  },
  {
    icon: Info,
    title: "Importante",
    body: "Compatível apenas com torneiras que possuem bico externo. Verifique o formato da sua torneira antes da compra. Não serve em torneiras com chuveirinho retrátil ou bica embutida.",
  },
]

export function ProductInfo() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-background py-8">
      <div className="mx-auto max-w-3xl px-4">
        {/* Chips de benefícios */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {chips.map((c) => (
            <div key={c.title} className="flex items-center gap-3 rounded-xl bg-secondary/60 p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background text-brand-navy">
                <c.icon className="size-5" />
              </span>
              <p className="text-sm font-medium text-foreground">{c.title}</p>
            </div>
          ))}
        </div>

        {/* Tecnologia premium */}
        <div className="mt-4 rounded-2xl bg-card p-6 shadow-sm">
          <h2 className="text-balance font-heading text-xl font-bold text-foreground">
            Tecnologia premium para água quente instantânea na sua torneira
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            O AquaLux Digital aquece a água em apenas 3 segundos com resistência de alta eficiência e mantém a temperatura
            constante enquanto o fluxo estiver ativo. Display digital com leitura em tempo real, barra LED RGB que indica a
            temperatura e proteção inteligente contra superaquecimento. Encaixe direto na bica da torneira — sem obras, sem
            encanador.
          </p>
        </div>

        {/* CTA */}
        <a
          href="#comprar"
          className="mt-6 flex items-center justify-center rounded-xl bg-brand-navy py-4 font-heading text-lg font-bold text-white shadow-lg shadow-brand-navy/20 transition hover:brightness-110"
        >
          COMPRAR AGORA
        </a>

        {/* Especificações */}
        <div className="mt-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground">Especificações</h2>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
          {specs.map((s, i) => (
            <div
              key={s.label}
              className={`flex items-center justify-between gap-4 px-5 py-4 ${i !== specs.length - 1 ? "border-b border-border" : ""}`}
            >
              <span className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <s.icon className="size-4 text-brand-navy" />
                {s.label}
              </span>
              <span className="text-right text-sm font-bold text-foreground">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Detalhes do produto (acordeão) */}
        <div className="mt-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground">Detalhes do Produto</h2>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {details.map((d, i) => {
            const isOpen = open === i
            return (
              <div key={d.title} className="overflow-hidden rounded-xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="flex items-center gap-2.5 font-medium text-foreground">
                    <d.icon className="size-4 text-brand-navy" />
                    {d.title}
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
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
