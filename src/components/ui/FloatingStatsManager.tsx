"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface StatChange {
  id: string;
  stat: string;
  change: number;
  icon: string;
  color: string;
}

interface FloatingStatsManagerProps {
  changes: StatChange[];
  onRemove: (id: string) => void;
}

export default function FloatingStatsManager({
  changes,
  onRemove,
}: FloatingStatsManagerProps) {
  const [statCardPositions, setStatCardPositions] = useState<
    Record<string, { top: number; left: number }>
  >({});

  const getStatCardPosition = (stat: string) => {
    const statOrder = ["gpa", "money", "stress", "social"];
    const index = statOrder.indexOf(stat);

    if (index === -1) return { top: 0, left: 0 };

    const statCards = document.querySelectorAll("[data-stat-card]");
    if (statCards.length > index) {
      const card = statCards[index] as HTMLElement;
      const rect = card.getBoundingClientRect();
      return {
        top: rect.top - 60,
        left: rect.left + rect.width / 2,
      };
    }

    return statCardPositions[stat] || { top: 0, left: 0 };
  };

  useEffect(() => {
    const updatePositions = () => {
      const statOrder = ["gpa", "money", "stress", "social"];
      const positions: Record<string, { top: number; left: number }> = {};

      statOrder.forEach((stat, index) => {
        const statCards = document.querySelectorAll("[data-stat-card]");
        if (statCards.length > index) {
          const card = statCards[index] as HTMLElement;
          const rect = card.getBoundingClientRect();
          positions[stat] = {
            top: rect.top - 60,
            left: rect.left + rect.width / 2,
          };
        }
      });

      setStatCardPositions(positions);
    };

    updatePositions();
    window.addEventListener("scroll", updatePositions);
    window.addEventListener("resize", updatePositions);

    return () => {
      window.removeEventListener("scroll", updatePositions);
      window.removeEventListener("resize", updatePositions);
    };
  }, [changes]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <AnimatePresence>
        {changes.map((change) => {
          const position = getStatCardPosition(change.stat);
          return (
            <FloatingStatChange
              key={change.id}
              change={change.change}
              icon={change.icon}
              color={change.color}
              onComplete={() => onRemove(change.id)}
              position={position}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function FloatingStatChange({
  change,
  icon,
  color,
  onComplete,
  position,
}: {
  change: number;
  icon: string;
  color: string;
  onComplete: () => void;
  position: { top: number; left: number };
}) {
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
          className={`${color} text-white px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md border border-white/20 pointer-events-auto absolute`}
          style={{
            top: position.top,
            left: position.left,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.8 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          <div className="flex items-center space-x-1">
            <span className="text-lg">{icon}</span>
            <span className="font-bold text-sm">
              {change > 0 ? "+" : ""}
              {change}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
