import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Tilt from "../Category/Tilt";
import { hiRes, type HomeProduct } from "../Home/homeData";

interface Props { picks: HomeProduct[]; total: number; maxDiscount: number; onShop: () => void; onFeatured: () => void }

/** CSS-only depth: layered frames, floating gold rings and a pointer tilt. No WebGL needed on this page. */
const BeautyHero = ({ picks, total, maxDiscount, onShop, onFeatured }: Props) => {
  const [a, b, c] = picks;
  return (
    <section className="bt-hero" aria-labelledby="bt-title">
      <span className="bt-orb bt-orb--1" aria-hidden="true" />
      <span className="bt-orb bt-orb--2" aria-hidden="true" />
      <div className="dd-container bt-hero-in">
        <div className="bt-hero-copy">
          <p className="dd-eyebrow bt-eyebrow">The Beauty Edit</p>
          <h1 id="bt-title" className="bt-h1" data-lines>
            <span className="dd-line"><span>Ritual,</span></span>
            <span className="dd-line"><span><em>refined.</em></span></span>
          </h1>
          <p className="bt-lede">Skincare, makeup and finishing touches — selected for how they feel and how they last.</p>
          <p className="bt-meta"><span>{total} pieces</span>{maxDiscount > 0 && <span>Up to {maxDiscount}% off</span>}</p>
          <div className="bt-cta">
            <motion.button type="button" className="dd-btn dd-btn--gold" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={onShop}>Shop all beauty</motion.button>
            <motion.button type="button" className="dd-btn dd-btn--ghost" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={onFeatured}>Best sellers</motion.button>
          </div>
        </div>

        <div className="bt-hero-art">
          {a && (
            <Tilt max={7} className="bt-tilt">
              <Link to={`/product/${a.id}`} className="bt-frame bt-frame--main" aria-label={`View ${a.name}`} onClick={() => window.scrollTo(0, 0)}>
                <img src={hiRes(a.image, 900)} alt={a.name} fetchPriority="high" decoding="async" />
                <span className="bt-frame-cap"><small>Featured</small>{a.name}</span>
              </Link>
            </Tilt>
          )}
          {b && <Link to={`/product/${b.id}`} className="bt-frame bt-frame--b" aria-label={`View ${b.name}`} onClick={() => window.scrollTo(0, 0)}><img src={hiRes(b.image, 500)} alt="" decoding="async" /></Link>}
          {c && <Link to={`/product/${c.id}`} className="bt-frame bt-frame--c" aria-label={`View ${c.name}`} onClick={() => window.scrollTo(0, 0)}><img src={hiRes(c.image, 500)} alt="" decoding="async" /></Link>}
        </div>
      </div>
    </section>
  );
};

export default BeautyHero;
