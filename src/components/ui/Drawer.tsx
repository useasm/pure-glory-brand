import { useEffect, useState, type ReactNode } from 'react';
import { useBodyLock, useEscape } from '../../lib/hooks';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: 'right' | 'left';
  title?: ReactNode;
  eyebrow?: string;
  width?: number;
  children: ReactNode;
  footer?: ReactNode;
}

/** Slide-over panel. Stays mounted until the exit transition finishes. */
export function Drawer({
  open,
  onClose,
  side = 'right',
  title,
  eyebrow,
  width = 440,
  children,
  footer,
}: DrawerProps) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useBodyLock(mounted);
  useEscape(mounted, onClose);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // let it mount off-screen first, then slide in
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else if (mounted) {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 560);
      return () => clearTimeout(t);
    }
  }, [open, mounted]);

  if (!mounted) return null;

  const offscreen = side === 'right' ? 'translateX(100%)' : 'translateX(-100%)';

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0"
        style={{
          background: 'oklch(0.17 0.008 50 / 0.4)',
          opacity: visible ? 1 : 0,
          transition: 'opacity var(--dur-base) var(--ease-editorial)',
        }}
        onClick={onClose}
      />
      <aside
        className="absolute top-0 flex h-full w-full flex-col"
        style={{
          [side]: 0,
          maxWidth: width,
          background: 'var(--surface-card)',
          boxShadow: 'var(--shadow-raised)',
          transform: visible ? 'translateX(0)' : offscreen,
          transition: 'transform var(--dur-base) var(--ease-editorial)',
        }}
      >
        <header
          className="flex items-start justify-between px-6 pb-5 pt-6"
          style={{ borderBottom: '1px solid var(--border-hairline)' }}
        >
          <div>
            {eyebrow && (
              <div className="eyebrow mb-1.5" style={{ color: 'var(--text-muted)' }}>
                {eyebrow}
              </div>
            )}
            {title && (
              <div
                className="font-display"
                style={{ fontSize: 'var(--fs-heading-l)' }}
              >
                {title}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="eyebrow cursor-pointer border-none bg-transparent pt-1"
            style={{
              color: 'var(--text-muted)',
              transition: 'color var(--dur-fast) var(--ease-editorial)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--pg-ink)')}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = 'var(--text-muted)')
            }
          >
            Close ✕
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        {footer && (
          <footer
            className="px-6 py-5"
            style={{ borderTop: '1px solid var(--border-hairline)' }}
          >
            {footer}
          </footer>
        )}
      </aside>
    </div>
  );
}
