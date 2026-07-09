"use client"

import { Fragment } from "react"
import { Check, User, Truck, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

export type CheckoutStep = 1 | 2 | 3

const steps: { step: CheckoutStep; label: string; icon: typeof User }[] = [
  { step: 1, label: "Identificação", icon: User },
  { step: 2, label: "Entrega", icon: Truck },
  { step: 3, label: "Pagamento", icon: CreditCard },
]

export function StepIndicator({
  current,
  onStepClick,
}: {
  current: CheckoutStep
  onStepClick: (step: CheckoutStep) => void
}) {
  return (
    <div className="mb-2">
      <div className="flex items-start">
        {steps.map((s, i) => {
          const isDone = s.step < current
          const isActive = s.step === current
          return (
            <Fragment key={s.step}>
              <button
                type="button"
                disabled={!isDone}
                onClick={() => isDone && onStepClick(s.step)}
                className="flex shrink-0 flex-col items-center gap-1.5"
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition",
                    isDone && "bg-brand-navy text-white",
                    isActive && "bg-accent text-accent-foreground",
                    !isDone && !isActive && "bg-secondary text-muted-foreground",
                  )}
                >
                  {isDone ? <Check className="size-4" /> : <s.icon className="size-4" />}
                </span>
                <span
                  className={cn(
                    "whitespace-nowrap text-[11px] font-semibold",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {s.label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <span className={cn("mx-2 mt-4 h-0.5 flex-1 rounded-full", isDone ? "bg-brand-navy" : "bg-border")} />
              )}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
