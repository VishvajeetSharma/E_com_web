import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StoreShell from "../../../components/Store/StoreShell";
import StoreHero from "../../../components/Store/StoreHero";
import ProfileSidebar from "../../../components/Profile/ProfileSidebar";
import ProfileOverview from "../../../components/Profile/ProfileOverview";
import { AddressesTab, CouponsTab, ReviewsTab, SettingsTab, WalletTab } from "../../../components/Profile/ProfileTabs";
import { homeToast } from "../../../components/Home/toast";
import "../../../components/Profile/profile.css";

const TABS = ["overview", "wallet", "addresses", "coupons", "reviews", "settings"];

/**
 * Route: /userprofile (also reads ?tab=…, as before).
 * The app has no auth/profile backend, so the account details shown here are labelled sample data;
 * only the overview counts (orders, wishlist, bag) come from the real Redux store.
 */
const AccountSettings = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const requested = params.get("tab") ?? "";
  const [local, setLocal] = useState("overview");
  const active = TABS.includes(requested) ? requested : local;

  const select = (id: string) => { setLocal(id); if (params.has("tab")) setParams({}, { replace: true }); };
  const go = (path: string) => { navigate(path); window.scrollTo(0, 0); };

  const view: Record<string, React.ReactNode> = {
    overview: <ProfileOverview onOrders={() => go("/orders")} onWishlist={() => go("/wishlist")} onCart={() => go("/cart")} />,
    wallet: <WalletTab />,
    addresses: <AddressesTab />,
    coupons: <CouponsTab />,
    reviews: <ReviewsTab />,
    settings: <SettingsTab />,
  };

  return (
    <StoreShell>
      <StoreHero eyebrow="My Account" title="Your" accent="account." subtitle="Orders, saved details and preferences in one place." />
      <main className="st-main">
        <div className="dd-container pf-wrap">
          <ProfileSidebar
            active={active}
            onSelect={select}
            onOrders={() => go("/orders")}
            onWishlist={() => go("/wishlist")}
            onSeller={() => go("/seller")}
            onLogout={() => homeToast("Logout isn’t connected yet", "This app has no sign-in session to end.")}
          />
          <section className="pf-main" aria-live="polite">{view[active]}</section>
        </div>
      </main>
    </StoreShell>
  );
};

export default AccountSettings;
