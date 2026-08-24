"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Settings, Clock, ThumbsUp, Wrench, HeartHandshake } from "lucide-react";
import { useTranslations } from "next-intl";

export const WhyChooseUs = () => {
  const t = useTranslations("aboutPage");
  
  const features = [
    {
      icon: ShieldCheck,
      title: t("why1Title"),
      description: t("why1Desc")
    },
    {
      icon: Settings,
      title: t("why2Title"),
      description: t("why2Desc")
    },
    {
      icon: HeartHandshake,
      title: t("why3Title"),
      description: t("why3Desc")
    },
    {
      icon: Clock,
      title: t("why4Title"),
      description: t("why4Desc")
    },
    {
      icon: Wrench,
      title: t("why5Title"),
      description: t("why5Desc")
    },
    {
      icon: ThumbsUp,
      title: t("why6Title"),
      description: t("why6Desc")
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {t("whyTitle")}
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {t("whyDesc")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
