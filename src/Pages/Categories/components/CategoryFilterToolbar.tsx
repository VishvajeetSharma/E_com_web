import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaSlidersH, FaTimes } from "react-icons/fa";
import {
  EMPTY_FILTERS, PRICE_BUCKETS, activeCount,
  type Facets, type FilterState, type SortBy,
} from "@/Pages/Categories/utils/categoryFilters";

type Change = (patch: Partial<FilterState>) => void;

const SORT_OPTIONS: { id: SortBy; label: string }[] = [
  { id: "popularity", label: "Popularity" },
  { id: "low", label: "Price: Low to High" },
  { id: "high", label: "Price: High to Low" },
];

/** Filter controls — used by the desktop sidebar and the mobile sheet. */
export const FilterPanel = ({ facets, filters, onChange }: { facets: Facets; filters: FilterState; onChange: Change }) => (
  <div className="cat-fp">
    <details open className="cat-acc">
      <summary>Category</summary>
      <div className="cat-acc-body">
        <button type="button" aria-pressed={filters.activeFilter === "all"} className={filters.activeFilter === "all" ? "is-on" : ""} onClick={() => onChange({ activeFilter: "all" })}>
          All Items
        </button>
        {facets.groups.map((g) => (
          <div key={g.name} className="cat-tree">
            <button type="button" aria-pressed={filters.activeFilter === g.name} className={`cat-tree-main${filters.activeFilter === g.name ? " is-on" : ""}`} onClick={() => onChange({ activeFilter: g.name })}>
              {g.name} <em>{g.count}</em>
            </button>
            {g.subs.length > 1 || g.subs[0] !== g.name ? (
              <div className="cat-tree-subs">
                {g.subs.map((s) => (
                  <button type="button" key={s} aria-pressed={filters.activeFilter === s} className={filters.activeFilter === s ? "is-on" : ""} onClick={() => onChange({ activeFilter: s })}>{s}</button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </details>

    {facets.priceBuckets.length > 1 && (
      <details open className="cat-acc">
        <summary>Price</summary>
        <div className="cat-acc-body">
          {facets.priceBuckets.map((b) => (
            <button type="button" key={b.id} aria-pressed={filters.price === b.id} className={filters.price === b.id ? "is-on" : ""} onClick={() => onChange({ price: filters.price === b.id ? null : b.id })}>{b.label}</button>
          ))}
        </div>
      </details>
    )}

    {facets.sizes.length > 0 && (
      <details open className="cat-acc">
        <summary>Size <small>(in stock)</small></summary>
        <div className="cat-acc-body cat-chips">
          {facets.sizes.map((s) => (
            <button type="button" key={s} aria-pressed={filters.size === s} className={filters.size === s ? "is-on" : ""} onClick={() => onChange({ size: filters.size === s ? null : s })}>{s}</button>
          ))}
        </div>
      </details>
    )}

    {facets.discounts.length > 0 && (
      <details open className="cat-acc">
        <summary>Discount</summary>
        <div className="cat-acc-body">
          {facets.discounts.map((d) => (
            <button type="button" key={d} aria-pressed={filters.minDiscount === d} className={filters.minDiscount === d ? "is-on" : ""} onClick={() => onChange({ minDiscount: filters.minDiscount === d ? 0 : d })}>{d}% and above</button>
          ))}
        </div>
      </details>
    )}
  </div>
);

interface ToolbarProps {
  count: number;
  sortBy: SortBy;
  onSort: (s: SortBy) => void;
  filters: FilterState;
  onChange: Change;
  onClear: () => void;
  onOpenSheet: () => void;
}

export const CategoryToolbar = ({ count, sortBy, onSort, filters, onChange, onClear, onOpenSheet }: ToolbarProps) => {
  const n = activeCount(filters);
  const chips: { label: string; clear: () => void }[] = [];
  if (filters.activeFilter !== "all") chips.push({ label: filters.activeFilter, clear: () => onChange({ activeFilter: "all" }) });
  if (filters.price) chips.push({ label: PRICE_BUCKETS.find((b) => b.id === filters.price)?.label ?? "Price", clear: () => onChange({ price: null }) });
  if (filters.size) chips.push({ label: `Size ${filters.size}`, clear: () => onChange({ size: null }) });
  if (filters.minDiscount) chips.push({ label: `${filters.minDiscount}%+ off`, clear: () => onChange({ minDiscount: 0 }) });

  return (
    <div className="cat-toolbar">
      <div className="cat-toolbar-row">
        <button type="button" className="cat-filter-btn" onClick={onOpenSheet} aria-label={`Open filters${n ? `, ${n} active` : ""}`}>
          <FaSlidersH size={12} /> Filter {n > 0 && <b>{n}</b>}
        </button>
        <p className="cat-count" aria-live="polite">{count} {count === 1 ? "piece" : "pieces"}</p>
        <div className="cat-sort" role="group" aria-label="Sort products">
          <span>Sort</span>
          {SORT_OPTIONS.map((o) => (
            <button type="button" key={o.id} aria-pressed={sortBy === o.id} className={sortBy === o.id ? "is-on" : ""} onClick={() => onSort(o.id)}>{o.label}</button>
          ))}
        </div>
      </div>
      {chips.length > 0 && (
        <div className="cat-chiprow" aria-label="Active filters">
          {chips.map((c) => (
            <button type="button" key={c.label} className="cat-chip" onClick={c.clear} aria-label={`Remove filter ${c.label}`}>{c.label} <FaTimes size={9} /></button>
          ))}
          <button type="button" className="cat-clear" onClick={onClear}>Clear all</button>
        </div>
      )}
    </div>
  );
};

/** Mobile bottom sheet. */
export const MobileFilterSheet = ({
  open, onClose, facets, filters, onChange, onClear, count,
}: { open: boolean; onClose: () => void; facets: Facets; filters: FilterState; onChange: Change; onClear: () => void; count: number }) => {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", key); };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="cat-sheet-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            className="cat-sheet" role="dialog" aria-modal="true" aria-label="Filters"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cat-sheet-grip" aria-hidden="true" />
            <div className="cat-sheet-head">
              <strong>Filters</strong>
              <button type="button" className="dd-icon-btn" aria-label="Close filters" onClick={onClose}><FaTimes size={16} /></button>
            </div>
            <div className="cat-sheet-body">
              <FilterPanel facets={facets} filters={filters} onChange={onChange} />
            </div>
            <div className="cat-sheet-foot">
              <button type="button" className="dd-btn dd-btn--dark" onClick={onClear} disabled={!activeCount(filters)}>Clear all</button>
              <button type="button" className="dd-btn cat-btn-primary" onClick={onClose}>Show {count} {count === 1 ? "piece" : "pieces"}</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export { EMPTY_FILTERS };
