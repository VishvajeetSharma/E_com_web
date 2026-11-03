import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  COLLECTIONS, hiRes, pickProducts, selectProducts, type HomeRootState,
} from "./homeData";

const Collections = () => {
  const products = useSelector((s: HomeRootState) => selectProducts(s));
  const [broken, setBroken] = useState<Record<string, boolean>>({});

  const images = useMemo(
    () =>
      Object.fromEntries(
        COLLECTIONS.map((c) => [c.id, pickProducts(products, [...c.pick], 1)[0]?.image]),
      ) as Record<string, string | undefined>,
    [products],
  );

  return (
    <section id="collections" className="dd-section dd-collections">
      <div className="dd-container">
        <header className="dd-center-head">
          <p className="dd-eyebrow" data-reveal>Featured Collections</p>
          <h2 className="dd-h2" data-lines>
            <span className="dd-line"><span>Five worlds,</span></span>
            <span className="dd-line"><span><em>one wardrobe.</em></span></span>
          </h2>
        </header>

        <ul className="dd-coll-grid">
          {COLLECTIONS.map((c, i) => {
            const src = images[c.id];
            return (
              <li key={c.id} className={`dd-coll dd-coll--${c.id}`} data-card>
                <motion.div className="dd-coll-inner" initial="rest" whileHover="hover" whileTap="hover" animate="rest">
                  <Link to={c.path} onClick={() => window.scrollTo(0, 0)} aria-label={`Shop ${c.label}`}>
                    {src && !broken[c.id] && (
                      <motion.img
                        src={hiRes(src, 1100)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        onError={() => setBroken((b) => ({ ...b, [c.id]: true }))}
                        variants={{ rest: { scale: 1.02 }, hover: { scale: 1.11 } }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    <span className="dd-coll-shade" aria-hidden="true" />
                    <motion.span
                      className="dd-coll-border"
                      aria-hidden="true"
                      variants={{ rest: { opacity: 0, inset: 22 }, hover: { opacity: 1, inset: 14 } }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <span className="dd-coll-num">0{i + 1}</span>
                    <span className="dd-coll-copy">
                      <small>{c.tag}</small>
                      <strong>{c.label}</strong>
                      <motion.span
                        className="dd-coll-cta"
                        variants={{ rest: { x: 0 }, hover: { x: 8 } }}
                        transition={{ duration: 0.4 }}
                      >
                        Explore <i aria-hidden="true">→</i>
                      </motion.span>
                    </span>
                  </Link>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Collections;
