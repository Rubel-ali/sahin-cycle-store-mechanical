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
          <div className="flex-1 w-full flex flex-col justify-center">
            {/* Top Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-800 mb-6 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-[#e1251b]"></span>
              {t('title1')} {t('title2')}
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-normal text-gray-800 mb-6 lg:whitespace-nowrap">
              {t('title1')} <span className="font-bold text-gray-900">{t('title2')}</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg max-w-lg">
              {t('desc')}
            </p>

            {/* Bottom Section: Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5 text-[#e1251b] stroke-[2]" />
                  </div>
                  <h3 className="text-sm md:text-base font-medium text-gray-800">{feature.text}</h3>
                </motion.div>
              ))}
            </div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#1a1a1a] hover:bg-[#e1251b] text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                {commonT('readMore')}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
