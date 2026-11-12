import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ProductCard, FeatureCard } from '../components/product/ProductCard';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { collections } from '../data/collections';
import { products } from '../data/products';

export function HomePage() {
  const featured = collections.slice(0, 3);
  const latest = products.filter((p) => p.status === 'available').slice(0, 3);

  return (
    <>
      {/* the header stays outside the hero: pg-grain creates a stacking context that would trap it */}
      <Header theme="dark" />

      <section data-dark-zone className="pg-grain relative min-h-[92vh]">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: "url('/assets/imagery/painting-downpour.jpg')",
            backgroundPosition: 'center 30%',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, oklch(0.17 0.008 50 / 0.3) 0%, transparent 35%, oklch(0.17 0.008 50 / 0.82) 100%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ padding: '0 var(--space-gutter) var(--space-8)', color: 'var(--pg-ivory)' }}
        >
          <div className="anim-fade-up eyebrow mb-4" style={{ opacity: 0.85 }}>
            A designer and a tailor, not a brand
          </div>
          <h1
            className="font-display anim-fade-up m-0"
            style={{
              fontSize: 'var(--fs-display-xl)',
              fontWeight: 400,
              maxWidth: '14ch',
              animationDelay: '120ms',
            }}
          >
            Downpour without an umbrella or your eyes
          </h1>
          <div className="anim-fade-up mt-7 flex flex-wrap gap-4" style={{ animationDelay: '260ms' }}>
            <Link to="/catalog" className="no-underline">
              <Button variant="primary">Browse the catalog</Button>
            </Link>
            <Link to="/collections" className="no-underline">
              <Button
                variant="secondary"
                style={{
                  color: 'var(--pg-ivory)',
                  borderColor: 'var(--border-hairline-inverse)',
                }}
              >
                Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <main
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '0 var(--space-gutter)',
        }}
      >
        <section style={{ padding: 'var(--space-section) 0' }}>
          <Reveal>
            <p
              className="font-display m-0"
              style={{ fontSize: 'var(--fs-display-m)', maxWidth: 'var(--container-narrow)' }}
            >
              I’m not a brand. I design a piece, sew it and finish it by hand:
              paint, embroidery, foil. Most of them exist exactly once.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="eyebrow mt-6" style={{ color: 'var(--text-muted)' }}>
              One of one, or made to order
            </div>
          </Reveal>
        </section>

        <section style={{ paddingBottom: 'var(--space-9)' }}>
          <Reveal>
            <div className="mb-7 flex items-baseline justify-between">
              <h2 className="font-display m-0" style={{ fontSize: 'var(--fs-display-m)', fontWeight: 400 }}>
                Collections
              </h2>
              <Link to="/collections" className="no-underline">
                <Button variant="ghost">All collections →</Button>
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {featured.map((c, i) => (
              <Reveal key={c.slug} delay={i * 120}>
                <FeatureCard
                  image={c.heroImage}
                  collectionLabel={`Collection ${c.number}`}
                  title={c.name}
                  to={`/collections/${c.slug}`}
                  minHeight={460}
                />
              </Reveal>
            ))}
          </div>
        </section>

        <section
          style={{
            borderTop: '1px solid var(--border-hairline)',
            padding: 'var(--space-8) 0 var(--space-9)',
          }}
        >
          <Reveal>
            <div className="mb-7 flex items-baseline justify-between">
              <h2 className="font-display m-0" style={{ fontSize: 'var(--fs-display-m)', fontWeight: 400 }}>
                In stock right now
              </h2>
              <Link to="/catalog" className="no-underline">
                <Button variant="ghost">To the catalog →</Button>
              </Link>
            </div>
          </Reveal>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
            style={{ gap: 'var(--grid-gap)', rowGap: 'var(--space-7)' }}
          >
            {latest.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
