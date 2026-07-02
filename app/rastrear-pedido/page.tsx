"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Truck,
  Search,
  ShieldCheck,
  Clock,
  MapPin,
  Warehouse,
  Map,
  AlertTriangle,
  Package,
  CheckCircle2,
} from "lucide-react"
import { LogBrasilLogo } from "@/components/logbrasil-logo"

const trustItems = [
  { icon: ShieldCheck, label: "Seguro" },
  { icon: Clock, label: "Tempo real" },
  { icon: MapPin, label: "Em todo Brasil" },
]

const features = [
  { icon: Truck, label: "Transporte\nRodoviário" },
  { icon: Warehouse, label: "Armazenagem\ne Distribuição" },
  { icon: ShieldCheck, label: "Segurança\ne Confiança" },
  { icon: Map, label: "Cobertura\nNacional" },
]

const steps = [
  { icon: CheckCircle2, label: "Pedido confirmado", desc: "Pagamento aprovado com sucesso." },
  { icon: Package, label: "Em separação", desc: "Seu pedido está sendo preparado no centro de distribuição." },
  { icon: Truck, label: "Em trânsito", desc: "Objeto postado e a caminho da sua cidade." },
  { icon: MapPin, label: "Saiu para entrega", desc: "O produto chegará em breve ao seu endereço." },
]

