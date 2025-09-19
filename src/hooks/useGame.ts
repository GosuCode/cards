import { useGameStore } from '@/store/game';

export const useGame = () => {
    const store = useGameStore();

    return {
        ...store,
        // Add any computed values or derived state here
        totalStats: store.stats.gpa + store.stats.money + store.stats.stress + store.stats.social,
        balanceScore: Math.abs(store.stats.gpa - 50) +
            Math.abs(store.stats.money - 50) +
            Math.abs(store.stats.stress - 50) +
            Math.abs(store.stats.social - 50) < 50 ? "Great!" : "Needs Work",
    };
};
