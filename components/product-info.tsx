"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Bluetooth,
  Gauge,
  Rocket,
  ShieldCheck,
  Zap,
  BatteryCharging,
  Ruler,
  Weight,
  Cake,
  ChevronDown,
  FileText,
  Tag,
  Box,
  Truck,
  Info,
} from "lucide-react"

const chips = [
  { icon: Zap, title: "Motor 300W de alta potência" },
  { icon: Gauge, title: "3 velocidades ajustáveis" },
  { icon: Bluetooth, title: "Caixa de som Bluetooth + MP3" },
  { icon: ShieldCheck, title: "Estrutura reforçada e segura" },
]

const specs = [
  { icon: Rocket, label: "Modelo", value: "Triciclo Elétrico Drift 300W" },
  { icon: Zap, label: "Potência", value: "300W no eixo dianteiro" },
  { icon: Gauge, label: "Velocidades", value: "3 níveis ajustáveis" },
  { icon: BatteryCharging, label: "Bateria", value: "Recarregável, com carregador incluso" },
  { icon: Bluetooth, label: "Conectividade", value: "Bluetooth com entrada MP3" },
  { icon: Ruler, label: "Dimensões", value: "94 × 44 × 57 cm (banco a 35cm do chão)" },
  { icon: Weight, label: "Peso suportado", value: "Até 100kg" },
  { icon: Cake, label: "Idade recomendada", value: "3 a 8 anos" },
]

const details = [
  {
    icon: FileText,
    title: "Descrição",
    body: "O Triciclo Infantil Elétrico Drift traz motor de 300W no eixo dianteiro, 3 velocidades ajustáveis, banco giratório tipo kart e rodas de drift que deslizam com segurança. Vem com caixa de som Bluetooth e entrada MP3, bandeirinha decorativa e ajuste de eixo entre o banco e o guidão para acompanhar o crescimento da criança.",
  },
  {
    icon: Tag,
    title: "Especificações Técnicas",
    body: "Motor elétrico de 300W, 3 velocidades ajustáveis, bateria recarregável com carregador incluso, visor de bateria no guidão, caixa de som Bluetooth com entrada MP3 e rodas traseiras de drift.",
  },
  {
    icon: Box,
    title: "O Que Vem na Caixa",
    body: "1x Triciclo Elétrico Drift, 1x Carregador de bateria, 1x Bandeirinha decorativa, 1x Manual de instruções em português.",
  },
  {
    icon: Truck,
    title: "Envio e Entrega",
    body: "Envio imediato em até 24h úteis após a confirmação do pagamento. Prazo de entrega de 3 a 10 dias úteis conforme a região. Frete grátis para todo o Brasil.",
  },
  {
    icon: ShieldCheck,
    title: "Garantia e Segurança",
    body: "Garantia de 30 dias. As 3 velocidades ajustáveis permitem começar devagar e evoluir com segurança conforme a criança ganha confiança. Compra 100% segura com pagamento criptografado.",
  },
  {
    icon: Info,
    title: "Importante",
    body: "Uso recomendado sob supervisão de um adulto, em superfícies planas e pavimentadas. Indicado para crianças de 3 a 8 anos com até 100kg. O uso de capacete e proteções é recomendado.",
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
            Potência, som e diversão em um só triciclo
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            O motor de 300W no eixo dianteiro entrega 3 velocidades ajustáveis, do ritmo mais tranquilo ao modo drift
            completo. O banco giratório tipo kart e as rodas traseiras deslizantes permitem manobras e derrapagens com
            segurança, enquanto a caixa de som Bluetooth com entrada MP3 deixa a brincadeira ainda mais animada. O visor
            de bateria fica no guidão, junto dos comandos, e a bandeirinha decorativa vem inclusa.
          </p>
        </div>

        {/* Dimensões */}
        <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm">
          <Image
            src="/images/drift-produto-preto-dimensoes.webp"
            alt="Dimensões do Triciclo Elétrico Drift: 94cm de comprimento, 44cm de largura, 57cm de altura e banco a 35cm do chão"
            width={1000}
            height={1000}
            sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full"
          />
        </div>

        {/* CTA */}
        <a
          href="#escolha-kit"
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
