'use client';

import React, { useState } from 'react';
import { Product, Variant, Color, Size } from '@/src/store/prodcuts-store';
import { useCartStore } from '@/src/store/cart-store';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const locale = useLocale();
  const t = useTranslations('StorePage');
  const addItem = useCartStore((s) => s.addItem);

  const colors: Color[] = Array.from(
    new Map(product.variants.map((v) => [v.color.id, v.color])).values(),
  );
  const sizes: Size[] = Array.from(
    new Map(product.variants.map((v) => [v.size.id, v.size])).values(),
  );

  const [sizeId, setSizeId] = useState<number | null>(sizes[0]?.id ?? null);
  const [colorId, setColorId] = useState<number | null>(colors[0]?.id ?? null);
  const [qty, setQty] = useState<number>(1);

  const selectedImage = product.images?.[0]?.url || '';
  const minPrice = Math.min(...product.variants.map((v) => v.price));

  const handleAdd = () => {
    const variant = product.variants.find(
      (v) => v.color.id === colorId && v.size.id === sizeId,
    );
    const selectedSize = sizes.find((s) => s.id === sizeId) ?? null;
    const selectedColor = colors.find((c) => c.id === colorId) ?? null;

    addItem(
      {
        productId: product.id,
        variantId: variant ? variant.id : 0,
        name: product.name,
        price: variant?.price ?? minPrice,
        image: selectedImage,
        size: selectedSize,
        color: selectedColor,
      },
      qty,
    );
  };

  return (
    <div className="flex w-full md:flex-row gap-4 items-start">
      <div className="flex bg-muted min-w-20 aspect-[3/4] items-center justify-center">
        {selectedImage && (
          <img
            src={selectedImage}
            alt={product.name}
            className="w-44 border border-gray-300 object-cover"
          />
        )}
      </div>

      <div className="flex-1">
        <span className="flex justify-start items-center gap-2">
          <p className="font-semibold text-lg">{product.name}</p>
          <Link
            className="text-blue-600 underline block text-xs"
            href={`/store/${product.documentId}`}
          >
            {t('moreDetails')}
          </Link>
        </span>

        <p className="text-gray-600 text-xs line-clamp-2 mb-2">
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
              className="w-14 border px-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-blue-600 text-xs font-bold">
            {new Intl.NumberFormat(locale === 'en' ? 'en-AE' : 'ar-AE', {
              style: 'currency',
              currency: 'AED',
            }).format(minPrice)}
          </span>
          <p
            className="text-xs underline underline-offset-2 select-none cursor-pointer"
            onClick={handleAdd}
          >
            {t('addToCart')}
          </p>
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
      className="border px-2"
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
