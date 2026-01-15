'use client';

import React, { useState, useEffect } from 'react';
import BaseLayout from '@/src/components/layout/base-layout';
import { useTranslations, useLocale } from 'next-intl';
import { useCartStore } from '@/src/store/cart-store';
import { useOrderStore } from '@/src/store/order-store';
import { useShippingStore } from '@/src/store/shipping-store';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const CheckoutPage = () => {
  const t = useTranslations('CheckoutPage');
  const locale = useLocale();
  const cart = useCartStore();
  const order = useOrderStore();
  const shipping = useShippingStore();
  const searchParams = useSearchParams();

  const status = searchParams.get('status');

  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    country: '',
    phone: '',
  });

  // Fetch shipping data on mount
  useEffect(() => {
    shipping.fetchShippings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset city when country changes
  useEffect(() => {
    setSelectedCity('');
  }, [selectedCountry]);

  // Get available countries and cities
  const countries = shipping.getCountries(locale);
  const cities = selectedCountry
    ? shipping.getCitiesByCountry(selectedCountry, locale)
    : [];

  // Calculate shipping price based on total weight
  const totalWeight = cart.totalWeight();
  const shippingPrice =
    selectedCountry && selectedCity
      ? shipping.calculateShippingPrice(selectedCountry, selectedCity, totalWeight, locale)
      : null;

  const canOrder =
    cart.items.length > 0 &&
    email.trim().length > 3 &&
    selectedCountry &&
    selectedCity &&
    shippingPrice !== null;

  const handleSubmit = async () => {
    if (!canOrder) return;

    await order.placeOrder({
      userEmail: email,
      shippingAddress: {
        ...address,
        country: selectedCountry,
        city: selectedCity,
      },
      billingAddress: address,
    });
  };

  if (status === 'success') {
    return (
      <BaseLayout>
        <section className=" sm:max-w-5xl mx-auto px-4 py-10">
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
      <section className="w-full relative max-w-5xl px-4 space-y-8">
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

              {/* Country Select */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-900">
                  {t('country') || 'Country'}
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="border border-gray-800 px-3 py-2"
                  disabled={shipping.loading}
                >
                  <option value="">
                    {t('selectCountry') || 'Select a country'}
                  </option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Select */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-900">
                  {t('city') || 'City'}
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="border border-gray-800 px-3 py-2"
                  disabled={
                    !selectedCountry || cities.length === 0 || shipping.loading
                  }
                >
                  <option value="">{t('selectCity') || 'Select a city'}</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {['fullName', 'street', 'phone'].map((field) => (
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
              ))}
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
                    {new Intl.NumberFormat(
                      locale === 'en' ? 'en-AE' : 'ar-AE',
                      {
                        style: 'currency',
                        currency: 'AED',
                      },
                    ).format(item.price)}
                  </p>
                </div>
              ))}

              <div className="flex justify-between border-t border-gray-800 pt-3">
                <p className="text-base font-semibold">
                  {t('subtotal') || 'Subtotal'}
                </p>
                <p className="text-base font-semibold">
                  {new Intl.NumberFormat(locale === 'en' ? 'en-AE' : 'ar-AE', {
                    style: 'currency',
                    currency: 'AED',
                  }).format(cart.total())}
                </p>
              </div>

              {/* Shipping Price */}
              <div className="flex justify-between">
                <p className="text-base font-semibold">
                  {t('shipping') || 'Shipping'}
                </p>
                <p className="text-base font-semibold">
                  {shippingPrice !== null ? (
                    new Intl.NumberFormat(locale === 'en' ? 'en-AE' : 'ar-AE', {
                      style: 'currency',
                      currency: 'AED',
                    }).format(shippingPrice)
                  ) : (
                    <span className="text-gray-500 text-sm">
                      {t('selectRegionAndCity') || 'Select region & city'}
                    </span>
                  )}
                </p>
              </div>

              {/* Total with Shipping */}
              <div className="flex justify-between border-t border-gray-800 pt-3">
                <p className="text-lg font-bold">{t('total')}</p>
                <p className="text-lg font-bold">
                  {new Intl.NumberFormat(locale === 'en' ? 'en-AE' : 'ar-AE', {
                    style: 'currency',
                    currency: 'AED',
                  }).format(cart.total() + (shippingPrice || 0))}
                </p>
              </div>

              {/* Item Count and Weight Info */}
              <div className="text-sm text-gray-600 space-y-1">
                <div>{t('itemsInCart') || 'Items in cart'}: {cart.itemCount()}</div>
                <div>{t('totalWeight') || 'Total weight'}: {totalWeight.toFixed(2)} kg</div>
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
