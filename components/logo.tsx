import { Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "light" | "dark"
}

// Logo provisória em texto — substituir quando a nova marca da loja de brinquedos estiver pronta.
export function Logo({ className, variant = "dark" }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-heading text-xl font-extrabold tracking-tight",
        variant === "light" ? "text-white" : "text-brand-navy",
        className,
      )}
    >
      <Zap className={cn("size-5 fill-current", variant === "light" ? "text-white" : "text-accent")} />
      Drift<span className={variant === "light" ? "text-white/70" : "text-accent"}>Kids</span>
    </span>
  )
}
