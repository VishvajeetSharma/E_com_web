import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routePaths";

/**
 * Admin guard. Behaviour is unchanged from the checks that used to live inside each admin page:
 * the "session" is the `adminLoggedIn` flag the admin login screen sets in localStorage, and a missing flag
 * redirects to `/admin/login`.
 * NOTE: that is a client-side flag, not authentication — there is no backend session. It only controls navigation.
 * NOTE: `/admin/login` is not a defined route (the login screen is at `/admin`), so the redirect lands on the 404 page.
 *       Kept as-is to preserve behaviour; see the project report.
 */
export const RequireAdmin = () => {
  let loggedIn = false;
  try {
    loggedIn = Boolean(localStorage.getItem("adminLoggedIn"));
  } catch {
    loggedIn = false;
  }
  return loggedIn ? <Outlet /> : <Navigate to={ROUTES.adminLogin} />;
};
