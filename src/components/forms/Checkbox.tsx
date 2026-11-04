import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(({ label, ...rest }, ref) => (
  <label className="ui-check"><input ref={ref} type="checkbox" {...rest} /> <span>{label}</span></label>
));
Checkbox.displayName = "Checkbox";

export default Checkbox;
