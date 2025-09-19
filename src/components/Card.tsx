"use client";

import { motion } from "framer-motion";
import { CardDefinition } from "@/lib/cards";

interface CardProps {
  card: CardDefinition;
  onClick?: () => void;
}

export default function Card({ card, onClick }: CardProps) {
  const getCardTheme = (type: string) => {
    switch (type) {
      case "study":
        return {
          bg: "bg-gradient-to-br from-blue-500/10 to-cyan-500/20",
          border: "border-blue-400/30",
          accent: "from-blue-500 to-cyan-500",
          icon: "🎓",
          glow: "shadow-blue-500/20",
        };
      case "life":
        return {
          bg: "bg-gradient-to-br from-emerald-500/10 to-green-500/20",
          border: "border-emerald-400/30",
          accent: "from-emerald-500 to-green-500",
          icon: "🌟",
          glow: "shadow-emerald-500/20",
        };
      case "money":
        return {
          bg: "bg-gradient-to-br from-amber-500/10 to-yellow-500/20",
          border: "border-amber-400/30",
          accent: "from-amber-500 to-yellow-500",
          icon: "💰",
          glow: "shadow-amber-500/20",
        };
      case "chaos":
        return {
          bg: "bg-gradient-to-br from-red-500/10 to-pink-500/20",
          border: "border-red-400/30",
          accent: "from-red-500 to-pink-500",
          icon: "⚡",
          glow: "shadow-red-500/20",
        };
      default:
        return {
          bg: "bg-gradient-to-br from-gray-500/10 to-slate-500/20",
          border: "border-gray-400/30",
          accent: "from-gray-500 to-slate-500",
          icon: "❓",
          glow: "shadow-gray-500/20",
        };
    }
  };

  const theme = getCardTheme(card.type);

  return (
    <motion.div
      className={`
        relative w-36 h-48 rounded-2xl p-4 cursor-pointer
        backdrop-blur-sm border ${theme.border}
        ${theme.bg} ${theme.glow}
        shadow-xl hover:shadow-2xl
        transition-all duration-300 ease-out
        group overflow-hidden
      `}
      whileHover={{
        scale: 1.05,
        y: -8,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      {/* Animated background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${theme.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      {/* Card header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <div className="text-2xl">{theme.icon}</div>
        <div
          className={`px-3 py-1 rounded-full bg-gradient-to-r ${theme.accent} text-white text-xs font-semibold shadow-lg`}
        >
          {card.type.toUpperCase()}
        </div>
      </div>

      {/* Card content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <h3 className="font-bold text-lg mb-2 text-gray-800 leading-tight">
          {card.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          {card.description}
        </p>

        {/* Card effects preview */}
        <div className="text-xs text-gray-500 space-y-1">
          {Object.entries(card.effect).map(([key, value]) => {
            const numValue = value as number;
            return (
              <div key={key} className="flex justify-between">
                <span className="capitalize">{key}:</span>
                <span
                  className={`font-semibold ${
                    numValue > 0
                      ? "text-green-600"
                      : numValue < 0
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {numValue > 0 ? "+" : ""}
                  {numValue}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Play button */}
      <div className="relative z-10 mt-4">
        <div
          className={`
          w-full py-2 px-4 rounded-xl text-center
          bg-gradient-to-r ${theme.accent} text-white
          text-sm font-semibold shadow-lg
          group-hover:shadow-xl transition-all duration-200
        `}
        >
          Play Card
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
