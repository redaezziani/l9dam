'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useCartStore } from '@/src/store/cart-store';
import Link from 'next/link';
import Image from 'next/image';

const CartClient = () => {
  const t = useTranslations('CartPage');
  const locale = useLocale();
  const { items, removeItem, updateQuantity, total } = useCartStore();

  return (
    <section className="w-full relative sm:max-w-5xl px-4 space-y-8">
      <main className="w-full md:max-w-360 pb-4 grid grid-cols-1 gap-6">
        <div className="flex items-center ">
          <p className="text-2xl font-bold text-gray-900">{t('title')}</p>
          <p className="ml-2 text-gray-700">({items.length})</p>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-700 ">{t('emptyCart')}</p>
        ) : (
          <div className="space-y-4 ">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border border-gray-800 p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.image || '/placeholder.png'}
                      alt={item.name}
                      fill
                      className="object-cover border border-gray-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <p className="font-bold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-700">
                      {new Intl.NumberFormat(locale === 'en' ? 'en-AE' : 'ar-AE', {
                        style: 'currency',
                        currency: 'AED',
                      }).format(item.price)}
                    </p>

                    {item.size && (
                      <p className="text-sm text-gray-700">
                        {item.size.label}
                      </p>
                    )}

                    {item.color && (
                      <p className="text-sm text-gray-700">
                        {item.color.label}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.variantId,
                        item.quantity - 1,
                      )
                    }
                    className="px-3 h-9 py-1 border border-gray-800"
                  >
                    -
                  </button>

                  <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="w-10 text-center border border-gray-800 px-1"
                  />

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.variantId,
                        item.quantity + 1,
                      )
                    }
                    className="px-3 h-9 py-1 border border-gray-800"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="px-3 h-9 mr-2 py-1 border border-gray-800 text-red-600"
                  >
                    {t('remove')}
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between pt-4 border-t border-gray-800">
              <p className="text-lg font-bold">{t('total')}</p>
              <p className="text-lg font-bold">
                {new Intl.NumberFormat(locale === 'en' ? 'en-AE' : 'ar-AE', {
                  style: 'currency',
                  currency: 'AED',
                }).format(total())}
              </p>
            </div>

            <Link
              href="/checkout"
              className="block text-center bg-black text-white py-3 border border-gray-800"
            >
              {t('checkout')}
            </Link>
          </div>
        )}
      </main>
    </section>
  );
};

export default CartClient;
