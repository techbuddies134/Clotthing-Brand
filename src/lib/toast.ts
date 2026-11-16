"use client";

import { create } from "zustand";

type ToastState = {
  message: string | null;
  detail: string | null;
  show: (message: string, detail?: string) => void;
  hide: () => void;
};

let timer: ReturnType<typeof setTimeout> | null = null;

export const useToast = create<ToastState>()((set) => ({
  message: null,
  detail: null,
  show: (message, detail) => {
    set({ message, detail: detail ?? null });
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => set({ message: null, detail: null }), 3200);
  },
  hide: () => set({ message: null, detail: null }),
}));
