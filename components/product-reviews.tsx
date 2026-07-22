"use client"

import { useEffect, useState } from "react"
import { Star, BadgeCheck } from "lucide-react"
import type { CollectionSlug } from "@/lib/products"

const ROTATE_INTERVAL_MS = 4000
const PAIRS_COUNT = 5

// Nomes fictícios usados como prova social enquanto o produto ainda não tem
// avaliações reais — troque pelos relatos reais dos clientes assim que
// possível. Cada produto mostra 5 duplas (10 comentários), uma dupla por
// vez: um comentário genérico (varia por coleção, já que desembaraçador,
// styler, exfoliante etc. têm usos bem diferentes) + um específico (cita a
// cor do produto quando ela existe, senão cita o nome do produto).
//
// Os comentários mais "de efeito" ficam concentrados na coleção
// Desembaraçar, que é a linha principal/mais vendida da loja.
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

const GENERIC_TEXTS_BY_COLLECTION: Record<CollectionSlug, string[]> = {
  desembaracar: [
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
  ],
  modelar: [
    "sequei o cabelo bem mais rápido com essa escova, o frizz reduziu bastante",
    "Dá um volume na raiz que eu nunca conseguia com escova comum.",
    "uso toda vez que vou sair, deixa o cabelo com aspecto de salão",
    "Cabo emborrachado ajuda muito, não escorrega da mão nem molhada.",
    "achei cara no começo mas o resultado no secador compensa",
  ],
  finalizar: [
    "Dá um brilho incrível no final da escovação, uso todo dia antes de sair.",
    "uso a técnica de backcombing com esse pente e da um volume ótimo na raiz",
    "As cerdas alinham bem os fios, parece até escova de salão.",
    "pente com dentes largos, define bem o cacho sem puxar nada",
    "Virou o último passo da minha rotina, não saio de casa sem passar.",
  ],
  "bem-estar": [
    "Uso antes do shampoo, sinto o couro cabeludo bem mais limpo depois.",
    "ajuda a tirar aquela oleosidade do dia a dia, uso umas 2x por semana",
    "Dá uma sensação de alívio gostosa, parece massagem de salão.",
    "Minha queda de cabelo diminuiu depois que passei a usar toda semana.",
    "achei que era só modismo mas realmente estimula a circulação, sinto diferença",
  ],
  "pet-teezer": [
    "Meu cachorro nem percebe que tá sendo escovado, ele é bem elétrico.",
    "reduziu muito a queda de pelo pela casa, uso 2x por semana nele",
    "Minha gata odeia escova, mas com essa ela fica quietinha.",
    "a pelagem dele ficou bem mais macia depois que comecei a usar",
    "achei q ia machucar o bichinho mas é bem suave, ele ate gosta",
  ],
  "kits-e-promocoes": [
    "Comprei o kit pra presentear e saiu bem mais em conta que comprar separado.",
    "veio tudo bem embalado, dava pra presentear direto sem embrulhar",
    "Cada escova do kit serve pra uma coisa, uso todas durante a semana.",
    "aproveitei a promoção e levei pra mim e pra minha irmã",
    "Vale muito mais a pena que comprar avulso, economizei bastante.",
  ],
}

const NAME_TEMPLATES: Array<(productName: string) => string> = [
  (p) => `Comprei a ${p} depois de ver todo mundo comentando, e realmente vale a fama.`,
  (p) => `Já tinha outras escovas da marca, mas a ${p} ficou minha favorita de longe.`,
  (p) => `Escolhi a ${p} sem pensar duas vezes e não podia ter escolhido melhor.`,
  (p) => `Pesquisei bastante antes de decidir, e a ${p} foi a que mais me chamou atenção. Não me arrependo.`,
  (p) => `Tava em dúvida entre uns modelos, mas a ${p} me conquistou de cara.`,
]

const COLOR_TEMPLATES: Array<(color: string) => string> = [
  (c) => `Estava muito louca pela cor ${c}, e não me decepcionei nadinha.`,
  (c) => `A cor ${c} é ainda mais linda pessoalmente do que nas fotos do site.`,
  (c) => `Escolhi só pela cor ${c} mesmo, e acabei amando o produto também.`,
  (c) => `Fiquei de olho esperando a cor ${c} voltar ao estoque, valeu a espera.`,
  (c) => `Bati o olho na cor ${c} e nem pensei duas vezes antes de comprar.`,
]

type ReviewCard = { name: string; text: string }
type ReviewPair = [ReviewCard, ReviewCard]

function pickDistinct<T>(pool: T[], count: number): T[] {
  const copy = [...pool]
  const picked: T[] = []
  for (let i = 0; i < count && copy.length > 0; i++) {
    const idx = Math.floor(Math.random() * copy.length)
    picked.push(copy.splice(idx, 1)[0])
  }
  return picked
}

function buildPairs(productName: string, color: string | undefined, collection: CollectionSlug): ReviewPair[] {
  const genericPool = GENERIC_TEXTS_BY_COLLECTION[collection]
  const names = pickDistinct(NAMES, PAIRS_COUNT * 2)
  const generics = pickDistinct(genericPool, Math.min(PAIRS_COUNT, genericPool.length))
  const specificTexts = color
    ? pickDistinct(COLOR_TEMPLATES, PAIRS_COUNT).map((tpl) => tpl(color))
    : pickDistinct(NAME_TEMPLATES, PAIRS_COUNT).map((tpl) => tpl(productName))

  return Array.from({ length: PAIRS_COUNT }, (_, i) => [
    { name: names[i * 2], text: generics[i % generics.length] },
    { name: names[i * 2 + 1], text: specificTexts[i] },
  ])
}

function initialPairs(productName: string, color: string | undefined, collection: CollectionSlug): ReviewPair[] {
  const genericPool = GENERIC_TEXTS_BY_COLLECTION[collection]
  const specificTexts = color
    ? COLOR_TEMPLATES.slice(0, PAIRS_COUNT).map((tpl) => tpl(color))
    : NAME_TEMPLATES.slice(0, PAIRS_COUNT).map((tpl) => tpl(productName))

  return Array.from({ length: PAIRS_COUNT }, (_, i) => [
    { name: NAMES[i * 2], text: genericPool[i % genericPool.length] },
    { name: NAMES[i * 2 + 1], text: specificTexts[i] },
  ])
}

export function ProductReviews({
  productName,
  color,
  collection,
}: {
  productName: string
  color?: string
  collection: CollectionSlug
}) {
  const [pairs, setPairs] = useState<ReviewPair[]>(() => initialPairs(productName, color, collection))
  const [active, setActive] = useState(0)

  useEffect(() => {
    setPairs(buildPairs(productName, color, collection))
    setActive(0)
    const id = setInterval(() => setActive((i) => (i + 1) % PAIRS_COUNT), ROTATE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [productName, color, collection])

  const currentPair = pairs[active] ?? pairs[0]

  return (
    <div className="mt-5 space-y-3 border-t border-border pt-5">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-pink-deep">Quem já comprou</p>
      <div key={active} className="animate-fade-in-up space-y-3">
        {currentPair.map((r, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
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
    </div>
  )
}
