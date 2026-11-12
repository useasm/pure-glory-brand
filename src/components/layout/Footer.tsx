import { Link } from 'react-router-dom';
import { NewsletterInput } from '../ui/Input';
import {
  TelegramIcon,
  InstagramIcon,
  TikTokIcon,
  EmailIcon,
} from '../ui/SocialIcons';

const BRAND_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'History', to: '/history' },
  { label: 'Contacts', to: '/contacts' },
];

const CUSTOMER_LINKS = [
  { label: 'Shipping & returns', to: '/delivery' },
  { label: 'Garment care', to: '/care' },
  { label: 'Size guide', to: '/size-guide' },
  { label: 'Get in touch', to: '/contacts' },
];

const DOCUMENT_LINKS = [
  { label: 'Public offer', to: '/offer' },
  { label: 'Privacy policy', to: '/privacy' },
  { label: 'Terms of use', to: '/terms' },
];

// Only the Telegram link is real, the rest are placeholders.
const SOCIALS = [
  { label: 'Telegram', href: 'https://t.me/pureglorybrand', Icon: TelegramIcon },
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
  { label: 'TikTok', href: '#', Icon: TikTokIcon },
  { label: 'Email', href: '#', Icon: EmailIcon },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div>
      <div className="eyebrow mb-5" style={{ color: 'var(--text-inverse-muted)' }}>
        {title}
      </div>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {links.map((link) => (
          <li key={link.label}>
            {link.to.startsWith('/') ? (
              <Link to={link.to} className="footer-link">
                {link.label}
              </Link>
            ) : (
              <a href={link.to} className="footer-link">
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      data-dark-zone
      style={{
        background: 'var(--surface-inverse)',
        color: 'var(--text-inverse)',
        padding: 'var(--space-9) var(--space-gutter) var(--space-6)',
      }}
    >
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div
          className="grid gap-12 pb-14 lg:grid-cols-[1.2fr_1fr]"
          style={{ borderBottom: '1px solid var(--border-hairline-inverse)' }}
        >
          <div>
            <div className="font-display" style={{ fontSize: 'var(--fs-display-m)' }}>
              Pure Glory
            </div>
            <p
              className="mt-4 max-w-sm"
              style={{
                color: 'var(--text-inverse-muted)',
                fontSize: 'var(--fs-small)',
                lineHeight: 'var(--lh-body)',
              }}
            >
              One person, not a company. Clothes designed, sewn and finished
              by hand. Most of them exist as a single piece.
            </p>
          </div>
          <div className="lg:max-w-md lg:justify-self-end lg:self-end lg:w-full">
            <div className="eyebrow mb-3" style={{ color: 'var(--text-inverse-muted)' }}>
              Updates by email
            </div>
            <NewsletterInput tone="inverse" />
          </div>
        </div>

        <div className="grid gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Pure Glory" links={BRAND_LINKS} />
          <FooterColumn title="Orders" links={CUSTOMER_LINKS} />

          <div>
            <div className="eyebrow mb-5" style={{ color: 'var(--text-inverse-muted)' }}>
              Contact
            </div>
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="social-icon"
                  aria-label={label}
                  title={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
            <p
              className="mt-5 max-w-[26ch]"
              style={{
                fontSize: 'var(--fs-micro)',
                color: 'var(--text-inverse-muted)',
                letterSpacing: 'var(--ls-nav)',
                lineHeight: 'var(--lh-tight)',
              }}
            >
              I usually reply within a day. Telegram is the fastest.
            </p>
          </div>

          <FooterColumn title="Legal" links={DOCUMENT_LINKS} />
        </div>

        <div
          className="mt-16 flex flex-wrap items-center justify-between gap-3 pt-6"
          style={{
            borderTop: '1px solid var(--border-hairline-inverse)',
            color: 'var(--text-inverse-muted)',
            fontSize: 'var(--fs-micro)',
            letterSpacing: 'var(--ls-nav)',
          }}
        >
          <span>© {new Date().getFullYear()} Pure Glory</span>
          <span className="eyebrow">Concept showcase — not an official store</span>
        </div>
      </div>
    </footer>
  );
}
