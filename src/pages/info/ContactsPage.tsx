import { useState, type FormEvent } from 'react';
import { InfoPage } from './InfoPage';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import {
  TelegramIcon,
  InstagramIcon,
  TikTokIcon,
  EmailIcon,
} from '../../components/ui/SocialIcons';

// Only Telegram is real, the rest are placeholders.
const CHANNELS = [
  { label: 'Telegram', handle: '@pureglorybrand', href: 'https://t.me/pureglorybrand', Icon: TelegramIcon },
  { label: 'Instagram', handle: 'not yet', href: '#', Icon: InstagramIcon },
  { label: 'TikTok', handle: 'not yet', href: '#', Icon: TikTokIcon },
  { label: 'Email', handle: 'hello@example.com', href: '#', Icon: EmailIcon },
];

export function ContactsPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true); // nothing is actually sent, there is no backend
  };

  return (
    <InfoPage
      title="Contacts"
      eyebrow="Pure Glory"
      lead="It is just me here, so I answer myself. No support team, no scripts."
      narrow={false}
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <Reveal>
            <div
              className="flex flex-col items-start gap-4 p-6"
              data-dark-zone
              style={{ background: 'var(--surface-inverse)', color: 'var(--text-inverse)' }}
            >
              <div className="eyebrow" style={{ color: 'var(--text-inverse-muted)' }}>
                Fastest way to reach me
              </div>
              <div className="font-display" style={{ fontSize: 'var(--fs-display-m)' }}>
                Telegram
              </div>
              <p
                className="m-0 max-w-[40ch]"
                style={{ color: 'var(--text-inverse-muted)', fontSize: 'var(--fs-small)' }}
              >
                I reply within a day. Stock, measurements, custom orders: all
                of it goes here.
              </p>
              <a href="https://t.me/pureglorybrand" className="no-underline">
                <Button
                  variant="secondary"
                  style={{
                    color: 'var(--pg-ivory)',
                    borderColor: 'var(--border-hairline-inverse)',
                  }}
                >
                  Message on Telegram →
                </Button>
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ul className="m-0 flex list-none flex-col p-0">
              {CHANNELS.map(({ label, handle, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-5 py-4 no-underline"
                    style={{
                      borderBottom: '1px solid var(--border-hairline)',
                      color: 'var(--text-primary)',
                      transition: 'color var(--dur-fast) var(--ease-editorial)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--pg-oxblood)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--pg-ink)')}
                  >
                    <span
                      className="flex h-11 w-11 items-center justify-center"
                      style={{ border: '1px solid var(--border-hairline-strong)' }}
                    >
                      <Icon />
                    </span>
                    <span className="flex-1">
                      <span className="block" style={{ fontSize: 'var(--fs-body)' }}>
                        {label}
                      </span>
                      <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}>
                        {handle}
                      </span>
                    </span>
                    <span aria-hidden style={{ color: 'var(--text-muted)' }}>→</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div
            className="p-6 md:p-8"
            style={{ border: '1px solid var(--border-hairline)', background: 'var(--surface-card)' }}
          >
            <div className="font-display mb-2" style={{ fontSize: 'var(--fs-heading-l)' }}>
              Write to me
            </div>
            <p className="m-0 mb-6" style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>
              I’ll reply by email within 1–2 days.
            </p>

            {sent ? (
              <div
                className="anim-fade p-5"
                style={{ border: '1px solid var(--border-hairline-strong)', fontSize: 'var(--fs-body)' }}
              >
                Message sent. Thank you, I’ll get back to you soon.
              </div>
            ) : (
              <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                <Input name="name" label="Name" placeholder="What should I call you" required />
                <Input name="email" type="email" label="Email" placeholder="you@domain.com" required />
                <label className="flex flex-col gap-2">
                  <span className="eyebrow" style={{ color: 'var(--text-muted)' }}>
                    Message
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="A question about a piece, a custom order, a collab…"
                    className="input-underline resize-y"
                  />
                </label>
                <Button variant="primary" type="submit" className="self-start">
                  Send
                </Button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </InfoPage>
  );
}
