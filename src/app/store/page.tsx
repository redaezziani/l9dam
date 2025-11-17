'use client';

import React from 'react';
import { useProductsStore } from '@/src/store/prodcuts-store';
import BaseLayout from '@/src/components/layout/base-layout';
import { useEffect } from 'react';
import { useLocale } from 'next-intl';

const page = () => {
  const { products, fetchProducts, setLocale } = useProductsStore();
  const locale = useLocale();
  useEffect(() => {
    setLocale(locale === 'en' ? 'en' : 'ar-AE');
    fetchProducts();
  }, [fetchProducts, locale, setLocale]);

  return (
    <BaseLayout>
      <main className="w-full md:max-w-360  pb-4 grid grid-cols-1 lg:grid-cols-6 gap-6">
        <section className=" col-span-2 bg-muted"></section>
        <section className=" col-span-4 flex flex-col gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className=" rounded-lg p-4 flex  md:flex-row gap-4 items-start"
            >
              <img
                src={product.images[0].url}
                alt={product.name}
                className=" w-44 border border-gray-300 object-cover"
              />
              <div className="flex-1 mt-2">
                <h2 className="text-3xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                  {product.description}
                </p>
                <span className="text-blue-600 font-bold">
                  {new Intl.NumberFormat(locale === 'en' ? 'en-AE' : 'ar-AE', {
                    style: 'currency',
                    currency: 'AED',
                  }).format(product.price)}
                </span>
              </div>
            </div>
          ))}
        </section>
      </main>
    </BaseLayout>
  );
};

export default page;
