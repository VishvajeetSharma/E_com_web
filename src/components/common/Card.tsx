import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface Props extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
  raised?: boolean;
}

const Card = ({ padded = true, raised, className, ...rest }: Props) => (
  <div className={cn("ui-card", raised && "ui-card--raised", padded && "ui-card__pad", className)} {...rest} />
);

export default Card;
