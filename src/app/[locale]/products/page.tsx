import { useTranslations } from 'next-intl';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';

export default function ProductsPage() {
  const t = useTranslations('nav');

  return (
    <div className="min-h-screen pt-0">
      <FeaturedProducts removeTopPadding={true} />
    </div>
  );
}
