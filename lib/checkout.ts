// Links de checkout dos produtos (página de vendas).
// Cada kit aponta para o link de compra correspondente.
//
// ATENÇÃO: os links fornecidos vêm com o domínio "https://undefined/".
// Assim que você informar o domínio correto da loja/checkout, basta
// atualizar a constante CHECKOUT_BASE abaixo — os links serão remontados.
const CHECKOUT_BASE = "https://undefined"

export type KitId = "1un" | "2un" | "3un"

const PRODUCT_IDS: Record<KitId, string> = {
  "1un": "3394124211431",
  "2un": "3394139274438",
  "3un": "3394182432433",
}

const STORE_ID = "33941"

export function getCheckoutUrl(kit: KitId): string {
  const product = PRODUCT_IDS[kit]
  return `${CHECKOUT_BASE}/api/public/shopify?product=${product}&store=${STORE_ID}`
}

// Kit padrão usado pelos CTAs fora do seletor (barra fixa, oferta, etc.)
export const DEFAULT_KIT: KitId = "2un"

// Abre o checkout do kit informado. No preview do v0 (dentro de um iframe)
// abre em nova aba; fora do iframe navega na própria janela.
export function openCheckout(kit: KitId) {
  if (typeof window === "undefined") return
  const url = getCheckoutUrl(kit)
  if (window.self !== window.top) {
    window.open(url, "_blank", "noopener,noreferrer")
  } else {
    window.location.href = url
  }
}
