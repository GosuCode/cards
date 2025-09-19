"use client";

import { motion } from "framer-motion";
import Card from "./Card";
import { Card as CardType } from "@/types";

interface CardHandProps {
  cards: CardType[];
  onCardClick?: (card: CardType) => void;
}

export default function CardHand({ cards, onCardClick }: CardHandProps) {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.length === 0 ? (
        <motion.div
          className="text-center py-16 w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4 opacity-50">✅</div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">
            All Choices Made
          </h3>
          <p className="text-gray-400 text-lg">
            You&apos;ve completed all available choices for this chapter!
          </p>
        </motion.div>
      ) : (
        cards.map((card) => (
          <motion.div key={card.id} variants={cardVariants} layout>
            <Card card={card} onClick={() => onCardClick?.(card)} />
          </motion.div>
        ))
      )}
    </motion.div>
  );
}
