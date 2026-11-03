import { useSelector } from "react-redux";
import { FaBoxOpen, FaHeart, FaShoppingBag } from "react-icons/fa";

interface State {
  order: { orders: { orderId: string; status: string; amount: number; date: string }[] };
  wishlist: { wishlistItems: unknown[] };
  cart: { cartItems: { quantity: number }[] };
}

interface Props { onOrders: () => void; onWishlist: () => void; onCart: () => void }

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** The only real data on the account page: live counts from the existing Redux store. */
const ProfileOverview = ({ onOrders, onWishlist, onCart }: Props) => {
  const orders = useSelector((s: State) => s.order.orders);
  const wish = useSelector((s: State) => s.wishlist.wishlistItems.length);
  const cart = useSelector((s: State) => s.cart.cartItems.reduce((t, i) => t + i.quantity, 0));
  const latest = orders[0];
  return (
    <div>
      <h2 className="pf-h2">Overview</h2>
      <div className="pf-stats">
        <button type="button" onClick={onOrders}><FaBoxOpen size={18} /><b>{orders.length}</b><span>{orders.length === 1 ? "Order" : "Orders"}</span></button>
        <button type="button" onClick={onWishlist}><FaHeart size={18} /><b>{wish}</b><span>Wishlist</span></button>
        <button type="button" onClick={onCart}><FaShoppingBag size={18} /><b>{cart}</b><span>In your bag</span></button>
      </div>
      <div className="pf-card">
        <p className="pf-eyebrow">Latest order</p>
        {latest ? (
          <div className="pf-latest">
            <div><b>{latest.orderId}</b><small>{new Date(latest.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</small></div>
            <div><span className="pf-pill">{latest.status}</span><b>{inr(latest.amount)}</b></div>
          </div>
        ) : (
          <p className="pf-muted">You haven’t placed an order yet.</p>
        )}
      </div>
      <p className="pf-note">Wallet, addresses, coupons, reviews and personal details below are sample data — this app doesn’t have account sign-in connected yet.</p>
    </div>
  );
};

export default ProfileOverview;
