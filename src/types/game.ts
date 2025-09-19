export interface PlayerStats {
    gpa: number;
    money: number;
    stress: number;
    social: number;
}

export interface CardEffect {
    (stats: PlayerStats): PlayerStats;
}

export interface CardRequirement {
    (stats: PlayerStats): boolean;
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
    requires?: Partial<PlayerStats> | CardRequirement;
    hiddenMessage?: string;
    importance?: 'normal' | 'important' | 'critical';
    lockReason?: string;
}

export interface EventCard {
    id: string;
    name: string;
    description: string;
    category: 'life' | 'chaos' | 'money' | 'academic';
    effect: CardEffect;
    nextChapterId?: string;
    nextMonth?: number;
    nextSemester?: number;
    requires?: Partial<PlayerStats> | CardRequirement;
    hiddenMessage?: string;
    importance?: 'normal' | 'important' | 'critical';
    lockReason?: string;
    isEvent: true;
    eventType: 'festival' | 'crisis' | 'opportunity' | 'social' | 'academic' | 'financial';
    rarity?: 'common' | 'uncommon' | 'rare' | 'legendary';
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
    events?: EventCard[]; // Optional events for this month
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

export interface ExamResult {
    semester: number;
    finalStats: PlayerStats;
    averageGPA: number;
    stressPenalty: number;
    finalGPA: number;
    passed: boolean;
    performance: 'excellent' | 'good' | 'average' | 'poor' | 'failed';
    flavorText: string;
    timestamp: number;
}

export interface GameState {
    stats: PlayerStats;
    currentSemester: number;
    currentMonth: number;
    completedCards: string[];
    storyLog: StoryLog[];
    isGameComplete: boolean;
    examResults: ExamResult[];
    showExamModal: boolean;
    pendingExamResult: ExamResult | null;
    completeCard: (cardId: string, semesters: Semester[]) => void;
    advanceMonth: () => void;
    advanceSemester: () => void;
    resetGame: () => void;
    triggerExam: () => void;
    completeExam: () => void;
}
