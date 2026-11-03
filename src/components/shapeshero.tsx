import { motion } from "motion/react";

import { cn } from "../utils/acertunity";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
  borderRadius = 16,
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
  borderRadius?: number;
}) {
  return (
    <motion.div
      animate={{
        opacity: 1,
        y: 0,
        rotate,
      }}
      className={cn("absolute", className)}
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        className="relative"
        style={{
          width,
          height,
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div
          className={cn(
            "absolute inset-0",
            "bg-linear-to-r to-transparent",
            gradient,
            "backdrop-blur-[1px]",
            "ring-1 ring-white/3 dark:ring-white/2",
            "shadow-[0_2px_16px_-2px_rgba(255,255,255,0.04)]",
            "after:absolute after:inset-0",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_70%)]",
            "after:rounded-[inherit]",
          )}
          style={{ borderRadius }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ShapeHero({
  title1 = "Trend Setter",
  title2 = "Darling Desire",
}: {
  title1?: string;
  title2?: string;
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-linear-to-r from-[#151522] via-[#4A101C] to-[#151522] dark:bg-[#030303]">
      <div className="absolute inset-0 bg-linear-to-br from-[#C6A46A]/5 via-transparent to-[#812D3A]/10 blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        {/* Tall rectangle - top left */}
        <ElegantShape
          borderRadius={24}
          className="top-[-10%] left-[-15%]"
          delay={0.3}
          gradient="from-[#C6A46A]/[0.25] dark:from-[#C6A46A]/[0.35]"
          height={500}
          rotate={-8}
          width={300}
        />

        {/* Wide rectangle - bottom right */}
        <ElegantShape
          borderRadius={20}
          className="right-[-20%] bottom-[-5%]"
          delay={0.5}
          gradient="from-[#812D3A]/[0.45] dark:from-[#812D3A]/[0.55]"
          height={200}
          rotate={15}
          width={600}
        />

        {/* Square - middle left */}
        <ElegantShape
          borderRadius={32}
          className="top-[40%] left-[-5%]"
          delay={0.4}
          gradient="from-[#E8D9C9]/[0.18] dark:from-[#E8D9C9]/[0.22]"
          height={300}
          rotate={24}
          width={300}
        />

        {/* Small rectangle - top right */}
        <ElegantShape
          borderRadius={12}
          className="top-[5%] right-[10%]"
          delay={0.6}
          gradient="from-[#C6A46A]/[0.3] dark:from-[#C6A46A]/[0.4]"
          height={100}
          rotate={-20}
          width={250}
        />

        {/* New shapes */}
        {/* Medium rectangle - center right */}
        <ElegantShape
          borderRadius={16}
          className="top-[45%] right-[-10%]"
          delay={0.7}
          gradient="from-emerald-500/[0.25] dark:from-emerald-500/[0.35]"
          height={150}
          rotate={35}
          width={400}
        />

        <ElegantShape
          borderRadius={28}
          className="bottom-[10%] left-[20%]"
          delay={0.2}
          gradient="from-blue-500/[0.25] dark:from-blue-500/[0.35]"
          height={200}
          rotate={-25}
          width={200}
        />

        <ElegantShape
          borderRadius={10}
          className="top-[15%] left-[40%]"
          delay={0.8}
          gradient="from-[#812D3A]/[0.35] dark:from-[#812D3A]/[0.45]"
          height={80}
          rotate={45}
          width={150}
        />

        {/* Wide rectangle - middle */}
        <ElegantShape
          borderRadius={18}
          className="top-[60%] left-[25%]"
          delay={0.9}
          gradient="from-teal-500/[0.25] dark:from-teal-500/[0.35]"
          height={120}
          rotate={-12}
          width={450}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            animate="visible"
            custom={1}
            initial="hidden"
            variants={fadeUpVariants as any}
          >
            <h1 className="mb-6 font-bold text-4xl tracking-tight sm:text-6xl md:mb-8 md:text-8xl">
              <span className="bg-linear-to-b from-[#FAF7F2] to-[#E8D9C9] bg-clip-text text-transparent">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-linear-to-r from-[#C6A46A] via-[#FAF7F2] to-[#C6A46A] bg-clip-text text-transparent",
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>
          <motion.div
            animate="visible"
            custom={2}
            initial="hidden"
            variants={fadeUpVariants as any}
          >
            <p className="mx-auto mb-8 max-w-xl px-4 font-light text-base text-black/40 leading-relaxed tracking-wide sm:text-lg md:text-xl dark:text-white/40">
              Elegance and style meet in every fashionable outfit
            </p>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-white via-transparent to-white/80 dark:from-[#030303] dark:via-transparent dark:to-[#030303]/80" />
    </div>
  );
}
