import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome, FaSearch } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-9xl font-black text-gray-900 opacity-5">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaSearch className="text-6xl text-gray-300" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Oops! Page not found
        </h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          The page you are looking for might have been removed,<br />
          had its name changed, or is temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition cursor-pointer"
          >
            <FaArrowLeft size={14} />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition cursor-pointer"
          >
            <FaHome size={14} />
            Home Page
          </button>
        </div>

        {/* Suggestions */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-3">You might want to try:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={() => navigate("/")} className="text-xs text-gray-500 hover:text-gray-900 px-2 py-1">
              Home
            </button>
            <span className="text-gray-300">•</span>
            <button onClick={() => navigate("/products")} className="text-xs text-gray-500 hover:text-gray-900 px-2 py-1">
              Shop
            </button>
            <span className="text-gray-300">•</span>
            <button onClick={() => navigate("/contact")} className="text-xs text-gray-500 hover:text-gray-900 px-2 py-1">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;