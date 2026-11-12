import { Navigate, useParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ProductCard, FeatureCard } from '../components/product/ProductCard';
import { Reveal } from '../components/ui/Reveal';
import { getCollection, collections } from '../data/collections';
import { productsByCollection } from '../data/products';
import { plural } from '../lib/format';

export function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const collection = slug ? getCollection(slug) : undefined;

  if (!collection) return <Navigate to="/collections" replace />;

  const items = productsByCollection(collection.slug);
  const others = collections.filter((c) => c.slug !== collection.slug).slice(0, 2);

  return (
    <>
      {/* the header stays outside the hero: pg-grain creates a stacking context that would trap it */}
      <Header theme="dark" />

      <section data-dark-zone className="pg-grain relative min-h-[82vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${collection.heroImage}')` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, oklch(0.17 0.008 50 / 0.35) 0%, transparent 30%, oklch(0.17 0.008 50 / 0.8) 100%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ padding: '0 var(--space-gutter) var(--space-8)', color: 'var(--pg-ivory)' }}
        >
          <div className="anim-fade-up eyebrow mb-4" style={{ opacity: 0.85 }}>
            Collection {collection.number}
          </div>
          <h1
            className="font-display anim-fade-up m-0"
            style={{
              fontSize: 'var(--fs-display-xl)',
              fontWeight: 400,
              maxWidth: '16ch',
              animationDelay: '120ms',
            }}
          >
            {collection.name}
          </h1>
          <p
            className="anim-fade-up m-0 mt-4"
            style={{
              fontSize: 'var(--fs-heading-s)',
              opacity: 0.85,
              animationDelay: '240ms',
            }}
          >
            {collection.subtitle}
          </p>
        </div>
      </section>

      <main
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '0 var(--space-gutter)',
        }}
      >
        <section style={{ padding: 'var(--space-7) 0' }}>
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Collections', to: '/collections' },
              { label: collection.name },
            ]}
          />
          <Reveal>
            <p
              className="font-display m-0"
              style={{
                fontSize: 'var(--fs-display-m)',
                maxWidth: 'var(--container-narrow)',
                marginTop: 'var(--space-6)',
              }}
            >
              {collection.description}
            </p>
          </Reveal>
        </section>

        <section
          className="flex flex-col"
          style={{ gap: 'var(--space-9)', padding: 'var(--space-6) 0 var(--space-9)' }}
        >
          {collection.story.map((paragraph, i) => {
            const image = collection.imagery[i % collection.imagery.length];
            const reversed = i % 2 === 1;
            return (
              <div
                key={i}
                className={`grid items-center gap-10 md:grid-cols-2 ${
                  reversed ? 'md:[direction:rtl]' : ''
                }`}
              >
                <Reveal variant="image" className="md:[direction:ltr]">
                  <div
                    className="pg-grain aspect-[4/5] bg-cover bg-center"
                    style={{ backgroundImage: `url('${image}')` }}
                  />
                </Reveal>
                <Reveal delay={150} className="md:[direction:ltr]">
                  <div className="eyebrow mb-4" style={{ color: 'var(--text-muted)' }}>
                    Part {String(i + 1).padStart(2, '0')}
                  </div>
                  <p
                    className="m-0"
                    style={{
                      fontSize: 'var(--fs-body-l)',
                      lineHeight: 'var(--lh-body)',
                      color: 'var(--text-secondary)',
                      maxWidth: '48ch',
                    }}
                  >
                    {paragraph}
                  </p>
                </Reveal>
              </div>
            );
          })}
        </section>

        <section
          style={{
            borderTop: '1px solid var(--border-hairline)',
            padding: 'var(--space-8) 0 var(--space-9)',
          }}
        >
          <Reveal>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display m-0" style={{ fontSize: 'var(--fs-display-m)', fontWeight: 400 }}>
                Pieces in this collection
              </h2>
              <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}>
                {items.length} {plural(items.length, 'piece', 'pieces')}
              </span>
            </div>
          </Reveal>
          <div
            className="grid grid-cols-1 pt-8 sm:grid-cols-2 xl:grid-cols-3"
            style={{ gap: 'var(--grid-gap)', rowGap: 'var(--space-7)' }}
          >
            {items.map((product, i) => (
              <Reveal key={product.id} delay={(i % 3) * 90}>
                <ProductCard product={product} />
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
            <div className="eyebrow mb-6" style={{ color: 'var(--text-muted)' }}>
              More collections
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {others.map((c, i) => (
              <Reveal key={c.slug} delay={i * 120}>
                <FeatureCard
                  image={c.heroImage}
                  collectionLabel={`Collection ${c.number}`}
                  title={c.name}
                  to={`/collections/${c.slug}`}
                />
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
