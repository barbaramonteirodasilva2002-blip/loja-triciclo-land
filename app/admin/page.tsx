"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Users,
  ShoppingBag,
  Wallet,
  Receipt,
  Clock,
  LogOut,
  RefreshCw,
  ShoppingCart,
  Phone,
  Mail,
} from "lucide-react"
import { Logo } from "@/components/logo"
import { getKit, type KitId } from "@/lib/checkout"
import { cn } from "@/lib/utils"
import { DateRangeFilter, type DateRange } from "@/components/admin/date-range-filter"

type FunnelStep = { step: string; label: string; count: number }
type OrderBucket = { count: number; total: number }
type RecentOrder = {
  id: number
  status: string
  kitLabel: string
  customerName: string
  customerPhone: string | null
  paymentMethod: string
  total: number
  createdAt: string
}
type AbandonedCart = {
  sessionId: string
  items: { kitId: KitId; quantity: number }[]
  customerName: string | null
  customerEmail: string | null
  customerPhone: string | null
  updatedAt: string
}
type Stats = {
  onlineNow: number
  range: string
  rangeLabel: string
  funnel: FunnelStep[]
  funnelWindowMinutes: number
  orders: { pago: OrderBucket; pendente: OrderBucket; cancelado: OrderBucket; total: number }
  salesByKit: { kitId: string; count: number }[]
  abandonedCarts: AbandonedCart[]
  recentOrders: RecentOrder[]
}

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return "agora mesmo"
  if (minutes < 60) return `há ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `há ${hours}h`
  return `há ${Math.floor(hours / 24)}d`
}

export default function AdminPage() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null)
  const [range, setRange] = useState<DateRange>("today")
  const [customDate, setCustomDate] = useState<string | undefined>(undefined)

  const fetchStats = useCallback(async () => {
    try {
      const params = new URLSearchParams({ range })
      if (range === "custom" && customDate) params.set("date", customDate)
      const res = await fetch(`/api/admin/stats?${params.toString()}`, { cache: "no-store" })
      if (res.status === 401) {
        router.push("/admin/login")
        return
      }
      const data = await res.json()
      if (data.ok) {
        setStats(data)
        setError(null)
      }
    } catch {
      setError("Não foi possível atualizar os dados agora.")
    }
  }, [router, range, customDate])

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 5000)
    return () => clearInterval(interval)
  }, [fetchStats])

  function handleRangeChange(nextRange: DateRange, nextCustomDate?: string) {
    setRange(nextRange)
    setCustomDate(nextCustomDate)
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  async function handleOrderStatus(id: number, status: "pago" | "cancelado" | "pendente") {
    setUpdatingOrderId(id)
    try {
      await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      await fetchStats()
    } finally {
      setUpdatingOrderId(null)
    }
  }

  const revenue = stats?.orders.pago.total ?? 0
  const paidCount = stats?.orders.pago.count ?? 0
  const avgTicket = paidCount > 0 ? revenue / paidCount : 0

  return (
    <div className="min-h-screen bg-secondary/30 pb-16">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
          <Logo className="h-8" />
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary"
          >
            <LogOut className="size-4" /> Sair
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        {error && <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">{error}</p>}

        <DateRangeFilter range={range} onChange={handleRangeChange} />

        {/* Cards de estatística */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard icon={Users} label="Online agora" value={stats ? String(stats.onlineNow) : "…"} accent="emerald" pulse />
          <StatCard
            icon={ShoppingBag}
            label={`Pedidos ${stats?.rangeLabel ?? "hoje"}`}
            value={stats ? String(stats.orders.total) : "…"}
            accent="navy"
          />
          <StatCard icon={Wallet} label="Receita (pago)" value={stats ? `R$ ${formatBRL(revenue)}` : "…"} accent="emerald" />
          <StatCard icon={Receipt} label="Ticket médio" value={stats ? `R$ ${formatBRL(avgTicket)}` : "…"} accent="accent" />
        </div>

        {/* Funil de comportamento */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-brand-navy">Comportamento do cliente</p>
            <span className="flex items-center gap-1 text-xs font-semibold text-accent">
              <Clock className="size-3.5" /> {stats?.funnelWindowMinutes ?? 10} minutos
            </span>
          </div>

          <div className="mt-6 flex items-start">
            {(stats?.funnel ?? placeholderFunnel).map((step, i, arr) => (
              <div key={step.step} className="flex flex-1 items-start">
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-4 border-emerald-100 bg-emerald-500" />
                  <span className="font-heading text-lg font-extrabold text-foreground">{step.count}</span>
                  <span
                    className={cn(
                      "whitespace-nowrap text-xs font-semibold",
                      i % 2 === 0 ? "text-brand-navy" : "text-accent",
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {i < arr.length - 1 && <span className="mt-5 h-0.5 flex-1 bg-border" />}
              </div>
            ))}
          </div>
        </div>

        {/* Pedidos */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <p className="font-heading text-base font-bold text-foreground">Pedidos</p>
            <RefreshCw className="size-4 animate-spin text-muted-foreground/40" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <MiniStat label="Pagos" value={stats?.orders.pago.count ?? 0} tone="emerald" />
            <MiniStat label="Pendentes" value={stats?.orders.pendente.count ?? 0} tone="amber" />
            <MiniStat label="Total" value={stats?.orders.total ?? 0} tone="navy" />
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="pb-2 font-semibold">Cliente</th>
                  <th className="pb-2 font-semibold">Produto</th>
                  <th className="pb-2 font-semibold">Pagamento</th>
                  <th className="pb-2 font-semibold">Total</th>
                  <th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold">Quando</th>
                  <th className="pb-2 font-semibold">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {(stats?.recentOrders ?? []).map((order) => (
                  <tr key={order.id}>
                    <td className="py-2.5 pr-3">
                      <p className="font-semibold text-foreground">{order.customerName}</p>
                      {order.customerPhone && <p className="text-xs text-muted-foreground">{order.customerPhone}</p>}
                    </td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{order.kitLabel}</td>
                    <td className="py-2.5 pr-3 uppercase text-muted-foreground">{order.paymentMethod}</td>
                    <td className="py-2.5 pr-3 font-semibold text-foreground">R$ {formatBRL(order.total)}</td>
                    <td className="py-2.5 pr-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-2.5 pr-3 text-xs text-muted-foreground">{timeAgo(order.createdAt)}</td>
                    <td className="py-2.5">
                      {order.status !== "pago" && (
                        <button
                          type="button"
                          disabled={updatingOrderId === order.id}
                          onClick={() => handleOrderStatus(order.id, "pago")}
                          className="mr-1.5 rounded-md bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-200 disabled:opacity-50"
                        >
                          Marcar pago
                        </button>
                      )}
                      {order.status !== "cancelado" && (
                        <button
                          type="button"
                          disabled={updatingOrderId === order.id}
                          onClick={() => handleOrderStatus(order.id, "cancelado")}
                          className="rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-muted-foreground transition hover:bg-border disabled:opacity-50"
                        >
                          Cancelar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {stats && stats.recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-sm text-muted-foreground">
                      Nenhum pedido ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Carrinhos abandonados */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2">
            <ShoppingCart className="size-4 text-[#d9534f]" />
            <p className="font-heading text-base font-bold text-foreground">
              Carrinhos abandonados {stats && <span className="text-muted-foreground">({stats.abandonedCarts.length})</span>}
            </p>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Carrinhos com itens parados há mais de 30 minutos, sem pedido concluído.</p>

          <div className="mt-4 space-y-2.5">
            {(stats?.abandonedCarts ?? []).map((cart) => {
              const itemsLabel = cart.items
                .map((i) => `${getKit(i.kitId).units} x${i.quantity}`)
                .join(", ")
              return (
                <div
                  key={cart.sessionId}
                  className="flex flex-col gap-1.5 rounded-xl border border-border p-3.5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{cart.customerName ?? "Visitante não identificado"}</p>
                    <p className="text-xs text-muted-foreground">{itemsLabel}</p>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      {cart.customerPhone && (
                        <span className="flex items-center gap-1">
                          <Phone className="size-3" /> {cart.customerPhone}
                        </span>
                      )}
                      {cart.customerEmail && (
                        <span className="flex items-center gap-1">
                          <Mail className="size-3" /> {cart.customerEmail}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-muted-foreground">{timeAgo(cart.updatedAt)}</span>
                </div>
              )
            })}
            {stats && stats.abandonedCarts.length === 0 && (
              <p className="py-4 text-center text-sm text-muted-foreground">Nenhum carrinho abandonado no momento.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

const placeholderFunnel: FunnelStep[] = [
  { step: "checkout", label: "Checkout", count: 0 },
  { step: "dados_pessoais", label: "Dados pessoais", count: 0 },
  { step: "entrega", label: "Entrega", count: 0 },
  { step: "pagamento", label: "Pagamento", count: 0 },
  { step: "comprou", label: "Comprou", count: 0 },
]

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
  pulse,
}: {
  icon: typeof Users
  label: string
  value: string
  accent: "emerald" | "navy" | "accent"
  pulse?: boolean
}) {
  const accentClass =
    accent === "emerald" ? "bg-emerald-100 text-emerald-600" : accent === "navy" ? "bg-brand-navy/10 text-brand-navy" : "bg-accent/15 text-accent"
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full", accentClass)}>
          <Icon className="size-4" />
        </span>
        {pulse && <span className="size-2 animate-pulse rounded-full bg-emerald-500" />}
      </div>
      <p className="mt-3 font-heading text-xl font-extrabold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

function MiniStat({ label, value, tone }: { label: string; value: number; tone: "emerald" | "amber" | "navy" }) {
  const toneClass = tone === "emerald" ? "text-emerald-600" : tone === "amber" ? "text-amber-600" : "text-brand-navy"
  return (
    <div className="rounded-xl bg-secondary/60 p-3.5 text-center">
      <p className={cn("font-heading text-2xl font-extrabold", toneClass)}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pago: "bg-emerald-100 text-emerald-700",
    pendente: "bg-amber-100 text-amber-700",
    cancelado: "bg-secondary text-muted-foreground",
  }
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold capitalize", map[status] ?? "bg-secondary")}>
      {status}
    </span>
  )
}
