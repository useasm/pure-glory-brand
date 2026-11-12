import type { ReactNode } from 'react';
import { Tag } from '../ui/Tag';
import { products } from '../../data/products';
import {
  DAILY_SALES,
  POPULAR_PRODUCTS,
  RECENT_USERS,
  RECENT_REVIEWS,
} from '../../data/adminDemo';
import { formatPrice } from '../../lib/format';

export function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className="p-5"
      style={{ border: '1px solid var(--border-hairline)', background: 'var(--surface-card)' }}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="eyebrow" style={{ color: 'var(--text-muted)' }}>
          {title}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export function DailySalesWidget() {
  const max = Math.max(...DAILY_SALES.map((d) => d.value));
  return (
    <Panel title="Daily sales, k ₽">
      <div className="flex items-end gap-1.5" style={{ height: 120 }}>
        {DAILY_SALES.map((d, i) => (
          <div
            key={d.day}
            className="group relative flex flex-1 flex-col items-center justify-end"
            style={{ height: '100%' }}
            title={`${d.day} — ${d.value}k ₽`}
          >
            <div
              className="w-full"
              style={{
                height: Math.round((d.value / max) * 110),
                background: i === DAILY_SALES.length - 1 ? 'var(--pg-oxblood)' : 'var(--pg-ink)',
                opacity: i === DAILY_SALES.length - 1 ? 1 : 0.8,
                animation: 'pg-fade-up var(--dur-base) var(--ease-editorial) both',
                animationDelay: `${i * 40}ms`,
                transition: 'opacity var(--dur-fast) var(--ease-editorial)',
              }}
            />
          </div>
        ))}
      </div>
      <div
        className="mt-2 flex justify-between"
        style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-muted)' }}
      >
        <span>{DAILY_SALES[0].day}</span>
        <span>{DAILY_SALES[DAILY_SALES.length - 1].day}</span>
      </div>
    </Panel>
  );
}

export function BarListWidget({
  title,
  items,
  unit,
}: {
  title: string;
  items: { label: string; value: number; hint?: string }[];
  unit?: string;
}) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <Panel title={title}>
      <div className="flex flex-col gap-3.5">
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center gap-4" title={item.hint}>
            <span
              className="w-40 shrink-0 truncate"
              style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}
            >
              {item.label}
            </span>
            <div className="h-4 flex-1">
              <div
                className="h-full"
                style={{
                  width: `${(item.value / max) * 100}%`,
                  background: i === 0 ? 'var(--pg-oxblood)' : 'var(--pg-ink)',
                  opacity: i === 0 ? 1 : 0.8,
                  animation: 'pg-fade var(--dur-base) var(--ease-editorial) both',
                  animationDelay: `${i * 70}ms`,
                }}
              />
            </div>
            <span className="w-16 text-right" style={{ fontSize: 'var(--fs-small)' }}>
              {item.value}
              {unit ? ` ${unit}` : ''}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function PopularProductsWidget() {
  return (
    <BarListWidget
      title="Popular pieces"
      items={POPULAR_PRODUCTS.map((p) => ({ label: p.title, value: p.sold }))}
      unit="pcs"
    />
  );
}

export function RecentUsersWidget() {
  return (
    <Panel title="Recent users">
      <ul className="m-0 flex list-none flex-col p-0">
        {RECENT_USERS.map((u) => (
          <li
            key={u.email}
            className="flex items-baseline justify-between gap-3 py-2.5"
            style={{ borderBottom: '1px solid var(--border-hairline)', fontSize: 'var(--fs-small)' }}
          >
            <span>
              <span style={{ fontWeight: 500 }}>{u.name}</span>{' '}
              <span style={{ color: 'var(--text-muted)' }}>{u.email}</span>
            </span>
            <span className="shrink-0" style={{ color: 'var(--text-muted)' }}>
              {u.date}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function RecentReviewsWidget() {
  return (
    <Panel title="Recent reviews">
      <ul className="m-0 flex list-none flex-col gap-4 p-0">
        {RECENT_REVIEWS.map((r) => (
          <li
            key={`${r.author}-${r.date}`}
            className="flex flex-col gap-1.5 pb-4"
            style={{ borderBottom: '1px solid var(--border-hairline)' }}
          >
            <div className="flex items-baseline justify-between gap-3" style={{ fontSize: 'var(--fs-small)' }}>
              <span style={{ fontWeight: 500 }}>{r.author}</span>
              <span style={{ color: 'var(--pg-gold-deep)', letterSpacing: 2 }}>
                {'★'.repeat(r.rating)}
                <span style={{ color: 'var(--pg-smoke)' }}>{'★'.repeat(5 - r.rating)}</span>
              </span>
            </div>
            <div style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-muted)' }}>
              {r.product} · {r.date}
            </div>
            <p className="m-0" style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>
              «{r.text}»
            </p>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/** Fake stock level derived from the product id, stable between renders. */
export const demoStock = (id: string, status: string) =>
  status === 'sold-out' ? 0 : (parseInt(id.slice(1), 10) % 5) + 1;

export function LowStockWidget() {
  const low = products
    .map((p) => ({ ...p, stock: demoStock(p.id, p.status) }))
    .filter((p) => p.stock > 0 && p.stock <= 2);
  return (
    <Panel title="Low stock">
      <ul className="m-0 flex list-none flex-col p-0">
        {low.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between gap-3 py-2.5"
            style={{ borderBottom: '1px solid var(--border-hairline)', fontSize: 'var(--fs-small)' }}
          >
            <span>{p.title}</span>
            <Tag variant="accent">{p.stock} left</Tag>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function PendingPreordersWidget() {
  const preorders = products.filter((p) => p.status === 'pre-order');
  return (
    <Panel title="Pending pre-orders">
      <ul className="m-0 flex list-none flex-col p-0">
        {preorders.map((p) => (
          <li
            key={p.id}
            className="flex items-baseline justify-between gap-3 py-2.5"
            style={{ borderBottom: '1px solid var(--border-hairline)', fontSize: 'var(--fs-small)' }}
          >
            <span>
              <span style={{ fontWeight: 500 }}>{p.title}</span>{' '}
              <span style={{ color: 'var(--text-muted)' }}>· {p.edition}</span>
            </span>
            <span className="shrink-0">{formatPrice(p.price)}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
