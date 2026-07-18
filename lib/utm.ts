const UTM_STORAGE_KEY = "dk_utm_params"

export type UtmParams = {
  src: string | null
  sck: string | null
  utm_source: string | null
  utm_campaign: string | null
  utm_medium: string | null
  utm_content: string | null
  utm_term: string | null
}

const EMPTY_UTM: UtmParams = {
  src: null,
  sck: null,
  utm_source: null,
  utm_campaign: null,
  utm_medium: null,
  utm_content: null,
  utm_term: null,
}

// Captura os parâmetros de campanha da URL de chegada (ex: link de anúncio do
// Facebook) e guarda no navegador — assim, mesmo que o cliente navegue por
// várias páginas antes de comprar, o pedido final ainda carrega a campanha
// que trouxe a visita original.
export function captureUtmParams(): void {
  if (typeof window === "undefined") return
  const params = new URLSearchParams(window.location.search)
  const hasAny = ["utm_source", "utm_campaign", "utm_medium", "utm_content", "utm_term", "src", "sck"].some((key) =>
    params.has(key),
  )
  if (!hasAny) return

  const next: UtmParams = {
    src: params.get("src"),
    sck: params.get("sck"),
    utm_source: params.get("utm_source"),
    utm_campaign: params.get("utm_campaign"),
    utm_medium: params.get("utm_medium"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term"),
  }
  window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(next))
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") return EMPTY_UTM
  try {
    const raw = window.localStorage.getItem(UTM_STORAGE_KEY)
    if (!raw) return EMPTY_UTM
    return { ...EMPTY_UTM, ...JSON.parse(raw) }
  } catch {
    return EMPTY_UTM
  }
}
