"use client";

import { motion } from "framer-motion";
import { Card as CardType } from "@/types";

interface CardProps {
  card: CardType;
  onClick?: () => void;
}

export default function Card({ card, onClick }: CardProps) {
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

  return (
    <motion.div
      className={`
        relative w-56 h-72 rounded-2xl p-4 cursor-pointer
        backdrop-blur-sm border ${theme.border}
        ${theme.bg} ${theme.glow}
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-out
        group overflow-hidden
        flex flex-col
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        y: -6,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      layout
    >
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
      <div className="relative z-10 flex-1 flex flex-col">
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
      </div>

      {/* Play button */}
      <div className="relative z-10 mt-auto">
        <div
          className={`
          w-full py-2 px-3 rounded-xl text-center
          bg-gradient-to-r ${theme.accent} text-white
          text-sm font-semibold shadow-md
          hover:shadow-lg hover:brightness-110 transition-all duration-200
        `}
        >
          Play Card
        </div>
      </div>

      {/* Hover glow overlay */}
      <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
