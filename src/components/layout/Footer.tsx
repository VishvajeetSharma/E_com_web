import { FaFacebook, FaInstagram, FaTwitter, FaHeart, FaMapMarkerAlt, FaClock, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/Images/logo.png";

  export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-1 border-pink-100 relative">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[.02rem] bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Section - Takes more space on desktop */}
          <div className="lg:col-span-4 space-y-4">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-md"
                onClick={() => navigate("/dashboard")}
              >
                <img src={logo} alt="Darling Desire" className="w-8 h-auto" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-google">
                  <span className="text-gray-800">DARLING</span>
                  <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"> DESIRE</span>
                </h2>
                <p className="text-xs text-gray-400">Since 2024</p>
              </div>
            </div>
            
            <p className="text-gray-500 text-sm leading-relaxed">
              Where fashion meets elegance — discover timeless pieces crafted for the modern soul.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300">
                <FaFacebook size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300">
                <FaInstagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300">
                <FaHeart size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-500 hover:text-pink-500 text-sm transition flex items-center gap-1 group">New Arrivals</a></li>
              <li><a href="/shop" className="text-gray-500 hover:text-pink-500 text-sm transition">Best Sellers</a></li>
              <li><a href="/sale" className="text-gray-500 hover:text-pink-500 text-sm transition">Sale</a></li>
              <li><a href="/collections" className="text-gray-500 hover:text-pink-500 text-sm transition">Collections</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-500 hover:text-pink-500 text-sm transition">About Us</a></li>
              <li><a href="/contact" className="text-gray-500 hover:text-pink-500 text-sm transition">Contact</a></li>
              <li><a href="/faq" className="text-gray-500 hover:text-pink-500 text-sm transition">FAQ</a></li>
              <li><a href="/returns" className="text-gray-500 hover:text-pink-500 text-sm transition">Returns</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wider">
              Get in Touch
            </h3>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <FaMapMarkerAlt className="text-pink-400 shrink-0" size={14} />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <FaClock className="text-pink-400 shrink-0" size={14} />
                <span>Mon-Sat: 10am – 8pm</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <FaEnvelope className="text-pink-400 shrink-0" size={14} />
                <a href="mailto:hello@darlingdesire.com" className="hover:text-pink-500">hello@darlingdesire.com</a>
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="mt-4">
              <p className="text-gray-500 text-sm mb-2">Get 10% off on first order</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 text-sm border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-1 group"
                >
                  <span className="text-sm">Subscribe</span>
                  <FaArrowRight size={12} className="group-hover:translate-x-1 transition" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-pink-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Darling Desire. All rights reserved.
          </p>
          
          <div className="flex gap-6 text-xs">
            <a href="/privacy" className="text-gray-400 hover:text-pink-500 transition">Privacy Policy</a>
            <a href="/terms" className="text-gray-400 hover:text-pink-500 transition">Terms of Service</a>
            <a href="/shipping" className="text-gray-400 hover:text-pink-500 transition">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
