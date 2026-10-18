"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";

export const useCart = create(
  persist(
    (set, get) => ({
      items: [], // { variant, qty, note }
      add: (variant, qty = 1, note = "") =>
        set((s) => {
          const found = s.items.find((i) => i.variant === variant);
          if (found) {
            return {
              items: s.items.map((i) =>
                i.variant === variant
                  ? {
                      ...i,
                      qty: i.qty + qty,
                      note: [i.note, note].filter(Boolean).join(" — "),
                    }
                  : i
              ),
            };
          }
          return { items: [...s.items, { variant, qty, note }] };
        }),
      setQty: (variant, qty) =>
        set((s) => ({
          items: s.items.map((i) => (i.variant === variant ? { ...i, qty: Math.max(1, qty) } : i)),
        })),
      setNote: (variant, note) =>
        set((s) => ({ items: s.items.map((i) => (i.variant === variant ? { ...i, note } : i)) })),
      remove: (variant) => set((s) => ({ items: s.items.filter((i) => i.variant !== variant) })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((n, i) => n + i.qty, 0),
    }),
    { name: "tapko-cart" }
  )
);

// يمنع اختلاف الـ hydration: الكارت بيتقري من localStorage بعد ما الصفحة تفتح
export function useHydrated() {
  const [ok, setOk] = useState(false);
  useEffect(() => setOk(true), []);
  return ok;
}
