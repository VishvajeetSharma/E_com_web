import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  toggleStatus,
} from "../../../redux/productSlice";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  gender: string;
  mainCategory: string;
  category: string;
  rating: number;
  ratingCount: number;
  badge?: string;
  discount?: string;
  description?: string;
  exchangeAvailable?: boolean;
  returnAvailable?: boolean;
}

interface SizeStock {
  size: string;
  stock: number;
}

interface CatalogProduct extends Product {
  b2bPrice?: number;
  sizeAvailability?: SizeStock[];
  stock?: number;
  status?: string;
  sellerId?: string;
  isB2B?: boolean;
  subCategory?: string;
  colourAvailable?: string;
  expiryDate?: string;
  images?: string[];
  exchangeAvailable?: boolean; // 🔥 NEW
  returnAvailable?: boolean; // 🔥 NEW
}

type CatalogFormProduct = Partial<CatalogProduct>;

// ─── Options ─────────────────────────────────────────────────────────────────

const categoryOptions = [
  "Clothing",
  "Electronics",
  "Jewelry",
  "Home & Living",
  "Beauty",
  "Accessories",
];

const subCategoryOptions: Record<string, string[]> = {
  Clothing: ["Kurti", "Dress", "Jacket", "Trousers", "Shirts", "T-Shirts"],
  Electronics: [
    "Headphones",
    "Smartwatch",
    "Speakers",
    "Mobile",
    "Audio",
    "Wearables",
  ],
  Jewelry: ["Earrings", "Necklace", "Bracelet", "Rings", "Anklets"],
  "Home & Living": [
    "Decor",
    "Kitchen",
    "Bedding",
    "Furniture",
    "Cushions",
    "Candles",
  ],
  Beauty: ["Skincare", "Makeup", "Haircare", "Fragrance"],
  Accessories: [
    "Bags",
    "Scarves",
    "Belts",
    "Hats",
    "Wallets",
    "Sunglasses",
    "Watches",
    "Caps",
  ],
};

const sizeOptions: Record<string, string[]> = {
  Clothing: ["S", "M", "L", "XL"],
  Accessories: ["One Size", "S", "M", "L"],
  Jewelry: ["One Size"],
  Beauty: ["One Size"],
  Electronics: ["Standard"],
  "Home & Living": ["Standard"],
};

