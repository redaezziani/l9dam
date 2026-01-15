import { create } from 'zustand';

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface PriceRule {
  minWeight: number;
  maxWeight: number | null;
  price: number;
  currency: string;
}

export interface Shipping {
  id: number;
  documentId: string;
  country: LocalizedText;
  cities: LocalizedText[];
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
  getCountries: (locale: string) => string[];
  getCitiesByCountry: (country: string, locale: string) => string[];
  calculateShippingPrice: (country: string, city: string, totalWeight: number, locale: string) => number | null;
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

  getCountries: (locale: string) => {
    const { shippings } = get();
    const lang = locale === 'ar' ? 'ar' : 'en';
    return Array.from(new Set(shippings.map((s) => s.country[lang])));
  },

  getCitiesByCountry: (country: string, locale: string) => {
    const { shippings } = get();
    const lang = locale === 'ar' ? 'ar' : 'en';

    // Find the shipping configuration where the country matches in the selected language
    const shipping = shippings.find((s) => s.country[lang] === country);

    // Return the cities in the selected language
    return shipping?.cities.map(city => city[lang]) || [];
  },

  calculateShippingPrice: (country: string, city: string, totalWeight: number, locale: string) => {
    const { shippings } = get();
    const lang = locale === 'ar' ? 'ar' : 'en';

    // Find the shipping configuration for the selected country
    const shipping = shippings.find((s) => s.country[lang] === country);

    if (!shipping) return null;

    // Check if the city is in the country's cities list
    const cityExists = shipping.cities.some(c => c[lang] === city);
    if (!cityExists) return null;

    // Sort price rules by minWeight in ascending order
    const sortedRules = [...shipping.priceRules].sort((a, b) => a.minWeight - b.minWeight);

    // Find the applicable price rule based on weight
    for (const rule of sortedRules) {
      // Check if weight falls within this rule's range
      if (totalWeight >= rule.minWeight) {
        // If maxWeight is null, this is the highest tier (no upper limit)
        if (rule.maxWeight === null) {
          return rule.price;
        }
        // If weight is within the range
        if (totalWeight < rule.maxWeight) {
          return rule.price;
        }
      }
    }

    // If no rule matches, return null
    return null;
  },
}));

export default useShippingStore;
