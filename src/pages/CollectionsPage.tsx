import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { FeatureCard } from '../components/product/ProductCard';
import { Reveal } from '../components/ui/Reveal';
import { collections } from '../data/collections';
import { productsByCollection } from '../data/products';
import { plural } from '../lib/format';

export function CollectionsPage() {
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
        <section style={{ padding: 'var(--space-7) 0 var(--space-6)' }}>
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Collections' }]} />
          <h1
            className="font-display m-0 mt-5"
            style={{ fontSize: 'var(--fs-display-l)', fontWeight: 400 }}
          >
            Collections
          </h1>
          <p
            className="m-0 mt-3 max-w-xl"
            style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-body-l)' }}
          >
            Each collection is its own story, with its own technique and its
            own mood.
          </p>
        </section>

        <div className="grid gap-5 md:grid-cols-2">
          {collections.map((c, i) => {
            const count = productsByCollection(c.slug).length;
            return (
              <Reveal key={c.slug} delay={(i % 2) * 120}>
                <FeatureCard
                  image={c.heroImage}
                  collectionLabel={`Collection ${c.number} — ${count} ${plural(count, 'piece', 'pieces')}`}
                  title={c.name}
                  to={`/collections/${c.slug}`}
                  minHeight={480}
                />
              </Reveal>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
