import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const t = useTranslations('contactPage');

  return (
    <div className="min-h-screen pt-0 bg-gray-50">
      {/* Page Header */}
      <div className="bg-[#111827] py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/service-bg.jpg')" }}
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {tNav('contact')}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 md:px-6 py-20 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left: Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('infoTitle')}</h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              {t('infoDesc')}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-[#e1251b] transition-colors duration-300">
                  <MapPin className="w-5 h-5 text-[#e1251b] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{tFooter('location')}</h4>
                  <p className="text-gray-600">{tFooter('address')}</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-[#e1251b] transition-colors duration-300">
                  <Phone className="w-5 h-5 text-[#e1251b] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{t('phoneTitle')}</h4>
                  <p className="text-gray-600" dir="ltr">+966 50 000 0000</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-[#e1251b] transition-colors duration-300">
                  <Mail className="w-5 h-5 text-[#e1251b] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{t('emailTitle')}</h4>
                  <p className="text-gray-600">contact@sahincycle.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-[#e1251b] transition-colors duration-300">
                  <Clock className="w-5 h-5 text-[#e1251b] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{t('hoursTitle')}</h4>
                  <p className="text-gray-600">{tFooter('hours')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('formTitle')}</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t('firstName')}</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e1251b] focus:ring-1 focus:ring-[#e1251b] transition-colors" placeholder={t('placeholderFirstName')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t('lastName')}</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e1251b] focus:ring-1 focus:ring-[#e1251b] transition-colors" placeholder={t('placeholderLastName')} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t('emailTitle')}</label>
                <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e1251b] focus:ring-1 focus:ring-[#e1251b] transition-colors" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t('message')}</label>
                <textarea rows={5} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e1251b] focus:ring-1 focus:ring-[#e1251b] transition-colors resize-none" placeholder={t('placeholderMessage')}></textarea>
              </div>

              <button type="button" className="w-full py-4 bg-[#1a1a1a] hover:bg-[#e1251b] text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                {t('sendBtn')}
                <Send className="w-4 h-4 rtl:-scale-x-100" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
