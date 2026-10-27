"use client";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "./CartDrawer";
import { MobileCartBar } from "./MobileCartBar";
import { Toast } from "./Toast";
export function Providers({ children }: { children: ReactNode }) {
  return (
    // reducedMotion="user" respeita prefers-reduced-motion em todas as animações do Framer Motion.
    <MotionConfig reducedMotion="user">
      <CartProvider>
        {children}
        <MobileCartBar />
        <Toast />
        <CartDrawer />
      </CartProvider>
    </MotionConfig>
  );
}
