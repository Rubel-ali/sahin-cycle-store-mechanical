import AeroNavbar from "@/components/aero-v/AeroNavbar";
import ScrollSequence from "@/components/aero-v/ScrollSequence";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aero-V Velocity Pro | Sahin Cycle Store",
  description: "Flagship carbon engineering, re-engineered for pure speed and zero compromise.",
};

export default async function AeroVPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main className="bg-[#050505] text-white min-h-screen selection:bg-[#0050FF] selection:text-white font-sans antialiased">
      <AeroNavbar locale={locale} />
      
      {/* 
        The ScrollSequence handles the entire 400vh scroll storytelling experience.
        It has the pinned canvas and the text overlays.
      */}
      <ScrollSequence />
      
      {/* Additional sections (Specs, Footer, etc.) could go here below the 400vh sequence */}
      <section id="specs" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="border-t border-white/10 pt-16">
          <h2 className="text-3xl font-bold mb-8">Technical Specifications</h2>
          <div className="grid md:grid-cols-2 gap-8 text-white/60">
            <div>
              <h3 className="text-white/90 font-medium mb-2">Frame</h3>
              <p>Aero-V Ultra-High Modulus Carbon, Wind-Tunnel Optimized</p>
            </div>
            <div>
              <h3 className="text-white/90 font-medium mb-2">Drivetrain</h3>
              <p>Wireless Electronic 12-Speed, Ceramic Bottom Bracket</p>
            </div>
            <div>
              <h3 className="text-white/90 font-medium mb-2">Wheelset</h3>
              <p>Deep-Section Carbon Aero Wheels (60mm depth)</p>
            </div>
            <div>
              <h3 className="text-white/90 font-medium mb-2">Brakes</h3>
              <p>Integrated Hydraulic Disc, Heat-Dissipating Rotors</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
