import { create } from 'zustand';
import { api } from '../lib/utils';
import { useCartStore } from './cart-store';

interface OrderPayload {
  userEmail: string;
  shippingAddress?: any;
  billingAddress?: any;
}

interface OrderState {
  loading: boolean;
  error: string | null;
  placeOrder: (payload: OrderPayload) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set) => ({
  loading: false,
  error: null,

  placeOrder: async (payload) => {
    const cart = useCartStore.getState();
    const items = cart.items;

    if (items.length === 0) {
      set({ error: 'Cart is empty' });
      return;
    }

    try {
      set({ loading: true, error: null });

      // Call custom checkout endpoint
      const res = await api.post('/api/orders/checkout', {
        userEmail: payload.userEmail,
        shippingAddress: payload.shippingAddress,
        billingAddress: payload.billingAddress,
        items: items.map((it) => ({
          productName: it.name,
          quantity: it.quantity,
          price: it.price,
          variantId: it.variantId || null,
        })),
      });

      // Clear cart
      cart.clear();

      // Redirect to Stripe Checkout
      window.location.href = res.data.checkoutUrl;
    } catch (err: any) {
      console.error(err?.response?.data);
      set({
        error: err?.response?.data?.error?.message || 'Checkout failed',
      });
    } finally {
      set({ loading: false });
    }
  },
}));
