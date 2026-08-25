import { prisma } from '@/lib/prisma';
import ProductsClient from '@/components/products/ProductsClient';
import { setRequestLocale } from 'next-intl/server';

export const revalidate = 300;

export default async function ProductsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const products = await prisma.product.findMany();

  return (
    <ProductsClient initialProducts={products} />
  );
}
