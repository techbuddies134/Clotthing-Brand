"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";

/** A pointer-tracking 3D tilt surface with a soft light glare. */
export function TiltCard({
  children,
  className = "",
  strength = 9,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<{ rx: number; ry: number; gx: number; gy: number }>({
    rx: 0,
    ry: 0,
    gx: 50,
    gy: 50,
  });
  const [active, setActive] = useState(false);

  function onMove(event: MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setStyle({
      rx: (0.5 - py) * strength * 2,
      ry: (px - 0.5) * strength * 2,
      gx: px * 100,
      gy: py * 100,
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => {
        setActive(false);
        setStyle({ rx: 0, ry: 0, gx: 50, gy: 50 });
      }}
      className={`group relative [transform-style:preserve-3d] ${className}`}
      style={{
        transform: `perspective(1100px) rotateX(${style.rx}deg) rotateY(${style.ry}deg) translateZ(0)`,
        transition: active ? "transform 120ms linear" : "transform 900ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
      {glare ? (
        <span
          aria-hidden
          className="glare"
          style={
            {
              "--gx": `${style.gx}%`,
              "--gy": `${style.gy}%`,
            } as React.CSSProperties
          }
        />
      ) : null}
    </div>
  );
}

export function ArrowLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      {children}
      <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  );
}
