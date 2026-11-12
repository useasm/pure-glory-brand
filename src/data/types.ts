export type ProductStatus = 'available' | 'sold-out' | 'pre-order';

export type Category = 'shirts' | 'outerwear' | 'accessories' | 'art';

export interface Product {
  id: string;
  slug: string;
  title: string;
  collectionSlug: string;
  category: Category;
  price: number;
  /** Cover photo, used in compact lists (cart, search, admin). */
  image: string;
  /** All photos, cover first. Falls back to [image] when omitted. */
  images?: string[];
  tag?: string;
  status: ProductStatus;
  sizes: string[];
  description: string;
  technique: string;
  edition: string;
}

export interface Collection {
  slug: string;
  name: string;
  number: string;
  subtitle: string;
  heroImage: string;
  description: string;
  story: string[];
  imagery: string[];
}

export const CATEGORY_LABELS: Record<Category, string> = {
  shirts: 'Shirts',
  outerwear: 'Outerwear',
  accessories: 'Accessories',
  art: 'Paintings',
};
