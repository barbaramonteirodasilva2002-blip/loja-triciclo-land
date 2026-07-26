"use client"

import { useEffect, useRef, useState } from "react"

const TARGET = 3000
const DURATION_MS = 1400

export function TrustStat() {
  const ref = useRef<HTMLParagraphElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(TARGET)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        function tick(now: number) {
          const progress = Math.min((now - start) / DURATION_MS, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(eased * TARGET))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <p ref={ref} className="font-heading text-4xl font-extrabold text-foreground sm:text-5xl">
      +{count.toLocaleString("pt-BR")}
    </p>
  )
}
