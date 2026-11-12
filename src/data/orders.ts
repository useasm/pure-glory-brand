export type OrderStatus =
  | 'new'
  | 'paid'
  | 'in-progress'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  date: string;
  customer: string;
  email: string;
  items: { title: string; size: string; qty: number }[];
  total: number;
  status: OrderStatus;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  new: 'New',
  paid: 'Paid',
  'in-progress': 'In progress',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

// Demo orders, shared by the account panel and the admin.
export const orders: Order[] = [
  {
    id: 'PG-1042',
    date: '2026-07-10',
    customer: 'Anna Severova',
    email: 'anna@example.com',
    items: [{ title: 'Shirt “Imprint”', size: 'M', qty: 1 }],
    total: 24000,
    status: 'in-progress',
  },
  {
    id: 'PG-1041',
    date: '2026-07-08',
    customer: 'Ilya Granin',
    email: 'ilya@example.com',
    items: [
      { title: 'Shirt “Thorn”', size: 'L', qty: 1 },
      { title: 'Scarf “Tide”', size: '70 × 70 cm', qty: 1 },
    ],
    total: 30500,
    status: 'shipped',
  },
  {
    id: 'PG-1040',
    date: '2026-07-05',
    customer: 'Maria Klim',
    email: 'maria@example.com',
    items: [{ title: 'Shirt “Surf”', size: 'S', qty: 1 }],
    total: 28000,
    status: 'delivered',
  },
  {
    id: 'PG-1039',
    date: '2026-07-03',
    customer: 'Danila Vert',
    email: 'danila@example.com',
    items: [{ title: 'Shirt “Depth”', size: 'L', qty: 1 }],
    total: 29500,
    status: 'paid',
  },
  {
    id: 'PG-1038',
    date: '2026-06-28',
    customer: 'Olga Ring',
    email: 'olga@example.com',
    items: [{ title: 'Shirt “No Walls”', size: 'M', qty: 2 }],
    total: 40000,
    status: 'delivered',
  },
  {
    id: 'PG-1037',
    date: '2026-06-25',
    customer: 'Pyotr Yav',
    email: 'petr@example.com',
    items: [{ title: 'Shirt “Shard”', size: 'XL', qty: 1 }],
    total: 18500,
    status: 'cancelled',
  },
];
