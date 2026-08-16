import { useTranslations } from 'next-intl';
import { ContactCTA } from '@/components/home/ContactCTA';
import { FAQSection } from '@/components/home/FAQSection';

export default function ContactPage() {
  const t = useTranslations('nav');

  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
          {t('contact')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get in touch with us for any inquiries, quotes, or support.
        </p>
      </div>
      <ContactCTA />
      <FAQSection />
    </div>
  );
}
