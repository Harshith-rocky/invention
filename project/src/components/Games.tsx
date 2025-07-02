import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles, Trophy, ArrowRight, Target, History } from 'lucide-react';

interface GamesProps {
  onSelectGame: (game: string) => void;
}

const Games: React.FC<GamesProps> = ({ onSelectGame }) => {
  const games = [
    {
      id: 'timeline',
      title: 'Timeline Treasure Hunt',
      description: 'Solve invention clues and guess the innovation in this exciting quiz adventure',
      icon: Clock,
      difficulty: 'Medium',
      players: '1-4 Players',
      duration: '15-30 min',
      gradient: 'from-purple-500 to-pink-500',
      features: ['Historical Clues', 'Multiple Difficulty Levels', 'Score Tracking', 'Learning Mode'],
    },
    {
      id: 'reimagine',
      title: 'Reimagine History',
      description: 'Explore alternative timelines and see how different choices could have changed history',
      icon: History,
      difficulty: 'Advanced',
      players: '1 Player',
      duration: '20-45 min',
      gradient: 'from-blue-500 to-cyan-500',
      features: ['AI-Powered Scenarios', 'Multiple Outcomes', 'Historical Analysis', 'Creative Thinking'],
    },
  ];

  const achievements = [
    { icon: Trophy, title: 'Master Inventor', description: 'Complete 50 challenges' },
    { icon: Target, title: 'Perfect Score', description: 'Score 100% in any game' },
    { icon: Sparkles, title: 'Explorer', description: 'Try all game modes' },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6">
            <Trophy className="h-5 w-5 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">
              Interactive Learning Games
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Play & Learn
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover India's innovations through engaging games that make learning fun and memorable
          </p>
        </motion.div>

        {/* Games Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {games.map((game, index) => {
            const IconComponent = game.icon;
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => onSelectGame(game.id)}
              >
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-purple-200">
                  {/* Game Header */}
                  <div className={`bg-gradient-to-r ${game.gradient} p-8 text-white relative overflow-hidden`}>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                          <IconComponent className="h-8 w-8" />
                        </div>
                        <div className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          {game.difficulty}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">
                        {game.title}
                      </h3>
                      
                      <p className="text-lg opacity-90 leading-relaxed">
                        {game.description}
                      </p>
                    </div>
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Game Details */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {game.duration}
                      </span>
                      <span>{game.players}</span>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {game.features.map((feature) => (
                          <div key={feature} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      className={`w-full py-4 bg-gradient-to-r ${game.gradient} text-white rounded-xl font-semibold flex items-center justify-center group-hover:shadow-lg transition-all`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Start Playing</span>
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg border border-gray-100"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Achievements</h2>
            <p className="text-gray-600">Unlock rewards as you progress through the games</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all group cursor-pointer border border-gray-100"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Games;