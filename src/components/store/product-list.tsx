'use client';

import React from 'react';
import { Product } from '@/src/store/prodcuts-store';
import ProductCard from './product-card';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <section className="col-span-4 flex flex-col gap-4">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </section>
);

export default ProductList;
