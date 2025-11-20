'use client';

import React from 'react';
import BaseLayout from '@/src/components/layout/base-layout';
import { useCartStore } from '@/src/store/cart-store';
import { useLocale, useTranslations } from 'next-intl';

const CartPage = () => {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const total = useCartStore((s) => s.total());
  const locale = useLocale();
  const t = useTranslations('CartPage');
  const isEn = String(locale).startsWith('en');

  return (
    <BaseLayout>
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
        {items.length === 0 ? (
          <p>{t('emptyCart')}</p>
        ) : (
          <div className="space-y-4">
            {items.map((it) => (
              <div
                key={`${it.productId}-${it.size?.id || 0}-${it.color?.id || 0}`}
                className="flex items-center gap-4 "
              >
                <div className=" h-32 bg-gray-100 flex items-center justify-center ">
                  {it.image ? (
                    <img
                      src={it.image}
                      alt={it.name}
                      className="w-full h-full object-cover "
                    />
                  ) : (
                    <span className="text-sm text-gray-500">
                      {t('noImage')}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{it.name}</div>
                  <div className="text-sm text-gray-600">
                    {it.size?.value || ''}{' '}
                    {it.color?.name ? `• ${it.color.name}` : ''}
                  </div>
                  <div className="font-bold">
                    {new Intl.NumberFormat(isEn ? 'en-AE' : 'ar-AE', {
                      style: 'currency',
                      currency: 'AED',
                    }).format(it.price * it.quantity)}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <label className="text-sm">{t('quantity')}</label>
                    <input
                      type="number"
                      min={1}
                      value={it.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          it.productId,
                          Math.max(1, Number(e.target.value)),
                          it.size?.id || null,
                          it.color?.id || null,
                        )
                      }
                      className="w-16  border "
                    />
                    <button
                      className="ml-4 text-sm text-red-600 hover:text-red-800"
                      onClick={() =>
                        removeItem(
                          it.productId,
                          it.size?.id || null,
                          it.color?.id || null,
                        )
                      }
                    >
                      {t('remove')}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-right font-bold text-xl pt-4 border-t">
              {t('total')}{' '}
              {new Intl.NumberFormat(isEn ? 'en-AE' : 'ar-AE', {
                style: 'currency',
                currency: 'AED',
              }).format(total)}
            </div>
          </div>
        )}
      </section>
    </BaseLayout>
  );
};

export default CartPage;
