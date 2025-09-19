import { Card, PlayerStats } from '@/store/game';

export interface CardEffect {
    gpa?: number;
    money?: number;
    stress?: number;
    social?: number;
}

export interface CardDefinition extends Card {
    effect: CardEffect;
    cost?: number; // TODO: Add energy system later
}

export const starterCards: CardDefinition[] = [
    {
        id: 'tu-syllabus-mugging',
        name: 'TU Syllabus Mugging',
        description: 'Pull an all-nighter studying the entire TU syllabus. Academic gains but mental exhaustion.',
        type: 'study',
        effect: { gpa: 10, stress: 5 }
    },
    {
        id: 'last-night-exam',
        name: 'Last Night Before Exam',
        description: 'Desperate cramming session. High risk, high reward for GPA.',
        type: 'study',
        effect: { gpa: 15, stress: 20 }
    },
    {
        id: 'momo-cafe-hangout',
        name: 'Mo:Mo Cafe Hangout',
        description: 'Chill with friends at the local momo joint. Good for social life and stress relief.',
        type: 'life',
        effect: { social: 10, stress: -5 }
    },
    {
        id: 'part-time-teaching',
        name: 'Part-time Teaching',
        description: 'Teach juniors to earn some cash. Good money but adds stress.',
        type: 'money',
        effect: { money: 20, stress: 5 }
    },
    {
        id: 'dashain-vacation',
        name: 'Dashain Vacation',
        description: 'Go home for Dashain festival. Great for social life but academic setback.',
        type: 'life',
        effect: { social: 15, gpa: -5 }
    },
    {
        id: 'chaos-exam-reschedule',
        name: 'Exam Reschedule Chaos',
        description: 'University suddenly reschedules exams. Everything goes wrong.',
        type: 'chaos',
        effect: { stress: 15, gpa: -5, money: -10 }
    },
    {
        id: 'library-study-group',
        name: 'Library Study Group',
        description: 'Form a study group at the library. Collaborative learning benefits.',
        type: 'study',
        effect: { gpa: 8, social: 5, stress: -3 }
    },
    {
        id: 'internet-cafe-gaming',
        name: 'Internet Cafe Gaming',
        description: 'Spend time gaming at the local internet cafe. Fun but expensive.',
        type: 'chaos',
        effect: { social: 8, money: -15, stress: -5 }
    }
];

export const createRandomDeck = (): CardDefinition[] => {
    const deck: CardDefinition[] = [];

    starterCards.forEach(card => {
        deck.push({ ...card, id: `${card.id}-1` });
        deck.push({ ...card, id: `${card.id}-2` });
    });

    // Shuffle the deck
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
};

export const applyCardEffect = (stats: PlayerStats, effect: CardEffect) => {
    const newStats = { ...stats };

    (Object.keys(effect) as Array<keyof PlayerStats>).forEach((key) => {
        const value = effect[key];
        if (value !== undefined) {
            newStats[key] = Math.max(0, Math.min(100, newStats[key] + value));
        }
    });

    return newStats;
};

export const getEffectDescription = (effect: CardEffect): string => {
    const effects: string[] = [];

    if (effect.gpa) {
        effects.push(`GPA ${effect.gpa > 0 ? '+' : ''}${effect.gpa}`);
    }
    if (effect.money) {
        effects.push(`Money ${effect.money > 0 ? '+' : ''}${effect.money}`);
    }
    if (effect.stress) {
        effects.push(`Stress ${effect.stress > 0 ? '+' : ''}${effect.stress}`);
    }
    if (effect.social) {
        effects.push(`Social ${effect.social > 0 ? '+' : ''}${effect.social}`);
    }

    return effects.join(', ');
};
