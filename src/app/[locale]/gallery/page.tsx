import { useTranslations } from 'next-intl';
import { GalleryStrip } from '@/components/home/GalleryStrip';

export default function GalleryPage() {
  const t = useTranslations('nav');
  const tGallery = useTranslations('galleryPage');

  return (
    <div className="min-h-screen pt-0 bg-gray-50">
      {/* Page Header */}
      <div className="bg-white pt-24 pb-8 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('gallery')}
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {tGallery('subtitle')}
          </p>
        </div>
      </div>
      <GalleryStrip showButton={false} />
      {/* We can repeat or expand this component later for a full gallery */}
    </div>
  );
}
