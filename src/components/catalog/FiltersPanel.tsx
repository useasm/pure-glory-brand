import { CATEGORY_LABELS, type Category, type ProductStatus } from '../../data/types';
import { collections } from '../../data/collections';
import { Button } from '../ui/Button';
import { formatPrice } from '../../lib/format';
import {
  EMPTY_FILTERS,
  hasActiveFilters,
  type CatalogFilters,
} from './filters';

const STATUS_OPTIONS: { value: ProductStatus; label: string }[] = [
  { value: 'available', label: 'In stock' },
  { value: 'pre-order', label: 'Pre-order' },
  { value: 'sold-out', label: 'Sold out' },
];

const PRICE_OPTIONS = [15000, 20000, 25000, 30000];

interface FiltersPanelProps {
  value: CatalogFilters;
  onChange: (next: CatalogFilters) => void;
}

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

export function FiltersPanel({ value, onChange }: FiltersPanelProps) {
  const group = (title: string, children: React.ReactNode) => (
    <div className="flex flex-col gap-3">
      <div className="eyebrow" style={{ color: 'var(--text-muted)' }}>
        {title}
      </div>
      {children}
    </div>
  );

  const checkbox = (
    checked: boolean,
    label: string,
    onToggle: () => void,
    count?: number,
  ) => (
    <label
      key={label}
      className="flex cursor-pointer items-center gap-3"
      style={{ fontSize: 'var(--fs-small)' }}
    >
      <span
        aria-hidden
        className="flex h-4 w-4 items-center justify-center"
        style={{
          border: `1px solid ${checked ? 'var(--pg-ink)' : 'var(--border-hairline-strong)'}`,
          background: checked ? 'var(--pg-ink)' : 'transparent',
          color: 'var(--pg-ivory)',
          fontSize: 10,
          transition:
            'background-color var(--dur-fast) var(--ease-editorial), border-color var(--dur-fast) var(--ease-editorial)',
        }}
      >
        {checked ? '✓' : ''}
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onToggle} />
      <span style={{ color: checked ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
        {label}
      </span>
      {typeof count === 'number' && (
        <span style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-micro)' }}>
          {count}
        </span>
      )}
    </label>
  );

  return (
    <div className="flex flex-col gap-8">
      {group(
        'Category',
        (Object.keys(CATEGORY_LABELS) as Category[]).map((c) =>
          checkbox(value.categories.includes(c), CATEGORY_LABELS[c], () =>
            onChange({ ...value, categories: toggle(value.categories, c) }),
          ),
        ),
      )}

      {group(
        'Collection',
        collections.map((c) =>
          checkbox(value.collections.includes(c.slug), c.name, () =>
            onChange({ ...value, collections: toggle(value.collections, c.slug) }),
          ),
        ),
      )}

      {group(
        'Availability',
        STATUS_OPTIONS.map((s) =>
          checkbox(value.statuses.includes(s.value), s.label, () =>
            onChange({ ...value, statuses: toggle(value.statuses, s.value) }),
          ),
        ),
      )}

      {group(
        'Price up to',
        <div className="flex flex-wrap gap-2">
          {PRICE_OPTIONS.map((p) => {
            const active = value.maxPrice === p;
            return (
              <button
                key={p}
                className="cursor-pointer px-3 py-1.5"
                style={{
                  fontSize: 'var(--fs-micro)',
                  letterSpacing: 'var(--ls-nav)',
                  background: active ? 'var(--pg-ink)' : 'transparent',
                  color: active ? 'var(--pg-ivory)' : 'var(--text-secondary)',
                  border: `1px solid ${active ? 'var(--pg-ink)' : 'var(--border-hairline-strong)'}`,
                  transition:
                    'background-color var(--dur-fast) var(--ease-editorial), color var(--dur-fast) var(--ease-editorial)',
                }}
                onClick={() =>
                  onChange({ ...value, maxPrice: active ? null : p })
                }
              >
                {formatPrice(p)}
              </button>
            );
          })}
        </div>,
      )}

      {hasActiveFilters(value) && (
        <Button variant="ghost" onClick={() => onChange(EMPTY_FILTERS)}>
          Reset filters
        </Button>
      )}
    </div>
  );
}
