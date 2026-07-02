"use client";

import React, { useState } from "react";
import Disclaimer from "./Disclaimer";

interface WelcomeProps {
  onNext: (name: string, team: string) => void;
}

export default function Screen1Welcome({ onNext }: WelcomeProps) {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onNext(name.trim(), team.trim());
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col justify-between min-h-[500px]">
      <div>
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Curiosity Lab Starter Kit - Digital Companion</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Chapter 01 | The Wonderful World of Science | Class 6 Science</p>
        </div>

        {/* Character Intro Box (Teal Border) */}
        <div className="border-2 border-teal-500 bg-teal-50/50 rounded-lg p-4 mb-6">
          <p className="text-gray-700 italic font-medium">
            "Hello, I am Scientist Kabir! I am from Amritsar, Punjab. Science is my favourite adventure - and today, you and I are going to explore the Wonderful World of Science together. Are you ready to be curious?"
          </p>
          <span className="block text-right text-xs font-bold text-teal-600 mt-2">— Scientist Kabir, Curiosity Lab Starter Kit</span>
        </div>

        {/* Intro Text */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Welcome to the game AI Companion for Chapter 01! This digital companion goes with your Curiosity Lab Starter Kit. As you play the 3 kit games, come here to test what you have learned. Answer 15 questions across 3 game modules and earn your badge!
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name: <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your Team Name: <span className="text-gray-400 font-normal">(Optional)</span></label>
            <input
              type="text"
              placeholder="Enter team name"
              value={team}
              onChange={(e) => setTeam(e.target.value)} /* 💎 FIX 1: setTeam add kiya taaki state change ho ske */
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-gray-800"
            />
          </div>

          {/* Start Button */}
          <button
            type="submit"
            disabled={!name.trim()}
            className={`w-full py-3 mt-4 text-white font-bold rounded-lg transition-all duration-300 transform active:scale-95 shadow-md ${
              name.trim() 
                ? "bg-teal-600 hover:bg-teal-700 cursor-pointer animate-pulse" 
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Start the Science Adventure!
          </button>
        </form>
      </div>

      {/* Mandatory Disclaimer UI and Text */}
      <div className="mt-6 space-y-4 text-center">
        <Disclaimer />
        {/* 💎 FIX 2: Added exact required disclaimer string for Screen 1 */}
        <p className="text-xs text-gray-400 italic">
          "This app uses a rules-based engine, not a live AI model."
        </p>
      </div>
    </div>
  );
}