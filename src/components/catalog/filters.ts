import type { Category, Product, ProductStatus } from '../../data/types';

export interface CatalogFilters {
  categories: Category[];
  collections: string[];
  statuses: ProductStatus[];
  maxPrice: number | null;
}

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'title';

export const SORT_LABELS: Record<SortKey, string> = {
  featured: 'Featured',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
  title: 'Name',
};

export const EMPTY_FILTERS: CatalogFilters = {
  categories: [],
  collections: [],
  statuses: [],
  maxPrice: null,
};

export const hasActiveFilters = (f: CatalogFilters) =>
  f.categories.length > 0 ||
  f.collections.length > 0 ||
  f.statuses.length > 0 ||
  f.maxPrice !== null;

export function applyFilters(
  items: Product[],
  filters: CatalogFilters,
  query: string,
  sort: SortKey,
): Product[] {
  const q = query.trim().toLowerCase();
  let result = items.filter((p) => {
    if (filters.categories.length && !filters.categories.includes(p.category))
      return false;
    if (
      filters.collections.length &&
      !filters.collections.includes(p.collectionSlug)
    )
      return false;
    if (filters.statuses.length && !filters.statuses.includes(p.status))
      return false;
    if (filters.maxPrice !== null && p.price > filters.maxPrice) return false;
    if (q && !`${p.title} ${p.description}`.toLowerCase().includes(q))
      return false;
    return true;
  });

  switch (sort) {
    case 'price-asc':
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case 'title':
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }
  return result;
}
