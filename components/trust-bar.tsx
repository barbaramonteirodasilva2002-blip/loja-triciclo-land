import { PaymentMethods } from "@/components/payment-methods"

export function TrustBar() {
  return (
    <section className="bg-background pb-6">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Nós aceitamos
          </p>
          <PaymentMethods />
        </div>
      </div>
    </section>
  )
}
