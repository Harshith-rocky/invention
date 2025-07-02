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

export interface UserProgress {
  level: number;
  totalPoints: number;
  cardsCollected: CollectibleCard[];
  achievementsUnlocked: string[];
  gamesCompleted: number;
  inventionsDiscovered: string[];
}