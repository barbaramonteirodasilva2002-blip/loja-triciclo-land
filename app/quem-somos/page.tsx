import type { Metadata } from "next"
import { PageShell, Section } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Quem Somos | Tangle Teezer Brasil",
  description: "Conheça nosso ponto de venda autorizado da marca Tangle Teezer no Brasil.",
}

export default function Page() {
  return (
    <PageShell
      title="Quem Somos"
      intro="Somos um ponto de venda autorizado da marca Tangle Teezer no Brasil, levando as escovas originais até a sua casa com entrega rápida e segura."
    >
      <Section heading="Nossa missão">
        <p>
          Facilitar o acesso às escovas Tangle Teezer originais, com autenticidade garantida e atendimento próximo em
          cada etapa da compra.
        </p>
      </Section>

      <Section heading="Produto original em primeiro lugar">
        <p>
          Trabalhamos apenas com produtos originais, adquiridos por canais oficiais, com selo de autenticidade e sem
          risco de falsificação.
        </p>
      </Section>

      <Section heading="Compromisso com o cliente">
        <p>
          Nosso atendimento é humano e próximo. Estamos disponíveis para tirar dúvidas antes, durante e depois da
          compra, garantindo uma experiência tranquila do início ao fim.
        </p>
      </Section>

      <Section heading="Dados da empresa">
        <p>
          [Razão Social da sua loja]
          <br />
          CNPJ [00.000.000/0000-00]
          <br />
          Revendedor(a) autorizado(a) da marca Tangle Teezer
        </p>
      </Section>
    </PageShell>
  )
}
