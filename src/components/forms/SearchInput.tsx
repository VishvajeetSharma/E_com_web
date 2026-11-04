import { useId, useState, type InputHTMLAttributes } from "react";
import { FaSearch } from "react-icons/fa";
import { cn } from "@/lib/cn";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type"> {
  value?: string;
  onChange?: (value: string) => void;
  /** Accessible name; the field has no visible label. */
  label?: string;
}

/** Search field. Controlled when `value` is passed, otherwise keeps its own text. */
const SearchInput = ({ value, onChange, label = "Search", placeholder = "Search products...", className, ...rest }: Props) => {
  const id = useId();
  const [inner, setInner] = useState("");
  const current = value ?? inner;
  return (
    <div className={cn("ui-search", className)} role="search">
      <label htmlFor={id} className="ui-sr-only">{label}</label>
      <FaSearch size={13} aria-hidden="true" />
      <input
        id={id}
        type="search"
        className="ui-input"
        placeholder={placeholder}
        value={current}
        onChange={(e) => { setInner(e.target.value); onChange?.(e.target.value); }}
        {...rest}
      />
    </div>
  );
};

export default SearchInput;
