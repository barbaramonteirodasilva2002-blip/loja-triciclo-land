import Image from "next/image"
import { Flame, Snowflake, Thermometer, ShieldCheck, Droplet } from "lucide-react"

const chips = [
  { icon: Thermometer, title: "Temperatura digital" },
  { icon: ShieldCheck, title: "Mais segurança no seu dia a dia" },
  { icon: Droplet, title: "Economia de água e energia" },
]

export function HotCold() {
  return (
    <section className="bg-background py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="overflow-hidden rounded-2xl bg-secondary/60 p-5 sm:p-8">
          <div className="grid items-center gap-6 lg:grid-cols-2">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-background">
              <Image
                src="/images/heater-hero.png"
                alt="AquaLux Digital com display marcando 45 graus instalado na torneira"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-xl bg-background p-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#e11d2a]/10 text-[#e11d2a]">
                  <Flame className="size-6" />
                </span>
                <div>
                  <p className="font-heading text-base font-bold text-[#e11d2a]">ÁGUA QUENTE</p>
                  <p className="text-sm text-muted-foreground">Gire o seletor para cima para ativar a água quente.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-background p-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Snowflake className="size-6" />
                </span>
                <div>
                  <p className="font-heading text-base font-bold text-accent">ÁGUA FRIA</p>
                  <p className="text-sm text-muted-foreground">Gire para baixo para ter água fria na mesma torneira.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {chips.map((c) => (
              <div key={c.title} className="flex flex-col items-center gap-2 rounded-xl bg-background p-4 text-center">
                <c.icon className="size-6 text-brand-navy" />
                <p className="text-xs font-medium text-foreground">{c.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
