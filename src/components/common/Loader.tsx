import { cn } from "@/lib/cn";

interface Props {
  label?: string;
  /** Cover the viewport (used as the route-level Suspense fallback). */
  page?: boolean;
  className?: string;
}

const Loader = ({ label = "Loading", page, className }: Props) => (
  <div role="status" aria-live="polite" className={cn("ui-loader", page && "ui-loader--page", className)}>
    <span className="ui-loader__ring" aria-hidden="true" />
    <span className="ui-loader__label">{label}</span>
  </div>
);

export default Loader;
