import { Semester, Month, Chapter, Card } from '@/types';
import { createEffect } from '@/utils';

const SEMESTER_CONFIG = {
    TOTAL_SEMESTERS: 8,
    MONTHS_PER_SEMESTER: 6,
    MONTH_NAMES: [
        'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
        'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
    ],
} as const;

const createSemesterCard = (
    id: string,
    name: string,
    description: string,
    type: Card['type'],
    effect: Parameters<typeof createEffect>[0],
    options: Partial<Card> = {}
): Card => ({
    id,
    name,
    description,
    type,
    effect: createEffect(effect),
    ...options,
});

// Semester 1: Foundation Year (Baisakh to Ashwin)
const semester1: Semester = {
    id: 'semester-1',
    number: 1,
    title: 'Foundation Year - First Steps',
    description: 'Welcome to BCA! Learn the basics of computer science and programming.',
    months: [
        {
            id: 'sem1-month1',
            name: 'Baisakh - Orientation',
            description: 'First month of college life - everything is new and exciting!',
            cards: [
                createSemesterCard(
                    's1m1c1',
                    'Attend College Orientation',
                    'Learn about BCA curriculum, faculty, and campus facilities.',
                    'study',
                    { gpa: 5, social: 10, stress: -5 }
                ),
                createSemesterCard(
                    's1m1c2',
                    'Join Programming Club',
                    'Meet fellow coding enthusiasts and learn together.',
                    'life',
                    { social: 8, gpa: 3, stress: -2 }
                ),
                createSemesterCard(
                    's1m1c3',
                    'Buy Textbooks',
                    'Purchase essential programming and computer science books.',
                    'money',
                    { money: -15, gpa: 5, stress: 2 }
                ),
            ],
        },
        {
            id: 'sem1-month2',
            name: 'Jestha - First Programming',
            description: 'Start learning C programming - the foundation of all programming.',
            cards: [
                createSemesterCard(
                    's1m2c1',
                    'Learn C Programming Basics',
                    'Master variables, loops, and functions in C.',
                    'study',
                    { gpa: 8, stress: 5 }
                ),
                createSemesterCard(
                    's1m2c2',
                    'Join Study Group',
                    'Form a study group with classmates for better learning.',
                    'study',
                    { gpa: 6, social: 5, stress: -3 },
                    {
                        requires: { social: 20 },
                        hiddenMessage: "You need to be more social to join a study group. Try making friends first!"
                    }
                ),
                createSemesterCard(
                    's1m2c3',
                    'Part-time Job at Cyber Cafe',
                    'Work at a local cyber cafe to earn some money.',
                    'money',
                    { money: 12, stress: 8, social: 3 }
                ),
                createSemesterCard(
                    's1m2c4',
                    'Skip Classes for Festival',
                    'Celebrate Dashain with family instead of attending classes.',
                    'life',
                    { social: 10, stress: -8, gpa: -3 }
                ),
            ],
        },
        {
            id: 'sem1-month3',
            name: 'Ashadh - Data Structures',
            description: 'Learn about arrays, linked lists, and basic algorithms.',
            cards: [
                createSemesterCard(
                    's1m3c1',
                    'Master Arrays and Pointers',
                    'Deep dive into C arrays and pointer manipulation.',
                    'study',
                    { gpa: 10, stress: 8 }
                ),
                createSemesterCard(
                    's1m3c2',
                    'Tutor Junior Students',
                    'Help first-year students with their programming assignments.',
                    'life',
                    { social: 6, gpa: 4, money: 8 }
                ),
                createSemesterCard(
                    's1m3c3',
                    'Buy Laptop',
                    'Invest in a good laptop for programming projects.',
                    'money',
                    { money: -50, gpa: 8, stress: -5 }
                ),
            ],
        },
        {
            id: 'sem1-month4',
            name: 'Shrawan - Monsoon Challenges',
            description: 'Rainy season brings challenges but also opportunities for indoor study.',
            cards: [
                createSemesterCard(
                    's1m4c1',
                    'Online Programming Course',
                    'Take an additional online course during monsoon break.',
                    'study',
                    { gpa: 7, stress: 5, money: -10 }
                ),
                createSemesterCard(
                    's1m4c2',
                    'Campus Internet Issues',
                    'Deal with frequent internet outages during monsoon.',
                    'chaos',
                    { stress: 10, gpa: -2 }
                ),
                createSemesterCard(
                    's1m4c3',
                    'Library Study Sessions',
                    'Spend extra time in the college library studying.',
                    'study',
                    { gpa: 6, social: 3, stress: 3 }
                ),
            ],
        },
        {
            id: 'sem1-month5',
            name: 'Bhadra - Project Work',
            description: 'Start working on your first programming project.',
            cards: [
                createSemesterCard(
                    's1m5c1',
                    'Build Calculator Program',
                    'Create a simple calculator using C programming.',
                    'study',
                    { gpa: 12, stress: 6 }
                ),
                createSemesterCard(
                    's1m5c2',
                    'Freelance Web Development',
                    'Take small web development projects for local businesses.',
                    'money',
                    { money: 20, stress: 10, gpa: 4 },
                    {
                        requires: { gpa: 60 },
                        hiddenMessage: "You need better programming skills (GPA 60+) to take on freelance projects. Study more!"
                    }
                ),
                createSemesterCard(
                    's1m5c3',
                    'Join Tech Meetup',
                    'Attend a local tech meetup to network with professionals.',
                    'life',
                    { social: 8, gpa: 3, stress: -3 }
                ),
            ],
        },
        {
            id: 'sem1-month6',
            name: 'Ashwin - Exam Preparation',
            description: 'Prepare for your first semester exams.',
            cards: [
                createSemesterCard(
                    's1m6c1',
                    'Intensive Study Schedule',
                    'Create a strict study schedule for exam preparation.',
                    'study',
                    { gpa: 15, stress: 12, social: -5 }
                ),
                createSemesterCard(
                    's1m6c2',
                    'Group Study Sessions',
                    'Study with friends to prepare for exams together.',
                    'study',
                    { gpa: 8, social: 6, stress: 4 }
                ),
                createSemesterCard(
                    's1m6c3',
                    'Exam Anxiety',
                    'Deal with stress and anxiety before exams.',
                    'chaos',
                    { stress: 15, gpa: -3, social: -3 }
                ),
            ],
        },
    ],
    examChapter: {
        id: 'sem1-exam',
        title: 'First Semester Exams',
        description: 'Your first major exams in BCA. Show what you\'ve learned!',
        cards: [
            createSemesterCard(
                's1e1',
                'C Programming Exam',
                'Write programs and answer theory questions about C programming.',
                'study',
                { gpa: 20, stress: 15 }
            ),
            createSemesterCard(
                's1e2',
                'Mathematics Exam',
                'Solve calculus and discrete mathematics problems.',
                'study',
                { gpa: 15, stress: 10 }
            ),
            createSemesterCard(
                's1e3',
                'Computer Fundamentals Exam',
                'Answer questions about computer hardware and software basics.',
                'study',
                { gpa: 12, stress: 8 }
            ),
            createSemesterCard(
                's1e4',
                'Exam Hall Anxiety',
                'Deal with nervousness during the actual exam.',
                'chaos',
                { stress: 20, gpa: -5 }
            ),
        ],
    },
};

