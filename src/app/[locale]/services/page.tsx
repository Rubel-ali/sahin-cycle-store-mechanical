import { useTranslations } from 'next-intl';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';

export default function ServicesPage() {
  const t = useTranslations('nav');

  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
          {t('services')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Professional repair and maintenance for all your cycling needs.
        </p>
      </div>
      <ServicesPreview />
      <WhyChooseUs />
    </div>
  );
}
