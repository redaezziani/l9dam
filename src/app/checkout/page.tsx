'use client';

import React, { useState } from 'react';
import BaseLayout from '@/src/components/layout/base-layout';
import { useTranslations } from 'next-intl';
import { useCartStore } from '@/src/store/cart-store';
import { useOrderStore } from '@/src/store/order-store';
import Link from 'next/link';

const CheckoutPage = () => {
  const t = useTranslations('CheckoutPage');
  const cart = useCartStore();
  const order = useOrderStore();

  const [email, setEmail] = useState('');
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    country: '',
    phone: '',
  });

  const canOrder = cart.items.length > 0 && email.trim().length > 3;

  const handleSubmit = async () => {
    if (!canOrder) return;

    await order.placeOrder({
      userEmail: email,
      shippingAddress: address,
      billingAddress: address,
    });
  };

  // for now lets make a useeffcet to fill dummy data
  React.useEffect(() => {
    setEmail('test@test.com');
    setAddress({
      fullName: 'John Doe',
      street: '123 Main St',
      city: 'Casablanca',
      country: 'Morocco',
      phone: '+212600000000',
    });
  }, []);

  return (
    <BaseLayout>
      <section className="w-full relative max-w-7xl px-4 space-y-8">
        <main className="w-full md:max-w-360 pb-4 grid grid-cols-1 gap-6">
          <p className="text-2xl font-bold text-gray-900">{t('title')}</p>

          <>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-900">
                {t('email')}
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-800 px-3 py-2"
                placeholder="your@email.com"
              />
            </div>

            <div className="border border-gray-800 p-4 space-y-3">
              <p className="text-lg font-bold text-gray-900">
                {t('shippingDetails')}
              </p>
              {['fullName', 'street', 'city', 'country', 'phone'].map(
                (field) => (
                  <div key={field} className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-900 capitalize">
                      {t(field)}
                    </label>
                    <input
                      value={(address as any)[field]}
                      onChange={(e) =>
                        setAddress({ ...address, [field]: e.target.value })
                      }
                      className="border border-gray-800 px-3 py-2"
                    />
                  </div>
                ),
              )}
            </div>

            <div className="space-y-4 border-t border-gray-800 pt-4">
              <p className="text-lg font-bold text-gray-900">
                {t('orderSummary')}
              </p>
              {cart.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border border-gray-800 p-3"
                >
                  <p className="font-bold">{item.name}</p>
                  <p>
                    {item.quantity} × {item.price} MAD
                  </p>
                </div>
              ))}

              <div className="flex justify-between border-t border-gray-800 pt-3">
                <p className="text-lg font-bold">{t('total')}</p>
                <p className="text-lg font-bold">{cart.total()} MAD</p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!canOrder || order.loading}
              className={`w-full py-3 border border-gray-800 text-white ${
                canOrder ? 'bg-black' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {order.loading ? t('placingOrder') : t('placeOrder')}
            </button>

            {order.error && (
              <p className="text-red-600 font-bold text-center mt-2">
                {order.error}
              </p>
            )}
          </>
        </main>
      </section>
    </BaseLayout>
  );
};

export default CheckoutPage;
