import { create } from 'zustand';
import { CardDefinition, applyCardEffect, createRandomDeck } from '@/lib/cards';

export interface PlayerStats {
    gpa: number;
    money: number;
    stress: number;
    social: number;
}

export interface Card {
    id: string;
    name: string;
    description: string;
    type: 'study' | 'life' | 'money' | 'chaos';
}

export interface GameLog {
    id: string;
    message: string;
    timestamp: Date;
}

export interface GameState {
    stats: PlayerStats;
    deck: CardDefinition[];
    hand: CardDefinition[];
    discardPile: CardDefinition[];
    gameLog: GameLog[];
    // Game actions
    drawCards: (count?: number) => void;
    playCard: (cardId: string) => void;
    initializeGame: () => void;
    addToLog: (message: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    stats: {
        gpa: 50,
        money: 50,
        stress: 50,
        social: 50,
    },
    deck: [],
    hand: [],
    discardPile: [],
    gameLog: [],

    initializeGame: () => {
        const deck = createRandomDeck();
        set({ deck, hand: [], discardPile: [], gameLog: [] });
    },

    drawCards: (count = 5) => {
        const { deck, hand } = get();
        const cardsToDraw = deck.slice(0, count);
        const remainingDeck = deck.slice(count);

        set({
            deck: remainingDeck,
            hand: [...hand, ...cardsToDraw]
        });
    },

    playCard: (cardId: string) => {
        const { hand, discardPile, stats, deck } = get();
        const cardIndex = hand.findIndex(card => card.id === cardId);

        if (cardIndex === -1) return;

        const card = hand[cardIndex];
        const newHand = hand.filter((_, index) => index !== cardIndex);
        const newStats = applyCardEffect(stats, card.effect);

        const newDiscardPile = [...discardPile, card];

        const logMessage = `Played "${card.name}" - ${Object.entries(card.effect)
            .map(([key, value]) => `${key.toUpperCase()} ${value > 0 ? '+' : ''}${value}`)
            .join(', ')}`;

        const newLog = [
            ...get().gameLog,
            {
                id: Date.now().toString(),
                message: logMessage,
                timestamp: new Date()
            }
        ];

        set({
            hand: newHand,
            discardPile: newDiscardPile,
            stats: newStats,
            gameLog: newLog
        });

        // TODO: Implement deck reshuffle when deck is empty
        if (deck.length === 0) {
            const shuffledDiscard = [...discardPile].sort(() => Math.random() - 0.5);
            set({ deck: shuffledDiscard, discardPile: [] });
        }
    },

    // Add message to game log
    addToLog: (message: string) => {
        const newLog = [
            ...get().gameLog,
            {
                id: Date.now().toString(),
                message,
                timestamp: new Date()
            }
        ];
        set({ gameLog: newLog });
    }
}));
