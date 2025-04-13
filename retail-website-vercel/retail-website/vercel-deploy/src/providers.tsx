'use client';

import { CartProvider } from '@/hooks/use-cart';
import { ProductsProvider } from '@/hooks/use-products';
import { FilterProvider } from '@/hooks/use-filter';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ProductsProvider>
      <FilterProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </FilterProvider>
    </ProductsProvider>
  );
}
