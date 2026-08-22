import { useTranslations } from 'next-intl';
import { ProductsClient } from '@/components/products/ProductsClient';

export default function ProductsPage() {
  const t = useTranslations('nav');

  return (
    <div className="min-h-screen pt-0">
      <ProductsClient />
    </div>
  );
}
