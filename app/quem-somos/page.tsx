import type { Metadata } from "next"
import { PageShell, Section } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Quem Somos | DriftKids",
  description: "Conheça a DriftKids, nossa missão e o compromisso com produtos de qualidade para a diversão da criançada.",
}

export default function Page() {
  return (
    <PageShell
      title="Quem Somos"
      intro="A DriftKids nasceu para levar diversão e adrenalina segura para o dia a dia das crianças brasileiras com produtos divertidos e acessíveis."
    >
      <Section heading="Nossa missão">
        <p>
          Acreditamos que soluções simples podem transformar a rotina. Por isso selecionamos produtos que unem
          tecnologia, economia e facilidade de uso, sempre pensando no bem-estar da sua família.
        </p>
      </Section>

      <Section heading="Qualidade em primeiro lugar">
        <p>
          Cada item passa por testes de qualidade antes de chegar até você. Trabalhamos apenas com produtos que usaríamos
          em nossas próprias casas.
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
          DriftKids Ltda
          <br />
          Rua Henry Ford, nº 548 — Osasco, São Paulo/SP
          <br />
          CEP 06210-100
        </p>
      </Section>
    </PageShell>
  )
}
