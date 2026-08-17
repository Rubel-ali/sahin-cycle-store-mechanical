'use client';

import { motion } from 'framer-motion';
import { Bike, Activity, Settings, Shield } from 'lucide-react';
import { useLocale } from 'next-intl';

export function BikeFeaturesInfo() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const features = [
    {
      id: 1,
      icon: <Bike className="w-10 h-10 text-[#e1251b]" strokeWidth={1.5} />,
      title: 'Bike Frame.',
      desc: 'It is a long established fact that a reader will be distracted by the readable content of.',
    },
    {
      id: 2,
      icon: <Activity className="w-10 h-10 text-[#e1251b]" strokeWidth={1.5} />,
      title: 'Bike Computer.',
      desc: 'The point of using lorem ipsum is that it has a more-or-less normal distribution of letters.',
    },
    {
      id: 3,
      icon: <Settings className="w-10 h-10 text-[#e1251b]" strokeWidth={1.5} />,
      title: 'Transmission.',
      desc: 'Many desktop publishing packages and web page editors now use lorem ipsum as their.',
    },
    {
      id: 4,
      icon: <Shield className="w-10 h-10 text-[#e1251b]" strokeWidth={1.5} />,
      title: 'Equipment.',
      desc: 'Contrary to popular belief, lorem ipsum is not simply random text. It has roots in.',
    }
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Left Content Side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center py-16 lg:py-24 px-6 lg:px-16 xl:px-24">
          <div className="max-w-2xl w-full">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-500 leading-loose mb-12 text-sm md:text-base font-light"
            >
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mb-12">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-5"
                >
                  <div className="shrink-0 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-light">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button className="px-8 py-3 bg-[#1a1a1a] hover:bg-[#e1251b] text-white text-xs font-bold tracking-wider transition-colors">
                VIEW MORE
              </button>
              <button className="px-8 py-3 bg-white border border-gray-200 hover:border-gray-900 text-gray-900 text-xs font-bold tracking-wider transition-colors">
                WATCH VIDEO
              </button>
            </motion.div>
          </div>
        </div>

        {/* Right Image Side */}
        <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-full relative">
          <img 
            src="/mountain-biker.jpg" 
            alt="Mountain Biking"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* DEMOS Label */}
          <div className="absolute right-0 bottom-24 bg-black px-4 py-8 hidden md:flex items-center justify-center">
            <span className="text-white text-xs font-bold uppercase tracking-[0.2em]" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              DEMOS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
