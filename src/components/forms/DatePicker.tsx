import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Native date control (keyboard- and screen-reader-friendly, no extra dependency). Value is `YYYY-MM-DD`. */
const DatePicker = forwardRef<HTMLInputElement, Omit<InputHTMLAttributes<HTMLInputElement>, "type">>(({ className, ...rest }, ref) => (
  <input ref={ref} type="date" className={cn("ui-input", className)} {...rest} />
));
DatePicker.displayName = "DatePicker";

export default DatePicker;
