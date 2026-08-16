'use client';

import { useTranslations, useLocale } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import { testimonials } from '@/data/testimonials';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useCallback } from 'react';

export function Testimonials() {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  // Embla natively supports RTL by passing direction
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    direction: isRtl ? 'rtl' : 'ltr',
    align: 'start'
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-20 relative overflow-hidden group bg-white">

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('title')}</h2>
            <div className="w-20 h-1 bg-[#e1251b] mt-4 rounded-full" />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full bg-black/5 backdrop-blur-sm border border-black/10 flex items-center justify-center text-gray-900 hover:text-white hover:bg-[#e1251b] hover:border-[#e1251b] transition-colors shadow-sm"
              aria-label="Previous testimonial"
            >
              {isRtl ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full bg-black/5 backdrop-blur-sm border border-black/10 flex items-center justify-center text-gray-900 hover:text-white hover:bg-[#e1251b] hover:border-[#e1251b] transition-colors shadow-sm"
              aria-label="Next testimonial"
            >
              {isRtl ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef} dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="flex -ml-4 rtl:-mr-4 rtl:ml-0">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 rtl:pr-4 rtl:pl-0"
              >
                <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 h-full relative">
                  <Quote className="absolute top-6 right-8 w-12 h-12 text-[#e1251b]/20" />
                  <div className="flex gap-1 mb-6 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-[#e1251b] fill-[#e1251b]' : 'text-gray-600 fill-gray-600'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 relative z-10 leading-relaxed text-lg min-h-[80px]">
                    "{testimonial.text[locale as 'en' | 'ar']}"
                  </p>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 bg-[#e1251b]/20 rounded-full flex items-center justify-center text-[#e1251b] font-bold text-lg">
                      {testimonial.name[locale as 'en' | 'ar'].charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name[locale as 'en' | 'ar']}</h4>
                      <p className="text-sm text-gray-500">Verified Customer</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
