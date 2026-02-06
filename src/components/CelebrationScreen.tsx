import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import FloatingHearts from "./FloatingHearts";

const CelebrationScreen = () => {
  useEffect(() => {
    // Initial big burst
    const fireConfetti = () => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#e84393", "#fd79a8", "#ff6b6b", "#ffeaa7", "#ff9ff3"],
      });
    };

    fireConfetti();

    // Follow-up bursts
    const timers = [
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#e84393", "#fd79a8", "#ff6b6b"],
        });
      }, 500),
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#e84393", "#fd79a8", "#ff6b6b"],
        });
      }, 700),
      setTimeout(() => fireConfetti(), 1200),
    ];

    // Continuous subtle confetti
    const interval = setInterval(() => {
      confetti({
        particleCount: 20,
        spread: 60,
        origin: { x: Math.random(), y: Math.random() * 0.3 },
        colors: ["#e84393", "#fd79a8", "#ffeaa7"],
      });
    }, 2000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  const devJokes = [
    "💾 Valentine status: CONFIRMED",
    "🔒 Rollback: DISABLED",
    "🚫 404: Rejection not found",
    "✅ git commit -m 'added valentine'",
    "📦 Deploying love to production...",
    "⚡ Relationship.exe running smoothly",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-blush relative overflow-hidden px-4">
      <FloatingHearts />

      <motion.div
        className="relative z-10 text-center max-w-lg w-full"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 12, delay: 0.2 }}
      >
        {/* Big heart */}
        <motion.div
          className="text-7xl sm:text-8xl mb-6"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          💖
        </motion.div>

        {/* Main message */}
        <motion.h1
          className="text-3xl sm:text-5xl font-bold text-gradient-valentine mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          EXCELLENT DECISION
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Verneise Seash & You are now officially Valentines! 🎉
        </motion.p>

        {/* Terminal-style jokes */}
        <motion.div
          className="bg-valentine-terminal-bg rounded-lg p-4 sm:p-5 text-left mx-auto shadow-celebration"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-valentine-terminal/20">
            <div className="w-2.5 h-2.5 rounded-full bg-valentine-red" />
            <div className="w-2.5 h-2.5 rounded-full bg-valentine-gold" />
            <div className="w-2.5 h-2.5 rounded-full bg-valentine-terminal" />
            <span className="ml-2 text-valentine-terminal/50 font-mono text-xs">
              love_terminal v1.4.2
            </span>
          </div>

          <div className="font-mono text-xs sm:text-sm space-y-1.5">
            {devJokes.map((joke, i) => (
              <motion.p
                key={i}
                className="text-valentine-terminal"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.3 }}
              >
                <span className="text-valentine-terminal/50">$ </span>
                {joke}
              </motion.p>
            ))}
            <motion.p
              className="text-valentine-pink mt-3 font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + devJokes.length * 0.3 }}
            >
              <span className="text-valentine-terminal/50">→ </span>
              Happy Valentine's Day! 💕
            </motion.p>
          </div>
        </motion.div>

        {/* Sparkle decorations */}
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-xl sm:text-2xl animate-sparkle"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            ✨
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default CelebrationScreen;
