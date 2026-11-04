import { Link } from "react-router-dom";

export interface Crumb {
  label: string;
  to?: string;
}

/** The last crumb (no `to`) is the current page. */
const Breadcrumb = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="Breadcrumb">
    <ol className="ui-crumbs">
      {items.map((c, i) => (
        <li key={`${c.label}-${i}`}>
          {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
