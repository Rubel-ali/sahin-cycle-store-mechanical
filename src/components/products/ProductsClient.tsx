'use client';

import { useTranslations, useLocale } from 'next-intl';
import { products } from '@/data/products';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Search, ArrowRightLeft, Filter, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function ProductsClient() {
  const t = useTranslations('productsPage');
  const catT = useTranslations('categories');
  const commonT = useTranslations('common');
  const locale = useLocale();

  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = ['new', 'used', 'refurbished', 'kids', 'scooters', 'accessories'];
  const conditions = ['new', 'used']; // Can be expanded

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleCondition = (cond: string) => {
    setSelectedConditions(prev => 
      prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedCategories([]);
    setSelectedConditions([]);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const nameEn = product.name.en.toLowerCase();
        const nameAr = product.name.ar.toLowerCase();
        if (!nameEn.includes(query) && !nameAr.includes(query)) {
          return false;
        }
      }

      // Price
      if (minPrice && product.price < parseFloat(minPrice)) return false;
      if (maxPrice && product.price > parseFloat(maxPrice)) return false;

      // Category
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // Condition
      if (selectedConditions.length > 0 && product.condition && !selectedConditions.includes(product.condition)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, minPrice, maxPrice, selectedCategories, selectedConditions]);

  return (
    <section className="bg-gray-50 py-12 md:py-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
            <p className="text-gray-500">{t('subtitle')}</p>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden flex items-center justify-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Filter size={18} />
            {t('filter')}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 relative">
          
          {/* Sidebar Overlay (Mobile) */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden" 
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar / Filters */}
          <div className={`fixed inset-y-0 ${locale === 'ar' ? 'right-0' : 'left-0'} z-50 w-[280px] bg-white p-6 shadow-xl transform transition-transform duration-300 ease-in-out md:relative md:transform-none md:shadow-none md:w-[260px] lg:w-[280px] md:p-0 md:bg-transparent md:z-auto h-full overflow-y-auto md:overflow-visible ${isSidebarOpen ? 'translate-x-0' : (locale === 'ar' ? 'translate-x-full' : '-translate-x-full')} md:translate-x-0`}>
            
            <div className="flex justify-between items-center mb-6 md:hidden">
              <h2 className="text-xl font-bold text-gray-900">{t('filter')}</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-800">
                <X size={24} />
              </button>
            </div>

            <div className="bg-white md:border md:border-gray-100 md:rounded-lg md:shadow-sm md:p-6 space-y-8">
              
              {/* Search */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">{t('search')}</h3>
                <div className="relative">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('search')}
                    className="w-full border border-gray-200 rounded-md py-2 px-3 pl-9 focus:outline-none focus:ring-1 focus:ring-[#9f2a2a] focus:border-[#9f2a2a] transition-colors"
                  />
                  <Search size={16} className={`absolute ${locale === 'ar' ? 'right-3' : 'left-3'} top-3 text-gray-400`} />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">{t('priceRange')}</h3>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder={t('minPrice')}
                    className="w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#9f2a2a] transition-colors"
                  />
                  <span className="text-gray-400">-</span>
                  <input 
                    type="number" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder={t('maxPrice')}
                    className="w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#9f2a2a] transition-colors"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">{t('category')}</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div 
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-[#9f2a2a] border-[#9f2a2a]' : 'border-gray-300 group-hover:border-[#9f2a2a]'}`}
                        onClick={() => toggleCategory(cat)}
                      >
                        {selectedCategories.includes(cat) && <span className="text-white text-xs">✓</span>}
                      </div>
                      <span className="text-gray-600 group-hover:text-gray-900 select-none" onClick={() => toggleCategory(cat)}>{catT(cat as any) || cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">{t('condition')}</h3>
                <div className="space-y-2">
                  {conditions.map(cond => (
                    <label key={cond} className="flex items-center gap-3 cursor-pointer group">
                      <div 
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedConditions.includes(cond) ? 'bg-[#9f2a2a] border-[#9f2a2a]' : 'border-gray-300 group-hover:border-[#9f2a2a]'}`}
                        onClick={() => toggleCondition(cond)}
                      >
                        {selectedConditions.includes(cond) && <span className="text-white text-xs">✓</span>}
                      </div>
                      <span className="text-gray-600 group-hover:text-gray-900 capitalize select-none" onClick={() => toggleCondition(cond)}>{t('condition')} {cond}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                onClick={clearFilters}
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md transition-colors"
              >
                {t('clearFilters')}
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-10 rounded-lg text-center shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noResults')}</h3>
                <button 
                  onClick={clearFilters}
                  className="text-[#9f2a2a] hover:underline"
                >
                  {t('clearFilters')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative bg-white transition-all duration-300"
                  >
                    {/* Product Image Box */}
                    <div className="relative h-[250px] w-full flex items-center justify-center">
                      <Image 
                        src={product.images[0]} 
                        alt={product.name[locale as 'en' | 'ar']} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="text-center px-4 mt-2 pb-4">
                      <h3 className="text-[17px] font-semibold text-[#003057] mb-1">
                        {product.name[locale as 'en' | 'ar']}
                      </h3>
                      <p className="text-[15px] text-[#8a9bb2] mb-2 capitalize">
                        {catT(product.category as any) || product.category}
                      </p>
                      <p className="text-base font-bold text-[#e1251b]">
                        {commonT('currency')} {product.price}.00
                      </p>
                      
                      {/* Icons Bar */}
                      <div className="mt-5 flex justify-center items-center bg-white shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-gray-50 w-max mx-auto">
                        <button className="w-12 h-12 flex items-center justify-center text-[#8a9bb2] hover:text-[#e1251b] transition-colors border-r border-gray-50">
                          <ShoppingCart size={18} strokeWidth={1.5} />
                        </button>
                        <button className="w-12 h-12 flex items-center justify-center text-[#8a9bb2] hover:text-[#e1251b] transition-colors border-r border-gray-50">
                          <Search size={18} strokeWidth={1.5} />
                        </button>
                        <button className="w-12 h-12 flex items-center justify-center text-[#8a9bb2] hover:text-[#e1251b] transition-colors border-r border-gray-50">
                          <ArrowRightLeft size={18} strokeWidth={1.5} />
                        </button>
                        <button className="w-12 h-12 flex items-center justify-center text-[#8a9bb2] hover:text-[#e1251b] transition-colors">
                          <Heart size={18} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
