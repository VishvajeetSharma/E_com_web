import { Link } from "react-router-dom";
import type { CartLine } from "@/components/data-display/CartItem";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Read-only list of what is being ordered (the Redux cart). */
const OrderReview = ({ items }: { items: CartLine[] }) => (
  <ul className="ck-review">
    {items.map((it) => (
      <li key={`${it.id}-${it.size ?? ""}`}>
        <Link to={`/product/${it.id}`} className="ck-review-img" aria-label={`View ${it.name}`}>
          <img src={it.image} alt="" loading="lazy" decoding="async" />
        </Link>
        <div className="ck-review-body">
          <p className="ck-review-name">{it.name}</p>
          <p className="ck-review-opts">
            {it.size ? <span>Size {it.size}</span> : null}
            <span>Qty {it.quantity}</span>
          </p>
        </div>
        <p className="ck-review-price">{inr(it.price * it.quantity)}</p>
      </li>
    ))}
  </ul>
);

export default OrderReview;
