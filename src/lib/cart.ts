"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "@/lib/types";
import { SHIPPING_FLAT, FREE_SHIPPING_THRESHOLD } from "@/lib/types";

type AddPayload = Omit<CartLine, "key" | "quantity"> & { quantity?: number };

type CartState = {
  lines: CartLine[];
  drawerOpen: boolean;
  hydrated: boolean;
  add: (payload: AddPayload) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  setHydrated: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      drawerOpen: false,
      hydrated: false,
      add: (payload) =>
        set((state) => {
          const key = `${payload.slug}::${payload.size}::${payload.color}`;
          const quantity = payload.quantity ?? 1;
          const existing = state.lines.find((line) => line.key === key);
          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line.key === key
                  ? { ...line, quantity: Math.min(10, line.quantity + quantity) }
                  : line,
              ),
              drawerOpen: true,
            };
          }
          return {
            lines: [...state.lines, { ...payload, key, quantity }],
            drawerOpen: true,
          };
        }),
      remove: (key) => set((state) => ({ lines: state.lines.filter((line) => line.key !== key) })),
      setQuantity: (key, quantity) =>
        set((state) => ({
          lines: state.lines
            .map((line) => (line.key === key ? { ...line, quantity } : line))
            .filter((line) => line.quantity > 0),
        })),
      clear: () => set({ lines: [] }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "vestra-bag",
      partialize: (state) => ({ lines: state.lines }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.quantity, 0);
}

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.price * line.quantity, 0);
}

export function shippingFor(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
}
