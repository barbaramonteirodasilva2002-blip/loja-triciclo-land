import Image from "next/image"

type Method =
  | { type: "logo"; name: string; src: string }
  | { type: "text"; name: string; label: string; color: string }

const methods: Method[] = [
  { type: "logo", name: "Pix", src: "/images/cards/pix.svg" },
  { type: "logo", name: "Visa", src: "/images/cards/visa.svg" },
  { type: "logo", name: "Mastercard", src: "/images/cards/mastercard.svg" },
  { type: "text", name: "Elo", label: "elo", color: "#000000" },
  { type: "logo", name: "American Express", src: "/images/cards/american-express.svg" },
  { type: "text", name: "Hipercard", label: "Hipercard", color: "#822124" },
  { type: "logo", name: "Discover", src: "/images/cards/discover.svg" },
  { type: "logo", name: "Diners Club", src: "/images/cards/diners-club.svg" },
]

export function PaymentMethods() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-2">
      {methods.map((m) => (
        <li
          key={m.name}
          className="flex h-8 w-14 items-center justify-center rounded-md border border-border/60 bg-white px-2 shadow-sm"
          title={m.name}
        >
          {m.type === "logo" ? (
            <Image src={m.src || "/placeholder.svg"} alt={m.name} width={32} height={20} className="h-5 w-auto object-contain" />
          ) : (
            <span className="text-[11px] font-extrabold italic" style={{ color: m.color }}>
              {m.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
