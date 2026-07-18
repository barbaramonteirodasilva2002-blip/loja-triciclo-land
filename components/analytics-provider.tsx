"use client"

import { useEffect, type ReactNode } from "react"
import { getSessionId } from "@/lib/session"
import { captureUtmParams } from "@/lib/utm"

// Envia um "heartbeat" periódico enquanto a aba está visível, usado pelo painel
// admin para calcular quantos visitantes estão online agora.
export function AnalyticsProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    captureUtmParams()
    const sessionId = getSessionId()
    if (!sessionId) return

    function sendHeartbeat() {
      if (document.visibilityState !== "visible") return
      if (window.location.pathname.startsWith("/admin")) return
      fetch("/api/track/heartbeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, path: window.location.pathname }),
        keepalive: true,
      }).catch(() => {})
    }

    sendHeartbeat()
    const interval = setInterval(sendHeartbeat, 15000)
    document.addEventListener("visibilitychange", sendHeartbeat)
    return () => {
      clearInterval(interval)
      document.removeEventListener("visibilitychange", sendHeartbeat)
    }
  }, [])

  return <>{children}</>
}
