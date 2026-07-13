"use client"

import { useRef, useState } from "react"
import { Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

export type DateRange = "today" | "yesterday" | "week" | "month" | "year" | "custom"

const PRESETS: { id: DateRange; label: string }[] = [
  { id: "today", label: "Hoje" },
  { id: "yesterday", label: "Ontem" },
  { id: "week", label: "Semana" },
  { id: "month", label: "Mês" },
  { id: "year", label: "Esse Ano" },
]

function todayISO(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

export function DateRangeFilter({
  range,
  onChange,
}: {
  range: DateRange
  onChange: (range: DateRange, customDate?: string) => void
}) {
  const [customDate, setCustomDate] = useState(todayISO())
  const dateInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm">
      <div className="flex flex-wrap items-center gap-1">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onChange(preset.id)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:text-sm",
              range === preset.id
                ? "bg-emerald-500 text-white"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative flex items-center">
          <input
            ref={dateInputRef}
            type="date"
            value={customDate}
            onChange={(e) => setCustomDate(e.target.value)}
            className="w-[150px] rounded-lg border border-border bg-background py-1.5 pl-3 pr-8 text-sm text-foreground outline-none focus:border-brand-navy"
          />
          <button
            type="button"
            aria-label="Abrir calendário"
            onClick={() => dateInputRef.current?.showPicker?.()}
            className="absolute right-2 text-muted-foreground"
          >
            <Calendar className="size-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => onChange("custom", customDate)}
          className={cn(
            "rounded-lg px-4 py-1.5 text-sm font-semibold text-white transition hover:brightness-110",
            range === "custom" ? "bg-emerald-500" : "bg-brand-navy",
          )}
        >
          Buscar
        </button>
      </div>
    </div>
  )
}
