"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface StoryTextProps {
  scrollYProgress: MotionValue<number>;
}

export default function StoryText({ scrollYProgress }: StoryTextProps) {
  // 1. HERO / INTRO (0–15% scroll)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // 2. AERODYNAMICS & FRAME ENGINEERING (15–40% scroll)
  const aeroOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  const aeroX = useTransform(scrollYProgress, [0.15, 0.2], [-50, 0]);

  // 3. DRIVETRAIN & SMART SHIFTING (40–65% scroll)
  const driveOpacity = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
  const driveX = useTransform(scrollYProgress, [0.4, 0.45], [50, 0]);

  // 4. BRAKING & WHEELSET CRAFTSMANSHIP (65–85% scroll)
  const brakeOpacity = useTransform(scrollYProgress, [0.65, 0.7, 0.8, 0.85], [0, 1, 1, 0]);
  const brakeY = useTransform(scrollYProgress, [0.65, 0.7], [50, 0]);

  // 5. REASSEMBLY & CTA (85–100% scroll)
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.9], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.85, 0.9], [50, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* 1. HERO */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-48"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white/90 mb-4 drop-shadow-lg">
          Aero-V Velocity Pro
        </h1>
        <h2 className="text-2xl md:text-3xl text-white/80 font-medium mb-6">
          Speed, perfected.
        </h2>
        <p className="max-w-xl text-lg text-white/60">
          Flagship carbon engineering, re‑engineered for pure speed and zero compromise.
        </p>
      </motion.div>

      {/* 2. AERODYNAMICS */}
      <motion.div
        style={{ opacity: aeroOpacity, x: aeroX }}
        className="absolute inset-y-0 left-0 flex flex-col justify-center px-8 md:px-24 w-full md:w-1/2"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white/90 mb-6 drop-shadow-md">
          Precision-molded for absolute aero efficiency.
        </h2>
        <p className="text-xl text-white/80 font-medium mb-4">
          Ultra-high modulus carbon fiber layers, wind-tunnel optimized tube shapes, and fully integrated drag-reduction design.
        </p>
        <p className="text-lg text-white/60">
          Every gram is calculated. Every junction is tuned for maximum stiffness and vibration damping—mile after mile.
        </p>
      </motion.div>

      {/* 3. DRIVETRAIN */}
      <motion.div
        style={{ opacity: driveOpacity, x: driveX }}
        className="absolute inset-y-0 right-0 flex flex-col justify-center items-end text-right px-8 md:px-24 w-full md:w-1/2"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white/90 mb-6 drop-shadow-md">
          Instant response.<br/>Flawless power transfer.
        </h2>
        <ul className="space-y-4 text-lg text-white/60 max-w-md">
          <li><strong className="text-white/80">Wireless electronic shifting</strong> reacts in milliseconds.</li>
          <li><strong className="text-white/80">Ultra-low friction ceramic bottom bracket</strong> maximizes watt transfer.</li>
          <li><strong className="text-white/80">Intelligent gear tracking</strong> adapts to your cadence and terrain.</li>
        </ul>
      </motion.div>

      {/* 4. BRAKING */}
      <motion.div
        style={{ opacity: brakeOpacity, y: brakeY }}
        className="absolute inset-y-0 left-0 flex flex-col justify-center px-8 md:px-24 w-full md:w-1/2"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white/90 mb-6 drop-shadow-md">
          Total control at terminal velocity.
        </h2>
        <p className="text-xl text-white/80 font-medium mb-4">
          Deep-section carbon wheels unlock stability in crosswinds.
        </p>
        <p className="text-lg text-white/60 max-w-lg">
          Integrated hydraulic disc braking delivers heat-dissipating, pinpoint stopping power in any condition.
        </p>
      </motion.div>

      {/* 5. CTA */}
      <motion.div
        style={{ opacity: ctaOpacity, y: ctaY }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-48 pointer-events-auto"
      >
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white/90 mb-4 drop-shadow-lg">
          Ride the future.<br/>Feel nothing holding you back.
        </h2>
        <p className="text-xl text-white/60 mb-10">
          Aero-V Velocity Pro. Designed for speed, crafted for perfection.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a
            href="#configure"
            className="relative inline-flex h-14 items-center justify-center rounded-full bg-[#050505] px-8 py-3 text-lg font-semibold text-white transition-all hover:shadow-[0_0_25px_rgba(0,80,255,0.6)] overflow-hidden group"
          >
            <span className="absolute inset-0 rounded-full border-2 border-transparent bg-[linear-gradient(#050505,#050505),linear-gradient(to_right,#0050FF,#00D6FF)] [background-clip:padding-box,border-box] [background-origin:border-box]"></span>
            <span className="relative z-10">Configure Your Aero-V</span>
          </a>
          <a href="#specs" className="text-white/60 hover:text-white transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white">
            See full specifications
          </a>
        </div>
      </motion.div>
    </div>
  );
}
