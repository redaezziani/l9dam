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

export interface ProductsState {
  products: Product[];
  locale: string;
  pagination: Pagination | null;
  setLocale: (locale: string) => void;
  fetchProducts: (page?: number, pageSize?: number) => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  locale: 'en',
  pagination: null,

  setLocale: (locale: string) => set({ locale }),

  fetchProducts: async (page = 1, pageSize = 25) => {
    try {
      const store = useProductsStore.getState();
      const res = await api.get('/api/products', {
        params: {
          locale: store.locale,
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
          'populate[variants][populate]': '*',
          populate: 'images',
        },
      });

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
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
}));