// Semester 2: Object-Oriented Programming (Kartik to Chaitra)
const semester2: Semester = {
    id: 'semester-2',
    number: 2,
    title: 'Object-Oriented Programming',
    description: 'Learn C++ and object-oriented programming concepts.',
    months: [
        {
            id: 'sem2-month1',
            name: 'Kartik - C++ Introduction',
            description: 'Start learning C++ and object-oriented concepts.',
            cards: [
                createSemesterCard(
                    's2m1c1',
                    'Learn C++ Basics',
                    'Master classes, objects, and inheritance in C++.',
                    'study',
                    { gpa: 10, stress: 6 }
                ),
                createSemesterCard(
                    's2m1c2',
                    'Join Coding Competition',
                    'Participate in a local programming competition.',
                    'life',
                    { social: 8, gpa: 6, stress: 8 }
                ),
                createSemesterCard(
                    's2m1c3',
                    'Upgrade Development Environment',
                    'Install and configure a better IDE for C++ development.',
                    'study',
                    { gpa: 5, stress: 3, money: -8 }
                ),
            ],
        },
        {
            id: 'sem2-month2',
            name: 'Mangsir - Advanced C++',
            description: 'Dive deeper into C++ features and advanced concepts.',
            cards: [
                createSemesterCard(
                    's2m2c1',
                    'Master Polymorphism',
                    'Learn about virtual functions and runtime polymorphism.',
                    'study',
                    { gpa: 12, stress: 8 }
                ),
                createSemesterCard(
                    's2m2c2',
                    'Build Library Management System',
                    'Create a complete library management system using C++.',
                    'study',
                    { gpa: 15, stress: 10, social: 3 }
                ),
                createSemesterCard(
                    's2m2c3',
                    'Attend Tech Conference',
                    'Go to a technology conference in Kathmandu.',
                    'life',
                    { social: 12, gpa: 5, money: -25, stress: -5 }
                ),
            ],
        },
        {
            id: 'sem2-month3',
            name: 'Poush - Data Structures in C++',
            description: 'Implement data structures using C++ classes.',
            cards: [
                createSemesterCard(
                    's2m3c1',
                    'Implement STL Containers',
                    'Learn and implement Standard Template Library containers.',
                    'study',
                    { gpa: 10, stress: 6 }
                ),
                createSemesterCard(
                    's2m3c2',
                    'Campus WiFi Issues',
                    'Deal with unreliable internet connection affecting studies.',
                    'chaos',
                    { stress: 12, gpa: -3 }
                ),
                createSemesterCard(
                    's2m3c3',
                    'Mentor First Year Students',
                    'Help new students with their programming assignments.',
                    'life',
                    { social: 8, gpa: 4, money: 10 }
                ),
            ],
        },
        {
            id: 'sem2-month4',
            name: 'Magh - Project Development',
            description: 'Work on a major programming project.',
            cards: [
                createSemesterCard(
                    's2m4c1',
                    'Build Student Management System',
                    'Create a comprehensive student management system.',
                    'study',
                    { gpa: 18, stress: 12, social: 5 }
                ),
                createSemesterCard(
                    's2m4c2',
                    'Freelance Mobile App',
                    'Develop a simple mobile app for a local business.',
                    'money',
                    { money: 30, stress: 15, gpa: 6 }
                ),
                createSemesterCard(
                    's2m4c3',
                    'Join Open Source Project',
                    'Contribute to an open source project on GitHub.',
                    'life',
                    { social: 10, gpa: 8, stress: 5 }
                ),
            ],
        },
        {
            id: 'sem2-month5',
            name: 'Falgun - Database Integration',
            description: 'Learn database concepts and integrate with C++ programs.',
            cards: [
                createSemesterCard(
                    's2m5c1',
                    'Learn SQL Basics',
                    'Master SQL queries and database design.',
                    'study',
                    { gpa: 8, stress: 4 }
                ),
                createSemesterCard(
                    's2m5c2',
                    'Database Project',
                    'Create a database-driven application using C++ and MySQL.',
                    'study',
                    { gpa: 12, stress: 8, money: -5 }
                ),
                createSemesterCard(
                    's2m5c3',
                    'Internship at Software Company',
                    'Start a part-time internship at a local software company.',
                    'money',
                    { money: 25, stress: 10, gpa: 6, social: 8 }
                ),
            ],
        },
        {
            id: 'sem2-month6',
            name: 'Chaitra - Exam Preparation',
            description: 'Prepare for second semester exams.',
            cards: [
                createSemesterCard(
                    's2m6c1',
                    'Comprehensive Study Plan',
                    'Create a detailed study plan covering all C++ topics.',
                    'study',
                    { gpa: 12, stress: 8 }
                ),
                createSemesterCard(
                    's2m6c2',
                    'Practice Previous Year Papers',
                    'Solve previous year exam papers for practice.',
                    'study',
                    { gpa: 8, stress: 5 }
                ),
                createSemesterCard(
                    's2m6c3',
                    'Study Group Formation',
                    'Form a study group with classmates for exam preparation.',
                    'study',
                    { gpa: 6, social: 8, stress: 3 }
                ),
            ],
        },
    ],
    examChapter: {
        id: 'sem2-exam',
        title: 'Second Semester Exams',
        description: 'C++ and Object-Oriented Programming exams.',
        cards: [
            createSemesterCard(
                's2e1',
                'C++ Programming Exam',
                'Write C++ programs and answer OOP theory questions.',
                'study',
                { gpa: 20, stress: 15 }
            ),
            createSemesterCard(
                's2e2',
                'Data Structures Exam',
                'Implement data structures and solve algorithm problems.',
                'study',
                { gpa: 18, stress: 12 }
            ),
            createSemesterCard(
                's2e3',
                'Database Systems Exam',
                'Answer questions about database design and SQL.',
                'study',
                { gpa: 15, stress: 10 }
            ),
        ],
    },
};

