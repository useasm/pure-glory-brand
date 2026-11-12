import { useEffect, useState, type ReactNode } from 'react';
import { useBodyLock, useEscape } from '../../lib/hooks';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: number;
}

export function Modal({ open, onClose, children, maxWidth = 960 }: ModalProps) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useBodyLock(mounted);
  useEscape(mounted, onClose);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else if (mounted) {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 560);
      return () => clearTimeout(t);
    }
  }, [open, mounted]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'oklch(0.17 0.008 50 / 0.45)',
          opacity: visible ? 1 : 0,
          transition: 'opacity var(--dur-base) var(--ease-editorial)',
        }}
        onClick={onClose}
      />
      <div
        className="relative max-h-full w-full overflow-y-auto"
        style={{
          maxWidth,
          background: 'var(--surface-card)',
          boxShadow: 'var(--shadow-raised)',
          opacity: visible ? 1 : 0,
          transform: visible
            ? 'scale(1) translateY(0)'
            : 'scale(0.985) translateY(12px)',
          transition:
            'opacity var(--dur-base) var(--ease-editorial), transform var(--dur-base) var(--ease-editorial)',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="eyebrow absolute right-5 top-5 z-10 cursor-pointer border-none bg-transparent"
          style={{ color: 'var(--text-muted)' }}
        >
          Close ✕
        </button>
        {children}
      </div>
    </div>
  );
}
