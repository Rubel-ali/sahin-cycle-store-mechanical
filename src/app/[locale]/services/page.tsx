"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  CheckCircle2, Clock, Wrench, ShieldCheck, Droplets, Baby, 
  CalendarCheck, Search, Activity, Bike, PhoneCall, 
  ArrowRight, Settings, Cog
} from "lucide-react";
import { useTranslations } from "next-intl";

// --- SUB-COMPONENTS ---

const ServiceHero = () => {
  const t = useTranslations("servicesPage");
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/mechanic-man.jpg')" }} 
      />
      <div className="absolute inset-0 bg-black/70" /> 
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 font-medium mb-6 backdrop-blur-sm"
        >
          <Clock className="w-4 h-4" />
          <span>{t("heroBadge")}</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          {t("heroTitle1")} <span className="text-red-500">{t("heroTitle2")}</span>{t("heroTitle3")}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t("heroDesc")}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link 
            href="/contact" 
            className="px-8 py-4 rounded-xl bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition-colors inline-flex items-center gap-2 group shadow-xl shadow-red-600/20"
          >
            {t("bookBtn")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const IndividualServices = () => {
  const t = useTranslations("servicesPage");
  const services = [
    { icon: Cog, title: t("serv1Title"), desc: t("serv1Desc") },
    { icon: Activity, title: t("serv2Title"), desc: t("serv2Desc") },
    { icon: Settings, title: t("serv3Title"), desc: t("serv3Desc") },
    { icon: Wrench, title: t("serv4Title"), desc: t("serv4Desc") },
    { icon: Droplets, title: t("serv5Title"), desc: t("serv5Desc") },
    { icon: ShieldCheck, title: t("serv6Title"), desc: t("serv6Desc") },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
           <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            {t("individualTitle")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {t("individualDesc")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all border border-gray-100 flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <svc.icon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{svc.title}</h3>
                <p className="text-gray-600 text-sm">{svc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const KidsSpecialService = () => {
  const t = useTranslations("servicesPage");
  return (
    <section className="py-24 bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[100px] -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[100px] -ml-40 -mb-40" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/kids_bike_bg.jpg')" }} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="lg:pl-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 font-semibold mb-6">
              <Baby className="w-5 h-5" />
              <span>{t("kidsBadge")}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {t("kidsTitle")}
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {t("kidsDesc")}
            </p>
            
            <ul className="space-y-5 mb-10">
              {[
                t("kidsList1"),
                t("kidsList2"),
                t("kidsList3"),
                t("kidsList4")
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 shrink-0 text-red-500 mt-0.5" />
                  <span className="text-gray-200 text-lg font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProcessWorkflow = () => {
  const t = useTranslations("servicesPage");
  const steps = [
    { icon: CalendarCheck, title: t("step1Title"), desc: t("step1Desc") },
    { icon: Search, title: t("step2Title"), desc: t("step2Desc") },
    { icon: Wrench, title: t("step3Title"), desc: t("step3Desc") },
    { icon: Bike, title: t("step4Title"), desc: t("step4Desc") }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("processTitle")}</h2>
          <p className="text-gray-600">{t("processDesc")}</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center mb-12 md:mb-0 bg-white px-4">
              <div className="w-20 h-20 rounded-full bg-gray-50 border-4 border-white shadow-xl flex items-center justify-center mb-6 text-red-600">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-center text-sm whitespace-nowrap">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const QuickBookingCTA = () => {
  const t = useTranslations("servicesPage");
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-red-600 rounded-[3rem] overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-500 rounded-full blur-[120px] -mr-96 -mt-96 opacity-50 pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
            <div className="p-12 md:p-20 flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t("ctaTitle")}</h2>
              <p className="text-xl text-red-100 mb-10">
                {t("ctaDesc")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="tel:+966555555555" 
                  className="px-8 py-4 bg-white text-red-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <PhoneCall className="w-5 h-5" />
                  {t("btn1")}
                </Link>
                <Link 
                  href="/contact" 
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  {t("btn2")}
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block bg-cover bg-center" style={{ backgroundImage: "url('/mechanic-man.jpg')" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col flex-1 bg-white pt-0">
      <ServiceHero />
      <IndividualServices />
      <KidsSpecialService />
      <ProcessWorkflow />
      <QuickBookingCTA />
    </div>
  );
}
