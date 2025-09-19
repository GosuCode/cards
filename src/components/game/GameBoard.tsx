"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/game";
import { semesters, getMonthBySemesterAndMonth } from "@/lib/chapters";
import { PlayerStats, FloatingStatsManager, ExamModal } from "@/components/ui";
import { CardHand } from "@/components/game";
import { Card as CardType, EventCard as EventCardType } from "@/types";
import { useStatChanges } from "@/hooks";
import { calculateTotalStats, calculateBalanceScore } from "@/utils";
import { GAME_CONFIG } from "@/constants";
import { useEffect } from "react";

export default function GameBoard() {
  const {
    stats,
    currentSemester,
    currentMonth,
    completedCards,
    storyLog,
    isGameComplete,
    showExamModal,
    pendingExamResult,
    completeCard,
    advanceMonth,
    advanceSemester,
    resetGame,
    triggerExam,
    completeExam,
  } = useGameStore();

  const { changes, updateStats, removeStatChange } = useStatChanges();

  const currentMonthData = getMonthBySemesterAndMonth(
    currentSemester,
    currentMonth
  );
  const availableCards = [
    ...(currentMonthData?.cards.filter(
      (card) => !completedCards.includes(card.id)
    ) || []),
    ...(currentMonthData?.events?.filter(
      (event) => !completedCards.includes(event.id)
    ) || []),
  ];

  useEffect(() => {
    updateStats(stats);
  }, [stats, updateStats]);

  const handleCardClick = (card: CardType | EventCardType) => {
    completeCard(card.id, semesters);
  };

  const handleAdvanceMonth = () => {
    advanceMonth();

    if (currentMonth === 6) {
      setTimeout(() => {
        triggerExam();
      }, 500);
    }
  };

  const handleResetGame = () => {
    resetGame();
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
            Story-driven choices in the chaos of college life
          </p>
        </div>

        {/* Chapter Progress */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/20">
            <span className="text-white font-semibold">
              Semester {currentSemester}, Month {currentMonth}
            </span>
          </div>
        </div>

        {/* Month Info */}
        <AnimatePresence mode="wait">
          {currentMonthData && (
            <motion.div
              key={currentMonthData.id}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="text-4xl font-bold text-white mb-4 text-center">
                {currentMonthData.name}
              </h2>
              <p className="text-xl text-gray-300 text-center leading-relaxed">
                {currentMonthData.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <PlayerStats stats={stats} />

        {/* Month/Semester Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handleAdvanceMonth}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
          >
            Advance Month
          </button>
          <button
            onClick={advanceSemester}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
          >
            Advance Semester
          </button>
        </div>

        {/* Game Complete Screen */}
        {isGameComplete ? (
          <div className="text-center py-16">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl max-w-2xl mx-auto">
              <div className="text-8xl mb-6">🎓</div>
              <h2 className="text-5xl font-bold text-white mb-4">
                Congratulations!
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                You&apos;ve completed your college journey! Your final stats
                tell the story of your experience.
              </p>
              <button
                onClick={handleResetGame}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              >
                Play Again
              </button>
            </div>
          </div>
        ) : (
          /* Main Game Area */
          <motion.div
            className="grid lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Card Choices Section */}
            <div className="lg:col-span-2">
              <motion.div
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Make Your Choice
                  </h2>
                  <p className="text-gray-300">
                    Choose your path and see how it affects your stats
                  </p>
                </div>
                <CardHand
                  cards={availableCards}
                  stats={stats}
                  onCardClick={handleCardClick}
                  showLockedCards={true}
                />
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Story Log */}
              <motion.div
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-3">📜</span>
                  Story Log
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {storyLog.length === 0 ? (
                    <motion.div
                      className="text-gray-400 text-center py-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="text-4xl mb-2">🎮</div>
                      <p>Your choices will appear here...</p>
                    </motion.div>
                  ) : (
                    storyLog
                      .slice(-GAME_CONFIG.MAX_STORY_LOG_ITEMS)
                      .reverse()
                      .map((log, index) => (
                        <motion.div
                          key={log.id}
                          className="bg-white/5 rounded-lg p-3 border border-white/10"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <p className="text-white text-sm">{log.message}</p>
                          <p className="text-gray-400 text-xs mt-1">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </p>
                        </motion.div>
                      ))
                  )}
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-3">⚡</span>
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-white">
                    <span>Available Choices:</span>
                    <span className="font-bold">{availableCards.length}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Completed Choices:</span>
                    <span className="font-bold">{completedCards.length}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Total Stats:</span>
                    <span className="font-bold">
                      {calculateTotalStats(stats)}
                    </span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Balance Score:</span>
                    <span className="font-bold">
                      {calculateBalanceScore(stats)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Floating Stats Manager */}
      <FloatingStatsManager changes={changes} onRemove={removeStatChange} />

      {/* Exam Modal */}
      {showExamModal && pendingExamResult && (
        <ExamModal examResult={pendingExamResult} onComplete={completeExam} />
      )}
    </div>
  );
}
