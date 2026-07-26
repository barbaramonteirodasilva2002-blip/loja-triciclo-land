import Image from "next/image"

const cards = [
  { name: "Visa", file: "visa", width: 780, height: 500 },
  { name: "Mastercard", file: "mastercard", width: 780, height: 500 },
  { name: "American Express", file: "amex", width: 780, height: 500 },
  { name: "Diners Club", file: "diners", width: 780, height: 500 },
  { name: "Hipercard", file: "hipercard", width: 780, height: 500 },
  { name: "Elo", file: "elo", width: 780, height: 500 },
  { name: "Pix", file: "pix", width: 24, height: 24 },
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
            width={c.width}
            height={c.height}
            sizes="52px"
            className="h-auto w-full object-contain"
          />
        </li>
      ))}
    </ul>
  )
}
