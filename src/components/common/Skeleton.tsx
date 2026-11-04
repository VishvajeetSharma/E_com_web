import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface Props {
  width?: string | number;
  height?: string | number;
  className?: string;
}

/** Shimmering placeholder. Decorative — pair with a labelled container (`aria-busy`) for screen readers. */
const Skeleton = ({ width = "100%", height = "1rem", className }: Props) => {
  const style: CSSProperties = { width, height };
  return <span aria-hidden="true" className={cn("ui-skeleton", className)} style={style} />;
};

export default Skeleton;
