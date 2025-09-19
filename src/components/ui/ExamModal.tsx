"use client";

import { ExamResult } from "@/types";
import { getExamPerformanceColor, getExamPerformanceIcon } from "@/utils";

interface ExamModalProps {
  examResult: ExamResult;
  onComplete: () => void;
}

export const ExamModal = ({ examResult, onComplete }: ExamModalProps) => {
  const {
    semester,
    finalStats,
    averageGPA,
    stressPenalty,
    finalGPA,
    performance,
    flavorText,
  } = examResult;

  const performanceColor = getExamPerformanceColor(performance);
  const performanceIcon = getExamPerformanceIcon(performance);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">{performanceIcon}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Semester {semester} Exams
            </h2>
            <div
              className="text-lg font-semibold"
              style={{ color: performanceColor }}
            >
              {performance.toUpperCase()}
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3 text-base">
                Final Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 font-medium">GPA:</span>
                  <span className="font-bold text-base text-gray-900">
                    {finalStats.gpa.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 font-medium">Stress:</span>
                  <span className="font-bold text-base text-gray-900">
                    {finalStats.stress.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 font-medium">Social:</span>
                  <span className="font-bold text-base text-gray-900">
                    {finalStats.social.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 font-medium">Money:</span>
                  <span className="font-bold text-base text-gray-900">
                    {finalStats.money.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3 text-base">
                Exam Results
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 font-medium">
                    Average GPA:
                  </span>
                  <span className="font-bold text-base text-gray-900">
                    {averageGPA.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 font-medium">
                    Stress Penalty:
                  </span>
                  <span className="font-bold text-base text-red-600">
                    -{stressPenalty.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-300 pt-2">
                  <span className="text-gray-900 font-bold text-base">
                    Final GPA:
                  </span>
                  <span
                    className="font-bold text-xl"
                    style={{ color: performanceColor }}
                  >
                    {finalGPA.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3 text-base">Result</h3>
              <p className="text-gray-800 text-base leading-relaxed">
                {flavorText}
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={onComplete}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {semester < 6
                ? "Continue to Next Semester"
                : "View Final Results"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
