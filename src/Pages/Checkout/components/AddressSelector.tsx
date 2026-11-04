import { motion } from "framer-motion";
import { FaBuilding, FaCheckCircle, FaEdit, FaHome, FaMapMarkerAlt, FaPlus, FaTrash } from "react-icons/fa";
import type { Address } from "@/Pages/Checkout/components/AddressForm";

interface Props {
  addresses: Address[];
  selectedId?: number | null;
  onSelect: (a: Address) => void;
  onEdit: (a: Address) => void;
  onDelete: (id: number | undefined) => void;
  onAdd: () => void;
  notice?: string | null;
}

const TypeIcon = ({ type }: { type?: string }) =>
  type === "work" ? <FaBuilding size={13} /> : type === "other" ? <FaMapMarkerAlt size={13} /> : <FaHome size={13} />;

/** Presentational address picker; all state and handlers live in the page (unchanged logic). */
const AddressSelector = ({ addresses, selectedId, onSelect, onEdit, onDelete, onAdd, notice }: Props) => (
  <div className="ck-addrs">
    <div className="ck-addr-grid" role="radiogroup" aria-label="Delivery address">
      {addresses.map((a) => {
        const on = selectedId != null && a.id === selectedId;
        return (
          <motion.div
            key={a.id}
            role="radio"
            aria-checked={on}
            tabIndex={0}
            className={`ck-addr${on ? " is-on" : ""}`}
            onClick={() => onSelect(a)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(a); } }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
          >
            <div className="ck-addr-top">
              <span className="ck-addr-type"><TypeIcon type={a.addressType} /> {a.addressType || "home"}</span>
              {a.isDefault && <span className="ck-pill">Default</span>}
            </div>
            <p className="ck-addr-name">{a.fullName}</p>
            <p>{a.address}</p>
            <p>{a.city}, {a.state} – {a.pincode}</p>
            <p className="ck-addr-phone">Phone: {a.phone}</p>
            <div className="ck-addr-actions">
              <button type="button" aria-label={`Edit address for ${a.fullName}`} onClick={(e) => { e.stopPropagation(); onEdit(a); }}><FaEdit size={12} /> Edit</button>
              <button type="button" aria-label={`Delete address for ${a.fullName}`} onClick={(e) => { e.stopPropagation(); onDelete(a.id); }}><FaTrash size={11} /> Delete</button>
            </div>
            {on && <span className="ck-addr-check"><FaCheckCircle size={12} /> Deliver here</span>}
          </motion.div>
        );
      })}
      <button type="button" className="ck-addr ck-addr-add" onClick={onAdd}>
        <FaPlus size={14} />
        <span>Add new address</span>
      </button>
    </div>
    {notice && <p className="st-msg st-msg--err" role="alert">{notice}</p>}
  </div>
);

export default AddressSelector;
