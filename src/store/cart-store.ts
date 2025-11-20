import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
  productId: number;
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
  removeItem: (
    productId: number,
    sizeId?: number | null,
    colorId?: number | null,
  ) => void;
  updateQuantity: (
    productId: number,
    quantity: number,
    sizeId?: number | null,
    colorId?: number | null,
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
              ((it.size && item.size && it.size.id === item.size.id) ||
                (!it.size && !item.size)) &&
              ((it.color && item.color && it.color.id === item.color.id) ||
                (!it.color && !item.color)),
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

      removeItem: (productId, sizeId = null, colorId = null) =>
        set((state) => ({
          items: state.items.filter(
            (it) =>
              !(
                it.productId === productId &&
                ((it.size && sizeId && it.size.id === sizeId) ||
                  (!it.size && !sizeId)) &&
                ((it.color && colorId && it.color.id === colorId) ||
                  (!it.color && !colorId))
              ),
          ),
        })),

      updateQuantity: (productId, quantity, sizeId = null, colorId = null) =>
        set((state) => ({
          items: state.items
            .map((it) => {
              if (
                it.productId === productId &&
                ((it.size && sizeId && it.size.id === sizeId) ||
                  (!it.size && !sizeId)) &&
                ((it.color && colorId && it.color.id === colorId) ||
                  (!it.color && !colorId))
              ) {
                return { ...it, quantity: Math.max(0, quantity) };
              }
              return it;
            })
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
