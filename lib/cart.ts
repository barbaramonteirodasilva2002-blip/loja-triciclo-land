import type { KitId } from "@/lib/checkout"

export type CartItem = {
  kitId: KitId
  quantity: number
}

export const CART_STORAGE_KEY = "tangleteezer-cart"

export const MAX_ITEM_QUANTITY = 5

export function readCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item): item is CartItem => typeof item?.kitId === "string" && typeof item?.quantity === "number",
    )
  } catch {
    return []
  }
}

export function writeCartToStorage(items: CartItem[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}
