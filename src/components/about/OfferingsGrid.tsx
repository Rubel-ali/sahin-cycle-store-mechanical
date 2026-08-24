"use client";

import { motion } from "framer-motion";
import { Bike, Baby, Wrench } from "lucide-react";
import { useTranslations } from "next-intl";

export const OfferingsGrid = () => {
  const t = useTranslations("aboutPage");
  
  const offerings = [
    {
      icon: Bike,
      title: t("offer1Title"),
      description: t("offer1Desc"),
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Baby,
      title: t("offer2Title"),
      description: t("offer2Desc"),
      color: "bg-green-50 text-green-600",
    },
    {
      icon: Wrench,
      title: t("offer3Title"),
      description: t("offer3Desc"),
      color: "bg-red-50 text-red-600",
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {t("offeringsTitle")}
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {t("offeringsDesc")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerings.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${offer.color}`}>
                <offer.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{offer.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {offer.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
