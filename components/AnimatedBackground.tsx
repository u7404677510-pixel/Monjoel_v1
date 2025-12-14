"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large gradient circles */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-joel-violet/20 to-joel-mauve/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-br from-joel-mauve/15 to-joel-violet/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-br from-joel-violet/10 to-joel-mauve/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -25, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Yellow accent circles */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-48 h-48 bg-joel-yellow/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-joel-yellow/15 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Small floating dots - mix of violet and yellow */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-joel-yellow/40' : 'bg-joel-violet/30'}`}
          style={{
            top: `${15 + i * 12}%`,
            left: `${10 + (i % 4) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Animated rings */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] border border-joel-violet/10 rounded-full"
        style={{ transform: "translate(-50%, -50%)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[700px] h-[700px] border border-joel-mauve/5 rounded-full"
        style={{ transform: "translate(-50%, -50%)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
