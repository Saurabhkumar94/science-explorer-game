"use client";

import React, { useEffect, useState } from "react";
import Disclaimer from "./Disclaimer";

interface TeacherProps {
  team: string; // 💎 Added team to props definition
  onBack: () => void;
}

export default function Screen7Teacher({ team, onBack }: TeacherProps) {
  const [studentData, setStudentData] = useState({
    name: "",
    team: "",
    totalScore: 0,
    badgeLevel: "",
    m1Score: 0,
    m2Score: 0,
    m3Score: 0,
    pledge: "",
    completedDate: ""
  });

  // LocalStorage se automatic report fetch logic
  useEffect(() => {
    if (typeof window !== "undefined") {
      setStudentData({
        name: localStorage.getItem("game_01_name") || "N/A",
        team: localStorage.getItem("game_01_team") || team || "Not Provided", // 💎 Fallback to prop if storage is slow
        totalScore: Number(localStorage.getItem("game_01_total_score") || "0"),
        badgeLevel: localStorage.getItem("game_01_badge_level") || "No Badge Earned",
        m1Score: Number(localStorage.getItem("game_01_m1_score") || "0"),
        m2Score: Number(localStorage.getItem("game_01_m2_score") || "0"),
        m3Score: Number(localStorage.getItem("game_01_m3_score") || "0"),
        pledge: localStorage.getItem("game_01_pledge") || "No pledge submitted yet.",
        completedDate: localStorage.getItem("game_01_completed_date") || ""
      });
    }
  }, [team]);

  // Action suggestions matrix dynamically mapping according to the score bands
  let actionPlan = { extend: "", consolidate: "", support: "" };
  if (studentData.totalScore >= 13) {
    actionPlan = { extend: "Extend: Ask student to design their own experiment for homework", consolidate: "N/A", support: "N/A" };
  } else if (studentData.totalScore >= 9) {
    actionPlan = { extend: "N/A", consolidate: "Consolidate: Review the 5 steps of scientific method together", support: "N/A" };
  } else {
    actionPlan = { extend: "N/A", consolidate: "N/A", support: "Support: Re-do LED circuit with direct teacher guidance; revisit step sequence" };
  }

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md border border-gray-200 print:shadow-none print:border-none">
      {/* Top action block that hides automatically on Printing */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="text-xl font-bold text-gray-800">Teacher Dashboard - Chapter 01 Results Summary</h1>
        <button onClick={onBack} className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors cursor-pointer">
          ← Back to Results
        </button>
      </div>

      {/* Print only header metadata block */}
      <div className="hidden print:block text-center mb-6">
        <h1 className="text-2xl font-bold border-b pb-2">Curiosity Lab Starter Kit - Assessment Evaluation Report</h1>
        <p className="text-xs text-gray-500 mt-1">Generated System Log Date: {studentData.completedDate ? new Date(studentData.completedDate).toLocaleString() : "N/A"}</p>
      </div>

      {/* Profile Metrics Matrix layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-xs">
        <div className="bg-gray-50 p-3 rounded border border-gray-100">
          <span className="block text-gray-400 font-bold uppercase tracking-wider mb-0.5">Student Name</span>
          <span className="font-bold text-gray-800 text-sm">{studentData.name}</span>
        </div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100">
          <span className="block text-gray-400 font-bold uppercase tracking-wider mb-0.5">Team Assignment</span>
          <span className="font-bold text-gray-800 text-sm">{studentData.team}</span>
        </div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100">
          <span className="block text-gray-400 font-bold uppercase tracking-wider mb-0.5">Calculated Score</span>
          <span className="font-bold text-teal-600 text-sm">{studentData.totalScore} / 15</span>
        </div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100">
          <span className="block text-gray-400 font-bold uppercase tracking-wider mb-0.5">Earned Badge</span>
          <span className="font-bold text-indigo-700 text-sm">{studentData.badgeLevel}</span>
        </div>
      </div>

      {/* Core Breakdown Metrics Table */}
      <div className="overflow-hidden border border-gray-200 rounded-lg mb-6 text-xs shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 font-bold text-gray-600">
              <th className="p-3">Module Evaluated</th>
              <th className="p-3">Physical Lab Game Tracked</th>
              <th className="p-3 text-center">Final Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
            <tr>
              <td className="p-3 font-semibold text-teal-600">Module 1</td>
              <td className="p-3">Mystery Object Detective</td>
              <td className="p-3 text-center font-bold">{studentData.m1Score} / 5</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-orange-600">Module 2</td>
              <td className="p-3">LED Circuit Challenge</td>
              <td className="p-3 text-center font-bold">{studentData.m2Score} / 5</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-indigo-600">Module 3</td>
              <td className="p-3">Scientific Method Race</td>
              <td className="p-3 text-center font-bold">{studentData.m3Score} / 5</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Science Pledge text audit segment */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 text-xs">
        <h3 className="font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Submitted Science Pledge:</h3>
        <p className="italic text-gray-600 font-medium leading-relaxed">"{studentData.pledge}"</p>
      </div>

      {/* Action Plan Suggestions Box */}
      <div className="border border-amber-200 bg-amber-50/20 rounded-lg p-4 mb-6 text-xs">
        <h3 className="font-bold text-amber-800 mb-2 uppercase tracking-wide">Suggested Pedagogical Follow-up Action:</h3>
        <p className="font-semibold text-gray-800">
          {actionPlan.extend !== "N/A" && actionPlan.extend}
          {actionPlan.consolidate !== "N/A" && actionPlan.consolidate}
          {actionPlan.support !== "N/A" && actionPlan.support}
        </p>
      </div>

      {/* Interactive Trigger for native Window Print layer */}
      <button
        onClick={() => window.print()}
        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-md transition-all cursor-pointer text-center print:hidden"
      >
        Print This Summary 🖨️
      </button>

      {/* Mandatory Disclaimer UI and Text */}
      <div className="mt-6 space-y-4 text-center">
        <Disclaimer />
        {/* 💎 FIX: Added exact required disclaimer string for Screen 7 */}
        <p className="text-xs text-gray-400 italic print:block">
          "This app uses a rules-based engine, not a live AI model."
        </p>
      </div>
    </div>
  );
}