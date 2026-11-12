import { useState, type ReactNode } from 'react';

interface HoverGalleryProps {
  images: string[];
  zoomOnHover?: boolean;
  /** desaturate the photos (sold out) */
  dimmed?: boolean;
  /** overlays rendered on top of the photo (tags, hover actions) */
  children?: ReactNode;
  className?: string;
}

/**
 * Card photo viewer. The image is split into N invisible vertical zones,
 * one per photo, and moving the cursor across them switches the frame.
 */
export function HoverGallery({
  images,
  zoomOnHover = true,
  dimmed = false,
  children,
  className = '',
}: HoverGalleryProps) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const many = images.length > 1;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!many) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const zone = Math.min(
      images.length - 1,
      Math.max(0, Math.floor((x / rect.width) * images.length)),
    );
    setActive(zone);
  };

  return (
    <div
      className={`relative aspect-[4/5] overflow-hidden ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(0);
      }}
      onMouseMove={onMouseMove}
    >
      {images.map((src, i) => (
        <div
          key={src + i}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === active ? 1 : 0,
            transform: zoomOnHover && hover ? 'scale(1.035)' : 'scale(1)',
            filter: dimmed ? 'grayscale(0.4)' : 'none',
            transition:
              'opacity var(--dur-base) var(--ease-editorial), transform var(--dur-slow) var(--ease-editorial)',
          }}
        />
      ))}

      {many && (
        <div
          className="absolute inset-x-3 bottom-1.5 flex gap-1"
          aria-hidden
          style={{
            opacity: hover ? 1 : 0.55,
            transition: 'opacity var(--dur-fast) var(--ease-editorial)',
          }}
        >
          {images.map((_, i) => (
            <span
              key={i}
              className="h-[2px] flex-1"
              style={{
                background:
                  i === active
                    ? 'var(--pg-ivory)'
                    : 'oklch(0.96 0.010 75 / 0.35)',
                transition: 'background-color var(--dur-base) var(--ease-editorial)',
              }}
            />
          ))}
        </div>
      )}

      {children}
    </div>
  );
}
