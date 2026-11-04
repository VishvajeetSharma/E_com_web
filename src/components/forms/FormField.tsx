import { cloneElement, useId, type ReactElement, type ReactNode } from "react";

interface Props {
  label: string;
  hint?: string;
  error?: string | null;
  required?: boolean;
  /** A single form control; receives id, aria-describedby and aria-invalid. */
  children: ReactElement<{ id?: string; "aria-describedby"?: string; "aria-invalid"?: boolean }>;
  className?: string;
  action?: ReactNode;
}

/** Label + control + hint/error wiring, so every form reads and announces the same way. */
const FormField = ({ label, hint, error, required, children, className, action }: Props) => {
  const id = useId();
  const describedBy = [error ? `${id}-err` : null, hint ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className={`ui-field ${className ?? ""}`}>
      <label htmlFor={id} className="ui-field__label">
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      {cloneElement(children, { id, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined })}
      {action}
      {hint && <p id={`${id}-hint`} className="ui-field__hint">{hint}</p>}
      {error && <p id={`${id}-err`} role="alert" className="ui-field__error">{error}</p>}
    </div>
  );
};

export default FormField;
