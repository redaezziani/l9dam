'use client';

import React, { useState } from 'react';
import { Product, Variant, Color, Size } from '@/src/store/prodcuts-store';
import { useCartStore } from '@/src/store/cart-store';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const locale = useLocale();
  const t = useTranslations('StorePage');
  const addItem = useCartStore((s) => s.addItem);

  const colors: Color[] = Array.from(
    new Map(
      product.variants
        .filter((v) => v.color)
        .map((v) => [v.color.id, v.color])
    ).values(),
  );
  const sizes: Size[] = Array.from(
    new Map(
      product.variants
        .filter((v) => v.size)
        .map((v) => [v.size.id, v.size])
    ).values(),
  );

  const [sizeId, setSizeId] = useState<number | null>(
    sizes.length > 0 ? sizes[0].id : null
  );
  const [colorId, setColorId] = useState<number | null>(
    colors.length > 0 ? colors[0].id : null
  );
  const [qty, setQty] = useState<number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const images = product.images || [];
  const displayImage =
    product.coverImage?.url || images[currentImageIndex]?.url || '';
  const minPrice = product.variants.length > 0
    ? Math.min(...product.variants.map((v) => v.price))
    : 0;

  const variant = product.variants.find((v) => {
    const colorMatch = colorId !== null ? v.color?.id === colorId : true;
    const sizeMatch = sizeId !== null ? v.size?.id === sizeId : true;
    return colorMatch && sizeMatch;
  });

  const hasVariants = product.variants.length > 0;
  const canAddToCart = hasVariants && variant !== undefined && variant.stock > 0;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAdd = () => {
    if (!canAddToCart || !variant) return;

    const selectedSize = sizes.find((s) => s.id === sizeId) ?? null;
    const selectedColor = colors.find((c) => c.id === colorId) ?? null;

    addItem(
      {
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        price: variant.price,
        image: displayImage,
        size: selectedSize,
        color: selectedColor,
      },
      qty,
    );
  };

  return (
    <div className="flex w-full md:flex-row gap-4 items-start">
      <div className="relative flex bg-muted min-w-20 aspect-[3/4] items-center justify-center group">
        {displayImage && (
          <Image
            src={displayImage}
            alt={product.name}
            width={176}
            height={235}
            className="w-44 border border-gray-300 object-cover"
            priority={currentImageIndex === 0}
          />
        )}

        {!product.coverImage && images.length > 1 && (
          <div className="absolute top-2 left-2 flex gap-1 z-10">
            <button
              onClick={handlePrevImage}
              className="text-gray-900 hover:text-gray-600"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-2.5 h-2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button
              onClick={handleNextImage}
              className="text-gray-900 hover:text-gray-600"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-2.5 h-2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="flex-1">
        <span className="flex justify-start items-center gap-2">
          <p className="font-semibold ">{product.name}</p>
          <Link
            className="text-blue-600 underline block text-xs"
            href={`/store/${product.documentId}`}
          >
            {t('moreDetails')}
          </Link>
        </span>

        <p className="text-gray-600 sm:max-w-2xl mt-2 text-xs sm:line-clamp-4 line-clamp-2 mb-2">
          {product.description}
        </p>

        <div className="flex gap-4 items-center mb-2">
          <Select
            label={t('color')}
            value={colorId}
            onChange={setColorId}
            options={colors}
            placeholder={t('selectColor')}
          />
          <Select
            label={t('size')}
            value={sizeId}
            onChange={setSizeId}
            options={sizes}
            placeholder={t('selectSize')}
          />
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">{t('quantity')}</label>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              className="w-14 h-8! border px-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasVariants ? (
            <>
              <span className="text-blue-600 text-xs font-bold">
                {new Intl.NumberFormat(locale === 'en' ? 'en-AE' : 'ar-AE', {
                  style: 'currency',
                  currency: 'AED',
                }).format(minPrice)}
              </span>
              <button
                disabled={!canAddToCart}
                onClick={handleAdd}
                className={`text-xs underline underline-offset-2 ${
                  canAddToCart
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed text-gray-400'
                }`}
              >
                {t('addToCart')}
              </button>
              {variant && variant.stock === 0 && (
                <span className="text-xs text-red-600">
                  {t('outOfStock')}
                </span>
              )}
            </>
          ) : (
            <span className="text-xs text-gray-500">
              {t('noVariantsAvailable')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

interface SelectProps {
  label: string;
  value: number | null;
  onChange: (val: number | null) => void;
  options: { id: number; label: string }[];
  placeholder: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
}) => (
  <div className="flex flex-col gap-2">
    <label className="block text-sm font-medium">{label}</label>
    <select
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
      className="border w-16! h-8! px-2"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

export default ProductCard;
