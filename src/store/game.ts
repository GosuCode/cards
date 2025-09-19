import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PlayerStats, Semester, GameState } from '@/types';
import { INITIAL_STATS, GAME_CONFIG } from '@/constants';
import { isEventCard } from '@/utils';

const SEMESTER_CONFIG = {
    MONTHS_PER_SEMESTER: 6,
    TOTAL_SEMESTERS: 6,
} as const;

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            stats: INITIAL_STATS,
            currentSemester: 1,
            currentMonth: 1,
            completedCards: [],
            storyLog: [],
            isGameComplete: false,

            completeCard: (cardId: string, semesters: Semester[]) => {
                const state = get();
                // Get current semester and month data
                const currentSemesterData = semesters.find(sem => sem.number === state.currentSemester);
                const currentMonthData = currentSemesterData?.months[state.currentMonth - 1];

                // Check both regular cards and events
                const card = currentMonthData?.cards.find(c => c.id === cardId) ||
                    currentMonthData?.events?.find(e => e.id === cardId);

                if (!card || state.completedCards.includes(cardId)) return;

                // Check stat requirements
                if (card.requires) {
                    const meetsRequirements = Object.entries(card.requires).every(
                        ([stat, requiredValue]) => {
                            const currentValue = state.stats[stat as keyof PlayerStats];
                            return currentValue >= requiredValue!;
                        }
                    );
                    if (!meetsRequirements) return;
                }

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

                // Handle branching logic
                const newState: Partial<GameState> = {
                    stats: newStats,
                    completedCards: [...state.completedCards, cardId],
                    storyLog: [
                        ...state.storyLog,
                        {
                            id: `log-${Date.now()}`,
                            message: `Semester ${state.currentSemester}, Month ${state.currentMonth}: ${isEventCard(card) ? '🎭 EVENT' : '📚 CARD'} "${card.name}" - ${Object.entries(statChanges)
                                .map(([stat, value]) => `${stat.toUpperCase()} ${value! > 0 ? '+' : ''}${value}`)
                                .join(', ')}`,
                            timestamp: Date.now(),
                        },
                    ].slice(-GAME_CONFIG.MAX_STORY_LOG_ITEMS),
                };

                // Handle branching based on card properties
                if (card.nextMonth) {
                    newState.currentMonth = card.nextMonth;
                    newState.completedCards = [];
                }

                if (card.nextSemester) {
                    newState.currentSemester = card.nextSemester;
                    newState.currentMonth = 1;
                    newState.completedCards = [];
                }

                // TODO: Handle nextChapterId for more complex branching
                // This could trigger special events, unlock new card sets, etc.
                if (card.nextChapterId) {
                    // Future: Implement chapter-based branching
                    // Could unlock new card sets, trigger special events, etc.
                }

                set(newState);
            },

            advanceMonth: () => {
                set((state) => {
                    const newMonth = state.currentMonth + 1;

                    // Check if we need to advance to next semester
                    if (newMonth > SEMESTER_CONFIG.MONTHS_PER_SEMESTER) {
                        return {
                            currentMonth: 1,
                            currentSemester: state.currentSemester + 1,
                            completedCards: [],
                            // TODO: Add semester transition logic here
                            // - Check if BCA degree is complete
                            // - Apply semester-specific effects
                            // - Trigger semester events
                        };
                    }

                    return {
                        currentMonth: newMonth,
                        completedCards: [],
                        // TODO: Add month transition logic here
                        // - Apply monthly recurring effects
                        // - Check for month-specific events
                    };
                });

                // Check for game completion
                const state = get();
                if (state.currentSemester > SEMESTER_CONFIG.TOTAL_SEMESTERS) {
                    set({ isGameComplete: true });
                }
            },

            advanceSemester: () => {
                set((state) => ({
                    currentSemester: state.currentSemester + 1,
                    currentMonth: 1,
                    completedCards: [],
                    // TODO: Add semester advancement logic here
                    // - Apply semester-specific stat changes
                    // - Trigger semester events
                    // - Update available chapters/cards
                }));

                // Check for game completion
                const state = get();
                if (state.currentSemester > SEMESTER_CONFIG.TOTAL_SEMESTERS) {
                    set({ isGameComplete: true });
                }
            },

            resetGame: () => {
                set({
                    stats: INITIAL_STATS,
                    currentSemester: 1,
                    currentMonth: 1,
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
