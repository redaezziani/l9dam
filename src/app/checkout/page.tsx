import React, { Suspense } from 'react';
import BaseLayout from '@/src/components/layout/base-layout';
import { Metadata } from 'next';
import CheckoutClient from './checkout-client';

export const metadata: Metadata = {
  title: 'Checkout | Complete Your Order',
  description: 'Complete your order securely. Review your cart, enter shipping details, and proceed to payment.',
  robots: {
    index: false,
    follow: false,
  },
};

const CheckoutPage = () => {
  return (
    <BaseLayout>
      <Suspense fallback={<div className="w-full max-w-5xl mx-auto px-4 py-10">Loading checkout...</div>}>
        <CheckoutClient />
      </Suspense>
    </BaseLayout>
  );
};

export default CheckoutPage;
