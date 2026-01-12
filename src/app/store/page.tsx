'use client';
import React, { useEffect, useState } from 'react';
import { useProductsStore } from '@/src/store/prodcuts-store';
import BaseLayout from '@/src/components/layout/base-layout';
import { useTranslations, useLocale } from 'next-intl';
import ProductList from '@/src/components/store/product-list';
import Pagination from '@/src/components/store/pagination';

const Page = () => {
  const { products, fetchProducts, pagination, setLocale } = useProductsStore();
  const t = useTranslations('StorePage');
  const locale = useLocale();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLocale(locale);
    fetchProducts(page);
  }, [locale, page, setLocale, fetchProducts]);

  return (
    <BaseLayout>
      <section className="w-full relative  sm:max-w-5xl px-4 space-y-8">
        <main className="w-full md:max-w-360 pb-4 flex flex-col gap-6">
          <div className="flex items-center">
            <p className=" font-bold text-gray-800">{t('title')}</p>
            <p className="ml-2 text-sm text-gray-600">
              ({products.length} {t('productsCount')})
            </p>
          </div>

          <ProductList products={products} />
          {pagination && (
            <Pagination
              page={page}
              pageCount={pagination.pageCount}
              onChange={setPage}
            />
          )}
        </main>
      </section>
    </BaseLayout>
  );
};

export default Page;
