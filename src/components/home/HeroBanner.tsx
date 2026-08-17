'use client';

import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    title1: 'Cube Nutrail',
    title2: 'Hybrid',
    title3: ' Bicycle.',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less.',
    // Since image generation is temporarily down, using a highly relevant placeholder.
    bikeImg: '/products/bike-1.png', 
    bgImg: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=2070&auto=format&fit=crop',
    blendMode: '', // Default behavior
  },
  {
    id: 2,
    title1: 'Cube Road',
    title2: 'Cyclocross',
    title3: ' Bike.',
    desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less.',
    bikeImg: '/products/bike.jpg',
    bgImg: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?q=80&w=2074&auto=format&fit=crop',
    blendMode: '', // Default behavior
  }
];

export function HeroBanner() {
  const locale = useLocale();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
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
    <section className="relative w-full h-[100vh] min-h-[600px] max-h-[900px] bg-[#0a0a0a] overflow-hidden group font-sans">
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
                <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="container mx-auto px-12 md:px-24 h-full relative z-10 flex flex-col md:flex-row items-center justify-between max-w-[1600px]">
                
                {/* Left side: Bicycle Image */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center relative mt-16 md:mt-0">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0, x: selectedIndex === index ? 0 : -50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`relative w-[120%] max-w-[800px] aspect-[4/3] -ml-[10%] ${slide.blendMode}`}
                  >
                    {/* Placeholder for the bike image until we can generate the specific green Cube bike */}
                    <Image
                      src={slide.bikeImg}
                      alt={slide.title1}
                      fill
                      className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]"
                      priority={index === 0}
                    />
                  </motion.div>
                </div>

                {/* Right side: Text and Buttons */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-start pt-4 md:pt-0 md:pl-8 lg:pl-12 mb-10 md:mb-0">
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0, y: selectedIndex === index ? 0 : 30 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-bold text-white leading-[1.1] mb-6 tracking-tight"
                  >
                    {slide.title1} <br/>
                    <span className="text-[#e1251b]">{slide.title2}</span> {slide.title3}
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0, y: selectedIndex === index ? 0 : 30 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-sm md:text-base text-gray-300 mb-8 max-w-[500px] leading-loose font-light"
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {slide.desc}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0, y: selectedIndex === index ? 0 : 30 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-row gap-4"
                  >
                    <Link 
                      href="/products" 
                      className="px-8 py-3 bg-[#e1251b] hover:bg-red-700 text-white text-xs font-semibold tracking-wider transition-colors"
                    >
                      VIEW MORE
                    </Link>
                    <Link 
                      href="/products" 
                      className="px-8 py-3 bg-transparent border border-white/60 hover:bg-white hover:text-black text-white text-xs font-semibold tracking-wider transition-all"
                    >
                      SHOP NOW
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
