'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { faqs } from '@/data/faqs';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FAQSection() {
  const t = useTranslations('faq');
  const locale = useLocale();
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{t('title')}</h2>
          <div className="w-20 h-1 bg-[#e1251b] mx-auto mt-4 rounded-full" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id} 
                className={cn(
                  "border rounded-xl transition-all duration-300 overflow-hidden",
                  isOpen ? "border-[#e1251b] shadow-md bg-white" : "border-gray-200 bg-gray-50 hover:bg-white"
                )}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-lg text-gray-800 pr-8">
                    {faq.question[locale as 'en' | 'ar']}
                  </span>
                  <ChevronDown 
                    className={cn(
                      "w-6 h-6 text-[#e1251b] flex-shrink-0 transition-transform duration-300",
                      isOpen && "rotate-180"
                    )} 
                  />
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                        <div className="h-px w-full bg-gray-100 mb-6" />
                        {faq.answer[locale as 'en' | 'ar']}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
