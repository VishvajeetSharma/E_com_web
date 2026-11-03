import { Component, type ReactNode } from "react";

interface Props {
  fallback?: ReactNode;
  onError?: () => void;
  children?: ReactNode;
}

/** Tiny error boundary — used for the 3D scene and for individual textures. */
export default class SafeBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError?.();
  }
  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
