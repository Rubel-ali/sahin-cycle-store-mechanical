import { useTranslations } from 'next-intl';
import { GalleryStrip } from '@/components/home/GalleryStrip';

export default function GalleryPage() {
  const t = useTranslations('nav');

  return (
    <div className="min-h-screen pt-8">
      <div className="container mx-auto px-4 md:px-6 mb-8 text-center mt-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('gallery')}
        </h1>
      </div>
      <GalleryStrip showButton={false} />
      {/* We can repeat or expand this component later for a full gallery */}
    </div>
  );
}
