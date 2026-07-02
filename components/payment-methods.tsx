const methods = ["Pix", "VISA", "Mastercard", "Elo", "Amex", "Hipercard", "Discover", "Diners"]

export function PaymentMethods() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-2">
      {methods.map((m) => (
        <li
          key={m}
          className="flex h-8 min-w-14 items-center justify-center rounded-md bg-white px-2.5 text-[11px] font-bold text-brand-navy-deep shadow-sm"
        >
          {m}
        </li>
      ))}
    </ul>
  )
}
