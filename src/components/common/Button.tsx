import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "gold" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const classes = ({ variant = "primary", size = "md", block, className }: CommonProps & { className?: string }) =>
  cn("ui-btn", `ui-btn--${variant}`, `ui-btn--${size}`, block && "ui-btn--block", className);

/** Primary action control. `loading` disables the button and announces busy state. */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, block, loading, icon, className, children, disabled, type = "button", ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={classes({ variant, size, block, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {icon}
      {children}
    </button>
  ),
);
Button.displayName = "Button";

/** Same look as <Button>, rendered as a router link. */
export const ButtonLink = ({ variant, size, block, icon, className, children, ...rest }: CommonProps & LinkProps) => (
  <Link className={classes({ variant, size, block, className })} {...rest}>
    {icon}
    {children}
  </Link>
);

export default Button;
