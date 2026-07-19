import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"
import { Faq } from "@/components/faq"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Dúvidas Frequentes | Tangle Teezer Brasil",
  description: "Respostas para as principais dúvidas sobre as escovas Tangle Teezer: uso, tipos de fio, entrega e garantia.",
}

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3.5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-brand-navy"
          >
            <ArrowLeft className="size-4" />
            Voltar
          </Link>
          <Link href="/" aria-label="Ir para a página inicial da Tangle Teezer">
            <Logo />
          </Link>
        </div>
      </header>

      <div className="bg-brand-navy-deep text-white">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <h1 className="text-balance font-heading text-2xl font-bold sm:text-3xl">Dúvidas Frequentes</h1>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-white/75">
            Reunimos as perguntas mais comuns sobre as escovas Tangle Teezer. Se ainda ficar com dúvida, fale com o
            nosso atendimento.
          </p>
        </div>
      </div>

      <main>
        <Faq />
      </main>

      <SiteFooter />
    </div>
  )
}
