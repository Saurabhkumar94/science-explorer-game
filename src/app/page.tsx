"use client";

import React, { useState, useEffect } from "react";
import Screen1Welcome from "../components/Screen1Welcome";
import Screen2ModuleMap from "../components/Screen2ModuleMap";
import Screen3Module1 from "../components/Screen3Module1";
import Screen4Module2 from "../components/Screen4Module2";
import Screen5Module3 from "../components/Screen5Module3";
import Screen6Results from "../components/Screen6Results";
import Screen7Teacher from "../components/Screen7Teacher";

export default function Home() {
  // --- Central Application States ---
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [team, setTeam] = useState<string>("");

  // Modules tracking states
  const [m1Done, setM1Done] = useState<boolean>(false);
  const [m1Score, setM1Score] = useState<number>(0);

  const [m2Done, setM2Done] = useState<boolean>(false);
  const [m2Score, setM2Score] = useState<number>(0);

  const [m3Done, setM3Done] = useState<boolean>(false);
  const [m3Score, setM3Score] = useState<number>(0);

  // --- Hydro-hydration Protection / Load localStorage on Mount ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("game_01_name") || "";
      const savedTeam = localStorage.getItem("game_01_team") || "";
      
      const savedM1Done = localStorage.getItem("game_01_m1_done") === "true";
      const savedM1Score = Number(localStorage.getItem("game_01_m1_score") || "0");

      const savedM2Done = localStorage.getItem("game_01_m2_done") === "true";
      const savedM2Score = Number(localStorage.getItem("game_01_m2_score") || "0");

      const savedM3Done = localStorage.getItem("game_01_m3_done") === "true";
      const savedM3Score = Number(localStorage.getItem("game_01_m3_score") || "0");

      // Agar user ne pehle hi naam save kiya hua hai, toh seedhe Module Map par bhejein
      if (savedName) {
        setName(savedName);
        setTeam(savedTeam);
        setCurrentScreen(2);
      }

      setM1Done(savedM1Done);
      setM1Score(savedM1Score);
      setM2Done(savedM2Done);
      setM2Score(savedM2Score);
      setM3Done(savedM3Done);
      setM3Score(savedM3Score);
    }
  }, []);

  // --- Handlers to Move Screens & Update Storage ---
  const handleWelcomeComplete = (studentName: string, studentTeam: string) => {
    setName(studentName);
    setTeam(studentTeam);
    localStorage.setItem("game_01_name", studentName);
    localStorage.setItem("game_01_team", studentTeam);
    setCurrentScreen(2); // Move to Screen 2 (Module Map)
  };

  const handleModule1Complete = (score: number) => {
    setM1Score(score);
    setM1Done(true);
    localStorage.setItem("game_01_m1_done", "true");
    localStorage.setItem("game_01_m1_score", String(score));
    setCurrentScreen(2); // Wapas Map par bhejhein
  };

  const handleModule2Complete = (score: number) => {
    setM2Score(score);
    setM2Done(true);
    localStorage.setItem("game_01_m2_done", "true");
    localStorage.setItem("game_01_m2_score", String(score));
    setCurrentScreen(2);
  };

  const handleModule3Complete = (score: number) => {
    setM3Score(score);
    setM3Done(true);
    localStorage.setItem("game_01_m3_done", "true");
    localStorage.setItem("game_01_m3_score", String(score));
    setCurrentScreen(2);
  };

  const handleNavigation = (screenId: number) => {
    setCurrentScreen(screenId);
  };

  // --- Conditional Rendering Loop ---
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
      {currentScreen === 1 && (
        <Screen1Welcome onNext={handleWelcomeComplete} />
      )}

      {currentScreen === 2 && (
        <Screen2ModuleMap
          name={name}
          team={team} /* 💎 Added team state */
          m1Done={m1Done}
          m1Score={m1Score}
          m2Done={m2Done}
          m2Score={m2Score}
          m3Done={m3Done}
          m3Score={m3Score}
          onNavigate={handleNavigation}
        />
      )}

      {currentScreen === 3 && (
        <Screen3Module1 
          onComplete={handleModule1Complete} 
          onBack={() => setCurrentScreen(2)} 
        />
      )}

      {currentScreen === 4 && (
        <Screen4Module2 
          onComplete={handleModule2Complete} 
          onBack={() => setCurrentScreen(2)} 
        />
      )}

      {currentScreen === 5 && (
        <Screen5Module3 
          onComplete={handleModule3Complete} 
          onBack={() => setCurrentScreen(2)} 
        />
      )}

      {currentScreen === 6 && (
        <Screen6Results
          name={name}
          team={team} /* 💎 Added team state */
          m1Score={m1Score}
          m2Score={m2Score}
          m3Score={m3Score}
          onNavigate={handleNavigation}
        />
      )}

      {currentScreen === 7 && (
        <Screen7Teacher 
          team={team} /* 💎 Added team state */
          onBack={() => setCurrentScreen(6)} 
        />
      )}
    </main>
  );
}