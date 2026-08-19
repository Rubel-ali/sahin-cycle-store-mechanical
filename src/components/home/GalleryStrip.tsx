'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';

export function GalleryStrip() {
  const commonT = useTranslations('common');

  const images = [
    '/gallery/gallery-1.png',
    '/gallery/gallery-2.png',
    '/gallery/gallery-3.png',
    '/gallery/gallery-4.png',
  ];

  return (
    <section className="py-12 relative overflow-hidden group bg-white">
      <div className="flex flex-col gap-4" dir="ltr">
        {/* Top Row - Right to Left */}
        <div className="relative z-10 flex w-[200vw] sm:w-[150vw] lg:w-[120vw]">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            className="flex gap-4 px-2 whitespace-nowrap min-w-full"
          >
            {[...images, ...images].map((src, index) => (
              <div key={index} className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 rounded-xl overflow-hidden group/item border border-gray-100">
                <img 
                  src={src} 
                  alt="Store Gallery" 
                  className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700"
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
            {[...images.slice().reverse(), ...images.slice().reverse()].map((src, index) => (
              <div key={`bottom-${index}`} className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 rounded-xl overflow-hidden group/item border border-gray-100">
                <img 
                  src={src} 
                  alt="Store Gallery" 
                  className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover/item:bg-black/0 transition-colors duration-500" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      <div className="text-center mt-12 relative z-10">
        <Link 
          href="/gallery" 
          className="inline-block px-8 py-3 bg-black/5 backdrop-blur-sm border border-black/10 hover:bg-[#e1251b] hover:border-[#e1251b] hover:text-white text-gray-900 font-medium rounded-lg transition-colors shadow-sm"
        >
          {commonT('viewAll')}
        </Link>
      </div>
    </section>
  );
}
