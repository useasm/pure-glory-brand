import { Navigate, useParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ProductGallery } from '../components/product/ProductGallery';
import { PurchasePanel } from '../components/product/PurchasePanel';
import { ProductCard } from '../components/product/ProductCard';
import { Reveal } from '../components/ui/Reveal';
import { products, productImages, productsByCollection } from '../data/products';
import { getCollection } from '../data/collections';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);

  if (!product) return <Navigate to="/catalog" replace />;

  const collection = getCollection(product.collectionSlug);
  const related = productsByCollection(product.collectionSlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

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
        <div style={{ padding: 'var(--space-5) 0' }}>
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Catalog', to: '/catalog' },
              ...(collection
                ? [{ label: collection.name, to: `/collections/${collection.slug}` }]
                : []),
              { label: product.title },
            ]}
          />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* keyed by id so the gallery remounts when navigating between products */}
          <ProductGallery
            key={product.id}
            images={productImages(product)}
            alt={product.title}
            thumbnails
            keyboardGlobal
            className="anim-fade min-w-0"
          />
          <div className="anim-fade-up lg:py-4">
            <PurchasePanel product={product} />
          </div>
        </div>

        {related.length > 0 && (
          <section
            className="mt-16"
            style={{
              borderTop: '1px solid var(--border-hairline)',
              paddingTop: 'var(--space-7)',
            }}
          >
            <Reveal>
              <div className="mb-7 flex items-baseline justify-between">
                <h2
                  className="font-display m-0"
                  style={{ fontSize: 'var(--fs-display-m)', fontWeight: 400 }}
                >
                  From the same collection
                </h2>
                {collection && (
                  <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}>
                    {collection.name}
                  </span>
                )}
              </div>
            </Reveal>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
              style={{ gap: 'var(--grid-gap)', rowGap: 'var(--space-7)' }}
            >
              {related.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 90}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
