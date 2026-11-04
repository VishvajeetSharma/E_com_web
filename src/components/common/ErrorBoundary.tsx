import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  /** Rendered instead of `children` after a render error. A function receives the error and a reset callback. */
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onError?: (error: Error, info: ErrorInfo) => void;
  children?: ReactNode;
}

interface State {
  error: Error | null;
}

/** Contains render errors (3D scenes, textures, lazy routes) so one failure doesn't blank the whole app. */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    const { fallback } = this.props;
    return typeof fallback === "function" ? fallback(error, this.reset) : (fallback ?? null);
  }
}
