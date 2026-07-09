"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Lock, ShoppingBag } from "lucide-react"
import { getKit, PIX_DISCOUNT_PERCENT } from "@/lib/checkout"
import { formatCEP, formatCPF, formatPhone, isValidCPF, isValidExpiry, luhnCheck, detectCardBrand } from "@/lib/format"
import { useCart } from "@/components/cart-provider"
import { StepIndicator, type CheckoutStep } from "@/components/checkout/step-indicator"
import { OrderSummaryBar, type CouponStatus } from "@/components/checkout/order-summary-bar"
import { ReviewsMiniCarousel } from "@/components/checkout/reviews-mini-carousel"
import { PaymentSection, type CardFields, type PaymentMethod } from "@/components/checkout/payment-section"
import { PixPayment } from "@/components/checkout/pix-payment"
import { OrderConfirmation, type ConfirmationData } from "@/components/checkout/order-confirmation"
import { CheckoutFooter } from "@/components/checkout/checkout-footer"
import type { PixChargeResult } from "@/lib/payment-gateway"

type Customer = { name: string; email: string; phone: string; cpf: string }
type Address = {
  cep: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
}

const emptyCustomer: Customer = { name: "", email: "", phone: "", cpf: "" }
const emptyAddress: Address = { cep: "", street: "", number: "", complement: "", neighborhood: "", city: "", state: "" }
const emptyCard: CardFields = { number: "", holderName: "", expiry: "", cvv: "" }

const inputClass =
  "w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none focus:border-brand-navy"

