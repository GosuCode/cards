"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/types";

interface HiddenCardMessageProps {
  card: Card;
  isVisible: boolean;
  onClose: () => void;
}

export default function HiddenCardMessage({
  card,
  isVisible,
  onClose,
}: HiddenCardMessageProps) {
  if (!card.hiddenMessage) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <motion.div
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                🔒
              </motion.div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Card Locked
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {card.hiddenMessage}
              </p>

              <div className="space-y-3">
                <div className="text-sm text-gray-500">
                  <strong>Requirements:</strong>
                </div>
                {card.requires &&
                  Object.entries(card.requires).map(([stat, value]) => (
                    <div key={stat} className="text-sm text-gray-600">
                      {stat.toUpperCase()}: {value}
                    </div>
                  ))}
              </div>

              <motion.button
                className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                Got it!
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
