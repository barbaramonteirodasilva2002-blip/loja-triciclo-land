import { PRODUCTS, getCollection, FEATURED_PRODUCT_SLUG } from "@/lib/products"

export type KitId = string

export type Kit = {
  id: KitId
  /** Nome completo do produto (ex: "The Ultimate Detangler"). */
  units: string
  /** Nome da coleção a que o produto pertence (ex: "Desembaraçar"). */
  subtitle: string
  old: string
  price: string
  priceValue: number
  off: string
  img: string
  available: boolean
  bestSeller?: boolean
}

// Catálogo de produtos compartilhado entre o carrinho, o checkout e as páginas
// de produto/coleção. Cada entrada de PRODUCTS vira um "kit" (SKU) de uma unidade.
export const KITS: Kit[] = PRODUCTS.map((p) => ({
  id: p.slug,
  units: p.name,
  subtitle: getCollection(p.collection)?.name ?? "",
  old: p.oldPrice ? `R$ ${p.oldPrice}` : "",
  price: `R$ ${p.price}`,
  priceValue: p.priceValue,
  off: p.discountPct ? `${p.discountPct}%` : "",
  img: p.img,
  available: p.available,
  bestSeller: p.bestSeller,
}))

export function getKit(kit: KitId): Kit {
  return KITS.find((k) => k.id === kit) ?? KITS[0]
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Produto padrão usado pelos CTAs fora de uma página de produto específica (ex: barra fixa).
export const DEFAULT_KIT: KitId = FEATURED_PRODUCT_SLUG

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
