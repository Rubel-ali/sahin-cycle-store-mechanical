'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';

export function PromoSection() {
  const t = useTranslations('promo');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const features = [
    { num: '1.', title: t('f1Title'), desc: t('f1Desc') },
    { num: '2.', title: t('f2Title'), desc: t('f2Desc') },
    { num: '3.', title: t('f3Title'), desc: t('f3Desc') },
    { num: '4.', title: t('f4Title'), desc: t('f4Desc') },
  ];

  return (
    <section className="relative w-full bg-[#1c1c1c] overflow-hidden py-24">
      {/* Background Graphic/Texture */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url("/image.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.6
        }}
      />
      {/* Dark gradient overlay to ensure text is always readable */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-[#1c1c1c] via-[#1c1c1c]/80 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 whitespace-pre-line"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {t('title1').split('\n')[0]} <br />
              {t('title1').split('\n')[1] && <span>{t('title1').split('\n')[1]} </span>}
              <span className="text-[#e1251b]">{t('title2').trim()}</span>{t('title3')}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base text-gray-400 mb-8 max-w-md leading-relaxed"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {t('desc')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-row gap-4 mb-16"
            >
              <Link 
                href="/products" 
                className="px-8 py-3 bg-[#e1251b] hover:bg-red-700 text-white text-sm font-semibold tracking-wider uppercase transition-colors"
              >
                {t('viewMore')}
              </Link>
              <Link 
                href="/products" 
                className="px-8 py-3 bg-transparent border border-white hover:bg-white hover:text-black text-white text-sm font-semibold tracking-wider uppercase transition-all"
              >
                {t('shopNow')}
              </Link>
            </motion.div>

            {/* Features Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-[#e1251b] text-3xl md:text-4xl font-bold mb-2">{feature.num}</span>
                  <h4 className="text-white text-sm font-bold mb-1">{feature.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed hidden sm:block">{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Video Embed */}
          <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full aspect-video bg-black rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10"
            >
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/xQ_IQS3VKjA?autoplay=0&mute=0&controls=1&rel=0" 
                title="Mountain Biking Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </motion.div>
            
            {/* Demos vertical tab (matches original screenshot style) */}
            <div className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 bg-black px-2 py-8 hidden lg:flex items-center justify-center border-l border-white/10">
              <span className="text-white text-xs font-bold uppercase tracking-[0.2em] rotate-90 whitespace-nowrap">{t('demos')}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
