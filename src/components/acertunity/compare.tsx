"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { SparklesCore } from "./sparkles";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../utils/acertunity";
import { IconDotsVertical } from "@tabler/icons-react";

interface CompareProps {
  firstImage?: string;
  secondImage?: string;
  className?: string;
  firstImageClassName?: string;
  secondImageClassName?: string;
  secondImageClassname?: string;

  firstText?: string;
  secondText?: string;
  showText?: boolean;

  initialSliderPercentage?: number;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
}
export const Compare = ({
  firstImage = "",
  secondImage = "",
  className,
  firstImageClassName,
  secondImageClassName,
  secondImageClassname,
  firstText,
  secondText,
  showText = false,
  initialSliderPercentage = 50,
  slideMode = "hover",
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
}: CompareProps) => {
  const [sliderXPercent, setSliderXPercent] = useState(() =>
    Math.max(0, Math.min(100, initialSliderPercentage)),
  );
  const [isDragging, setIsDragging] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const [isMouseOver, setIsMouseOver] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const secondImageClasses = secondImageClassName || secondImageClassname;

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    if (!autoplay || autoplayDuration <= 0) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress =
        (elapsedTime % (autoplayDuration * 2)) / autoplayDuration;
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100;

      setSliderXPercent(percentage);
      autoplayRef.current = setTimeout(animate, 16); // ~60fps
    };

    animate();
  }, [autoplay, autoplayDuration, stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  function pointerEnterHandler() {
    setIsMouseOver(true);
    stopAutoplay();
  }

  function pointerLeaveHandler() {
    setIsMouseOver(false);
    if (slideMode === "hover") {
      setSliderXPercent(initialSliderPercentage);
      startAutoplay();
    } else if (!isDragging) {
      startAutoplay();
    }
  }

  const handlePointerEnd = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(false);
    }
    if (!isMouseOver) {
      startAutoplay();
    }
  }, [isMouseOver, slideMode, startAutoplay]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
        const rect = sliderRef.current.getBoundingClientRect();
        if (rect.width === 0) return;
        const x = clientX - rect.left;
        const percent = (x / rect.width) * 100;
        requestAnimationFrame(() => {
          setSliderXPercent(Math.max(0, Math.min(100, percent)));
        });
      }
    },
    [slideMode, isDragging],
  );

  return (
    <div
      ref={sliderRef}
      className={cn("w-100 h-100 overflow-hidden", className)}
      style={{
        position: "relative",
        touchAction: slideMode === "drag" ? "none" : "pan-y",
        cursor:
          isMouseOver && slideMode === "drag"
            ? "grabbing"
            : slideMode === "drag"
              ? "grab"
              : "col-resize",
      }}
      onPointerMove={(event) => handleMove(event.clientX)}
      onPointerLeave={pointerLeaveHandler}
      onPointerEnter={pointerEnterHandler}
      onPointerDown={(event) => {
        if (slideMode === "drag") {
          event.currentTarget.setPointerCapture(event.pointerId);
          setIsDragging(true);
        }
      }}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      <AnimatePresence initial={false}>
        <motion.div
          className="h-full w-px absolute top-0 m-auto z-30 bg-linear-to-b from-transparent from-5% to-95% via-indigo-500 to-transparent"
          style={{
            left: `${sliderXPercent}%`,
            top: "0",
            zIndex: 40,
          }}
          transition={{ duration: 0 }}
        >
          <div className="w-36 h-full mask-[radial-gradient(100px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-linear-to-r from-indigo-400 via-transparent to-transparent z-20 opacity-50" />
          <div className="w-10 h-1/2 mask-[radial-gradient(50px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-linear-to-r from-cyan-400 via-transparent to-transparent z-10 opacity-100" />
          <div className="w-10 h-3/4 top-1/2 -translate-y-1/2 absolute -right-10 mask-[radial-gradient(100px_at_left,white,transparent)]">
            <MemoizedSparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>
          {showHandlebar && (
            <div className="h-5 w-5 rounded-md top-1/2 -translate-y-1/2 bg-white z-30 -right-2.5 absolute   flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40]">
              <IconDotsVertical className="h-4 w-4 text-black" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="overflow-hidden w-full h-full relative z-20 pointer-events-none">
        <AnimatePresence initial={false}>
          {firstImage ? (
            <motion.div
              className={cn(
                "absolute inset-0 z-20 rounded-2xl w-full h-full overflow-hidden",
                firstImageClassName,
              )}
              style={{
                clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
              }}
            >
              {/* Image (CLEAR) */}
              <img
                src={firstImage}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />

              {(showText && firstText) && (
                <div className="absolute inset-0 flex items-center justify-center z-30">
                  <h2 className="text-white text-2xl md:text-3xl font-bold relative">
                    <span className="absolute inset-0 text-white blur-md opacity-70">
                      {firstText}
                    </span>
                    <span className="relative z-10">{firstText}</span>
                  </h2>
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {secondImage ? (
          <motion.div className="absolute top-0 left-0 z-19 w-full h-full">
            <img
              src={secondImage}
              className={cn("w-full h-full object-cover rounded-2xl", secondImageClasses)}
              draggable={false}
            />

            {(showText && secondText) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-2xl md:text-3xl font-bold relative">
                  <span className="absolute inset-0 text-white blur-md opacity-70">
                    {secondText}
                  </span>
                  <span className="relative z-10">{secondText}</span>
                </h2>
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const MemoizedSparklesCore = React.memo(SparklesCore);
