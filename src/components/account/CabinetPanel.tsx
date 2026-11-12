import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Tag } from '../ui/Tag';
import { EmptyState } from '../ui/EmptyState';
import { useAuth } from '../../store/AuthContext';
import { useWishlist } from '../../store/WishlistContext';
import { useUI } from '../../store/UIContext';
import { getProduct } from '../../data/products';
import { orders, ORDER_STATUS_LABELS } from '../../data/orders';
import { formatPrice } from '../../lib/format';

type Section =
  | 'menu'
  | 'profile'
  | 'orders'
  | 'addresses'
  | 'wishlist'
  | 'settings'
  | 'security'
  | 'balance'
  | 'coupons';

const MENU: { key: Section; label: string; hint?: string }[] = [
  { key: 'profile', label: 'Profile' },
  { key: 'orders', label: 'Order history' },
  { key: 'addresses', label: 'Addresses' },
  { key: 'wishlist', label: 'Saved' },
  { key: 'balance', label: 'Balance & bonuses' },
  { key: 'coupons', label: 'Coupons' },
  { key: 'settings', label: 'Settings' },
  { key: 'security', label: 'Security' },
];

export function CabinetPanel({ onClose }: { onClose: () => void }) {
  const { user, logout } = useAuth();
  const wishlist = useWishlist();
  const { openQuickView } = useUI();
  const [section, setSection] = useState<Section>('menu');

  if (!user) return null;

  const back = (
    <button
      className="eyebrow mb-6 cursor-pointer border-none bg-transparent p-0"
      style={{ color: 'var(--text-muted)' }}
      onClick={() => setSection('menu')}
    >
      ← Menu
    </button>
  );

  const sectionTitle = (title: string) => (
    <div className="font-display mb-5" style={{ fontSize: 'var(--fs-heading-l)' }}>
      {title}
    </div>
  );

  if (section === 'menu') {
    return (
      <div className="anim-fade-up flex h-full flex-col">
        <div className="mb-7">
          <div className="font-display" style={{ fontSize: 'var(--fs-display-m)' }}>
            {user.name}
          </div>
          <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}>
            {user.email}
          </div>
          <div className="mt-3 flex gap-2">
            {user.isAdmin && <Tag variant="accent">ADMIN</Tag>}
            <Tag variant="outline">{formatPrice(user.balance)} balance</Tag>
          </div>
        </div>

        <nav className="flex flex-col">
          {MENU.map((item, i) => (
            <button
              key={item.key}
              className="anim-fade-up flex cursor-pointer items-center justify-between border-none bg-transparent px-0 py-3.5 text-left"
              style={{
                borderBottom: '1px solid var(--border-hairline)',
                fontSize: 'var(--fs-body)',
                animationDelay: `${i * 40}ms`,
                transition: 'color var(--dur-fast) var(--ease-editorial)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--pg-oxblood)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--pg-ink)')}
              onClick={() => setSection(item.key)}
            >
              <span>{item.label}</span>
              <span aria-hidden style={{ color: 'var(--text-muted)' }}>→</span>
            </button>
          ))}
        </nav>

        {user.isAdmin && (
          <Link to="/admin" onClick={onClose} className="mt-7 no-underline">
            <Button variant="primary" className="w-full">
              Admin Panel →
            </Button>
          </Link>
        )}

        <button
          className="eyebrow mt-8 cursor-pointer self-start border-none bg-transparent p-0"
          style={{ color: 'var(--text-muted)' }}
          onClick={logout}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="anim-fade-up" key={section}>
      {back}

      {section === 'profile' && (
        <>
          {sectionTitle('Profile')}
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <Input label="Name" defaultValue={user.name} />
            <Input label="Email" type="email" defaultValue={user.email} />
            <Input label="Phone" type="tel" placeholder="+7 ___ ___-__-__" />
            <Button variant="secondary" size="s" type="submit" className="self-start">
              Save
            </Button>
          </form>
        </>
      )}

      {section === 'orders' && (
        <>
          {sectionTitle('Order history')}
          <ul className="m-0 flex list-none flex-col gap-5 p-0">
            {orders.slice(0, 3).map((order) => (
              <li
                key={order.id}
                className="flex flex-col gap-2 p-4"
                style={{ border: '1px solid var(--border-hairline)' }}
              >
                <div className="flex items-center justify-between">
                  <span style={{ fontWeight: 500, fontSize: 'var(--fs-small)' }}>
                    {order.id}
                  </span>
                  <Tag variant={order.status === 'delivered' ? 'solid' : 'outline'}>
                    {ORDER_STATUS_LABELS[order.status]}
                  </Tag>
                </div>
                <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>
                  {order.items.map((i) => `${i.title} (${i.size})`).join(', ')}
                </div>
                <div className="flex items-center justify-between" style={{ fontSize: 'var(--fs-small)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>
                    {new Date(order.date).toLocaleDateString('en-GB')}
                  </span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {section === 'addresses' && (
        <>
          {sectionTitle('Addresses')}
          <div
            className="mb-5 p-4"
            style={{ border: '1px solid var(--border-hairline)', fontSize: 'var(--fs-small)' }}
          >
            <div style={{ fontWeight: 500 }}>Home</div>
            <div style={{ color: 'var(--text-secondary)' }}>
              Moscow, Khlebny Lane 4, apt. 12
            </div>
          </div>
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <Input label="New address" placeholder="City, street, building" />
            <Button variant="secondary" size="s" className="self-start" type="submit">
              Add address
            </Button>
          </form>
        </>
      )}

      {section === 'wishlist' && (
        <>
          {sectionTitle('Saved')}
          {wishlist.ids.length === 0 ? (
            <EmptyState title="Empty" text="Tap the heart on anything in the catalog to keep it here." />
          ) : (
            <ul className="m-0 flex list-none flex-col gap-4 p-0">
              {wishlist.ids.map((id) => {
                const p = getProduct(id);
                if (!p) return null;
                return (
                  <li key={id} className="flex items-center gap-4">
                    <button
                      className="h-16 w-12 shrink-0 cursor-pointer border-none bg-cover bg-center p-0"
                      style={{ backgroundImage: `url('${p.image}')` }}
                      onClick={() => openQuickView(p)}
                      aria-label={p.title}
                    />
                    <span className="font-display flex-1" style={{ fontSize: 'var(--fs-heading-m)' }}>
                      {p.title}
                    </span>
                    <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>
                      {formatPrice(p.price)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}

      {section === 'balance' && (
        <>
          {sectionTitle('Balance & bonuses')}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4" style={{ border: '1px solid var(--border-hairline)' }}>
              <div className="eyebrow mb-2" style={{ color: 'var(--text-muted)' }}>
                Balance
              </div>
              <div className="font-display" style={{ fontSize: 'var(--fs-heading-l)' }}>
                {formatPrice(user.balance)}
              </div>
            </div>
            <div className="p-4" style={{ border: '1px solid var(--border-hairline)' }}>
              <div className="eyebrow mb-2" style={{ color: 'var(--text-muted)' }}>
                Bonuses
              </div>
              <div className="font-display" style={{ fontSize: 'var(--fs-heading-l)' }}>
                {user.bonuses}
              </div>
            </div>
          </div>
          <p className="mt-4" style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>
            Bonuses cover up to 20% of an order. 1 bonus = 1 ₽.
          </p>
        </>
      )}

      {section === 'coupons' && (
        <>
          {sectionTitle('Coupons')}
          <div className="flex flex-col gap-4">
            {[
              { code: 'PURE10', text: '10% off any order' },
              { code: 'GLORY15', text: '15% off the second piece in an order' },
            ].map((c) => (
              <div
                key={c.code}
                className="flex items-center justify-between p-4"
                style={{ border: '1px dashed var(--border-hairline-strong)' }}
              >
                <div>
                  <div style={{ fontWeight: 500, letterSpacing: 'var(--ls-eyebrow)' }}>
                    {c.code}
                  </div>
                  <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>
                    {c.text}
                  </div>
                </div>
                <Tag variant="accent">Active</Tag>
              </div>
            ))}
          </div>
        </>
      )}

      {section === 'settings' && (
        <>
          {sectionTitle('Settings')}
          <div className="flex flex-col gap-4" style={{ fontSize: 'var(--fs-small)' }}>
            {[
              'Emails about new work',
              'Order status by SMS',
              'Early access to new pieces',
            ].map((label, i) => (
              <label key={label} className="flex cursor-pointer items-center justify-between gap-4">
                <span>{label}</span>
                <input type="checkbox" defaultChecked={i !== 1} />
              </label>
            ))}
          </div>
        </>
      )}

      {section === 'security' && (
        <>
          {sectionTitle('Security')}
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <Input label="Current password" type="password" placeholder="••••••••" />
            <Input label="New password" type="password" placeholder="at least 8 characters" />
            <Input label="Repeat password" type="password" placeholder="once more" />
            <Button variant="secondary" size="s" className="self-start" type="submit">
              Update password
            </Button>
          </form>
          <p className="mt-5" style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-muted)' }}>
            Last sign-in: today, Moscow.
          </p>
        </>
      )}
    </div>
  );
}
