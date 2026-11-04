import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface Props {
  value: number;
  count?: number;
  size?: number;
}

/** Read-only star rating out of 5 (half stars supported). */
const Rating = ({ value, count, size = 12 }: Props) => {
  const clamped = Math.max(0, Math.min(5, value));
  return (
    <span className="ui-rating" role="img" aria-label={`Rated ${clamped.toFixed(1)} out of 5${count ? ` from ${count} reviews` : ""}`}>
      {[1, 2, 3, 4, 5].map((i) =>
        clamped >= i ? <FaStar key={i} size={size} /> : clamped >= i - 0.5 ? <FaStarHalfAlt key={i} size={size} /> : <FaRegStar key={i} size={size} />,
      )}
      <span className="ui-rating__value" aria-hidden="true">{clamped.toFixed(1)}{count ? ` (${count})` : ""}</span>
    </span>
  );
};

export default Rating;
