import { memo } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaBolt, FaHeart, FaMinus, FaPlus, FaRegHeart, FaTrashAlt } from "react-icons/fa";

export interface CartLine {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface Props {
  item: CartLine;
  deliveryDate: string;
  wished: boolean;
  onQty: (id: number, qty: number) => void;
  onRemove: (id: number, size?: string) => void;
  onToggleWish: (id: number) => void;
  onBuy: () => void;
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const CartItem = ({ item, deliveryDate, wished, onQty, onRemove, onToggleWish, onBuy }: Props) => {
  const pct = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : null;
  return (
    <motion.li
      layout
      className="st-line"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/product/${item.id}`} className="st-line-img" onClick={() => window.scrollTo(0, 0)} aria-label={`View ${item.name}`}>
        <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
        {pct && pct > 0 ? <span className="st-line-pct">{pct}% off</span> : null}
      </Link>

      <div className="st-line-body">
        <div className="st-line-top">
          <div>
            <h3><Link to={`/product/${item.id}`} onClick={() => window.scrollTo(0, 0)}>{item.name}</Link></h3>
            <p className="st-line-opts">
              {item.size && <span>Size {item.size}</span>}
              {item.color && <span>Colour {item.color}</span>}
            </p>
          </div>
          <button
            type="button"
            className={`st-icon${wished ? " is-on" : ""}`}
            aria-pressed={wished}
            aria-label={wished ? `Unsave ${item.name}` : `Save ${item.name}`}
            onClick={() => onToggleWish(item.id)}
          >
            {wished ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
          </button>
        </div>

        <p className="st-line-price">
          <strong>{inr(item.price)}</strong>
          {item.originalPrice ? <s>{inr(item.originalPrice)}</s> : null}
        </p>
        <p className="st-line-delivery">Delivery by <b>{deliveryDate}</b></p>

        <div className="st-line-foot">
          <div className="st-qty" role="group" aria-label={`Quantity for ${item.name}`}>
            <button type="button" aria-label="Decrease quantity" onClick={() => onQty(item.id, item.quantity - 1)} disabled={item.quantity <= 1}><FaMinus size={9} /></button>
            <span aria-live="polite" className="st-qty-n">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.b key={item.quantity} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.18 }}>{item.quantity}</motion.b>
              </AnimatePresence>
            </span>
            <button type="button" aria-label="Increase quantity" onClick={() => onQty(item.id, item.quantity + 1)}><FaPlus size={9} /></button>
          </div>
          <div className="st-line-actions">
            <button type="button" onClick={() => onRemove(item.id, item.size)}><FaTrashAlt size={11} /> Remove</button>
            <button type="button" onClick={onBuy}><FaBolt size={11} /> Buy now</button>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export default memo(CartItem);
