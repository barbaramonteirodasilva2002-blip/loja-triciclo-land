import { Percent } from "lucide-react"
import { cn } from "@/lib/utils"

export function DiscountBanner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-foreground",
        className,
      )}
    >
      <Percent className="size-3.5" />
      Até 60% off em produtos selecionados
    </span>
  )
}
