"use client";

import { motion } from "framer-motion";
import EnhancedCard from "./EnhancedCard";
import { Card as CardType, PlayerStats } from "@/types";

interface EnhancedCardHandProps {
  cards: CardType[];
  onCardClick?: (card: CardType) => void;
  stats: PlayerStats;
}

export default function EnhancedCardHand({
  cards,
  onCardClick,
  stats,
}: EnhancedCardHandProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.length === 0 ? (
        <motion.div
          className="text-center py-16 w-full col-span-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4 opacity-50">✅</div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">
            All Choices Made
          </h3>
          <p className="text-gray-400 text-lg">
            You&apos;ve completed all available choices for this month!
          </p>
        </motion.div>
      ) : (
        cards.map((card) => (
          <motion.div
            key={card.id}
            variants={cardVariants}
            layout
            className="w-full max-w-xs"
          >
            <EnhancedCard
              card={card}
              onClick={() => onCardClick?.(card)}
              stats={stats}
            />
          </motion.div>
        ))
      )}
    </motion.div>
  );
}
