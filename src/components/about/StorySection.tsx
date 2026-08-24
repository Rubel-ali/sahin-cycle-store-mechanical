"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const StorySection = () => {
  const t = useTranslations("aboutPage");
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t("storyTitle")}</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {t("storyDesc1_1")}<strong className="text-red-600">{t("storyDesc1_2")}</strong>{t("storyDesc1_3")}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {t("storyDesc2")}
            </p>
            <div className="flex gap-4 items-center">
                <div className="w-12 h-1 bg-red-600"></div>
                <span className="text-gray-500 font-semibold uppercase tracking-wider">{t("storyTag")}</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
             {/* Using a placeholder or generic image. Will use standard image tag if no Next Image available. */}
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            <Image 
              src="/gallery/gallery-1.png" 
              alt="Sahin Cycle Workshop"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={(e) => {
                e.currentTarget.src = "/why-us-bike.png";
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
