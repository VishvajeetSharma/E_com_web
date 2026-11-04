import { useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Footer } from "@/components/layout/Footer";
import HomeAnnouncement from "@/pages/Home/components/HomeAnnouncement";
import HomeNav from "@/components/layout/Navbar";
import HeroSection from "@/pages/Home/components/HeroSection";
import Collections from "@/pages/Home/components/Collections";
import ProductShelf from "@/components/data-display/ProductShelf";
import BrandStory from "@/pages/Home/components/BrandStory";
import PromoBanner from "@/pages/Home/components/PromoBanner";
import { useHomeAnimations } from "@/hooks/useRevealAnimations";
import { selectProducts, type HomeRootState } from "@/utils/storefront";
import "@/styles/storefront.css";

/** Homepage (route: /dashboard) — Darling Desire, Royal Burgundy edition. */
const DashBoard = () => {
  const root = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const products = useSelector((s: HomeRootState) => selectProducts(s));

  const bestSellers = useMemo(() => products.filter((p) => p.badge === "Bestseller"), [products]);
  const trending = useMemo(() => products.filter((p) => p.badge === "TRENDING"), [products]);

  useHomeAnimations(root);

  // Preserve existing "/dashboard#section" deep links.
  useEffect(() => {
    if (!location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    if (!el) return;
    const t = setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <div ref={root} className="dd-home">
      <HomeAnnouncement />
      <HomeNav />
      <main>
        <HeroSection />
        <Collections />
        <ProductShelf
          id="bestsellers"
          className="dd-shelf--best"
          eyebrow="Best Sellers"
          titleLines={["Loved, again", "and again."]}
          subtitle="The pieces our customers keep coming back for — straight from the current collection."
          products={bestSellers}
          initialCount={8}
          stagger
          cta={{ label: "Shop Women", to: "/category/women" }}
        />
        <BrandStory />
        <ProductShelf
          id="allProducts"
          className="dd-shelf--trending"
          eyebrow="Trending Now"
          titleLines={["What everyone", "is wearing."]}
          subtitle="Trending across men, women and kids right now. Filter by collection."
          products={trending}
          initialCount={8}
          filterable
        />
        <PromoBanner />
      </main>
      <div className="dd-home-footer">
        <Footer />
      </div>
    </div>
  );
};

export default DashBoard;
