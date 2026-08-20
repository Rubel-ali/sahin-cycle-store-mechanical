'use client';

import { useTranslations, useLocale } from 'next-intl';
import { products } from '@/data/products';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Search, ArrowRightLeft } from 'lucide-react';
import { useState } from 'react';

export function FeaturedProducts() {
  const t = useTranslations('featured');
  const commonT = useTranslations('common');
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState('new');

  const tabs = [
    { key: 'new', label: t('tabs.new') },
    { key: 'best', label: t('tabs.best') },
    { key: 'viewed', label: t('tabs.viewed') }
  ];

  const getFilteredProducts = () => {
    let list = products.filter(p => p.featured);
    
    if (activeTab === 'new') {
      // New Arrivals: show products with condition 'new'
      list = list.filter(p => p.condition === 'new');
    } else if (activeTab === 'best') {
      // Bestsellers: show high-end/popular items (simulated with price >= 1000)
      list = list.filter(p => p.price >= 1000);
    } else if (activeTab === 'viewed') {
      // Most Viewed: show affordable/frequently viewed items (simulated with price < 1000)
      list = list.filter(p => p.price < 1000);
    }
    
    return list;
  };

  const displayedProducts = getFilteredProducts();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-500 mb-10 text-base">
            {t('subtitle')}
          </p>
          
          <div className="flex justify-center items-center gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-1 text-sm font-bold tracking-wide uppercase transition-colors border-b-2 ${
                  activeTab === tab.key 
                    ? 'text-gray-800 border-[#9f2a2a]' 
                    : 'text-gray-500 hover:text-gray-800 border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {displayedProducts.slice(0, 8).map((product, index) => (
            <motion.div
              key={`${product.id}-${activeTab}`} // Ensure animation triggers on tab change
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white transition-all duration-300"
            >
              {/* Product Image Box */}
              <div className="relative h-[250px] flex items-center justify-center">
                <img 
                  src={product.images[0]} 
                  alt={product.name[locale as 'en' | 'ar']} 
                  className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Product Info */}
              <div className="text-center px-4 mt-2 pb-4">
                <h3 className="text-base font-semibold text-gray-800 mb-1">
                  {product.name[locale as 'en' | 'ar']}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  {t('category')}
                </p>
                <p className="text-base font-bold text-[#e1251b]">
                  {commonT('currency')} {product.price}.00
                </p>
                
                {/* Icons Bar (moved below price) */}
                <div className="mt-4 flex justify-center items-center bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-50 w-max mx-auto">
                  <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#e1251b] transition-colors border-r border-gray-100">
                    <ShoppingCart size={16} strokeWidth={1.5} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#e1251b] transition-colors border-r border-gray-100">
                    <Search size={16} strokeWidth={1.5} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#e1251b] transition-colors border-r border-gray-100">
                    <ArrowRightLeft size={16} strokeWidth={1.5} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#e1251b] transition-colors">
                    <Heart size={16} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
