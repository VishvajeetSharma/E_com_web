import type { ReactNode } from "react";
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import { cn } from "@/lib/cn";

export type AlertTone = "info" | "success" | "warning" | "danger";
const ICONS = { info: FaInfoCircle, success: FaCheckCircle, warning: FaExclamationTriangle, danger: FaExclamationCircle };

/** Inline message. Errors use role="alert"; everything else is a polite status. */
const Alert = ({ tone = "info", children, className }: { tone?: AlertTone; children: ReactNode; className?: string }) => {
  const Icon = ICONS[tone];
  return (
    <div role={tone === "danger" ? "alert" : "status"} className={cn("ui-alert", `ui-alert--${tone}`, className)}>
      <Icon size={14} aria-hidden="true" style={{ marginTop: 3, flex: "none" }} />
      <p>{children}</p>
    </div>
  );
};

export default Alert;
