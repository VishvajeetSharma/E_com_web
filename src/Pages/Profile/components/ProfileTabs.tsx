import { useState } from "react";
import { FaChevronRight, FaStar } from "react-icons/fa";
import { SAMPLE_ADDRESSES, SAMPLE_COUPONS, SAMPLE_REVIEWS, SAMPLE_USER, SAMPLE_WALLET } from "@/Pages/Profile/utils/profileData";
import { homeToast } from "@/utils/toast";

const Sample = () => <p className="pf-note pf-note--top">Sample data — not connected to an account.</p>;

export const WalletTab = () => (
  <div>
    <h2 className="pf-h2">Wallet</h2>
    <Sample />
    <div className="pf-balance">
      <small>Available balance</small>
      <b>₹{SAMPLE_WALLET.balance.toLocaleString("en-IN")}</b>
    </div>
    <ul className="pf-list">
      {SAMPLE_WALLET.transactions.map((t) => (
        <li key={t.id}>
          <div><b>{t.label}</b><small>{t.date}</small></div>
          <span className={t.type === "credit" ? "is-credit" : "is-debit"}>{t.type === "credit" ? "+" : "−"}₹{Math.abs(t.amount).toLocaleString("en-IN")}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const AddressesTab = () => (
  <div>
    <h2 className="pf-h2">Saved addresses</h2>
    <Sample />
    <div className="pf-grid2">
      {SAMPLE_ADDRESSES.map((a) => (
        <div key={a.id} className={`pf-card${a.isDefault ? " is-default" : ""}`}>
          <p className="pf-eyebrow">{a.type}{a.isDefault && <span className="pf-pill">Default</span>}</p>
          <p>{a.address}</p>
          <p>{a.city}, {a.state} – {a.pincode}</p>
        </div>
      ))}
    </div>
    <p className="pf-muted">Manage the delivery address you use at checkout from the Buy Now step.</p>
  </div>
);

export const CouponsTab = () => {
  const active = SAMPLE_COUPONS.filter((c) => !c.used).length;
  const copy = async (code: string) => {
    try { await navigator.clipboard.writeText(code); homeToast("Code copied", code); }
    catch { homeToast("Couldn’t copy", `Your code is ${code}`); }
  };
  return (
    <div>
      <h2 className="pf-h2">Coupons <span className="pf-count">{active} active</span></h2>
      <Sample />
      <ul className="pf-coupons">
        {SAMPLE_COUPONS.map((c) => (
          <li key={c.code} className={c.used ? "is-used" : ""}>
            <div><b>{c.code}</b><small>Min. {c.min} · Expires {c.expiry}</small></div>
            <div className="pf-coupon-r">
              <strong>{c.discount}</strong>
              {c.used ? <span className="pf-muted">Used</span> : <button type="button" onClick={() => copy(c.code)}>Copy code</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ReviewsTab = () => (
  <div>
    <h2 className="pf-h2">My reviews</h2>
    <Sample />
    <ul className="pf-reviews">
      {SAMPLE_REVIEWS.map((r) => (
        <li key={r.id}>
          <img src={r.image} alt="" loading="lazy" decoding="async" />
          <div>
            <b>{r.product}</b>
            <p className="pf-stars" aria-label={`${r.rating} out of 5`}>{Array.from({ length: 5 }).map((_, i) => <FaStar key={i} size={11} className={i < r.rating ? "on" : ""} />)}</p>
            <p>{r.comment}</p>
            <small>{r.date}</small>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const FIELDS_BASIC = ["Full Name", "Email", "Phone", "Date of Birth", "Gender"] as const;
const FIELDS_SECURITY = ["Username", "Password"] as const;

/** Same local-state editing as before; adds inline validation for email and phone. */
function validate(field: string, v: string): string | null {
  if (field === "Email" && !/^\S+@\S+\.\S+$/.test(v)) return "Enter a valid email address.";
  if (field === "Phone" && v.replace(/\D/g, "").length < 10) return "Enter a phone number with at least 10 digits.";
  if (field === "Full Name" && !v.trim()) return "Name can’t be empty.";
  return null;
}

export const SettingsTab = () => {
  const [editing, setEditing] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({
    "Full Name": SAMPLE_USER.name, Email: SAMPLE_USER.email, Phone: SAMPLE_USER.phone,
    "Date of Birth": SAMPLE_USER.dob, Gender: SAMPLE_USER.gender, Username: SAMPLE_USER.username, Password: "••••••••••",
  });

  const row = (field: string) => {
    const on = editing === field;
    const err = on ? validate(field, values[field]) : null;
    return (
      <div key={field} className={`pf-field${on ? " is-on" : ""}${err ? " has-err" : ""}`}>
        <button type="button" className="pf-field-btn" aria-expanded={on} disabled={field === "Password"} onClick={() => setEditing(on ? null : field)}>
          <span className="pf-field-label">{field}</span>
          {on && field !== "Password" ? null : <span className="pf-field-val">{values[field]}</span>}
          <FaChevronRight size={11} className="pf-field-chev" />
        </button>
        {on && field !== "Password" && (
          <div className="pf-field-edit">
            <input
              autoFocus aria-label={field} value={values[field]} aria-invalid={!!err}
              onChange={(e) => setValues((p) => ({ ...p, [field]: e.target.value }))}
              onKeyDown={(e) => { if (e.key === "Enter" && !err) setEditing(null); }}
            />
            <button type="button" disabled={!!err} onClick={() => setEditing(null)}>Done</button>
            {err && <p className="st-msg st-msg--err" role="alert">{err}</p>}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h2 className="pf-h2">Account settings</h2>
      <Sample />
      <p className="pf-eyebrow">Basic information</p>
      {FIELDS_BASIC.map(row)}
      <p className="pf-eyebrow pf-eyebrow--gap">Account security</p>
      {FIELDS_SECURITY.map(row)}
      <p className="pf-eyebrow pf-eyebrow--gap">Notifications</p>
      {[{ label: "Order updates via SMS", on: true }, { label: "Order updates via Email", on: true }, { label: "Promotional offers", on: false }, { label: "New arrivals & sales", on: true }].map((p) => (
        <label key={p.label} className="pf-toggle">
          <span>{p.label}</span>
          <input type="checkbox" defaultChecked={p.on} />
          <i aria-hidden="true" />
        </label>
      ))}
    </div>
  );
};
