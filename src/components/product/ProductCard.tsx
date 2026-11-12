import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../data/types';
import { productImages } from '../../data/products';
import { HoverGallery } from './HoverGallery';
import { getCollection } from '../../data/collections';
import { formatPrice } from '../../lib/format';
import { useUI } from '../../store/UIContext';
import { useWishlist } from '../../store/WishlistContext';

const STATUS_TAGS: Record<string, string | null> = {
  'sold-out': 'SOLD OUT',
  'pre-order': 'PRE-ORDER',
  available: null,
};

interface ProductCardProps {
  product: Product;
  variant?: 'editorial' | 'compact';
}

export function ProductCard({ product, variant = 'editorial' }: ProductCardProps) {
  const { openQuickView } = useUI();
  const wishlist = useWishlist();
  const [hover, setHover] = useState(false);

  const collection = getCollection(product.collectionSlug);
  const statusTag = STATUS_TAGS[product.status];
  const inWishlist = wishlist.has(product.id);

  if (variant === 'compact') {
    return (
      <div
        className="flex cursor-pointer items-center gap-3.5"
        style={{ fontFamily: 'var(--font-sans)' }}
        onClick={() => openQuickView(product)}
      >
        <div
          className="h-24 w-[76px] shrink-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${product.image}')` }}
        />
        <div>
          {collection && (
            <div className="eyebrow mb-1" style={{ color: 'var(--text-muted)' }}>
              {collection.name}
            </div>
          )}
          <div
            className="font-display"
            style={{ fontSize: 'var(--fs-heading-m)', color: 'var(--text-primary)' }}
          >
            {product.title}
          </div>
          <div
            className="mt-1"
            style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}
          >
            {formatPrice(product.price)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="cursor-pointer"
      style={{ fontFamily: 'var(--font-sans)' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => openQuickView(product)}
    >
      <HoverGallery
        images={productImages(product)}
        dimmed={product.status === 'sold-out'}
      >
        {(product.tag || statusTag) && (
          <div
            className="eyebrow absolute left-3 top-3 px-2.5 py-1"
            style={{
              color: 'var(--pg-ink)',
              background: 'var(--pg-ivory)',
            }}
          >
            {statusTag ?? product.tag}
          </div>
        )}

        <div
          className="absolute inset-x-3 bottom-3 flex gap-2"
          style={{
            opacity: hover ? 1 : 0,
            transform: hover ? 'translateY(0)' : 'translateY(10px)',
            transition:
              'opacity var(--dur-fast) var(--ease-editorial), transform var(--dur-fast) var(--ease-editorial)',
          }}
        >
          <button
            className="eyebrow flex-1 cursor-pointer border-none py-2.5"
            style={{ background: 'var(--pg-ivory)', color: 'var(--pg-ink)' }}
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
          >
            Quick view
          </button>
          <button
            aria-label={inWishlist ? 'Remove from saved' : 'Save'}
            className="eyebrow cursor-pointer border-none px-3.5 py-2.5"
            style={{
              background: inWishlist ? 'var(--pg-ink)' : 'var(--pg-ivory)',
              color: inWishlist ? 'var(--pg-ivory)' : 'var(--pg-ink)',
              transition:
                'background-color var(--dur-fast) var(--ease-editorial), color var(--dur-fast) var(--ease-editorial)',
            }}
            onClick={(e) => {
              e.stopPropagation();
              wishlist.toggle(product.id);
            }}
          >
            {inWishlist ? '♥' : '♡'}
          </button>
        </div>
      </HoverGallery>

      <div className="flex items-baseline justify-between gap-3 pt-3.5">
        <div>
          {collection && (
            <div className="eyebrow mb-1.5" style={{ color: 'var(--text-muted)' }}>
              {collection.name}
            </div>
          )}
          <div
            className="font-display inline-block"
            style={{
              fontSize: 'var(--fs-heading-l)',
              color: 'var(--text-primary)',
              borderBottom: `1px solid ${hover ? 'var(--pg-ink)' : 'transparent'}`,
              transition: 'border-color var(--dur-base) var(--ease-editorial)',
            }}
          >
            {product.title}
          </div>
        </div>
        <div
          className="whitespace-nowrap"
          style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}
        >
          {formatPrice(product.price)}
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  image: string;
  collectionLabel?: string;
  title: string;
  to: string;
  tag?: string;
  minHeight?: number;
}

/** Full-bleed photo card with a caption, links to a collection. */
export function FeatureCard({
  image,
  collectionLabel,
  title,
  to,
  tag,
  minHeight = 420,
}: FeatureCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={to}
      className="relative block h-full overflow-hidden"
      style={{ minHeight, textDecoration: 'none' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${image}')`,
          transform: hover ? 'scale(1.045)' : 'scale(1)',
          transition: 'transform var(--dur-slow) var(--ease-editorial)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 45%, oklch(0.17 0.008 50 / 0.75) 100%)',
        }}
      />
      {tag && (
        <div
          className="eyebrow absolute left-5 top-5 px-2.5 py-1"
          style={{
            color: 'var(--pg-ivory)',
            border: '1px solid var(--border-hairline-inverse)',
          }}
        >
          {tag}
        </div>
      )}
      <div className="absolute inset-x-6 bottom-6" style={{ color: 'var(--pg-ivory)' }}>
        {collectionLabel && (
          <div className="eyebrow mb-2" style={{ opacity: 0.85 }}>
            {collectionLabel}
          </div>
        )}
        <div className="font-display" style={{ fontSize: 'var(--fs-display-m)' }}>
          {title}
        </div>
      </div>
    </Link>
  );
}
