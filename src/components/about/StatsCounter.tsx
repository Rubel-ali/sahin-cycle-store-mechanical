"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

function AnimatedCounter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest).toLocaleString() + suffix);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, to, { 
        duration: 2.5, 
        ease: "easeOut" 
      });
      return () => controls.stop();
    }
  }, [isInView, motionValue, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export const StatsCounter = () => {
  const t = useTranslations("aboutPage");
  
  const stats = [
    { value: 5000, suffix: "+", label: t("stat1") },
    { value: 10000, suffix: "+", label: t("stat2") },
    { value: 15, suffix: "+", label: t("stat3") },
    { value: 100, suffix: "%", label: t("stat4") },
  ];

  return (
    <section className="bg-red-600 py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="text-white font-extrabold text-4xl md:text-5xl mb-2 tracking-tighter">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/90 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
