
"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const sx = useSpring(x, { stiffness: 700, damping: 35 });
  const sy = useSpring(y, { stiffness: 700, damping: 35 });
  const rx = useSpring(x, { stiffness: 180, damping: 24 });
  const ry = useSpring(y, { stiffness: 180, damping: 24 });

  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-none-desktop");

    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as HTMLElement | null;
      setHovering(
        Boolean(target?.closest("a, button, [data-cursor='hover']"))
      );
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[120] hidden md:block"
    >
      {/* Center dot */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute -ml-1 -mt-1 size-2 rounded-full bg-[#d6b887] shadow-[0_0_12px_#d6b887]"
      />

      {/* Outer glowing ring */}
      <motion.div
        animate={{
          width: hovering ? 76 : 38,
          height: hovering ? 76 : 38,
          borderColor: hovering ? "#d6b887" : "#f5ead8",
          backgroundColor: hovering
            ? "rgba(214,184,135,0.10)"
            : "rgba(214,184,135,0)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          x: rx,
          y: ry,
          translate: "-50% -50%",
        }}
        className="absolute flex items-center justify-center rounded-full border shadow-[0_0_20px_rgba(214,184,135,0.2)]"
      >
        {hovering && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-semibold tracking-[0.15em] text-[#d6b887]"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
