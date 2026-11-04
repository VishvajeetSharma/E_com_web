import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}

/** Returns the page numbers to show: always first/last, the current page and its neighbours, with `null` as an ellipsis. */
const windowed = (page: number, count: number): (number | null)[] => {
  const keep = new Set([1, count, page - 1, page, page + 1].filter((n) => n >= 1 && n <= count));
  const sorted = [...keep].sort((a, b) => a - b);
  return sorted.flatMap((n, i) => (i > 0 && n - sorted[i - 1] > 1 ? [null, n] : [n]));
};

const Pagination = ({ page, pageCount, onChange }: Props) => {
  if (pageCount <= 1) return null;
  return (
    <nav className="ui-pagination" aria-label="Pagination">
      <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => onChange(page - 1)}><FaChevronLeft size={10} /></button>
      {windowed(page, pageCount).map((n, i) =>
        n === null ? <span key={`gap-${i}`} aria-hidden="true">…</span> : (
          <button key={n} type="button" aria-label={`Page ${n}`} aria-current={n === page ? "page" : undefined} onClick={() => onChange(n)}>{n}</button>
        ),
      )}
      <button type="button" aria-label="Next page" disabled={page === pageCount} onClick={() => onChange(page + 1)}><FaChevronRight size={10} /></button>
    </nav>
  );
};

export default Pagination;
