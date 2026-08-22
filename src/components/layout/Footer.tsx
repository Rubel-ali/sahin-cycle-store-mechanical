'use client';

import { MapPin, CalendarClock, Smartphone, AtSign, Map, HelpCircle, MessageCircle, Wrench } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

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

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">

          {/* Column 1: Brand */}
          <div className="flex flex-col" dir={isRtl ? 'rtl' : 'ltr'}>
            <h2 className="text-4xl leading-tight font-medium text-gray-700 mb-1">{t('title1')}</h2>
            <h2 className="text-4xl leading-tight font-semibold text-gray-900">
              <span className="text-[#e1251b]">Sahin</span> Cycles
            </h2>
            <h2 className="text-4xl leading-tight font-medium text-gray-700 mb-6">{t('title2')}</h2>
            
            <p className="text-gray-500 text-sm leading-relaxed mb-8 pr-4">
              {isRtl 
                ? 'وجهتك الأولى للدراجات عالية الجودة وخدمات الإصلاح الاحترافية وسكوترات الأطفال في عرعر.'
                : 'Your premier destination for high-quality bicycles, professional repair services, and kids scooters in Arar.'}
            </p>

            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#e1251b] hover:border-[#e1251b] hover:text-white transition-all shadow-sm hover:shadow-md group">
                <div className="group-hover:scale-110 transition-transform"><FacebookIcon /></div>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#e1251b] hover:border-[#e1251b] hover:text-white transition-all shadow-sm hover:shadow-md group">
                <div className="group-hover:scale-110 transition-transform"><InstagramIcon /></div>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#e1251b] hover:border-[#e1251b] hover:text-white transition-all shadow-sm hover:shadow-md group">
                <div className="group-hover:scale-110 transition-transform"><TwitterIcon /></div>
              </a>
            </div>
          </div>

          {/* Column 2: Our Location */}
          <div dir={isRtl ? 'rtl' : 'ltr'}>
            <h3 className="text-sm font-bold text-gray-800 mb-6 tracking-wider uppercase">{t('location')}</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <MapPin className="w-10 h-10 text-[#e1251b] shrink-0" strokeWidth={1.5} />
                <p className="text-gray-500 text-sm leading-relaxed mt-2">{t('address')}</p>
              </div>
              <div className="flex items-start gap-4 group">
                <CalendarClock className="w-10 h-10 text-[#e1251b] shrink-0" strokeWidth={1.5} />
                <p className="text-gray-500 text-sm leading-relaxed mt-2">{t('hours')}</p>
              </div>
              <a href="#" className="flex items-start gap-4 group hover:opacity-80 transition-opacity">
                <Map className="w-10 h-10 text-[#e1251b] shrink-0" strokeWidth={1.5} />
                <p className="text-gray-500 text-sm leading-relaxed mt-2 group-hover:text-[#e1251b] transition-colors">
                  {isRtl ? 'عرض على الخريطة' : 'View on Map'}
                </p>
              </a>
              <a href="#" className="flex items-start gap-4 group hover:opacity-80 transition-opacity">
                <Wrench className="w-10 h-10 text-[#e1251b] shrink-0" strokeWidth={1.5} />
                <p className="text-gray-500 text-sm leading-relaxed mt-2 group-hover:text-[#e1251b] transition-colors">
                  {isRtl ? 'مركز خدمة الصيانة' : 'Repair & Service Center'}
                </p>
              </a>
            </div>
          </div>

          {/* Column 3: More Information */}
          <div dir={isRtl ? 'rtl' : 'ltr'}>
            <h3 className="text-sm font-bold text-gray-800 mb-6 tracking-wider uppercase">{t('info')}</h3>
            <div className="space-y-6">
              <a href="tel:+966500000000" className="flex items-start gap-4 group hover:opacity-80 transition-opacity">
                <Smartphone className="w-10 h-10 text-[#e1251b] shrink-0" strokeWidth={1.5} />
                <p className="text-gray-500 text-sm leading-relaxed mt-2 group-hover:text-[#e1251b] transition-colors" dir="ltr">+966 50 000 0000</p>
              </a>
              <a href="#" className="flex items-start gap-4 group hover:opacity-80 transition-opacity">
                <MessageCircle className="w-10 h-10 text-[#e1251b] shrink-0" strokeWidth={1.5} />
                <p className="text-gray-500 text-sm leading-relaxed mt-2 group-hover:text-[#e1251b] transition-colors">
                  {isRtl ? 'تواصل عبر واتساب' : 'WhatsApp Support'}
                </p>
              </a>
              <a href="mailto:contact@sahincycle.com" className="flex items-start gap-4 group hover:opacity-80 transition-opacity">
                <AtSign className="w-10 h-10 text-[#e1251b] shrink-0" strokeWidth={1.5} />
                <p className="text-gray-500 text-sm leading-relaxed mt-2 group-hover:text-[#e1251b] transition-colors">contact@sahincycle.com</p>
              </a>
              <a href="#" className="flex items-start gap-4 group hover:opacity-80 transition-opacity">
                <HelpCircle className="w-10 h-10 text-[#e1251b] shrink-0" strokeWidth={1.5} />
                <p className="text-gray-500 text-sm leading-relaxed mt-2 group-hover:text-[#e1251b] transition-colors">
                  {isRtl ? 'الأسئلة الشائعة والدعم' : 'FAQ & Support'}
                </p>
              </a>
            </div>
          </div>

          {/* Column 4: Subscribe */}
          <div dir={isRtl ? 'rtl' : 'ltr'}>
            <h3 className="text-sm font-bold text-gray-800 mb-6 tracking-wider uppercase">{t('subscribe')}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {isRtl 
                ? 'اشترك للحصول على التحديثات والوصول إلى العروض الحصرية والمزيد.'
                : 'Subscribe to receive updates, access to exclusive deals, and more.'}
            </p>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#e1251b] focus:ring-1 focus:ring-[#e1251b] transition-all bg-gray-50 text-gray-800"
                required
              />
              <button
                type="submit"
                className="bg-[#e1251b] hover:bg-red-700 text-white font-bold text-sm tracking-wider uppercase py-3.5 px-8 rounded-lg self-start transition-all shadow-md hover:shadow-lg"
              >
                {t('signUp')}
              </button>
            </form>
            <p className="text-gray-400 text-xs leading-relaxed mt-4">
              {isRtl 
                ? 'بالاشتراك، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا.'
                : 'By subscribing, you agree to our Terms of Service and Privacy Policy.'}
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500" dir={isRtl ? 'rtl' : 'ltr'}>
          <p>
            {isRtl 
              ? `© ${new Date().getFullYear()} دراجات شاهين. جميع الحقوق محفوظة.` 
              : `© ${new Date().getFullYear()} Sahin Cycles. All rights reserved.`}
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#e1251b] transition-colors">{isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
            <a href="#" className="hover:text-[#e1251b] transition-colors">{isRtl ? 'شروط الخدمة' : 'Terms of Service'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
