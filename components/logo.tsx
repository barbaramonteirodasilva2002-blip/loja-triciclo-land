import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "light" | "dark"
}

// logo-mark.png é a arte oficial (public/logo.png), recortada sem a tag da
// marca — a tag continua como texto abaixo, já que ela precisa mudar de cor
// conforme o fundo (variant), e a imagem original tem a tag em cinza fixo.
export function Logo({ className, variant = "dark" }: LogoProps) {
  const isLight = variant === "light"
  return (
    <span className="inline-flex flex-col leading-none">
      <Image
        src="/logo-mark.png"
        alt="Nó Zero"
        width={1521}
        height={351}
        priority
        className={cn("h-9 w-auto object-contain", className)}
      />
      <span
        className={cn(
          "mt-0.5 text-[9px] font-bold uppercase tracking-widest",
          isLight ? "text-white/70" : "text-muted-foreground",
        )}
      >
        Escovas e acessórios para cabelo
      </span>
    </span>
  )
}
