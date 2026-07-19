"use client"

import { useRef, useState } from "react"
import Image from "next/image"

export function HeroProductVisual({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -14, y: px * 16 })
  }

  function handleLeave() {
    setHovering(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleLeave}
      style={{ perspective: "900px" }}
      className="group relative mx-auto aspect-square w-full max-w-sm sm:max-w-md motion-reduce:[perspective:none]"
    >
      {/* Anel de glow cromado rotativo — o momento assinatura do hero */}
      <div className="chrome-glow-ring" aria-hidden="true" />

      {/* Sombra que acompanha a inclinação, dando peso e profundidade */}
      <div
        aria-hidden="true"
        className="absolute inset-6 -z-10 rounded-[2rem] bg-black/40 blur-2xl transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${-tilt.y * 0.6}px, ${18 - tilt.x * 0.4}px, 0) scale(0.92)`,
        }}
      />

      <div
        className="relative h-full w-full animate-[hero-float_6s_ease-in-out_infinite] overflow-hidden rounded-[2rem] bg-white shadow-chrome transition-transform duration-300 ease-out will-change-transform motion-reduce:animate-none"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(236,29,110,0.08),transparent_65%)]"
        />
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 480px"
          className="relative object-contain p-3 drop-shadow-[0_18px_24px_rgba(20,20,20,0.14)]"
        />
        {/* Brilho que percorre a peça periodicamente, sugerindo o acabamento polido */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[hero-shine_5s_ease-in-out_infinite] motion-reduce:hidden"
        />
        {/* Realce extra ao passar o mouse */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-white transition-opacity duration-300"
          style={{ opacity: hovering ? 0.06 : 0 }}
        />
      </div>
    </div>
  )
}
