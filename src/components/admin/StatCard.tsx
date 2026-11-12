import { useState } from 'react';

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaUp?: boolean;
  /** breakdown revealed on hover/focus */
  details?: { label: string; value: string }[];
  onClick?: () => void;
}

export function StatCard({ label, value, delta, deltaUp = true, details, onClick }: StatCardProps) {
  const [open, setOpen] = useState(false);
  const interactive = !!details || !!onClick;

  return (
    <div
      className="p-5"
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      style={{
        border: `1px solid ${open ? 'var(--border-hairline-strong)' : 'var(--border-hairline)'}`,
        background: 'var(--surface-card)',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: open ? 'var(--shadow-card)' : 'none',
        transition:
          'border-color var(--dur-fast) var(--ease-editorial), box-shadow var(--dur-base) var(--ease-editorial)',
        outline: 'none',
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={onClick}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="eyebrow" style={{ color: 'var(--text-muted)' }}>
          {label}
        </div>
        {details && (
          <span
            aria-hidden
            style={{
              fontSize: 'var(--fs-micro)',
              color: 'var(--text-muted)',
              transform: open ? 'rotate(180deg)' : 'none',
              transition: 'transform var(--dur-base) var(--ease-editorial)',
            }}
          >
            ▾
          </span>
        )}
      </div>
      <div className="font-display mt-3" style={{ fontSize: 'var(--fs-display-m)' }}>
        {value}
      </div>
      {delta && (
        <div
          className="mt-2"
          style={{
            fontSize: 'var(--fs-micro)',
            letterSpacing: 'var(--ls-nav)',
            color: deltaUp ? 'var(--pg-gold-deep)' : 'var(--pg-oxblood)',
          }}
        >
          {deltaUp ? '↑' : '↓'} {delta} vs last month
        </div>
      )}

      {details && (
        <div
          style={{
            maxHeight: open ? details.length * 34 + 20 : 0,
            opacity: open ? 1 : 0,
            overflow: 'hidden',
            transition:
              'max-height var(--dur-base) var(--ease-editorial), opacity var(--dur-base) var(--ease-editorial)',
          }}
        >
          <div
            className="mt-4 flex flex-col gap-2 pt-3"
            style={{ borderTop: '1px solid var(--border-hairline)' }}
          >
            {details.map((d) => (
              <div
                key={d.label}
                className="flex items-baseline justify-between"
                style={{ fontSize: 'var(--fs-small)' }}
              >
                <span style={{ color: 'var(--text-muted)' }}>{d.label}</span>
                <span>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
