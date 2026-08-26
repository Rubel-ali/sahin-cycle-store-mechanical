'use client';

import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

export function HeroBanner() {
  const locale = useLocale();
  const t = useTranslations('heroSlider');

  const slides = [
    {
      id: 1,
      title1: t('slide1.title1'),
      title2: t('slide1.title2'),
      title3: t('slide1.title3'),
      desc: t('slide1.desc'),
      // Since image generation is temporarily down, using a highly relevant placeholder.
      bikeImg: '/slide1.png',
      bgImg: '/bg.png',
      blendMode: '', // Default behavior
      btn1Text: t('slide1.btn1'),
      btn1Link: '/services',
      btn2Text: t('slide1.btn2'),
      btn2Link: '/services',
    },
    {
      id: 2,
      title1: t('slide2.title1'),
      title2: t('slide2.title2'),
      title3: t('slide2.title3'),
      desc: t('slide2.desc'),
      bikeImg: '/slide3.png',
      bgImg: '/bg3.png',
      blendMode: '', // Default behavior
      btn1Text: t('slide2.btn1'),
      btn1Link: '/products',
      btn2Text: t('slide2.btn2'),
      btn2Link: '/products',
    },
    {
      id: 3,
      title1: t('slide3.title1'),
      title2: t('slide3.title2'),
      title3: t('slide3.title3'),
      desc: t('slide3.desc'),
      bikeImg: '/slide4.png',
      bgImg: '/bg2.png',
      blendMode: '', // Removed mix-blend-screen because background was manually removed
      btn1Text: t('slide3.btn1'),
      btn1Link: '/products',
      btn2Text: t('slide3.btn2'),
      btn2Link: '/products',
    }
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, direction: locale === 'ar' ? 'rtl' : 'ltr' },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full min-h-[560px] md:h-[100vh] md:min-h-[600px] max-h-[900px] bg-[#0a0a0a] overflow-hidden group font-sans">
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex w-full h-full">
          {slides.map((slide, index) => (
            <div className="relative flex-[0_0_100%] min-w-0 w-full h-full" key={slide.id}>
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.bgImg})` }}
                />
                {/* Dark overlay to match screenshot's moody feel */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/60 to-[#080d1a]/95" />
              </div>

              {/* Content */}
              <div className="container mx-auto h-full relative z-10 flex flex-col md:flex-row items-center justify-start md:justify-between text-center sm:text-left md:text-left px-4 md:px-24 pt-6 sm:pt-8 md:pt-0 mt-0 md:mt-0 pb-0 md:pb-0 gap-4 md:gap-12 max-w-[1600px] min-h-[560px] md:min-h-[600px]">

                {/* Left side: Bicycle Image */}
                <div className="w-full md:w-1/2 flex justify-center items-center relative pt-0 mt-0 mb-4 md:mb-0 md:h-full">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0, x: selectedIndex === index ? 0 : -50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`relative bg-transparent w-full md:w-[130%] max-w-[950px] aspect-[4/3] h-64 sm:h-72 md:h-auto flex items-center justify-center mx-auto p-2 overflow-visible ${slide.id === 2 ? 'md:-ml-[10%] md:scale-95' :
                      slide.id === 3 ? 'md:ml-[5%] md:scale-140' :
                        'md:-ml-[10%] md:scale-110'
                      }`}
                  >
                    {/* Placeholder for the bike image until we can generate the specific green Cube bike */}
                    <Image
                      src={slide.bikeImg}
                      alt={slide.title1}
                      fill
                      className={`object-contain bg-transparent w-auto h-full max-h-60 sm:max-h-72 md:max-h-none mx-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] transition-transform ${slide.id === 3 ? 'scale-125 md:scale-100' : 'scale-110 sm:scale-100 md:scale-100'} ${slide.blendMode}`}
                      priority={index === 0}
                    />
                  </motion.div>
                </div>

                {/* Right side: Text and Buttons */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center sm:items-start md:items-start md:px-8 lg:px-12">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0, y: selectedIndex === index ? 0 : 30 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl sm:text-4xl md:text-[3.5rem] lg:text-[4.5rem] font-black md:font-bold text-white leading-tight md:leading-[1.1] mb-2 md:mt-0 md:mb-6 tracking-tight text-center sm:text-left md:text-left drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {slide.title1} <br />
                    <span className="text-[#e1251b]">{slide.title2}</span> {slide.title3}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0, y: selectedIndex === index ? 0 : 30 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-xs sm:text-sm md:text-base text-slate-300 md:text-gray-300 mb-3 md:mb-8 max-w-xs sm:max-w-md md:max-w-[500px] mx-auto sm:mx-0 md:mx-0 line-clamp-2 md:line-clamp-none leading-relaxed md:leading-loose font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {slide.desc}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0, y: selectedIndex === index ? 0 : 30 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-row gap-3 md:gap-4 justify-center sm:justify-start md:justify-start w-full sm:w-auto"
                  >
                    <Link
                      href={slide.btn1Link || "/products"}
                      className="px-5 py-2 md:px-8 md:py-3 bg-[#e1251b] hover:bg-red-700 text-white text-xs sm:text-sm md:text-xs font-bold md:font-semibold tracking-wider transition-colors"
                    >
                      {slide.btn1Text || "VIEW MORE"}
                    </Link>
                    <Link
                      href={slide.btn2Link || "/products"}
                      className="px-5 py-2 md:px-8 md:py-3 bg-transparent border border-white/60 hover:bg-white hover:text-black text-white text-xs sm:text-sm md:text-xs font-bold md:font-semibold tracking-wider transition-all"
                    >
                      {slide.btn2Text || "SHOP NOW"}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:text-[#e1251b] transition-colors p-2"
        aria-label="Previous slide"
      >
        <ChevronLeft size={36} strokeWidth={1} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:text-[#e1251b] transition-colors p-2"
        aria-label="Next slide"
      >
        <ChevronRight size={36} strokeWidth={1} />
      </button>

      {/* Slide Indicators / Demos box (as in image) */}
      <div className="absolute right-0 bottom-16 z-20 bg-black px-6 py-5 hidden md:flex flex-col items-center justify-center min-w-[100px]">
        <span className="text-white/20 text-4xl font-bold leading-none mb-1">0{selectedIndex + 1}</span>
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">DEMOS</span>
      </div>
    </section>
  );
}
