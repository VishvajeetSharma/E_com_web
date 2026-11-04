import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPrice, hiRes, type HomeProduct } from "@/utils/storefront";
import type { CategoryConfig } from "@/Pages/Categories/utils/categoryConfig";
import Tilt from "@/components/common/Tilt";

export const CollectionCard = ({ item, index }: { item: HomeProduct; index: number }) => (
  <Tilt max={7} className="cat-cc-tilt">
    <motion.div initial="rest" whileHover="hover" animate="rest" className="cat-cc">
      <Link to={`/product/${item.id}`} onClick={() => window.scrollTo(0, 0)} aria-label={`${item.name}, ${formatPrice(item.price)}`}>
        <motion.img
          src={hiRes(item.image, 1000)} alt="" loading="lazy" decoding="async"
          variants={{ rest: { scale: 1.02 }, hover: { scale: 1.1 } }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className="cat-cc-shade" aria-hidden="true" />
        <motion.span className="cat-cc-border" aria-hidden="true" variants={{ rest: { opacity: 0, inset: 22 }, hover: { opacity: 1, inset: 14 } }} transition={{ duration: 0.5 }} />
        <span className="cat-cc-num">0{index + 1}</span>
        {item.badge && <span className="cat-cc-badge">{item.badge}</span>}
        <span className="cat-cc-copy">
          <small>{item.category}</small>
          <strong>{item.name}</strong>
          <span className="cat-cc-price">
            {formatPrice(item.price)}
            {item.originalPrice ? <s>{formatPrice(item.originalPrice)}</s> : null}
            <motion.i aria-hidden="true" variants={{ rest: { x: 0 }, hover: { x: 8 } }}>→</motion.i>
          </span>
        </span>
      </Link>
    </motion.div>
  </Tilt>
);

const BADGE_RANK = ["LUXURY", "EXCLUSIVE", "TRENDING", "Bestseller", "NEW"];

/** Large image-led cards for real products carrying a featured badge. */
const FeaturedCollection = ({ cfg, products }: { cfg: CategoryConfig; products: HomeProduct[] }) => {
  const ranked = products
    .filter((p) => p.badge && BADGE_RANK.includes(p.badge))
    .sort((a, b) => BADGE_RANK.indexOf(a.badge!) - BADGE_RANK.indexOf(b.badge!))
    .slice(0, 3);
  if (ranked.length < 2) return null;
  return (
    <section id="cat-featured" className="cat-section cat-featured" aria-labelledby="cat-ft-title">
      <div className="dd-container">
        <header className="cat-head">
          <div>
            <p className="dd-eyebrow" data-reveal>Featured Collection</p>
            <h2 id="cat-ft-title" className="dd-h2" data-lines>
              <span className="dd-line"><span>{cfg.featuredTitle[0]}</span></span>
              <span className="dd-line"><span><em>{cfg.featuredTitle[1]}</em></span></span>
            </h2>
          </div>
          <p className="cat-head-side" data-reveal>{cfg.featuredText}</p>
        </header>
        <div className="cat-cc-grid">
          {ranked.map((p, i) => (
            <div key={p.id} className={`cat-cc-cell cat-cc-cell--${i}`} data-reveal data-delay={i * 0.1}>
              <CollectionCard item={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
