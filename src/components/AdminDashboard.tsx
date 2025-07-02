import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Trophy, Calendar, Download, Filter, Search, BarChart3 } from 'lucide-react';
import { User, GameScore, UserProgress } from '../types';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalGames: number;
  averageScore: number;
  topPerformers: Array<{
    user: User;
    totalScore: number;
    gamesPlayed: number;
  }>;
  gameTypeStats: Record<string, {
    totalPlayed: number;
    averageScore: number;
    topScore: number;
  }>;
  dailyStats: Array<{
    date: string;
    newUsers: number;
    gamesPlayed: number;
    averageScore: number;
  }>;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<Array<{
    user: User;
    progress: UserProgress;
  }>>([]);

  useEffect(() => {
    loadAdminStats();
    loadUsers();
  }, [selectedPeriod]);

  const loadAdminStats = () => {
    const users = JSON.parse(localStorage.getItem('inventindia_users') || '[]');
    const allScores: GameScore[] = [];
    const userStats: Array<{ user: User; totalScore: number; gamesPlayed: number }> = [];
    const gameTypeStats: Record<string, { totalPlayed: number; averageScore: number; topScore: number }> = {};

    users.forEach((user: User) => {
      const progressData = localStorage.getItem(`inventindia_progress_${user.id}`);
      if (progressData) {
        const progress = JSON.parse(progressData);
        const scores = progress.gameScores || [];
        
        // Filter by period
        let filteredScores = scores;
        if (selectedPeriod !== 'all') {
          const cutoffDate = new Date();
          if (selectedPeriod === 'week') {
            cutoffDate.setDate(cutoffDate.getDate() - 7);
          } else if (selectedPeriod === 'month') {
            cutoffDate.setMonth(cutoffDate.getMonth() - 1);
          }
          filteredScores = scores.filter((score: GameScore) => new Date(score.date) >= cutoffDate);
        }

        allScores.push(...filteredScores);
        
        if (filteredScores.length > 0) {
          const totalScore = filteredScores.reduce((sum: number, score: GameScore) => sum + score.score, 0);
          userStats.push({
            user,
            totalScore,
            gamesPlayed: filteredScores.length
          });
        }

        // Game type statistics
        filteredScores.forEach((score: GameScore) => {
          if (!gameTypeStats[score.gameType]) {
            gameTypeStats[score.gameType] = {
              totalPlayed: 0,
              averageScore: 0,
              topScore: 0
            };
          }
          gameTypeStats[score.gameType].totalPlayed++;
          gameTypeStats[score.gameType].topScore = Math.max(gameTypeStats[score.gameType].topScore, score.score);
        });
      }
    });

    // Calculate averages for game types
    Object.keys(gameTypeStats).forEach(gameType => {
      const gameScores = allScores.filter(score => score.gameType === gameType);
      if (gameScores.length > 0) {
        gameTypeStats[gameType].averageScore = Math.round(
          gameScores.reduce((sum, score) => sum + score.score, 0) / gameScores.length
        );
      }
    });

    // Sort top performers
    userStats.sort((a, b) => b.totalScore - a.totalScore);

    const adminStats: AdminStats = {
      totalUsers: users.length,
      activeUsers: userStats.length,
      totalGames: allScores.length,
      averageScore: allScores.length > 0 ? Math.round(allScores.reduce((sum, score) => sum + score.score, 0) / allScores.length) : 0,
      topPerformers: userStats.slice(0, 10),
      gameTypeStats,
      dailyStats: generateDailyStats(allScores)
    };

    setStats(adminStats);
  };

  const loadUsers = () => {
    const users = JSON.parse(localStorage.getItem('inventindia_users') || '[]');
    const usersWithProgress = users.map((user: User) => {
      const progressData = localStorage.getItem(`inventindia_progress_${user.id}`);
      const progress = progressData ? JSON.parse(progressData) : null;
      return { user, progress };
    }).filter((item: any) => item.progress);

    setFilteredUsers(usersWithProgress);
  };

  const generateDailyStats = (scores: GameScore[]) => {
    const dailyData: Record<string, { gamesPlayed: number; totalScore: number; count: number }> = {};
    
    scores.forEach(score => {
      const date = new Date(score.date).toISOString().split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = { gamesPlayed: 0, totalScore: 0, count: 0 };
      }
      dailyData[date].gamesPlayed++;
      dailyData[date].totalScore += score.score;
      dailyData[date].count++;
    });

    return Object.entries(dailyData)
      .map(([date, data]) => ({
        date,
        newUsers: 0, // This would need to be calculated from user join dates
        gamesPlayed: data.gamesPlayed,
        averageScore: Math.round(data.totalScore / data.count)
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 7);
  };

  const exportData = () => {
    if (!stats) return;

    const exportData = {
      stats,
      users: filteredUsers,
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `inventindia-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getGameTypeLabel = (gameType: string) => {
    const labels: Record<string, string> = {
      discovery: 'Discovery Quest',
      build: 'Build It Right',
      whatif: 'What-If Sandbox',
      chat: 'Inventor Chat',
      timeline: 'Timeline Hunt',
      challenge: 'Invent Challenge'
    };
    return labels[gameType] || gameType;
  };

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor user activity and game performance</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
          
          <motion.button
            onClick={exportData}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="h-5 w-5" />
            <span>Export Data</span>
          </motion.button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-8 w-8 text-blue-600" />
            <h3 className="font-semibold text-gray-800">Total Users</h3>
          </div>
          <div className="text-3xl font-bold text-gray-800">{stats.totalUsers}</div>
          <div className="text-sm text-gray-600">Active: {stats.activeUsers}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Trophy className="h-8 w-8 text-yellow-600" />
            <h3 className="font-semibold text-gray-800">Total Games</h3>
          </div>
          <div className="text-3xl font-bold text-gray-800">{stats.totalGames}</div>
          <div className="text-sm text-gray-600">Avg Score: {stats.averageScore}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <h3 className="font-semibold text-gray-800">Engagement</h3>
          </div>
          <div className="text-3xl font-bold text-gray-800">
            {stats.totalUsers > 0 ? Math.round((stats.totalGames / stats.totalUsers) * 10) / 10 : 0}
          </div>
          <div className="text-sm text-gray-600">Games per user</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="h-8 w-8 text-purple-600" />
            <h3 className="font-semibold text-gray-800">Top Score</h3>
          </div>
          <div className="text-3xl font-bold text-gray-800">
            {stats.topPerformers.length > 0 ? stats.topPerformers[0].totalScore : 0}
          </div>
          <div className="text-sm text-gray-600">
            {stats.topPerformers.length > 0 ? stats.topPerformers[0].user.username : 'No data'}
          </div>
        </motion.div>
      </div>

      {/* Game Type Performance */}
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Game Performance</h3>
          <div className="space-y-4">
            {Object.entries(stats.gameTypeStats).map(([gameType, data]) => (
              <div key={gameType} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-semibold text-gray-800">{getGameTypeLabel(gameType)}</h4>
                  <p className="text-sm text-gray-600">{data.totalPlayed} games played</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-600">{data.averageScore}</div>
                  <div className="text-sm text-gray-600">Avg Score</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Top Performers</h3>
          <div className="space-y-3">
            {stats.topPerformers.slice(0, 5).map((performer, index) => (
              <div key={performer.user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{performer.user.username}</h4>
                    <p className="text-sm text-gray-600">{performer.gamesPlayed} games</p>
                  </div>
                </div>
                <div className="text-lg font-bold text-purple-600">
                  {performer.totalScore.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* User Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">User Management</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">User</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Join Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Level</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Total Points</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Games Played</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers
                .filter(item => 
                  item.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.user.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .slice(0, 10)
                .map((item) => (
                  <tr key={item.user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-semibold text-gray-800">{item.user.username}</div>
                        <div className="text-sm text-gray-600">{item.user.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(item.user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        Level {item.progress.level}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800">
                      {item.progress.totalPoints.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {item.progress.gamesCompleted}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(item.progress.lastPlayDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;