export default function Page() {
  const [tab, setTab] = useState<"codigo" | "email">("codigo")
  const [value, setValue] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim().length === 0) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#eef1f5]">
      {/* Header */}
      <header className="border-b-2 border-[#f2b63d] bg-white">
        <div className="relative mx-auto flex max-w-5xl items-center justify-center px-4 py-4">
          <Link
            href="/"
            aria-label="Voltar à loja"
            className="absolute left-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#13234d]/70 transition-colors hover:text-[#13234d]"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Voltar</span>
          </Link>
          <LogBrasilLogo />
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0e1a38]">
        <Image
          src="/images/logbrasil-truck-hero.png"
          alt="Caminhão da LogBrasil Logística em rodovia ao pôr do sol"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a38] via-[#0e1a38]/85 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[#f2b63d] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#13234d]">
            <Truck className="size-3.5" />
            Rastreamento Oficial
          </span>
          <h1 className="mt-5 max-w-md text-balance font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Acompanhe sua <span className="text-[#f2b63d]">entrega</span> em tempo real
          </h1>
          <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-white/75">
            Digite seu código de rastreio ou e-mail do pedido para visualizar o status atual da sua encomenda.
          </p>
        </div>
      </section>

      {/* Card de rastreio */}
      <div className="relative z-10 mx-auto -mt-8 max-w-2xl px-4 pb-4">
        <div className="rounded-2xl bg-white p-5 shadow-xl sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#13234d]">
              <Search className="size-5 text-white" />
            </div>
            <div>
              <p className="font-heading text-lg font-bold text-[#13234d]">Rastrear encomenda</p>
              <p className="text-sm text-[#13234d]/55">Resultado instantâneo</p>
            </div>
          </div>

          {/* Abas */}
          <div className="mt-5 grid grid-cols-2 gap-1 rounded-xl bg-[#eef1f5] p-1">
            <button
              type="button"
              onClick={() => setTab("codigo")}
              className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                tab === "codigo" ? "bg-[#13234d] text-white shadow-sm" : "text-[#13234d]/60"
              }`}
            >
              Código de rastreio
            </button>
            <button
              type="button"
              onClick={() => setTab("email")}
              className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                tab === "email" ? "bg-[#13234d] text-white shadow-sm" : "text-[#13234d]/60"
              }`}
            >
              E-mail
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5">
            <label htmlFor="track" className="text-xs font-bold uppercase tracking-wide text-[#13234d]/70">
              {tab === "codigo" ? "Código de rastreio" : "E-mail do pedido"}
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#d9dee6] bg-white px-3.5 focus-within:border-[#13234d]">
              <Search className="size-5 shrink-0 text-[#13234d]/40" />
              <input
                id="track"
                type={tab === "email" ? "email" : "text"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={tab === "codigo" ? "AP123456789BR" : "seuemail@exemplo.com"}
                className="w-full bg-transparent py-3.5 text-sm text-[#13234d] outline-none placeholder:text-[#13234d]/35"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-[#f2b63d] py-4 font-heading text-sm font-bold text-[#13234d] transition hover:brightness-105"
            >
              Rastrear agora
            </button>
          </form>

          {/* Aviso */}
          <div className="mt-5 flex gap-2.5 rounded-xl border border-[#f2b63d]/40 bg-[#fdf6e6] p-4">
            <AlertTriangle className="size-5 shrink-0 text-[#d9a02b]" />
            <p className="text-xs leading-relaxed text-[#7a611f]">
              <span className="font-bold">Atenção:</span> Alguns pedidos podem sofrer atrasos na entrega devido a
              manifestações, bloqueios temporários em rodovias ou outras intercorrências logísticas que estão ocorrendo
              em determinadas regiões do Brasil. As transportadoras seguem operando normalmente, porém os prazos podem
              ser impactados em alguns estados. Agradecemos pela compreensão.
            </p>
          </div>

          {/* Resultado */}
          {submitted && (
            <div className="mt-5 rounded-xl border border-[#e3e7ee] bg-[#f7f9fc] p-5">
              <p className="text-sm text-[#13234d]/60">
                Acompanhamento de <span className="font-semibold text-[#13234d]">{value}</span>
              </p>
              <ol className="mt-5 space-y-5">
                {steps.map((s, i) => {
                  const active = i <= 2
                  return (
                    <li key={s.label} className="flex gap-3.5">
                      <div
                        className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                          active ? "bg-[#13234d] text-white" : "bg-[#e3e7ee] text-[#13234d]/40"
                        }`}
                      >
                        <s.icon className="size-4" />
                      </div>
                      <div className="pt-0.5">
                        <p className={`text-sm font-semibold ${active ? "text-[#13234d]" : "text-[#13234d]/45"}`}>
                          {s.label}
                        </p>
                        <p className="text-xs text-[#13234d]/55">{s.desc}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          )}

          {/* Selos */}
          <div className="mt-6 flex items-center justify-around border-t border-[#e3e7ee] pt-5">
            {trustItems.map((t) => (
              <div key={t.label} className="flex flex-col items-center gap-1.5">
                <t.icon className="size-5 text-[#13234d]" />
                <span className="text-xs font-medium text-[#13234d]/70">{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-[#13234d]/45">
          O código foi enviado para seu e-mail após a confirmação do pedido
        </p>
      </div>

      {/* Banner institucional */}
      <section className="relative mt-8 overflow-hidden bg-[#0e1a38]">
        <Image
          src="/images/logbrasil-truck-banner.png"
          alt="Caminhão LogBrasil em rodovia"
          fill
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a38] via-[#0e1a38]/80 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-12">
          <LogBrasilLogo light className="scale-125 origin-left" />
          <p className="mt-6 font-heading text-xl font-extrabold leading-tight text-white sm:text-2xl">
            CONECTAMOS O BRASIL.
            <br />
            MOVEMOS <span className="text-[#f2b63d]">O SEU NEGÓCIO.</span>
          </p>
        </div>

        {/* Barra de recursos */}
        <div className="relative border-t border-white/10 bg-[#0a142e]">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-6 sm:grid-cols-4">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-2.5">
                <f.icon className="size-6 shrink-0 text-[#f2b63d]" />
                <span className="whitespace-pre-line text-[11px] font-semibold uppercase leading-tight tracking-wide text-white/85">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row">
          <LogBrasilLogo />
          <p className="text-center text-xs text-[#13234d]/50">
            © {new Date().getFullYear()} LogBrasil Logística · Sistema de rastreio protegido
          </p>
        </div>
      </footer>
    </div>
  )
}
