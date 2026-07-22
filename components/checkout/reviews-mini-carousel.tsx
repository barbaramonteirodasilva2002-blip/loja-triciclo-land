"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Star, BadgeCheck } from "lucide-react"

type Testimonial = {
  name: string
  photo?: string
  text: string
}

const AVATAR_COLORS = [
  "bg-brand-navy",
  "bg-accent",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-sky-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-teal-500",
]

const testimonials: Testimonial[] = [
  {
    name: "Fernanda C.",
    photo: "/images/reviews/fernanda.png",
    text: "Chegou certinho e original. Escova excelente, desembaraça sem puxar.",
  },
  {
    name: "Ricardo M.",
    photo: "/images/reviews/ricardo.png",
    text: "Comprei mais de uma vez, entrega rápida e produto sempre original. Recomendo.",
  },
  {
    name: "Marcos T.",
    photo: "/images/reviews/marcos.png",
    text: "Uso todo dia depois do banho e não quebra mais o cabelo como a escova antiga.",
  },
  {
    name: "Juliana S.",
    photo: "/images/reviews/juliana.png",
    text: "Meu cabelo é cacheado e sempre embaraçava muito. Com essa escova passo o pente sem dor nenhuma.",
  },
  {
    name: "André P.",
    photo: "/images/reviews/andre.png",
    text: "Presenteei minha esposa e ela amou. Vem numa caixinha bonita, dá pra embrulhar direto.",
  },
  {
    name: "Camila R.",
    text: "uso no cabelo molhado depois do banho e nao acredito como não puxa nem quebra o fio!!",
  },
  {
    name: "Beatriz L.",
    text: "Comprei o kit com o Scalp Exfoliator também. Meu couro cabeludo agradece, uso toda semana.",
  },
  {
    name: "Larissa N.",
    text: "Chegou em 4 dias, bem embalada e com nota fiscal. Já é a segunda escova que compro da marca.",
  },
  {
    name: "Patrícia G.",
    text: "levo na bolsa e uso ate no trabalho pra ajeitar o cabelo, cabe em qualquer nécessaire",
  },
  {
    name: "Bianca F.",
    text: "Minha filha tem cabelo bem cacheado e chorava toda hora na hora de pentear. Agora nem reclama mais.",
  },
  {
    name: "Mariana V.",
    text: "a cor rosa é linda dms, amei",
  },
  {
    name: "Simone A.",
    text: "Já tinha visto um monte de gente usando e resolvi comprar, desembaraça bem mais rápido mesmo.",
  },
  {
    name: "Gabriela D.",
    text: "Uso no cabelo seco antes de dormir e no molhado depois do banho. Virou parte da rotina.",
  },
  {
    name: "Renata P.",
    text: "entrega rapida e o preço tava bem melhor do que em outros lugares q eu vi",
  },
  {
    name: "Carla M.",
    text: "A escova durou muito mais do que eu esperava, uso há mais de um ano e as cerdas continuam firmes.",
  },
  {
    name: "Rafael S.",
    text: "comprei pra minha mae, cabelo bem fino dela, e ela disse q nunca quebrou tao pouco fio",
  },
  {
    name: "Diego C.",
    text: "achei que era só modinha mas funciona mesmo, nem esperava gostar tanto",
  },
  {
    name: "Bruno T.",
    text: "Produto original com selo de autenticidade, isso me deixou tranquilo na hora de comprar.",
  },
  {
    name: "Lucas F.",
    text: "levo pra academia pra usar dps do banho, pratica e n ocupa espaço na mochila",
  },
  {
    name: "Eduardo B.",
    text: "Comprei de presente de aniversário, ela já tinha pedido fazia tempo. Chegou antes do previsto.",
  },
]

function Avatar({ name, photo, colorIndex }: { name: string; photo?: string; colorIndex: number }) {
  if (photo) {
    return (
      <Image src={photo} alt={name} width={36} height={36} className="size-9 shrink-0 rounded-full object-cover" />
    )
  }
  const initial = name.trim().charAt(0).toUpperCase()
  return (
    <span
      className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${AVATAR_COLORS[colorIndex % AVATAR_COLORS.length]}`}
    >
      {initial}
    </span>
  )
}

export function ReviewsMiniCarousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    setActive(Math.floor(Math.random() * testimonials.length))
    const id = setInterval(() => setActive((i) => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(id)
  }, [])

  const t = testimonials[active]

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div key={active} className="animate-fade-in-up flex items-center gap-3">
        <Avatar name={t.name} photo={t.photo} colorIndex={active} />
        <div>
          <p className="flex items-center gap-1 text-xs font-bold text-foreground">
            {t.name}
            <BadgeCheck className="size-3.5 text-brand-navy" />
          </p>
          <div className="flex text-[#f5a623]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3 fill-current" />
            ))}
          </div>
        </div>
      </div>
      <p key={`${active}-text`} className="animate-fade-in-up mt-2 text-xs leading-relaxed text-muted-foreground">
        {t.text}
      </p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-border">
        <div key={active} className="animate-carousel-progress h-full w-full origin-left rounded-full bg-accent" />
      </div>
    </div>
  )
}
