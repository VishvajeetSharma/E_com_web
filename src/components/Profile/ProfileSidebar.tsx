import { FaBoxOpen, FaHeart, FaSignOutAlt, FaStore, FaUser } from "react-icons/fa";
import { NAV_ITEMS } from "./profileData";

interface Props {
  active: string;
  onSelect: (id: string) => void;
  onOrders: () => void;
  onWishlist: () => void;
  onSeller: () => void;
  onLogout: () => void;
}

/** Account navigation. On mobile it becomes a horizontally scrollable tab strip. */
const ProfileSidebar = ({ active, onSelect, onOrders, onWishlist, onSeller, onLogout }: Props) => (
  <aside className="pf-side" aria-label="Account">
    <div className="pf-side-head">
      <span className="pf-avatar" aria-hidden="true"><FaUser size={18} /></span>
      <div>
        <p className="pf-side-title">My account</p>
        <p className="pf-badge">Sample data</p>
      </div>
    </div>
    <nav className="pf-nav" aria-label="Account sections">
      {NAV_ITEMS.map((n) => (
        <button key={n.id} type="button" className={active === n.id ? "is-on" : ""} aria-current={active === n.id ? "page" : undefined} onClick={() => onSelect(n.id)}>
          {n.label}
        </button>
      ))}
      <span className="pf-nav-sep" aria-hidden="true" />
      <button type="button" onClick={onOrders}><FaBoxOpen size={12} /> My orders</button>
      <button type="button" onClick={onWishlist}><FaHeart size={12} /> Wishlist</button>
      <button type="button" onClick={onSeller}><FaStore size={12} /> Become a seller</button>
      <button type="button" className="pf-logout" onClick={onLogout}><FaSignOutAlt size={12} /> Logout</button>
    </nav>
  </aside>
);

export default ProfileSidebar;
