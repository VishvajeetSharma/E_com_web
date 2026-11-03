import type { ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
}

/** Editorial page header used across the bag / account pages. */
const StoreHero = ({ eyebrow, title, accent, subtitle, children, compact = true }: Props) => (
  <section className={`st-hero${compact ? " st-hero--compact" : ""}`}>
    <div className="dd-container st-hero-in">
      <div>
        <p className="dd-eyebrow">{eyebrow}</p>
        <h1 className="st-h1" data-lines>
          <span className="dd-line"><span>{title}{accent ? <> <em>{accent}</em></> : null}</span></span>
        </h1>
        {subtitle && <p className="st-hero-sub">{subtitle}</p>}
      </div>
      {children && <div className="st-hero-side">{children}</div>}
    </div>
  </section>
);

export default StoreHero;
