import { motion } from "framer-motion";
import { hiRes } from "@/utils/storefront";
import type { Facets } from "@/pages/Categories/utils/categoryFilters";
import type { CategoryConfig } from "@/pages/Categories/utils/categoryConfig";

interface Props { cfg: CategoryConfig; groups: Facets["groups"]; active: string; onPick: (name: string) => void }

/** Subcategory cards built from the real mainCategory groups of this gender's products. */
const CategoryHighlights = ({ cfg, groups, active, onPick }: Props) => {
  if (!groups.length) return null;
  return (
    <section className="cat-section cat-highlights" aria-labelledby="cat-hl-title">
      <div className="dd-container">
        <header className="cat-head">
          <div>
            <p className="dd-eyebrow" data-reveal>Category Highlights</p>
            <h2 id="cat-hl-title" className="dd-h2" data-lines>
              <span className="dd-line"><span>{cfg.highlightsTitle[0]}</span></span>
              <span className="dd-line"><span><em>{cfg.highlightsTitle[1]}</em></span></span>
            </h2>
          </div>
        </header>
        <ul className="cat-hl-grid">
          {groups.map((g, i) => (
            <li key={g.name} data-reveal data-delay={Math.min(i * 0.06, 0.4)}>
              <motion.button
                type="button"
                className={`cat-hl${active.toLowerCase() === g.name.toLowerCase() ? " is-on" : ""}`}
                onClick={() => onPick(g.name)}
                initial="rest" whileHover="hover" whileTap="hover" animate="rest"
                aria-label={`Show ${g.name} (${g.count} ${g.count === 1 ? "piece" : "pieces"})`}
              >
                <span className="cat-hl-media">
                  {g.sample && (
                    <motion.img
                      src={hiRes(g.sample.image, 700)} alt="" loading="lazy" decoding="async"
                      variants={{ rest: { scale: 1 }, hover: { scale: 1.09 } }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <motion.span className="cat-hl-line" aria-hidden="true" variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.5 }} />
                </span>
                <span className="cat-hl-label">
                  <strong>{g.name}</strong>
                  <small>{g.count} {g.count === 1 ? "piece" : "pieces"}</small>
                </span>
              </motion.button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CategoryHighlights;
