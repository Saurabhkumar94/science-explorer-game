"use client";

import React from "react";

interface DisclaimerProps {
  onAccept?: () => void;
}

export default function Disclaimer({ onAccept }: DisclaimerProps) {
  return (
    <div className="max-w-2xl mx-auto my-6 p-6 bg-white border border-yellow-200 rounded-xl shadow-sm">
      <h3 className="text-lg font-bold text-yellow-800 flex items-center gap-2 mb-3">
        ⚠️ Important Disclaimer & Guidelines
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        This **Science Explorer Game** is designed based on the Class 6 Science textbook 
        <strong> "Curiosity"</strong>. It is meant to test and expand your knowledge using 
        interactive scientific exploration. Please read all instructions carefully before 
        proceeding with the game modules.
      </p>
      <div className="text-xs text-gray-400 border-t border-gray-100 pt-3">
        * Note: All scores and progress are saved locally in your browser's localStorage. 
        Clearing your browser cache may reset your game stats.
      </div>
      {onAccept && (
        <button
          onClick={onAccept}
          className="mt-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium text-sm rounded-lg transition-colors"
        >
          I Understand & Agree
        </button>
      )}
    </div>
  );
}