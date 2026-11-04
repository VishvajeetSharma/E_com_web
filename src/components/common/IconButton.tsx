import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: icon-only controls need an accessible name. */
  label: string;
  size?: "sm" | "md";
  children: ReactNode;
}

const IconButton = forwardRef<HTMLButtonElement, Props>(({ label, size = "md", className, children, type = "button", ...rest }, ref) => (
  <button ref={ref} type={type} aria-label={label} title={label} className={cn("ui-iconbtn", size === "sm" && "ui-iconbtn--sm", className)} {...rest}>
    {children}
  </button>
));
IconButton.displayName = "IconButton";

export default IconButton;
