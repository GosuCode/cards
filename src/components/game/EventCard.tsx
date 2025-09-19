"use client";

import { motion } from "framer-motion";
import { EventCard as EventCardType, PlayerStats } from "@/types";
import { checkCardRequirement, getEventCardStyle } from "@/utils";
import { useState } from "react";

interface EventCardProps {
  eventCard: EventCardType;
  stats: PlayerStats;
  onClick?: () => void;
}

export default function EventCard({
  eventCard,
  stats,
  onClick,
}: EventCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const requirementCheck = checkCardRequirement(eventCard, stats);
  const canPlay = requirementCheck.canPlay;
  const lockReason = requirementCheck.reason;

  const eventStyle = getEventCardStyle(eventCard);

  const getStatEffects = () => {
    const mockStats = { gpa: 0, money: 0, stress: 0, social: 0 };
    const newStats = eventCard.effect(mockStats);

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
        relative w-64 h-80 rounded-2xl p-4 cursor-pointer
        backdrop-blur-sm border ${eventStyle.border}
        ${eventStyle.bg} ${eventStyle.glow}
        ${eventStyle.pulse}
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-out
        group overflow-hidden
        flex flex-col
        ${!canPlay ? "opacity-50 grayscale" : ""}
        ${!canPlay ? "cursor-not-allowed" : ""}
        border-2 border-dashed
      `}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={
        canPlay
          ? {
              scale: 1.02,
              y: -4,
              transition: { duration: 0.2, ease: "easeOut" },
            }
          : {}
      }
      whileTap={canPlay ? { scale: 0.98 } : {}}
      onClick={canPlay ? onClick : undefined}
      onMouseEnter={() => !canPlay && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      layout
    >
      {/* Event indicator overlay */}
      <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-bold">
        EVENT
      </div>

      {/* Rarity indicator */}
      {eventCard.rarity && eventCard.rarity !== "common" && (
        <div
          className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full font-bold ${
            eventCard.rarity === "uncommon"
              ? "bg-blue-500 text-white"
              : eventCard.rarity === "rare"
              ? "bg-purple-500 text-white"
              : eventCard.rarity === "legendary"
              ? "bg-yellow-500 text-black"
              : ""
          }`}
        >
          {eventCard.rarity.toUpperCase()}
        </div>
      )}

      {/* Accent hover overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      {/* Event header */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <div className="text-3xl">{eventStyle.icon}</div>
        <div className="flex items-center gap-2">
          {!canPlay && (
            <div className="text-red-500 text-lg" title="Event locked">
              🔒
            </div>
          )}
          <div
            className={`px-3 py-0.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold shadow-md`}
          >
            {eventCard.eventType.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Lock tooltip */}
      {showTooltip && !canPlay && lockReason && (
        <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-xs p-2 rounded-t-2xl z-20">
          {lockReason}
        </div>
      )}

      {/* Event content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-2 text-gray-900 leading-tight">
          {eventCard.name}
        </h3>
        <p className="text-sm text-gray-700 leading-snug mb-3 flex-1">
          {eventCard.description}
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
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    effect.isPositive
                      ? "bg-green-100 text-green-800"
                      : effect.isNegative
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {effect.stat} {effect.value}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Hidden message */}
        {eventCard.hiddenMessage && (
          <div className="text-xs text-gray-500 italic mb-2">
            💡 {eventCard.hiddenMessage}
          </div>
        )}

        {/* Event type indicator */}
        <div className="text-xs text-gray-500 text-center">
          {eventCard.category.toUpperCase()} EVENT
        </div>
      </div>
    </motion.div>
  );
}
