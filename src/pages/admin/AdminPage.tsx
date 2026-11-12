import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { useUI } from '../../store/UIContext';
import { useSimulatedLoading } from '../../lib/hooks';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import {
  DashboardSection,
  OrdersSection,
  ProductsSection,
  CollectionsSection,
  UsersSection,
  InventorySection,
  PreordersSection,
  MessagesSection,
  AnalyticsSection,
  SettingsSection,
} from '../../components/admin/sections';

type AdminSection =
  | 'dashboard'
  | 'orders'
  | 'products'
  | 'collections'
  | 'users'
  | 'inventory'
  | 'preorders'
  | 'messages'
  | 'analytics'
  | 'settings';

const NAV: { key: AdminSection; label: string }[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'orders', label: 'Orders' },
  { key: 'products', label: 'Products' },
  { key: 'collections', label: 'Collections' },
  { key: 'users', label: 'Users' },
  { key: 'inventory', label: 'Inventory' },
  { key: 'preorders', label: 'Pre-orders' },
  { key: 'messages', label: 'Messages' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'settings', label: 'Settings' },
];

const SECTIONS: Record<AdminSection, React.ComponentType> = {
  dashboard: DashboardSection,
  orders: OrdersSection,
  products: ProductsSection,
  collections: CollectionsSection,
  users: UsersSection,
  inventory: InventorySection,
  preorders: PreordersSection,
  messages: MessagesSection,
  analytics: AnalyticsSection,
  settings: SettingsSection,
};

export function AdminPage() {
  const { user, logout } = useAuth();
  const { openOverlay } = useUI();
  const [section, setSection] = useState<AdminSection>('dashboard');
  const loading = useSimulatedLoading([section], 350);

  if (!user?.isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <EmptyState
          title="Admins only"
          text="Sign in with an email starting with admin@ to open the panel."
          action={
            <div className="flex flex-col items-center gap-3">
              <Button variant="primary" onClick={() => openOverlay('account')}>
                Sign in
              </Button>
              <Link to="/" className="no-underline">
                <Button variant="ghost">Back to the store →</Button>
              </Link>
            </div>
          }
        />
      </main>
    );
  }

  const Section = SECTIONS[section];

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside
        className="flex shrink-0 flex-col lg:min-h-screen lg:w-60"
        style={{
          background: 'var(--surface-inverse)',
          color: 'var(--text-inverse)',
          padding: 'var(--space-6) var(--space-5)',
        }}
      >
        <Link
          to="/"
          className="font-display no-underline"
          style={{ fontSize: 22, color: 'var(--text-inverse)' }}
        >
          Pure Glory
        </Link>
        <div className="eyebrow mt-1" style={{ color: 'var(--text-inverse-muted)' }}>
          Admin Panel
        </div>

        <nav className="mt-8 flex flex-row flex-wrap gap-1 lg:flex-col">
          {NAV.map((item) => {
            const active = section === item.key;
            return (
              <button
                key={item.key}
                className="cursor-pointer border-none bg-transparent px-3 py-2 text-left"
                style={{
                  fontSize: 'var(--fs-small)',
                  letterSpacing: 'var(--ls-nav)',
                  color: active ? 'var(--pg-ink)' : 'var(--text-inverse-muted)',
                  background: active ? 'var(--pg-ivory)' : 'transparent',
                  transition:
                    'background-color var(--dur-fast) var(--ease-editorial), color var(--dur-fast) var(--ease-editorial)',
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = 'var(--text-inverse)';
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = 'var(--text-inverse-muted)';
                }}
                onClick={() => setSection(item.key)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto hidden flex-col gap-2 pt-10 lg:flex">
          <div style={{ fontSize: 'var(--fs-small)' }}>{user.name}</div>
          <div style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-inverse-muted)' }}>
            {user.email}
          </div>
          <button
            className="eyebrow mt-2 cursor-pointer self-start border-none bg-transparent p-0"
            style={{ color: 'var(--text-inverse-muted)' }}
            onClick={logout}
          >
            Sign out
          </button>
        </div>
      </aside>

      <main
        className="flex-1"
        style={{ background: 'var(--surface-bg)', padding: 'var(--space-6) var(--space-gutter)' }}
      >
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="font-display m-0" style={{ fontSize: 'var(--fs-display-m)', fontWeight: 400 }}>
            {NAV.find((n) => n.key === section)?.label}
          </h1>
          <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}>
            {new Date().toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        {loading ? (
          <div className="anim-fade flex flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
            <Skeleton className="h-56" />
            <Skeleton className="h-40" />
          </div>
        ) : (
          <div className="anim-fade-up" key={section}>
            {section === 'dashboard' ? (
              <DashboardSection onNavigate={(s) => setSection(s as AdminSection)} />
            ) : (
              <Section />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
