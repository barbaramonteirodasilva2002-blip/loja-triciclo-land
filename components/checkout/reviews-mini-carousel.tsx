"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Star, BadgeCheck } from "lucide-react"

const testimonials = [
  {
    name: "Cliente Satisfeita",
    photo: "/images/reviews/fernanda.png",
    text: "A qualidade surpreendeu, roda super bem e ainda toca música no Bluetooth. Show de bola!",
  },
  {
    name: "Cliente Verificado",
    photo: "/images/reviews/ricardo.png",
    text: "Veio tudo certinho, a bateria dura bastante e o carregamento é rápido. Recomendo.",
  },
  {
    name: "Cliente Satisfeito",
    photo: "/images/reviews/marcos.png",
    text: "Meu filho não desgruda do triciclo! As 3 velocidades ajudaram ele a ganhar confiança aos poucos.",
  },
]

export function ReviewsMiniCarousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(id)
  }, [])

  const t = testimonials[active]

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Image src={t.photo} alt={t.name} width={36} height={36} className="size-9 shrink-0 rounded-full object-cover" />
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
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.text}</p>
      <div className="mt-3 flex justify-center gap-1.5">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Ver depoimento ${i + 1}`}
            className={`size-1.5 rounded-full transition-all ${i === active ? "w-4 bg-accent" : "bg-border"}`}
          />
        ))}
      </div>
    </div>
  )
}
