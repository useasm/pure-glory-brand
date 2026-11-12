import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Product } from '../data/types';

export type OverlayKind = 'cart' | 'wishlist' | 'account' | 'search';

interface UIContextValue {
  overlay: OverlayKind | null;
  quickView: Product | null;
  openOverlay: (kind: OverlayKind) => void;
  closeOverlay: () => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState<OverlayKind | null>(null);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const openOverlay = useCallback((kind: OverlayKind) => setOverlay(kind), []);
  const closeOverlay = useCallback(() => setOverlay(null), []);
  const openQuickView = useCallback((p: Product) => setQuickView(p), []);
  const closeQuickView = useCallback(() => setQuickView(null), []);

  const value = useMemo(
    () => ({
      overlay,
      quickView,
      openOverlay,
      closeOverlay,
      openQuickView,
      closeQuickView,
    }),
    [overlay, quickView, openOverlay, closeOverlay, openQuickView, closeQuickView],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}
