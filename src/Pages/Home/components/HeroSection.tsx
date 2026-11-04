import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import {
  formatPrice, hiRes, pickProducts, selectProducts, type HomeRootState,
} from "@/utils/storefront";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// The whole 3D stack (three, R3F, drei) stays out of the initial bundle.
const HeroScene = lazy(() => import("@/Pages/Home/components/HeroScene"));

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl2") || c.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

const idle = (cb: () => void) => {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(cb, { timeout: 1500 });
  } else {
    setTimeout(cb, 700);
  }
};

const HeroSection = () => {
  const root = useRef<HTMLElement>(null);
  const products = useSelector((s: HomeRootState) => selectProducts(s));
  const featured = useMemo(() => pickProducts(products, [5, 603, 701], 3), [products]);

  const [sceneOn, setSceneOn] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);

  // Decide whether to mount the 3D scene: desktop/tablet-landscape, motion allowed, WebGL present.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 900px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let cancelled = false;
    const evaluate = () => {
      const ok = wide.matches && !calm.matches && !conn?.saveData;
      if (!ok) { setSceneOn(false); setSceneReady(false); return; }
      idle(() => { if (!cancelled && webglAvailable()) setSceneOn(true); });
    };
    evaluate();
    wide.addEventListener("change", evaluate);
    calm.addEventListener("change", evaluate);
    return () => {
      cancelled = true;
      wide.removeEventListener("change", evaluate);
      calm.removeEventListener("change", evaluate);
    };
  }, []);

  // Pause rendering when the hero is off-screen or the tab is hidden.
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
        tl.from(".dd-hero-eyebrow", { y: 16, opacity: 0, duration: 0.9 }, 0.15)
          .from(".dd-hero h1 .dd-line > span", { yPercent: 115, duration: 1.3, stagger: 0.13 }, 0.2)
          .from(".dd-hero-lede", { y: 24, opacity: 0, duration: 1 }, 0.75)
          .from(".dd-hero-cta > *", { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.9)
          .from(".dd-frame", { y: 60, opacity: 0, duration: 1.4, stagger: 0.15 }, 0.35)
          .from(".dd-hero-caption", { opacity: 0, y: 14, duration: 1 }, 1.2)
          .from(".dd-scroll", { opacity: 0, duration: 1.2 }, 1.5);

        // Scroll-out parallax lives on wrapper elements, never on the ones animated above.
        gsap.to(".dd-hero-copy", {
          y: -70, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".dd-hero-visual", {
          y: 50, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const main = featured[0];
  const [fa, fb] = [featured[1], featured[2]];
  const active = inView && !tabHidden;

  return (
    <section ref={root} className="dd-hero" aria-labelledby="dd-hero-title">
      {sceneOn && (
        <div className={`dd-hero-canvas${sceneReady ? " is-ready" : ""}`} aria-hidden="true">
          <ErrorBoundary onError={() => { setSceneOn(false); setSceneReady(false); }}>
            <Suspense fallback={null}>
              <HeroScene
                images={featured.map((p) => hiRes(p.image, 900))}
                active={active}
                sourceRef={root}
                onReady={() => setSceneReady(true)}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      <div className="dd-container dd-hero-inner">
        <div className="dd-hero-copy">
          <p className="dd-eyebrow dd-hero-eyebrow">The Royal Burgundy Collection</p>
          <h1 id="dd-hero-title">
            <span className="dd-line"><span>Where desire</span></span>
            <span className="dd-line"><span>becomes <em>elegance.</em></span></span>
          </h1>
          <p className="dd-hero-lede">
            Considered fashion, beauty and living — chosen with intention and
            made to be kept.
          </p>
          <div className="dd-hero-cta">
            <motion.span whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/category/women" className="dd-btn dd-btn--gold" onClick={() => window.scrollTo(0, 0)}>Shop Women</Link>
            </motion.span>
            <motion.span whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <a href="#collections" className="dd-btn dd-btn--ghost"
                onClick={(e) => { e.preventDefault(); document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" }); }}>
                Explore Collections
              </a>
            </motion.span>
          </div>
        </div>

        {/* Premium static composition: the mobile hero, the pre-load state and the no-WebGL fallback. */}
        <div className={`dd-hero-visual${sceneReady ? " is-hidden" : ""}`}>
          {main && (
            <div className="dd-frame dd-frame--main"><img src={hiRes(main.image, 900)} alt={main.name} fetchPriority="high" decoding="async" /></div>
          )}
          {fa && <div className="dd-frame dd-frame--a"><img src={hiRes(fa.image, 600)} alt="" decoding="async" /></div>}
          {fb && <div className="dd-frame dd-frame--b"><img src={hiRes(fb.image, 600)} alt="" decoding="async" /></div>}
          <span className="dd-ring" aria-hidden="true" />
        </div>

        {main && (
          <Link to={`/product/${main.id}`} className="dd-hero-caption" onClick={() => window.scrollTo(0, 0)}>
            <small>Featured</small>
            <span>{main.name}</span>
            <b>{formatPrice(main.price)}</b>
          </Link>
        )}
      </div>

      <div className="dd-scroll" aria-hidden="true"><span>Scroll</span><i /></div>
    </section>
  );
};

export default HeroSection;
