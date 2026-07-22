"use client"

import { useEffect, useState } from "react"
import { Star, BadgeCheck } from "lucide-react"

const ROTATE_INTERVAL_MS = 4000
const PAIRS_COUNT = 5

// Nomes fictícios usados como prova social enquanto o produto ainda não tem
// avaliações reais — troque pelos relatos reais dos clientes assim que
// possível. Cada produto mostra 5 duplas (10 comentários), uma dupla por
// vez: um comentário genérico + um específico (cita a cor do produto
// quando ela existe, senão cita o nome do produto).
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

function buildPairs(productName: string, color: string | undefined): ReviewPair[] {
  const names = pickDistinct(NAMES, PAIRS_COUNT * 2)
  const generics = pickDistinct(GENERIC_TEXTS, PAIRS_COUNT)
  const specificTexts = color
    ? pickDistinct(COLOR_TEMPLATES, PAIRS_COUNT).map((tpl) => tpl(color))
    : pickDistinct(NAME_TEMPLATES, PAIRS_COUNT).map((tpl) => tpl(productName))

  return Array.from({ length: PAIRS_COUNT }, (_, i) => [
    { name: names[i * 2], text: generics[i] },
    { name: names[i * 2 + 1], text: specificTexts[i] },
  ])
}

function initialPairs(productName: string, color: string | undefined): ReviewPair[] {
  const specificTexts = color
    ? COLOR_TEMPLATES.slice(0, PAIRS_COUNT).map((tpl) => tpl(color))
    : NAME_TEMPLATES.slice(0, PAIRS_COUNT).map((tpl) => tpl(productName))

  return Array.from({ length: PAIRS_COUNT }, (_, i) => [
    { name: NAMES[i * 2], text: GENERIC_TEXTS[i] },
    { name: NAMES[i * 2 + 1], text: specificTexts[i] },
  ])
}

export function ProductReviews({ productName, color }: { productName: string; color?: string }) {
  const [pairs, setPairs] = useState<ReviewPair[]>(() => initialPairs(productName, color))
  const [active, setActive] = useState(0)

  useEffect(() => {
    setPairs(buildPairs(productName, color))
    setActive(0)
    const id = setInterval(() => setActive((i) => (i + 1) % PAIRS_COUNT), ROTATE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [productName, color])

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
