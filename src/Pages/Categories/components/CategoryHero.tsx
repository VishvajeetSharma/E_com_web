import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { hiRes, type HomeProduct } from "@/utils/storefront";
import type { CategoryConfig } from "@/Pages/Categories/utils/categoryConfig";
import Tilt from "@/components/common/Tilt";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);
const CategoryHeroScene = lazy(() => import("@/Pages/Categories/components/CategoryHeroScene"));

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl2") || c.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch { return false; }
}
const idle = (cb: () => void) => {
  if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(cb, { timeout: 1500 });
  else setTimeout(cb, 700);
};

interface Props {
  cfg: CategoryConfig;
  picks: HomeProduct[];
  total: number;
  maxDiscount: number;
  onExplore: () => void;
  onTrending: () => void;
}

const CategoryHero = ({ cfg, picks, total, maxDiscount, onExplore, onTrending }: Props) => {
  const root = useRef<HTMLElement>(null);
  const [sceneOn, setSceneOn] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 900px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let cancelled = false;
    const evaluate = () => {
      if (!wide.matches || calm.matches || conn?.saveData) { setSceneOn(false); setSceneReady(false); return; }
      idle(() => { if (!cancelled && webglAvailable()) setSceneOn(true); });
    };
    evaluate();
    wide.addEventListener("change", evaluate);
    calm.addEventListener("change", evaluate);
    return () => { cancelled = true; wide.removeEventListener("change", evaluate); calm.removeEventListener("change", evaluate); };
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    const vis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", vis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", vis); };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(".cat-hero-eyebrow", { y: 16, opacity: 0, duration: 0.9 }, 0.1)
          .from(".cat-hero h1 .dd-line > span", { yPercent: 118, duration: 1.4 }, 0.15)
          .from(".cat-hero-desc", { y: 22, opacity: 0, duration: 1 }, 0.7)
          .from(".cat-hero-facts", { y: 18, opacity: 0, duration: 0.9 }, 0.85)
          .from(".cat-hero-cta > *", { y: 22, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.95)
          .from(".cat-frame", { y: 70, opacity: 0, duration: 1.5, stagger: 0.18 }, 0.3)
          .from(".cat-ghost", { opacity: 0, x: -40, duration: 1.8 }, 0.2);
        gsap.to(".cat-ghost", { xPercent: -8, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
        gsap.to(".cat-hero-copy", { y: -50, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [cfg.key] },
  );

  const [main, second] = picks;
  const active = inView && !tabHidden;

  return (
    <section ref={root} className={`cat-hero cat-hero--${cfg.key}`} aria-labelledby="cat-hero-title">
      <div className="cat-ghost" aria-hidden="true">{cfg.title}</div>

      {sceneOn && (
        <div className={`cat-hero-canvas${sceneReady ? " is-ready" : ""}`} aria-hidden="true">
          <ErrorBoundary onError={() => { setSceneOn(false); setSceneReady(false); }}>
            <Suspense fallback={null}>
              <CategoryHeroScene variant={cfg.key} active={active} sourceRef={root} onReady={() => setSceneReady(true)} />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      <div className="dd-container cat-hero-inner">
        <div className="cat-hero-copy">
          <p className="dd-eyebrow cat-hero-eyebrow">{cfg.eyebrow}</p>
          <h1 id="cat-hero-title">
            {cfg.heading.map((l) => (<span className="dd-line" key={l}><span>{l}</span></span>))}
          </h1>
          <p className="cat-hero-desc">{cfg.description}</p>
          {total > 0 && (
            <p className="cat-hero-facts">
              <span>{total} pieces</span>
              {maxDiscount > 0 && <span>Up to {maxDiscount}% off</span>}
            </p>
          )}
          <div className="cat-hero-cta">
            <motion.button type="button" className="dd-btn cat-btn-primary" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={onExplore}>
              Explore Collection
            </motion.button>
            <motion.button type="button" className="dd-btn cat-btn-secondary" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={onTrending}>
              Discover Trending
            </motion.button>
          </div>
        </div>

        <div className="cat-hero-art">
          <Tilt max={5} className="cat-art-tilt">
            <div className="cat-art-stage">
              {main && (
                <div className="cat-frame cat-frame--main">
                  <img data-parallax="6" src={hiRes(main.image, 1200)} alt={main.name} fetchPriority="high" decoding="async" />
                </div>
              )}
              {second && (
                <div className="cat-frame cat-frame--second">
                  <img data-parallax="9" src={hiRes(second.image, 700)} alt="" decoding="async" />
                </div>
              )}
              <span className="cat-edge" aria-hidden="true" />
              <span className={`cat-shape cat-shape--1${sceneReady ? " is-hidden" : ""}`} aria-hidden="true" />
              <span className={`cat-shape cat-shape--2${sceneReady ? " is-hidden" : ""}`} aria-hidden="true" />
              <span className={`cat-shape cat-shape--3${sceneReady ? " is-hidden" : ""}`} aria-hidden="true" />
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
};

export default CategoryHero;
