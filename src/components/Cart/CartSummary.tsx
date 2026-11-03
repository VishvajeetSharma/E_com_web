import { useState, type ReactNode } from "react";
import { FaChevronDown, FaShieldAlt } from "react-icons/fa";

export interface SummaryRow {
  label: ReactNode;
  value: ReactNode;
  tone?: "good";
}

interface Props {
  title: string;
  rows: SummaryRow[];
  totalLabel: string;
  total: number;
  /** Shown struck through next to the total (MRP). */
  strike?: number;
  savings?: number;
  cta: ReactNode;
  note?: ReactNode;
  children?: ReactNode;
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Order-summary panel shared by the bag and the checkout steps. Purely presentational: all numbers come in as props. */
const CartSummary = ({ title, rows, totalLabel, total, strike, savings, cta, note, children }: Props) => (
  <aside className="st-summary" aria-label={title}>
    <h2 className="st-summary-title">{title}</h2>
    <dl className="st-summary-rows">
      {rows.map((r, i) => (
        <div key={i} className={r.tone === "good" ? "is-good" : ""}>
          <dt>{r.label}</dt>
          <dd>{r.value}</dd>
        </div>
      ))}
    </dl>
    <div className="st-summary-total">
      <span>{totalLabel}</span>
      <span className="st-summary-amt">{strike && strike > total ? <s>{inr(strike)}</s> : null}<b>{inr(total)}</b></span>
    </div>
    {savings && savings > 0 ? <p className="st-summary-save">You save {inr(savings)}</p> : null}
    {children}
    <div className="st-summary-cta">{cta}</div>
    <p className="st-summary-note"><FaShieldAlt size={12} /> {note ?? "Easy returns on eligible items."}</p>
  </aside>
);

export const FeesToggle = ({ fee }: { fee: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="st-fees-btn" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        Fees <FaChevronDown size={9} style={{ transform: open ? "rotate(180deg)" : undefined, transition: "transform .3s" }} />
      </button>
      {open && <span className="st-fees-note">Platform fee ₹{fee} (non-refundable)</span>}
    </>
  );
};

export default CartSummary;
