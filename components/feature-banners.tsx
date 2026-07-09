import Image from "next/image"

const banners = [
  {
    src: "/images/drift-banner-rosa.webp",
    alt: "Drift Elétrico estampa Galáxia Rosa: comando no guidão, banco confortável, motor elétrico e ajuste entre eixos",
    width: 1254,
    height: 1254,
  },
  {
    src: "/images/drift-banner-azul.webp",
    alt: "Drift Elétrico estampa Galáxia Azul: comandos no guidão, banco fixo, motor elétrico no eixo dianteiro e ajuste entre eixos",
    width: 1000,
    height: 1000,
  },
]

export function FeatureBanners() {
  return (
    <section className="bg-muted/40 py-8">
      <div className="mx-auto max-w-3xl space-y-6 px-4">
        {banners.map((b) => (
          <div key={b.src} className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <Image
              src={b.src || "/placeholder.svg"}
              alt={b.alt}
              width={b.width}
              height={b.height}
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
