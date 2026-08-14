import { create } from 'zustand';
import { api } from '../lib/utils';
import { getProducts, getProductByDocumentId as getProductByDocIdAction } from '../(actions)/products';

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
  orderIndex: number;
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
  locale: string;
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
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  coverImage: Image | null;
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
  setCurrentProduct: (product: Product | null) => void;
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

  setCurrentProduct: (product: Product | null) => set({ currentProduct: product }),

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  setSortOption: (option: SortOption) => set({ sortOption: option }),

  fetchProducts: async (page = 1, pageSize = 25) => {
    try {
      set({ isLoading: true });
      const store = get();

      // Use cached server action
      const { products, pagination } = await getProducts({
        locale: store.locale,
        page,
        pageSize,
      });

      set({
        products,
        pagination,
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

      // Use cached server action
      const product = await getProductByDocIdAction(documentId, store.locale);

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
