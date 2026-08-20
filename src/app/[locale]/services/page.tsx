import { useTranslations } from 'next-intl';
import { ServicesPreview } from '@/components/home/ServicesPreview';

export default function ServicesPage() {
  const t = useTranslations('nav');
  const tServices = useTranslations('services');

  return (
    <div className="min-h-screen pt-0 bg-white">
      {/* Page Header */}
      <div className="bg-[#1a1a1a] py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/service-bg.jpg')" }}
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('services')}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {tServices('subtitle')}
          </p>
        </div>
      </div>

      <ServicesPreview removeTopPadding={false} />
    </div>
  );
}
