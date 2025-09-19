export const INITIAL_STATS = {
    gpa: 50,
    money: 50,
    stress: 50,
    social: 50,
} as const;

export const STAT_LIMITS = {
    MIN: 0,
    MAX: 100,
} as const;

export const CARD_TYPES = {
    STUDY: 'study',
    LIFE: 'life',
    MONEY: 'money',
    CHAOS: 'chaos',
} as const;

export const GAME_CONFIG = {
    STORAGE_KEY: 'bachelors-battleground-game',
    MAX_STORY_LOG_ITEMS: 10,
} as const;
