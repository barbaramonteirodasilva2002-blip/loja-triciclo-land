import type { MetadataRoute } from "next"
import { COLLECTIONS, PRODUCTS } from "@/lib/products"

const BASE_URL = "https://tangle-teezer-next.vercel.app"

const INSTITUTIONAL_PATHS = [
  "/quem-somos",
  "/duvidas-frequentes",
  "/politica-de-privacidade",
  "/politica-de-frete",
  "/pagamento-seguro",
  "/termos-de-uso",
  "/trocas-e-reembolso",
  "/rastrear-pedido",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...COLLECTIONS.map((collection) => ({
      url: `${BASE_URL}/colecoes/${collection.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...PRODUCTS.filter((product) => product.available).map((product) => ({
      url: `${BASE_URL}/produto/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...INSTITUTIONAL_PATHS.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ]
}
