import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Trophy, Clock, Star, Target } from 'lucide-react';
import { UserStats as UserStatsType } from '../types';

interface UserStatsProps {
  stats: UserStatsType;
}

const UserStats: React.FC<UserStatsProps> = ({ stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Community Stats</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl"
        >
          <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{stats.totalUsers.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Explorers</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl"
        >
          <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="text-2xl font-bold text-gray-800">{stats.onlineUsers}</div>
          <div className="text-sm text-gray-600">Online Now</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl"
        >
          <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{stats.todayLogins}</div>
          <div className="text-sm text-gray-600">Today's Logins</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl"
        >
          <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{stats.totalGamesPlayed.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Games Played</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl"
        >
          <Star className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{stats.averageScore}</div>
          <div className="text-sm text-gray-600">Average Score</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl"
        >
          <Target className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">
            {Math.round((stats.totalGamesPlayed / stats.totalUsers) * 10) / 10}
          </div>
          <div className="text-sm text-gray-600">Games per User</div>
        </motion.div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Community Engagement</p>
          <div className="text-lg font-bold text-gray-800">
            {Math.round((stats.onlineUsers / stats.totalUsers) * 100)}% Active Today
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserStats;