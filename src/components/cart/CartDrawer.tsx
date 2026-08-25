"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const locale = useLocale();
  const t = useTranslations("cartDrawer");
  const isAr = locale === "ar";

  const handleCheckout = () => {
    // Generate WhatsApp checkout message
    let message = `Hello Sahin Cycle Store! I would like to order the following items:\n\n`;
    cartItems.forEach((item, index) => {
      const itemName = isAr && item.nameAr ? item.nameAr : item.nameEn;
      message += `${index + 1}. ${itemName} - ${item.quantity}x (SAR ${item.price})\n`;
    });
    message += `\nTotal: SAR ${cartTotal.toFixed(2)}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/966000000000?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: locale === 'ar' ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: locale === 'ar' ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed inset-y-0 ${locale === 'ar' ? 'left-0' : 'right-0'} w-full md:w-[450px] bg-white z-[101] shadow-2xl flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-slate-900" />
                </div>
                <h2 className="text-xl font-black text-slate-900">{t("title")}</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                  <ShoppingBag className="w-16 h-16 text-slate-300 mb-4" />
                  <p className="text-lg font-bold text-slate-900 mb-2">{t("emptyTitle")}</p>
                  <p className="text-slate-500 text-sm">{t("emptyDesc")}</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white">
                    <div className="relative w-24 h-24 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 overflow-hidden">
                      <Image src={item.images?.[0] || '/placeholder.png'} alt={item.nameEn || 'Product Image'} fill sizes="96px" className="object-contain p-2 mix-blend-multiply" />
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-slate-900 line-clamp-1">
                          {isAr && item.nameAr ? item.nameAr : item.nameEn}
                        </h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-xs text-slate-500 mb-2 capitalize">
                        {item.category}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-black text-slate-900">SAR {item.price.toFixed(2)}</span>
                        
                        <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1 border border-slate-100">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-slate-600 transition-all"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-4 text-center text-slate-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-slate-600 transition-all"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-slate-100 p-6 bg-slate-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-500 font-medium">{t("subtotal")}</span>
                  <span className="text-2xl font-black text-slate-900">SAR {cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-400 mb-6 text-center">{t("shipping")}</p>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-600/30 transition-all flex items-center justify-center gap-2"
                >
                  {t("checkoutBtn")}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
