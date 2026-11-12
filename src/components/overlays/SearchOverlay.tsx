import { useEffect, useMemo, useRef, useState } from 'react';
import { useBodyLock, useEscape } from '../../lib/hooks';
import { useUI } from '../../store/UIContext';
import { products } from '../../data/products';
import { collections } from '../../data/collections';
import { formatPrice, plural } from '../../lib/format';
import { Link } from 'react-router-dom';

export function SearchOverlay() {
  const { overlay, closeOverlay, openQuickView } = useUI();
  const open = overlay === 'search';

  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useBodyLock(mounted);
  useEscape(mounted, closeOverlay);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setQuery('');
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setVisible(true);
          inputRef.current?.focus();
        }),
      );
    } else if (mounted) {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 560);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const q = query.trim().toLowerCase();
  const foundProducts = useMemo(
    () =>
      q.length < 2
        ? []
        : products.filter(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q) ||
              p.technique.toLowerCase().includes(q),
          ),
    [q],
  );
  const foundCollections = useMemo(
    () =>
      q.length < 2
        ? []
        : collections.filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.subtitle.toLowerCase().includes(q),
          ),
    [q],
  );

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      style={{
        background: 'var(--surface-bg)',
        opacity: visible ? 1 : 0,
        transition: 'opacity var(--dur-base) var(--ease-editorial)',
      }}
    >
      <div
        className="mx-auto flex min-h-full flex-col"
        style={{
          maxWidth: 'var(--container-narrow)',
          padding: 'var(--space-7) var(--space-gutter)',
        }}
      >
        <div className="flex items-center justify-between">
          <span className="eyebrow" style={{ color: 'var(--text-muted)' }}>
            Search
          </span>
          <button
            onClick={closeOverlay}
            className="eyebrow cursor-pointer border-none bg-transparent"
            style={{ color: 'var(--text-muted)' }}
          >
            Close ✕
          </button>
        </div>

        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="shirt, embroidery, gold…"
          className="font-display mt-10 w-full border-none bg-transparent outline-none"
          style={{
            fontSize: 'var(--fs-display-m)',
            color: 'var(--text-primary)',
            borderBottom: '1px solid var(--border-hairline-strong)',
            paddingBottom: 12,
          }}
        />

        <div
          className="mt-4"
          style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}
        >
          {q.length < 2
            ? 'Start typing, two characters or more.'
            : `${foundProducts.length + foundCollections.length} ${plural(
                foundProducts.length + foundCollections.length,
                'result',
                'results',
              )}`}
        </div>

        {foundCollections.length > 0 && (
          <div className="mt-10">
            <div className="eyebrow mb-4" style={{ color: 'var(--text-muted)' }}>
              Collections
            </div>
            <div className="flex flex-col gap-3">
              {foundCollections.map((c) => (
                <Link
                  key={c.slug}
                  to={`/collections/${c.slug}`}
                  onClick={closeOverlay}
                  className="font-display anim-fade-up"
                  style={{
                    fontSize: 'var(--fs-heading-l)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                  }}
                >
                  {c.name} <span style={{ color: 'var(--text-muted)' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {foundProducts.length > 0 && (
          <div className="mt-10 pb-16">
            <div className="eyebrow mb-4" style={{ color: 'var(--text-muted)' }}>
              Pieces
            </div>
            <ul className="m-0 flex list-none flex-col p-0">
              {foundProducts.map((p, i) => (
                <li key={p.id} className="anim-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                  <button
                    className="flex w-full cursor-pointer items-center gap-5 border-none bg-transparent px-0 py-4 text-left"
                    style={{ borderBottom: '1px solid var(--border-hairline)' }}
                    onClick={() => {
                      closeOverlay();
                      openQuickView(p);
                    }}
                  >
                    <span
                      className="h-16 w-12 shrink-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${p.image}')` }}
                    />
                    <span className="font-display flex-1" style={{ fontSize: 'var(--fs-heading-m)' }}>
                      {p.title}
                    </span>
                    <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>
                      {formatPrice(p.price)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
