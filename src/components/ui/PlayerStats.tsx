"use client";

import { motion } from "framer-motion";
import { PlayerStats as PlayerStatsType } from "@/types";

interface PlayerStatsProps {
  stats: PlayerStatsType;
  previousStats?: PlayerStatsType; // For animation comparison
}

export default function PlayerStats({
  stats,
  previousStats,
}: PlayerStatsProps) {
  const StatItem = ({
    label,
    value,
    previousValue,
    icon,
    color,
    gradient,
  }: {
    label: string;
    value: number;
    previousValue?: number;
    icon: string;
    color: string;
    gradient: string;
  }) => {
    const hasChanged = previousValue !== undefined && previousValue !== value;
    const changeDirection = hasChanged
      ? value > previousValue!
        ? "up"
        : "down"
      : null;

    return (
      <motion.div
        className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div
              className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-2xl`}
              animate={hasChanged ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {icon}
            </motion.div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">{label}</h3>
              <p className="text-sm text-gray-500">Current Level</p>
            </div>
          </div>
          <div className="text-right">
            <motion.div
              className="text-3xl font-black text-gray-800"
              animate={hasChanged ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {value}
            </motion.div>
            <div className="text-xs text-gray-400">/ 100</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <motion.span
              className="font-semibold text-gray-800"
              animate={
                hasChanged ? { color: ["#374151", "#10b981", "#374151"] } : {}
              }
              transition={{ duration: 0.5 }}
            >
              {value}%
            </motion.span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className={`h-2 rounded-full ${gradient}`}
              initial={{ width: previousValue ? `${previousValue}%` : "0%" }}
              animate={{ width: `${value}%` }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: hasChanged ? 0.1 : 0,
              }}
            />
          </div>
          {/* Change indicator */}
          {hasChanged && (
            <motion.div
              className={`text-xs font-semibold ${
                changeDirection === "up" ? "text-green-600" : "text-red-600"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {changeDirection === "up" ? "↗" : "↘"}{" "}
              {Math.abs(value - previousValue!)}
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="mb-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Student Dashboard
        </h2>
        <p className="text-gray-600">Track your college journey progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div data-stat-card>
          <StatItem
            label="GPA"
            value={stats.gpa}
            previousValue={previousStats?.gpa}
            icon="🎓"
            color="bg-gradient-to-br from-blue-500 to-cyan-500"
            gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
          />
        </div>
        <div data-stat-card>
          <StatItem
            label="Money"
            value={stats.money}
            previousValue={previousStats?.money}
            icon="💰"
            color="bg-gradient-to-br from-amber-500 to-yellow-500"
            gradient="bg-gradient-to-r from-amber-500 to-yellow-500"
          />
        </div>
        <div data-stat-card>
          <StatItem
            label="Stress"
            value={stats.stress}
            previousValue={previousStats?.stress}
            icon="😰"
            color="bg-gradient-to-br from-red-500 to-pink-500"
            gradient="bg-gradient-to-r from-red-500 to-pink-500"
          />
        </div>
        <div data-stat-card>
          <StatItem
            label="Social"
            value={stats.social}
            previousValue={previousStats?.social}
            icon="👥"
            color="bg-gradient-to-br from-emerald-500 to-green-500"
            gradient="bg-gradient-to-r from-emerald-500 to-green-500"
          />
        </div>
      </div>
    </div>
  );
}
