"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingStatChangeProps {
  stat: string;
  change: number;
  icon: string;
  color: string;
  onComplete: () => void;
}

export default function FloatingStatChange({
  stat,
  change,
  icon,
  color,
  onComplete,
}: FloatingStatChangeProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = () => {
    onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <motion.div
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 ${color} text-white px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20`}
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.8 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{icon}</span>
            <span className="font-bold text-lg">
              {change > 0 ? "+" : ""}
              {change} {stat}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const useFloatingStatChanges = () => {
  const [changes, setChanges] = useState<
    Array<{
      id: string;
      stat: string;
      change: number;
      icon: string;
      color: string;
    }>
  >([]);

  const addStatChange = (stat: string, change: number) => {
    const statConfig = {
      gpa: { icon: "📈", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
      money: {
        icon: "💰",
        color: "bg-gradient-to-r from-amber-500 to-yellow-500",
      },
      stress: {
        icon: "😫",
        color: "bg-gradient-to-r from-red-500 to-pink-500",
      },
      social: {
        icon: "👥",
        color: "bg-gradient-to-r from-emerald-500 to-green-500",
      },
    };

    const config = statConfig[stat as keyof typeof statConfig];
    if (!config) return;

    const id = `${stat}-${Date.now()}`;
    setChanges((prev) => [...prev, { id, stat, change, ...config }]);
  };

  const removeStatChange = (id: string) => {
    setChanges((prev) => prev.filter((change) => change.id !== id));
  };

  return { changes, addStatChange, removeStatChange };
};
