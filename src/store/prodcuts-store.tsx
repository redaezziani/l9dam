import { create } from 'zustand';
import { api } from '../lib/utils';

export interface Image {
  id: number;
  url: string;
  [key: string]: any;
}

export interface ProductBasic {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface Color {
  id: number;
  documentId: string;
  label: string;
  hex: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface Size {
  id: number;
  documentId: string;
  label: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface Variant {
  id: number;
  documentId: string;
  sku: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  product: ProductBasic;
  color: Color;
  size: Size;
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  images: Image[];
  variants: Variant[];
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'date-asc'
  | 'date-desc';

export interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  locale: string;
  pagination: Pagination | null;
  searchQuery: string;
  sortOption: SortOption;
  isLoading: boolean;
  setLocale: (locale: string) => void;
  setSearchQuery: (query: string) => void;
  setSortOption: (option: SortOption) => void;
  fetchProducts: (
    page?: number,
    pageSize?: number,
    search?: string,
  ) => Promise<void>;
  fetchProductByDocumentId: (documentId: string) => Promise<void>;
  getSortedProducts: () => Product[];
}

const sortProducts = (
  products: Product[],
  sortOption: SortOption,
): Product[] => {
  const sorted = [...products];
  switch (sortOption) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'price-asc':
      return sorted.sort((a, b) => {
        const priceA = a.variants[0]?.price || 0;
        const priceB = b.variants[0]?.price || 0;
        return priceA - priceB;
      });
    case 'price-desc':
      return sorted.sort((a, b) => {
        const priceA = a.variants[0]?.price || 0;
        const priceB = b.variants[0]?.price || 0;
        return priceB - priceA;
      });
    case 'date-asc':
      return sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    case 'date-desc':
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    default:
      return sorted;
  }
};

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  currentProduct: null,
  locale: 'en',
  pagination: null,
  searchQuery: '',
  sortOption: 'name-asc',
  isLoading: false,

  setLocale: (locale: string) => set({ locale }),

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  setSortOption: (option: SortOption) => set({ sortOption: option }),

  fetchProducts: async (page = 1, pageSize = 25, search?: string) => {
    try {
      set({ isLoading: true });
      const store = get();
      const searchTerm = search !== undefined ? search : store.searchQuery;

      const params: Record<string, any> = {
        locale: store.locale,
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'populate[variants][populate]': '*',
        populate: 'images',
      };

      if (searchTerm && searchTerm.trim() !== '') {
        params['filters[$or][0][name][$containsi]'] = searchTerm;
        params['filters[$or][1][description][$containsi]'] = searchTerm;
      }

      const res = await api.get('/api/products', { params });

      const products: Product[] = res.data.data.map((p: any) => ({
        ...p,
        images: (p.images || []).map((img: any) => ({
          ...img,
          url: img.url.startsWith('http')
            ? img.url
            : `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`,
        })),
      }));

      set({
        products,
        pagination: res.data.meta?.pagination || null,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({ isLoading: false });
    }
  },

  fetchProductByDocumentId: async (documentId: string) => {
    try {
      set({ isLoading: true });
      const store = get();
      const res = await api.get('/api/products', {
        params: {
          locale: store.locale,
          'filters[documentId][$eq]': documentId,
          'populate[variants][populate]': '*',
          populate: 'images',
        },
      });

      const product: Product | null = res.data.data[0]
        ? {
            ...res.data.data[0],
            images: (res.data.data[0].images || []).map((img: any) => ({
              ...img,
              url: img.url.startsWith('http')
                ? img.url
                : `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`,
            })),
          }
        : null;

      set({ currentProduct: product, isLoading: false });
    } catch (error) {
      console.error('Error fetching product:', error);
      set({ isLoading: false });
    }
  },

  getSortedProducts: () => {
    const { products, sortOption } = get();
    return sortProducts(products, sortOption);
  },
}));
