export interface PlayerStats {
    gpa: number;
    money: number;
    stress: number;
    social: number;
}

export interface CardEffect {
    (stats: PlayerStats): PlayerStats;
}

export interface Card {
    id: string;
    name: string;
    description: string;
    type: 'study' | 'life' | 'money' | 'chaos';
    effect: CardEffect;
}

export interface Chapter {
    id: string;
    title: string;
    description: string;
    cards: Card[];
}

export interface StoryLog {
    id: string;
    message: string;
    timestamp: number;
}

export interface GameState {
    stats: PlayerStats;
    currentChapterIndex: number;
    completedCards: string[];
    storyLog: StoryLog[];
    isGameComplete: boolean;
    completeCard: (cardId: string, chapters: Chapter[]) => void;
    resetGame: () => void;
}
