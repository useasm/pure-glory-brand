import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from '../lib/hooks';
import { getProduct } from '../data/products';

export interface CartItem {
  productId: string;
  size: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  promo: string | null;
  add: (productId: string, size: string) => void;
  remove: (productId: string, size: string) => void;
  setQty: (productId: string, size: string, qty: number) => void;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const FREE_SHIPPING_FROM = 30000;
const SHIPPING_PRICE = 600;
// promo code → discount, %
const PROMO_CODES: Record<string, number> = { PURE10: 10, GLORY15: 15 };

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('pg-cart', []);
  const [promo, setPromo] = useLocalStorage<string | null>('pg-promo', null);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, item) => {
      const product = getProduct(item.productId);
      return sum + (product ? product.price * item.qty : 0);
    }, 0);
    const discount = promo
      ? Math.round((subtotal * (PROMO_CODES[promo] ?? 0)) / 100)
      : 0;
    const shipping =
      subtotal === 0 || subtotal - discount >= FREE_SHIPPING_FROM
        ? 0
        : SHIPPING_PRICE;

    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal,
      discount,
      shipping,
      total: subtotal - discount + shipping,
      promo,
      add: (productId, size) =>
        setItems((prev) => {
          const found = prev.find(
            (i) => i.productId === productId && i.size === size,
          );
          if (found) {
            return prev.map((i) =>
              i === found ? { ...i, qty: i.qty + 1 } : i,
            );
          }
          return [...prev, { productId, size, qty: 1 }];
        }),
      remove: (productId, size) =>
        setItems((prev) =>
          prev.filter((i) => !(i.productId === productId && i.size === size)),
        ),
      setQty: (productId, size, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter(
                (i) => !(i.productId === productId && i.size === size),
              )
            : prev.map((i) =>
                i.productId === productId && i.size === size
                  ? { ...i, qty }
                  : i,
              ),
        ),
      applyPromo: (code) => {
        const normalized = code.trim().toUpperCase();
        if (PROMO_CODES[normalized]) {
          setPromo(normalized);
          return true;
        }
        return false;
      },
      clearPromo: () => setPromo(null),
      clear: () => {
        setItems([]);
        setPromo(null);
      },
    };
  }, [items, promo, setItems, setPromo]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
