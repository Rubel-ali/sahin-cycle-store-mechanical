'use client';

import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';

export function ContactCTA() {
  const t = useTranslations('contactCta');

  return (
    <section className="py-24 relative overflow-hidden bg-primary">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-overlay opacity-50"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {t('title')}
        </h2>
        <p className="text-teal-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          {t('subtitle')}
        </p>
        
        <a 
          href="https://wa.me/966000000000" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-amber-600 text-white rounded-xl text-xl font-bold transition-transform hover:scale-105 shadow-xl shadow-accent/20"
        >
          <MessageCircle className="w-6 h-6" />
          {t('button')}
        </a>
      </div>
    </section>
  );
}
