import Image from "next/image"
import { ShieldCheck } from "lucide-react"

export function AgeGuide() {
  return (
    <section className="bg-background py-8">
      <div className="mx-auto max-w-3xl px-4">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <Image
            src="/images/drift-lifestyle-playroom.webp"
            alt="Crianças se divertindo com o Triciclo Elétrico Drift em um espaço colorido e seguro"
            width={1199}
            height={1199}
            sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full"
          />
        </div>
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-accent/40 bg-accent/5 p-4">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Indicado para crianças de 3 a 8 anos, com até 100kg.</span>{" "}
            Use sempre sob supervisão de um adulto, em superfícies planas e pavimentadas.
          </p>
        </div>
      </div>
    </section>
  )
}
