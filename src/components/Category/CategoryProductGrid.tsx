import { Fragment, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaShoppingBag } from "react-icons/fa";
import HomeProductCard from "../Home/HomeProductCard";
import type { HomeProduct } from "../Home/homeData";
import Tilt from "./Tilt";

const Skeleton = () => (
  <li className="cat-skel" aria-hidden="true">
    <div className="cat-skel-img" />
    <div className="cat-skel-line" style={{ width: "40%" }} />
    <div className="cat-skel-line" style={{ width: "85%" }} />
    <div className="cat-skel-line" style={{ width: "55%" }} />
    <div className="cat-skel-btn" />
  </li>
);

interface Props {
  products: HomeProduct[];
  loading: boolean;
  filtered: boolean;
  onClear: () => void;
  /** Rendered full-width between the first 8 products and the rest. */
  interlude?: React.ReactNode;
}

const CategoryProductGrid = ({ products, loading, filtered, onClear, interlude }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const key = products.map((p) => p.id).join(",");

  useGSAP(
    () => {
      if (loading) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".cat-cell", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: { amount: 0.5 }, clearProps: "transform,opacity" });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [loading, key] },
  );

  if (loading) {
    return <ul className="dd-grid cat-grid" aria-busy="true" aria-label="Loading products">{Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)}</ul>;
  }

  if (!products.length) {
    return (
      <div className="cat-empty" role="status">
        <span className="cat-empty-icon"><FaShoppingBag size={22} /></span>
        <h3>{filtered ? "Nothing matches those filters" : "No products found"}</h3>
        <p>{filtered ? "Try removing a filter or two to see more pieces." : "There are no pieces in this collection yet."}</p>
        {filtered && <button type="button" className="dd-btn cat-btn-primary" onClick={onClear}>Clear filters</button>}
      </div>
    );
  }

  const first = products.slice(0, 8);
  const rest = products.slice(8);
  const cell = (p: HomeProduct) => (
    <li key={p.id} className="cat-cell">
      <Tilt max={4} className="cat-card-tilt"><HomeProductCard item={p} /></Tilt>
    </li>
  );

  return (
    <div ref={ref}>
      <ul className="dd-grid cat-grid">{first.map(cell)}</ul>
      {interlude && <Fragment>{interlude}</Fragment>}
      {rest.length > 0 && <ul className="dd-grid cat-grid">{rest.map(cell)}</ul>}
    </div>
  );
};

export default CategoryProductGrid;
