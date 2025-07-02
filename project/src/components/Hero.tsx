import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Compass, Wrench, MessageCircle, BookOpen, Trophy, Palette, Zap } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Compass,
      title: 'Discovery Quest',
      description: 'Explore inventions by region and timeline with rich stories',
      action: () => onNavigate('discovery'),
      gradient: 'from-emerald-400 to-teal-400',
    },
    {
      icon: Wrench,
      title: 'Build It Right!',
      description: 'Interactive drag-and-drop building simulations',
      action: () => onNavigate('build'),
      gradient: 'from-blue-400 to-indigo-400',
    },
    {
      icon: MessageCircle,
      title: 'What-If Sandbox',
      description: 'Explore alternative history with AI-generated scenarios',
      action: () => onNavigate('whatif'),
      gradient: 'from-purple-400 to-pink-400',
    },
    {
      icon: BookOpen,
      title: 'Chat with Inventors',
      description: 'Have conversations with historical innovators',
      action: () => onNavigate('chat'),
      gradient: 'from-orange-400 to-red-400',
    },
    {
      icon: Trophy,
      title: 'Timeline Treasure Hunt',
      description: 'Quiz games with collectible invention cards',
      action: () => onNavigate('timeline'),
      gradient: 'from-yellow-400 to-orange-400',
    },
    {
      icon: Palette,
      title: 'Invent This! Challenge',
      description: 'Create your own inventions and get digital patents',
      action: () => onNavigate('challenge'),
      gradient: 'from-rose-400 to-pink-400',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-blue-100 rounded-full mb-6">
                <Sparkles className="h-5 w-5 text-orange-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Chronicles of Curiosity
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange-600 via-red-500 to-blue-600 bg-clip-text text-transparent">
                  InventIndia
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Discover, interact with, and reimagine Indian inventions through immersive games, 
                quests, and alternate innovation history. Experience the genius of India's greatest minds.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <motion.button
                onClick={() => onNavigate('discovery')}
                className="group px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center">
                  Start Your Quest
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              
              <motion.button
                onClick={() => onNavigate('build')}
                className="px-8 py-4 border-2 border-orange-300 text-orange-700 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Building Game
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0] 
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full opacity-20"
          />
          <motion.div
            animate={{ 
              y: [0, 30, 0],
              rotate: [0, -5, 0] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-15"
          />
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              x: [0, 10, 0] 
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-25"
          />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Explore & Create
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Six unique ways to discover India's innovation legacy through interactive experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={feature.action}
                  whileHover={{ y: -10 }}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 group-hover:border-orange-200 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-orange-600 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform">
                      <span>Explore Now</span>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: '500+', label: 'Indian Inventions', icon: Zap },
              { number: '10+', label: 'Languages Supported', icon: BookOpen },
              { number: '6', label: 'Interactive Games', icon: Trophy },
              { number: '∞', label: 'Creative Possibilities', icon: Sparkles },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="mb-4">
                    <IconComponent className="h-12 w-12 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-4xl md:text-5xl font-bold group-hover:scale-110 transition-transform">
                      {stat.number}
                    </div>
                  </div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;