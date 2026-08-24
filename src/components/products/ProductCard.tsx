"use client";

import { motion } from "framer-motion";
import { Star, Eye, ShoppingCart } from "lucide-react";
import { Product } from "@/data/mockProducts";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
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
      <div className="relative h-56 bg-slate-50 overflow-hidden flex items-center justify-center">
        <img 
          src={product.image} 
          alt={name}
          className="object-contain p-4 h-44 sm:h-52 w-full mix-blend-multiply group-hover:scale-110 group-hover:blur-[2px] transition-all duration-700 ease-out"
        />
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
          {onQuickView ? (
            <button 
              onClick={() => onQuickView(product)}
              className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-slate-900 hover:bg-red-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
              title={t("quickView")}
            >
              <Eye className="w-5 h-5" />
            </button>
          ) : (
            <Link 
              href={`/${locale}/products/${product.id}`}
              className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-slate-900 hover:bg-red-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
              title={t("viewDetails")}
            >
              <Eye className="w-5 h-5" />
            </Link>
          )}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              addToCart(product);
            }}
            className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-slate-900 hover:bg-red-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
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
          {name}
        </h3>

        {/* Specs Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
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
        <div className="mt-auto flex items-end justify-between">
          <div>
            {product.originalPrice && (
              <p className="text-sm text-slate-400 font-medium line-through mb-0.5">
                SAR {product.originalPrice.toFixed(2)}
              </p>
            )}
            <p className="text-2xl font-black text-slate-900">
              SAR {product.price.toFixed(2)}
            </p>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              addToCart(product);
            }}
            disabled={!product.inStock}
            className={`p-3 rounded-xl transition-all shadow-md ${
              product.inStock 
                ? "bg-slate-900 text-white hover:bg-red-600 hover:shadow-red-600/20" 
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
