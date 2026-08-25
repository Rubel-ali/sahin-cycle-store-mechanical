"use client";

import { ShoppingCart } from "lucide-react";
import { Product } from "@prisma/client";
import { useCart } from "@/context/CartContext";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function AddToCartButton({ product, onAdd }: { product: Product; onAdd?: () => void }) {
  const { addToCart } = useCart();
  const t = useTranslations("productCard");

  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success(`Added ${product.nameEn} to cart`, {
          description: "You can view your cart by clicking the cart icon."
        });
        if (onAdd) onAdd();
      }}
      disabled={!product.inStock}
      className={`w-full py-4 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${
        product.inStock 
          ? "bg-red-600 text-white hover:bg-red-700 shadow-red-600/30" 
          : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
      }`}
    >
      <ShoppingCart className="w-5 h-5" />
      {product.inStock ? t("addToCart") : t("outOfStock")}
    </button>
  );
}
