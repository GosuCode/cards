"use client";

import { motion } from "framer-motion";
import Card from "./Card";
import { CardDefinition } from "@/lib/cards";

interface CardHandProps {
  cards: CardDefinition[];
  onCardClick?: (card: CardDefinition) => void;
}

export default function CardHand({ cards, onCardClick }: CardHandProps) {
  return (
    <div className="flex flex-wrap gap-6 justify-center p-4">
      {cards.length === 0 ? (
        <div className="text-center py-16 w-full">
          <div className="text-6xl mb-4 opacity-50">🎴</div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">
            No Cards in Hand
          </h3>
          <p className="text-gray-400 text-lg">
            Draw some cards to start your college journey!
          </p>
        </div>
      ) : (
        cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
            }}
          >
            <Card card={card} onClick={() => onCardClick?.(card)} />
          </motion.div>
        ))
      )}
    </div>
  );
}
