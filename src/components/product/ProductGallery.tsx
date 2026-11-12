import { useCallback, useEffect, useRef, useState } from 'react';
import { Skeleton } from '../ui/Skeleton';

interface ProductGalleryProps {
  images: string[];
  alt: string;
  /** show thumbnails under the gallery */
  thumbnails?: boolean;
  /** listen for arrow keys on window instead of only when focused */
  keyboardGlobal?: boolean;
  className?: string;
}

const SWIPE_THRESHOLD_PX = 40;

export function ProductGallery({
  images,
  alt,
  thumbnails = false,
  keyboardGlobal = false,
  className = '',
}: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const touchX = useRef<number | null>(null);
  const many = images.length > 1;

  const go = useCallback(
    (dir: 1 | -1) =>
      setActive((i) => (i + dir + images.length) % images.length),
    [images.length],
  );

  // reset when the product changes
  useEffect(() => setActive(0), [images]);

  useEffect(() => {
    if (!keyboardGlobal || !many) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [keyboardGlobal, many, go]);

  const markLoaded = (src: string) =>
    setLoaded((prev) => (prev[src] ? prev : { ...prev, [src]: true }));

  const arrow = (dir: 1 | -1) => (
    <button
      aria-label={dir === 1 ? 'Next photo' : 'Previous photo'}
      className="absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center border-none"
      style={{
        [dir === 1 ? 'right' : 'left']: 12,
        background: 'var(--pg-ivory)',
        color: 'var(--pg-ink)',
        fontSize: 'var(--fs-heading-s)',
        lineHeight: 1,
        opacity: hover ? 1 : 0,
        transform: `translateY(-50%) translateX(${hover ? 0 : dir * 8}px)`,
        transition:
          'opacity var(--dur-fast) var(--ease-editorial), transform var(--dur-fast) var(--ease-editorial), background-color var(--dur-fast) var(--ease-editorial)',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--pg-bone)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--pg-ivory)')}
      onClick={(e) => {
        e.stopPropagation();
        go(dir);
      }}
    >
      {dir === 1 ? '→' : '←'}
    </button>
  );

  return (
    <div className={className}>
      <div
        className="group relative aspect-[4/5] touch-pan-y select-none overflow-hidden"
        tabIndex={many && !keyboardGlobal ? 0 : undefined}
        onKeyDown={
          many && !keyboardGlobal
            ? (e) => {
                if (e.key === 'ArrowRight') go(1);
                if (e.key === 'ArrowLeft') go(-1);
              }
            : undefined
        }
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > SWIPE_THRESHOLD_PX) go(dx < 0 ? 1 : -1);
        }}
        style={{ background: 'var(--pg-bone)', outline: 'none' }}
      >
        {!loaded[images[active]] && (
          <Skeleton className="absolute inset-0 h-full w-full" />
        )}

        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={i === active ? alt : ''}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: i === active && loaded[src] ? 1 : 0,
              transform: hover ? 'scale(1.03)' : 'scale(1)',
              transition:
                'opacity var(--dur-base) var(--ease-editorial), transform var(--dur-slow) var(--ease-editorial)',
            }}
            onLoad={() => markLoaded(src)}
          />
        ))}

        {many && arrow(-1)}
        {many && arrow(1)}

        {many && (
          <div
            className="eyebrow absolute bottom-3 right-3 z-10 px-2 py-1"
            style={{
              background: 'oklch(0.96 0.010 75 / 0.85)',
              color: 'var(--pg-ink)',
              fontVariantNumeric: 'tabular-nums',
              transition: 'opacity var(--dur-fast) var(--ease-editorial)',
            }}
            aria-live="polite"
          >
            {active + 1} / {images.length}
          </div>
        )}
      </div>

      {thumbnails && many && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              aria-label={`Photo ${i + 1}`}
              className="h-20 w-16 shrink-0 cursor-pointer bg-cover bg-center p-0"
              style={{
                backgroundImage: `url('${src}')`,
                border: `1px solid ${
                  i === active ? 'var(--pg-ink)' : 'var(--border-hairline)'
                }`,
                opacity: i === active ? 1 : 0.65,
                transition:
                  'opacity var(--dur-fast) var(--ease-editorial), border-color var(--dur-fast) var(--ease-editorial)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => {
                if (i !== active) e.currentTarget.style.opacity = '0.65';
              }}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
