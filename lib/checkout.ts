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
    old: "R$ 249,90",
    price: "R$ 129,90",
    priceValue: 129.9,
    off: "48%",
    img: "/images/drift-produto-rosa.webp",
  },
  {
    id: "preto",
    units: "Preto Raios",
    subtitle: "Estampa exclusiva",
    old: "R$ 249,90",
    price: "R$ 129,90",
    priceValue: 129.9,
    off: "48%",
    img: "/images/drift-produto-preto.jpg",
    bestSeller: true,
  },
  {
    id: "azul",
    units: "Azul Galáxia",
    subtitle: "Estampa exclusiva",
    old: "R$ 249,90",
    price: "R$ 129,90",
    priceValue: 129.9,
    off: "48%",
    img: "/images/drift-produto-azul.jpg",
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
export const PIX_DISCOUNT_PERCENT = 10

// Cupons de desconto válidos no checkout. Vazio por padrão — adicione os seus
// aqui (ex: { code: "BEMVINDO10", percent: 10 }) para ativá-los.
export const COUPONS: { code: string; percent: number }[] = []

export function getCouponDiscount(code: string): number | null {
  const coupon = COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase())
  return coupon ? coupon.percent : null
}

export type ShippingMethodId = "pac" | "sedex" | "full"

export type ShippingMethod = {
  id: ShippingMethodId
  label: string
  eta: string
  price: number
}

// Opções de frete oferecidas na etapa de Entrega do checkout.
export const SHIPPING_METHODS: ShippingMethod[] = [
  { id: "pac", label: "PAC", eta: "3 a 7 dias", price: 0 },
  { id: "sedex", label: "SEDEX", eta: "1 a 3 dias", price: 9.81 },
  { id: "full", label: "ENVIO FULL", eta: "Entrega garantida", price: 17.9 },
]

export function getShippingMethod(id: ShippingMethodId): ShippingMethod {
  return SHIPPING_METHODS.find((s) => s.id === id) ?? SHIPPING_METHODS[0]
}

export const DEFAULT_SHIPPING_METHOD: ShippingMethodId = "pac"
