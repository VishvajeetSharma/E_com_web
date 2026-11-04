import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import StoreShell from "@/components/layout/StoreShell";
import ProductShelf from "@/components/data-display/ProductShelf";
import HomeProductCard from "@/components/data-display/ProductCard";
import BeautyHero from "@/pages/Beauty/components/BeautyHero";
import BeautyCollectionCard from "@/pages/Beauty/components/BeautyCollectionCard";
import { buildBeauty, hiRes } from "@/pages/Beauty/utils/beautyData";
import { selectProducts, type HomeRootState } from "@/utils/storefront";
import "@/pages/Beauty/styles/beauty.css";

type Sort = "popularity" | "low" | "high";
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

/** Route: /beauty — built only from real store products (Beauty / Skincare / Makeup / Hair). */
const BeautyScreen = () => {
  const products = useSelector((s: HomeRootState) => selectProducts(s));
  const { items, groups, featured, trending, maxDiscount, heroPicks } = useMemo(() => buildBeauty(products), [products]);
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState<Sort>("popularity");

  const shown = useMemo(() => {
    const list = cat === "all" ? items : items.filter((p) => p.category === cat);
    return [...list].sort((a, b) => (sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : 0));
  }, [items, cat, sort]);

  const pick = (key: string) => { setCat((c) => (c === key ? "all" : key)); setTimeout(() => go("beauty-all"), 60); };

  return (
    <StoreShell>
      <main>
        {items.length === 0 ? (
          <div className="dd-container st-main"><div className="st-empty" role="status"><h2>No beauty products yet</h2><p>Check back soon.</p></div></div>
        ) : (
          <>
            <BeautyHero picks={heroPicks} total={items.length} maxDiscount={maxDiscount} onShop={() => go("beauty-all")} onFeatured={() => go("beauty-featured")} />

            <section className="bt-sec" aria-labelledby="bt-coll-title">
              <div className="dd-container">
                <header className="dd-center-head">
                  <p className="dd-eyebrow" data-reveal>Beauty Collections</p>
                  <h2 id="bt-coll-title" className="dd-h2" data-lines>
                    <span className="dd-line"><span>Find your</span></span>
                    <span className="dd-line"><span><em>ritual.</em></span></span>
                  </h2>
                </header>
                <div className="bt-colls">
                  {groups.map((g, i) => (
                    <div key={g.key} data-card><BeautyCollectionCard group={g} index={i} active={cat === g.key} onPick={pick} /></div>
                  ))}
                </div>
              </div>
            </section>

            <ProductShelf
              id="beauty-featured" className="dd-shelf--best" eyebrow="Featured"
              titleLines={["Beauty’s", "best sellers."]} subtitle="The beauty pieces our customers rate highest and return to."
              products={featured} initialCount={4}
            />

            {maxDiscount > 0 && (
              <section className="bt-promo" aria-label="Beauty offer">
                <div className="bt-promo-art" aria-hidden="true">
                  {heroPicks[1] && <img src={hiRes(heroPicks[1].image, 1000)} alt="" loading="lazy" decoding="async" />}
                </div>
                <div className="dd-container bt-promo-in">
                  <p className="dd-eyebrow" data-reveal>Beauty offer</p>
                  <h2 className="dd-h2 dd-h2--light" data-lines>
                    <span className="dd-line"><span>Up to {maxDiscount}% off</span></span>
                    <span className="dd-line"><span><em>selected beauty.</em></span></span>
                  </h2>
                  <motion.button type="button" className="dd-btn dd-btn--gold" style={{ marginTop: "2rem" }} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => go("beauty-all")}>Shop the savings</motion.button>
                </div>
              </section>
            )}

            <ProductShelf
              id="beauty-trending" eyebrow="Trending" titleLines={["Trending in", "beauty."]}
              subtitle="What’s getting the most attention right now." products={trending} initialCount={4}
            />

            <section id="beauty-all" className="bt-sec bt-discover" aria-labelledby="bt-all-title">
              <div className="dd-container">
                <header className="dd-center-head">
                  <p className="dd-eyebrow" data-reveal>Product Discovery</p>
                  <h2 id="bt-all-title" className="dd-h2" data-lines>
                    <span className="dd-line"><span>All beauty,</span></span>
                    <span className="dd-line"><span><em>in one place.</em></span></span>
                  </h2>
                </header>
                <div className="bt-tools">
                  <div className="bt-chips" role="group" aria-label="Filter by category">
                    <button type="button" aria-pressed={cat === "all"} className={cat === "all" ? "is-on" : ""} onClick={() => setCat("all")}>All</button>
                    {groups.map((g) => (
                      <button type="button" key={g.key} aria-pressed={cat === g.key} className={cat === g.key ? "is-on" : ""} onClick={() => setCat(g.key)}>{g.label}</button>
                    ))}
                  </div>
                  <div className="bt-sort" role="group" aria-label="Sort products">
                    <span>Sort</span>
                    {([["popularity", "Popularity"], ["low", "Price ↑"], ["high", "Price ↓"]] as const).map(([id, label]) => (
                      <button type="button" key={id} aria-pressed={sort === id} className={sort === id ? "is-on" : ""} onClick={() => setSort(id)}>{label}</button>
                    ))}
                  </div>
                </div>
                <p className="bt-count" aria-live="polite">{shown.length} {shown.length === 1 ? "piece" : "pieces"}</p>
                <ul className="dd-grid">
                  {shown.map((p) => <li key={p.id}><HomeProductCard item={p} /></li>)}
                </ul>
              </div>
            </section>
          </>
        )}
      </main>
    </StoreShell>
  );
};

export default BeautyScreen;
