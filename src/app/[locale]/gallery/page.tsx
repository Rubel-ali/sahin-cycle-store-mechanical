import { useTranslations } from 'next-intl';
import { GalleryStrip } from '@/components/home/GalleryStrip';

export default function GalleryPage() {
  const t = useTranslations('nav');

  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
          {t('gallery')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Take a look at our store, products, and happy customers.
        </p>
      </div>
      <GalleryStrip />
      {/* We can repeat or expand this component later for a full gallery */}
    </div>
  );
}
