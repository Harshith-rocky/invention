import { useState, useEffect } from 'react';
import { User, UserProgress, UserStats, GameScore } from '../types';

export const useUserData = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 12847,
    onlineUsers: 234,
    todayLogins: 1456,
    totalGamesPlayed: 45623,
    averageScore: 78
  });

  useEffect(() => {
    // Load current user from localStorage
    const savedUser = localStorage.getItem('inventindia_current_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      loadUserProgress(user.id);
    }

    // Update user stats periodically
    updateUserStats();
    const interval = setInterval(updateUserStats, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const loadUserProgress = (userId: string) => {
    const savedProgress = localStorage.getItem(`inventindia_progress_${userId}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      // Convert date strings back to Date objects
      progress.lastPlayDate = new Date(progress.lastPlayDate);
      progress.gameScores = progress.gameScores.map((score: any) => ({
        ...score,
        date: new Date(score.date)
      }));
      progress.cardsCollected = progress.cardsCollected.map((card: any) => ({
        ...card,
        dateUnlocked: card.dateUnlocked ? new Date(card.dateUnlocked) : undefined
      }));
      setUserProgress(progress);
    } else {
      // Create initial progress
      const initialProgress: UserProgress = {
        userId,
        level: 1,
        totalPoints: 0,
        cardsCollected: [],
        achievementsUnlocked: [],
        gamesCompleted: 0,
        inventionsDiscovered: [],
        gameScores: [],
        streakDays: 0,
        lastPlayDate: new Date()
      };
      setUserProgress(initialProgress);
      saveUserProgress(initialProgress);
    }
  };

  const saveUserProgress = (progress: UserProgress) => {
    localStorage.setItem(`inventindia_progress_${progress.userId}`, JSON.stringify(progress));
    setUserProgress(progress);
  };

  const updateUserStats = () => {
    // Simulate real-time stats updates
    setUserStats(prev => ({
      ...prev,
      onlineUsers: Math.max(150, prev.onlineUsers + Math.floor(Math.random() * 10) - 5),
      todayLogins: prev.todayLogins + Math.floor(Math.random() * 3),
      totalGamesPlayed: prev.totalGamesPlayed + Math.floor(Math.random() * 5)
    }));
  };

  const addGameScore = (score: Omit<GameScore, 'id' | 'userId' | 'date'>) => {
    if (!currentUser || !userProgress) return;

    const newScore: GameScore = {
      ...score,
      id: Date.now().toString(),
      userId: currentUser.id,
      date: new Date()
    };

    const updatedProgress: UserProgress = {
      ...userProgress,
      gameScores: [...userProgress.gameScores, newScore],
      totalPoints: userProgress.totalPoints + score.score,
      gamesCompleted: userProgress.gamesCompleted + 1,
      lastPlayDate: new Date(),
      level: Math.floor((userProgress.totalPoints + score.score) / 1000) + 1
    };

    saveUserProgress(updatedProgress);
    
    // Update global stats
    setUserStats(prev => ({
      ...prev,
      totalGamesPlayed: prev.totalGamesPlayed + 1,
      averageScore: Math.round(((prev.averageScore * (prev.totalGamesPlayed - 1)) + score.score) / prev.totalGamesPlayed)
    }));
  };

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('inventindia_current_user', JSON.stringify(user));
    loadUserProgress(user.id);
    
    // Update stats
    setUserStats(prev => ({
      ...prev,
      totalUsers: prev.totalUsers + 1,
      onlineUsers: prev.onlineUsers + 1,
      todayLogins: prev.todayLogins + 1
    }));
  };

  const logout = () => {
    if (currentUser) {
      setUserStats(prev => ({
        ...prev,
        onlineUsers: Math.max(0, prev.onlineUsers - 1)
      }));
    }
    
    setCurrentUser(null);
    setUserProgress(null);
    localStorage.removeItem('inventindia_current_user');
  };

  return {
    currentUser,
    userProgress,
    userStats,
    login,
    logout,
    addGameScore,
    saveUserProgress
  };
};