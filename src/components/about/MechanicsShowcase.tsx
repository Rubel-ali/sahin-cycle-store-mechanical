"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

export const MechanicsShowcase = () => {
  const t = useTranslations("aboutPage");
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
             <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
             >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {t("mechTitle")}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {t("mechDesc")}
                </p>
                <div className="flex gap-2 text-yellow-400 mb-4">
                  {[1,2,3,4,5].map((i) => <Star key={i} className="w-6 h-6 fill-current" />)}
                </div>
                <p className="font-semibold text-gray-900 text-lg">
                  {t("mechTag")}
                </p>
             </motion.div>
          </div>

          <div className="lg:col-span-7">
             <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative rounded-2xl overflow-hidden h-[400px]"
             >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/mechanic-man.jpg')" }} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                   <div className="text-white text-2xl font-bold mb-2">{t("mechImageTitle")}</div>
                   <div className="text-gray-200">{t("mechImageDesc")}</div>
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
