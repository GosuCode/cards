import { Chapter } from '@/types';
import { createEffect } from '@/utils';

export const chapters: Chapter[] = [
    {
        id: 'chapter-1',
        title: 'First Day of College',
        description: 'Welcome to your college journey! Time to make some important decisions that will shape your academic career.',
        cards: [
            {
                id: 'card-1-1',
                name: 'Attend Orientation',
                description: 'Go to the orientation session to learn about campus life and meet new people.',
                type: 'study',
                effect: createEffect({ gpa: 5, social: 10, stress: -5 }),
            },
            {
                id: 'card-1-2',
                name: 'Skip Orientation',
                description: 'Skip the boring orientation and explore campus on your own.',
                type: 'life',
                effect: createEffect({ social: 5, stress: -10, gpa: -2 }),
            },
            {
                id: 'card-1-3',
                name: 'Join Study Group',
                description: 'Find a study group to get ahead academically and make friends.',
                type: 'study',
                effect: createEffect({ gpa: 8, social: 5, stress: 3 }),
            },
            {
                id: 'card-1-4',
                name: 'Get a Part-time Job',
                description: 'Start working to earn some money for expenses.',
                type: 'money',
                effect: createEffect({ money: 15, stress: 8, social: 3 }),
            },
        ],
    },
    {
        id: 'chapter-2',
        title: 'Midterm Madness',
        description: 'Midterms are approaching! How will you handle the pressure and prepare for your first major exams?',
        cards: [
            {
                id: 'card-2-1',
                name: 'Study All Night',
                description: 'Pull an all-nighter to prepare for exams, sacrificing sleep for grades.',
                type: 'study',
                effect: createEffect({ gpa: 10, stress: 15, social: -5 }),
            },
            {
                id: 'card-2-2',
                name: 'Study with Friends',
                description: 'Form a study group with classmates to prepare together.',
                type: 'study',
                effect: createEffect({ gpa: 7, social: 8, stress: 5 }),
            },
            {
                id: 'card-2-3',
                name: 'Take a Break',
                description: 'Relax and trust your preparation - mental health matters too.',
                type: 'life',
                effect: createEffect({ stress: -10, social: 3, gpa: -3 }),
            },
            {
                id: 'card-2-4',
                name: 'Hire a Tutor',
                description: 'Invest in extra help to ensure you do well on exams.',
                type: 'money',
                effect: createEffect({ gpa: 12, money: -20, stress: -2 }),
            },
        ],
    },
    // To add new chapters
    // {
    //   id: 'chapter-3',
    //   title: 'Social Life Balance',
    //   description: 'College is about more than just academics. How will you balance your social life?',
    //   cards: [
    //     // Add more cards here
    //   ],
    // },
];

export const TOTAL_CHAPTERS = chapters.length;
