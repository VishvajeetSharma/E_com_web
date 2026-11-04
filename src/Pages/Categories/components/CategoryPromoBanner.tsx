import { motion } from "framer-motion";
import { hiRes, type HomeProduct } from "@/utils/storefront";
import type { CategoryConfig } from "@/Pages/Categories/utils/categoryConfig";

interface Props { cfg: CategoryConfig; maxDiscount: number; total: number; image?: HomeProduct; onShop: () => void }

/** Only claims what the product data supports: the largest real discount in this collection. */
const CategoryPromoBanner = ({ cfg, maxDiscount, total, image, onShop }: Props) => {
  if (maxDiscount <= 0) return null;
  return (
    <aside className={`cat-promo cat-promo--${cfg.key}`} aria-label="Collection offer">
      <div className="cat-promo-art" aria-hidden="true">
        {image && <img data-parallax="8" src={hiRes(image.image, 1000)} alt="" loading="lazy" decoding="async" />}
        <span className="cat-promo-veil" />
      </div>
      <div className="cat-promo-copy">
        <p className="dd-eyebrow">{cfg.title} · {total} pieces</p>
        <h2 className="dd-h2">Up to <em>{maxDiscount}% off</em><br />selected pieces.</h2>
        <motion.button type="button" className="dd-btn cat-btn-primary" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={onShop}>
          Shop the savings
        </motion.button>
      </div>
    </aside>
  );
};

export default CategoryPromoBanner;
