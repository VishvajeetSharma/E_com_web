import type { ReactNode } from "react";

interface Props {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  /** Optional caption such as "12 awaiting review". Only pass it when the figure is real. */
  note?: string;
}

const StatCard = ({ label, value, icon, note }: Props) => (
  <div className="ui-stat">
    <span className="ui-stat__label" style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
      {label}
      {icon && <span aria-hidden="true">{icon}</span>}
    </span>
    <span className="ui-stat__value">{value}</span>
    {note && <span className="ui-stat__delta" style={{ color: "var(--color-text-muted)" }}>{note}</span>}
  </div>
);

export default StatCard;
