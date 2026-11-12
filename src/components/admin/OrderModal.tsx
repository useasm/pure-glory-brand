import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Tag } from '../ui/Tag';
import { Button } from '../ui/Button';
import { formatPrice } from '../../lib/format';
import {
  ORDER_STATUS_LABELS,
  type Order,
  type OrderStatus,
} from '../../data/orders';

const PAYMENT_LABEL = (s: OrderStatus) =>
  s === 'new' ? 'Awaiting payment' : s === 'cancelled' ? 'Refunded' : 'Paid';

interface OrderModalProps {
  order: Order | null;
  onClose: () => void;
}

export function OrderModal({ order, onClose }: OrderModalProps) {
  const [status, setStatus] = useState<OrderStatus | null>(null);
  // keep the last order around for the close animation
  const [current, setCurrent] = useState<Order | null>(order);
  if (order && order !== current) {
    setCurrent(order);
    setStatus(null);
  }
  if (!current) return null;

  const effectiveStatus = status ?? current.status;

  const row = (label: string, value: React.ReactNode) => (
    <div
      className="flex items-baseline justify-between gap-6 py-3"
      style={{ borderBottom: '1px solid var(--border-hairline)', fontSize: 'var(--fs-small)' }}
    >
      <span style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );

  return (
    <Modal open={!!order} onClose={onClose} maxWidth={560}>
      <div className="p-6 md:p-8">
        <div className="eyebrow mb-1" style={{ color: 'var(--text-muted)' }}>
          Order
        </div>
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <span className="font-display" style={{ fontSize: 'var(--fs-display-m)' }}>
            {current.id}
          </span>
          <Tag variant={effectiveStatus === 'delivered' ? 'solid' : 'outline'}>
            {ORDER_STATUS_LABELS[effectiveStatus]}
          </Tag>
        </div>

        {row('Placed on', new Date(current.date).toLocaleDateString('en-GB'))}
        {row('Customer', current.customer)}
        {row('Email', current.email)}
        {row(
          'Payment',
          <Tag variant={current.status === 'new' ? 'outline' : 'accent'}>
            {PAYMENT_LABEL(current.status)}
          </Tag>,
        )}
        {row(
          'Shipping',
          <select
            className="cursor-pointer border-none bg-transparent text-right outline-none"
            style={{ fontSize: 'var(--fs-small)', borderBottom: '1px solid var(--border-hairline)' }}
            value={effectiveStatus}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
          >
            {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>,
        )}

        <div className="eyebrow mb-2 mt-6" style={{ color: 'var(--text-muted)' }}>
          Items
        </div>
        <ul className="m-0 list-none p-0">
          {current.items.map((item, i) => (
            <li
              key={i}
              className="flex items-baseline justify-between gap-4 py-2.5"
              style={{ borderBottom: '1px solid var(--border-hairline)', fontSize: 'var(--fs-small)' }}
            >
              <span>
                {item.title}{' '}
                <span style={{ color: 'var(--text-muted)' }}>
                  · {item.size} · × {item.qty}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div
          className="mt-4 flex items-baseline justify-between"
          style={{ fontSize: 'var(--fs-body)', fontWeight: 500 }}
        >
          <span>Order total</span>
          <span>{formatPrice(current.total)}</span>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button variant="primary" size="s" onClick={onClose}>
            Save changes
          </Button>
          <Button variant="secondary" size="s" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
