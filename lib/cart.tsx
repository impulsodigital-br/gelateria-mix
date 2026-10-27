"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { makeKey, priceCart, priceItem } from "./pricing";
import type { CartItem, PricedLine, Selection } from "./pricing";
import type { CustomerData } from "./whatsapp";
const STORAGE_KEY = "gelateria-mix-cart-v1";
const MAX_QTY = 99;
type Action =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; selection: Selection; quantity: number }
  | { type: "setQty"; key: string; quantity: number }
  | { type: "remove"; key: string }
  | { type: "clear" };
function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "hydrate":
      return action.items;
    case "add": {
      const key = makeKey(action.selection);
      const existing = state.find((i) => i.key === key);
      if (existing) {
        return state.map((i) =>
          i.key === key ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + action.quantity) } : i,
        );
      }
      return [
        ...state,
        {
          key,
          productId: action.selection.productId,
          sizeId: action.selection.sizeId,
          flavorIds: action.selection.flavorIds,
          quantity: Math.min(MAX_QTY, action.quantity),
        },
      ];
    }
    case "setQty":
      return state.map((i) =>
        i.key === action.key
          ? { ...i, quantity: Math.max(1, Math.min(MAX_QTY, action.quantity)) }
          : i,
      );
    case "remove":
      return state.filter((i) => i.key !== action.key);
    case "clear":
      return [];
    default:
      return state;
  }
}
interface Toast {
  id: number;
  message: string;
}
const EMPTY_CUSTOMER: CustomerData = {
  name: "",
  mode: "retirada",
  address: "",
  payment: "",
  notes: "",
};
interface CartContextValue {
  lines: PricedLine[];
  /** Dados do cliente ficam só em memória (não vão para o localStorage) e sobrevivem ao fechar o carrinho. */
  customer: CustomerData;
  updateCustomer: (patch: Partial<CustomerData>) => void;
  count: number;
  total: number;
  ready: boolean;
  isOpen: boolean;
  toast: Toast | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (selection: Selection, quantity: number, label: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  dismissToast: () => void;
}
const CartContext = createContext<CartContextValue | null>(null);
function loadStored(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const valid: CartItem[] = [];
    for (const entry of parsed) {
      if (!entry || typeof entry !== "object") continue;
      const e = entry as Partial<CartItem>;
      if (typeof e.productId !== "string" || !Array.isArray(e.flavorIds)) continue;
      const candidate: CartItem = {
        key: typeof e.key === "string" ? e.key : "",
        productId: e.productId,
        sizeId: typeof e.sizeId === "string" ? e.sizeId : undefined,
        flavorIds: e.flavorIds.filter((x): x is string => typeof x === "string"),
        quantity: typeof e.quantity === "number" ? e.quantity : 1,
      };
      // Descarta itens que não existem mais no catálogo; os preços são sempre recalculados.
      const priced = priceItem(candidate);
      if (!priced) continue;
      valid.push({
        ...candidate,
        key: makeKey(candidate),
        quantity: Math.min(MAX_QTY, priced.item.quantity),
      });
    }
    return valid;
  } catch {
    return [];
  }
}
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [customer, setCustomer] = useState<CustomerData>(EMPTY_CUSTOMER);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastId = useRef(0);
  useEffect(() => {
    dispatch({ type: "hydrate", items: loadStored() });
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Armazenamento indisponível (modo privado, cota): o carrinho continua funcionando em memória.
    }
  }, [items, ready]);
  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);
  const { lines, total, count } = useMemo(() => priceCart(items), [items]);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const dismissToast = useCallback(() => setToast(null), []);
  const addItem = useCallback((selection: Selection, quantity: number, label: string) => {
    dispatch({ type: "add", selection, quantity });
    toastId.current += 1;
    setToast({ id: toastId.current, message: label });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);
  const setQuantity = useCallback(
    (key: string, quantity: number) => dispatch({ type: "setQty", key, quantity }),
    [],
  );
  const removeItem = useCallback((key: string) => dispatch({ type: "remove", key }), []);
  const clearCart = useCallback(() => dispatch({ type: "clear" }), []);
  const updateCustomer = useCallback(
    (patch: Partial<CustomerData>) => setCustomer((c) => ({ ...c, ...patch })),
    [],
  );
  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      customer,
      updateCustomer,
      count,
      total,
      ready,
      isOpen,
      toast,
      openCart,
      closeCart,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      dismissToast,
    }),
    [
      lines,
      customer,
      updateCustomer,
      count,
      total,
      ready,
      isOpen,
      toast,
      openCart,
      closeCart,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      dismissToast,
    ],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de <CartProvider>.");
  return ctx;
}
