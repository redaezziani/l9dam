import { create } from 'zustand';
import { api } from '../lib/utils';

// TypeScript types
interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface Image {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  url: string;
}

interface Size {
  id: number;
  value: string;
}

interface Color {
  id: number;
  name: string;
  hex: string;
}

interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  images: Image[];
  sizes: Size[];
  colors: Color[];
  localizations?: Product[];
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface ProductsState {
  products: Product[];
  locale: string;
  pagination: Pagination | null;
  setLocale: (locale: string) => void;
  fetchProducts: (page?: number, pageSize?: number) => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  locale: 'ar-AE',
  pagination: null,

  setLocale: (locale: string) => set({ locale }),

  fetchProducts: async (page = 1, pageSize = 25) => {
    try {
      const store = useProductsStore.getState();
      const res = await api.get('/api/products', {
        params: {
          populate: '*',
          locale: store.locale,
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
        },
      });

      const productsWithImages: Product[] = res.data.data.map((p: any) => ({
        ...p,
        images: (p.images || []).map((img: any) => ({
          ...img,
          url: img.url.startsWith('http')
            ? img.url
            : `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`,
        })),
      }));

      set({
        products: productsWithImages,
        pagination: res.data.meta?.pagination || null,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
}));
