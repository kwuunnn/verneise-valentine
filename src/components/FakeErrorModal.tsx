import { motion, AnimatePresence } from "framer-motion";

interface FakeErrorModalProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const FakeErrorModal = ({ message, visible, onClose }: FakeErrorModalProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-valentine-terminal-bg border border-valentine-terminal/30 rounded-lg p-6 max-w-md w-full shadow-celebration"
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-valentine-terminal/20">
              <div className="w-3 h-3 rounded-full bg-valentine-red" />
              <div className="w-3 h-3 rounded-full bg-valentine-gold" />
              <div className="w-3 h-3 rounded-full bg-valentine-terminal" />
              <span className="ml-2 text-valentine-terminal/60 font-mono text-xs">
                valentine_error.exe
              </span>
            </div>

            {/* Error content */}
            <div className="font-mono text-sm space-y-2">
              <p className="text-valentine-red font-semibold">
                ⚠️ SYSTEM ERROR
              </p>
              <p className="text-valentine-terminal leading-relaxed">
                {message}
              </p>
              <p className="text-valentine-terminal/50 text-xs mt-3">
                Process ID: {Math.floor(Math.random() * 9999)} | Exit code: 💔
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="mt-4 w-full py-2 rounded-md bg-valentine-terminal/20 text-valentine-terminal font-mono text-sm hover:bg-valentine-terminal/30 transition-colors border border-valentine-terminal/30"
            >
              [ OK I'll reconsider ]
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FakeErrorModal;
