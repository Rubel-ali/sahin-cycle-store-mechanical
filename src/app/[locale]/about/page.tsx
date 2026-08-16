import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('nav');

  return (
    <div className="pt-32 pb-16 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {t('about')}
        </h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Welcome to Sahin Cycle Store. We are dedicated to providing the best bicycles and mechanical services in Arar.
          </p>
          {/* Add more content here */}
        </div>
      </div>
    </div>
  );
}
