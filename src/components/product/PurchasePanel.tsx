import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import { useCart } from '../../store/CartContext';
import { useWishlist } from '../../store/WishlistContext';
import { useUI } from '../../store/UIContext';
import { getCollection } from '../../data/collections';
import { formatPrice } from '../../lib/format';
import type { Product } from '../../data/types';

interface PurchasePanelProps {
  product: Product;
  /** called after the item is added to the cart */
  onAfterAdd?: () => void;
  /** show a link to the full product page */
  linkToPage?: boolean;
  /** called when any link inside the panel is followed */
  onNavigate?: () => void;
}

export function PurchasePanel({
  product,
  onAfterAdd,
  linkToPage = false,
  onNavigate,
}: PurchasePanelProps) {
  const cart = useCart();
  const wishlist = useWishlist();
  const { openOverlay } = useUI();
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  );
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setSize(product.sizes.length === 1 ? product.sizes[0] : null);
    setAdded(false);
  }, [product]);

  const collection = getCollection(product.collectionSlug);
  const soldOut = product.status === 'sold-out';
  const preOrder = product.status === 'pre-order';
  const inWishlist = wishlist.has(product.id);

  const addToCart = () => {
    if (!size || soldOut) return;
    cart.add(product.id, size);
    setAdded(true);
    setTimeout(() => {
      onAfterAdd?.();
      openOverlay('cart');
    }, 450);
  };

  return (
    <div className="flex h-full flex-col gap-5">
      {collection && (
        <Link
          to={`/collections/${collection.slug}`}
          className="eyebrow"
          style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
          onClick={onNavigate}
        >
          {collection.name} — {collection.number}
        </Link>
      )}

      <h2
        className="font-display m-0"
        style={{ fontSize: 'var(--fs-display-m)', fontWeight: 400 }}
      >
        {product.title}
      </h2>

      <div className="flex items-center gap-3">
        <span style={{ fontSize: 'var(--fs-heading-s)' }}>
          {formatPrice(product.price)}
        </span>
        {soldOut && <Tag variant="solid">SOLD OUT</Tag>}
        {preOrder && <Tag variant="accent">PRE-ORDER</Tag>}
        {!soldOut && !preOrder && product.tag && (
          <Tag variant="outline">{product.tag}</Tag>
        )}
      </div>

      <p
        className="m-0"
        style={{
          color: 'var(--text-secondary)',
          fontSize: 'var(--fs-body)',
          lineHeight: 'var(--lh-body)',
        }}
      >
        {product.description}
      </p>

      <dl
        className="m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5"
        style={{ fontSize: 'var(--fs-small)' }}
      >
        <dt style={{ color: 'var(--text-muted)' }}>Technique</dt>
        <dd className="m-0">{product.technique}</dd>
        <dt style={{ color: 'var(--text-muted)' }}>Edition</dt>
        <dd className="m-0">{product.edition}</dd>
      </dl>

      <div>
        <div className="mb-2.5 flex items-baseline justify-between">
          <span className="eyebrow" style={{ color: 'var(--text-muted)' }}>
            Size
          </span>
          <Link
            to="/size-guide"
            className="eyebrow"
            style={{ color: 'var(--text-muted)' }}
            onClick={onNavigate}
          >
            Size guide
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => {
            const active = size === s;
            return (
              <button
                key={s}
                className="cursor-pointer px-3.5 py-2"
                disabled={soldOut}
                style={{
                  fontSize: 'var(--fs-small)',
                  background: active ? 'var(--pg-ink)' : 'transparent',
                  color: active ? 'var(--pg-ivory)' : 'var(--pg-ink)',
                  border: `1px solid ${active ? 'var(--pg-ink)' : 'var(--border-hairline-strong)'}`,
                  transition:
                    'background-color var(--dur-fast) var(--ease-editorial), border-color var(--dur-fast) var(--ease-editorial), color var(--dur-fast) var(--ease-editorial)',
                  opacity: soldOut ? 0.45 : 1,
                }}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-2">
        <Button variant="primary" disabled={soldOut || !size} onClick={addToCart}>
          {soldOut
            ? 'Sold out'
            : added
              ? 'Added ✓'
              : preOrder
                ? 'Pre-order'
                : size
                  ? 'Add to cart'
                  : 'Select a size'}
        </Button>
        <Button variant="secondary" onClick={() => wishlist.toggle(product.id)}>
          {inWishlist ? 'Saved ♥' : 'Save ♡'}
        </Button>
        {linkToPage && (
          <Link
            to={`/product/${product.slug}`}
            className="self-center no-underline"
            onClick={onNavigate}
          >
            <Button variant="ghost">Open the full page →</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
