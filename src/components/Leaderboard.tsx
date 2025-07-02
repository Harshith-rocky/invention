import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Star, TrendingUp, Users, Crown, Award, Target } from 'lucide-react';
import { User, GameScore } from '../types';

interface LeaderboardEntry {
  user: User;
  totalScore: number;
  gamesPlayed: number;
  averageScore: number;
  rank: number;
}

interface LeaderboardProps {
  currentUser?: User;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ currentUser }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | 'week' | 'month'>('all');
  const [selectedGame, setSelectedGame] = useState<'all' | string>('all');

  useEffect(() => {
    loadLeaderboard();
  }, [selectedPeriod, selectedGame]);

  const loadLeaderboard = () => {
    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('inventindia_users') || '[]');
    const leaderboardData: LeaderboardEntry[] = [];

    users.forEach((user: User) => {
      const progressData = localStorage.getItem(`inventindia_progress_${user.id}`);
      if (progressData) {
        const progress = JSON.parse(progressData);
        let scores = progress.gameScores || [];

        // Filter by time period
        if (selectedPeriod !== 'all') {
          const now = new Date();
          const cutoffDate = new Date();
          if (selectedPeriod === 'week') {
            cutoffDate.setDate(now.getDate() - 7);
          } else if (selectedPeriod === 'month') {
            cutoffDate.setMonth(now.getMonth() - 1);
          }
          scores = scores.filter((score: GameScore) => new Date(score.date) >= cutoffDate);
        }

        // Filter by game type
        if (selectedGame !== 'all') {
          scores = scores.filter((score: GameScore) => score.gameType === selectedGame);
        }

        if (scores.length > 0) {
          const totalScore = scores.reduce((sum: number, score: GameScore) => sum + score.score, 0);
          const averageScore = Math.round(totalScore / scores.length);

          leaderboardData.push({
            user,
            totalScore,
            gamesPlayed: scores.length,
            averageScore,
            rank: 0
          });
        }
      }
    });

    // Sort by total score and assign ranks
    leaderboardData.sort((a, b) => b.totalScore - a.totalScore);
    leaderboardData.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    setLeaderboard(leaderboardData);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-orange-500" />;
      default: return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-orange-400 to-orange-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  const gameTypes = [
    { id: 'all', label: 'All Games' },
    { id: 'discovery', label: 'Discovery Quest' },
    { id: 'build', label: 'Build It Right' },
    { id: 'timeline', label: 'Timeline Hunt' },
    { id: 'whatif', label: 'What-If Sandbox' },
    { id: 'chat', label: 'Inventor Chat' },
    { id: 'challenge', label: 'Invent Challenge' }
  ];

  const periods = [
    { id: 'all', label: 'All Time' },
    { id: 'month', label: 'This Month' },
    { id: 'week', label: 'This Week' }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Trophy className="h-8 w-8" />
          <h2 className="text-3xl font-bold">Leaderboard</h2>
        </div>
        <p className="opacity-90">See how you rank against other explorers!</p>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {periods.map(period => (
                <option key={period.id} value={period.id}>{period.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Game Type</label>
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {gameTypes.map(game => (
                <option key={game.id} value={game.id}>{game.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="p-6">
        {leaderboard.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Data Available</h3>
            <p className="text-gray-500">No scores found for the selected criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leaderboard.slice(0, 10).map((entry, index) => (
              <motion.div
                key={entry.user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  currentUser?.id === entry.user.id
                    ? 'border-purple-300 bg-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-purple-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getRankColor(entry.rank)} rounded-full flex items-center justify-center`}>
                      {getRankIcon(entry.rank)}
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                        <span>{entry.user.username}</span>
                        {currentUser?.id === entry.user.id && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">You</span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {entry.gamesPlayed} games played • Avg: {entry.averageScore} pts
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">
                      {entry.totalScore.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Points</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Current User Position (if not in top 10) */}
        {currentUser && leaderboard.length > 10 && (
          (() => {
            const userEntry = leaderboard.find(entry => entry.user.id === currentUser.id);
            if (userEntry && userEntry.rank > 10) {
              return (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-600 mb-3">Your Position:</h4>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl border-2 border-purple-300 bg-purple-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-white">#{userEntry.rank}</span>
                        </div>
                        
                        <div>
                          <h3 className="font-bold text-gray-800">{userEntry.user.username} (You)</h3>
                          <p className="text-sm text-gray-600">
                            {userEntry.gamesPlayed} games played • Avg: {userEntry.averageScore} pts
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">
                          {userEntry.totalScore.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Total Points</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            }
            return null;
          })()
        )}
      </div>
    </div>
  );
};

export default Leaderboard;