'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pageCount,
  onChange,
}) => {
  const t = useTranslations('StorePage');

  if (!pageCount || pageCount <= 1) return null;

  return (
    <div className="flex justify-start w-full items-center gap-4 mt-4 text-sm">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="underline text-gray-800 disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
      >
        {t('prev')}
      </button>

      {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`${
            page === p
              ? 'font-bold underline text-gray-900'
              : 'text-gray-600 hover:underline'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        className="underline text-gray-800 disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
      >
        {t('next')}
      </button>
    </div>
  );
};

export default Pagination;
