"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ChevronLeft, ChevronRight, Search,
  Camera, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

// --- TYPES & DATA ---

type Category = "All" | "Adult Cycles" | "Kids Bicycles" | "Workshop & Repairs" | "Happy Customers";

const CATEGORIES: Category[] = [
  "All",
  "Adult Cycles",
  "Kids Bicycles",
  "Workshop & Repairs",
  "Happy Customers"
];

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: Category;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: "1",
    src: "/mountain-biker.jpg",
    title: "Mountain Trail Adventure",
    category: "Adult Cycles",
  },
  {
    id: "2",
    src: "/biker-overlapping.jpg",
    title: "City Commuter Pro",
    category: "Adult Cycles",
  },
  {
    id: "3",
    src: "/kids_bike_bg.jpg",
    title: "First Ride Magic",
    category: "Kids Bicycles",
  },
  {
    id: "4",
    src: "/mechanic-man.jpg",
    title: "Precision Truing",
    category: "Workshop & Repairs",
  },
  {
    id: "5",
    src: "/gallery/gallery-1.png",
    title: "Weekend Group Ride",
    category: "Happy Customers",
  },
  {
    id: "6",
    src: "/why-us-bike.png",
    title: "BMX Street Session",
    category: "Adult Cycles",
  },
  {
    id: "7",
    src: "/service-bg.jpg",
    title: "Professional Toolkit",
    category: "Workshop & Repairs",
  },
  {
    id: "8",
    src: "/gallery/gallery-2.png",
    title: "Couples Cycling",
    category: "Happy Customers",
  },
  {
    id: "9",
    src: "/gallery/gallery-3.png",
    title: "Safe & Fun Designs",
    category: "Kids Bicycles",
  },
  {
    id: "10",
    src: "/gallery/gallery-4.png",
    title: "Drivetrain Deep Clean",
    category: "Workshop & Repairs",
  },
  {
    id: "11",
    src: "/gallery/gallery_adult_bike_1787543881528.jpg",
    title: "Carbon Road Bike at Sunrise",
    category: "Adult Cycles",
  },
  {
    id: "12",
    src: "/gallery/gallery_kids_bike_1787543901053.jpg",
    title: "Summer Joyride",
    category: "Kids Bicycles",
  },
  {
    id: "13",
    src: "/gallery/gallery_workshop_1787544279550.jpg",
    title: "Master Mechanic at Work",
    category: "Workshop & Repairs",
  },
  {
    id: "14",
    src: "/gallery/gallery_customers_1787544297641.jpg",
    title: "Sunset Park Ride",
    category: "Happy Customers",
  },
];

// --- MAIN COMPONENT ---

export default function GalleryPage() {
  const t = useTranslations("galleryPage");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter images based on selected category
  const filteredImages = GALLERY_DATA.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight" && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev! + 1) % filteredImages.length);
      }
      if (e.key === "ArrowLeft" && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredImages.length]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-20 md:pt-28 pb-12">

      {/* Header Section */}
      <div className="container mx-auto px-4 md:px-6 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 text-red-600 font-bold mb-6">
            <Camera className="w-5 h-5" />
            <span>{t("badge")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-6 py-3 rounded-full text-sm md:text-base font-semibold transition-colors duration-300 ${isActive ? "text-white" : "text-gray-600 bg-white hover:bg-gray-200 shadow-sm border border-gray-100"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-red-600 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t(`categories.${category}`)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="container mx-auto px-4 md:px-6 mb-24">
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative break-inside-avoid overflow-hidden rounded-2xl cursor-pointer group shadow-md bg-gray-200"
                onClick={() => setLightboxIndex(index)}
              >
                {/* Fallback img tag for masonry responsiveness without layout shifting issues */}
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full mb-3 shadow-lg">
                      {t(`categories.${item.category}`)}
                    </span>
                    <h3 className="text-white text-xl font-bold flex items-center justify-between">
                      {t(`images.${item.id}`)}
                      <Search className="w-5 h-5 text-white/70" />
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
          >
            {/* Backdrop Click Area */}
            <div
              className="absolute inset-0"
              onClick={() => setLightboxIndex(null)}
            />

            {/* Controls */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
              }}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 p-2 md:p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev! + 1) % filteredImages.length);
              }}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 p-2 md:p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Main Image Container */}
            <div className="relative z-10 max-w-6xl w-full max-h-[85vh] flex flex-col items-center justify-center pointer-events-none">
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl pointer-events-auto"
              />

              <div className="mt-6 text-center">
                <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full mb-3">
                  {t(`categories.${filteredImages[lightboxIndex].category}`)}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {t(`images.${filteredImages[lightboxIndex].id}`)}
                </h2>
                <p className="text-gray-400 mt-2 text-sm">
                  {lightboxIndex + 1} {t("of")} {filteredImages.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}