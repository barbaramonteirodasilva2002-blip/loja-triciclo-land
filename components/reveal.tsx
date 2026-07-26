"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

export function Reveal({
  children,
  delay = 0,
  className,
  direction = "up",
}: {
  children: ReactNode
  delay?: number
  className?: string
  /** "up" (padrão) sobe suavemente; "left"/"right" desliza a partir da lateral. */
  direction?: "up" | "left" | "right"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-reveal={visible ? "in" : undefined}
      data-reveal-dir={direction !== "up" ? direction : undefined}
      style={visible ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </div>
  )
}
