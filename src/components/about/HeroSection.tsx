"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export const HeroSection = () => {
  const t = useTranslations("aboutPage");
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/why-us-bike.png')" }} 
      />
      <div className="absolute inset-0 bg-black/60" /> {/* Dark overlay for contrast */}

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          {t("heroTitle1")} <br />
          <span className="text-red-500">{t("heroTitle2")}</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
        >
          {t("heroDesc")}
        </motion.p>
      </div>
    </section>
  );
};
