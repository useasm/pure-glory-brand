import { useState } from 'react';
import { Tag } from '../ui/Tag';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Table, type Column } from './Table';
import { StatCard } from './StatCard';
import { SalesChart } from './SalesChart';
import { OrderModal } from './OrderModal';
import {
  Panel,
  DailySalesWidget,
  PopularProductsWidget,
  RecentUsersWidget,
  RecentReviewsWidget,
  LowStockWidget,
  PendingPreordersWidget,
  demoStock,
} from './widgets';
import { products } from '../../data/products';
import { collections } from '../../data/collections';
import {
  orders,
  ORDER_STATUS_LABELS,
  type Order,
  type OrderStatus,
} from '../../data/orders';
import { CATEGORY_LABELS } from '../../data/types';
import { METRIC_DETAILS } from '../../data/adminDemo';
import { formatPrice } from '../../lib/format';

export type AdminNavigate = (section: string) => void;

export function DashboardSection({ onNavigate }: { onNavigate?: AdminNavigate }) {
  const [openOrder, setOpenOrder] = useState<Order | null>(null);
  const revenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((s, o) => s + o.total, 0);

  const quickActions: { label: string; section: string }[] = [
    { label: 'Add product', section: 'products' },
    { label: 'New collection', section: 'collections' },
    { label: 'Add promo code', section: 'settings' },
    { label: 'View orders', section: 'orders' },
    { label: 'Manage users', section: 'users' },
    { label: 'Open messages', section: 'messages' },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Revenue, month"
          value={formatPrice(revenue)}
          delta="18%"
          details={METRIC_DETAILS.revenue}
        />
        <StatCard
          label="Orders"
          value={String(orders.length)}
          delta="6%"
          details={METRIC_DETAILS.orders}
          onClick={() => onNavigate?.('orders')}
        />
        <StatCard
          label="Users"
          value="214"
          delta="9%"
          details={METRIC_DETAILS.users}
          onClick={() => onNavigate?.('users')}
        />
        <StatCard
          label="New customers"
          value="11"
          delta="22%"
          details={METRIC_DETAILS.newClients}
        />
        <StatCard
          label="Pre-orders"
          value="7"
          delta="3%"
          details={METRIC_DETAILS.preorders}
          onClick={() => onNavigate?.('preorders')}
        />
        <StatCard
          label="Average order"
          value={formatPrice(Math.round(revenue / orders.length))}
          delta="4%"
          details={METRIC_DETAILS.avgCheck}
        />
        <StatCard
          label="Conversion"
          value="2,4%"
          delta="0.3 pp"
          details={METRIC_DETAILS.conversion}
        />
        <div
          className="p-5"
          style={{ border: '1px solid var(--border-hairline)', background: 'var(--surface-inverse)' }}
        >
          <div className="eyebrow mb-3" style={{ color: 'var(--text-inverse-muted)' }}>
            Quick actions
          </div>
          <div className="flex flex-col gap-1">
            {quickActions.map((a) => (
              <button
                key={a.label}
                className="cursor-pointer border-none bg-transparent px-0 py-1 text-left"
                style={{
                  fontSize: 'var(--fs-small)',
                  color: 'var(--text-inverse-muted)',
                  transition: 'color var(--dur-fast) var(--ease-editorial)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--pg-ivory)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--pg-smoke)')}
                onClick={() => onNavigate?.(a.section)}
              >
                {a.label} →
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <SalesChart />
        <DailySalesWidget />
      </div>

      <Panel
        title="Recent orders"
        action={
          <Button variant="ghost" onClick={() => onNavigate?.('orders')}>
            All orders →
          </Button>
        }
      >
        <OrdersTable rows={orders.slice(0, 4)} compact onOpen={setOpenOrder} />
      </Panel>

      <OrderModal order={openOrder} onClose={() => setOpenOrder(null)} />
    </div>
  );
}

function StatusSelect({ order }: { order: Order }) {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  return (
    <select
      className="cursor-pointer border-none bg-transparent outline-none"
      style={{
        fontSize: 'var(--fs-small)',
        borderBottom: '1px solid var(--border-hairline)',
        paddingBottom: 2,
        color: status === 'cancelled' ? 'var(--pg-oxblood)' : 'var(--text-primary)',
      }}
      value={status}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => setStatus(e.target.value as OrderStatus)}
    >
      {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

function OrdersTable({
  rows,
  compact = false,
  onOpen,
}: {
  rows: Order[];
  compact?: boolean;
  onOpen?: (order: Order) => void;
}) {
  const columns: Column<Order>[] = [
    { key: 'id', title: 'Order', render: (o) => <span style={{ fontWeight: 500 }}>{o.id}</span> },
    {
      key: 'date',
      title: 'Date',
      render: (o) => new Date(o.date).toLocaleDateString('en-GB'),
    },
    { key: 'customer', title: 'Customer', render: (o) => o.customer },
    ...(compact
      ? []
      : [
          {
            key: 'items',
            title: 'Items',
            render: (o: Order) =>
              o.items.map((i) => `${i.title} × ${i.qty}`).join(', '),
          } satisfies Column<Order>,
        ]),
    {
      key: 'payment',
      title: 'Payment',
      render: (o) => (
        <span style={{ color: o.status === 'new' ? 'var(--pg-oxblood)' : 'var(--text-secondary)' }}>
          {o.status === 'new' ? 'Pending' : o.status === 'cancelled' ? 'Refunded' : 'Paid'}
        </span>
      ),
    },
    {
      key: 'total',
      title: 'Total',
      align: 'right',
      render: (o) => formatPrice(o.total),
    },
    {
      key: 'status',
      title: 'Shipping',
      render: (o) =>
        compact ? (
          <Tag variant={o.status === 'delivered' ? 'solid' : 'outline'}>
            {ORDER_STATUS_LABELS[o.status]}
          </Tag>
        ) : (
          <StatusSelect order={o} />
        ),
    },
  ];
  return (
    <Table
      columns={columns}
      rows={rows}
      rowKey={(o) => o.id}
      onRowClick={onOpen ? (o) => onOpen(o) : undefined}
    />
  );
}

export function OrdersSection() {
  const [openOrder, setOpenOrder] = useState<Order | null>(null);
  return (
    <Panel title="Orders">
      <OrdersTable rows={orders} onOpen={setOpenOrder} />
      <OrderModal order={openOrder} onClose={() => setOpenOrder(null)} />
    </Panel>
  );
}

export function ProductsSection() {
  return (
    <Panel
      title="Products"
      action={<Button variant="secondary" size="s">Add product</Button>}
    >
      <Table
        rowKey={(p) => p.id}
        rows={products}
        rowActionLabel="Details"
        onRowClick={() => {}}
        columns={[
          {
            key: 'title',
            title: 'Name',
            render: (p) => (
              <span className="flex items-center gap-3">
                <span
                  className="h-10 w-8 shrink-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${p.image}')` }}
                />
                <span style={{ fontWeight: 500 }}>{p.title}</span>
              </span>
            ),
          },
          {
            key: 'category',
            title: 'Category',
            render: (p) => CATEGORY_LABELS[p.category],
          },
          {
            key: 'collection',
            title: 'Collection',
            render: (p) => collections.find((c) => c.slug === p.collectionSlug)?.name ?? '—',
          },
          {
            key: 'stock',
            title: 'Stock',
            align: 'right',
            render: (p) => {
              const stock = demoStock(p.id, p.status);
              return (
                <span style={{ color: stock === 0 ? 'var(--pg-oxblood)' : stock <= 2 ? 'var(--pg-gold-deep)' : 'inherit' }}>
                  {stock}
                </span>
              );
            },
          },
          { key: 'price', title: 'Price', align: 'right', render: (p) => formatPrice(p.price) },
          {
            key: 'status',
            title: 'Status',
            render: (p) => (
              <Tag
                variant={
                  p.status === 'sold-out' ? 'solid' : p.status === 'pre-order' ? 'accent' : 'outline'
                }
              >
                {p.status === 'available' ? 'In stock' : p.status === 'sold-out' ? 'SOLD OUT' : 'PRE-ORDER'}
              </Tag>
            ),
          },
        ]}
      />
    </Panel>
  );
}

export function CollectionsSection() {
  return (
    <Panel
      title="Collections"
      action={<Button variant="secondary" size="s">New collection</Button>}
    >
      <Table
        rowKey={(c) => c.slug}
        rows={collections}
        rowActionLabel="Open"
        onRowClick={() => {}}
        columns={[
          { key: 'number', title: '№', render: (c) => c.number },
          {
            key: 'name',
            title: 'Name',
            render: (c) => <span style={{ fontWeight: 500 }}>{c.name}</span>,
          },
          { key: 'subtitle', title: 'Subtitle', render: (c) => c.subtitle },
          {
            key: 'count',
            title: 'Pieces',
            align: 'right',
            render: (c) => products.filter((p) => p.collectionSlug === c.slug).length,
          },
        ]}
      />
    </Panel>
  );
}

const demoUsers = [
  { email: 'anna@example.com', name: 'Anna Severova', ordersCount: 3, spent: 72000 },
  { email: 'ilya@example.com', name: 'Ilya Granin', ordersCount: 2, spent: 30500 },
  { email: 'maria@example.com', name: 'Maria Klim', ordersCount: 1, spent: 28000 },
  { email: 'olga@example.com', name: 'Olga Ring', ordersCount: 4, spent: 96500 },
];

export function UsersSection() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total" value="214" details={METRIC_DETAILS.users} />
        <StatCard label="New this week" value="11" delta="22%" />
        <StatCard label="Active today" value="26" delta="8%" />
      </div>
      <Panel title="Users">
        <Table
          rowKey={(u) => u.email}
          rows={demoUsers}
          rowActionLabel="Profile"
          onRowClick={() => {}}
          columns={[
            { key: 'name', title: 'Name', render: (u) => <span style={{ fontWeight: 500 }}>{u.name}</span> },
            { key: 'email', title: 'Email', render: (u) => u.email },
            { key: 'orders', title: 'Orders', align: 'right', render: (u) => u.ordersCount },
            { key: 'spent', title: 'Total', align: 'right', render: (u) => formatPrice(u.spent) },
          ]}
        />
      </Panel>
      <RecentUsersWidget />
    </div>
  );
}

export function InventorySection() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="In stock" value={String(products.filter((p) => p.status === 'available').length)} />
        <StatCard label="Running low" value={String(products.filter((p) => demoStock(p.id, p.status) > 0 && demoStock(p.id, p.status) <= 2).length)} />
        <StatCard label="Sold out" value={String(products.filter((p) => p.status === 'sold-out').length)} />
        <StatCard label="Pre-order" value={String(products.filter((p) => p.status === 'pre-order').length)} />
      </div>
      <Panel title="Inventory">
        <Table
          rowKey={(p) => p.id}
          rows={products}
          columns={[
            { key: 'title', title: 'Product', render: (p) => p.title },
            { key: 'edition', title: 'Edition', render: (p) => p.edition },
            {
              key: 'left',
              title: 'Left',
              align: 'right',
              render: (p) => {
                const stock = demoStock(p.id, p.status);
                return (
                  <span style={{ color: stock === 0 ? 'var(--pg-oxblood)' : 'inherit' }}>
                    {stock}
                  </span>
                );
              },
            },
            {
              key: 'status',
              title: 'Status',
              render: (p) =>
                p.status === 'sold-out' ? (
                  <Tag variant="solid">SOLD OUT</Tag>
                ) : demoStock(p.id, p.status) <= 2 ? (
                  <Tag variant="accent">Running low</Tag>
                ) : (
                  <Tag variant="outline">In stock</Tag>
                ),
            },
          ]}
        />
      </Panel>
      <LowStockWidget />
    </div>
  );
}

export function PreordersSection() {
  const preorders = products.filter((p) => p.status === 'pre-order');
  return (
    <div className="flex flex-col gap-5">
      <Panel title="Pre-orders">
        <Table
          rowKey={(p) => p.id}
          rows={preorders}
          rowActionLabel="Open"
          onRowClick={() => {}}
          columns={[
            { key: 'title', title: 'Product', render: (p) => <span style={{ fontWeight: 500 }}>{p.title}</span> },
            { key: 'edition', title: 'Edition', render: (p) => p.edition },
            { key: 'queue', title: 'Queue', align: 'right', render: (p) => (p.id === 'p04' ? 4 : 2) },
            { key: 'price', title: 'Price', align: 'right', render: (p) => formatPrice(p.price) },
          ]}
        />
      </Panel>
      <PendingPreordersWidget />
    </div>
  );
}

const demoMessages = [
  {
    id: 'm1',
    from: 'anna@example.com',
    subject: 'Will “Isolation” ever come back?',
    date: 'Jul 11',
    unread: true,
  },
  {
    id: 'm2',
    from: 'press@example.com',
    subject: 'Request to shoot the collection',
    date: 'Jul 9',
    unread: true,
  },
  {
    id: 'm3',
    from: 'ilya@example.com',
    subject: 'Size swap for order PG-1041',
    date: 'Jul 8',
    unread: false,
  },
];

export function MessagesSection() {
  return (
    <Panel title="Messages">
      <ul className="m-0 flex list-none flex-col p-0">
        {demoMessages.map((m) => (
          <li
            key={m.id}
            className="flex cursor-pointer flex-wrap items-baseline gap-x-4 gap-y-1 px-2 py-4"
            style={{
              borderBottom: '1px solid var(--border-hairline)',
              transition: 'background-color var(--dur-fast) var(--ease-editorial)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--pg-bone)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            {m.unread && (
              <span
                aria-label="Unread"
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: 'var(--pg-oxblood)' }}
              />
            )}
            <span style={{ fontSize: 'var(--fs-small)', fontWeight: m.unread ? 500 : 400 }}>
              {m.from}
            </span>
            <span className="flex-1" style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>
              {m.subject}
            </span>
            <span style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-muted)' }}>{m.date}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function AnalyticsSection() {
  const byCollection = collections
    .map((c) => ({
      label: c.name,
      value: Math.round(
        products
          .filter((p) => p.collectionSlug === c.slug)
          .reduce((s, p) => s + p.price, 0) / 1000,
      ),
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 xl:grid-cols-2">
        <SalesChart />
        <DailySalesWidget />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <PopularProductsWidget />
        <BarListByCollection items={byCollection} />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <RecentUsersWidget />
        <RecentReviewsWidget />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <LowStockWidget />
        <PendingPreordersWidget />
      </div>
    </div>
  );
}

function BarListByCollection({ items }: { items: { label: string; value: number }[] }) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <Panel title="Collections by catalog value, k ₽">
      <div className="flex flex-col gap-3.5">
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center gap-4">
            <span
              className="w-40 shrink-0 truncate"
              style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}
            >
              {item.label}
            </span>
            <div className="h-4 flex-1">
              <div
                className="h-full"
                style={{
                  width: `${(item.value / max) * 100}%`,
                  background: i === 0 ? 'var(--pg-oxblood)' : 'var(--pg-ink)',
                  opacity: i === 0 ? 1 : 0.8,
                  animation: 'pg-fade var(--dur-base) var(--ease-editorial) both',
                  animationDelay: `${i * 70}ms`,
                }}
              />
            </div>
            <span className="w-14 text-right" style={{ fontSize: 'var(--fs-small)' }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function SettingsSection() {
  return (
    <Panel title="Store settings">
      <form
        className="flex max-w-md flex-col gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input label="Store name" defaultValue="Pure Glory" />
        <Input label="Order email" type="email" defaultValue="orders@example.com" />
        <Input label="Free shipping from" defaultValue="30,000 ₽" />
        <Input label="Promo codes (comma-separated)" defaultValue="PURE10, GLORY15" />
        <div className="flex flex-col gap-3" style={{ fontSize: 'var(--fs-small)' }}>
          {['Show sold-out pieces in the catalog', 'Accept pre-orders', 'Notify about new orders'].map(
            (label) => (
              <label key={label} className="flex cursor-pointer items-center justify-between gap-4">
                <span>{label}</span>
                <input type="checkbox" defaultChecked />
              </label>
            ),
          )}
        </div>
        <Button variant="primary" size="s" className="self-start" type="submit">
          Save settings
        </Button>
      </form>
    </Panel>
  );
}
