import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from './store/CartContext';
import { WishlistProvider } from './store/WishlistContext';
import { AuthProvider } from './store/AuthContext';
import { UIProvider } from './store/UIContext';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductPage } from './pages/ProductPage';
import { EditorialPage } from './pages/EditorialPage';
import { AdminPage } from './pages/admin/AdminPage';
import { HistoryPage } from './pages/info/HistoryPage';
import { ContactsPage } from './pages/info/ContactsPage';
import { DeliveryPage } from './pages/info/DeliveryPage';
import { CarePage } from './pages/info/CarePage';
import { SizeGuidePage } from './pages/info/SizeGuidePage';
import {
  LegalPage,
  OFFER_SECTIONS,
  PRIVACY_SECTIONS,
  TERMS_SECTIONS,
} from './pages/info/LegalPage';
import { CartDrawer } from './components/overlays/CartDrawer';
import { WishlistDrawer } from './components/overlays/WishlistDrawer';
import { AccountDrawer } from './components/overlays/AccountDrawer';
import { SearchOverlay } from './components/overlays/SearchOverlay';
import { QuickViewModal } from './components/product/QuickViewModal';

// Fades the page in on route change and scrolls to top. The class is dropped
// once the animation ends: a running opacity animation on an ancestor breaks
// backdrop-filter on the fixed header in Chromium.
function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setSettled(false);
  }, [location.pathname]);

  return (
    <div
      key={location.pathname}
      className={settled ? undefined : 'anim-fade'}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && e.animationName === 'pg-fade') {
          setSettled(true);
        }
      }}
    >
      {children}
    </div>
  );
}

function AppRoutes() {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collections/:slug" element={<CollectionPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route
          path="/journal"
          element={
            <EditorialPage
              title="Journal"
              eyebrow="Notes from the workshop"
              image="/assets/imagery/wear-kanji-brush.jpg"
              paragraphs={[
                'Notes from the workshop. How a piece gets made, why there is only ever one of it or a handful, and what happens to it before it shows up here.',
                'I write about technique: paint, embroidery, foil. And about what goes wrong along the way. No gloss, no press releases.',
                'First entries are in the works. Leave your email in the footer, or just follow the Telegram channel.',
              ]}
            />
          }
        />
        <Route
          path="/about"
          element={
            <EditorialPage
              title="About"
              eyebrow="A designer and a tailor, not a brand"
              image="/assets/imagery/painting-downpour.jpg"
              paragraphs={[
                'Pure Glory is not a company. It is one person with a sewing machine, some paint and a Telegram channel. I design the pieces, sew them and finish them by hand.',
                'Most things exist as a single piece. Some I make to order: you tell me what you want, I work out how it should look.',
                'The look of this place comes from one painting, “Downpour Without an Umbrella or Your Eyes”: warm concrete, rain on fabric, paint put on by hand. I don\'t do restocks. When a piece is gone, it\'s gone.',
              ]}
            />
          }
        />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/care" element={<CarePage />} />
        <Route path="/size-guide" element={<SizeGuidePage />} />
        <Route
          path="/offer"
          element={
            <LegalPage title="Public Offer" updated="July 13, 2026" sections={OFFER_SECTIONS} />
          }
        />
        <Route
          path="/privacy"
          element={
            <LegalPage
              title="Privacy Policy"
              updated="July 13, 2026"
              sections={PRIVACY_SECTIONS}
            />
          }
        />
        <Route
          path="/terms"
          element={
            <LegalPage
              title="Terms of Use"
              updated="July 13, 2026"
              sections={TERMS_SECTIONS}
            />
          }
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </PageTransition>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <UIProvider>
              <AppRoutes />
              <CartDrawer />
              <WishlistDrawer />
              <AccountDrawer />
              <SearchOverlay />
              <QuickViewModal />
            </UIProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
