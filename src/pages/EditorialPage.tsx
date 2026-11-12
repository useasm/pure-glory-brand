import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Reveal } from '../components/ui/Reveal';

interface EditorialPageProps {
  title: string;
  eyebrow: string;
  paragraphs: string[];
  image: string;
}

/** Long-read layout shared by the Journal and About pages. */
export function EditorialPage({ title, eyebrow, paragraphs, image }: EditorialPageProps) {
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
        </section>

        <Reveal variant="image">
          <div
            className="pg-grain aspect-[16/7] bg-cover bg-center"
            style={{ backgroundImage: `url('${image}')` }}
          />
        </Reveal>

        <section
          className="flex flex-col gap-5"
          style={{ maxWidth: 'var(--container-narrow)', padding: 'var(--space-6) 0 var(--space-8)' }}
        >
          {paragraphs.map((text, i) => (
            <Reveal key={i} delay={i * 80}>
              <p
                className="m-0"
                style={{
                  fontSize: 'var(--fs-body-l)',
                  lineHeight: 'var(--lh-body)',
                  color: 'var(--text-secondary)',
                }}
              >
                {text}
              </p>
            </Reveal>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
