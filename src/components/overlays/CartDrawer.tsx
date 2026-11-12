import { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { QtyStepper } from '../ui/QtyStepper';
import { EmptyState } from '../ui/EmptyState';
import { useCart } from '../../store/CartContext';
import { useUI } from '../../store/UIContext';
import { getProduct } from '../../data/products';
import { formatPrice, plural } from '../../lib/format';

export function CartDrawer() {
  const cart = useCart();
  const { overlay, closeOverlay } = useUI();
  const open = overlay === 'cart';

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);

  const applyPromo = () => {
    const ok = cart.applyPromo(promoInput);
    setPromoError(!ok);
    if (ok) setPromoInput('');
  };

  const row = (label: string, value: string, strong = false) => (
    <div
      className="flex items-baseline justify-between"
      style={{
        fontSize: strong ? 'var(--fs-body)' : 'var(--fs-small)',
        color: strong ? 'var(--text-primary)' : 'var(--text-secondary)',
        fontWeight: strong ? 500 : 400,
      }}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );

  return (
    <Drawer
      open={open}
      onClose={closeOverlay}
      eyebrow="Cart"
      title={
        cart.count
          ? `${cart.count} ${plural(cart.count, 'piece', 'pieces')}`
          : 'Empty'
      }
      footer={
        cart.items.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-3">
              <input
                className="input-underline flex-1"
                placeholder="Promo code (try PURE10)"
                value={promoInput}
                onChange={(e) => {
                  setPromoInput(e.target.value);
                  setPromoError(false);
                }}
                onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
              />
              <Button variant="secondary" size="s" onClick={applyPromo}>
                Apply
              </Button>
            </div>
            {promoError && (
              <div style={{ fontSize: 'var(--fs-micro)', color: 'var(--pg-oxblood)' }}>
                No such promo code
              </div>
            )}
            {cart.promo && (
              <div
                className="flex items-center justify-between"
                style={{ fontSize: 'var(--fs-small)', color: 'var(--pg-oxblood)' }}
              >
                <span>Promo code {cart.promo} applied</span>
                <button
                  className="cursor-pointer border-none bg-transparent underline"
                  style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-micro)' }}
                  onClick={cart.clearPromo}
                >
                  remove
                </button>
              </div>
            )}

            <div
              className="flex flex-col gap-2 pt-3"
              style={{ borderTop: '1px solid var(--border-hairline)' }}
            >
              {row('Subtotal', formatPrice(cart.subtotal))}
              {cart.discount > 0 && row('Discount', `− ${formatPrice(cart.discount)}`)}
              {row(
                'Shipping',
                cart.shipping === 0 ? 'Free' : formatPrice(cart.shipping),
              )}
              {row('Total', formatPrice(cart.total), true)}
            </div>

            <Button
              variant="primary"
              onClick={() => {
                setCheckoutDone(true);
                setTimeout(() => {
                  cart.clear();
                  setCheckoutDone(false);
                  closeOverlay();
                }, 1200);
              }}
            >
              {checkoutDone ? 'Order placed ✓' : 'Place order'}
            </Button>
          </div>
        ) : undefined
      }
    >
      {cart.items.length === 0 ? (
        <EmptyState
          title="Nothing in here"
          text="Pick something from the catalog. Most pieces exist only once."
          action={
            <Button variant="ghost" onClick={closeOverlay}>
              Go to the catalog →
            </Button>
          }
        />
      ) : (
        <ul className="m-0 flex list-none flex-col gap-6 p-0">
          {cart.items.map((item) => {
            const product = getProduct(item.productId);
            if (!product) return null;
            return (
              <li
                key={`${item.productId}-${item.size}`}
                className="anim-fade flex gap-4"
              >
                <div
                  className="h-28 w-[84px] shrink-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
                <div className="flex flex-1 flex-col gap-1">
                  <div className="font-display" style={{ fontSize: 'var(--fs-heading-m)' }}>
                    {product.title}
                  </div>
                  <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}>
                    Size {item.size}
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <QtyStepper
                      value={item.qty}
                      onChange={(q) => cart.setQty(item.productId, item.size, q)}
                    />
                    <span style={{ fontSize: 'var(--fs-small)' }}>
                      {formatPrice(product.price * item.qty)}
                    </span>
                  </div>
                </div>
                <button
                  aria-label="Remove"
                  className="h-6 cursor-pointer self-start border-none bg-transparent"
                  style={{ color: 'var(--text-muted)' }}
                  onClick={() => cart.remove(item.productId, item.size)}
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
