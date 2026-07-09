import Image from "next/image"

const cards = [
  { name: "Visa", file: "visa" },
  { name: "Mastercard", file: "mastercard" },
  { name: "American Express", file: "amex" },
  { name: "Diners Club", file: "diners" },
  { name: "Hipercard", file: "hipercard" },
  { name: "Boleto", file: "boleto" },
  { name: "Elo", file: "elo" },
  { name: "Pix", file: "pix" },
]

export function PaymentMethods() {
  return (
    <ul className="mx-auto flex w-full max-w-[340px] flex-nowrap items-center justify-center gap-1">
      {cards.map((c) => (
        <li
          key={c.file}
          className="flex h-7 min-w-0 max-w-[38px] flex-1 items-center justify-center overflow-hidden rounded bg-white px-1 py-1 shadow-sm"
        >
          <Image
            src={`/images/cards/${c.file}.svg`}
            alt={c.name}
            width={120}
            height={40}
            sizes="52px"
            className="h-auto w-full object-contain"
          />
        </li>
      ))}
    </ul>
  )
}
