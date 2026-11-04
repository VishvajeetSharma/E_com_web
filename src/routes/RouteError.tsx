import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import EmptyState from "@/components/common/EmptyState";
import Button, { ButtonLink } from "@/components/common/Button";
import { ROUTES } from "./routePaths";

/** Shown when a route throws while rendering or its code chunk fails to load. */
const RouteError = () => {
  const error = useRouteError();
  const detail = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : "Unknown error";

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "1.5rem", background: "var(--dd-ivory)" }}>
      <div style={{ width: "min(100%, 34rem)" }}>
        <EmptyState
          icon={<FaExclamationTriangle size={18} />}
          title="Something went wrong"
          message="This page couldn't be displayed. You can try again, or head back to the homepage."
          action={
            <>
              <p style={{ margin: 0, fontSize: "0.72rem", color: "var(--color-text-muted)", overflowWrap: "anywhere" }}>{detail}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center" }}>
                <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Reload</Button>
                <ButtonLink to={ROUTES.dashboard} size="sm">Homepage</ButtonLink>
              </div>
            </>
          }
        />
      </div>
    </main>
  );
};

export default RouteError;
