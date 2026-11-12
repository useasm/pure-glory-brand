import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../store/CartContext';
import { useWishlist } from '../../store/WishlistContext';
import { useUI } from '../../store/UIContext';

export const HEADER_HEIGHT = 72;

interface HeaderProps {
  /** dark: the header sits on top of a hero photo, so text starts ivory. */
  theme?: 'light' | 'dark';
}

const NAV = [
  { to: '/catalog', label: 'Catalog' },
  { to: '/collections', label: 'Collections' },
  { to: '/journal', label: 'Journal' },
  { to: '/about', label: 'About' },
];

/**
 * What is currently under the header:
 * top   - page not scrolled, header is transparent;
 * light - light content, header turns into dark frosted glass;
 * dark  - a [data-dark-zone] element (hero, footer), blur only.
 */
type Mode = 'top' | 'light' | 'dark';

function detectMode(): Mode {
  if (window.scrollY < 16) return 'top';
  const zones = document.querySelectorAll<HTMLElement>('[data-dark-zone]');
  for (const zone of zones) {
    const rect = zone.getBoundingClientRect();
    if (rect.top < HEADER_HEIGHT && rect.bottom > 0) return 'dark';
  }
  return 'light';
}

export function Header({ theme = 'light' }: HeaderProps) {
  const { count } = useCart();
  const wishlist = useWishlist();
  const { openOverlay } = useUI();
  const [mode, setMode] = useState<Mode>('top');

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setMode(detectMode());
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const dark = theme === 'dark';
  // at the top the text follows the page theme, once scrolled it is always ivory
  const fg =
    mode === 'top'
      ? dark
        ? 'var(--pg-ivory)'
        : 'var(--pg-ink)'
      : 'var(--pg-ivory)';

  const background =
    mode === 'light'
      ? 'oklch(0.17 0.008 50 / 0.82)'
      : mode === 'dark'
        ? 'oklch(0.17 0.008 50 / 0.26)'
        : 'transparent';

  const borderColor =
    mode === 'top'
      ? dark
        ? 'transparent'
        : 'var(--border-hairline)'
      : 'oklch(0.96 0.010 75 / 0.14)';

  const navLink: React.CSSProperties = {
    fontSize: 'var(--fs-small)',
    letterSpacing: 'var(--ls-nav)',
    color: fg,
    textDecoration: 'none',
    borderBottom: '1px solid transparent',
    paddingBottom: 4,
    transition:
      'border-color var(--dur-fast) var(--ease-editorial), color var(--dur-slow) var(--ease-editorial)',
  };

  const utilityBtn: React.CSSProperties = {
    fontSize: 'var(--fs-small)',
    color: fg,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    letterSpacing: 'var(--ls-nav)',
    transition: 'color var(--dur-slow) var(--ease-editorial)',
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-6"
        style={{
          height: HEADER_HEIGHT,
          padding: '0 clamp(20px, 4vw, 48px)',
          fontFamily: 'var(--font-sans)',
          color: fg,
          background,
          backdropFilter: mode === 'top' ? 'blur(0px)' : 'blur(16px) saturate(1.1)',
          WebkitBackdropFilter:
            mode === 'top' ? 'blur(0px)' : 'blur(16px) saturate(1.1)',
          borderBottom: `1px solid ${borderColor}`,
          transition:
            'background-color var(--dur-slow) var(--ease-editorial), color var(--dur-slow) var(--ease-editorial), border-color var(--dur-slow) var(--ease-editorial), backdrop-filter var(--dur-slow) var(--ease-editorial)',
        }}
      >
        <Link
          to="/"
          className="font-display"
          style={{
            fontSize: 22,
            letterSpacing: '0.01em',
            color: fg,
            textDecoration: 'none',
            transition: 'color var(--dur-slow) var(--ease-editorial)',
          }}
        >
          Pure Glory
        </Link>

        <nav
          className="hidden md:flex"
          style={{ gap: 'clamp(16px, 2.4vw, 40px)' }}
        >
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={navLink}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderBottomColor = 'currentColor')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderBottomColor = 'transparent')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-[22px]">
          <button style={utilityBtn} onClick={() => openOverlay('search')}>
            Search
          </button>
          <button style={utilityBtn} onClick={() => openOverlay('account')}>
            Account
          </button>
          <button style={utilityBtn} onClick={() => openOverlay('wishlist')}>
            Saved{wishlist.ids.length ? ` (${wishlist.ids.length})` : ''}
          </button>
          <button style={utilityBtn} onClick={() => openOverlay('cart')}>
            Cart{count ? ` (${count})` : ''}
          </button>
        </div>
      </header>

      {/* light pages need a spacer; on hero pages the header overlays the photo */}
      {!dark && <div style={{ height: HEADER_HEIGHT }} aria-hidden />}
    </>
  );
}