export function CheckoutClient() {
  const cart = useCart()
  const lines = cart.items.map((item) => ({ kit: getKit(item.kitId), quantity: item.quantity }))

  const [step, setStep] = useState<CheckoutStep>(1)
  const [couponCode, setCouponCode] = useState("")
  const [couponStatus, setCouponStatus] = useState<CouponStatus>("idle")
  const [couponPercent, setCouponPercent] = useState(0)

  const [customer, setCustomer] = useState<Customer>(emptyCustomer)
  const [address, setAddress] = useState<Address>(emptyAddress)
  const [cepLoading, setCepLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix")
  const [card, setCard] = useState<CardFields>(emptyCard)
  const [installments, setInstallments] = useState(1)

  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const [pixResult, setPixResult] = useState<PixChargeResult | null>(null)
  const [confirmation, setConfirmation] = useState<ConfirmationData | null>(null)

  const subtotal = lines.reduce((sum, l) => sum + l.kit.priceValue * l.quantity, 0)
  const pixBonusPercent = paymentMethod === "pix" ? PIX_DISCOUNT_PERCENT : 0
  const totalDiscountPercent = couponPercent + pixBonusPercent
  const discountValue = subtotal * (totalDiscountPercent / 100)
  const total = subtotal - discountValue

  async function handleApplyCoupon() {
    setCouponStatus("loading")
    try {
      const res = await fetch("/api/checkout/coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode }),
      })
      const data = await res.json()
      if (data.ok) {
        setCouponPercent(data.percent)
        setCouponStatus("applied")
      } else {
        setCouponPercent(0)
        setCouponStatus("invalid")
      }
    } catch {
      setCouponPercent(0)
      setCouponStatus("invalid")
    }
  }

  async function handleCepBlur() {
    const digits = address.cep.replace(/\D/g, "")
    if (digits.length !== 8) return
    setCepLoading(true)
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
      const data = await res.json()
      if (!data.erro) {
        setAddress((a) => ({
          ...a,
          street: data.logradouro || a.street,
          neighborhood: data.bairro || a.neighborhood,
          city: data.localidade || a.city,
          state: data.uf || a.state,
        }))
      }
    } catch {
      // Falha de rede na consulta de CEP não deve travar o checkout — o cliente pode preencher manualmente.
    } finally {
      setCepLoading(false)
    }
  }

  function validateStep1(): boolean {
    const errors: Record<string, string> = {}
    if (!customer.name.trim()) errors.name = "Informe seu nome completo."
    if (!/^\S+@\S+\.\S+$/.test(customer.email)) errors.email = "E-mail inválido."
    if (customer.phone.replace(/\D/g, "").length < 10) errors.phone = "Telefone inválido."
    if (!isValidCPF(customer.cpf)) errors.cpf = "CPF inválido."
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  function validateStep2(): boolean {
    const errors: Record<string, string> = {}
    if (!address.cep.trim()) errors.cep = "Informe o CEP."
    if (!address.street.trim()) errors.street = "Informe o endereço."
    if (!address.number.trim()) errors.number = "Informe o número."
    if (!address.neighborhood.trim()) errors.neighborhood = "Informe o bairro."
    if (!address.city.trim()) errors.city = "Informe a cidade."
    if (!address.state.trim()) errors.state = "Informe o estado."
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  function validateStep3(): boolean {
    if (paymentMethod !== "cartao") return true
    const errors: Record<string, string> = {}
    if (!luhnCheck(card.number)) errors.cardNumber = "Número de cartão inválido."
    if (!card.holderName.trim()) errors.cardHolderName = "Informe o nome impresso no cartão."
    if (!isValidExpiry(card.expiry)) errors.cardExpiry = "Validade inválida ou expirada."
    if (card.cvv.length < 3) errors.cardCvv = "CVV inválido."
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  function goToStep(target: CheckoutStep) {
    setErrorMessage(null)
    if (target > step) {
      if (step === 1 && !validateStep1()) return
      if (step === 2 && !validateStep2()) return
    }
    setFieldErrors({})
    setStep(target)
  }

  async function requestCharge() {
    setSubmitting(true)
    setErrorMessage(null)
    try {
      const [expiryMonth, expiryYear] = card.expiry.split("/")
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.items,
          paymentMethod,
          customer,
          address,
          installments,
          couponCode: couponStatus === "applied" ? couponCode : undefined,
          card:
            paymentMethod === "cartao"
              ? { number: card.number, holderName: card.holderName, expiryMonth, expiryYear, cvv: card.cvv }
              : undefined,
        }),
      })
      const data = await res.json()

      if (!data.ok) {
        if (data.error === "gateway_not_configured") {
          setErrorMessage(
            "Ambiente de desenvolvimento: a gateway de pagamento ainda não foi conectada. " +
              "Assim que as credenciais forem configuradas em lib/payment-gateway.ts, esta tela passará a processar pagamentos reais.",
          )
        } else {
          setErrorMessage(data.message || "Não foi possível processar o pagamento.")
        }
        return
      }

      if (paymentMethod === "pix") {
        setPixResult(data.pix)
      } else {
        buildConfirmation(data.card?.chargeId ?? "Z-PREVIEW")
      }
    } catch {
      setErrorMessage("Falha de conexão. Tente novamente em instantes.")
    } finally {
      setSubmitting(false)
    }
  }

  function buildConfirmation(orderId: string) {
    const brand = paymentMethod === "cartao" ? detectCardBrand(card.number) ?? undefined : undefined
    const last4 = paymentMethod === "cartao" ? card.number.replace(/\D/g, "").slice(-4) : undefined
    setConfirmation({
      orderId,
      customer,
      address,
      paymentMethod,
      installments,
      cardBrand: brand,
      cardLast4: last4,
      lines,
      subtotal,
      total,
    })
    cart.clear()
  }

  async function handleSubmitPayment() {
    setErrorMessage(null)
    if (!validateStep3()) {
      setErrorMessage("Confira os campos do cartão antes de continuar.")
      return
    }
    await requestCharge()
  }

  if (confirmation) {
    return (
      <>
        <OrderConfirmation data={confirmation} />
        <CheckoutFooter />
      </>
    )
  }

  if (pixResult) {
    return (
      <>
        <PixPayment
          pix={pixResult}
          total={total}
          regenerating={submitting}
          onExpired={() => {}}
          onRegenerate={requestCharge}
          onConfirmed={() => buildConfirmation(pixResult.chargeId)}
        />
        <CheckoutFooter />
      </>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
        <ShoppingBag className="size-12 text-muted-foreground/50" />
        <h1 className="font-heading text-xl font-bold text-foreground">Seu carrinho está vazio</h1>
        <p className="text-sm text-muted-foreground">Volte para a loja e escolha a estampa do seu Triciclo Elétrico Drift.</p>
        <Link
          href="/"
          className="mt-2 rounded-xl bg-brand-navy px-6 py-3 font-heading text-sm font-bold text-white transition hover:brightness-110"
        >
          Voltar para a loja
        </Link>
      </div>
    )
  }

  return (
    <>
      <OrderSummaryBar
        lines={lines}
        onQuantityChange={(kitId, q) => cart.updateQuantity(kitId, q)}
        onRemove={(kitId) => cart.removeItem(kitId)}
        couponCode={couponCode}
        onCouponCodeChange={(v) => {
          setCouponCode(v)
          setCouponStatus("idle")
        }}
        onApplyCoupon={handleApplyCoupon}
        couponStatus={couponStatus}
        subtotal={subtotal}
        discountValue={discountValue}
        total={total}
      />

      <div className="mx-auto max-w-lg px-4 py-6">
        <StepIndicator current={step} onStepClick={goToStep} />

        {step === 1 && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <p className="text-sm font-bold text-foreground">Preencha seus dados para envio do pedido.</p>
              <div className="mt-3 space-y-3">
                <Field id="name" label="Nome completo" error={fieldErrors.name}>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Digite seu nome completo"
                    value={customer.name}
                    onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
                <Field id="email" label="E-mail" error={fieldErrors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Digite seu e-mail"
                    value={customer.email}
                    onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
                <Field id="cpf" label="CPF" error={fieldErrors.cpf}>
                  <input
                    id="cpf"
                    name="cpf"
                    autoComplete="off"
                    inputMode="numeric"
                    placeholder="000.000.000-00"
                    value={customer.cpf}
                    onChange={(e) => setCustomer((c) => ({ ...c, cpf: formatCPF(e.target.value) }))}
                    className={inputClass}
                  />
                </Field>
                <Field id="phone" label="Celular/WhatsApp" error={fieldErrors.phone}>
                  <input
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    inputMode="numeric"
                    placeholder="(00) 00000-0000"
                    value={customer.phone}
                    onChange={(e) => setCustomer((c) => ({ ...c, phone: formatPhone(e.target.value) }))}
                    className={inputClass}
                  />
                </Field>
              </div>

              {pixBonusPercent > 0 && (
                <div className="mt-4 rounded-xl bg-secondary/60 p-3 text-center text-xs font-semibold text-brand-navy">
                  ✨ Você ganha {pixBonusPercent}% de desconto pagando com Pix
                </div>
              )}

              <button
                type="button"
                onClick={() => goToStep(2)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-navy py-4 font-heading text-base font-bold text-white shadow-lg shadow-brand-navy/20 transition hover:brightness-110"
              >
                Ir Para Entrega <ArrowRight className="size-4" />
              </button>
            </div>

            <ReviewsMiniCarousel />
          </div>
        )}

        {step === 2 && (
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-bold text-foreground">Para onde enviamos o seu pedido?</p>
            <div className="mt-3 space-y-3">
              <Field id="cep" label="CEP" error={fieldErrors.cep} hint={cepLoading ? "Buscando endereço..." : undefined}>
                <input
                  id="cep"
                  name="postal-code"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  placeholder="00000-000"
                  value={address.cep}
                  onChange={(e) => setAddress((a) => ({ ...a, cep: formatCEP(e.target.value) }))}
                  onBlur={handleCepBlur}
                  className={`${inputClass} max-w-[160px]`}
                />
              </Field>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_120px]">
                <Field id="street" label="Endereço" error={fieldErrors.street}>
                  <input
                    id="street"
                    name="address-line1"
                    autoComplete="address-line1"
                    value={address.street}
                    onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
                <Field id="number" label="Número" error={fieldErrors.number}>
                  <input
                    id="number"
                    name="address-number"
                    value={address.number}
                    onChange={(e) => setAddress((a) => ({ ...a, number: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field id="complement" label="Complemento (opcional)">
                  <input
                    id="complement"
                    name="address-line2"
                    autoComplete="address-line2"
                    value={address.complement}
                    onChange={(e) => setAddress((a) => ({ ...a, complement: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
                <Field id="neighborhood" label="Bairro" error={fieldErrors.neighborhood}>
                  <input
                    id="neighborhood"
                    name="neighborhood"
                    value={address.neighborhood}
                    onChange={(e) => setAddress((a) => ({ ...a, neighborhood: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_100px]">
                <Field id="city" label="Cidade" error={fieldErrors.city}>
                  <input
                    id="city"
                    name="address-level2"
                    autoComplete="address-level2"
                    value={address.city}
                    onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
                <Field id="state" label="UF" error={fieldErrors.state}>
                  <input
                    id="state"
                    name="address-level1"
                    autoComplete="address-level1"
                    maxLength={2}
                    value={address.state}
                    onChange={(e) => setAddress((a) => ({ ...a, state: e.target.value.toUpperCase() }))}
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => goToStep(1)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-4 text-sm font-semibold text-foreground transition hover:bg-secondary"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => goToStep(3)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-navy py-4 font-heading text-base font-bold text-white shadow-lg shadow-brand-navy/20 transition hover:brightness-110"
              >
                Ir Para Pagamento <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <PaymentSection
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              card={card}
              onCardChange={(field, value) => setCard((c) => ({ ...c, [field]: value }))}
              installments={installments}
              onInstallmentsChange={setInstallments}
              priceValue={total}
              errors={{
                number: fieldErrors.cardNumber,
                holderName: fieldErrors.cardHolderName,
                expiry: fieldErrors.cardExpiry,
                cvv: fieldErrors.cardCvv,
              }}
            />

            {errorMessage && (
              <p className="rounded-lg bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">{errorMessage}</p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-4 text-sm font-semibold text-foreground transition hover:bg-secondary"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={handleSubmitPayment}
                disabled={submitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-navy py-4 font-heading text-base font-bold text-white shadow-lg shadow-brand-navy/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Lock className="size-4" />
                {submitting ? "Processando..." : "Finalizar Pedido"}
              </button>
            </div>
          </div>
        )}
      </div>

      <CheckoutFooter />
    </>
  )
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold text-muted-foreground">
        {label}
      </label>
      <div className="mt-1">{children}</div>
      {hint && !error && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="mt-1 text-xs text-[#d9534f]">{error}</p>}
    </div>
  )
}
