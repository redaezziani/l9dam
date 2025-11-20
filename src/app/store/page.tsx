'use client';
import React, { useEffect, useState } from 'react';
import { useProductsStore, SortOption } from '@/src/store/prodcuts-store';
import BaseLayout from '@/src/components/layout/base-layout';
import { useTranslations } from 'next-intl';
import ProductList from '@/src/components/store/product-list';
import Pagination from '@/src/components/store/pagination';

const Page = () => {
  const {
    products,
    fetchProducts,
    pagination,
    isLoading,
    searchQuery,
    sortOption,
    setSearchQuery,
    setSortOption,
    getSortedProducts,
  } = useProductsStore();
  const t = useTranslations('StorePage');
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState(searchQuery);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      setSearchQuery(value);
      setPage(1);
      fetchProducts(1, 25, value);
    }, 500);

    setDebounceTimer(timer);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
  };

  const sortedProducts = getSortedProducts();

  return (
    <BaseLayout>
      <section className="w-full relative max-w-7xl px-4 space-y-8">
        <main className="w-full md:max-w-360 pb-4 flex flex-col gap-6">
          <section
            aria-label="product-filter"
            className="w-full flex   justify-between items-start sm:items-center gap-4 "
          >
            <div className="flex flex-col justify-start  items-start gap-2">
              <label htmlFor="search" className="text-gray-600 text-sm">
                {t('searchLabel')}
              </label>
              <div className="relative w-[80%">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleSearchChange}
                  placeholder={t('searchPlaceholder')}
                  className="w-full px-4  border border-gray-300  focus:outline-none focus:ring-2 "
                />
                {isLoading && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    {t('loading')}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-start  items-start gap-2">
              <label htmlFor="sort" className="text-gray-600 text-sm">
                {t('sortByLabel')}
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="px-3 border border-gray-300  focus:outline-none focus:ring-2 "
              >
                <option value="name-asc">{t('sortNameAsc')}</option>
                <option value="name-desc">{t('sortNameDesc')}</option>
                <option value="price-asc">{t('sortPriceAsc')}</option>
                <option value="price-desc">{t('sortPriceDesc')}</option>
                <option value="date-asc">{t('sortDateAsc')}</option>
                <option value="date-desc">{t('sortDateDesc')}</option>
              </select>
            </div>
          </section>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">{t('title')}</h1>
            <p className="ml-2 text-gray-600">
              ({sortedProducts.length} {t('productsCount')})
            </p>
          </div>

          <ProductList products={sortedProducts} />
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
