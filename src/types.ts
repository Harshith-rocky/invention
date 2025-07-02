export type Language = 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta' | 'gu' | 'kn' | 'ml' | 'or';

export interface Invention {
  id: string;
  name: string;
  description: string;
  inventor: string;
  year: number;
  location: string;
  coordinates?: [number, number];
  category: string;
  significance: string;
  imageUrl?: string;
  wikiUrl?: string;
  region?: string;
  timeline?: string;
  story?: string;
  challenges?: string[];
  modernRelevance?: string;
}

export interface GameQuestion {
  id: string;
  question: string;
  clues: string[];
  answer: string;
  invention: Invention;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface WhatIfScenario {
  id: string;
  title: string;
  description: string;
  invention: Invention;
  alternativeOutcome: string;
  rippleEffects: string[];
  newspaperHeadline?: string;
}

export interface BuildingComponent {
  id: string;
  name: string;
  type: 'foundation' | 'structure' | 'decoration' | 'mechanism';
  position: { x: number; y: number };
  isPlaced: boolean;
  isCorrect?: boolean;
}

export interface InventionChallenge {
  id: string;
  prompt: string;
  era: string;
  constraints: string[];
  examples: string[];
}

export interface CollectibleCard {
  id: string;
  invention: Invention;
  rarity: 'common' | 'rare' | 'legendary';
  unlocked: boolean;
  dateUnlocked?: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  joinDate: Date;
  lastLogin: Date;
  isOnline: boolean;
}

export interface GameScore {
  id: string;
  userId: string;
  gameType: 'discovery' | 'build' | 'whatif' | 'chat' | 'timeline' | 'challenge';
  score: number;
  maxScore: number;
  completionTime: number; // in seconds
  date: Date;
  difficulty?: string;
  details?: any;
}

export interface UserProgress {
  userId: string;
  level: number;
  totalPoints: number;
  cardsCollected: CollectibleCard[];
  achievementsUnlocked: string[];
  gamesCompleted: number;
  inventionsDiscovered: string[];
  gameScores: GameScore[];
  streakDays: number;
  lastPlayDate: Date;
}

export interface UserStats {
  totalUsers: number;
  onlineUsers: number;
  todayLogins: number;
  totalGamesPlayed: number;
  averageScore: number;
}