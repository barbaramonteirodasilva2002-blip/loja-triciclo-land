import Image from "next/image"

export function ColorOptions() {
  return (
    <section className="bg-background py-8">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <h2 className="text-balance font-heading text-xl font-bold text-foreground">
            Escolha a estampa favorita da criançada
          </h2>
          <p className="mx-auto mt-2 max-w-md text-pretty text-sm text-muted-foreground">
            Disponível nas estampas Rosa Galáxia, Azul Galáxia e Preto Raios — mesmo motor de 300W e as mesmas 3
            velocidades ajustáveis em todas as cores.
          </p>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
          <Image
            src="/images/drift-produto-cores.webp"
            alt="Triciclo Elétrico Drift nas estampas azul, rosa e preto lado a lado"
            width={1000}
            height={1000}
            sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  )
}
