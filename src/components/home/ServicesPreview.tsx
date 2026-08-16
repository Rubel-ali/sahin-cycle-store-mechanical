'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { Truck, ArchiveRestore, PhoneCall, CreditCard } from 'lucide-react';

export function ServicesPreview() {
  const features = [
    {
      id: 'shipping',
      icon: Truck,
      title: 'FREE SHIPPING',
      description: 'Contrary to popular belief, lorem ipsum is not simply random.',
    },
    {
      id: 'return',
      icon: ArchiveRestore,
      title: 'EXCHANGE & RETURN',
      description: 'This book is a treatise on the theory of ethics, very popular during.',
    },
    {
      id: 'service',
      icon: PhoneCall,
      title: 'CUSTOMER SERVICE',
      description: 'Many desktop publishing packages and web page editors now.',
    },
    {
      id: 'payments',
      icon: CreditCard,
      title: 'INSTANT PAYMENTS',
      description: 'Looked up one of the more obscure latin words, consectetur.',
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 h-20 flex items-center justify-center">
                <feature.icon className="w-[52px] h-[52px] text-[#e1251b]" strokeWidth={1} />
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-4 tracking-wider">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-8 px-2 min-h-[60px]">
                {feature.description}
              </p>
              <Link 
                href="/services" 
                className="text-xs font-bold text-gray-700 tracking-wider uppercase border-b-2 border-[#9f2a2a] pb-1 hover:text-[#e1251b] hover:border-[#e1251b] transition-colors"
              >
                VIEW MORE
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
