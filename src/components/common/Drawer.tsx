import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import IconButton from "./IconButton";
import { cn } from "@/lib/cn";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  side?: "right" | "left";
}

/** Slide-in panel (mobile sidebars, filters). Escape or a backdrop click closes it. */
const Drawer = ({ open, onClose, title, children, side = "right" }: Props) => {
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; });
  useEffect(() => {
    if (!open) return;
    const lock = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCloseRef.current();
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = lock; };
  }, [open]);

  if (!open) return null;
  return createPortal(
    <>
      <div className="ui-drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <aside role="dialog" aria-modal="true" aria-label={title} className={cn("ui-drawer", side === "left" && "ui-drawer--left")}>
        <div className="ui-modal__head">
          <h2 className="ui-modal__title">{title}</h2>
          <IconButton label="Close panel" size="sm" onClick={onClose}><FaTimes size={12} /></IconButton>
        </div>
        <div className="ui-modal__body" style={{ overflow: "auto", flex: 1 }}>{children}</div>
      </aside>
    </>,
    document.body,
  );
};

export default Drawer;
