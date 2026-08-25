'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';

import { useTranslations, useLocale } from 'next-intl';

export function CategoryCards() {
  const t = useTranslations('categoryCards');
  const locale = useLocale();

  const categories = [
    {
      id: 1,
      title: t('cat1'),
      image: '/categories/bike-1.jpg',
      link: '/products',
    },
    {
      id: 2,
      title: t('cat2'),
      image: '/categories/bike-2.jpg',
      link: '/products',
    },
    {
      id: 3,
      title: t('cat3'),
      image: '/categories/bike-3.jpg',
      link: '/products',
    }
  ];

  return (
    <div className="w-full bg-white relative flex flex-col">
      <section className="relative z-20 -mt-16 sm:-mt-20 md:-mt-16 mb-2 md:mb-16 py-4 md:py-0 px-4 lg:px-0 w-full max-w-7xl mx-auto bg-transparent">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative aspect-[4/3] lg:aspect-[4/3] xl:aspect-[1.5/1] overflow-hidden cursor-pointer bg-[#111] rounded-2xl md:rounded-none shadow-xl md:shadow-none"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                style={{ backgroundImage: `url(${cat.image})` }}
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end">
                <h3 className="text-white text-2xl lg:text-3xl font-bold leading-tight mb-6 whitespace-pre-line" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                  {cat.title}
                </h3>
                <Link
                  href={cat.link}
                  className="text-white text-xs font-bold tracking-wider relative w-max pb-1 overflow-hidden"
                >
                  {t('viewMore')}
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white opacity-30" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
