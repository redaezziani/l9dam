'use client';

import React, { useState, useEffect } from 'react';
import BaseLayout from '@/src/components/layout/base-layout';
import { useTranslations, useLocale } from 'next-intl';
import { useCartStore } from '@/src/store/cart-store';
import { useOrderStore } from '@/src/store/order-store';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const CheckoutPage = () => {
  const t = useTranslations('CheckoutPage');
  const locale = useLocale();
  const cart = useCartStore();
  const order = useOrderStore();
  const searchParams = useSearchParams();

  const status = searchParams.get('status');

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

  useEffect(() => {
    setEmail('test@test.com');
    setAddress({
      fullName: 'John Doe',
      street: '123 Main St',
      city: 'Casablanca',
      country: 'Morocco',
      phone: '+212600000000',
    });
  }, []);

  if (status === 'success') {
    return (
      <BaseLayout>
        <section className="max-w-4xl mx-auto px-4 py-10">
          <p className="text-3xl font-bold text-green-600 mb-4">
            {t('orderSuccess.title')}
          </p>

          <p className="text-gray-700 text-lg mb-6">
            {t('orderSuccess.message')}
          </p>

          <Link
            href="/store"
            className="px-4 py-2 bg-black text-white font-semibold"
          >
            {t('backToStore')}
          </Link>
        </section>
      </BaseLayout>
    );
  }

  if (status === 'cancel') {
    return (
      <BaseLayout>
        <section className="max-w-4xl mx-auto px-4 py-10">
          <p className="text-3xl font-bold text-red-600 mb-4">
            {t('orderError.title')}
          </p>

          <p className="text-gray-700 text-lg mb-6">
            {t('orderError.message')}
          </p>

          <Link
            href="/store"
            className="px-4 py-2 bg-black text-white font-semibold"
          >
            {t('backToStore')}
          </Link>
        </section>
      </BaseLayout>
    );
  }

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
                    {item.quantity} ×{' '}
                    {new Intl.NumberFormat(locale === 'en' ? 'en-AE' : 'ar-AE', {
                      style: 'currency',
                      currency: 'AED',
                    }).format(item.price)}
                  </p>
                </div>
              ))}

              <div className="flex justify-between border-t border-gray-800 pt-3">
                <p className="text-lg font-bold">{t('total')}</p>
                <p className="text-lg font-bold">
                  {new Intl.NumberFormat(locale === 'en' ? 'en-AE' : 'ar-AE', {
                    style: 'currency',
                    currency: 'AED',
                  }).format(cart.total())}
                </p>
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
