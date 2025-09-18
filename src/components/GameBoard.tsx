"use client";

import { useGameStore } from "@/store/game";
import PlayerStats from "./PlayerStats";
import CardHand from "./CardHand";
import { Card as CardType } from "@/store/game";

export default function GameBoard() {
  const { stats, hand } = useGameStore();

  const handleCardClick = (card: CardType) => {
    console.log("Card clicked:", card.name);
  };

  const handleDrawCards = () => {
    console.log("Draw cards clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Bachelors Battleground
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Strategic deck-building in the chaos of college life
          </p>
        </div>

        <PlayerStats stats={stats} />

        {/* Main Game Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Card Hand Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Your Hand
                  </h2>
                  <p className="text-gray-300">
                    Choose your strategy and play cards
                  </p>
                </div>
                <button
                  onClick={handleDrawCards}
                  className="group mt-4 sm:mt-0 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700"
                >
                  <span className="flex items-center">
                    <span className="mr-3">🎴</span>
                    Draw Cards
                    <span className="ml-3 group-hover:rotate-12 transition-transform">
                      ✨
                    </span>
                  </span>
                </button>
              </div>
              <CardHand cards={hand} onCardClick={handleCardClick} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Game Log */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3">📜</span>
                Game Log
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                <div className="text-gray-400 text-center py-8">
                  <div className="text-4xl mb-2">🎮</div>
                  <p>Game events will appear here...</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3">⚡</span>
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-white">
                  <span>Cards in Hand:</span>
                  <span className="font-bold">{hand.length}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Total Stats:</span>
                  <span className="font-bold">
                    {stats.gpa + stats.money + stats.stress + stats.social}
                  </span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Balance Score:</span>
                  <span className="font-bold">
                    {Math.abs(stats.gpa - 50) +
                      Math.abs(stats.money - 50) +
                      Math.abs(stats.stress - 50) +
                      Math.abs(stats.social - 50) <
                    50
                      ? "Great!"
                      : "Needs Work"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
