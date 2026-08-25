"use client";

import { motion } from "framer-motion";
import { Star, Eye, ShoppingCart } from "lucide-react";
import { Product } from "@/data/mockProducts";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  layout?: boolean;
}

export function ProductCard({ product, onQuickView, layout = false }: ProductCardProps) {
  const locale = useLocale();
  const t = useTranslations("productCard");
  const { addToCart } = useCart();
  
  const isAr = locale === "ar";
  const name = isAr && product.nameAr ? product.nameAr : product.name;
  const category = isAr && product.categoryAr ? product.categoryAr : product.category;
  const badge = isAr && product.badgeAr ? product.badgeAr : product.badge;
  return (
    <motion.div
      layout={layout}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative"
    >
      {/* Badges */}
      <div className={`absolute top-4 ${isAr ? 'right-4' : 'left-4'} z-10 flex flex-col gap-2`}>
        {badge && (
          <span className="px-3 py-1 bg-red-600 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg">
            {badge}
          </span>
        )}
        {!product.inStock && (
          <span className="px-3 py-1 bg-slate-900 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg">
            {t("outOfStock")}
          </span>
        )}
      </div>

      {/* Image Area - Clean cutouts on light background */}
      <div 
        className="relative h-56 bg-slate-50 overflow-hidden flex items-center justify-center cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          if (window.innerWidth < 768) {
            onQuickView(product);
          }
        }}
      >
        <Image 
          src={product.image} 
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-4 mix-blend-multiply md:group-hover:scale-110 md:group-hover:blur-[2px] transition-all duration-700 ease-out"
        />
        
        {/* Actions (Hidden on mobile, hover on desktop) */}
        <div className="absolute inset-0 bg-transparent md:bg-slate-900/40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center gap-3 md:backdrop-blur-[2px]">
          <button 
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); onQuickView(product); }}
            className="cursor-pointer w-11 h-11 rounded-full bg-white/90 md:bg-white shadow-md flex items-center justify-center text-slate-900 hover:bg-red-600 hover:text-white transition-all transform md:translate-y-4 md:group-hover:translate-y-0 duration-300"
            title={t("quickView")}
          >
            <Eye className="w-5 h-5" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              addToCart(product);
            }}
            className="cursor-pointer w-11 h-11 rounded-full bg-white/90 md:bg-white shadow-md flex items-center justify-center text-slate-900 hover:bg-red-600 hover:text-white transition-all transform md:translate-y-4 md:group-hover:translate-y-0 duration-300 delay-75"
            title={t("addToCart")}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{category}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-bold text-slate-700">{product.rating}</span>
            <span className="text-xs text-slate-400">({product.reviews} {t("reviews")})</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-1 group-hover:text-red-600 transition-colors">
          <button 
            onClick={(e) => { 
              e.preventDefault(); 
              if (window.innerWidth < 768) {
                onQuickView(product);
              }
            }} 
            className="text-left w-full truncate focus:outline-none"
          >
            {name}
          </button>
        </h3>

        {/* Specs Pills */}
        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
          {product.specs.speed && (
            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md border border-slate-200">{product.specs.speed}</span>
          )}
          {product.specs.wheelSize && (
            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md border border-slate-200">{product.specs.wheelSize}</span>
          )}
          {product.specs.brakes && (
            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md border border-slate-200">{product.specs.brakes}</span>
          )}
        </div>

        {/* Price & Action */}
        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="flex flex-col justify-end">
            {product.originalPrice && (
              <p className="text-sm text-slate-400 font-medium line-through mb-0.5">
                SAR {product.originalPrice.toFixed(2)}
              </p>
            )}
            <p className="text-base sm:text-lg font-black text-slate-900 leading-none">
              <span className="text-xs text-slate-500 font-bold mr-1">SAR</span>
              {product.price.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onQuickView(product);
              }}
              disabled={!product.inStock}
              className="h-8 px-3.5 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm transition active:scale-95 whitespace-nowrap"
            >
              Buy Now
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addToCart(product);
              }}
              disabled={!product.inStock}
              className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-all shadow-md ${
                product.inStock 
                  ? "bg-slate-900 text-white hover:bg-red-600 hover:shadow-red-600/20" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
