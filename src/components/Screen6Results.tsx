"use client";

import React, { useState, useEffect } from "react";
import Disclaimer from "./Disclaimer";
import confetti from "canvas-confetti";

interface ResultsProps {
  name: string;
  team: string; // 💎 Added team to props definition
  m1Score: number;
  m2Score: number;
  m3Score: number;
  onNavigate: (screenId: number) => void;
}

export default function Screen6Results({ name, team, m1Score, m2Score, m3Score, onNavigate }: ResultsProps) {
  const totalScore = m1Score + m2Score + m3Score;
  const [pledge, setPledge] = useState(`I, ${name}, promise to always be curious, always ask WHY, and always test my ideas before calling them facts!`);
  const [isSaved, setIsSaved] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  // Score band aur badge logic
  let badgeLevel: "Curiosity Champion" | "Science Explorer" | "Lab Discoverer" = "Lab Discoverer";
  let badgeEmoji = "🔬";
  let badgeText = "";

  if (totalScore >= 13) {
    badgeLevel = "Curiosity Champion";
    badgeEmoji = "🏆";
    badgeText = "You have mastered the Wonderful World of Science! You think and observe like a true scientist, Kabir would be proud!";
  } else if (totalScore >= 9) {
    badgeLevel = "Science Explorer";
    badgeEmoji = "🔭";
    badgeText = "Great work! You are building strong science foundations. Review the concepts you found tricky and you will be a Curiosity Champion soon!";
  } else {
    badgeLevel = "Lab Discoverer";
    badgeEmoji = "🔬";
    badgeText = "Every scientist starts somewhere! Re-play the kit games and come back to try again. Kabir says: the only wrong move in science is to stop being curious!";
  }

  // Number spinning/count-up animation effect
  useEffect(() => {
    if (animatedScore < totalScore) {
      const timer = setTimeout(() => setAnimatedScore(prev => prev + 1), 80);
      return () => clearTimeout(timer);
    } else if (animatedScore === totalScore && totalScore >= 9) {
      // Sahi score aane par automatically halka sa initial confetti popup
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  }, [animatedScore, totalScore]);

  const handleSavePledge = () => {
    setIsSaved(true);
    localStorage.setItem("game_01_pledge", pledge);
    localStorage.setItem("game_01_total_score", String(totalScore));
    localStorage.setItem("game_01_badge_level", badgeLevel);
    localStorage.setItem("game_01_completed_date", new Date().toISOString());

    // Big Confetti Explosion on saving pledge
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 }
    });

    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Science Results!</h1>
        <p className="text-sm text-gray-500 font-medium">Wonderful job finishing the Chapter 01 challenge!</p>
      </div>

      {/* Large Score Display with Count-up */}
      <div className="text-center bg-gray-50 rounded-xl p-6 border border-gray-100 mb-6 shadow-inner">
        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Total Score</span>
        <h2 className="text-5xl font-black text-teal-600 my-1 transition-all duration-300">
          {animatedScore} <span className="text-2xl font-medium text-gray-400">/ 15</span>
        </h2>
      </div>

      {/* Badge Reveal Box */}
      <div className="border-2 border-dashed border-teal-500 bg-teal-50/30 rounded-xl p-5 text-center mb-6 transform transition-transform hover:scale-[1.01]">
        <div className="text-4xl mb-2 animate-bounce">{badgeEmoji}</div>
        <h3 className="text-lg font-bold text-teal-800 mb-1">{badgeLevel}</h3>
        <p className="text-xs text-gray-600 px-4 leading-relaxed font-medium">{badgeText}</p>
      </div>

      {/* Module Breakdown Table */}
      <div className="overflow-hidden border border-gray-100 rounded-lg shadow-sm mb-6 text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
              <th className="p-3">Module Name</th>
              <th className="p-3 text-center">Your Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 font-medium text-gray-700">
            <tr>
              <td className="p-3">Module 1: Mystery Object Detective</td>
              <td className="p-3 text-center font-bold text-teal-600">{m1Score} / 5</td>
            </tr>
            <tr>
              <td className="p-3">Module 2: LED Circuit Challenge</td>
              <td className="p-3 text-center font-bold text-orange-600">{m2Score} / 5</td>
            </tr>
            <tr>
              <td className="p-3">Module 3: Scientific Method Race</td>
              <td className="p-3 text-center font-bold text-indigo-600">{m3Score} / 5</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Science Pledge Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
        <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Write your Science Pledge below:</h4>
        <textarea
          value={pledge}
          onChange={(e) => setPledge(e.target.value)}
          rows={3}
          className="w-full p-3 text-xs bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium leading-relaxed"
        />
        <button
          onClick={handleSavePledge}
          className={`w-full mt-3 py-2 text-xs font-bold text-white rounded-md shadow-sm transition-all ${
            isSaved ? "bg-green-600" : "bg-slate-800 hover:bg-slate-900 cursor-pointer"
          }`}
        >
          {isSaved ? "✓ Pledge Saved Successfully!" : "Save My Science Pledge & Celebrate! 🚀"}
        </button>
      </div>

      {/* Kabir Closing Message */}
      <div className="border border-teal-100 bg-teal-50/20 rounded-lg p-4 mb-6 text-xs text-gray-700 italic leading-relaxed">
        "Remember - science is a giant, unending jigsaw puzzle. You have added some pieces today. Keep asking WHY. Keep observing. Keep being curious. The Wonderful World of Science is waiting for you!"
        <span className="block text-right text-[10px] font-bold text-teal-600 mt-1 not-italic">— Scientist Kabir</span>
      </div>

      {/* Action Fleet & Teacher Secret Navigation */}
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => onNavigate(2)}
          className="w-full py-2.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-lg hover:bg-gray-200 transition-colors cursor-pointer text-center"
        >
          Return to Module Map
        </button>

        <button
          onClick={() => onNavigate(7)}
          className="text-[10px] font-medium text-gray-400 hover:text-gray-600 mx-auto underline transition-colors cursor-pointer"
        >
          Teacher View 🔑
        </button>
      </div>

      {/* Mandatory Disclaimer UI and Text */}
      <div className="mt-6 space-y-4 text-center">
        <Disclaimer />
        {/* 💎 FIX: Added exact required disclaimer string for Screen 6 */}
        <p className="text-xs text-gray-400 italic">
          "This app uses a rules-based engine, not a live AI model."
        </p>
      </div>
    </div>
  );
}