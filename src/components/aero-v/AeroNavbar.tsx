"use client";

import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function AeroNavbar({ locale }: { locale: string }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300",
        isScrolled
          ? "bg-black/75 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <div className="flex-1">
        <Link href={`/${locale}/aero-v`} className="text-white font-bold text-xl tracking-tight hover:text-white/80 transition-colors">
          Aero-V
        </Link>
      </div>

      <div className="hidden md:flex flex-1 justify-center gap-8 text-sm font-medium">
        {["Overview", "Aerodynamics", "Drivetrain", "Specs", "Order"].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-white/70 hover:text-white transition-colors"
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="flex-1 flex justify-end">
        <Link
          href={`/${locale}/aero-v/configure`}
          className="relative inline-flex h-9 items-center justify-center rounded-full bg-[#050505] px-5 py-2 text-sm font-medium text-white transition-all hover:shadow-[0_0_15px_rgba(0,214,255,0.4)] overflow-hidden group"
        >
          <span className="absolute inset-0 rounded-full border border-transparent bg-[linear-gradient(#050505,#050505),linear-gradient(to_right,#0050FF,#00D6FF)] [background-clip:padding-box,border-box] [background-origin:border-box]"></span>
          <span className="relative z-10">Configure Aero-V</span>
        </Link>
      </div>
    </motion.nav>
  );
}
