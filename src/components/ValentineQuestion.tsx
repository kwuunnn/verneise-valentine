import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FakeErrorModal from "./FakeErrorModal";

interface ValentineQuestionProps {
  onAccept: () => void;
}

const ERROR_MESSAGES = [
  "Error 403: Permission to say 'No' denied. 🚫",
  "TypeError: 'No' is not a valid response. Expected: 'Yes' | 'Absolutely' | 'Of course'",
  "FATAL: rejection.exe has stopped working. Windows is searching for a solution... 💀",
  "WARNING: Clicking 'No' may cause irreversible sadness. Proceed? (just kidding, you can't)",
  "Error 418: I'm a teapot. Also, 'No' is not in my vocabulary. ☕",
  "BSOD: Blue Screen of Denial — your rejection has been rejected.",
  "npm ERR! ERESOLVE unable to resolve 'no' to a valid emotion",
  "Segfault: attempted to access forbidden memory region 'rejection_zone'",
];

const BUTTON_REACTIONS = [
  "Nice try 😏",
  "Nope!",
  "Not happening 🙅",
  "Think again!",
  "Catch me! 🏃‍♂️",
  "Too slow!",
  "Lol no 😂",
  "Almost!",
];

const ValentineQuestion = ({ onAccept }: ValentineQuestionProps) => {
  const [noAttempts, setNoAttempts] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noText, setNoText] = useState("No 😐");
  const [yesScale, setYesScale] = useState(1);
  const [isSwapped, setIsSwapped] = useState(false);
  const [statusMessages, setStatusMessages] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxAttempts = 6;

  const addStatusMessage = useCallback((msg: string) => {
    setStatusMessages((prev) => [...prev.slice(-4), msg]);
  }, []);

  const moveNoButton = useCallback(() => {
    const maxX = window.innerWidth < 640 ? 100 : 200;
    const maxY = window.innerWidth < 640 ? 80 : 150;
    const newX = (Math.random() - 0.5) * maxX;
    const newY = (Math.random() - 0.5) * maxY;
    setNoPosition({ x: newX, y: newY });
  }, []);

  const handleNoClick = useCallback(() => {
    const attempt = noAttempts + 1;
    setNoAttempts(attempt);

    // Grow Yes button with each attempt
    setYesScale(1 + attempt * 0.15);

    // Update No button text
    setNoText(BUTTON_REACTIONS[attempt % BUTTON_REACTIONS.length]);

    if (attempt >= maxAttempts) {
      // Auto-accept after max attempts
      addStatusMessage("⚠️ Maximum rejection attempts exceeded.");
      addStatusMessage("🔄 Auto-selecting 'Yes'...");
      setTimeout(() => onAccept(), 1500);
      return;
    }

    // Different behaviors per attempt
    if (attempt % 3 === 0) {
      // Show error modal every 3rd attempt
      setErrorMessage(ERROR_MESSAGES[attempt % ERROR_MESSAGES.length]);
      setShowError(true);
    }

    if (attempt === 2) {
      setIsSwapped(true);
      addStatusMessage("🔀 Buttons swapped. Oops, dev bug! 😅");
    } else if (attempt === 4) {
      setIsSwapped(false);
      addStatusMessage(
        "🐛 Button positions corrupted. Not a bug, it's a feature.",
      );
    }

    // Always move the button
    moveNoButton();

    // Status messages
    const statusOpts = [
      `❌ Rejection attempt #${attempt} failed.`,
      `🔍 Searching for 'No' handler... not found.`,
      `💔 Error: Cannot break heart. Permission denied.`,
      `📊 Rejection rate: 0% (hardcoded)`,
      `🔧 Attempting to patch rejection module... patch rejected.`,
    ];
    addStatusMessage(statusOpts[attempt % statusOpts.length]);
  }, [noAttempts, moveNoButton, addStatusMessage, onAccept]);

  const handleNoHover = useCallback(() => {
    if (noAttempts > 1) {
      moveNoButton();
    }
  }, [noAttempts, moveNoButton]);

  const yesButton = (
    <motion.button
      key="yes"
      className="px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-gradient-valentine text-primary-foreground font-bold text-base sm:text-lg shadow-valentine hover:shadow-glow transition-shadow animate-pulse-glow"
      animate={{ scale: yesScale }}
      whileHover={{ scale: yesScale * 1.1 }}
      whileTap={{ scale: yesScale * 0.95 }}
      onClick={onAccept}
    >
      Yes 💖
    </motion.button>
  );

  const noButton = (
    <motion.button
      key="no"
      className="px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-secondary text-secondary-foreground font-bold text-base sm:text-lg border-2 border-border hover:bg-muted transition-colors"
      animate={{
        x: noPosition.x,
        y: noPosition.y,
      }}
      transition={{ type: "spring", damping: 10 }}
      onClick={handleNoClick}
      onMouseEnter={handleNoHover}
      onTouchStart={handleNoHover}
    >
      {noText}
    </motion.button>
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-blush relative overflow-hidden px-4"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl sm:text-4xl opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {["💖", "💕", "🌹", "💗"][i % 4]}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center max-w-md w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Cute header */}
        <motion.div
          className="text-5xl sm:text-6xl mb-6"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💌
        </motion.div>

        <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2 leading-tight">
          Verneise Seah,
        </h1>
        <h2 className="text-xl sm:text-3xl font-bold text-gradient-valentine mb-8">
          Will you be my Valentine?
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 min-h-[120px]">
          {isSwapped ? (
            <>
              {noButton}
              {yesButton}
            </>
          ) : (
            <>
              {yesButton}
              {noButton}
            </>
          )}
        </div>

        {/* Status console */}
        <AnimatePresence>
          {statusMessages.length > 0 && (
            <motion.div
              className="bg-valentine-terminal-bg rounded-lg p-3 sm:p-4 text-left mx-auto"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-valentine-terminal/20">
                <div className="w-2 h-2 rounded-full bg-valentine-red" />
                <div className="w-2 h-2 rounded-full bg-valentine-gold" />
                <div className="w-2 h-2 rounded-full bg-valentine-terminal" />
                <span className="ml-1 text-valentine-terminal/40 font-mono text-[10px]">
                  rejection_handler.log
                </span>
              </div>
              <div className="font-mono text-xs space-y-1">
                {statusMessages.map((msg, i) => (
                  <motion.p
                    key={`${msg}-${i}`}
                    className="text-valentine-terminal"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <span className="text-valentine-terminal/40">
                      [{new Date().toLocaleTimeString()}]{" "}
                    </span>
                    {msg}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Attempt counter */}
        {noAttempts > 0 && (
          <motion.p
            className="mt-4 text-xs text-muted-foreground font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Failed rejection attempts: {noAttempts}/{maxAttempts} | Success
            probability: 100%
          </motion.p>
        )}
      </motion.div>

      {/* Error Modal */}
      <FakeErrorModal
        message={errorMessage}
        visible={showError}
        onClose={() => setShowError(false)}
      />
    </div>
  );
};

export default ValentineQuestion;
