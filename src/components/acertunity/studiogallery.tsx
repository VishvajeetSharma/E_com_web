"use client";

import { useState } from "react";
import {
  Maximize2,
  Heart,
  Share2,
  ExternalLink,
  LayoutGrid,
  ImageIcon,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    id: 1,
    title: "Look 01",
    category: "Editorial",
    image:
      "https://images.unsplash.com/photo-1730727384555-35318cb80600?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhc2hpb24lMjBjbG90aGVzfGVufDB8fDB8fHww",
    size: "tall",
  },
  {
    id: 2,
    title: "Look 02",
    category: "Campaign",
    image: "https://images.pexels.com/photos/3784391/pexels-photo-3784391.jpeg",
    size: "small",
  },
  {
    id: 3,
    title: "Look 03",
    category: "Branding",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    size: "wide",
  },
  {
    id: 4,
    title: "Look 04",
    category: "Lookbook",
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
    size: "small",
  },
  {
    id: 5,
    title: "Look 05",
    category: "Runway",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
    size: "tall",
  },
  {
    id: 6,
    title: "Look 06",
    category: "Spaces",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
    size: "small",
  },
  {
    id: 7,
    title: "Look 07",
    category: "Craft",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
    size: "wide",
  },
  {
    id: 8,
    title: "Look 08",
    category: "Interiors",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
    size: "tall",
  },
  {
    id: 9,
    title: "Look 09",
    category: "Craft",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
    size: "wide",
  },
  {
    id: 10,
    title: "Look 10",
    category: "Spaces",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
    size: "small",
  },
];

const categories = [
  "All",
  "Editorial",
  "Campaign",
  "Branding",
  "Lookbook",
  "Runway",
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  return (
    <section className="w-full py-24 bg-gradient-to-r from-[#151522] via-[#4A101C] to-[#151522] ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#FAF7F2] leading-tight">
              A Selection of Our{" "}
              <span className="text-[#C6A46A] italic">Finest</span>{" "}
              Creations
            </h2>
          </div>
          <div className="flex items-center gap-3 text-white/70">
            <button className="rounded-full border border-white/10 bg-white/5 p-2" aria-label="Grid view">
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button className="rounded-full border border-white/10 bg-white/5 p-2" aria-label="Share gallery">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="rounded-full border border-white/10 bg-white/5 p-2" aria-label="Featured content">
              <Zap className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                activeCategory === category
                  ? "border-[#C6A46A] bg-[#C6A46A]/15 text-[#FAF7F2]"
                  : "border-white/10 bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`relative group rounded-3xl overflow-hidden cursor-pointer shadow-xl shadow-black/5 border border-border/50
                  ${item.size === "tall" ? "row-span-2" : ""}
                  ${item.size === "wide" ? "col-span-1 lg:col-span-2" : ""}
                `}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-white leading-tight">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 pt-2">
                      <button className="h-10  w-10 rounded-xl bg-white/10 hover:bg-white/20 text-white border-white/10 backdrop-blur-md">
                        <Maximize2 className="w-5 h-5" />
                      </button>
                      <button className="h-10 w-10 rounded-xl bg-white/10 hover:bg-white/20 text-white border-white/10 backdrop-blur-md">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="h-10 w-10 rounded-xl bg-white/10 hover:bg-white/20 text-white border-white/10 backdrop-blur-md ml-auto">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Indicator Tag (Static) */}
                <div className="absolute top-6 right-6 opacity-100 group-hover:opacity-0 transition-opacity">
                  <div className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <ImageIcon className="w-4 h-4 text-white/50" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
