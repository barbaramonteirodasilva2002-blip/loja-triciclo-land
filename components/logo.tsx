import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "light" | "dark"
}

// Sobre fundos escuros, a logo ganha uma base branca arredondada — a arte tem
// o texto "Drift" em azul-marinho, que fica ilegível direto sobre fundo escuro.
export function Logo({ className, variant = "dark" }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        variant === "light" && "rounded-xl bg-white px-3 py-1.5",
      )}
    >
      <Image
        src="/images/logo-driftkids.png"
        alt="DriftKids"
        width={1250}
        height={629}
        priority
        className={cn("h-8 w-auto object-contain", className)}
      />
    </span>
  )
}
