"use client";

import { PlayerStats as PlayerStatsType } from "@/types";

interface PlayerStatsProps {
  stats: PlayerStatsType;
}

export default function PlayerStats({ stats }: PlayerStatsProps) {
  const StatItem = ({
    label,
    value,
    icon,
    color,
    gradient,
  }: {
    label: string;
    value: number;
    icon: string;
    color: string;
    gradient: string;
  }) => (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-2xl`}
          >
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{label}</h3>
            <p className="text-sm text-gray-500">Current Level</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-gray-800">{value}</div>
          <div className="text-xs text-gray-400">/ 100</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-semibold text-gray-800">{value}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full ${gradient} transition-all duration-700 ease-out`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Student Dashboard
        </h2>
        <p className="text-gray-600">Track your college journey progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatItem
          label="GPA"
          value={stats.gpa}
          icon="🎓"
          color="bg-gradient-to-br from-blue-500 to-cyan-500"
          gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
        />
        <StatItem
          label="Money"
          value={stats.money}
          icon="💰"
          color="bg-gradient-to-br from-amber-500 to-yellow-500"
          gradient="bg-gradient-to-r from-amber-500 to-yellow-500"
        />
        <StatItem
          label="Stress"
          value={stats.stress}
          icon="😰"
          color="bg-gradient-to-br from-red-500 to-pink-500"
          gradient="bg-gradient-to-r from-red-500 to-pink-500"
        />
        <StatItem
          label="Social"
          value={stats.social}
          icon="👥"
          color="bg-gradient-to-br from-emerald-500 to-green-500"
          gradient="bg-gradient-to-r from-emerald-500 to-green-500"
        />
      </div>
    </div>
  );
}
