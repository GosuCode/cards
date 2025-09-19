import { PlayerStats, ExamResult } from '@/types';

const EXAM_CONFIG = {
    PASSING_GPA: 40,
    STRESS_PENALTY_MULTIPLIER: 0.1,
    PERFORMANCE_THRESHOLDS: {
        excellent: 80,
        good: 65,
        average: 50,
        poor: 40,
    },
} as const;

export const calculateExamResult = (
    stats: PlayerStats,
    semester: number,
    semesterStats: PlayerStats[]
): ExamResult => {
    const averageGPA = semesterStats.length > 0
        ? semesterStats.reduce((sum, s) => sum + s.gpa, 0) / semesterStats.length
        : stats.gpa;

    const stressPenalty = Math.min(stats.stress * EXAM_CONFIG.STRESS_PENALTY_MULTIPLIER, 15);
    const finalGPA = Math.max(0, averageGPA - stressPenalty);
    const passed = finalGPA >= EXAM_CONFIG.PASSING_GPA;

    let performance: ExamResult['performance'];
    if (finalGPA >= EXAM_CONFIG.PERFORMANCE_THRESHOLDS.excellent) {
        performance = 'excellent';
    } else if (finalGPA >= EXAM_CONFIG.PERFORMANCE_THRESHOLDS.good) {
        performance = 'good';
    } else if (finalGPA >= EXAM_CONFIG.PERFORMANCE_THRESHOLDS.average) {
        performance = 'average';
    } else if (finalGPA >= EXAM_CONFIG.PERFORMANCE_THRESHOLDS.poor) {
        performance = 'poor';
    } else {
        performance = 'failed';
    }

    const flavorText = getExamFlavorText(performance, stats, finalGPA);

    return {
        semester,
        finalStats: { ...stats },
        averageGPA,
        stressPenalty,
        finalGPA,
        passed,
        performance,
        flavorText,
        timestamp: Date.now(),
    };
};

const getExamFlavorText = (
    performance: ExamResult['performance'],
    stats: PlayerStats,
    finalGPA: number
): string => {
    switch (performance) {
        case 'excellent':
            return `🎉 Outstanding! You aced the exams with a ${finalGPA.toFixed(1)} GPA! Your dedication paid off.`;
        case 'good':
            return `✅ Great job! You passed with a solid ${finalGPA.toFixed(1)} GPA. Keep up the good work!`;
        case 'average':
            return `📚 You passed with a ${finalGPA.toFixed(1)} GPA. Room for improvement, but you're on track.`;
        case 'poor':
            return `⚠️ Barely passed with ${finalGPA.toFixed(1)} GPA. Time to focus more on studies.`;
        case 'failed':
            return `❌ Failed with ${finalGPA.toFixed(1)} GPA. You need to retake this semester or reconsider your approach.`;
        default:
            return `📊 Semester ${performance} completed with ${finalGPA.toFixed(1)} GPA.`;
    }
};

export const getExamPerformanceColor = (performance: ExamResult['performance']): string => {
    switch (performance) {
        case 'excellent': return '#10b981';
        case 'good': return '#3b82f6';
        case 'average': return '#f59e0b';
        case 'poor': return '#f97316';
        case 'failed': return '#ef4444';
        default: return '#6b7280';
    }
};

export const getExamPerformanceIcon = (performance: ExamResult['performance']): string => {
    switch (performance) {
        case 'excellent': return '🎉';
        case 'good': return '✅';
        case 'average': return '📚';
        case 'poor': return '⚠️';
        case 'failed': return '❌';
        default: return '📊';
    }
};
