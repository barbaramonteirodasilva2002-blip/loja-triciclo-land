// ============================================================================
// PONTO ÚNICO DE INTEGRAÇÃO COM A GATEWAY DE PAGAMENTO
//
// Este arquivo é o único lugar do projeto que deve saber como conversar com a
// sua gateway de pagamento. Toda a UI do checkout (app/checkout,
// components/checkout/*, app/api/checkout/route.ts) já está pronta e chama
// apenas as duas funções abaixo — createPixCharge e createCardCharge.
//
// Para ativar pagamentos reais:
// 1. Adicione as credenciais da sua gateway em variáveis de ambiente
//    (crie um arquivo .env.local — nunca commite chaves secretas no git).
// 2. Implemente as chamadas HTTP reais dentro das duas funções abaixo,
//    usando a API/SDK da sua gateway.
// 3. Ajuste os tipos de retorno se a sua gateway devolver campos diferentes.
//
// Enquanto as funções não forem implementadas, elas lançam
// PaymentGatewayNotConfiguredError, e a API route devolve isso de forma
// amigável para a tela de checkout (ver app/api/checkout/route.ts).
// ============================================================================

export class PaymentGatewayNotConfiguredError extends Error {
  constructor(method: "pix" | "cartão") {
    super(`Gateway de pagamento ainda não configurada para ${method}.`)
    this.name = "PaymentGatewayNotConfiguredError"
  }
}

export type CustomerInfo = {
  name: string
  email: string
  cpf: string
  phone: string
}

export type ShippingAddress = {
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

export type PixChargeParams = {
  amountInCents: number
  orderId: string
  customer: CustomerInfo
}

export type PixChargeResult = {
  chargeId: string
  /** Imagem do QR Code (data URI base64, ex: "data:image/png;base64,...") */
  qrCodeImage: string
  /** Código "copia e cola" do Pix */
  copyPasteCode: string
  /** ISO date string de quando o QR Code expira */
  expiresAt: string
}

export type CardChargeParams = {
  amountInCents: number
  installments: number
  orderId: string
  customer: CustomerInfo
  card: {
    number: string
    holderName: string
    expiryMonth: string
    expiryYear: string
    cvv: string
  }
}

export type CardChargeResult = {
  chargeId: string
  status: "approved" | "pending" | "refused"
}

/**
 * Cria uma cobrança Pix e devolve o QR Code para o cliente pagar.
 * TODO: substituir pela chamada real à API da sua gateway.
 */
export async function createPixCharge(_params: PixChargeParams): Promise<PixChargeResult> {
  throw new PaymentGatewayNotConfiguredError("pix")
}

export type ChargeStatus = "pending" | "paid" | "expired"

/**
 * Consulta o status atual de uma cobrança Pix (usado pela tela de "aguardando
 * pagamento" para saber quando confirmar o pedido).
 * TODO: substituir pela chamada real à API da sua gateway.
 */
export async function checkChargeStatus(_chargeId: string): Promise<ChargeStatus> {
  throw new PaymentGatewayNotConfiguredError("pix")
}

/**
 * Cobra o cartão de crédito informado.
 * TODO: substituir pela chamada real à API/SDK da sua gateway.
 *
 * Atenção: a maioria das gateways (Mercado Pago, Pagar.me, Stripe, Asaas etc.)
 * exige que o número do cartão seja tokenizado no navegador através do SDK
 * JS da própria gateway, para que o dado sensível nunca passe pelo nosso
 * servidor (exigência de compliance PCI-DSS). Se for esse o caso da sua
 * gateway, o formulário em components/checkout/payment-section.tsx precisará
 * ser ajustado para gerar o token no cliente e enviar apenas o token aqui,
 * em vez do número do cartão em texto puro.
 */
export async function createCardCharge(_params: CardChargeParams): Promise<CardChargeResult> {
  throw new PaymentGatewayNotConfiguredError("cartão")
}
