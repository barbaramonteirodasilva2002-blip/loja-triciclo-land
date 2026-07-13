const SESSION_KEY = "dk_session_id"

// Identificador de sessão do visitante, gerado uma vez e persistido no navegador —
// usado para agrupar eventos de rastreamento (funil de checkout, carrinho, presença)
// sem exigir login do cliente.
export function getSessionId(): string {
  if (typeof window === "undefined") return ""
  let id = window.localStorage.getItem(SESSION_KEY)
  if (!id) {
    id = crypto.randomUUID()
    window.localStorage.setItem(SESSION_KEY, id)
  }
  return id
}
