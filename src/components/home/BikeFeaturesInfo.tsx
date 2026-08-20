'use client';

import { motion } from 'framer-motion';
import { Bike, Activity, Settings, Shield } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export function BikeFeaturesInfo() {
  const locale = useLocale();
  const t = useTranslations('bikeFeatures');
  const isRtl = locale === 'ar';

  const features = [
    {
      id: 1,
      icon: <Bike className="w-10 h-10 text-[#e1251b]" strokeWidth={1.5} />,
      title: t('f1Title'),
      desc: t('f1Desc'),
    },
    {
      id: 2,
      icon: <Activity className="w-10 h-10 text-[#e1251b]" strokeWidth={1.5} />,
      title: t('f2Title'),
      desc: t('f2Desc'),
    },
    {
      id: 3,
      icon: <Settings className="w-10 h-10 text-[#e1251b]" strokeWidth={1.5} />,
      title: t('f3Title'),
      desc: t('f3Desc'),
    },
    {
      id: 4,
      icon: <Shield className="w-10 h-10 text-[#e1251b]" strokeWidth={1.5} />,
      title: t('f4Title'),
      desc: t('f4Desc'),
    }
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Background Image overlapping with darken blend mode to make white transparent - Desktop Only */}
      <div className="hidden lg:flex absolute inset-0 justify-end pointer-events-none overflow-hidden" dir="ltr">
        <img 
          src="/biker-overlapping.jpg" 
          alt="Mountain Biking"
          className="lg:w-[110%] xl:w-[100%] h-full object-cover object-right mix-blend-darken origin-right lg:scale-[0.90] xl:scale-[0.95] lg:translate-x-[15%] xl:translate-x-[20%]"
        />
      </div>

      <div className={`relative z-10 flex flex-col lg:flex-row min-h-[600px] lg:min-h-[800px] ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
        {/* Left Content Side */}
        <div className="w-full lg:w-1/2 flex items-center rtl:justify-end py-16 lg:py-24 px-6 md:px-12 lg:pl-16 xl:pl-24 lg:pr-8 bg-white lg:bg-transparent relative z-20">
          <div className="max-w-lg xl:max-w-xl w-full">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-[56px] font-bold text-gray-900 mb-6 leading-[1.1] whitespace-pre-line"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {t('title1')}<br />
              <span className="text-[#e1251b]">{t('title2')}</span> {t('title3')}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-500 leading-loose mb-12 text-sm md:text-base font-light"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {t('desc')}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mb-12">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-5"
                >
                  <div className="shrink-0 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-light">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button className="px-8 py-3 bg-[#1a1a1a] hover:bg-[#e1251b] text-white text-xs font-bold tracking-wider transition-colors">
                {t('viewMore')}
              </button>
              <button className="px-8 py-3 bg-white border border-gray-200 hover:border-gray-900 text-gray-900 text-xs font-bold tracking-wider transition-colors">
                {t('watchVideo')}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Right Image Side (Empty container on desktop to take up space and hold DEMOS label, actual image on mobile) */}
        <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-0 flex-grow">
          {/* Mobile Image */}
          <div className="absolute inset-0 lg:hidden" dir="ltr">
            <img 
              src="/biker-overlapping.jpg" 
              alt="Mountain Biking"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* DEMOS Label */}
          <div className="absolute right-0 bottom-24 bg-black px-4 py-8 hidden md:flex items-center justify-center z-10">
            <span className="text-white text-xs font-bold uppercase tracking-[0.2em]" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              {t('demos')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
