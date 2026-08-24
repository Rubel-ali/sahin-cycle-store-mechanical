import { mockProducts } from "@/data/mockProducts";
import { notFound } from "next/navigation";
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { getTranslations } from "next-intl/server";

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const isAr = locale === "ar";
  const t = await getTranslations({ locale, namespace: "productsPage" });
  const tProductCard = await getTranslations({ locale, namespace: "productCard" });

  const product = mockProducts.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  const name = isAr && product.nameAr ? product.nameAr : product.name;
  const category = isAr && product.categoryAr ? product.categoryAr : product.category;
  const badge = isAr && product.badgeAr ? product.badgeAr : product.badge;
  const shortDescription = isAr && product.shortDescriptionAr ? product.shortDescriptionAr : product.shortDescription;

  // Fallback map for spec keys just in case
  const specKeyFallback = (key: string) => {
    try {
      return t(`specs.${key}`);
    } catch {
      return key;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        {/* Breadcrumb / Back Navigation */}
        <div className="mb-8">
          <Link 
            href={`/${locale}/products`} 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium"
          >
            <ArrowLeft className={`w-5 h-5 ${isAr ? "rotate-180" : ""}`} />
            {t("backToCatalog")}
          </Link>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row">
          
          {/* Product Image Gallery (Left Side) */}
          <div className="md:w-1/2 bg-slate-50 p-8 lg:p-12 flex items-center justify-center relative min-h-[400px]">
            {badge && (
              <span className={`absolute top-8 ${isAr ? 'right-8' : 'left-8'} px-4 py-1.5 bg-red-600 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg z-10`}>
                {badge}
              </span>
            )}
            <Image 
              src={product.image} 
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain mix-blend-multiply p-8 lg:p-12 transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Product Info (Right Side) */}
          <div className="md:w-1/2 p-8 lg:p-12 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-md border border-slate-200">
                {category}
              </span>
              <div className={`flex items-center gap-1 ${isAr ? 'mr-auto' : 'ml-auto'}`}>
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-bold text-slate-700">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviews} {tProductCard("reviews")})</span>
              </div>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
              {name}
            </h1>
            
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              {shortDescription}
            </p>
            
            <div className="flex items-end gap-4 mb-8 pb-8 border-b border-slate-100">
              <span className="text-4xl font-black text-red-600">SAR {product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-slate-400 font-medium line-through mb-1">
                  SAR {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">{t("techSpecs")}</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">{specKeyFallback(key)}</p>
                    <p className="text-sm font-semibold text-slate-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <AddToCartButton product={product} />
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck className="w-6 h-6 text-slate-400" />
                <span className="text-xs font-medium text-slate-500">{t("valueProps.warranty")}</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="w-6 h-6 text-slate-400" />
                <span className="text-xs font-medium text-slate-500">{t("valueProps.delivery")}</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="w-6 h-6 text-slate-400" />
                <span className="text-xs font-medium text-slate-500">{t("valueProps.returns")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
