import { create } from 'zustand';

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
    // TODO: Add card effects and costs
}

export interface GameState {
    stats: PlayerStats;
    deck: Card[];
    hand: Card[];
    discardPile: Card[];
    // TODO: Add turn management and game phases
}

export const useGameStore = create<GameState>((set) => ({
    stats: {
        gpa: 50,
        money: 50,
        stress: 50,
        social: 50,
    },
    deck: [],
    hand: [],
    discardPile: [],
}));
