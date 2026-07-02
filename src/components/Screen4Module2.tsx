"use client";

import React, { useState } from "react";
import { quizQuestions } from "@/data/questions";
import Disclaimer from "./Disclaimer";

interface QuizProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function Screen4Module2({ onComplete, onBack }: QuizProps) {
  const questions = quizQuestions.slice(5, 10); // Q6 to Q10
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [shakingId, setShakingId] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<{ [key: number]: boolean }>({});

  const handleSelect = (qId: number, optionLetter: string, correctLetter: string) => {
    if (answers[qId]) return;

    setAnswers(prev => ({ ...prev, [qId]: optionLetter }));
    setShowFeedback(prev => ({ ...prev, [qId]: true }));

    if (optionLetter !== correctLetter) {
      setShakingId(qId);
      setTimeout(() => setShakingId(null), 400);
    }
  };

  const isModuleDone = Object.keys(answers).length === 5;
  const score = questions.reduce((acc, q) => acc + (answers[q.id] === q.correctAnswer ? 1 : 0), 0);

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-orange-700">Module 2 - LED Circuit Challenge</h1>
        <button onClick={onBack} className="text-sm font-semibold text-gray-500 hover:text-gray-700">← Back</button>
      </div>
      <p className="text-xs text-gray-500 mb-4 font-medium">Before answering, complete Game 2 with your kit! Build the CR2032 + LED circuit using copper tape. Record your hypothesis BEFORE connecting, then test it.[cite: 1]</p>

      {/* Schematic Circuit Reminder Box */}
      <div className="border-2 border-orange-500 bg-orange-50/50 font-mono rounded-lg p-3 mb-6 text-[11px] text-gray-700 whitespace-pre leading-relaxed">
{`CR2032 Coin Cell (3V)
FLAT FACE = (+) positive | RIM EDGE = (-) negative

Copper tape (+) --> [LONG LEG] LED [SHORT LEG] <-- Copper tape (-)
Result: LED GLOWS = Hypothesis CONFIRMED![cite: 1]`}
        <div className="mt-2 font-sans text-xs italic text-orange-800 font-semibold">
          Remember: LONGER leg of LED = positive (+). SHORTER leg = negative (-). CR2032 is 3V and completely safe.[cite: 1]
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.correctAnswer;
          const isShaking = shakingId === q.id;

          return (
            <div key={q.id} className={`p-4 rounded-lg border transition-all ${isShaking ? "animate-shake border-red-300 bg-red-50/30" : "border-gray-100 bg-gray-50/40"}`}>
              <h3 className="font-semibold text-sm text-gray-800 mb-2">{q.id}. {q.question}</h3>
              <div className="grid grid-cols-1 gap-2">
                {q.options.map((opt) => {
                  const letter = opt.charAt(0);
                  const isCurrentOpt = selected === letter;
                  let optStyle = "border-gray-200 bg-white hover:bg-gray-50";

                  if (selected) {
                    if (letter === q.correctAnswer) optStyle = "border-green-500 bg-green-50 text-green-700 font-semibold";
                    else if (isCurrentOpt && !isCorrect) optStyle = "border-red-500 bg-red-50 text-red-700";
                  }

                  return (
                    <button
                      key={opt}
                      disabled={!!selected}
                      onClick={() => handleSelect(q.id, letter, q.correctAnswer)}
                      className={`text-left px-3 py-2 text-xs rounded-md border transition-all ${optStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {showFeedback[q.id] && (
                <div className="mt-2 text-xs font-medium">
                  {isCorrect ? (
                    <span className="text-green-600">✓ Correct! {q.explanation}</span>
                  ) : (
                    /* 💎 FIX 1: Double quotes hataye exact required format ke liye */
                    <span className="text-red-600">Give it another look! {q.hint}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isModuleDone && (
        <button
          onClick={() => onComplete(score)}
          className="w-full mt-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow transition-all cursor-pointer text-sm"
        >
          Submit Module 2 Answers (Score: {score}/5)
        </button>
      )}
      
      {/* Mandatory Disclaimer UI and Text */}
      <div className="mt-6 space-y-4 text-center">
        <Disclaimer />
        {/* 💎 FIX 2: Added exact required disclaimer string for Screen 4 */}
        <p className="text-xs text-gray-400 italic">
          "This app uses a rules-based engine, not a live AI model."
        </p>
      </div>
    </div>
  );
}