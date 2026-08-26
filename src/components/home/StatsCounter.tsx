'use client';

import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

function AnimatedCounter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest).toLocaleString() + suffix);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, to, { 
        duration: 2.5, 
        ease: "easeOut" 
      });
      return () => controls.stop();
    }
  }, [isInView, motionValue, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

import { useLocale } from 'next-intl';

export function StatsCounter() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const stats = [
    { value: 5000, suffix: "+", label: isRtl ? "دراجة تم توصيلها" : "Cycles Delivered" },
    { value: 10000, suffix: "+", label: isRtl ? "خدمة صيانة مكتملة" : "Services Done" },
    { value: 15, suffix: "+", label: isRtl ? "سنوات خبرة" : "Years Experience" },
    { value: 100, suffix: "%", label: isRtl ? "قطع غيار أصلية" : "Genuine Parts" },
  ];

  return (
    <section className="my-8 md:my-14 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">
          {isRtl ? 'إرثنا وثقتكم' : 'OUR LEGACY & TRUST'}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {isRtl ? 'مبني على الثقة، مدفوع بـ ' : 'Built on Trust, Driven by '}<span className="text-red-600">{isRtl ? 'الأداء' : 'Performance'}</span>
        </h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto">
          {isRtl 
            ? 'وجهتك الأولى في عرعر للحصول على قطع غيار الدراجات الأصلية والإصلاحات المعتمدة من الخبراء.' 
            : 'Your premier destination in Arar for genuine bicycle components and certified expert repairs.'}
        </p>
      </div>

      <div className="bg-red-600 rounded-2xl md:rounded-3xl shadow-lg overflow-hidden py-8 sm:py-10 md:py-12 px-6 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-xs sm:text-sm md:text-base font-semibold text-white/90 mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
