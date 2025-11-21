'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  useProductsStore,
  Product,
  Color,
  Size,
} from '@/src/store/prodcuts-store';
import { useCartStore } from '@/src/store/cart-store';
import { useTranslations, useLocale } from 'next-intl';
import BaseLayout from '@/src/components/layout/base-layout';
import Link from 'next/link';

const ProductPage = () => {
  const { documentId } = useParams();
  const docId = Array.isArray(documentId) ? documentId[0] : documentId;

  const t = useTranslations('StorePage');
  const locale = useLocale();

  const fetchProductByDocumentId = useProductsStore(
    (s) => s.fetchProductByDocumentId,
  );
  const product = useProductsStore((s) => s.currentProduct);
  const addItem = useCartStore((s) => s.addItem);

  const [sizeId, setSizeId] = useState<number | null>(null);
  const [colorId, setColorId] = useState<number | null>(null);
  const [qty, setQty] = useState<number>(1);

  useEffect(() => {
    if (docId) fetchProductByDocumentId(docId);
  }, [docId, fetchProductByDocumentId]);

  useEffect(() => {
    if (product) {
      const colors: Color[] = Array.from(
        new Map(product.variants.map((v) => [v.color.id, v.color])).values(),
      );
      const sizes: Size[] = Array.from(
        new Map(product.variants.map((v) => [v.size.id, v.size])).values(),
      );

      setColorId(colors[0]?.id ?? null);
      setSizeId(sizes[0]?.id ?? null);
    }
  }, [product]);

  if (!product) return <BaseLayout>{t('DetailsPage.loading')}...</BaseLayout>;

  const colors: Color[] = Array.from(
    new Map(product.variants.map((v) => [v.color.id, v.color])).values(),
  );
  const sizes: Size[] = Array.from(
    new Map(product.variants.map((v) => [v.size.id, v.size])).values(),
  );

  const selectedImage = product.images?.[0]?.url || '';
  const minPrice = Math.min(...product.variants.map((v) => v.price));

  const selectedVariant = product.variants.find(
    (v) => v.color.id === colorId && v.size.id === sizeId,
  );

  const inStock = selectedVariant ? selectedVariant.stock > 0 : false;

  const handleAdd = () => {
    if (!inStock) return;

    const selectedSize = sizes.find((s) => s.id === sizeId) ?? null;
    const selectedColor = colors.find((c) => c.id === colorId) ?? null;

    addItem(
      {
        productId: product.id,
        variantId: selectedVariant ? selectedVariant.id : 0,
        name: product.name,
        price: selectedVariant?.price ?? minPrice,
        image: selectedImage,
        size: selectedSize,
        color: selectedColor,
      },
      qty,
    );
  };

  return (
    <BaseLayout>
      <section className="max-w-7xl mx-auto px-4  flex flex-col gap-6">
        <h3 className=" flex gap-1">
          <Link href="/store" className="text-blue-600 ">
            {t('DetailsPage.backToStore')}
          </Link>
          <span> / </span>
          {t('DetailsPage.title')}
        </h3>
        <div className="grid w-full  gap-2">
          <div
            key={product.images[0].url}
            className="w-full aspect-[3/4] bg-muted flex items-center justify-center"
          >
            <img
              src={product.images[0].url}
              alt={product.name}
              className="w-full h-full object-cover border border-gray-300"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>

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
              <label className="block text-sm font-medium">
                {t('quantity')}
              </label>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                className="w-14 border px-2"
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
                className={`text-sm font-semibold ${
                  inStock ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {inStock
                  ? t('DetailsPage.inStock')
                  : t('DetailsPage.outOfStock')}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-blue-600 text-lg font-bold">
              {new Intl.NumberFormat(locale === 'en' ? 'en-AE' : 'ar-AE', {
                style: 'currency',
                currency: 'AED',
              }).format(minPrice)}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleAdd}
              disabled={!inStock}
              className={`w-full text-white px-4 py-2.5 text-sm ${
                inStock ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {t('DetailsPage.addToCart')}
            </button>

            <button
              onClick={handleAdd}
              disabled={!inStock}
              className={`w-full text-white px-4 py-2.5 text-sm ${
                inStock ? 'bg-black' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {t('DetailsPage.buyNow')}
            </button>
          </div>
        </div>

        <p className="text-lg font-semibold mb-2">
          {t('DetailsPage.productImages')} ({product.images.length})
        </p>

        <section aria-label="product-images" className="grid grid-cols-2 gap-4">
          {product.images.map((image) => (
            <div
              key={image.url}
              className="w-full aspect-[3/4] bg-muted flex items-center justify-center"
            >
              <img
                src={image.url}
                alt={product.name}
                className="w-full h-full object-cover border border-gray-300"
              />
            </div>
          ))}
        </section>
      </section>
    </BaseLayout>
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

export default ProductPage;
