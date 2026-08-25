'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { ReactNode } from 'react';

export function StorefrontLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Check if current route is an admin route
  // Next-intl pathnames look like /en/admin or /ar/admin
  const isAdminRoute = pathname.includes('/admin');

  if (isAdminRoute) {
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
