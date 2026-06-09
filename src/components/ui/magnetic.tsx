"use client";

import { motion } from "motion/react";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";

interface MagneticProps {
  children: ReactNode;
  range?: number;
}

export function Magnetic({ children, range = 35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = el.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Distance from center
    const x = clientX - centerX;
    const y = clientY - centerY;
    
    // Check if mouse is within range
    const distance = Math.sqrt(x * x + y * y);
    
    if (distance < range) {
      // Scale attraction based on proximity (closer = stronger attraction)
      const force = 0.35;
      setPosition({ x: x * force, y: y * force });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};
