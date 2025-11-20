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

  if (!pageCount) return null;

  return (
    <div className="flex justify-start w-full items-center gap-2 mt-4">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 border bg-white text-gray-800 disabled:opacity-50"
      >
        {t('prev')}
      </button>

      {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 border ${
            page === p
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-800'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        className="px-3 py-1 border bg-white text-gray-800 disabled:opacity-50"
      >
        {t('next')}
      </button>
    </div>
  );
};

export default Pagination;
