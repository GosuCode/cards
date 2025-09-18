"use client";

import Card from "./Card";
import { Card as CardType } from "@/store/game";

interface CardHandProps {
  cards: CardType[];
  onCardClick?: (card: CardType) => void;
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
          <div
            key={card.id}
            className="transform transition-all duration-300 hover:scale-105"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <Card card={card} onClick={() => onCardClick?.(card)} />
          </div>
        ))
      )}
    </div>
  );
}
