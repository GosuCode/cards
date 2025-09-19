import { PlayerStats } from '@/types';
import { STAT_LIMITS } from '@/constants';

// clamp stats between 0 and 100
export const clampStats = (stats: PlayerStats): PlayerStats => ({
    gpa: Math.max(STAT_LIMITS.MIN, Math.min(STAT_LIMITS.MAX, stats.gpa)),
    money: Math.max(STAT_LIMITS.MIN, Math.min(STAT_LIMITS.MAX, stats.money)),
    stress: Math.max(STAT_LIMITS.MIN, Math.min(STAT_LIMITS.MAX, stats.stress)),
    social: Math.max(STAT_LIMITS.MIN, Math.min(STAT_LIMITS.MAX, stats.social)),
});

export const createEffect = (changes: Partial<PlayerStats>) =>
    (stats: PlayerStats): PlayerStats =>
        clampStats({
            ...stats,
            ...changes,
        });

export const calculateTotalStats = (stats: PlayerStats): number => {
    return stats.gpa + stats.money + stats.stress + stats.social;
};

export const calculateBalanceScore = (stats: PlayerStats): string => {
    const balance = Math.abs(stats.gpa - 50) +
        Math.abs(stats.money - 50) +
        Math.abs(stats.stress - 50) +
        Math.abs(stats.social - 50);

    return balance < 50 ? "Great!" : "Needs Work";
};
