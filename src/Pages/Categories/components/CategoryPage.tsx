import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/components/layout/Footer";
import HomeNav from "@/components/layout/Navbar";
import { useHomeAnimations } from "@/hooks/useRevealAnimations";
import { pickProducts, type HomeProduct } from "@/utils/storefront";
import { products as allData } from "@/data/products";
import "@/styles/storefront.css";
import "@/Pages/Categories/styles/category.css";
import { getCategoryConfig } from "@/Pages/Categories/utils/categoryConfig";
import {
  EMPTY_FILTERS, activeCount, applyFilters, buildFacets,
  type FilterState, type SortBy,
} from "@/Pages/Categories/utils/categoryFilters";
import CategoryHero from "@/Pages/Categories/components/CategoryHero";
import CategoryHighlights from "@/Pages/Categories/components/CategoryHighlights";
import FeaturedCollection from "@/Pages/Categories/components/FeaturedCollection";
import CategoryProductGrid from "@/Pages/Categories/components/CategoryProductGrid";
import CategoryPromoBanner from "@/Pages/Categories/components/CategoryPromoBanner";
import { CategoryToolbar, FilterPanel, MobileFilterSheet } from "@/Pages/Categories/components/CategoryFilterToolbar";

const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

/** Shared template for /category/women, /category/men and /category/kids. */
const CategoryPage = ({ gender }: { gender?: string }) => {
  const root = useRef<HTMLDivElement>(null);
  const { cfg } = getCategoryConfig(gender);

  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [sortBy, setSortBy] = useState<SortBy>("popularity");
  const [sheet, setSheet] = useState(false);

  // Brief skeleton as on the original page. State resets per route because
  // Category.tsx keys this component by gender (so no setState-in-effect needed).
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  useHomeAnimations(root);

  // Existing data source (static product list), filtered by gender exactly as before.
  const genderProducts = useMemo(
    () => (allData as HomeProduct[]).filter((p) => p.gender === gender),
    [gender],
  );
  const facets = useMemo(() => buildFacets(genderProducts), [genderProducts]);
  const shown = useMemo(() => applyFilters(genderProducts, filters, sortBy), [genderProducts, filters, sortBy]);
  const heroPicks = useMemo(() => pickProducts(genderProducts, cfg.heroPicks, 2), [genderProducts, cfg.heroPicks]);
  const promoImage = useMemo(() => pickProducts(genderProducts, [...cfg.heroPicks].reverse(), 1)[0], [genderProducts, cfg.heroPicks]);

  const change = useCallback((patch: Partial<FilterState>) => setFilters((f) => ({ ...f, ...patch })), []);
  const clear = useCallback(() => setFilters(EMPTY_FILTERS), []);
  const filtered = activeCount(filters) > 0;

  useEffect(() => { ScrollTrigger.refresh(); }, [shown.length, loading]);

  const pickCategory = (name: string) => {
    change({ activeFilter: name });
    setTimeout(() => scrollToId("cat-products"), 60);
  };
  const shopSavings = () => {
    const top = facets.discounts[facets.discounts.length - 1] ?? 0;
    change({ minDiscount: top });
    setTimeout(() => scrollToId("cat-products"), 60);
  };
  const discoverTrending = () => scrollToId(document.getElementById("cat-featured") ? "cat-featured" : "cat-products");

  return (
    <div ref={root} className={`dd-home dd-cat dd-cat--${cfg.key}`}>
      <HomeNav />
      <main>
        <CategoryHero
          cfg={cfg} picks={heroPicks} total={genderProducts.length} maxDiscount={facets.maxDiscount}
          onExplore={() => scrollToId("cat-products")} onTrending={discoverTrending}
        />
        <CategoryHighlights cfg={cfg} groups={facets.groups} active={filters.activeFilter} onPick={pickCategory} />
        <FeaturedCollection cfg={cfg} products={genderProducts} />

        <section id="cat-products" className="cat-section cat-listing" aria-labelledby="cat-list-title">
          <div className="dd-container">
            <header className="cat-head cat-head--tight">
              <div>
                <p className="dd-eyebrow">{cfg.title}’s Collection</p>
                <h2 id="cat-list-title" className="dd-h2">
                  {filters.activeFilter === "all" ? <>All <em>pieces.</em></> : <>{filters.activeFilter}<em>.</em></>}
                </h2>
              </div>
            </header>

            <CategoryToolbar
              count={loading ? genderProducts.length : shown.length}
              sortBy={sortBy} onSort={setSortBy}
              filters={filters} onChange={change} onClear={clear}
              onOpenSheet={() => setSheet(true)}
            />

            <div className="cat-layout">
              <aside className="cat-sidebar" aria-label="Filters">
                <div className="cat-sidebar-head">
                  <strong>Filters</strong>
                  {filtered && <button type="button" className="cat-clear" onClick={clear}>Clear all</button>}
                </div>
                <FilterPanel facets={facets} filters={filters} onChange={change} />
              </aside>
              <div className="cat-results">
                <CategoryProductGrid
                  products={shown} loading={loading} filtered={filtered} onClear={clear}
                  interlude={
                    shown.length > 4 && !filtered ? (
                      <CategoryPromoBanner cfg={cfg} maxDiscount={facets.maxDiscount} total={genderProducts.length} image={promoImage} onShop={shopSavings} />
                    ) : undefined
                  }
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <MobileFilterSheet open={sheet} onClose={() => setSheet(false)} facets={facets} filters={filters} onChange={change} onClear={clear} count={shown.length} />

      <div className="dd-home-footer"><Footer /></div>
    </div>
  );
};

export default CategoryPage;
