"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, X, ShoppingCart, 
  Star, ChevronDown, Check, SlidersHorizontal 
} from "lucide-react";
import { mockProducts, Product, Category, WheelSize } from "@/data/mockProducts";
import { ProductCard } from "@/components/products/ProductCard";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { useTranslations, useLocale } from "next-intl";

export default function ProductsPage() {
  const t = useTranslations("productsPage");
  const locale = useLocale();
  const isAr = locale === "ar";
  
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [selectedWheelSizes, setSelectedWheelSizes] = useState<WheelSize[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOption, setSortOption] = useState<"newest" | "price_asc" | "price_desc" | "rating">("rating");
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Derived State (Filtering & Sorting)
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (priceRange < 5000) {
      result = result.filter(p => p.price <= priceRange);
    }
    if (selectedWheelSizes.length > 0) {
      result = result.filter(p => p.specs.wheelSize && selectedWheelSizes.includes(p.specs.wheelSize));
    }
    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    switch (sortOption) {
      case "price_asc": return result.sort((a, b) => a.price - b.price);
      case "price_desc": return result.sort((a, b) => b.price - a.price);
      case "rating": return result.sort((a, b) => b.rating - a.rating);
      default: return result; // "newest" fallback
    }
  }, [searchQuery, selectedCategory, priceRange, selectedWheelSizes, inStockOnly, sortOption]);

  const toggleWheelSize = (size: WheelSize) => {
    setSelectedWheelSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  // UI Sections
  const getCategoryName = (cat: Category) => {
    if (!isAr) return cat;
    switch (cat) {
      case "All": return "الكل";
      case "MTB/Adult": return "جبلي/للبالغين";
      case "Kids Bikes": return "دراجات أطفال";
      case "Road/Hybrid": return "طريق/هجين";
      case "Accessories": return "إكسسوارات";
      default: return cat;
    }
  };

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">{t("categories")}</h3>
        <div className="space-y-2">
          {(["All", "MTB/Adult", "Road/Hybrid", "Kids Bikes", "Accessories"] as Category[]).map(cat => (
            <label key={cat} onClick={() => setSelectedCategory(cat)} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategory === cat ? 'bg-red-600 border-red-600' : 'border-slate-300 group-hover:border-red-500'}`}>
                {selectedCategory === cat && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className={`font-medium ${selectedCategory === cat ? 'text-slate-900' : 'text-slate-600'}`}>
                {getCategoryName(cat)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-900">{t("maxPrice")}</h3>
          <span className="font-bold text-red-600">SAR {priceRange}</span>
        </div>
        <input 
          type="range" 
          min="100" 
          max="5000" 
          step="100"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-red-600"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>SAR 100</span>
          <span>SAR 5000+</span>
        </div>
      </div>

      {/* Wheel Size */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">{t("wheelSize")}</h3>
        <div className="flex flex-wrap gap-2">
          {(["20\"", "24\"", "26\"", "27.5\"", "29\""] as WheelSize[]).map(size => (
            <button
              key={size}
              onClick={() => toggleWheelSize(size)}
              className={`px-3 py-1.5 rounded-md text-sm font-semibold border transition-colors ${
                selectedWheelSizes.includes(size) 
                  ? "bg-slate-900 border-slate-900 text-white" 
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-900"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">{t("availability")}</h3>
        <label onClick={() => setInStockOnly(!inStockOnly)} className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${inStockOnly ? 'bg-red-600 border-red-600' : 'border-slate-300 group-hover:border-red-500'}`}>
            {inStockOnly && <Check className="w-3 h-3 text-white" />}
          </div>
          <span className="font-medium text-slate-600">{t("inStockOnly")}</span>
        </label>
      </div>

      {/* Clear Filters */}
      <button 
        onClick={() => {
          setSelectedCategory("All");
          setPriceRange(5000);
          setSelectedWheelSizes([]);
          setInStockOnly(false);
          setSearchQuery("");
        }}
        className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors"
      >
        {t("clearAllFilters")}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        
        {/* Top Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">{t("title")}</h1>
            <p className="text-slate-500 font-medium">{t("showing", { count: filteredProducts.length })}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative group w-full sm:w-auto flex-1 md:w-64">
              <input 
                type="text" 
                placeholder={t("searchPlaceholder")} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-sm"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-red-500 transition-colors" />
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-auto md:w-48">
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 font-medium text-slate-700 shadow-sm cursor-pointer"
              >
                <option value="rating">{t("topRated")}</option>
                <option value="newest">{t("newest")}</option>
                <option value="price_asc">{t("priceAsc")}</option>
                <option value="price_desc">{t("priceDesc")}</option>
              </select>
              <ChevronDown className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Mobile Filter Toggle */}
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all w-full sm:w-auto"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {t("filters")}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-28">
              <FilterSidebar />
            </div>
          </aside>

          {/* Mobile Sliding Sheet */}
          <AnimatePresence>
            {isMobileFilterOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
                  onClick={() => setIsMobileFilterOpen(false)}
                />
                <motion.aside 
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 left-0 w-[300px] bg-white z-50 flex flex-col lg:hidden shadow-2xl"
                >
                  <div className="flex justify-between items-center p-6 border-b border-slate-100">
                      <h2 className="text-2xl font-black text-slate-900">{t("filters")}</h2>
                      <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-6 h-6 text-slate-500" />
                      </button>
                    </div>
                    
                    <div className="p-6 overflow-y-auto flex-1 pb-24">
                      <FilterSidebar />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                      <button 
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="w-full py-4 bg-slate-900 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-lg"
                      >
                        Apply Filters
                      </button>
                    </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <main className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-slate-100 shadow-sm flex flex-col items-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t("noCycles")}</h3>
                <p className="text-slate-500 mb-6 max-w-md">{t("noCyclesDesc")}</p>
                <button 
                  onClick={() => { setSelectedCategory("All"); setPriceRange(5000); setSearchQuery(""); }}
                  className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                >
                  {t("clearAllFilters")}
                </button>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onQuickView={setQuickViewProduct} 
                      layout={true}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
              onClick={() => setQuickViewProduct(null)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row relative"
              >
                <button 
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 hover:bg-red-600 hover:text-white transition-colors shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="md:w-1/2 bg-slate-50 p-8 flex items-center justify-center relative min-h-[300px]">
                  <img 
                    src={quickViewProduct.image} 
                    alt={quickViewProduct.name}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                  />
                  {quickViewProduct.badge && (
                    <span className="absolute top-6 left-6 px-4 py-1.5 bg-red-600 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg">
                      {quickViewProduct.badge}
                    </span>
                  )}
                </div>

                <div className="md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-md border border-slate-200">
                        {isAr && quickViewProduct.categoryAr ? quickViewProduct.categoryAr : quickViewProduct.category}
                      </span>
                      <div className="flex items-center gap-1 ml-auto">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-slate-700">{quickViewProduct.rating}</span>
                        <span className="text-xs text-slate-400">({quickViewProduct.reviews} {useTranslations("productCard")("reviews")})</span>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl font-black text-slate-900 mb-2">
                      {isAr && quickViewProduct.nameAr ? quickViewProduct.nameAr : quickViewProduct.name}
                    </h2>
                    
                    <p className="text-slate-500 mb-4 text-sm leading-relaxed">
                      {isAr && quickViewProduct.shortDescriptionAr ? quickViewProduct.shortDescriptionAr : quickViewProduct.shortDescription}
                    </p>
                    
                    <div className="flex items-end gap-3 mb-8">
                      <span className="text-4xl font-black text-red-600">SAR {quickViewProduct.price.toFixed(2)}</span>
                      {quickViewProduct.originalPrice && (
                        <span className="text-lg text-slate-400 font-medium line-through mb-1">
                          SAR {quickViewProduct.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">{t("techSpecs")}</h3>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {Object.entries(quickViewProduct.specs).map(([key, value]) => (
                        <div key={key} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <p className="text-xs font-bold text-slate-400 uppercase mb-1">{key}</p>
                          <p className="text-sm font-semibold text-slate-900">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex gap-4">
                    <AddToCartButton product={quickViewProduct} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
