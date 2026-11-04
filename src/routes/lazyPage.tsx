import { lazy, Suspense, type ComponentType } from "react";
import Loader from "@/components/common/Loader";

/**
 * Route-level code splitting. Returns an element that loads `loader()` on first visit and shows a page loader meanwhile.
 * A failed chunk load throws into the router's `errorElement` (see RouteError).
 */
export function page(loader: () => Promise<{ default: ComponentType }>) {
  const Page = lazy(loader);
  return (
    <Suspense fallback={<Loader page label="Loading" />}>
      <Page />
    </Suspense>
  );
}
