"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useCart } from "@/lib/cart";
/** Aviso discreto exibido ao adicionar um item ao pedido. */
export function Toast() {
  const { toast, openCart, dismissToast, isOpen } = useCart();
  const visible = toast !== null && !isOpen;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[45] flex justify-center px-4 md:bottom-8">
      <AnimatePresence>
        {visible && toast && (
          <motion.div
            key={toast.id}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="pointer-events-auto flex max-w-md items-center gap-3 rounded-full border border-neon/40 bg-ink-3 py-2 pl-3 pr-2 shadow-xl"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-magenta">
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="min-w-0 truncate text-sm font-semibold">{toast.message}</span>
            <button
              type="button"
              onClick={() => {
                dismissToast();
                openCart();
              }}
              className="shrink-0 rounded-full bg-white px-3.5 py-2 text-sm font-bold text-ink"
            >
              Ver pedido
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
