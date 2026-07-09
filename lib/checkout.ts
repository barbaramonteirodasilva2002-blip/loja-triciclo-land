export type KitId = "rosa" | "azul" | "preto"

export type Kit = {
  id: KitId
  units: string
  subtitle: string
  old: string
  price: string
  priceValue: number
  off: string
  img: string
  bestSeller?: boolean
}

// Catálogo de cores compartilhado entre o seletor (ProductHero),
// o bloco de preço e a barra fixa (StickyBuyBar).
export const KITS: Kit[] = [
  {
    id: "rosa",
    units: "Rosa Galáxia",
    subtitle: "Estampa exclusiva",
    old: "R$ 899,90",
    price: "R$ 497,90",
    priceValue: 497.9,
    off: "45%",
    img: "/images/drift-produto-rosa.webp",
    bestSeller: true,
  },
  {
    id: "azul",
    units: "Azul Galáxia",
    subtitle: "Estampa exclusiva",
    old: "R$ 899,90",
    price: "R$ 497,90",
    priceValue: 497.9,
    off: "45%",
    img: "/images/drift-lifestyle-parque.webp",
  },
  {
    id: "preto",
    units: "Preto Raios",
    subtitle: "Estampa exclusiva",
    old: "R$ 899,90",
    price: "R$ 497,90",
    priceValue: 497.9,
    off: "45%",
    img: "/images/drift-produto-preto-dimensoes.webp",
  },
]

export function getKit(kit: KitId): Kit {
  return KITS.find((k) => k.id === kit) ?? KITS[0]
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Cor padrão usada pelos CTAs fora do seletor (barra fixa, oferta, etc.)
export const DEFAULT_KIT: KitId = "rosa"

// Desconto extra aplicado quando o cliente escolhe pagar via Pix no checkout.
export const PIX_DISCOUNT_PERCENT = 5

// Cupons de desconto válidos no checkout. Vazio por padrão — adicione os seus
// aqui (ex: { code: "BEMVINDO10", percent: 10 }) para ativá-los.
export const COUPONS: { code: string; percent: number }[] = []

export function getCouponDiscount(code: string): number | null {
  const coupon = COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase())
  return coupon ? coupon.percent : null
}
