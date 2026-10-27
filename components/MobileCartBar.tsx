"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { brl } from "@/lib/format";
/** Barra inferior discreta (apenas no celular) com acesso ao pedido. */
export function MobileCartBar() {
  const { count, total, openCart, isOpen } = useCart();
  const visible = count > 0 && !isOpen;
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 360, damping: 32 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden"
        >
          <button
            type="button"
            onClick={openCart}
            className="flex min-h-13 w-full items-center justify-between gap-3 rounded-2xl bg-magenta px-4 py-3 text-left font-bold text-white"
          >
            <span className="flex items-center gap-2.5">
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              Ver pedido · {count} {count === 1 ? "item" : "itens"}
            </span>
            <span>{brl(total)}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
