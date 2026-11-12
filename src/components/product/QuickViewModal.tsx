import { useEffect, useState } from 'react';
import { Modal } from '../ui/Modal';
import { ProductGallery } from './ProductGallery';
import { PurchasePanel } from './PurchasePanel';
import { useUI } from '../../store/UIContext';
import { productImages } from '../../data/products';

export function QuickViewModal() {
  const { quickView, closeQuickView } = useUI();
  // keep the last product around so the content doesn't vanish during the close animation
  const [product, setProduct] = useState(quickView);

  useEffect(() => {
    if (quickView) setProduct(quickView);
  }, [quickView]);

  if (!product) return null;

  return (
    <Modal open={!!quickView} onClose={closeQuickView}>
      <div className="grid md:grid-cols-[1.1fr_1fr]">
        <ProductGallery
          images={productImages(product)}
          alt={product.title}
          className="min-w-0"
        />
        <div className="p-6 md:p-10">
          <PurchasePanel
            product={product}
            onAfterAdd={closeQuickView}
            onNavigate={closeQuickView}
            linkToPage
          />
        </div>
      </div>
    </Modal>
  );
}
