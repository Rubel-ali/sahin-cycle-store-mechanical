import { prisma } from '@/lib/prisma';
import ProductDashboardClient from '@/components/admin/ProductDashboardClient';
import { setRequestLocale } from 'next-intl/server';

export default async function AdminDashboardPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      <ProductDashboardClient initialProducts={products} />
    </div>
  );
}
