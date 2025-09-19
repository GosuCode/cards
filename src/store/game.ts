import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PlayerStats, Chapter, GameState } from '@/types';
import { INITIAL_STATS, GAME_CONFIG } from '@/constants';

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            stats: INITIAL_STATS,
            currentChapterIndex: 0,
            completedCards: [],
            storyLog: [],
            isGameComplete: false,

            completeCard: (cardId: string, chapters: Chapter[]) => {
                const state = get();
                const currentChapter = chapters[state.currentChapterIndex];
                const card = currentChapter?.cards.find(c => c.id === cardId);

                if (!card || state.completedCards.includes(cardId)) return;

                const newStats = card.effect(state.stats);
                const statChanges = Object.keys(newStats).reduce((acc, key) => {
                    const statKey = key as keyof PlayerStats;
                    const oldValue = state.stats[statKey];
                    const newValue = newStats[statKey];
                    const change = newValue - oldValue;
                    if (change !== 0) {
                        acc[statKey] = change;
                    }
                    return acc;
                }, {} as Partial<PlayerStats>);

                set((state) => ({
                    stats: newStats,
                    completedCards: [...state.completedCards, cardId],
                    storyLog: [
                        ...state.storyLog,
                        {
                            id: `log-${Date.now()}`,
                            message: `You chose "${card.name}": ${Object.entries(statChanges)
                                .map(([stat, value]) => `${stat.toUpperCase()} ${value! > 0 ? '+' : ''}${value}`)
                                .join(', ')}`,
                            timestamp: Date.now(),
                        },
                    ].slice(-GAME_CONFIG.MAX_STORY_LOG_ITEMS),
                }));

                const allCardsCompleted = currentChapter.cards.every(c =>
                    [...state.completedCards, cardId].includes(c.id)
                );

                if (allCardsCompleted) {
                    set((state) => ({
                        currentChapterIndex: state.currentChapterIndex + 1,
                        completedCards: [],
                    }));

                    if (state.currentChapterIndex + 1 >= chapters.length) {
                        set({ isGameComplete: true });
                    }
                }
            },

            resetGame: () => {
                set({
                    stats: INITIAL_STATS,
                    currentChapterIndex: 0,
                    completedCards: [],
                    storyLog: [],
                    isGameComplete: false,
                });
            },
        }),
        {
            name: GAME_CONFIG.STORAGE_KEY,
        }
    )
);
