import type { ReactNode } from "react";

interface Props {
  title: string;
  message?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

const EmptyState = ({ title, message, icon, action }: Props) => (
  <div className="ui-empty">
    {icon && <span className="ui-empty__icon" aria-hidden="true">{icon}</span>}
    <h2 className="ui-empty__title">{title}</h2>
    {message && <p className="ui-empty__text">{message}</p>}
    {action}
  </div>
);

export default EmptyState;
