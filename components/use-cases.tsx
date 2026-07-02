import { Utensils, Hand, Baby, Sparkles, Coffee, CookingPot } from "lucide-react"

const uses = [
  { icon: Utensils, label: "Lavar louça" },
  { icon: Hand, label: "Lavar as mãos" },
  { icon: Baby, label: "Banho do bebê" },
  { icon: Sparkles, label: "Higienizar" },
  { icon: Coffee, label: "Bebidas quentes" },
  { icon: CookingPot, label: "Cozinha" },
]

export function UseCases() {
  return (
    <section className="bg-background py-10">
      <div className="mx-auto max-w-2xl px-4">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground">Água quente para o dia a dia</h2>
          <p className="mt-2 text-pretty text-sm text-muted-foreground">
            Ideal para diversas situações com praticidade e economia de energia
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {uses.map((u) => (
            <div
              key={u.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 text-center"
            >
              <u.icon className="size-6 text-brand-navy" />
              <p className="text-sm font-medium text-foreground">{u.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
