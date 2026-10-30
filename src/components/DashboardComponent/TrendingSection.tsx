import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "../../components/Card/CardComponent";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  ratingCount: number;
  badge: string;
  discount: string;
  gender: string;
}

interface TrendingSectionProps {
  trendingProducts: Product[];
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ trendingProducts }) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  
  const displayedProducts = showAll ? trendingProducts : trendingProducts.slice(0, 4);

  return (
    <div className="py-3 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block">
            <span className="text-xs uppercase tracking-[0.2em] text-pink-500 font-semibold">
              Shop Trending Products
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-2">
            Trending{" "}
            <span className="font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-pink-500"></div>
            <div className="w-8 h-px bg-gray-300"></div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>

        {/* View All Button */}
        {trendingProducts.length > 2 && (
          <div className="text-center mt-3">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-2 border border-gray-300 bg-white text-gray-700 text-[.7rem] font-medium rounded-full hover:border-pink-500 hover:text-pink-600 transition-all duration-300"
            >
              <span>{showAll ? 'Show Less' : 'View All Products'}</span>
              <FaArrowRight 
                size={12} 
                className={`transition-transform duration-300 ${showAll ? 'rotate-90' : 'group-hover:translate-x-1'}`}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingSection;