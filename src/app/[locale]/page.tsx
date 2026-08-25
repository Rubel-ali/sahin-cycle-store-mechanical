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

export const revalidate = 300;

export default async function HomePage() {
  const products = await prisma.product.findMany();

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
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="w-full h-[400px] md:h-[500px]">
            <iframe
              title="Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111003.52988165787!2d41.015233!3d30.983334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1531e28f328109bf%3A0x86ea89d53d8ec460!2sArar%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
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
