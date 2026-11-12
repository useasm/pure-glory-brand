// Static numbers for the admin dashboard until there is a real backend.

export const DAILY_SALES = [
  { day: 'Jun 30', value: 12.4 },
  { day: 'Jul 1', value: 18.2 },
  { day: 'Jul 2', value: 9.6 },
  { day: 'Jul 3', value: 29.5 },
  { day: 'Jul 4', value: 14.8 },
  { day: 'Jul 5', value: 28.0 },
  { day: 'Jul 6', value: 11.3 },
  { day: 'Jul 7', value: 24.0 },
  { day: 'Jul 8', value: 30.5 },
  { day: 'Jul 9', value: 16.7 },
  { day: 'Jul 10', value: 24.0 },
  { day: 'Jul 11', value: 19.2 },
  { day: 'Jul 12', value: 22.6 },
  { day: 'Jul 13', value: 18.5 },
];

export const POPULAR_PRODUCTS = [
  { title: 'Shirt “Imprint”', sold: 9 },
  { title: 'Shirt “Surf”', sold: 7 },
  { title: 'Shirt “Thorn”', sold: 6 },
  { title: 'Shirt “Shard”', sold: 5 },
  { title: 'Scarf “Tide”', sold: 4 },
];

export const RECENT_USERS = [
  { name: 'Anna Severova', email: 'anna@example.com', date: 'Jul 11', orders: 3 },
  { name: 'Kira Melnik', email: 'kira@example.com', date: 'Jul 10', orders: 1 },
  { name: 'Danila Vert', email: 'danila@example.com', date: 'Jul 8', orders: 1 },
  { name: 'Pyotr Yav', email: 'petr@example.com', date: 'Jul 5', orders: 2 },
];

export const RECENT_REVIEWS = [
  {
    author: 'Anna S.',
    product: 'Shirt “Imprint”',
    rating: 5,
    text: 'Even better than in the photos. You can tell it was made by hand.',
    date: 'Jul 10',
  },
  {
    author: 'Ilya G.',
    product: 'Shirt “Thorn”',
    rating: 5,
    text: 'The embroidery is a piece of its own. Thanks for the handwritten note.',
    date: 'Jul 7',
  },
  {
    author: 'Maria K.',
    product: 'Shirt “Surf”',
    rating: 4,
    text: 'The gold sits really well, and the size matched the chart.',
    date: 'Jul 4',
  },
];

// Breakdown shown when a stat card is hovered.
export const METRIC_DETAILS: Record<string, { label: string; value: string }[]> = {
  revenue: [
    { label: 'Today', value: '18,450 ₽' },
    { label: 'Yesterday', value: '22,600 ₽' },
    { label: 'This week', value: '126,300 ₽' },
    { label: 'This month', value: '512,800 ₽' },
  ],
  orders: [
    { label: 'New', value: '1' },
    { label: 'Processing', value: '2' },
    { label: 'Shipped', value: '1' },
    { label: 'Completed', value: '2' },
    { label: 'Returned', value: '0' },
  ],
  users: [
    { label: 'Total', value: '214' },
    { label: 'New this week', value: '11' },
    { label: 'Active today', value: '26' },
  ],
  newClients: [
    { label: 'Today', value: '2' },
    { label: 'This week', value: '11' },
    { label: 'This month', value: '37' },
  ],
  preorders: [
    { label: 'Waiting to be made', value: '6' },
    { label: 'Ready to ship', value: '1' },
    { label: 'Average lead time', value: '3 wks' },
  ],
  avgCheck: [
    { label: 'Today', value: '18,450 ₽' },
    { label: 'This week', value: '25,260 ₽' },
    { label: 'This month', value: '25,333 ₽' },
  ],
  conversion: [
    { label: 'Visit → cart', value: '6.2%' },
    { label: 'Cart → order', value: '38%' },
    { label: 'Overall', value: '2.4%' },
  ],
};
