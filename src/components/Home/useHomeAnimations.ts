import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-driven reveals for the homepage, driven by data attributes:
 *  [data-reveal]   fade + rise            (data-delay optional)
 *  [data-lines]    masked line reveal     (children: .dd-line > span)
 *  [data-card]     batched stagger-in
 *  [data-parallax] image parallax         (value = strength in %)
 * Nothing is hidden unless motion is allowed.
 */
export function useHomeAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 36,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((el) => {
          gsap.from(el.querySelectorAll(".dd-line > span"), {
            yPercent: 115,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
        if (cards.length) {
          gsap.set(cards, { opacity: 0, y: 36 });
          ScrollTrigger.batch(cards, {
            start: "top 92%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.08,
                overwrite: true,
              }),
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const s = Number(el.dataset.parallax ?? 8);
          gsap.fromTo(
            el,
            { yPercent: -s },
            {
              yPercent: s,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
      });

      // Layout shifts from webfonts / images: recompute trigger positions.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh).catch(() => {});
      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { scope },
  );
}
