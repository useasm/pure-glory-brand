import type { ReactNode } from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { Reveal } from '../../components/ui/Reveal';

interface InfoPageProps {
  title: string;
  eyebrow: string;
  lead?: string;
  children: ReactNode;
  /** narrow text column (default) or full width for tables and grids */
  narrow?: boolean;
}

export function InfoPage({ title, eyebrow, lead, children, narrow = true }: InfoPageProps) {
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
        <section style={{ padding: 'var(--space-6) 0 var(--space-5)' }}>
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: title }]} />
          <div className="eyebrow mt-4" style={{ color: 'var(--text-muted)' }}>
            {eyebrow}
          </div>
          <h1
            className="font-display m-0 mt-2"
            style={{ fontSize: 'var(--fs-display-l)', fontWeight: 400 }}
          >
            {title}
          </h1>
          {lead && (
            <p
              className="m-0 mt-4 max-w-xl"
              style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-body-l)' }}
            >
              {lead}
            </p>
          )}
        </section>

        <div style={narrow ? { maxWidth: 'var(--container-narrow)' } : undefined}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

interface InfoSectionProps {
  index?: string;
  title: string;
  children: ReactNode;
}

export function InfoSection({ index, title, children }: InfoSectionProps) {
  return (
    <Reveal>
      <section
        className="grid gap-4 py-8 md:grid-cols-[180px_1fr]"
        style={{ borderTop: '1px solid var(--border-hairline)' }}
      >
        <div className="eyebrow" style={{ color: 'var(--text-muted)' }}>
          {index && <span className="mr-2">{index}</span>}
          {title}
        </div>
        <div
          className="flex flex-col gap-4"
          style={{
            fontSize: 'var(--fs-body)',
            lineHeight: 'var(--lh-body)',
            color: 'var(--text-secondary)',
          }}
        >
          {children}
        </div>
      </section>
    </Reveal>
  );
}
