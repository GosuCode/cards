import { PlayerStats, Card, EventCard } from '@/types';
import { STAT_LIMITS } from '@/constants';

export const clampStats = (stats: PlayerStats): PlayerStats => ({
    gpa: Math.max(STAT_LIMITS.MIN, Math.min(STAT_LIMITS.MAX, stats.gpa)),
    money: Math.max(STAT_LIMITS.MIN, Math.min(STAT_LIMITS.MAX, stats.money)),
    stress: Math.max(STAT_LIMITS.MIN, Math.min(STAT_LIMITS.MAX, stats.stress)),
    social: Math.max(STAT_LIMITS.MIN, Math.min(STAT_LIMITS.MAX, stats.social)),
});

export const createEffect = (changes: Partial<PlayerStats>) =>
    (stats: PlayerStats): PlayerStats =>
        clampStats({
            gpa: stats.gpa + (changes.gpa || 0),
            money: stats.money + (changes.money || 0),
            stress: stats.stress + (changes.stress || 0),
            social: stats.social + (changes.social || 0),
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

export const checkCardRequirement = (card: Card | EventCard, stats: PlayerStats): { canPlay: boolean; reason?: string } => {
    if (!card.requires) {
        return { canPlay: true };
    }

    if (typeof card.requires === 'function') {
        const canPlay = card.requires(stats);
        return {
            canPlay,
            reason: canPlay ? undefined : card.lockReason || "Requirements not met"
        };
    }

    const meetsRequirements = Object.entries(card.requires).every(
        ([stat, requiredValue]) => {
            const currentValue = stats[stat as keyof PlayerStats];
            return currentValue >= requiredValue!;
        }
    );

    if (!meetsRequirements) {
        const missingRequirements = Object.entries(card.requires)
            .filter(([stat, requiredValue]) => {
                const currentValue = stats[stat as keyof PlayerStats];
                return currentValue < requiredValue!;
            })
            .map(([stat, requiredValue]) => `${stat.toUpperCase()}: ${stats[stat as keyof PlayerStats]}/${requiredValue}`)
            .join(', ');

        return {
            canPlay: false,
            reason: card.lockReason || `Missing requirements: ${missingRequirements}`
        };
    }

    return { canPlay: true };
};

export const filterAvailableCards = (cards: (Card | EventCard)[], stats: PlayerStats): (Card | EventCard)[] => {
    return cards.filter(card => checkCardRequirement(card, stats).canPlay);
};

export const getCardImportanceStyle = (importance?: Card['importance']) => {
    switch (importance) {
        case 'important':
            return {
                glow: 'shadow-lg shadow-yellow-400/30',
                border: 'border-yellow-400',
                pulse: 'animate-pulse'
            };
        case 'critical':
            return {
                glow: 'shadow-xl shadow-red-400/40',
                border: 'border-red-400',
                pulse: 'animate-pulse'
            };
        default:
            return {
                glow: '',
                border: '',
                pulse: ''
            };
    }
};

// Event card utilities
export const createEventCard = (
    id: string,
    name: string,
    description: string,
    category: EventCard['category'],
    eventType: EventCard['eventType'],
    effect: Parameters<typeof createEffect>[0],
    options: Partial<EventCard> = {}
): EventCard => ({
    id,
    name,
    description,
    category,
    eventType,
    effect: createEffect(effect),
    isEvent: true,
    rarity: 'common',
    ...options,
});

export const getEventCardStyle = (eventCard: EventCard) => {
    const baseStyle = {
        glow: '',
        border: '',
        pulse: '',
        bg: '',
        icon: '',
    };

    switch (eventCard.category) {
        case 'life':
            baseStyle.bg = 'bg-gradient-to-br from-emerald-50 to-green-100';
            baseStyle.border = 'border-emerald-300';
            baseStyle.icon = '🌟';
            break;
        case 'chaos':
            baseStyle.bg = 'bg-gradient-to-br from-red-50 to-rose-100';
            baseStyle.border = 'border-red-300';
            baseStyle.icon = '⚡';
            break;
        case 'money':
            baseStyle.bg = 'bg-gradient-to-br from-amber-50 to-yellow-100';
            baseStyle.border = 'border-amber-300';
            baseStyle.icon = '💰';
            break;
        case 'academic':
            baseStyle.bg = 'bg-gradient-to-br from-blue-50 to-cyan-100';
            baseStyle.border = 'border-blue-300';
            baseStyle.icon = '🎓';
            break;
    }

    switch (eventCard.rarity) {
        case 'uncommon':
            baseStyle.glow = 'shadow-lg shadow-blue-400/30';
            break;
        case 'rare':
            baseStyle.glow = 'shadow-xl shadow-purple-400/40';
            baseStyle.pulse = 'animate-pulse';
            break;
        case 'legendary':
            baseStyle.glow = 'shadow-2xl shadow-yellow-400/50';
            baseStyle.pulse = 'animate-pulse';
            baseStyle.border = 'border-yellow-400';
            break;
    }

    return baseStyle;
};

export const isEventCard = (card: Card | EventCard): card is EventCard => {
    return 'isEvent' in card && card.isEvent === true;
};
