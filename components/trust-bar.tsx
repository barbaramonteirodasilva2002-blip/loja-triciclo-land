import { ShieldCheck, Truck, Clock } from "lucide-react"

export function TrustBar() {
  return (
    <section className="bg-background pb-4">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <div className="grid grid-cols-3 gap-2 border-b border-border pb-4 text-center">
            <Badge icon={ShieldCheck} label="Compra segura" />
            <Badge icon={Truck} label="Frete grátis" />
            <Badge icon={Clock} label="Garantia 30 dias" />
          </div>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {["Pix", "VISA", "Mastercard", "Elo", "Amex", "Hipercard", "Discover", "Diners"].map((m) => (
              <li
                key={m}
                className="flex h-7 min-w-12 items-center justify-center rounded-md border border-border bg-background px-2 text-[10px] font-bold text-brand-navy-deep"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Badge({ icon: Icon, label }: { icon: typeof ShieldCheck; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <Icon className="size-5 text-brand-navy" />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
