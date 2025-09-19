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
    nextChapterId?: string;
    nextMonth?: number;
    nextSemester?: number;
    requires?: Partial<PlayerStats>;
}

export interface Chapter {
    id: string;
    title: string;
    description: string;
    cards: Card[];
}

export interface Month {
    id: string;
    name: string;
    description: string;
    cards: Card[];
}

export interface Semester {
    id: string;
    number: number;
    title: string;
    description: string;
    months: Month[];
    examChapter?: Chapter;
}

export interface StoryLog {
    id: string;
    message: string;
    timestamp: number;
}

export interface GameState {
    stats: PlayerStats;
    currentSemester: number;
    currentMonth: number;
    completedCards: string[];
    storyLog: StoryLog[];
    isGameComplete: boolean;
    completeCard: (cardId: string, semesters: Semester[]) => void;
    advanceMonth: () => void;
    advanceSemester: () => void;
    resetGame: () => void;
}
