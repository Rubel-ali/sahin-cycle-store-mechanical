"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@prisma/client";
import { ProductCard } from "@/components/products/ProductCard";
import { Link } from "@/i18n/routing";
import { QuickViewModal } from "@/components/products/QuickViewModal";

export function FeaturedProducts({ products, removeTopPadding = false }: { products: Product[], removeTopPadding?: boolean }) {
  const t = useTranslations("featured");
  const [activeTab, setActiveTab] = useState("new");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const tabs = [
    { key: "new", label: t("tabs.new") },
    { key: "best", label: t("tabs.best") },
    { key: "viewed", label: t("tabs.viewed") }
  ];

  const getFilteredProducts = () => {
    if (activeTab === "new") return products.filter(p => p.category === 'new').slice(0, 4);
    if (activeTab === "best") return products.filter(p => p.featured).slice(0, 4);
    if (activeTab === "viewed") return products.slice(0, 4);
    return products.slice(0, 4);
  };

  const displayedProducts = getFilteredProducts();

  return (
    <section className={`bg-slate-50 ${removeTopPadding ? "pt-8 pb-10 md:pb-20" : "py-10 md:py-20"}`}>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-slate-500 mb-10 text-base max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          
          <div className="flex justify-center items-center gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-1 text-sm font-bold tracking-wide uppercase transition-colors border-b-2 ${
                  activeTab === tab.key 
                    ? "text-slate-900 border-red-600" 
                    : "text-slate-500 hover:text-slate-900 border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product) => (
              <ProductCard 
                key={`${product.id}-${activeTab}`}
                product={product} 
                onQuickView={setQuickViewProduct}
                layout={true}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link 
            href="/products" 
            className="inline-block rounded-full px-8 py-3.5 bg-slate-900 text-white hover:bg-red-600 font-semibold shadow-md transition-all"
          >
            {t("viewAll") || "View All Products"}
          </Link>
        </div>
      </div>
      
      <QuickViewModal 
        product={quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
    </section>
  );
}
