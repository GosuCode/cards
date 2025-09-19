"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card as CardType, PlayerStats } from "@/types";
import { HiddenCardMessage } from "@/components/ui";

interface EnhancedCardProps {
  card: CardType;
  onClick?: () => void;
  stats: PlayerStats;
}

export default function EnhancedCard({
  card,
  onClick,
  stats,
}: EnhancedCardProps) {
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);

  const getCardTheme = (type: string) => {
    switch (type) {
      case "study":
        return {
          bg: "bg-gradient-to-br from-blue-50 to-cyan-100",
          border: "border-blue-300",
          accent: "from-blue-500 to-cyan-500",
          icon: "🎓",
          glow: "shadow-blue-300/40",
        };
      case "life":
        return {
          bg: "bg-gradient-to-br from-emerald-50 to-green-100",
          border: "border-emerald-300",
          accent: "from-emerald-500 to-green-500",
          icon: "🌟",
          glow: "shadow-emerald-300/40",
        };
      case "money":
        return {
          bg: "bg-gradient-to-br from-amber-50 to-yellow-100",
          border: "border-amber-300",
          accent: "from-amber-500 to-yellow-500",
          icon: "💰",
          glow: "shadow-amber-300/40",
        };
      case "chaos":
        return {
          bg: "bg-gradient-to-br from-rose-50 to-pink-100",
          border: "border-rose-300",
          accent: "from-rose-500 to-pink-500",
          icon: "⚡",
          glow: "shadow-rose-300/40",
        };
      default:
        return {
          bg: "bg-gradient-to-br from-slate-50 to-gray-100",
          border: "border-slate-300",
          accent: "from-gray-500 to-slate-500",
          icon: "❓",
          glow: "shadow-slate-300/40",
        };
    }
  };

  const theme = getCardTheme(card.type);

  const getStatEffects = () => {
    const mockStats = { gpa: 0, money: 0, stress: 0, social: 0 };
    const newStats = card.effect(mockStats);

    return Object.entries(newStats)
      .map(([stat, value]) => ({
        stat: stat.toUpperCase(),
        value: value > 0 ? `+${value}` : value.toString(),
        isPositive: value > 0,
        isNegative: value < 0,
      }))
      .filter((effect) => effect.value !== "0");
  };

  const statEffects = getStatEffects();

  // Check if card requirements are met
  const meetsRequirements = card.requires
    ? Object.entries(card.requires).every(([stat, requiredValue]) => {
        const currentValue = stats[stat as keyof PlayerStats];
        return currentValue >= requiredValue!;
      })
    : true;

  const isLocked = !meetsRequirements;

  const handleClick = () => {
    if (isLocked && card.hiddenMessage) {
      setShowHiddenMessage(true);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <motion.div
        className={`
          relative w-56 h-72 rounded-2xl p-4 cursor-pointer
          backdrop-blur-sm border ${theme.border}
          ${theme.bg} ${theme.glow}
          shadow-lg hover:shadow-xl
          transition-all duration-300 ease-out
          group overflow-hidden
          flex flex-col
          ${isLocked ? "opacity-60 grayscale" : ""}
        `}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{
          scale: isLocked ? 1.02 : 1.08,
          y: isLocked ? -2 : -8,
          rotateY: isLocked ? 0 : 5,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        whileTap={{
          scale: 0.95,
          y: -2,
          transition: { duration: 0.1 },
        }}
        onClick={handleClick}
        layout
        transition={{
          layout: { duration: 0.3, ease: "easeInOut" },
        }}
      >
        {/* Lock overlay for locked cards */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center z-20">
            <motion.div
              className="text-4xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🔒
            </motion.div>
          </div>
        )}

        {/* Accent hover overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${theme.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />

        {/* Card header */}
        <div className="relative z-10 flex items-center justify-between mb-3">
          <div className="text-2xl">{theme.icon}</div>
          <div
            className={`px-3 py-0.5 rounded-full bg-gradient-to-r ${theme.accent} text-white text-xs font-semibold shadow-md`}
          >
            {card.type.toUpperCase()}
          </div>
        </div>

        {/* Card content */}
        <motion.div
          className="relative z-10 flex-1 flex flex-col"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="font-bold text-lg mb-2 text-gray-900 leading-tight">
            {card.name}
          </h3>
          <p className="text-sm text-gray-700 leading-snug mb-3 flex-1">
            {card.description}
          </p>

          {/* Stat effects */}
          {statEffects.length > 0 && (
            <div className="mb-3">
              <div className="text-xs font-semibold text-gray-600 mb-1">
                Effects:
              </div>
              <div className="flex flex-wrap gap-1">
                {statEffects.map((effect, index) => (
                  <span
                    key={index}
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      effect.isPositive
                        ? "bg-green-100 text-green-700"
                        : effect.isNegative
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {effect.stat} {effect.value}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Requirements display for locked cards */}
          {isLocked && card.requires && (
            <div className="mb-3">
              <div className="text-xs font-semibold text-gray-600 mb-1">
                Requirements:
              </div>
              <div className="space-y-1">
                {Object.entries(card.requires).map(([stat, value]) => (
                  <div key={stat} className="text-xs text-gray-500">
                    {stat.toUpperCase()}: {value}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Play button */}
        <motion.div
          className="relative z-10 mt-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.1 }}
        >
          <motion.div
            className={`
            w-full py-2 px-3 rounded-xl text-center
            bg-gradient-to-r ${theme.accent} text-white
            text-sm font-semibold shadow-md
            hover:shadow-lg hover:brightness-110 transition-all duration-200
            ${isLocked ? "opacity-50" : ""}
          `}
            whileHover={{
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              y: -1,
            }}
          >
            {isLocked ? "Locked" : "Play Card"}
          </motion.div>
        </motion.div>

        {/* Hover glow overlay */}
        <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Hidden message modal */}
      <HiddenCardMessage
        card={card}
        isVisible={showHiddenMessage}
        onClose={() => setShowHiddenMessage(false)}
      />
    </>
  );
}
