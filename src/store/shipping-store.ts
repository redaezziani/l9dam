import { create } from 'zustand';
import { getShippingData } from '../(actions)/shipping';

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface PriceRule {
  minPieces: number;
  maxPieces: number | null;
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
  calculateShippingPrice: (country: string, city: string, totalPieces: number, locale: string) => number | null;
}

export const useShippingStore = create<ShippingState>((set, get) => ({
  shippings: [],
  loading: false,
  error: null,

  fetchShippings: async () => {
    try {
      set({ loading: true, error: null });

      // Use cached server action instead of direct fetch
      const shippings = await getShippingData();

      set({ shippings, loading: false });
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
    return Array.from(
      new Set(
        shippings
          .filter((s) => s.country && s.country[lang])
          .map((s) => s.country[lang])
      )
    );
  },

  getCitiesByCountry: (country: string, locale: string) => {
    const { shippings } = get();
    const lang = locale === 'ar' ? 'ar' : 'en';

    // Find the shipping configuration where the country matches in the selected language
    const shipping = shippings.find((s) => s.country && s.country[lang] === country);

    // Return the cities in the selected language, filtering out any null/undefined cities
    return shipping?.cities
      .filter((city) => city && city[lang])
      .map((city) => city[lang]) || [];
  },

  calculateShippingPrice: (country: string, city: string, totalPieces: number, locale: string) => {
    const { shippings } = get();
    const lang = locale === 'ar' ? 'ar' : 'en';

    // Find the shipping configuration for the selected country
    const shipping = shippings.find((s) => s.country && s.country[lang] === country);

    if (!shipping) return null;

    // Check if the city is in the country's cities list
    const cityExists = shipping.cities.some(c => c && c[lang] === city);
    if (!cityExists) return null;

    // Sort price rules by minPieces in ascending order
    const sortedRules = [...shipping.priceRules].sort((a, b) => a.minPieces - b.minPieces);

    // Find the applicable price rule based on piece count
    for (const rule of sortedRules) {
      // Check if piece count falls within this rule's range
      if (totalPieces >= rule.minPieces) {
        // If maxPieces is null, this is the highest tier (no upper limit)
        if (rule.maxPieces === null) {
          return rule.price;
        }
        // If piece count is within the range
        if (totalPieces < rule.maxPieces) {
          return rule.price;
        }
      }
    }

    // If no rule matches, return null
    return null;
  },
}));

export default useShippingStore;
