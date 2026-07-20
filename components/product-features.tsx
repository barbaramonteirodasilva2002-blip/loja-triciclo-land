import {
  Layers,
  Droplets,
  Feather,
  Briefcase,
  Gem,
  Leaf,
  Sparkles,
  Wind,
  Waves,
  Zap,
  ArrowUp,
  Star,
  Dog,
  Gift,
  AlignJustify,
  FlaskConical,
  ShieldCheck,
  Hand,
  Percent,
  type LucideIcon,
} from "lucide-react"
import type { FeatureKey } from "@/lib/products"

const FEATURE_INFO: Record<FeatureKey, { icon: LucideIcon; label: string }> = {
  "duas-camadas": { icon: Layers, label: "Cerdas de duas camadas" },
  "seco-molhado": { icon: Droplets, label: "Usa seco ou molhado" },
  "sem-puxar": { icon: Feather, label: "Desembaraça sem puxar" },
  compacta: { icon: Briefcase, label: "Tamanho compacto" },
  premium: { icon: Gem, label: "Acabamento premium" },
  sustentavel: { icon: Leaf, label: "Origem vegetal" },
  colecionavel: { icon: Sparkles, label: "Edição de colecionador" },
  "cerdas-macias": { icon: Wind, label: "Cerdas extra macias" },
  circulacao: { icon: Waves, label: "Estimula a circulação" },
  "reduz-frizz": { icon: Zap, label: "Reduz o frizz" },
  "volume-raiz": { icon: ArrowUp, label: "Volume na raiz" },
  "alinha-brilho": { icon: Star, label: "Alinha e dá brilho" },
  "pet-friendly": { icon: Dog, label: "Especial para pets" },
  presentear: { icon: Gift, label: "Ideal para presentear" },
  "dentes-largos": { icon: AlignJustify, label: "Dentes largos" },
  condicionador: { icon: FlaskConical, label: "Potencializa condicionador" },
  "minimo-dano": { icon: ShieldCheck, label: "Mínimo dano ao fio" },
  "facil-manuseio": { icon: Hand, label: "Fácil manuseio" },
  "remove-oleosidade": { icon: Sparkles, label: "Remove oleosidade" },
  economia: { icon: Percent, label: "Desconto especial" },
}

export function ProductFeatures({ features }: { features?: FeatureKey[] }) {
  if (!features || features.length === 0) return null

  return (
    <div className="mt-5 flex flex-wrap gap-6">
      {features.map((key) => {
        const info = FEATURE_INFO[key]
        const Icon = info.icon
        return (
          <div key={key} className="flex flex-col items-center gap-1.5 text-center">
            <Icon className="size-7 text-foreground" strokeWidth={1.5} />
            <span className="max-w-[6.5rem] text-xs font-bold leading-snug text-foreground">{info.label}</span>
          </div>
        )
      })}
    </div>
  )
}
