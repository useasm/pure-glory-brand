// Size charts. All measurements are in centimetres.

export interface SizeCategory {
  key: string;
  label: string;
  measures: { letter: string; name: string }[];
  /** values follow the order of `measures` */
  rows: { size: string; values: number[] }[];
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const seq = (start: number, step: number) =>
  SIZES.map((_, i) => Math.round((start + step * i) * 2) / 2);

const zip = (...cols: number[][]) =>
  SIZES.map((size, i) => ({ size, values: cols.map((c) => c[i]) }));

export const SIZE_CATEGORIES: SizeCategory[] = [
  {
    key: 'tshirts',
    label: 'T-shirts',
    measures: [
      { letter: 'A', name: 'Chest width' },
      { letter: 'B', name: 'Body length' },
      { letter: 'C', name: 'Sleeve length' },
    ],
    rows: zip(seq(47, 3), seq(66, 2), seq(19, 1)),
  },
  {
    key: 'shirts',
    label: 'Shirts',
    measures: [
      { letter: 'A', name: 'Chest width' },
      { letter: 'B', name: 'Body length' },
      { letter: 'C', name: 'Sleeve length' },
    ],
    rows: zip(seq(50, 3), seq(70, 2), seq(60, 1.5)),
  },
  {
    key: 'hoodies',
    label: 'Hoodies',
    measures: [
      { letter: 'A', name: 'Chest width' },
      { letter: 'B', name: 'Body length' },
      { letter: 'C', name: 'Sleeve length' },
    ],
    rows: zip(seq(54, 3), seq(64, 2), seq(58, 1.5)),
  },
  {
    key: 'jackets',
    label: 'Jackets',
    measures: [
      { letter: 'A', name: 'Chest width' },
      { letter: 'B', name: 'Body length' },
      { letter: 'C', name: 'Sleeve length' },
    ],
    rows: zip(seq(56, 3), seq(66, 2), seq(61, 1.5)),
  },
  {
    key: 'trousers',
    label: 'Trousers',
    measures: [
      { letter: 'A', name: 'Waist' },
      { letter: 'B', name: 'Hips' },
      { letter: 'C', name: 'Outseam' },
      { letter: 'D', name: 'Inseam' },
    ],
    rows: zip(seq(37, 2.5), seq(50, 2.5), seq(100, 2), seq(74, 1.5)),
  },
];
