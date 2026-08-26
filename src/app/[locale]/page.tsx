import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoryCards } from '@/components/home/CategoryCards';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { PromoSection } from '@/components/home/PromoSection';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { StatsCounter } from '@/components/home/StatsCounter';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { GalleryStrip } from '@/components/home/GalleryStrip';
import { BikeFeaturesInfo } from '@/components/home/BikeFeaturesInfo';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQSection } from '@/components/home/FAQSection';
import { prisma } from '@/lib/prisma';
import { getLocale } from 'next-intl/server';

export const revalidate = 300;

export default async function HomePage() {
  const products = await prisma.product.findMany();

  const locale = await getLocale();
  const isRtl = locale === 'ar';

  return (
    <>
      <HeroBanner />
      <CategoryCards />
      <FeaturedProducts products={products} />
      <PromoSection />
      <ServicesPreview />
      <StatsCounter />
      <WhyChooseUs />
      <GalleryStrip />
      <BikeFeaturesInfo />
      <Testimonials />
      <FAQSection />

      {/* Map Embed Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-red-600 text-sm font-bold tracking-wider mb-4">
              {isRtl ? 'قم بزيارة معرضنا' : 'VISIT OUR SHOWROOM'}
            </span>
            <h2 className="text-4xl font-bold text-slate-900">
              {isRtl ? 'اكتشف متجر دراجات شاهين' : 'Find Sahin Cycles Store'}
            </h2>
          </div>

          {/* Map Container */}
          <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl border border-white/10 shadow-2xl bg-[#090d16] overflow-hidden">
            
            {/* Floating Info Card */}
            <div className={`absolute top-6 ${isRtl ? 'right-6' : 'left-6'} z-10 w-[90%] max-w-sm bg-[#090d16]/85 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl`}>
              <h3 className="text-white font-bold text-xl mb-4">{isRtl ? 'دراجات شاهين' : 'Sahin Cycles'}</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="mt-0.5 text-red-500">📍</span>
                  <p>{isRtl ? 'شارع الملك عبدالعزيز' : 'King Abdulaziz Road'}<br/>{isRtl ? 'حي المساعدية، عرعر، السعودية' : 'Al Musaadiyah, Arar, KSA'}</p>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="mt-0.5 text-red-500">⏰</span>
                  <p dir={isRtl ? 'rtl' : 'ltr'}>{isRtl ? 'الإثنين - السبت: 9:00 ص - 10:00 م' : 'Mon - Sat: 9:00 AM - 10:00 PM'}<br/>{isRtl ? 'الجمعة: 4:00 م - 10:00 م' : 'Friday: 4:00 PM - 10:00 PM'}</p>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="mt-0.5 text-red-500">📞</span>
                  <p dir="ltr">+966 50 000 0000</p>
                </div>
              </div>

              <a 
                href="https://maps.google.com/?q=Arar+Saudi+Arabia" 
                target="_blank" 
                rel="noreferrer"
                className="block w-full py-3 bg-red-600 hover:bg-red-700 text-white text-center rounded-xl font-medium transition-colors"
              >
                {isRtl ? 'احصل على الاتجاهات' : 'Get Directions'}
              </a>
            </div>

            <iframe
              title="Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111003.52988165787!2d41.015233!3d30.983334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1531e28f328109bf%3A0x86ea89d53d8ec460!2sArar%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              className="grayscale invert contrast-125 opacity-80"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
