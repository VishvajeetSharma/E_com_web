import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ANNOUNCEMENTS } from "@/utils/storefront";

const HomeAnnouncement = () => {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % ANNOUNCEMENTS.length), 4200);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <motion.div
      className="dd-announce"
      initial={reduce ? false : { y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-label="Announcements"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={i}
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -10 }}
          transition={{ duration: 0.45 }}
          aria-live="polite"
        >
          <span className="dd-diamond" aria-hidden="true" />
          {ANNOUNCEMENTS[i]}
          <span className="dd-diamond" aria-hidden="true" />
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};

export default HomeAnnouncement;
