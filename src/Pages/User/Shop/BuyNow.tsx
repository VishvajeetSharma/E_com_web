import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {Footer}  from "../../../components/Footer/Footer";
import { useSelector } from "react-redux";
import Header from "../../../components/Header/Heading";
// import { clearCart } from "../../../redux/cartSlice";
import {
  FaArrowLeft,
  FaCreditCard,
  FaTruck,
  FaShieldAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaHome,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";

import AddressForm from "../../../components/Checkout/AddressForm"; // Import the separate component
import type { Address } from "../../../components/Checkout/AddressForm";

// Address Card Component
const AddressCard = ({
  address,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: any) => {
  const getAddressIcon = () => {
    switch (address.addressType) {
      case "home":
        return <FaHome className="text-pink-500 font-google" size={14} />;
      case "work":
        return <FaBuilding className="text-purple-500 font-google" size={14} />;
      default:
        return <FaMapMarkerAlt className="text-gray-500 font-google     " size={14} />;
    }
  };

  return (
 <>

    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected
          ? "border-pink-500 bg-pink-50"
          : "border-gray-200 hover:border-pink-300"
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {getAddressIcon()}
            <span className="text-sm font-medium text-gray-900 capitalize">
              {address.addressType || "Home"}
            </span>
            {address.isDefault && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-google ">
                Default
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-gray-900 font-google ">
            {address.fullName}
          </p>
          <p className="text-sm text-gray-600 mt-1">{address.address}</p>
          <p className="text-sm text-gray-600 font-google ">
            {address.city}, {address.state} - {address.pincode}
          </p>
          <p className="text-sm text-gray-600 font-google  mt-1">Phone: {address.phone}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(address);
            }}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition"
          >
            <FaEdit size={14} className="text-gray-500 font-google " />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(address.id);
            }}
            className="p-1.5 hover:bg-red-50 rounded-lg transition"
          >
            <FaTrash size={14} className="text-red-400 font-google " />
          </button>
        </div>
      </div>
      {isSelected && (
        <div className="mt-2 flex items-center gap-1 text-pink-500 text-xs font-google ">
          <FaCheckCircle size={12} />
          <span>Deliver to this address</span>
        </div>
      )}
    </div>
        


 
 </>
  );
};

const BuyNow = () => {
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  const cartitem = useSelector((state: any) => state.cart.cartItems);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      fullName: "Riya Sharma",
      phone: "9876543210",
      address: "42, Linking Road, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050",
      addressType: "home",
      isDefault: true,
    },
    {
      id: 2,
      fullName: "Riya Sharma",
      phone: "9876543210",
      address: "WeWork, Andheri East",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400093",
      addressType: "work",
      isDefault: false,
    },
  ]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Calculate totals
  const subtotal = cartitem.reduce(
    (sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 0),
    0,
  );
  const deliveryCharge = subtotal > 999 ? 0 : 99;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryCharge + gst;

  // Handle add new address
  const handleAddAddress = (newAddress: Address) => {
    const newId = Math.max(...addresses.map((a) => a.id??0), 0) + 1;
    const addressToAdd = {
      ...newAddress,
      id: newId,
    };

    if (newAddress.isDefault) {
      setAddresses(
        addresses
          .map((addr) => ({ ...addr, isDefault: false }))
          .concat(addressToAdd),
      );
      setSelectedAddress(addressToAdd);
    } else {
      setAddresses([...addresses, addressToAdd]);
    }
  };

  // Handle edit address
  const handleEditAddress = (address: any) => {
    setEditingAddress(address);
    setShowAddAddress(true);
  };

  // Handle save edited address
  const handleSaveEditedAddress = (updatedAddress: any) => {
    if (updatedAddress.isDefault) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === updatedAddress.id
            ? { ...updatedAddress, isDefault: true }
            : { ...addr, isDefault: false },
        ),
      );
    } else {
      setAddresses(
        addresses.map((addr) =>
          addr.id === updatedAddress.id ? updatedAddress : addr,
        ),
      );
    }
    setEditingAddress(null);
  };

  // Handle delete address
  const handleDeleteAddress = (id: any) => {
    if (addresses.length === 1) {
      alert("You need at least one address");
      return;
    }
    const newAddresses = addresses.filter((addr) => addr.id !== id);
    if (selectedAddress?.id === id) {
      const defaultAddr =
        newAddresses.find((addr) => addr.isDefault) || newAddresses[0];
      if (defaultAddr) {
        setSelectedAddress(defaultAddr);
      } else {
        setSelectedAddress(null);
      }
    }
    setAddresses(newAddresses);
  };

  // Handle place order
  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }
    // dispatch(clearCart());
    // alert("Order placed successfully!");
    window.scrollTo(0, 0);  
    navigate("/payment");
  };

  // Empty cart state
  if (cartitem.length === 0) {
    return (
      <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2 font-google ">
            Your cart is empty
          </h2>
          <p className="text-gray-500 text-sm mb-6 font-google ">
            Looks like you haven't added anything yet
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition font-google "
          >
            Continue Shopping
          </button>
        </div>
      </div>

      </>
    );
  }

  return (
    <>
     <Header/>
    <div className="min-h-screen bg-gray-50 pb-12 py-5 px-1 md:py-10 md:px-15">
      {/* Header */}
 <div className="bg-white border-b border-[#d5d9d9]">
  <div className=" px-4 py-4">
    <button
      onClick={() => navigate(-1)}
      className="  md:hidden flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors group mb-2"
    >
      <FaArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
      <span className="text-sm">Back</span>
    </button>
    
    <div className="flex items-center gap-3">
      <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
      <h1 className="text-xl font-semibold text-gray-800">
        Select Delivery Address
      </h1>
    </div>
  </div>
</div>

      <div className=" mx-auto ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Address Section */}
          <div className="lg:w-2/3">
            <div className="bg-white  p-6 border border-[#d5d9d9] mt-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 font-google ">
                  Saved Addresses
                </h2>
                <button
                  onClick={() => {
                    setEditingAddress(null);
                    setShowAddAddress(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition"
                >
                  <FaPlus size={12} />
                  <span className="text-sm font-medium font-google ">Add New Address</span>
                </button>
              </div>

              <div className="space-y-3">
                {addresses.map((address: any) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    isSelected={selectedAddress?.id === address.id}
                    onSelect={() => setSelectedAddress(address)}
                    onEdit={handleEditAddress}
                    onDelete={handleDeleteAddress}
                  />
                ))}
              </div>

              {!selectedAddress && addresses.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-yellow-700 text-sm font-google ">
                  Please select an address to continue
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white  p-6 sticky top-20   mt-4 border border-[#d5d9d9]">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 font-google ">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
                {cartitem.map((item: any) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 font-google ">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 font-google ">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-xs text-gray-500 font-google ">Size: {item.size}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-semibold text-gray-900 font-google ">
                          ₹{item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-google ">Subtotal</span>
                  <span className="text-gray-900 font-google ">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-google ">Delivery Charges</span>
                  <span
                    className={
                      deliveryCharge === 0 ? "text-green-600" : "text-gray-900"
                    }
                  >
                    {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-google ">GST (5%)</span>
                  <span className="text-gray-900 font-google ">₹{gst}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-2">
                  <div className="flex justify-between font-semibold text-gray-900 font-google ">
                    <span>Total</span>
                    <span className="text-lg font-google ">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={!selectedAddress}
                className={`w-full py-3 mt-4 font-medium rounded-lg transition ${
                  selectedAddress
                    ? "bg-linear-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 font-google "
                    : "bg-gray-200 text-gray-400 cursor-not-allowed font-google "
                }`}
              >
                Proceed for next • ₹{total.toLocaleString()}
              </button>

              {/* Delivery Info */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FaTruck size={12} />
                  <span className="font-google ">Free delivery on orders above ₹999</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                  <FaCreditCard size={12} />
                  <span className="font-google ">Secure payment guaranteed</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                  <FaShieldAlt size={12} />
                  <span className="font-google " >100% buyer protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Address Modal - Using Separate Component */}
      <AddressForm
        isOpen={showAddAddress}
        onClose={() => {
          setShowAddAddress(false);
          setEditingAddress(null);
        }}
        onSave={editingAddress ? handleSaveEditedAddress : handleAddAddress}
        editData={editingAddress}
      />
    </div>
                    <div className="mt-6">
       <Footer />
    </div>
    </>
    
  );
};

export default BuyNow;
