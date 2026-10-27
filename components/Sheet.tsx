"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** "right": gaveta lateral (carrinho). "bottom": painel que sobe (personalização). */
  side: "right" | "bottom";
  children: ReactNode;
}
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
/** Painel modal acessível: Esc fecha, foco fica preso dentro, rolagem do fundo é travada. */
export function Sheet({ open, onClose, title, side, children }: SheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("[data-sheet-close]")?.focus();
    }, 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      lastFocused.current?.focus?.();
    };
  }, [open, onClose]);
  const panelMotion =
    side === "right"
      ? { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } }
      : { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };
  const panelClass =
    side === "right"
      ? "ml-auto h-full w-full max-w-md rounded-none border-l border-line sm:rounded-l-3xl"
      : "mx-auto mt-auto max-h-[92dvh] w-full max-w-2xl rounded-t-3xl border-t border-line sm:my-auto sm:rounded-3xl sm:border";
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`fixed inset-0 z-50 flex ${side === "bottom" ? "sm:p-6" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={`relative flex flex-col overflow-hidden bg-ink-2 shadow-2xl ${panelClass}`}
            {...panelMotion}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
          >
            <button
              type="button"
              onClick={onClose}
              data-sheet-close
              aria-label="Fechar"
              className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink-3 text-white/80 transition-colors hover:text-white"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
