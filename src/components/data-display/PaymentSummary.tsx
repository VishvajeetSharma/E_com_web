import type { ReactNode } from "react";
import CartSummary, { type SummaryRow } from "@/components/data-display/CartSummary";

interface Props {
  itemCount: number;
  subtotal: number;
  deliveryCharge: number;
  gst: number;
  total: number;
  cta: ReactNode;
  note?: ReactNode;
  children?: ReactNode;
}

/** Subtotal / delivery / GST / total panel. Numbers are computed by the page exactly as before. */
const PaymentSummary = ({ itemCount, subtotal, deliveryCharge, gst, total, cta, note, children }: Props) => {
  const rows: SummaryRow[] = [
    { label: "Subtotal", value: `₹${subtotal.toLocaleString("en-IN")}` },
    { label: "Delivery", value: deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`, tone: deliveryCharge === 0 ? "good" : undefined },
    { label: "GST (5%)", value: `₹${gst.toLocaleString("en-IN")}` },
  ];
  return (
    <CartSummary
      title={`Order summary (${itemCount} ${itemCount === 1 ? "item" : "items"})`}
      rows={rows}
      totalLabel="Total"
      total={total}
      cta={cta}
      note={note}
    >
      {children}
    </CartSummary>
  );
};

export default PaymentSummary;
