import { useMemo, useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ProductCard } from '../components/product/ProductCard';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { Drawer } from '../components/ui/Drawer';
import { Reveal } from '../components/ui/Reveal';
import { FiltersPanel } from '../components/catalog/FiltersPanel';
import {
  applyFilters,
  EMPTY_FILTERS,
  hasActiveFilters,
  SORT_LABELS,
  type CatalogFilters,
  type SortKey,
} from '../components/catalog/filters';
import { products } from '../data/products';
import { useSimulatedLoading } from '../lib/hooks';
import { plural } from '../lib/format';

const PAGE_SIZE = 6;

export function CatalogPage() {
  const [filters, setFilters] = useState<CatalogFilters>(EMPTY_FILTERS);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('featured');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mobileFilters, setMobileFilters] = useState(false);

  // show skeletons whenever filters, sort or query change
  const loading = useSimulatedLoading([filters, sort, query], 500);

  const filtered = useMemo(
    () => applyFilters(products, filters, query, sort),
    [filters, query, sort],
  );
  const visible = filtered.slice(0, visibleCount);

  const updateFilters = (next: CatalogFilters) => {
    setFilters(next);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <>
      <Header />

      <main
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '0 var(--space-gutter) var(--space-9)',
        }}
      >
        <section style={{ padding: 'var(--space-7) 0 var(--space-6)' }}>
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Catalog' }]} />
          <h1
            className="font-display m-0 mt-5"
            style={{ fontSize: 'var(--fs-display-l)', fontWeight: 400 }}
          >
            Catalog
          </h1>
          <p
            className="m-0 mt-3 max-w-xl"
            style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-body-l)' }}
          >
            Not a marketplace. Everything here was painted or embroidered by
            hand and exists once, or a few times at most.
          </p>
        </section>

        <div
          className="flex flex-wrap items-end justify-between gap-4 pb-6"
          style={{ borderBottom: '1px solid var(--border-hairline)' }}
        >
          <div className="flex flex-1 flex-wrap items-end gap-6">
            <input
              className="input-underline max-w-xs"
              placeholder="Search the catalog…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
            />
            <button
              className="eyebrow cursor-pointer border-none bg-transparent pb-2 lg:hidden"
              style={{ color: 'var(--text-primary)' }}
              onClick={() => setMobileFilters(true)}
            >
              Filters{hasActiveFilters(filters) ? ' •' : ''}
            </button>
          </div>

          <div className="flex items-end gap-6">
            <span
              className="hidden pb-2 sm:block"
              style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}
            >
              {filtered.length}{' '}
              {plural(filtered.length, 'piece', 'pieces')}
            </span>
            <label className="flex flex-col gap-1.5">
              <span className="eyebrow" style={{ color: 'var(--text-muted)' }}>
                Sort by
              </span>
              <select
                className="cursor-pointer border-none bg-transparent pb-2 outline-none"
                style={{
                  fontSize: 'var(--fs-small)',
                  borderBottom: '1px solid var(--border-hairline)',
                }}
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
              >
                {Object.entries(SORT_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="grid gap-10 pt-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <FiltersPanel value={filters} onChange={updateFilters} />
          </aside>

          <div>
            {loading ? (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                style={{ gap: 'var(--grid-gap)', rowGap: 'var(--space-7)' }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                title="Nothing found"
                text="Try loosening the filters. There isn’t much of anything here, but something should turn up."
                action={
                  <Button variant="ghost" onClick={() => updateFilters(EMPTY_FILTERS)}>
                    Reset filters →
                  </Button>
                }
              />
            ) : (
              <>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  style={{ gap: 'var(--grid-gap)', rowGap: 'var(--space-7)' }}
                >
                  {visible.map((product, i) => (
                    <Reveal key={product.id} delay={(i % 3) * 90}>
                      <ProductCard product={product} />
                    </Reveal>
                  ))}
                </div>

                {visibleCount < filtered.length && (
                  <div className="flex justify-center pt-14">
                    <Button
                      variant="secondary"
                      onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                    >
                      Show more ({filtered.length - visibleCount})
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Drawer
        open={mobileFilters}
        onClose={() => setMobileFilters(false)}
        side="left"
        eyebrow="Catalog"
        title="Filters"
        width={360}
        footer={
          <Button variant="primary" className="w-full" onClick={() => setMobileFilters(false)}>
            Show {filtered.length}
          </Button>
        }
      >
        <FiltersPanel value={filters} onChange={updateFilters} />
      </Drawer>

      <Footer />
    </>
  );
}
