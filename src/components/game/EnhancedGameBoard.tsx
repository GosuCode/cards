"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/game";
import { semesters, getMonthBySemesterAndMonth } from "@/lib/chapters";
import { PlayerStats, EventLog, FloatingStatsManager } from "@/components/ui";
import { EnhancedCardHand } from "@/components/game";
import { Card as CardType } from "@/types";
import { useStatChanges as useStatChangesHook } from "@/hooks";
import { GAME_CONFIG } from "@/constants";
import { useEffect } from "react";

export default function EnhancedGameBoard() {
  const {
    stats,
    currentSemester,
    currentMonth,
    completedCards,
    storyLog,
    isGameComplete,
    completeCard,
    resetGame,
  } = useGameStore();

  const { changes, previousStats, updateStats, removeStatChange } =
    useStatChangesHook();

  const currentMonthData = getMonthBySemesterAndMonth(
    currentSemester,
    currentMonth
  );

  const availableCards =
    currentMonthData?.cards.filter(
      (card) => !completedCards.includes(card.id)
    ) || [];

  useEffect(() => {
    updateStats(stats);
  }, [stats, updateStats]);

  const handleCardClick = (card: CardType) => {
    completeCard(card.id, semesters);
  };

  const handleResetGame = () => {
    resetGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Floating stat changes */}
      <FloatingStatsManager changes={changes} onRemove={removeStatChange} />

      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Bachelors Battleground
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 font-light"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Story-driven choices in the chaos of college life
          </motion.p>
        </div>

        {/* Semester/Month Display */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/20 shadow-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl font-bold text-white">
              Semester {currentSemester} • Month {currentMonth}
            </span>
          </motion.div>
        </div>

        {/* Month Info */}
        <AnimatePresence mode="wait">
          {currentMonthData && (
            <motion.div
              key={currentMonthData.id}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-bold text-white mb-3 text-center">
                {currentMonthData.name}
              </h2>
              <p className="text-lg text-gray-300 text-center leading-relaxed">
                {currentMonthData.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Complete Screen */}
        {isGameComplete ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl max-w-2xl mx-auto">
              <div className="text-8xl mb-6">🎓</div>
              <h2 className="text-5xl font-bold text-white mb-4">
                Congratulations!
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                You&apos;ve completed your college journey! Your final stats
                tell the story of your experience.
              </p>
              <motion.button
                onClick={handleResetGame}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Again
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* Main Game Area */
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Card Grid - Middle Section */}
            <motion.div
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2 text-center">
                  Make Your Choice
                </h2>
                <p className="text-gray-300 text-center">
                  Choose your path and see how it affects your stats
                </p>
              </div>
              <EnhancedCardHand
                cards={availableCards}
                onCardClick={handleCardClick}
                stats={stats}
              />
            </motion.div>

            {/* Bottom Section - PlayerStats + Event Log */}
            <motion.div
              className="grid lg:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Player Stats */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <PlayerStats
                  stats={stats}
                  previousStats={previousStats || undefined}
                />
              </motion.div>

              {/* Event Log */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <EventLog
                  logs={storyLog}
                  maxItems={GAME_CONFIG.MAX_STORY_LOG_ITEMS}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
