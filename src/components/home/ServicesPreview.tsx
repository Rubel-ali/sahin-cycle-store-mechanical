'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { Truck, ArchiveRestore, PhoneCall, CreditCard, ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';

export function ServicesPreview({ removeTopPadding = false }: { removeTopPadding?: boolean }) {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const features = [
    {
      id: 'shipping',
      icon: Truck,
      title: isRtl ? 'توصيل سريع' : 'Fast Delivery',
      description: isRtl ? 'توصيل سريع في جميع أنحاء المملكة' : 'Fast delivery across KSA',
    },
    {
      id: 'return',
      icon: ArchiveRestore,
      title: isRtl ? 'استبدال خلال 7 أيام' : '7-Day Exchange',
      description: isRtl ? 'سياسة استبدال مرنة خلال 7 أيام' : 'Hassle-free 7-day exchange policy',
    },
    {
      id: 'service',
      icon: PhoneCall,
      title: isRtl ? 'دعم ورشة العمل' : 'Workshop Support',
      description: isRtl ? 'دعم فني متخصص عبر واتساب' : 'Expert WhatsApp workshop support',
    },
    {
      id: 'payments',
      icon: CreditCard,
      title: isRtl ? 'دفع آمن' : 'Secure Payments',
      description: isRtl ? 'مدفوعات آمنة عبر مدى و أبل باي' : 'Secure Mada and Apple Pay accepted',
    }
  ];

  return (
    <section className={`bg-gray-50/30 ${removeTopPadding ? 'pt-8 pb-24' : 'py-24'}`}>
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">
            {isRtl ? 'لماذا تختار دراجات شاهين' : 'WHY CHOOSE SAHIN CYCLES'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {isRtl ? 'تجربة القيادة ' : 'The Ultimate '}<span className="text-red-600">{isRtl ? 'القصوى' : 'Riding Experience'}</span>
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            {isRtl 
              ? 'دراجات عالية الجودة، خدمات ورشة معتمدة، ورعاية عملاء يمكنك الاعتماد عليها.' 
              : 'Premium quality bicycles, certified workshop services, and customer care you can rely on.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-3xl bg-white border border-slate-200/70 shadow-sm hover:border-red-500/40 hover:shadow-xl hover:shadow-red-500/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:scale-110 transition-all flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-8 min-h-[40px]">
                {feature.description}
              </p>
              <Link 
                href="/services" 
                className="mt-auto flex items-center gap-2 text-sm font-semibold text-slate-700 group-hover:text-red-600 transition-colors"
              >
                {isRtl ? 'عرض المزيد' : 'View More'}
                <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
