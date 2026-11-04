import { useMemo, useState } from "react";

export interface PaginationResult<T> {
  page: number;
  pageCount: number;
  pageItems: T[];
  setPage: (page: number) => void;
  /** Total number of items across all pages. */
  total: number;
}

/** Client-side pagination over an in-memory list. */
export function usePagination<T>(items: readonly T[], pageSize = 10): PaginationResult<T> {
  const [requested, setRequested] = useState(1);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  // Derived, not stored: the page is clamped whenever the list shrinks (e.g. after filtering).
  const page = Math.min(Math.max(1, requested), pageCount);
  const pageItems = useMemo(() => items.slice((page - 1) * pageSize, page * pageSize), [items, page, pageSize]);
  return { page, pageCount, pageItems, setPage: setRequested, total: items.length };
}
