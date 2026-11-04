export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

/** Envelope for a backend response. No backend is wired up yet; this documents the shape services should use. */
export interface APIResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
