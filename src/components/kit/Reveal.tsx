import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "none";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition"> {
  children: ReactNode;
  /** seconds */
  delay?: number;
  from?: Direction;
  /** distance in px */
  distance?: number;
  once?: boolean;
  amount?: number;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * The single motion primitive for the site. Everything that enters the
 * viewport does so the same way: a short, low-amplitude settle. No bounce,
 * no scale, no stagger longer than the reader's patience.
 */
const Reveal = ({
  children,
  delay = 0,
  from = "up",
  distance = 18,
  once = true,
  amount = 0.25,
  ...rest
}: RevealProps) => {
  const reduced = useReducedMotion();
  const o = offsets[from];

  if (reduced) return <motion.div {...rest}>{children}</motion.div>;

  return (
    <motion.div
      initial={{ opacity: 0, x: o.x * distance, y: o.y * distance }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
