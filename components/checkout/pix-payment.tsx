"use client"

import { useEffect, useState } from "react"
import { Copy, Check, Clock, ShieldAlert, XCircle, Loader2 } from "lucide-react"
import { formatBRL } from "@/lib/checkout"
import type { PixChargeResult } from "@/lib/payment-gateway"

const steps = [
  'Clique em "copiar código", logo acima',
  "Abra o aplicativo do seu banco",
  "Selecione a opção Pix",
  'Toque em "Pix Copia e Cola"',
  "Insira o código copiado e finalize seu pagamento",
]

export function PixPayment({
  pix,
  total,
  onExpired,
  onRegenerate,
  onConfirmed,
  regenerating,
}: {
  pix: PixChargeResult
  total: number
  onExpired: () => void
  onRegenerate: () => void
  onConfirmed: () => void
  regenerating: boolean
}) {
  const [copied, setCopied] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(() => Math.max(0, Math.floor((new Date(pix.expiresAt).getTime() - Date.now()) / 1000)))
  const [expired, setExpired] = useState(secondsLeft <= 0)

  useEffect(() => {
    const id = setInterval(() => {
      const left = Math.max(0, Math.floor((new Date(pix.expiresAt).getTime() - Date.now()) / 1000))
      setSecondsLeft(left)
      if (left <= 0) {
        setExpired(true)
        onExpired()
      }
    }, 1000)
    return () => clearInterval(id)
  }, [pix.expiresAt, onExpired])

  useEffect(() => {
    if (expired) return
    const id = setInterval(async () => {
      try {
        const res = await fetch(`/api/checkout/status?chargeId=${pix.chargeId}`)
        const data = await res.json()
        if (data.status === "paid") {
          onConfirmed()
        }
      } catch {
        // Falha ao consultar o status não deve interromper a espera do cliente.
      }
    }, 5000)
    return () => clearInterval(id)
  }, [pix.chargeId, expired, onConfirmed])

  if (expired) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#d9534f]/10 text-[#d9534f]">
          <XCircle className="size-8" />
        </div>
        <h1 className="mt-5 font-heading text-xl font-bold text-foreground">QR Code venceu</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Esqueceu de efetuar o pagamento? Gere um novo código Pix e receba seu pedido.
        </p>
        <button
          type="button"
          onClick={onRegenerate}
          disabled={regenerating}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-navy px-6 py-3.5 font-heading text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-70"
        >
          {regenerating ? "Gerando..." : "Gerar novo código"}
        </button>
      </div>
    )
  }

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  return (
    <div className="mx-auto max-w-md px-4 py-8 text-center">
      <h1 className="font-heading text-2xl font-bold text-foreground">Quase lá...</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Pague via Pix em até {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")} para confirmar seu
        pedido.
      </p>

      <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700">
        <Loader2 className="size-3.5 animate-spin" /> Aguardando pagamento...
      </div>

      <div className="mx-auto mt-5 size-56 overflow-hidden rounded-2xl border border-border bg-white p-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pix.qrCodeImage} alt="QR Code Pix" className="size-full object-contain" />
      </div>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
        <Clock className="size-4" /> Total via Pix: <span className="font-bold text-foreground">R$ {formatBRL(total)}</span>
      </p>

      <div className="mt-4 truncate rounded-lg bg-secondary/60 px-3 py-2.5 text-xs text-muted-foreground">
        {pix.copyPasteCode}
      </div>

      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(pix.copyPasteCode)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? "Código copiado!" : "Copiar código"}
      </button>

      <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-left">
        <ShieldAlert className="mt-0.5 size-4 shrink-0 text-amber-600" />
        <p className="text-xs leading-relaxed text-amber-800">
          Alguns bancos podem exibir alertas de segurança ao pagar via Pix para novos recebedores. Essa é uma medida
          preventiva e não indica problema na transação.
        </p>
      </div>

      <div className="mt-6 text-left">
        <p className="text-sm font-bold text-foreground">Como pagar o Pix</p>
        <ol className="mt-3 space-y-3">
          {steps.map((s, i) => (
            <li key={s} className="flex items-start gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-0.5 text-sm text-muted-foreground">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
