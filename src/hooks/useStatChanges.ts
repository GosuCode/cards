import { useState, useRef, useCallback } from "react";
import { PlayerStats } from "@/types";

interface StatChange {
    id: string;
    stat: string;
    change: number;
    icon: string;
    color: string;
}

export const useStatChanges = () => {
    const [changes, setChanges] = useState<StatChange[]>([]);
    const [previousStats, setPreviousStats] = useState<PlayerStats | null>(null);
    const currentStatsRef = useRef<PlayerStats | null>(null);

    const addStatChange = useCallback((stat: string, change: number) => {

        const statConfig = {
            gpa: { icon: "📈", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
            money: { icon: "💰", color: "bg-gradient-to-r from-amber-500 to-yellow-500" },
            stress: { icon: "😫", color: "bg-gradient-to-r from-red-500 to-pink-500" },
            social: { icon: "👥", color: "bg-gradient-to-r from-emerald-500 to-green-500" },
        };

        const config = statConfig[stat as keyof typeof statConfig];
        if (!config || change === 0) {
            return;
        }

        const id = `${stat}-${Date.now()}-${Math.random()}`;
        setChanges(prev => {
            const newChanges = [...prev, { id, stat, change, ...config }];
            return newChanges;
        });
    }, []);

    const removeStatChange = useCallback((id: string) => {
        setChanges(prev => prev.filter(change => change.id !== id));
    }, []);

    const updateStats = useCallback((newStats: PlayerStats) => {

        if (currentStatsRef.current) {
            Object.keys(newStats).forEach(stat => {
                const oldValue = currentStatsRef.current![stat as keyof PlayerStats];
                const newValue = newStats[stat as keyof PlayerStats];
                const change = newValue - oldValue;

                if (change !== 0) {
                    addStatChange(stat, change);
                }
            });
        } else {
            console.log('🔥 No previous stats, initializing...');
        }

        setPreviousStats(currentStatsRef.current);
        currentStatsRef.current = newStats;
    }, [addStatChange]);

    return {
        changes,
        previousStats,
        updateStats,
        removeStatChange,
    };
};
