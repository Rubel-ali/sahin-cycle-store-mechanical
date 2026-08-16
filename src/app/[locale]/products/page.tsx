import { useTranslations } from 'next-intl';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';

export default function ProductsPage() {
  const t = useTranslations('nav');

  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
          {t('products')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore our wide range of bicycles, accessories, and parts.
        </p>
      </div>
      <FeaturedProducts />
    </div>
  );
}
