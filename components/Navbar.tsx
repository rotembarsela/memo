"use client";

import React from "react";
import { motion, useAnimation } from "framer-motion";

export function Navbar() {
  const controls = useAnimation();

  return (
    <div className="w-screen h-14 border-b-2 border-gray-500/10 shadow-sm px-5">
      <nav className="flex items-center justify-between h-full">
        <div className="flex items-center h-full gap-10">
          <h3 className="text-2xl uppercase cursor-pointer">Memo</h3>
          <ul className="flex gap-10 text-md">
            <motion.li
              animate={controls}
              whileHover={{
                scale: 1.2,
                transition: { type: "tween", ease: "easeInOut" },
              }}
              className="cursor-pointer"
            >
              Memories
            </motion.li>
            <motion.li className="cursor-pointer">About</motion.li>
            <motion.li className="cursor-pointer">Settings</motion.li>
          </ul>
        </div>
        {/* Actions */}
        <div className="actions">
          <span>Hello, John</span>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
