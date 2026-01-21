'use client';

import React, { useState, useEffect } from 'react';
import {
  useProductsStore,
  Color,
  Size,
} from '@/src/store/prodcuts-store';
import { useCartStore } from '@/src/store/cart-store';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

interface ProductClientProps {
  documentId: string;
}

const ProductClient = ({ documentId }: ProductClientProps) => {

  const t = useTranslations('StorePage');
  const locale = useLocale();

  const fetchProductByDocumentId = useProductsStore(
    (s) => s.fetchProductByDocumentId,
  );
  const setLocale = useProductsStore((s) => s.setLocale);
  const product = useProductsStore((s) => s.currentProduct);
  const isLoading = useProductsStore((s) => s.isLoading);
  const addItem = useCartStore((s) => s.addItem);

  const [sizeId, setSizeId] = useState<number | null>(null);
  const [colorId, setColorId] = useState<number | null>(null);
  const [qty, setQty] = useState<number>(1);

  useEffect(() => {
    if (documentId) {
      setLocale(locale);
      fetchProductByDocumentId(documentId);
    }
  }, [locale, documentId, setLocale, fetchProductByDocumentId]);

  useEffect(() => {
    if (product) {
      const colors: Color[] = Array.from(
        new Map(
          product.variants
            .filter((v) => v.color)
            .map((v) => [v.color.id, v.color]),
        ).values(),
      );
      const sizes: Size[] = Array.from(
        new Map(
          product.variants
            .filter((v) => v.size)
            .map((v) => [v.size.id, v.size]),
        ).values(),
      );

      setColorId(colors.length > 0 ? colors[0].id : null);
      setSizeId(sizes.length > 0 ? sizes[0].id : null);
    }
  }, [product]);

  if (isLoading) {
    return <div>{t('DetailsPage.loading')}...</div>;
  }

  if (!product) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center gap-6 min-h-[60vh]">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-bold text-gray-900">
            {t('DetailsPage.notAvailable')}
          </h2>
          <p className="text-gray-600 text-sm">
            {t('DetailsPage.notAvailableMessage')}
          </p>
          <div className="flex gap-3 justify-center pt-4">
            <Link
              href="/store"
              className="px-4 py-2 text-sm underline text-blue-600"
            >
              {t('DetailsPage.browseOtherProducts')}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const colors: Color[] = Array.from(
    new Map(
      product.variants.filter((v) => v.color).map((v) => [v.color.id, v.color]),
    ).values(),
  );
  const sizes: Size[] = Array.from(
    new Map(
      product.variants.filter((v) => v.size).map((v) => [v.size.id, v.size]),
    ).values(),
  );

  const selectedImage =
    product.coverImage?.url || product.images?.[0]?.url || '';
  const minPrice =
    product.variants.length > 0
      ? Math.min(...product.variants.map((v) => v.price))
      : 0;

  const selectedVariant = product.variants.find((v) => {
    const colorMatch = colorId !== null ? v.color?.id === colorId : true;
    const sizeMatch = sizeId !== null ? v.size?.id === sizeId : true;
    return colorMatch && sizeMatch;
  });

  const hasVariants = product.variants.length > 0;
  const inStock = selectedVariant ? selectedVariant.stock > 0 : false;
  const canAddToCart = hasVariants && selectedVariant !== undefined && inStock;

  const handleAdd = () => {
    if (!canAddToCart || !selectedVariant) return;

    const selectedSize = sizes.find((s) => s.id === sizeId) ?? null;
    const selectedColor = colors.find((c) => c.id === colorId) ?? null;

    addItem(
      {
        productId: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        price: selectedVariant.price,
        image: selectedImage,
        size: selectedSize,
        color: selectedColor,
      },
      qty,
    );
  };

  return (
    <section className=" sm:max-w-5xl mx-auto px-4  flex flex-col gap-6">
      <p className=" flex text-sm gap-1">
        <Link href="/store" className="text-blue-600 ">
          {t('DetailsPage.backToStore')}
        </Link>
        <span> / </span>
        {t('DetailsPage.title')}
      </p>
      <div className="grid  sm:gap-6 sm:grid-cols-3  w-full  gap-2">
        {selectedImage && (
          <div className="w-full aspect-3/4  bg-muted flex items-center justify-center relative">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover border border-gray-300"
              priority
            />
          </div>
        )}

        <div className="flex flex-col sm:col-span-2 gap-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-700 text-sm">{product.description}</p>

          <div className="flex gap-4 items-center mb-2 flex-wrap">
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
              <label className="block text-gray-800 text-sm font-medium">
                {t('quantity')}
              </label>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                className="w-14 h-8! border px-2"
              />
            </div>
          </div>
          <div className="flex gap-4 items-center mb-2 flex-wrap">
            <Link
              href={'/size-guide'}
              className="text-xs underline underline-offset-4 text-gray-600"
            >
              {t('DetailsPage.sizeGuide')}
            </Link>

            {selectedVariant && (
              <p
                className={`text-sm  ${
                  inStock ? 'text-green-700' : 'text-red-600'
                }`}
              >
                {inStock
                  ? t('DetailsPage.inStock')
                  : t('DetailsPage.outOfStock')}
              </p>
            )}
            {`-`}
            <span className=" text-sm ">
              {new Intl.NumberFormat(locale === 'en' ? 'en-AE' : 'ar-AE', {
                style: 'currency',
                currency: 'AED',
              }).format(minPrice)}
            </span>
          </div>

          {hasVariants ? (
            <div className="flex  gap-4">
              <button
                onClick={handleAdd}
                disabled={!canAddToCart}
                className={` underline   py-2.5 text-sm ${
                  canAddToCart
                    ? 'text-blue-600'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                {t('DetailsPage.addToCart')}
              </button>

              <button
                onClick={handleAdd}
                disabled={!canAddToCart}
                className={` underline  py-2.5 text-sm ${
                  canAddToCart
                    ? 'text-black'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                {t('DetailsPage.buyNow')}
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              {t('DetailsPage.noVariantsAvailable')}
            </p>
          )}
        </div>
      </div>

      <p className="text-lg font-semibold mb-2">
        {t('DetailsPage.productImages')} ({product.images.length})
      </p>

      <section
        aria-label="product-images"
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {product.images.map((image, index) => (
          <div
            key={image.url}
            className="w-full aspect-[3/4] bg-muted flex items-center justify-center relative"
          >
            <Image
              src={image.url}
              alt={product.name}
              fill
              className="object-cover border border-gray-300"
              priority={index === 0}
            />
          </div>
        ))}
      </section>
    </section>
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
    <label className="block text-sm text-gray-800 font-medium">{label}</label>
    <select
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
      className="border h-8! px-2"
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

export default ProductClient;
