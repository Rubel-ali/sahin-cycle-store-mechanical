"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const KidsSafetySection = () => {
  const t = useTranslations("aboutPage");
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold mb-6">
                  <ShieldCheck className="w-5 h-5" />
                  <span>{t("kidsTag")}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {t("kidsTitle")}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {t("kidsDesc")}
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    t("kidsList1"),
                    t("kidsList2"),
                    t("kidsList3"),
                    t("kidsList4")
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-green-600 rounded-full" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="w-full md:w-1/2 relative min-h-[350px] bg-green-50"
            >
              <Image 
                src="/kids_bike_bg.jpg"
                alt={t("kidsTitle")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-green-100/20" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
