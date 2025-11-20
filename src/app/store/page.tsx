'use client';

import React, { useEffect, useState } from 'react';
import { useProductsStore } from '@/src/store/prodcuts-store';
import BaseLayout from '@/src/components/layout/base-layout';
import { useTranslations } from 'next-intl';
import ProductList from '@/src/components/store/product-list';
import Pagination from '@/src/components/store/pagination';

const Page = () => {
  const { products, fetchProducts, pagination } = useProductsStore();
  const t = useTranslations('StorePage');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return (
    <BaseLayout>
      <section className="w-full relative max-w-7xl mx-auto px-4 space-y-8">
        <main className="w-full md:max-w-360 pb-4 grid grid-cols-1 lg:grid-cols-6 gap-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">{t('title')}</h1>
            <p className="ml-2 text-gray-600">
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
