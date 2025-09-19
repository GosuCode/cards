import { EventCard } from '@/types';
import { createEventCard } from '@/utils';

// Life Events - Social and personal development
export const lifeEvents: EventCard[] = [
    createEventCard(
        'event_life_001',
        'College Festival',
        'The annual college festival is here! Join the celebrations and make new friends.',
        'life',
        'festival',
        { social: 15, stress: -10, money: -5 },
        {
            importance: 'important',
            rarity: 'uncommon',
            hiddenMessage: 'Festivals are great for networking!'
        }
    ),
    createEventCard(
        'event_life_002',
        'Friendship Drama',
        'Your best friend is upset with you over a misunderstanding. How do you handle it?',
        'life',
        'social',
        { social: -5, stress: 8 },
        {
            requires: (stats) => stats.social >= 20,
            lockReason: 'You need more social experience to handle complex relationships',
            rarity: 'common'
        }
    ),
    createEventCard(
        'event_life_003',
        'Campus Club Fair',
        'Explore various clubs and societies. Find your passion!',
        'life',
        'social',
        { social: 10, gpa: 2, stress: -3 },
        {
            rarity: 'common',
            hiddenMessage: 'Clubs can boost both social life and academic performance'
        }
    ),
    createEventCard(
        'event_life_004',
        'Roommate Conflict',
        'Your roommate is being difficult. Time to set boundaries.',
        'life',
        'crisis',
        { social: -8, stress: 12, gpa: -3 },
        {
            requires: (stats) => stats.social >= 15,
            lockReason: 'You need social skills to handle roommate issues',
            importance: 'important',
            rarity: 'uncommon'
        }
    ),
    createEventCard(
        'event_life_005',
        'Cultural Exchange Program',
        'Apply for an international exchange program. A life-changing opportunity!',
        'life',
        'opportunity',
        { social: 20, gpa: 10, stress: 15, money: -50 },
        {
            requires: (stats) => stats.gpa >= 70 && stats.social >= 30,
            lockReason: 'You need excellent grades and social skills for this opportunity',
            importance: 'critical',
            rarity: 'legendary',
            nextSemester: 3, // Branches to semester 3
            hiddenMessage: 'This could change your entire college experience!'
        }
    ),
];

// Chaos Events - Unexpected challenges and crises
export const chaosEvents: EventCard[] = [
    createEventCard(
        'event_chaos_001',
        'Surprise Assignment',
        'Your professor just announced a major project due next week!',
        'chaos',
        'crisis',
        { stress: 20, gpa: -5 },
        {
            rarity: 'common',
            hiddenMessage: 'Time management is key in college!'
        }
    ),
    createEventCard(
        'event_chaos_002',
        'Computer Crash',
        'Your laptop died right before the final exam. Panic mode activated!',
        'chaos',
        'crisis',
        { stress: 25, gpa: -10, money: -30 },
        {
            requires: (stats) => stats.money >= 30,
            lockReason: 'You need money to fix or replace your computer',
            importance: 'critical',
            rarity: 'uncommon'
        }
    ),
    createEventCard(
        'event_chaos_003',
        'Library Fine',
        'You forgot to return a book and now owe a hefty fine.',
        'chaos',
        'crisis',
        { money: -15, stress: 5 },
        {
            rarity: 'common',
            hiddenMessage: 'Always check due dates!'
        }
    ),
    createEventCard(
        'event_chaos_004',
        'Group Project Nightmare',
        'Your group members aren\'t pulling their weight. Time to take charge!',
        'chaos',
        'crisis',
        { stress: 18, gpa: 5, social: -3 },
        {
            requires: (stats) => stats.social >= 10,
            lockReason: 'You need social skills to handle group dynamics',
            importance: 'important',
            rarity: 'uncommon'
        }
    ),
    createEventCard(
        'event_chaos_005',
        'Campus Lockdown',
        'A security incident has locked down the campus. Classes are cancelled.',
        'chaos',
        'crisis',
        { stress: 15, gpa: -8, social: -5 },
        {
            rarity: 'rare',
            importance: 'critical',
            hiddenMessage: 'Sometimes life throws unexpected curveballs'
        }
    ),
];

// Money Events - Financial opportunities and challenges
export const moneyEvents: EventCard[] = [
    createEventCard(
        'event_money_001',
        'Part-time Job Offer',
        'A local café is hiring students. Good money but time-consuming.',
        'money',
        'opportunity',
        { money: 40, stress: 8, gpa: -3, social: 5 },
        {
            requires: (stats) => stats.gpa >= 25,
            lockReason: 'You need decent grades to balance work and study',
            rarity: 'common'
        }
    ),
    createEventCard(
        'event_money_002',
        'Scholarship Application',
        'Apply for a merit-based scholarship. Worth the effort!',
        'money',
        'opportunity',
        { money: 100, gpa: 5, stress: 10 },
        {
            requires: (stats) => stats.gpa >= 60,
            lockReason: 'You need excellent grades to qualify for scholarships',
            importance: 'important',
            rarity: 'uncommon',
            hiddenMessage: 'Scholarships can significantly reduce financial stress!'
        }
    ),
    createEventCard(
        'event_money_003',
        'Textbook Scam',
        'You bought expensive textbooks that turned out to be fake. Money lost!',
        'money',
        'crisis',
        { money: -50, stress: 12, gpa: -2 },
        {
            rarity: 'uncommon',
            hiddenMessage: 'Always buy from trusted sources!'
        }
    ),
    createEventCard(
        'event_money_004',
        'Freelance Coding Project',
        'A local business needs a simple website. Perfect for a CS student!',
        'money',
        'opportunity',
        { money: 80, gpa: 8, stress: 15, social: 3 },
        {
            requires: (stats) => stats.gpa >= 40,
            lockReason: 'You need programming knowledge for this project',
            importance: 'important',
            rarity: 'rare',
            nextMonth: 2, // Branches to next month
            hiddenMessage: 'This could lead to more freelance opportunities!'
        }
    ),
    createEventCard(
        'event_money_005',
        'Emergency Fund',
        'Your family sends emergency money. A welcome relief!',
        'money',
        'opportunity',
        { money: 60, stress: -10, social: 2 },
        {
            rarity: 'uncommon',
            hiddenMessage: 'Family support can make all the difference!'
        }
    ),
];

