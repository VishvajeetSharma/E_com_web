import { motion } from "framer-motion";
import { hiRes } from "@/utils/storefront";
import type { BeautyGroup } from "@/pages/Beauty/utils/beautyData";

interface Props { group: BeautyGroup; index: number; active: boolean; onPick: (key: string) => void }

/** Collection tile: filters the discovery grid below (real categories only). */
const BeautyCollectionCard = ({ group, index, active, onPick }: Props) => (
  <motion.button
    type="button"
    className={`bt-coll${active ? " is-on" : ""}`}
    aria-pressed={active}
    onClick={() => onPick(group.key)}
    initial="rest" whileHover="hover" whileTap="hover" animate="rest"
  >
    {group.image && (
      <motion.img
        src={hiRes(group.image, 900)} alt="" loading="lazy" decoding="async"
        variants={{ rest: { scale: 1.02 }, hover: { scale: 1.1 } }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    )}
    <span className="bt-coll-shade" aria-hidden="true" />
    <span className="bt-coll-num">0{index + 1}</span>
    <span className="bt-coll-copy">
      <small>{group.tag}</small>
      <strong>{group.label}</strong>
      <em>{group.count} {group.count === 1 ? "piece" : "pieces"} →</em>
    </span>
  </motion.button>
);

export default BeautyCollectionCard;
