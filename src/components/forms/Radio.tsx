import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
}

const Radio = forwardRef<HTMLInputElement, Props>(({ label, ...rest }, ref) => (
  <label className="ui-check"><input ref={ref} type="radio" {...rest} /> <span>{label}</span></label>
));
Radio.displayName = "Radio";

export default Radio;
