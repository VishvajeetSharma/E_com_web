interface Props {
  price: number;
  originalPrice?: number | null;
  currency?: string;
}

const format = (n: number, currency: string) => `${currency}${n.toLocaleString("en-IN")}`;

/** Selling price, with the struck-through MRP and the computed discount only when the product is actually discounted. */
const PriceDisplay = ({ price, originalPrice, currency = "₹" }: Props) => {
  const discounted = originalPrice != null && originalPrice > price;
  const off = discounted ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  return (
    <span className="ui-price">
      <span className="ui-price__now">{format(price, currency)}</span>
      {discounted && (
        <>
          <s className="ui-price__was">{format(originalPrice, currency)}</s>
          <span className="ui-price__off">{off}% off</span>
        </>
      )}
    </span>
  );
};

export default PriceDisplay;
