import { Logo } from "@/components/logo"
import { AtSign, MessageCircle, Mail, ShieldCheck, Truck, CreditCard } from "lucide-react"

const columns = [
  {
    title: "Políticas",
    links: ["Política de Frete", "Pagamento Seguro", "Termos de Uso", "Trocas e Reembolso"],
  },
  {
    title: "Institucional",
    links: ["Quem Somos", "Dúvidas Frequentes", "Política de Privacidade", "Rastrear Pedido"],
  },
  {
    title: "Atendimento",
    links: ["Central de Ajuda", "Fale Conosco", "WhatsApp", "contato@aqualux.com.br"],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-brand-navy-deep text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo className="text-primary-foreground" />
            <p className="mt-4 max-w-xs text-pretty leading-relaxed text-primary-foreground/60">
              Hidratação com design e qualidade. Garrafas premium para acompanhar você em cada momento do dia.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
              >
                <AtSign className="size-5" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="E-mail"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
              >
                <Mail className="size-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/50">
                {col.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 border-y border-white/10 py-6 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <Truck className="size-6 text-accent" aria-hidden="true" />
            <span className="text-sm text-primary-foreground/70">Envio para todo o Brasil</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-6 text-accent" aria-hidden="true" />
            <span className="text-sm text-primary-foreground/70">Compra 100% segura</span>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="size-6 text-accent" aria-hidden="true" />
            <span className="text-sm text-primary-foreground/70">Cartão, Pix e Boleto</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 text-sm text-primary-foreground/50 sm:flex-row">
          <p>© {new Date().getFullYear()} AquaLux. Todos os direitos reservados.</p>
          <p>CNPJ 00.000.000/0001-00</p>
        </div>
      </div>
    </footer>
  )
}
