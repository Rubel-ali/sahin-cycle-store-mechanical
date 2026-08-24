"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { useTranslations } from "next-intl";

export const BookingCTA = () => {
  const t = useTranslations("aboutPage");
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-red-600/10 blur-3xl" />
       <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />

       <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
         <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
         >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {t("ctaTitle")}
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              {t("ctaDesc")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/products" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 group"
              >
                {t("ctaBtn1")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-gray-900 font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <Wrench className="w-5 h-5" />
                {t("ctaBtn2")}
              </Link>
            </div>
         </motion.div>
       </div>
    </section>
  );
};