// TODO: Add Semesters 3-8 here
// Each semester should follow the same structure with 6 months + exam chapter
// Consider adding more specialized topics like:
// - Semester 3: Web Development (HTML, CSS, JavaScript)
// - Semester 4: Database Management Systems
// - Semester 5: Software Engineering
// - Semester 6: Mobile App Development
// - Semester 7: Final Year Project
// - Semester 8: Internship and Job Preparation

export const semesters: Semester[] = [
    semester1,
    semester2,
    // TODO: Add remaining semesters (3-8)
];

export const TOTAL_SEMESTERS = semesters.length;
export const MONTHS_PER_SEMESTER = SEMESTER_CONFIG.MONTHS_PER_SEMESTER;
export const TOTAL_MONTHS = TOTAL_SEMESTERS * MONTHS_PER_SEMESTER;

export const getSemesterById = (id: string): Semester | undefined => {
    return semesters.find(sem => sem.id === id);
};

export const getMonthBySemesterAndMonth = (semesterNumber: number, monthNumber: number): Month | undefined => {
    const semester = semesters.find(sem => sem.number === semesterNumber);
    return semester?.months[monthNumber - 1];
};

export const getExamChapterBySemester = (semesterNumber: number): Chapter | undefined => {
    const semester = semesters.find(sem => sem.number === semesterNumber);
    return semester?.examChapter;
};