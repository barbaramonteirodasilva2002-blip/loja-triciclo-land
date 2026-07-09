import Image from "next/image"
import { PackageOpen, BatteryCharging, Settings, Zap } from "lucide-react"

const steps = [
  {
    icon: PackageOpen,
    title: "1. Retire da caixa e encaixe o guidão",
    desc: "O triciclo vem pré-montado — basta encaixar o guidão na estrutura, sem ferramentas especiais.",
  },
  {
    icon: BatteryCharging,
    title: "2. Carregue a bateria antes do primeiro uso",
    desc: "Conecte o carregador que acompanha o produto e deixe carregar totalmente antes da primeira pilotagem.",
  },
  {
    icon: Settings,
    title: "3. Ajuste o eixo para o tamanho da criança",
    desc: "Regule a distância entre o banco e o guidão nos furos de ajuste, deixando a postura confortável e segura.",
  },
  {
    icon: Zap,
    title: "4. Ligue, escolha a velocidade e mande ver",
    desc: "Aperte o botão liga/desliga no guidão, selecione uma das 3 velocidades e curta o drift com música no Bluetooth.",
  },
]

export function Installation() {
  return (
    <section className="bg-background py-8">
      <div className="mx-auto max-w-3xl space-y-6 px-4">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <Image
            src="/images/drift-lifestyle-parque.webp"
            alt="Criança pilotando o Triciclo Elétrico Drift em um parque"
            width={1199}
            height={1199}
            sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full"
          />
        </div>

        <div className="rounded-2xl bg-card p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <h2 className="flex items-center justify-center gap-2 font-heading text-2xl font-bold text-foreground">
              <PackageOpen className="size-6 text-accent" /> Pronto para usar em 4 passos
            </h2>
            <p className="mx-auto mt-2 max-w-md text-pretty text-sm text-muted-foreground">
              Vem praticamente montado de fábrica. Em poucos minutos a criançada já está pilotando.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {steps.map((s) => (
              <div key={s.title} className="flex items-start gap-4 rounded-xl bg-secondary/60 p-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-background text-brand-navy">
                  <s.icon className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-accent/40 bg-accent/5 p-4 text-center">
            <p className="flex items-center justify-center gap-2 text-sm font-medium text-foreground">
              <Zap className="size-4 text-accent" />
              <span>
                <span className="font-bold">Motor 300W</span> com 3 velocidades ajustáveis — ideal para a criança evoluir com segurança.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
