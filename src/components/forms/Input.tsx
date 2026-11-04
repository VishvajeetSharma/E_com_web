import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...rest }, ref) => (
  <input ref={ref} className={cn("ui-input", className)} {...rest} />
));
Input.displayName = "Input";

export default Input;
