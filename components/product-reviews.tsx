"use client"

import { useEffect, useState } from "react"
import { Star, BadgeCheck } from "lucide-react"

// Nomes fictícios usados como prova social enquanto o produto ainda não tem
// avaliações reais — troque pelos relatos reais dos clientes assim que
// possível. Um comentário é genérico (reaproveitável em qualquer produto) e
// o outro cita o nome do produto exibido na página, pra parecer específico
// sem precisar escrever depoimentos únicos para as 43 variantes do catálogo.
const NAMES = [
  "Karina S.",
  "Bruna T.",
  "Douglas M.",
  "Sabrina R.",
  "Felipe N.",
  "Luana C.",
  "Adriana P.",
  "Rodrigo B.",
  "Nathalia V.",
  "Igor F.",
  "Vitor L.",
  "Carolina M.",
  "Eliane S.",
  "Wagner T.",
  "Michele D.",
]

const GENERIC_TEXTS = [
  "As cerdas realmente não puxam o cabelo, uso todo dia sem reclamar de dor.",
  "chegou rapido e bem embalado, recomendo demais",
  "Comprei pra minha esposa, ela disse que nunca teve uma escova tão boa.",
  "uso ate no cabelo seco, funciona bem nos dois jeitos",
  "Achei o preço justo pelo que entrega. Produto original, com nota fiscal.",
  "meu cabelo cacheado agradece, nunca mais tive nó daqueles difíceis de tirar",
  "Já é a terceira que compro pra dar de presente. Todo mundo ama.",
  "n entendia pq custava mais caro q escova normal, mas depois de usar entendi",
  "Uso desde que saí do salão até no dia a dia. Realmente ajuda a manter o cabelo saudável.",
  "achei q ia quebrar rapido mas ta durando bem, uso ha uns meses",
]

const SPECIFIC_TEMPLATES: Array<(productName: string) => string> = [
  (p) => `Comprei a ${p} depois de ver todo mundo comentando, e realmente vale a fama.`,
  (p) => `Já tinha outras escovas da marca, mas a ${p} ficou minha favorita de longe.`,
  (p) => `Escolhi a ${p} sem pensar duas vezes e não podia ter escolhido melhor.`,
  (p) => `Pesquisei bastante antes de decidir, e a ${p} foi a que mais me chamou atenção. Não me arrependo.`,
  (p) => `Tava em dúvida entre uns modelos, mas a ${p} me conquistou de cara.`,
]

function buildReviews(productName: string) {
  const nameIdx1 = Math.floor(Math.random() * NAMES.length)
  let nameIdx2 = Math.floor(Math.random() * NAMES.length)
  while (nameIdx2 === nameIdx1) nameIdx2 = Math.floor(Math.random() * NAMES.length)
  const text = GENERIC_TEXTS[Math.floor(Math.random() * GENERIC_TEXTS.length)]
  const specificText = SPECIFIC_TEMPLATES[Math.floor(Math.random() * SPECIFIC_TEMPLATES.length)](productName)
  return [
    { name: NAMES[nameIdx1], text },
    { name: NAMES[nameIdx2], text: specificText },
  ]
}

export function ProductReviews({ productName }: { productName: string }) {
  const [reviews, setReviews] = useState(() => [
    { name: NAMES[0], text: GENERIC_TEXTS[0] },
    { name: NAMES[1], text: SPECIFIC_TEMPLATES[0](productName) },
  ])

  useEffect(() => {
    setReviews(buildReviews(productName))
  }, [productName])

  return (
    <div className="mt-5 space-y-3 border-t border-border pt-5">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-pink-deep">Quem já comprou</p>
      {reviews.map((r, i) => (
        <div key={i} className="animate-fade-in-up rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-sm font-bold text-foreground">
              {r.name}
              <BadgeCheck className="size-3.5 text-brand-navy" />
            </p>
            <div className="flex text-[#f5a623]">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="size-3.5 fill-current" />
              ))}
            </div>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
        </div>
      ))}
    </div>
  )
}
