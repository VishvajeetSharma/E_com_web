import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { hiRes, pickProducts, selectProducts, type HomeRootState } from "@/utils/storefront";

const BrandStory = () => {
  const products = useSelector((s: HomeRootState) => selectProducts(s));
  const [bg, inset] = pickProducts(products, [5, 603], 2);

  return (
    <section className="dd-section dd-story" aria-labelledby="dd-story-title">
      <div className="dd-story-bgwrap" aria-hidden="true">
        {bg && <img className="dd-story-bg" data-parallax="7" src={hiRes(bg.image, 1600)} alt="" loading="lazy" decoding="async" />}
        <span className="dd-story-veil" />
      </div>

      <div className="dd-container dd-story-grid">
        <div className="dd-story-copy">
          <p className="dd-eyebrow" data-reveal>Our Story</p>
          <h2 id="dd-story-title" className="dd-h2 dd-h2--light" data-lines>
            <span className="dd-line"><span>Made for those</span></span>
            <span className="dd-line"><span>who dress with</span></span>
            <span className="dd-line"><span><em>intention.</em></span></span>
          </h2>
          <p className="dd-story-text" data-reveal>
            Darling Desire began with a quiet belief: that getting dressed is a
            small ceremony, and the things you choose should feel like they were
            chosen for you. We gather pieces across fashion, beauty and living —
            each one picked for how it feels in the hand and how it stays with you.
          </p>
          <div className="dd-story-foot" data-reveal>
            <Link to="/category/women" className="dd-btn dd-btn--gold" onClick={() => window.scrollTo(0, 0)}>
              Discover the edit
            </Link>
            <span className="dd-sign">Darling Desire · Since 2024</span>
          </div>
        </div>

        {inset && (
          <figure className="dd-story-inset" data-reveal data-delay="0.15">
            <div className="dd-story-inset-img">
              <img src={hiRes(inset.image, 800)} alt={inset.name} loading="lazy" decoding="async" />
            </div>
            <figcaption>
              <small>Featured</small>
              <Link to={`/product/${inset.id}`} onClick={() => window.scrollTo(0, 0)}>{inset.name}</Link>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
};

export default BrandStory;
