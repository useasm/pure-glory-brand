import { Link } from 'react-router-dom';

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className="eyebrow flex flex-wrap items-center gap-2"
      style={{ color: 'var(--text-muted)' }}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden>—</span>}
          {item.to ? (
            <Link
              to={item.to}
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color var(--dur-fast) var(--ease-editorial)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--pg-ink)')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'var(--text-muted)')
              }
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
