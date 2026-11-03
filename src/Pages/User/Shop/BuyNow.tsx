import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowRight, FaShoppingBag, FaTruck } from "react-icons/fa";
import StoreShell from "../../../components/Store/StoreShell";
import StoreHero from "../../../components/Store/StoreHero";
import AddressForm from "../../../components/Checkout/AddressForm";
import type { Address } from "../../../components/Checkout/AddressForm";
import CheckoutStepper from "../../../components/Checkout/CheckoutStepper";
import AddressSelector from "../../../components/Checkout/AddressSelector";
import OrderReview from "../../../components/Checkout/OrderReview";
import PaymentSummary from "../../../components/Checkout/PaymentSummary";
import type { CartLine } from "../../../components/Cart/CartItem";
import "../../../components/Checkout/checkout.css";

/**
 * Route: /buynow — delivery address + order review.
 * Note (unchanged behaviour): "Buy Now" reads the whole Redux cart, exactly as before; addresses are local state.
 */
const BuyNow = () => {
  const navigate = useNavigate();
  const cartitem: CartLine[] = useSelector((state: { cart: { cartItems: CartLine[] } }) => state.cart.cartItems);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, fullName: "Riya Sharma", phone: "9876543210", address: "42, Linking Road, Bandra West", city: "Mumbai", state: "Maharashtra", pincode: "400050", addressType: "home", isDefault: true },
    { id: 2, fullName: "Riya Sharma", phone: "9876543210", address: "WeWork, Andheri East", city: "Mumbai", state: "Maharashtra", pincode: "400093", addressType: "work", isDefault: false },
  ]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Totals — identical to the previous implementation.
  const subtotal = cartitem.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  const deliveryCharge = subtotal > 999 ? 0 : 99;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryCharge + gst;

  const handleAddAddress = (newAddress: Address) => {
    const newId = Math.max(...addresses.map((a) => a.id ?? 0), 0) + 1;
    const addressToAdd = { ...newAddress, id: newId };
    if (newAddress.isDefault) {
      setAddresses(addresses.map((addr) => ({ ...addr, isDefault: false })).concat(addressToAdd));
      setSelectedAddress(addressToAdd);
    } else {
      setAddresses([...addresses, addressToAdd]);
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowAddAddress(true);
  };

  const handleSaveEditedAddress = (updatedAddress: Address) => {
    if (updatedAddress.isDefault) {
      setAddresses(addresses.map((addr) => (addr.id === updatedAddress.id ? { ...updatedAddress, isDefault: true } : { ...addr, isDefault: false })));
    } else {
      setAddresses(addresses.map((addr) => (addr.id === updatedAddress.id ? updatedAddress : addr)));
    }
    setEditingAddress(null);
  };

  const handleDeleteAddress = (id: number | undefined) => {
    if (addresses.length === 1) {
      setNotice("You need at least one address.");
      return;
    }
    const newAddresses = addresses.filter((addr) => addr.id !== id);
    if (selectedAddress?.id === id) {
      setSelectedAddress(newAddresses.find((addr) => addr.isDefault) || newAddresses[0] || null);
    }
    setAddresses(newAddresses);
    setNotice(null);
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      setNotice("Please select a delivery address.");
      document.getElementById("ck-address")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    window.scrollTo(0, 0);
    navigate("/payment");
  };

  if (cartitem.length === 0) {
    return (
      <StoreShell minimal backLabel="Back">
        <main className="st-main">
          <div className="dd-container">
            <div className="st-empty" role="status">
              <span className="st-empty-mark" aria-hidden="true"><FaShoppingBag size={26} /></span>
              <h2>Your bag is empty</h2>
              <p>Add something you love before checking out.</p>
              <Link to="/dashboard" className="dd-btn dd-btn--dark" onClick={() => window.scrollTo(0, 0)}>Continue shopping <FaArrowRight size={11} /></Link>
            </div>
          </div>
        </main>
      </StoreShell>
    );
  }

  return (
    <StoreShell minimal backLabel="Back to bag">
      <StoreHero eyebrow="Checkout" title="Where should we" accent="deliver?" subtitle="Choose an address and review your order." />
      <main className="st-main">
        <div className="dd-container">
          <CheckoutStepper current={1} />
          <div className="st-cols ck-cols">
            <div className="st-col-main">
              <section className="ck-panel" id="ck-address" aria-labelledby="ck-addr-title">
                <header className="ck-panel-head">
                  <span className="ck-num">1</span>
                  <h2 id="ck-addr-title">Delivery address</h2>
                </header>
                <AddressSelector
                  addresses={addresses}
                  selectedId={selectedAddress?.id}
                  onSelect={(a) => { setSelectedAddress(a); setNotice(null); }}
                  onEdit={handleEditAddress}
                  onDelete={handleDeleteAddress}
                  onAdd={() => { setEditingAddress(null); setShowAddAddress(true); }}
                  notice={notice}
                />
              </section>

              <section className="ck-panel" aria-labelledby="ck-review-title">
                <header className="ck-panel-head">
                  <span className="ck-num">2</span>
                  <h2 id="ck-review-title">Review your order</h2>
                </header>
                <OrderReview items={cartitem} />
                <p className="ck-delivery-note"><FaTruck size={12} /> Free delivery on orders above ₹999</p>
              </section>
            </div>

            <div className="st-col-side">
              <PaymentSummary
                itemCount={cartitem.length}
                subtotal={subtotal}
                deliveryCharge={deliveryCharge}
                gst={gst}
                total={total}
                cta={
                  <button type="button" className="dd-btn dd-btn--gold st-block" onClick={handlePlaceOrder}>
                    Continue to payment
                  </button>
                }
                note={selectedAddress ? <>Delivering to {selectedAddress.city} – {selectedAddress.pincode}</> : "Select an address to continue."}
              />
            </div>
          </div>
        </div>
      </main>

      <AddressForm
        isOpen={showAddAddress}
        onClose={() => { setShowAddAddress(false); setEditingAddress(null); }}
        onSave={editingAddress ? handleSaveEditedAddress : handleAddAddress}
        editData={editingAddress}
      />
    </StoreShell>
  );
};

export default BuyNow;
