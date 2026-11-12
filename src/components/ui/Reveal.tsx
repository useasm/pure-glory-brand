import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '../../lib/hooks';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'figure';
  variant?: 'fade-up' | 'image';
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  variant = 'fade-up',
}: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  const base = variant === 'image' ? 'reveal-image' : 'reveal';
  const style: CSSProperties = delay
    ? { transitionDelay: `${delay}ms` }
    : {};
  return (
    <Tag ref={ref} className={`${base} ${className}`} style={style}>
      {children}
    </Tag>
  );
}
