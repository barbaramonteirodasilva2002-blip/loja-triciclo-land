"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { getKit, type KitId } from "@/lib/checkout"
import { readCartFromStorage, writeCartToStorage, MAX_ITEM_QUANTITY, type CartItem } from "@/lib/cart"
import { getSessionId } from "@/lib/session"

type CartContextValue = {
  items: CartItem[]
  addItem: (kitId: KitId, quantity?: number) => void
  removeItem: (kitId: KitId) => void
  updateQuantity: (kitId: KitId, quantity: number) => void
  clear: () => void
  totalCount: number
  totalValue: number
  isOpen: boolean
  open: () => void
  close: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Carrega o carrinho salvo apenas no cliente, após a hidratação, para
  // evitar divergência entre o HTML renderizado no servidor e no navegador.
  useEffect(() => {
    setItems(readCartFromStorage())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) writeCartToStorage(items)
  }, [items, hydrated])

  // Envia um retrato do carrinho para o painel admin identificar carrinhos
  // abandonados — não bloqueia a experiência de compra em caso de falha.
  useEffect(() => {
    if (!hydrated) return
    const sessionId = getSessionId()
    if (!sessionId) return
    const timeout = setTimeout(() => {
      fetch("/api/track/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, items }),
        keepalive: true,
      }).catch(() => {})
    }, 800)
    return () => clearTimeout(timeout)
  }, [items, hydrated])

  function addItem(kitId: KitId, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.kitId === kitId)
      if (existing) {
        return prev.map((i) =>
          i.kitId === kitId ? { ...i, quantity: Math.min(MAX_ITEM_QUANTITY, i.quantity + quantity) } : i,
        )
      }
      return [...prev, { kitId, quantity: Math.min(MAX_ITEM_QUANTITY, quantity) }]
    })
  }

  function removeItem(kitId: KitId) {
    setItems((prev) => prev.filter((i) => i.kitId !== kitId))
  }

  function updateQuantity(kitId: KitId, quantity: number) {
    if (quantity < 1) {
      removeItem(kitId)
      return
    }
    setItems((prev) => prev.map((i) => (i.kitId === kitId ? { ...i, quantity: Math.min(MAX_ITEM_QUANTITY, quantity) } : i)))
  }

  function clear() {
    setItems([])
  }

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalValue = items.reduce((sum, i) => sum + getKit(i.kitId).priceValue * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clear,
        totalCount,
        totalValue,
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart deve ser usado dentro de <CartProvider>")
  }
  return ctx
}
