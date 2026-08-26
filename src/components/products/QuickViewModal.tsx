"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Product } from "@prisma/client";
import { useCart } from "@/context/CartContext";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const t = useTranslations("productsPage");
  const tProductCard = useTranslations("productCard");
  const locale = useLocale();
  const isAr = locale === "ar";
  const { addToCart } = useCart();

  return (
    <AnimatePresence>
      {product && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row relative"
          >
            <button 
              onClick={onClose}
              className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 hover:bg-red-600 hover:text-white transition-colors shadow-sm`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-1/2 bg-slate-50 p-8 flex items-center justify-center relative min-h-[300px]">
              <Image 
                src={product.images[0] || '/placeholder.png'} 
                alt={product.nameEn}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain mix-blend-multiply p-8"
              />
              {product.featured && (
                <span className={`absolute top-6 ${isAr ? 'right-6' : 'left-6'} px-4 py-1.5 bg-red-600 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg`}>
                  {isAr ? 'مميز' : 'Featured'}
                </span>
              )}
            </div>

            <div className="md:w-1/2 p-8 md:p-10 pt-12 md:pt-14 flex flex-col overflow-y-auto">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 pr-8">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-md border border-slate-200 capitalize">
                    {isAr ? (product.category === 'road' ? 'طريق' : product.category === 'mountain' ? 'جبلي' : product.category === 'kids' ? 'أطفال' : product.category === 'accessories' ? 'إكسسوارات' : product.category === 'used' ? 'مستعمل' : product.category === 'new' ? 'جديد' : product.category) : product.category}
                  </span>
                  <div className="flex items-center gap-1 ml-auto">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-bold text-slate-700">5.0</span>
                    <span className="text-xs text-slate-400">(12 {tProductCard("reviews")})</span>
                  </div>
                </div>
                
                <h2 className="text-3xl font-black text-slate-900 mb-2">
                  {isAr && product.nameAr ? product.nameAr : product.nameEn}
                </h2>
                
                <p className="text-slate-500 mb-4 text-sm leading-relaxed">
                  {isAr && product.descriptionAr ? product.descriptionAr : product.descriptionEn}
                </p>
                
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-end gap-2" dir={isAr ? 'rtl' : 'ltr'}>
                    <span className="text-xl sm:text-2xl font-black text-red-600">{product.price.toFixed(2)} {isAr ? 'ر.س' : 'SAR'}</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product);
                      onClose();
                    }}
                    disabled={!product.inStock}
                    className={`h-10 px-5 text-xs sm:text-sm font-bold rounded-lg flex items-center gap-2 transition active:scale-95 shrink-0 ${
                      product.inStock 
                        ? "bg-red-600 hover:bg-red-700 text-white" 
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.inStock ? tProductCard("addToCart") : tProductCard("outOfStock")}
                  </button>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">{isAr ? 'معلومات' : 'Information'}</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">{isAr ? 'الحالة' : 'Condition'}</p>
                    <p className="text-sm font-semibold text-slate-900 capitalize">{isAr ? (product.condition === 'new' ? 'جديد' : 'مستعمل') : product.condition}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">{isAr ? 'الفئة' : 'Category'}</p>
                    <p className="text-sm font-semibold text-slate-900 capitalize">{isAr ? (product.category === 'road' ? 'طريق' : product.category === 'mountain' ? 'جبلي' : product.category === 'kids' ? 'أطفال' : product.category === 'accessories' ? 'إكسسوارات' : product.category === 'used' ? 'مستعمل' : product.category === 'new' ? 'جديد' : product.category) : product.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
