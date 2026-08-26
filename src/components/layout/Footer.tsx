'use client';

import { MapPin, Smartphone, AtSign, Map, HelpCircle, MessageCircle, Wrench, Truck, ShieldCheck, ChevronRight, Mail, Send } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const features = [
    { icon: Truck, title: isRtl ? 'توصيل سريع' : 'Free & Fast Delivery', desc: isRtl ? 'في جميع أنحاء عرعر والمنطقة الشمالية' : 'Across Arar & Northern Region' },
    { icon: Wrench, title: isRtl ? 'تجميع احترافي' : 'Professional Assembly', desc: isRtl ? 'دراجات جاهزة للركوب' : 'Ready-to-ride bike tuning' },
    { icon: ShieldCheck, title: isRtl ? 'ضمان رسمي لمدة عامين' : '2-Year Official Warranty', desc: isRtl ? 'هيكل وقطع غيار أصلية' : 'Genuine frame & component parts' },
    { icon: MessageCircle, title: isRtl ? 'دعم خبير عبر الواتساب' : 'WhatsApp Expert Support', desc: isRtl ? 'مساعدة فنية ومبيعات فورية' : 'Instant technical & sales help' },
  ];

  const categories = [
    { name: isRtl ? 'دراجات الطرق' : 'Road Bicycles', href: '/products?category=road' },
    { name: isRtl ? 'دراجات أطفال' : 'Kids BMX & Balance', href: '/products?category=kids' },
    { name: isRtl ? 'دراجات مستعملة' : 'Used Condition Bikes', href: '/products?category=used' },
    { name: isRtl ? 'صيانة وإصلاح' : 'Servicing & Repairs', href: '/services' },
    { name: isRtl ? 'إكسسوارات' : 'Accessories', href: '/products?category=accessories' },
  ];


  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Trust & Value Proposition Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 pb-16 border-b border-slate-200">
          {features.map((feat, idx) => (
            <div key={idx} className="group flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/70 shadow-sm hover:border-red-500/30 hover:shadow-md hover:shadow-red-500/5 hover:-translate-y-0.5 transition-all duration-300">
              <div className="p-3 bg-red-50 rounded-xl text-red-600 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                <feat.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-slate-900 font-medium mb-1">{feat.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16" dir={isRtl ? 'rtl' : 'ltr'}>
          
          {/* Column 1: Brand & Bio */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-3 mb-6 inline-flex">
              <Image 
                src="/logo.png"
                alt="Sahin Cycle Store Logo"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
              <span className="font-bold text-2xl tracking-tight text-slate-900">
                {isRtl ? (
                  <>دراجات <span className="text-[#e1251b]">شاهين</span></>
                ) : (
                  <>Sahin <span className="text-[#e1251b]">Cycles</span></>
                )}
              </span>
            </Link>
            
            <p className="text-sm leading-relaxed mb-6 pr-4">
              {isRtl 
                ? 'وجهتك الأولى للدراجات عالية الجودة، ومعدات الركوب، وخدمات الإصلاح الاحترافية. ارتقِ برحلتك معنا.'
                : 'Your premier destination for high-quality bicycles, riding gear, and professional repair services. Elevate your ride with us.'}
            </p>

            <div className="flex gap-3">
              {[FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all shadow-sm hover:shadow-[0_0_15px_rgba(225,37,27,0.4)] group">
                  <div className="group-hover:scale-110 transition-transform"><Icon /></div>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explore / Categories */}
          <div>
            <h3 className="text-slate-900 font-semibold text-lg mb-6">{isRtl ? 'استكشف' : 'Explore'}</h3>
            <ul className="space-y-4">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <Link href={cat.href} className="group flex items-center gap-2 hover:text-red-600 transition-colors text-sm">
                    <ChevronRight className="w-4 h-4 text-red-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care & Contact */}
          <div>
            <h3 className="text-slate-900 font-semibold text-lg mb-6">{isRtl ? 'خدمة العملاء' : 'Customer Care'}</h3>
            <div className="space-y-5">
              <a href="#" className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <span className="text-sm group-hover:text-red-600 transition-colors">{isRtl ? 'شارع الملك عبدالعزيز، حي المساعدية، عرعر' : 'King Abdulaziz Road, Al Musaadiyah, Arar'}</span>
              </a>
              <a href="tel:+966500000000" className="flex items-center gap-3 group">
                <Smartphone className="w-5 h-5 text-red-600 shrink-0" />
                <span className="text-sm group-hover:text-red-600 transition-colors" dir="ltr">+966 50 000 0000</span>
              </a>
              <a href="https://wa.me/966500000000" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                <MessageCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span className="text-sm group-hover:text-red-600 transition-colors">{isRtl ? 'تواصل عبر واتساب' : 'WhatsApp Support'}</span>
              </a>
              <a href="mailto:contact@sahincycles.com" className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-red-600 shrink-0" />
                <span className="text-sm group-hover:text-red-600 transition-colors">contact@sahincycles.com</span>
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-slate-900 font-semibold text-lg mb-6">{isRtl ? 'النشرة البريدية' : 'Newsletter'}</h3>
            <p className="text-sm mb-4">
              {isRtl ? 'احصل على تحديثات حصرية وعروض خاصة مباشرة في صندوق الوارد الخاص بك.' : 'Get exclusive updates and special offers directly to your inbox.'}
            </p>
            <form className="relative mt-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={isRtl ? 'البريد الإلكتروني...' : 'Email address...'}
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-3.5 pl-5 pr-14 text-sm text-slate-900 focus:outline-none focus:border-red-500 focus:bg-white transition-colors"
                required
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full w-10 flex items-center justify-center transition-colors"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-xs text-slate-400 mt-3">
              {isRtl ? 'نحن نحترم خصوصيتك. لا بريد مزعج.' : 'We respect your privacy. No spam.'}
            </p>
          </div>

        </div>

        {/* Bottom Copyright & Payment Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="text-sm text-slate-500">
             © 2026 Sahin Cycles. {isRtl ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex gap-4 text-sm">
              <a href="#" className="hover:text-red-600 transition-colors">{isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
              <span className="text-slate-300">•</span>
              <a href="#" className="hover:text-red-600 transition-colors">{isRtl ? 'الشروط والأحكام' : 'Terms & Conditions'}</a>
            </div>

            {/* Payment Badges */}
            <div className="flex gap-2 items-center" dir="ltr">
              <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-600 tracking-wider">MADA</span>
              <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-600 tracking-wider">APPLE PAY</span>
              <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-600 tracking-wider">VISA</span>
              <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-600 tracking-wider">MC</span>
              <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-600 tracking-wider">COD</span>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
