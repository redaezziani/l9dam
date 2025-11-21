import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
  productId: number;
  variantId: number;
  name: string;
  price: number;
  image?: string;
  size?: { id: number; label: string } | null;
  color?: { id: number; label: string; hex?: string } | null;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: number, variantId: number) => void;
  updateQuantity: (
    productId: number,
    variantId: number,
    quantity: number,
  ) => void;
  clear: () => void;
  itemCount: () => number;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantity = 1) => {
        set((state) => {
          const index = state.items.findIndex(
            (it) =>
              it.productId === item.productId &&
              it.variantId === item.variantId,
          );

          if (index > -1) {
            const items = [...state.items];
            items[index] = {
              ...items[index],
              quantity: items[index].quantity + quantity,
            };
            return { items };
          }

          return { items: [...state.items, { ...item, quantity }] };
        });
      },

      removeItem: (productId, variantId) =>
        set((state) => ({
          items: state.items.filter(
            (it) => !(it.productId === productId && it.variantId === variantId),
          ),
        })),

      updateQuantity: (productId, variantId, quantity) =>
        set((state) => ({
          items: state.items
            .map((it) =>
              it.productId === productId && it.variantId === variantId
                ? { ...it, quantity: Math.max(0, quantity) }
                : it,
            )
            .filter((it) => it.quantity > 0),
        })),

      clear: () => set({ items: [] }),

      itemCount: () => get().items.reduce((s, it) => s + it.quantity, 0),

      total: () => get().items.reduce((s, it) => s + it.price * it.quantity, 0),
    }),
    {
      name: 'l9dam-cart',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCartStore;
