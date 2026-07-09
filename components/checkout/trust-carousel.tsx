"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"

const badges = [
  {
    image: "/images/correios-icon.png",
    title: "© Correios",
    text: "Trabalhamos com os Correios há mais de 5 anos, garantindo entregas rápidas e seguras para todo o Brasil.",
  },
  {
    image: "/images/icone-devolucao.png",
    title: "Devolução Facilitada",
    text: "30 dias para troca ou devolução de forma simples, rápida e segura.",
  },
  {
    image: "/images/selo-satisfacao.png",
    title: "Compra 100% Segura",
    text: "Seus dados protegidos durante toda a finalização da compra.",
  },
]

export function TrustCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % badges.length)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[active] as HTMLElement | undefined
    if (card) {
      track.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" })
    }
  }, [active])

  return (
    <div className="mt-4">
      <div ref={trackRef} className="flex gap-3 overflow-x-hidden scroll-smooth px-4">
        {badges.map((b) => (
          <div
            key={b.title}
            className="w-[78%] shrink-0 rounded-xl border border-border bg-card p-4 shadow-sm sm:w-[45%]"
          >
            <div className="flex items-center justify-between">
              <div className="flex text-[#f5a623]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <div className="relative size-7 shrink-0">
                <Image src={b.image} alt={b.title} fill sizes="28px" className="object-contain" />
              </div>
            </div>
            <p className="mt-2 text-sm font-bold text-foreground">{b.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{b.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {badges.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Ver selo ${i + 1}`}
            className={`size-1.5 rounded-full transition-all ${i === active ? "w-4 bg-accent" : "bg-border"}`}
          />
        ))}
      </div>
    </div>
  )
}
