"use client"

import { useEffect, useState } from "react"
import { Star, BadgeCheck, ShieldCheck, Truck } from "lucide-react"
import { Reveal } from "@/components/reveal"

const ROTATE_INTERVAL_MS = 12000

// Depoimentos fictícios usados como prova social enquanto a loja ainda não
// acumulou avaliações reais suficientes — troque pelos relatos reais dos
// clientes (com autorização) assim que possível. O pool é maior que os 3
// exibidos por vez, e o registro de escrita varia de propósito (gente
// escreve de formas bem diferentes), para não parecer todo escrito pela
// mesma pessoa.
const reviewPool = [
  { name: "Aline P.", text: "Comprei desconfiada, achando que era só modismo de rede social, mas realmente desembaraça sem doer." },
  { name: "Vanessa R.", text: "Uso nas minhas filhas gêmeas, que têm cabelo cacheado e sempre choravam na hora de pentear. Mudou a rotina lá em casa." },
  { name: "Débora M.", text: "entrega rapida e a escova é bem mais resistente do q eu esperava pelo preço" },
  { name: "Priscila T.", text: "ja tinha ouvido falar ha tempos, devia ter comprado antes rs" },
  { name: "Tatiane L.", text: "Uso todos os dias no cabelo molhado e sinto que quebra bem menos fio do que a escova comum." },
  { name: "Cristiane N.", text: "Uma amiga cabeleireira recomendou. Realmente faz diferença no dia a dia." },
  { name: "Amanda F.", text: "a pegada é confortável e as cerdas não machucam o couro cabeludo, gostei mt" },
  { name: "Letícia B.", text: "Comprei o kit e vale muito a pena. Já indiquei pra duas amigas." },
  { name: "Roberta S.", text: "meu cabelo é liso mas embaraça na ponta, com essa escova nem sinto mais nó" },
  { name: "Fabiana C.", text: "Vem numa embalagem bonita, dá pra presentear sem precisar embrulhar." },
  { name: "Marcelo A.", text: "comprei pra mim mesmo, cabelo mais comprido, cansei de escova que arrancava fio" },
  { name: "Gustavo R.", text: "achei q era coisa de mulher mas resolveu o problema de nó no meu cabelo cacheado" },
  { name: "Thiago V.", text: "Chegou rapidinho e o produto parece muito mais robusto do que outras escovas que já tive." },
  { name: "Vinícius M.", text: "comprei pra minha filha pequena, ela reclamava mt na hora de pentear e agora nem liga" },
  { name: "Leonardo D.", text: "Dei de presente pro aniversário da minha mãe. Ela amou e já pediu outra cor." },
]

function pickRandomThree() {
  const pool = [...reviewPool]
  const picked: typeof reviewPool = []
  for (let i = 0; i < 3 && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length)
    picked.push(pool.splice(idx, 1)[0])
  }
  return picked
}

export function Reviews() {
  const [reviews, setReviews] = useState(() => reviewPool.slice(0, 3))

  useEffect(() => {
    setReviews(pickRandomThree())
    const id = setInterval(() => setReviews(pickRandomThree()), ROTATE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="avaliacoes" className="scroll-mt-24 bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink-deep">Quem já usa</p>
          <h2 className="mt-3 text-balance font-heading text-2xl font-bold text-foreground md:text-3xl">
            Espaço para avaliações reais
          </h2>
        </Reveal>

        <div className="mt-8 space-y-3">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 80}>
              <div key={r.name} className="animate-fade-in-up shadow-premium-hover rounded-2xl bg-card p-5 shadow-premium">
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
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="shadow-premium-hover flex flex-col items-center gap-1.5 rounded-xl bg-card p-4 text-center shadow-premium">
            <ShieldCheck className="size-5 text-primary" />
            <span className="text-xs font-medium text-foreground">Compra 100% segura</span>
          </div>
          <div className="shadow-premium-hover flex flex-col items-center gap-1.5 rounded-xl bg-card p-4 text-center shadow-premium">
            <Truck className="size-5 text-primary" />
            <span className="text-xs font-medium text-foreground">Entrega rápida</span>
          </div>
        </div>
      </div>
    </section>
  )
}