// Academic Events - Study-related opportunities and challenges
export const academicEvents: EventCard[] = [
    createEventCard(
        'event_academic_001',
        'Research Assistant Position',
        'A professor is looking for a research assistant. Great learning opportunity!',
        'academic',
        'opportunity',
        { gpa: 12, stress: 10, money: 30, social: 5 },
        {
            requires: (stats) => stats.gpa >= 50,
            lockReason: 'You need good grades to be considered for research',
            importance: 'important',
            rarity: 'uncommon',
            hiddenMessage: 'Research experience looks great on your resume!'
        }
    ),
    createEventCard(
        'event_academic_002',
        'Programming Competition',
        'Join the college programming contest. Test your skills!',
        'academic',
        'opportunity',
        { gpa: 8, stress: 12, social: 8 },
        {
            requires: (stats) => stats.gpa >= 30,
            lockReason: 'You need programming knowledge to compete',
            rarity: 'common'
        }
    ),
    createEventCard(
        'event_academic_003',
        'Professor Office Hours',
        'Your professor offers extra help. Take advantage of it!',
        'academic',
        'opportunity',
        { gpa: 10, stress: -5, social: 3 },
        {
            rarity: 'common',
            hiddenMessage: 'Building relationships with professors is valuable!'
        }
    ),
    createEventCard(
        'event_academic_004',
        'Academic Probation Warning',
        'Your grades are slipping. Time to get serious about studies!',
        'academic',
        'crisis',
        { gpa: -15, stress: 20, social: -5 },
        {
            requires: (stats) => stats.gpa < 40,
            lockReason: 'Your grades are fine, no warning needed',
            importance: 'critical',
            rarity: 'rare',
            hiddenMessage: 'This is a wake-up call to focus on academics!'
        }
    ),
    createEventCard(
        'event_academic_005',
        'Internship Opportunity',
        'A tech company is offering internships to CS students. Apply now!',
        'academic',
        'opportunity',
        { gpa: 15, stress: 20, money: 120, social: 10 },
        {
            requires: (stats) => stats.gpa >= 60 && stats.social >= 20,
            lockReason: 'You need excellent grades and social skills for internships',
            importance: 'critical',
            rarity: 'legendary',
            nextSemester: 4, // Branches to semester 4
            hiddenMessage: 'Internships can lead to full-time job offers!'
        }
    ),
];

// Combine all events
export const allEvents: EventCard[] = [
    ...lifeEvents,
    ...chaosEvents,
    ...moneyEvents,
    ...academicEvents,
];

// Get events by category
export const getEventsByCategory = (category: EventCard['category']): EventCard[] => {
    return allEvents.filter(event => event.category === category);
};

// Get events by rarity
export const getEventsByRarity = (rarity: EventCard['rarity']): EventCard[] => {
    return allEvents.filter(event => event.rarity === rarity);
};

// Get semester-appropriate events
export const getEventsForSemester = (semester: number): EventCard[] => {
    switch (semester) {
        case 1:
            return [
                // First semester - basic college life events
                lifeEvents[0], // College Festival
                lifeEvents[2], // Campus Club Fair
                chaosEvents[0], // Surprise Assignment
                chaosEvents[2], // Library Fine
                moneyEvents[4], // Emergency Fund
                academicEvents[2], // Professor Office Hours
            ];
        case 2:
            return [
                // Second semester - more social and academic events
                lifeEvents[1], // Friendship Drama
                lifeEvents[3], // Roommate Conflict
                chaosEvents[1], // Computer Crash
                chaosEvents[3], // Group Project Nightmare
                moneyEvents[0], // Part-time Job Offer
                academicEvents[0], // Research Assistant Position
            ];
        case 3:
            return [
                // Third semester - advanced opportunities
                lifeEvents[4], // Cultural Exchange Program (requires high stats)
                chaosEvents[4], // Campus Lockdown
                moneyEvents[1], // Scholarship Application
                moneyEvents[3], // Freelance Coding Project
                academicEvents[1], // Programming Competition
                academicEvents[3], // Academic Probation Warning
            ];
        case 4:
            return [
                // Fourth semester - professional development
                lifeEvents[4], // Cultural Exchange Program
                moneyEvents[2], // Textbook Scam
                moneyEvents[3], // Freelance Coding Project
                academicEvents[4], // Internship Opportunity
                academicEvents[0], // Research Assistant Position
            ];
        case 5:
        case 6:
        case 7:
        case 8:
            // Later semesters - all events available
            return allEvents;
        default:
            return [];
    }
};

// Get events for a specific month within a semester
export const getEventsForMonth = (semester: number): EventCard[] => {
    const semesterEvents = getEventsForSemester(semester);

    // For early semesters, limit events per month
    if (semester <= 2) {
        return semesterEvents.slice(0, 1); // 1 event per month
    } else if (semester <= 4) {
        return semesterEvents.slice(0, 2); // 2 events per month
    } else {
        return semesterEvents.slice(0, 3); // 3 events per month
    }
};
