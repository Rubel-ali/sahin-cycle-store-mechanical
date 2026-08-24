"use client";

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  MapPin, Phone, Clock, Send, 
  MessageSquare, ArrowRight, CheckCircle2, AlertCircle 
} from 'lucide-react';

export default function ContactPage() {
  const tNav = useTranslations('nav');
  const t = useTranslations('contactPage');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 md:pt-28 pb-12">
      
      {/* 1. ContactHero */}
      <section className="container mx-auto px-4 text-center mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            {tNav('contact')}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            {t('subtitle')}
          </p>
        </motion.div>
      </section>

      {/* 2. QuickContactGrid */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Phone */}
          <a href="tel:+966500000000" className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{isAr ? "الخط الساخن" : "Hotline"}</h3>
            <p className="text-slate-500 font-medium" dir="ltr">+966 50 000 0000</p>
          </a>
          
          {/* WhatsApp */}
          <a href="https://wa.me/966500000000" target="_blank" rel="noreferrer" className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{isAr ? "دعم واتساب" : "WhatsApp Support"}</h3>
            <p className="text-slate-500 font-medium">{isAr ? "تحدث معنا الآن" : "Chat with us instantly"}</p>
          </a>

          {/* Location */}
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{isAr ? "المتجر والورشة" : "Store & Workshop"}</h3>
            <p className="text-slate-500 font-medium">{isAr ? "عرعر، الحدود الشمالية" : "Arar, Northern Borders"}</p>
          </a>

          {/* Business Hours */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{isAr ? "ساعات العمل" : "Business Hours"}</h3>
            <p className="text-slate-500 font-medium">{isAr ? "السبت - الخميس: ٩ ص - ٩ م" : "Sat - Thu: 9:00 AM - 9:00 PM"}</p>
          </div>
        </div>
      </section>

      {/* 3. FormAndMapSection */}
      <section className="container mx-auto px-4 mb-24">
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Column: Form */}
          <div className="p-8 md:p-12 lg:w-1/2">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 mb-4">{t('formTitle')}</h2>
              <p className="text-slate-500 leading-relaxed font-medium">{t('infoDesc')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">{isAr ? "الاسم الكامل" : "Full Name"}</label>
                  <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all font-medium" placeholder={isAr ? "محمد عبدالله" : "John Doe"} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">{isAr ? "رقم الهاتف / البريد" : "Phone / Email"}</label>
                  <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all font-medium" placeholder={isAr ? "050 000 0000" : "+966 50 000 0000"} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">{isAr ? "نوع الاستفسار" : "Inquiry Type"}</label>
                <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all cursor-pointer font-medium text-slate-700">
                  <option value="buy">{isAr ? "شراء دراجة" : "Buy a Cycle"}</option>
                  <option value="service">{isAr ? "خدمة / صيانة" : "Service / Repair"}</option>
                  <option value="parts">{isAr ? "قطع غيار" : "Spare Parts"}</option>
                  <option value="other">{isAr ? "أخرى" : "Other"}</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">{t('message')}</label>
                <textarea required rows={5} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all resize-none font-medium" placeholder={t('placeholderMessage')}></textarea>
              </div>

              <button 
                type="submit" 
                disabled={formStatus !== 'idle'}
                className={`w-full py-4 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                  formStatus === 'success' ? 'bg-green-600 shadow-green-600/30' : 
                  formStatus === 'error' ? 'bg-red-600 shadow-red-600/30' : 
                  'bg-slate-900 hover:bg-red-600 hover:shadow-red-600/30 shadow-slate-900/20'
                }`}
              >
                {formStatus === 'idle' && <>{t('sendBtn')} <Send className="w-5 h-5 rtl:-scale-x-100" /></>}
                {formStatus === 'submitting' && <span className="animate-pulse">{isAr ? "جاري الإرسال..." : "Sending..."}</span>}
                {formStatus === 'success' && <>{isAr ? "تم الإرسال بنجاح!" : "Message Sent Successfully!"} <CheckCircle2 className="w-5 h-5" /></>}
              </button>
            </form>
          </div>

          {/* Right Column: Google Map */}
          <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full bg-slate-200 overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111551.46979603525!2d41.0267202!3d30.983334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1539bb4c785d95e5%3A0xc392e21b77dbd935!2sArar%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
              className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700" 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            {/* Map Overlay Badge */}
            <div className="absolute bottom-6 left-6 right-6 md:ltr:left-auto md:rtl:right-auto md:ltr:right-6 md:rtl:left-6 md:w-80 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-red-600/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 mb-1">{isAr ? "معرض صاهين للدراجات" : "Sahin Cycle Showroom"}</h4>
                  <p className="text-slate-600 text-sm font-medium mb-3">{isAr ? "عرعر، الحدود الشمالية، المملكة العربية السعودية" : "Arar, Northern Borders Province, KSA"}</p>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-red-600 font-bold text-sm hover:text-red-700 flex items-center gap-1 group">
                    {isAr ? "احصل على الاتجاهات" : "Get Directions"} <ArrowRight className="w-4 h-4 rtl:-scale-x-100 group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. EmergencySupportCard */}
      <section className="container mx-auto px-4">
        <div className="bg-red-600 rounded-3xl p-8 md:p-12 shadow-2xl shadow-red-600/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
          
          <div className="relative z-10 text-center md:text-start flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/20 text-white rounded-full text-sm font-bold mb-6 backdrop-blur-sm">
              <AlertCircle className="w-4 h-4" /> {isAr ? "دعم الطوارئ" : "Emergency Support"}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              {isAr ? "تحتاج لإصلاح أو نقل دراجتك بشكل عاجل؟" : "Need urgent road-side cycle repair or pickup?"}
            </h2>
            <p className="text-red-100 text-lg md:text-xl font-medium max-w-xl">
              {isAr ? "اتصل بالخط الساخن لورشتنا وسنكون عندك في أسرع وقت." : "Call our workshop hotline and we will be there to assist you immediately."}
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <a href="tel:+966500000000" className="flex items-center justify-center gap-3 w-full px-8 py-5 bg-white text-red-600 rounded-2xl font-black text-lg shadow-xl hover:bg-slate-50 hover:scale-105 transition-all">
              <Phone className="w-6 h-6 fill-red-600" />
              <span dir="ltr">+966 50 000 0000</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
