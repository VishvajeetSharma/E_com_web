import HomeNav from "@/components/layout/Navbar";
import "@/styles/storefront.css";

/**
 * Site header used by the order, product, support and auth pages.
 * It renders the same burgundy navigation as the storefront so every page shares one header.
 * `display: contents` gives the nav the brand CSS variables without creating a box,
 * which keeps its `position: sticky` relative to the page rather than to this wrapper.
 */
const Header = () => (
  <div className="dd-home" style={{ display: "contents" }}>
    <HomeNav />
  </div>
);

export default Header;
