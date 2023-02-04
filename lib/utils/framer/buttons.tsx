"use client";

import { ReactNode, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

type AnimatedButtonProps = {
  children: ReactNode;
  disabled: boolean;
  type: "submit" | "reset" | "button" | undefined;
  className?: string;
};

export function AnimatedButton({
  children,
  disabled = false,
  type = "button",
  className = "",
  ...props
}: AnimatedButtonProps) {
  const controls = useAnimation();

  const disabledButtonClassNames = disabled ? "border-red-500" : "border-black";

  useEffect(() => {
    if (disabled) {
      controls.start({ borderColor: "red" });
    } else {
      controls.start({ borderColor: "black" });
    }
  }, [disabled]);

  return (
    <motion.button
      className={`border-2 text-black uppercase px-2 py-3 rounded-md shadow-md disabled:cursor-not-allowed w-full`}
      animate={controls}
      disabled={disabled}
      type={type}
      initial={disabled ? { borderColor: "red" } : { borderColor: "black" }}
      whileTap={{ scale: 0.9, borderColor: disabled ? "red" : "black" }}
      onTapStart={() =>
        controls.start({ scale: 0.9, borderColor: disabled ? "red" : "black" })
      }
      onTapCancel={() =>
        controls.start({ scale: 1, borderColor: disabled ? "red" : "black" })
      }
      {...props}
    >
      {children}
    </motion.button>
  );
}
