import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "neutral" | "brand" | "gold" | "success" | "warning" | "danger" | "info";

const Badge = ({ tone = "neutral", children, className }: { tone?: BadgeTone; children: ReactNode; className?: string }) => (
  <span className={cn("ui-badge", `ui-badge--${tone}`, className)}>{children}</span>
);

export default Badge;
