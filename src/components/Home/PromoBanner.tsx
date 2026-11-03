import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { hiRes, pickProducts, selectProducts, type HomeRootState } from "./homeData";

const PromoBanner = () => {
  const products = useSelector((s: HomeRootState) => selectProducts(s));
  const [a, b] = pickProducts(products, [701, 5, 603], 2);

  return (
    <section className="dd-section dd-promo" aria-labelledby="dd-promo-title">
      <div className="dd-promo-art" aria-hidden="true">
        {a && (
          <div className="dd-promo-img dd-promo-img--a">
            <img data-parallax="9" src={hiRes(a.image, 1000)} alt="" loading="lazy" decoding="async" />
          </div>
        )}
        {b && (
          <div className="dd-promo-img dd-promo-img--b">
            <img data-parallax="5" src={hiRes(b.image, 800)} alt="" loading="lazy" decoding="async" />
          </div>
        )}
      </div>

      <div className="dd-container dd-promo-grid">
        <div className="dd-promo-copy">
          <p className="dd-eyebrow" data-reveal>The First Order Edit</p>
          <h2 id="dd-promo-title" className="dd-h2 dd-h2--light dd-h2--xl" data-lines>
            <span className="dd-line"><span>Twenty percent,</span></span>
            <span className="dd-line"><span><em>on us.</em></span></span>
          </h2>
          <p className="dd-promo-text" data-reveal>
            Your first order with Darling Desire, with free shipping above ₹2,999
            and easy returns for 30 days.
          </p>
          <div className="dd-promo-actions" data-reveal>
            <span className="dd-code" aria-label="Use code FIRST20">Code · FIRST20</span>
            <Link to="/category/women" className="dd-btn dd-btn--gold" onClick={() => window.scrollTo(0, 0)}>Shop Women</Link>
            <Link to="/beauty" className="dd-btn dd-btn--ghost" onClick={() => window.scrollTo(0, 0)}>Shop Beauty</Link>
          </div>
        </div>
      </div>

      <div className="dd-marquee" aria-hidden="true">
        <div className="dd-marquee-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>Darling Desire <i>✦</i></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
