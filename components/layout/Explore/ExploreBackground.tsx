"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ExploreBackground() {
  // Your image sources
  const images = [
    "/explore/bg-1.JPG",
    "/explore/bg-2.JPG",
    "/explore/bg-3.JPG",
    "/explore/bg-4.JPG",
  ];

  const imagePositions = [
    { top: "4%", left: "10%" },
    { top: "5%", left: "80%" },
    { top: "25%", left: "16%" },
    { top: "30%", left: "85%" },
  ];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden hidden md:block">
      {images.map((src, index) => {
        const position = imagePositions[index % imagePositions.length];

        return (
          <motion.div
            key={index}
            className="absolute rounded-full opacity-20"
            style={{
              top: position.top,
              left: position.left,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 60 + Math.random() * 40,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src={src}
              alt={`floating-${index}`}
              width={110}
              height={110}
              className="rounded-full"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
