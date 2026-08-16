"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import StoryText from "./StoryText";

const TOTAL_FRAMES = 120;

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Load images on mount
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameStr = i.toString().padStart(4, "0");
      img.src = `/aero-v-sequence/frame_${frameStr}.svg`; // We generated SVGs as placeholders
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  // Draw initial frame once the first image is loaded
  useEffect(() => {
    if (imagesRef.current.length > 0 && imagesRef.current[0].complete && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.drawImage(imagesRef.current[0], 0, 0, 1920, 1080);
      }
    }
  }, [imagesLoaded]);

  // Update canvas on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!canvasRef.current || imagesRef.current.length === 0) return;
    
    // latest goes from 0 to 1
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(latest * TOTAL_FRAMES)
    );
    
    const img = imagesRef.current[frameIndex];
    if (img && img.complete) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        // We clear just in case, though drawing over should be fine since frames are full size
        ctx.clearRect(0, 0, 1920, 1080);
        ctx.drawImage(img, 0, 0, 1920, 1080);
      }
    }
  });

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#050505]">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Aspect ratio container for 16:9 canvas */}
        <div className="relative w-full max-w-[1920px] aspect-video">
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          {imagesLoaded < TOTAL_FRAMES && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#050505] z-10">
              <div className="text-white/50 text-sm tracking-widest font-mono">
                LOADING SEQUENCE {Math.round((imagesLoaded / TOTAL_FRAMES) * 100)}%
              </div>
            </div>
          )}
        </div>
        
        {/* Overlay gradient to blend canvas edges perfectly */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,#050505_100%)] z-10" />
        
        {/* Storytelling Text Overlays */}
        <StoryText scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
