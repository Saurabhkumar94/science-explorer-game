"use client";

import React from "react";
import Disclaimer from "./Disclaimer";

interface ModuleMapProps {
  name: string;
  team: string; // 💎 Added team to props definition
  m1Done: boolean;
  m1Score: number;
  m2Done: boolean;
  m2Score: number;
  m3Done: boolean;
  m3Score: number;
  onNavigate: (screenId: number) => void;
}

export default function Screen2ModuleMap({
  name,
  team, // 💎 Destructured team prop
  m1Done,
  m1Score,
  m2Done,
  m2Score,
  m3Done,
  m3Score,
  onNavigate,
}: ModuleMapProps) {
  // Total answered questions calculation
  const totalAnswered = (m1Done ? 5 : 0) + (m2Done ? 5 : 0) + (m3Done ? 5 : 0);
  const allCompleted = m1Done && m2Done && m3Done;

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col justify-between min-h-[550px]">
      <div>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Your Science Journey</h1>
          {/* 💎 FIX 1: Displaying Student Name along with Team Name if available */}
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Hello, <span className="text-teal-600 font-bold">{name}</span>! 
            {team && <span> Team: <span className="text-emerald-600 font-bold">{team}</span></span>} Welcome back to your hub.
          </p>
        </div>

        {/* Dynamic Progress Bar Animation */}
        <div className="bg-gray-100 rounded-full h-4 w-full mb-6 relative overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full transition-all duration-700 ease-out rounded-full"
            style={{ width: `${(totalAnswered / 15) * 100}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-700">
            {totalAnswered} / 15 Questions Answered
          </span>
        </div>

        {/* Instruction Note */}
        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border-l-4 border-amber-500 mb-6">
          Play a kit game first, then return here to answer the questions for that module. You can complete the modules in any order!
        </p>

        {/* Modules Grid Table */}
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700 text-xs font-bold border-b border-gray-200">
                <th className="p-3">Module</th>
                <th className="p-3">Game Name</th>
                <th className="p-3 text-center">Questions</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-gray-700 divide-y divide-gray-100">
              {/* Module 1 Card */}
              <tr className="hover:bg-gray-50/80 transition-colors">
                <td className="p-3 text-teal-600 font-semibold">Module 1</td>
                <td className="p-3">Mystery Object Detective</td>
                <td className="p-3 text-center">Q1-5</td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-1 text-xs rounded-full font-bold transition-all duration-300 ${m1Done ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                    {m1Done ? `Done (${m1Score}/5)` : "Pending"}
                  </span>
                </td>
              </tr>
              {/* Module 2 Card */}
              <tr className="hover:bg-gray-50/80 transition-colors">
                <td className="p-3 text-orange-600 font-semibold">Module 2</td>
                <td className="p-3">LED Circuit Challenge</td>
                <td className="p-3 text-center">Q6-10</td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-1 text-xs rounded-full font-bold transition-all duration-300 ${m2Done ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                    {m2Done ? `Done (${m2Score}/5)` : "Pending"}
                  </span>
                </td>
              </tr>
              {/* Module 3 Card */}
              <tr className="hover:bg-gray-50/80 transition-colors">
                <td className="p-3 text-indigo-600 font-semibold">Module 3</td>
                <td className="p-3">Scientific Method Race</td>
                <td className="p-3 text-center">Q11-15</td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-1 text-xs rounded-full font-bold transition-all duration-300 ${m3Done ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                    {m3Done ? `Done (${m3Score}/5)` : "Pending"}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Buttons Fleet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => onNavigate(3)}
            className="px-4 py-2 text-sm bg-teal-50 border border-teal-200 text-teal-700 rounded-lg font-bold hover:bg-teal-100 transition-all hover:scale-[1.02] shadow-sm cursor-pointer"
          >
            Play Module 1
          </button>
          <button
            onClick={() => onNavigate(4)}
            className="px-4 py-2 text-sm bg-orange-50 border border-orange-200 text-orange-700 rounded-lg font-bold hover:bg-orange-100 transition-all hover:scale-[1.02] shadow-sm cursor-pointer"
          >
            Play Module 2
          </button>
          <button
            onClick={() => onNavigate(5)}
            className="px-4 py-2 text-sm bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg font-bold hover:bg-indigo-100 transition-all hover:scale-[1.02] shadow-sm cursor-pointer"
          >
            Play Module 3
          </button>
        </div>

        {/* Final Results Submission Link */}
        {allCompleted && (
          <button
            onClick={() => onNavigate(6)}
            className="w-full py-3 mt-6 text-white font-bold bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all transform active:scale-95 text-center cursor-pointer"
          >
            See My Results! 🎉
          </button>
        )}
      </div>

      {/* Mandatory Disclaimer UI and Text */}
      <div className="mt-6 space-y-4 text-center">
        <Disclaimer />
        {/* 💎 FIX 2: Added exact required disclaimer string for Screen 2 */}
        <p className="text-xs text-gray-400 italic">
          "This app uses a rules-based engine, not a live AI model."
        </p>
      </div>
    </div>
  );
}