import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Trophy, Star, Calendar, Target, TrendingUp, Award, LogOut, Settings, X } from 'lucide-react';
import { User as UserType, UserProgress, GameScore } from '../types';

interface UserProfileProps {
  user: UserType;
  userProgress: UserProgress;
  onClose: () => void;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, userProgress, onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'scores' | 'achievements'>('overview');

  const getScoresByGame = () => {
    const scoresByGame: Record<string, GameScore[]> = {};
    userProgress.gameScores.forEach(score => {
      if (!scoresByGame[score.gameType]) {
        scoresByGame[score.gameType] = [];
      }
      scoresByGame[score.gameType].push(score);
    });
    return scoresByGame;
  };

  const getBestScore = (gameType: string) => {
    const scores = userProgress.gameScores.filter(s => s.gameType === gameType);
    return scores.length > 0 ? Math.max(...scores.map(s => s.score)) : 0;
  };

  const getAverageScore = (gameType: string) => {
    const scores = userProgress.gameScores.filter(s => s.gameType === gameType);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length);
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

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'rare': return 'from-purple-400 to-blue-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const gameTypes = ['discovery', 'build', 'whatif', 'chat', 'timeline', 'challenge'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white relative">
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-5 w-5" />
          </motion.button>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <p className="opacity-90">{user.email}</p>
              <p className="text-sm opacity-75">
                Joined {user.joinDate.toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{userProgress.level}</div>
              <div className="text-sm opacity-90">Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{userProgress.totalPoints.toLocaleString()}</div>
              <div className="text-sm opacity-90">Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{userProgress.cardsCollected.length}</div>
              <div className="text-sm opacity-90">Cards</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{userProgress.streakDays}</div>
              <div className="text-sm opacity-90">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'scores', label: 'Game Scores', icon: Trophy },
              { id: 'achievements', label: 'Achievements', icon: Award }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Progress Overview */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                    <h3 className="font-bold text-gray-800 mb-4">Learning Progress</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Games Completed</span>
                        <span className="font-semibold">{userProgress.gamesCompleted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Inventions Discovered</span>
                        <span className="font-semibold">{userProgress.inventionsDiscovered.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Achievements</span>
                        <span className="font-semibold">{userProgress.achievementsUnlocked.length}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                    <h3 className="font-bold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">Last played: {userProgress.lastPlayDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">Current streak: {userProgress.streakDays} days</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Target className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">Level {userProgress.level} Explorer</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Cards */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-4">Recent Cards Collected</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {userProgress.cardsCollected.slice(-4).map((card) => (
                      <motion.div
                        key={card.id}
                        className={`bg-gradient-to-r ${getRarityColor(card.rarity)} p-4 rounded-xl text-white shadow-lg`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 mb-2">
                            <Star className="h-4 w-4" />
                            <span className="text-sm capitalize">{card.rarity}</span>
                          </div>
                          <h4 className="font-bold text-sm">{card.invention.name}</h4>
                          <p className="text-xs opacity-90 mt-1">{card.invention.category}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'scores' && (
              <motion.div
                key="scores"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Game Performance Summary */}
                <div className="grid md:grid-cols-3 gap-4">
                  {gameTypes.map((gameType) => (
                    <div key={gameType} className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">{getGameTypeLabel(gameType)}</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Best Score:</span>
                          <span className="font-semibold">{getBestScore(gameType)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Average:</span>
                          <span className="font-semibold">{getAverageScore(gameType)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Played:</span>
                          <span className="font-semibold">
                            {userProgress.gameScores.filter(s => s.gameType === gameType).length} times
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Scores */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-4">Recent Game Scores</h3>
                  <div className="space-y-3">
                    {userProgress.gameScores.slice(-10).reverse().map((score) => (
                      <div key={score.id} className="bg-white border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-800">{getGameTypeLabel(score.gameType)}</h4>
                            <p className="text-sm text-gray-600">
                              {score.date.toLocaleDateString()} • {Math.floor(score.completionTime / 60)}m {score.completionTime % 60}s
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-orange-600">
                              {score.score}/{score.maxScore}
                            </div>
                            <div className="text-sm text-gray-600">
                              {Math.round((score.score / score.maxScore) * 100)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'achievements' && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Achievement Categories */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4">Unlocked Achievements</h3>
                    <div className="space-y-3">
                      {userProgress.achievementsUnlocked.map((achievement, index) => (
                        <motion.div
                          key={achievement}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200"
                        >
                          <Award className="h-6 w-6 text-yellow-600" />
                          <span className="font-medium text-gray-800">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 mb-4">Card Collection</h3>
                    <div className="space-y-3">
                      {['common', 'rare', 'legendary'].map((rarity) => {
                        const count = userProgress.cardsCollected.filter(c => c.rarity === rarity).length;
                        return (
                          <div key={rarity} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <Star className={`h-5 w-5 ${
                                rarity === 'legendary' ? 'text-yellow-500' :
                                rarity === 'rare' ? 'text-purple-500' : 'text-gray-500'
                              }`} />
                              <span className="font-medium capitalize">{rarity} Cards</span>
                            </div>
                            <span className="font-bold text-gray-800">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex justify-between">
          <motion.button
            onClick={onLogout}
            className="flex items-center space-x-2 px-6 py-3 text-red-600 border border-red-300 rounded-xl hover:bg-red-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </motion.button>
          
          <motion.button
            className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfile;