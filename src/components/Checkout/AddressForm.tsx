import { useState, useEffect } from "react";
import { FaHome, FaBuilding, FaMapMarkerAlt, FaTimes } from "react-icons/fa";

// Types
export interface Address {
  id?: number;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  addressType: "home" | "work" | "other";
  isDefault: boolean;
}

interface AddressFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Address) => void;
  editData?: Address | null;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

const AddressForm: React.FC<AddressFormProps> = ({
  isOpen,
  onClose,
  onSave,
  editData = null,
}) => {
  const [formData, setFormData] = useState<Address>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "home",
    isDefault: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Populate form if editing
  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      // Reset form when adding new
      setFormData({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        addressType: "home",
        isDefault: false,
      });
    }
    setErrors({});
  }, [editData, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.phone.match(/^[0-9]{10}$/))
      newErrors.phone = "Enter valid 10-digit phone number";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!formData.pincode.match(/^[0-9]{6}$/))
      newErrors.pincode = "Enter valid 6-digit pincode";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {editData ? "Edit Address" : "Add New Address"}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <FaTimes size={18} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="9876543210"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="House No., Street, Area"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          {/* City, State, Pincode */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Mumbai"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition ${
                  errors.state ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Maharashtra"
              />
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">{errors.state}</p>
              )}
            </div>
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              maxLength={6}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition ${
                errors.pincode ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="400001"
            />
            {errors.pincode && (
              <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
            )}
          </div>

          {/* Address Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Type
            </label>
            <div className="flex gap-4">
              {[
                { value: "home" as const, label: "Home", icon: FaHome },
                { value: "work" as const, label: "Work", icon: FaBuilding },
                { value: "other" as const, label: "Other", icon: FaMapMarkerAlt },
              ].map((type) => (
                <label
                  key={type.value}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition border ${
                    formData.addressType === type.value
                      ? "border-pink-500 bg-pink-50 text-pink-600"
                      : "border-gray-300 hover:border-pink-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="addressType"
                    value={type.value}
                    checked={formData.addressType === type.value}
                    onChange={handleRadioChange}
                    className="hidden"
                  />
                  <type.icon size={14} />
                  <span className="text-sm capitalize">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Default Address Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer py-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="w-4 h-4 accent-pink-500"
            />
            <span className="text-sm text-gray-700">
              Set as default address
            </span>
          </label>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-linear-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition transform hover:scale-[1.02]"
            >
              {editData ? "Update Address" : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;