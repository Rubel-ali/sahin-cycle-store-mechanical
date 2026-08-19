'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Award, Users, ShieldCheck, Zap } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function WhyChooseUs() {
  const t = useTranslations('whyUs');
  const commonT = useTranslations('common');

  const features = [
    { icon: Award, text: t('exp') },
    { icon: Users, text: t('customers') },
    { icon: ShieldCheck, text: t('brands') },
    { icon: Zap, text: t('speed') },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top Section: Image and Text */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-24 max-w-6xl mx-auto">

          {/* Left side: Blob Image */}
          <div className="flex-1 lg:flex-[1.2] w-full flex justify-center lg:justify-start rtl:lg:justify-end relative lg:-ml-12 rtl:lg:-mr-12 rtl:lg:ml-0">
            {/* The yellow blob background shadow */}
            <div
              className="absolute w-[80%] h-[100%] bg-[#ffed4a] z-0 translate-x-8 translate-y-4"
              style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
            />
            {/* The actual image in a blob clip-path */}
            <div
              className="relative z-10 w-[100%] max-w-[650px] aspect-square overflow-hidden bg-gray-200"
              style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
            >
              <img
                src="/why-us-bike.png"
                alt="Bicycle riding"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side: Text and Button */}
          <div className="flex-1 w-full">
            <h2 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-normal text-gray-800 mb-6 lg:whitespace-nowrap">
              {t('title1')} <span className="font-bold text-gray-900">{t('title2')}</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-lg max-w-lg">
              {t('desc')}
            </p>
            {/* Bottom Section: Features Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-4 h-4 flex items-center justify-center mb-4">
                    {/* A hexagonal/star outline for the icon, similar to the mock's thin stroke circles */}
                    <feature.icon className="w-8 h-8 text-gray-600 stroke-1 group-hover:text-gray-900 transition-colors" />
                  </div>
                  <h3 className="text-sm md:text-base font-medium text-gray-700">{feature.text}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
