import { useMemo, useState, type ReactNode } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import Skeleton from "@/components/common/Skeleton";
import { usePagination } from "@/hooks/usePagination";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  /** Provide to make the column sortable. */
  sortValue?: (row: T) => string | number;
  align?: "left" | "right";
}

interface Props<T> {
  columns: Column<T>[];
  rows: readonly T[];
  rowKey: (row: T) => string | number;
  caption: string;
  pageSize?: number;
  loading?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
}

/** Sortable, paginated table with loading and empty states. Rows are never mutated. */
function DataTable<T>({ columns, rows, rowKey, caption, pageSize = 10, loading, emptyTitle = "Nothing to show", emptyMessage }: Props<T>) {
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null);

  const sorted = useMemo(() => {
    const col = columns.find((c) => c.key === sort?.key);
    if (!sort || !col?.sortValue) return rows;
    const get = col.sortValue;
    return [...rows].sort((a, b) => {
      const x = get(a);
      const y = get(b);
      return (x < y ? -1 : x > y ? 1 : 0) * sort.dir;
    });
  }, [rows, columns, sort]);

  const { pageItems, page, pageCount, setPage } = usePagination(sorted, pageSize);

  if (!loading && rows.length === 0) return <EmptyState title={emptyTitle} message={emptyMessage} />;

  const toggle = (key: string) => setSort((s) => (s?.key === key ? (s.dir === 1 ? { key, dir: -1 } : null) : { key, dir: 1 }));

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <div className="ui-table-wrap">
        <table className="ui-table" aria-busy={loading || undefined}>
          <caption className="ui-sr-only">{caption}</caption>
          <thead>
            <tr>
              {columns.map((c) => {
                const active = sort?.key === c.key;
                return (
                  <th key={c.key} scope="col" style={{ textAlign: c.align }} aria-sort={active ? (sort.dir === 1 ? "ascending" : "descending") : undefined}>
                    {c.sortValue ? (
                      <button type="button" onClick={() => toggle(c.key)}>
                        {c.header}
                        {active ? (sort.dir === 1 ? <FaSortUp aria-hidden="true" /> : <FaSortDown aria-hidden="true" />) : <FaSort aria-hidden="true" opacity={0.4} />}
                      </button>
                    ) : c.header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }, (_, i) => (
                  <tr key={`sk-${i}`}>{columns.map((c) => <td key={c.key}><Skeleton height="0.9rem" /></td>)}</tr>
                ))
              : pageItems.map((row) => (
                  <tr key={rowKey(row)}>
                    {columns.map((c) => <td key={c.key} style={{ textAlign: c.align }}>{c.render(row)}</td>)}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {!loading && <Pagination page={page} pageCount={pageCount} onChange={setPage} />}
    </div>
  );
}

export default DataTable;
