import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { ROUTES } from "@/routes/routePaths";
import "./styles/welcome.css";

/** Landing splash shown at `/`. The only action is "Get Started", which opens the storefront. */
const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <main className="wl">
      <div className="wl-orb wl-orb--a" aria-hidden="true" />
      <div className="wl-orb wl-orb--b" aria-hidden="true" />
      <div className="wl-card">
        <p className="wl-eyebrow">Fashion &amp; Lifestyle</p>
        <h1 className="wl-title">Darling <span>Desire</span></h1>
        <p className="wl-sub">Timeless pieces, considered design and a store that feels as good as it looks.</p>
        <button type="button" className="wl-btn" onClick={() => navigate(ROUTES.dashboard)}>
          Get started <FaArrowRight size={13} aria-hidden="true" />
        </button>
      </div>
    </main>
  );
};

export default WelcomePage;
