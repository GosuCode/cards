"use client";

import { motion } from "framer-motion";

interface SemesterTransitionProps {
  fromSemester: number;
  toSemester: number;
  onComplete: () => void;
}

export const SemesterTransition = ({
  fromSemester,
  toSemester,
  onComplete,
}: SemesterTransitionProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <motion.div
        className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-8 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-6xl mb-4">🎓</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Semester Transition
        </h2>
        <p className="text-gray-600 mb-6">
          Moving from Semester {fromSemester} to Semester {toSemester}
        </p>
        <div className="text-sm text-gray-500 mb-6">
          <p>🎬 Cutscene placeholder</p>
          <p>
            Future: Add animations, story elements, and character development
          </p>
        </div>
        <button
          onClick={onComplete}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
};
