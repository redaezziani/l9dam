import { create } from 'zustand';

export interface PriceRule {
  maxItems: number;
  shippingPrice: number;
}

export interface Shipping {
  id: number;
  documentId: string;
  region: string;
  cities: string[];
  priceRules: PriceRule[];
  kg?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ShippingState {
  shippings: Shipping[];
  loading: boolean;
  error: string | null;
  fetchShippings: () => Promise<void>;
  getRegions: () => string[];
  getCitiesByRegion: (region: string) => string[];
  calculateShippingPrice: (region: string, city: string, itemCount: number) => number | null;
}

export const useShippingStore = create<ShippingState>((set, get) => ({
  shippings: [],
  loading: false,
  error: null,

  fetchShippings: async () => {
    try {
      set({ loading: true, error: null });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/shippings`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch shipping data');
      }

      const data = await response.json();
      set({ shippings: data.data || [], loading: false });
    } catch (error: any) {
      console.error('Error fetching shippings:', error);
      set({
        error: error?.message || 'Failed to fetch shipping data',
        loading: false,
      });
    }
  },

  getRegions: () => {
    const { shippings } = get();
    return Array.from(new Set(shippings.map((s) => s.region)));
  },

  getCitiesByRegion: (region: string) => {
    const { shippings } = get();
    const shipping = shippings.find((s) => s.region === region);
    return shipping?.cities || [];
  },

  calculateShippingPrice: (region: string, city: string, itemCount: number) => {
    const { shippings } = get();

    // Find the shipping configuration for the selected region
    const shipping = shippings.find((s) => s.region === region);

    if (!shipping) return null;

    // Check if the city is in the region's cities list
    if (!shipping.cities.includes(city)) return null;

    // Sort price rules by maxItems in ascending order
    const sortedRules = [...shipping.priceRules].sort((a, b) => a.maxItems - b.maxItems);

    // Find the applicable price rule
    for (const rule of sortedRules) {
      if (itemCount <= rule.maxItems) {
        return rule.shippingPrice;
      }
    }

    // If itemCount exceeds all maxItems, return the highest tier price
    return sortedRules[sortedRules.length - 1]?.shippingPrice || null;
  },
}));

export default useShippingStore;
