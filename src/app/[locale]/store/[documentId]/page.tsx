import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from '@/src/i18n/request';
import { getProductByDocumentId } from '@/src/(actions)/products';
import { generateProductMetadata, generateProductSchema, generateBreadcrumbSchema } from '@/src/lib/seo-utils';
import BaseLayout from '@/src/components/layout/base-layout';
import ProductClient from './product-client';

type Props = {
  params: Promise<{ documentId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { documentId } = await params;
  const locale = await getLocale();
  const product = await getProductByDocumentId(documentId, locale);

  if (!product) {
    return {
      title: 'Product Not Found | Lqdam',
      description: 'The requested product could not be found.',
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lqdam.com';
  return generateProductMetadata(product, locale, baseUrl);
}

const ProductPage = async ({ params }: Props) => {
  const { documentId } = await params;
  const locale = await getLocale();
  const product = await getProductByDocumentId(documentId, locale);

  if (!product) {
    notFound();
  }

  // Generate structured data for SEO
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lqdam.com';
  const productSchema = generateProductSchema(product, locale, baseUrl);
  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Home', url: '/' },
      { name: 'Store', url: '/store' },
      { name: product.name, url: `/store/${documentId}` },
    ],
    baseUrl
  );

  return (
    <BaseLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductClient documentId={documentId} initialProduct={product} />
    </BaseLayout>
  );
};

export default ProductPage;
