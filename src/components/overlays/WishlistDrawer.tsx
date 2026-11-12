import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import { useWishlist } from '../../store/WishlistContext';
import { useCart } from '../../store/CartContext';
import { useUI } from '../../store/UIContext';
import { getProduct } from '../../data/products';
import { formatPrice } from '../../lib/format';

export function WishlistDrawer() {
  const wishlist = useWishlist();
  const cart = useCart();
  const { overlay, closeOverlay, openQuickView, openOverlay } = useUI();
  const open = overlay === 'wishlist';

  return (
    <Drawer
      open={open}
      onClose={closeOverlay}
      eyebrow="Saved"
      title={wishlist.ids.length ? 'Saved pieces' : 'Empty'}
    >
      {wishlist.ids.length === 0 ? (
        <EmptyState
          title="Nothing saved yet"
          text="Tap the heart on a piece and it will wait for you here."
          action={
            <Button variant="ghost" onClick={closeOverlay}>
              Browse the catalog →
            </Button>
          }
        />
      ) : (
        <ul className="m-0 flex list-none flex-col gap-6 p-0">
          {wishlist.ids.map((id) => {
            const product = getProduct(id);
            if (!product) return null;
            const soldOut = product.status === 'sold-out';
            return (
              <li key={id} className="anim-fade flex gap-4">
                <button
                  className="h-28 w-[84px] shrink-0 cursor-pointer border-none bg-cover bg-center p-0"
                  style={{ backgroundImage: `url('${product.image}')` }}
                  aria-label={product.title}
                  onClick={() => openQuickView(product)}
                />
                <div className="flex flex-1 flex-col gap-1">
                  <button
                    className="font-display cursor-pointer border-none bg-transparent p-0 text-left"
                    style={{ fontSize: 'var(--fs-heading-m)', color: 'var(--text-primary)' }}
                    onClick={() => openQuickView(product)}
                  >
                    {product.title}
                  </button>
                  <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>
                    {formatPrice(product.price)}
                  </div>
                  <div className="mt-auto">
                    <Button
                      variant="secondary"
                      size="s"
                      disabled={soldOut}
                      onClick={() => {
                        if (product.sizes.length === 1) {
                          cart.add(product.id, product.sizes[0]);
                          openOverlay('cart');
                        } else {
                          openQuickView(product); // size has to be picked first
                        }
                      }}
                    >
                      {soldOut ? 'Sold out' : 'Add to cart'}
                    </Button>
                  </div>
                </div>
                <button
                  aria-label="Remove from saved"
                  className="h-6 cursor-pointer self-start border-none bg-transparent"
                  style={{ color: 'var(--text-muted)' }}
                  onClick={() => wishlist.remove(id)}
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Drawer>
  );
}