const genderOptions = ["unisex", "male", "female", "kids"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const buildSizeAvailability = (sizes: string[]): SizeStock[] =>
  sizes.map((size) => ({ size, stock: 0 }));

const getTotalStock = (product: CatalogProduct) =>
  product.sizeAvailability?.reduce((sum, s) => sum + (s.stock || 0), 0) ??
  product.stock ??
  0;

const getStockColor = (stock: number) => {
  if (stock === 0) return "bg-red-100 text-red-600";
  if (stock <= 10) return "bg-amber-100 text-amber-700";
  return "bg-emerald-100 text-emerald-700";
};

// ─── Default form state ───────────────────────────────────────────────────────

const defaultForm: CatalogFormProduct = {
  name: "",
  category: "Clothing",
  mainCategory: "Clothing",
  subCategory: "Kurti",
  colourAvailable: "",
  gender: "unisex",
  price: 0,
  b2bPrice: 0,
  sizeAvailability: buildSizeAvailability(sizeOptions["Clothing"]),
  image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500",
  badge: "NEW",
  status: "active",
  description: "",
  expiryDate: "",
  rating: 4.5,
  ratingCount: 0,
  exchangeAvailable: false, // 🔥 NEW - default false
  returnAvailable: false, // 🔥 NEW - default false
};

// ─── Component ────────────────────────────────────────────────────────────────

const Catalog: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formProduct, setFormProduct] =
    useState<CatalogFormProduct>(defaultForm);

  const currentSeller =
    localStorage.getItem("currentSeller") || "default_seller";

  const sellerProducts = products.filter(
    (p: CatalogProduct) => p.sellerId === currentSeller,
  );

  const filtered = useMemo(
    () =>
      sellerProducts.filter((p: CatalogProduct) => {
        const term = searchTerm.toLowerCase();
        return (
          p.name?.toLowerCase().includes(term) ||
          p.category?.toLowerCase().includes(term) ||
          p.mainCategory?.toLowerCase().includes(term)
        );
      }),
    [sellerProducts, searchTerm],
  );

  const currentCategory = formProduct.category || "Clothing";
  const currentSubCategories = subCategoryOptions[currentCategory] ?? [
    "General",
  ];

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const handleCategoryChange = (category: string) => {
    setFormProduct((prev) => ({
      ...prev,
      category,
      mainCategory: category,
      subCategory: subCategoryOptions[category]?.[0] ?? "",
      sizeAvailability: buildSizeAvailability(
        sizeOptions[category] ?? ["One Size"],
      ),
    }));
  };

  const handleSizeStockChange = (idx: number, value: string) => {
    const updated = [...(formProduct.sizeAvailability ?? [])];
    updated[idx] = { ...updated[idx], stock: Number(value) };
    setFormProduct((prev) => ({ ...prev, sizeAvailability: updated }));
  };

  const handleAddProduct = () => {
    const nextId = Math.max(...products.map((p: any) => p.id), 0) + 1;

    const nextProduct: CatalogProduct = {
      id: nextId,
      name: formProduct.name?.trim() || `New Product ${nextId}`,
      price: Number(formProduct.price ?? 0),
      originalPrice: formProduct.originalPrice,
      image:
        formProduct.image ||
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500",
      images: [
        formProduct.image ||
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500",
      ],
      category: formProduct.category || "Clothing",
      mainCategory:
        formProduct.mainCategory || formProduct.category || "Clothing",
      gender: formProduct.gender || "unisex",
      rating: Number(formProduct.rating ?? 4.5),
      ratingCount: Number(formProduct.ratingCount ?? 0),
      badge: formProduct.badge || "NEW",
      discount: formProduct.discount,
      description: formProduct.description || "Wholesale-ready product listing",
      sizeAvailability: formProduct.sizeAvailability ?? [],
      status: formProduct.status || "active",
      b2bPrice:
        Number(formProduct.b2bPrice ?? 0) ||
        Math.max(0, Math.round(Number(formProduct.price ?? 0) * 0.85)),
      isB2B: true,
      sellerId: currentSeller,
      subCategory: formProduct.subCategory,
      colourAvailable: formProduct.colourAvailable,
      expiryDate: formProduct.expiryDate,
      // 🔥 NEW - Exchange & Return options (must have)
      exchangeAvailable: formProduct.exchangeAvailable ?? false,
      returnAvailable: formProduct.returnAvailable ?? false,
    };

    dispatch(addProduct(nextProduct));
    setFormProduct({
      ...defaultForm,
      sizeAvailability: buildSizeAvailability(sizeOptions["Clothing"]),
    });
    setShowForm(false);
  };

  const handleDeleteProduct = (id: number) => dispatch(deleteProduct(id));
  const handleStatusToggle = (id: number) => dispatch(toggleStatus(id));

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="p-6 bg-[#f5f3ee] min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* ── Header ── */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Catalog</h1>
            <p className="text-sm text-slate-600 mt-2">
              Manage B2B catalog listings and make products visible to buyers.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Total Products: {sellerProducts.length}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search catalog"
              className="border border-slate-300 rounded-lg px-3 py-2 w-full sm:w-80"
            />
            <button
              onClick={() => setShowForm((p) => !p)}
              className="rounded-lg bg-slate-900 text-white px-4 py-2 text-sm whitespace-nowrap"
            >
              {showForm ? "Hide form" : "Add Product"}
            </button>
          </div>
        </div>

        {/* ── Add Product Form ── */}
        {showForm && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
            <h2 className="text-base font-semibold text-slate-800 mb-4">
              New Product
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product name */}
              <label className="space-y-1.5 text-sm text-slate-700">
                Product name <span className="text-red-500">*</span>
                <input
                  value={formProduct.name}
                  onChange={(e) =>
                    setFormProduct((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
                  required
                />
              </label>

              {/* Category */}
              <label className="space-y-1.5 text-sm text-slate-700">
                Category <span className="text-red-500">*</span>
                <select
                  value={formProduct.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
                >
                  {categoryOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              {/* Subcategory */}
              <label className="space-y-1.5 text-sm text-slate-700">
                Subcategory
                <select
                  value={formProduct.subCategory}
                  onChange={(e) =>
                    setFormProduct((prev) => ({
                      ...prev,
                      subCategory: e.target.value,
                    }))
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
                >
                  {currentSubCategories.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              {/* Gender */}
              <label className="space-y-1.5 text-sm text-slate-700">
                Gender
                <select
                  value={formProduct.gender}
                  onChange={(e) =>
                    setFormProduct((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
                >
                  {genderOptions.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </label>

              {/* MRP */}
              <label className="space-y-1.5 text-sm text-slate-700">
                MRP Price (₹) <span className="text-red-500">*</span>
                <input
                  type="number"
                  value={formProduct.price}
                  onChange={(e) => {
                    const mrp = Number(e.target.value);
                    setFormProduct((prev) => ({
                      ...prev,
                      price: mrp,
                      b2bPrice: Math.round(mrp * 0.85),
                    }));
                  }}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
                  required
                />
              </label>

              {/* B2B Price */}
              <label className="space-y-1.5 text-sm text-slate-700">
                B2B Price (₹)
                <input
                  type="number"
                  value={formProduct.b2bPrice}
                  onChange={(e) =>
                    setFormProduct((prev) => ({
                      ...prev,
                      b2bPrice: Number(e.target.value),
                    }))
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
                />
              </label>

              {/* Colour */}
              <label className="space-y-1.5 text-sm text-slate-700">
                Colour available
                <input
                  value={formProduct.colourAvailable}
                  onChange={(e) =>
                    setFormProduct((prev) => ({
                      ...prev,
                      colourAvailable: e.target.value,
                    }))
                  }
                  placeholder="Red, Blue, Black"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
                />
              </label>

              {/* Badge */}
              <label className="space-y-1.5 text-sm text-slate-700">
                Badge
                <select
                  value={formProduct.badge}
                  onChange={(e) =>
                    setFormProduct((prev) => ({
                      ...prev,
                      badge: e.target.value,
                    }))
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
                >
                  {[
                    "NEW",
                    "TRENDING",
                    "SALE",
                    "Bestseller",
                    "LUXURY",
                    "EXCLUSIVE",
                  ].map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>

              {/* Image URL */}
              <label className="space-y-1.5 text-sm text-slate-700">
                Image URL
                <input
                  value={formProduct.image}
                  onChange={(e) =>
                    setFormProduct((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
                />
              </label>

              {/* Expiry (Beauty only) */}
              {formProduct.category === "Beauty" && (
                <label className="space-y-1.5 text-sm text-slate-700">
                  Expiry date
                  <input
                    type="date"
                    value={formProduct.expiryDate}
                    onChange={(e) =>
                      setFormProduct((prev) => ({
                        ...prev,
                        expiryDate: e.target.value,
                      }))
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
                  />
                </label>
              )}

              {/* 🔥 NEW - Exchange Available */}
              <label className="space-y-1.5 text-sm text-slate-700">
                Exchange Available <span className="text-red-500">*</span>
                <select
                  value={formProduct.exchangeAvailable ? "yes" : "no"}
                  onChange={(e) =>
                    setFormProduct((prev) => ({
                      ...prev,
                      exchangeAvailable: e.target.value === "yes",
                    }))
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
                  required
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>

              {/* 🔥 NEW - Return Available */}
              <label className="space-y-1.5 text-sm text-slate-700">
                Return Available <span className="text-red-500">*</span>
                <select
                  value={formProduct.returnAvailable ? "yes" : "no"}
                  onChange={(e) =>
                    setFormProduct((prev) => ({
                      ...prev,
                      returnAvailable: e.target.value === "yes",
                    }))
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1"
                  required
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>

              {/* Description */}
              <label className="col-span-1 md:col-span-2 space-y-1.5 text-sm text-slate-700">
                Description
                <textarea
                  value={formProduct.description}
                  onChange={(e) =>
                    setFormProduct((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 h-24 mt-1"
                />
              </label>

              {/* ── Size-wise Stock ── */}
              <div className="col-span-1 md:col-span-2">
                <p className="text-sm font-medium text-slate-700 mb-2">
                  Stock by size
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {(formProduct.sizeAvailability ?? []).map((s, idx) => (
                    <div
                      key={s.size}
                      className="flex flex-col items-center gap-1.5 border border-slate-200 rounded-xl p-3 bg-slate-50"
                    >
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        {s.size}
                      </span>
                      <input
                        type="number"
                        min={0}
                        value={s.stock}
                        onChange={(e) =>
                          handleSizeStockChange(idx, e.target.value)
                        }
                        className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-center text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                      <span className="text-[11px] text-slate-400">units</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddProduct}
                className="rounded-lg bg-slate-900 text-white px-5 py-2.5 text-sm"
              >
                Save Product
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-slate-300 text-slate-700 px-5 py-2.5 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── Product List ── */}
        <div className="grid gap-4">
          {filtered.map((product: CatalogProduct) => (
            <div
              key={product.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col md:flex-row gap-5"
            >
              {/* Image */}
              <div className="shrink-0 w-full md:w-48 h-40 overflow-hidden rounded-3xl bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 grid gap-2">
                {/* Name + badges */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {product.name}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {product.category}
                      {product.subCategory && ` › ${product.subCategory}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.badge && (
                      <span className="text-xs uppercase tracking-wide text-white bg-amber-600 px-3 py-1 rounded-full">
                        {product.badge}
                      </span>
                    )}
                    <span className="text-xs uppercase tracking-[0.18em] text-white bg-slate-900 px-3 py-1 rounded-full">
                      {product.isB2B ? "B2B" : "Retail"}
                    </span>
                  </div>
                </div>

                {/* Price + status */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700">
                  <span>MRP: ₹{product.price.toLocaleString()}</span>
                  <span className="text-green-600 font-medium">
                    B2B: ₹{product.b2bPrice?.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    Status:
                    <button
                      onClick={() => handleStatusToggle(product.id)}
                      className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        product.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status === "active" ? "Active" : "Inactive"}
                    </button>
                  </span>
                </div>

                {/* 🔥 NEW - Exchange & Return Badges */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {product.exchangeAvailable && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      🔄 Exchange Available
                    </span>
                  )}
                  {product.returnAvailable && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                      ↩️ Return Available
                    </span>
                  )}
                  {!product.exchangeAvailable && !product.returnAvailable && (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      No Exchange/Return
                    </span>
                  )}
                </div>

                {/* Size-wise stock badges */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-sm text-slate-500 mr-1">Stock:</span>
                  {product.sizeAvailability &&
                  product.sizeAvailability.length > 0 ? (
                    product.sizeAvailability.map((s) => (
                      <span
                        key={s.size}
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStockColor(s.stock)}`}
                      >
                        {s.size}: {s.stock}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">
                      {getTotalStock(product)} units
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-1">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-xs text-red-500 hover:text-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">
              No products found in your catalog. Click "Add Product" to get
              started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
