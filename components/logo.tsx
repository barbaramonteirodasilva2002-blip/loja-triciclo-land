import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "light" | "dark"
}

// Wordmark em texto (a marca não fornece um arquivo de logo para revendedores),
// no mesmo formato do site de referência: nome + selo de ponto de venda autorizado.
export function Logo({ className, variant = "dark" }: LogoProps) {
  const isLight = variant === "light"
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-heading text-xl font-normal tracking-tight",
          isLight ? "text-white" : "text-foreground",
        )}
      >
        Tangle Teezer
      </span>
      <span
        className={cn(
          "mt-0.5 text-[9px] font-bold uppercase tracking-widest",
          isLight ? "text-white/70" : "text-muted-foreground",
        )}
      >
        Ponto de venda autorizado
      </span>
    </span>
  )
}
