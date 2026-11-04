import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HomeProductCard from "@/components/data-display/ProductCard";
import type { HomeProduct } from "@/utils/storefront";

interface Props {
  id?: string;
  className?: string;
  eyebrow: string;
  titleLines: [string, string];
  subtitle: string;
  products: HomeProduct[];
  initialCount: number;
  filterable?: boolean;
  stagger?: boolean;
  cta?: { label: string; to: string };
}

/** Real products only — whatever the Redux store hands us. Renders nothing if empty. */
const ProductShelf = ({
  id, className = "", eyebrow, titleLines, subtitle, products,
  initialCount, filterable, stagger, cta,
}: Props) => {
  const [filter, setFilter] = useState("all");
  const [all, setAll] = useState(false);

  const genders = useMemo(
    () => Array.from(new Set(products.map((p) => p.gender))).filter(Boolean),
    [products],
  );
  const filtered = filter === "all" ? products : products.filter((p) => p.gender === filter);
  const shown = all ? filtered : filtered.slice(0, initialCount);

  if (!products.length) return null;

  return (
    <section id={id} className={`dd-section dd-shelf ${className}`}>
      <div className="dd-container">
        <header className="dd-shelf-head">
          <div>
            <p className="dd-eyebrow" data-reveal>{eyebrow}</p>
            <h2 className="dd-h2" data-lines>
              <span className="dd-line"><span>{titleLines[0]}</span></span>
              <span className="dd-line"><span><em>{titleLines[1]}</em></span></span>
            </h2>
          </div>
          <div className="dd-shelf-side" data-reveal>
            <p>{subtitle}</p>
            {cta && <Link className="dd-link" to={cta.to} onClick={() => window.scrollTo(0, 0)}>{cta.label} <span aria-hidden="true">→</span></Link>}
          </div>
        </header>

        {filterable && genders.length > 1 && (
          <div className="dd-filters" role="tablist" aria-label="Filter products" data-reveal>
            {["all", ...genders].map((g) => (
              <button
                key={g}
                type="button"
                role="tab"
                aria-selected={filter === g}
                className={filter === g ? "is-on" : ""}
                onClick={() => { setFilter(g); setAll(false); }}
              >
                {g === "all" ? "All" : g[0].toUpperCase() + g.slice(1)}
              </button>
            ))}
          </div>
        )}

        <ul className={`dd-grid${stagger ? " dd-grid--stagger" : ""}`}>
          {shown.map((p) => (
            <li key={`${filter}-${p.id}`} data-card>
              <HomeProductCard item={p} />
            </li>
          ))}
        </ul>

        {filtered.length > initialCount && (
          <div className="dd-more">
            <button type="button" className="dd-btn dd-btn--dark" onClick={() => setAll((v) => !v)}>
              {all ? "Show fewer" : `View all ${filtered.length}`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductShelf;
