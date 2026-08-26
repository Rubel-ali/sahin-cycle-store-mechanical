'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function GalleryStrip({ showButton = true }: { showButton?: boolean }) {
  const commonT = useTranslations('common');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const topImages = [
    '/gallery/gallery-1.png',
    '/gallery/gallery-2.png',
    '/gallery/gallery-3.png',
    '/gallery/gallery-4.png',
  ];

  const bottomImages = [
    '/categories/bike-1.jpg',
    '/categories/bike-2.jpg',
    '/categories/bike-3.jpg',
    '/categories/bike-4.jpg',
    '/mountain-biker.jpg',
    '/kids_bike_bg.jpg',
  ];

  return (
    <section className="pt-6 sm:pt-8 md:pt-10 pb-12 relative overflow-hidden group bg-white">
      {/* Section Header */}
      <div className="text-center px-4 mb-6 sm:mb-8 relative z-10">
        <span className="text-xs sm:text-sm font-bold tracking-widest text-red-600 uppercase mb-2 inline-block">
          {isRtl ? 'رحلة بصرية' : 'VISUAL JOURNEY'}
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {isRtl ? 'معرض ' : 'Our Cycle '}<span className="text-red-600">{isRtl ? 'الدراجات' : 'Gallery'}</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          {isRtl 
            ? 'استكشف مجموعتنا المختارة من الدراجات، ولحظات العمل في الورشة، ومغامرات المجتمع في جميع أنحاء المدينة.' 
            : 'Explore our curated collection of rides, workshop moments, and community adventures across the city.'}
        </p>
        <div className="w-12 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="flex flex-col gap-4" dir="ltr">
        {/* Top Row - Right to Left */}
        <div className="relative z-10 flex w-[200vw] sm:w-[150vw] lg:w-[120vw]">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            className="flex gap-4 px-2 whitespace-nowrap min-w-full"
          >
            {[...topImages, ...topImages].map((src, index) => (
              <div key={`top-${index}`} className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 rounded-xl overflow-hidden group/item border border-gray-100 bg-gray-50">
                <Image 
                  src={src} 
                  alt="Store Gallery" 
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-cover group-hover/item:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover/item:bg-black/0 transition-colors duration-500" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Row - Left to Right */}
        <div className="relative z-10 flex w-[200vw] sm:w-[150vw] lg:w-[120vw]">
          <motion.div 
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            className="flex gap-4 px-2 whitespace-nowrap min-w-full"
          >
            {[...bottomImages, ...bottomImages].map((src, index) => (
              <div key={`bottom-${index}`} className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 rounded-xl overflow-hidden group/item border border-gray-100 bg-gray-50">
                <Image 
                  src={src} 
                  alt="Store Gallery" 
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-cover group-hover/item:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover/item:bg-black/0 transition-colors duration-500" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {showButton && (
        <div className="text-center mt-12 relative z-10">
          <Link 
            href="/gallery" 
            className="inline-block px-8 py-3 bg-black/5 backdrop-blur-sm border border-black/10 hover:bg-[#e1251b] hover:border-[#e1251b] hover:text-white text-gray-900 font-medium rounded-lg transition-colors shadow-sm"
          >
            {commonT('viewAll')}
          </Link>
        </div>
      )}
    </section>
  );
}
