"use client";

import { motion, AnimatePresence } from "framer-motion";
import { StoryLog } from "@/types";

interface EventLogProps {
  logs: StoryLog[];
  maxItems?: number;
}

export default function EventLog({ logs, maxItems = 10 }: EventLogProps) {
  const displayLogs = logs.slice(-maxItems).reverse();

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
        <span className="mr-3">📜</span>
        Event Log
      </h3>

      <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <AnimatePresence mode="popLayout">
          {displayLogs.length === 0 ? (
            <motion.div
              className="text-gray-400 text-center py-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl mb-2">🎮</div>
              <p>Your choices will appear here...</p>
            </motion.div>
          ) : (
            displayLogs.map((log, index) => (
              <motion.div
                key={log.id}
                className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-colors duration-200"
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                layout
                whileHover={{
                  scale: 1.02,
                  x: 4,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-white text-sm leading-relaxed">
                      {log.message}
                    </p>
                    <motion.p
                      className="text-gray-400 text-xs mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </motion.p>
                  </div>

                  {/* Special event icons - Future enhancement placeholder */}
                  <motion.div
                    className="ml-2 text-lg"
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {log.message.includes("Advanced to Semester") && "🎓"}
                    {log.message.includes("Advanced to Month") && "📅"}
                    {log.message.includes("GPA") && "📈"}
                    {log.message.includes("Money") && "💰"}
                    {log.message.includes("Stress") && "😫"}
                    {log.message.includes("Social") && "👥"}
                    {/* Future: Add more special event icons here */}
                  </motion.div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
