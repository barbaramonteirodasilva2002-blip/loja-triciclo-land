"use client"

import { useEffect, useRef, type ReactNode } from "react"

export function Parallax({
  children,
  speed = 0.15,
  className,
}: {
  children: ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    function update() {
      raf = 0
      const rect = el!.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const elCenter = rect.top + rect.height / 2
      const offset = (viewportCenter - elCenter) * speed
      el!.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
    }
    function onScroll() {
      if (raf) return
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed])

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  )
}
