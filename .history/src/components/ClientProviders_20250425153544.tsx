// src/components/ClientProviders.tsx
'use client';

import { ReactNode } from 'react';
import GlobalStyle from '@/styles/GlobalStyle';
import { CartProvider } from '@/contexts/CartContexts';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <GlobalStyle />
      <CartProvider>
        {children}
      </CartProvider>
    </>
  );
}
