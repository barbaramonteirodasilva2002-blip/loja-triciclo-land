import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "light" | "dark"
}

export function Logo({ className, variant = "dark" }: LogoProps) {
  return (
    <Image
      src="/images/aqualux-logo.png"
      alt="AquaLux"
      width={350}
      height={110}
      priority
      className={cn(
        "h-8 w-auto",
        // No fundo escuro (menu/rodapé) deixa a logo branca para manter contraste
        variant === "light" && "brightness-0 invert",
        className,
      )}
    />
  )
}
