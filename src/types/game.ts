export interface GameState {
  game_01_name: string;
  game_01_team: string;
  game_01_m1_done: boolean;
  game_01_m1_score: number;
  game_01_m2_done: boolean;
  game_01_m2_score: number;
  game_01_m3_done: boolean;
  game_01_m3_score: number;
  game_01_total_score: number;
  game_01_badge_level: "Curiosity Champion" | "Science Explorer" | "Lab Discoverer" | "";
  game_01_pledge: string;
  game_01_completed_date: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  explanation: string;
}