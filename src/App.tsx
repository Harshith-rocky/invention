import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import DiscoveryQuest from './components/DiscoveryQuest';
import BuildItRight from './components/BuildItRight';
import WhatIfSandbox from './components/WhatIfSandbox';
import InventorChat from './components/InventorChat';
import TimelineTreasureHunt from './components/TimelineTreasureHunt';
import RetellMode from './components/RetellMode';
import InventChallenge from './components/InventChallenge';
import InventionOfTheDay from './components/InventionOfTheDay';
import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';
import UserStats from './components/UserStats';
import Leaderboard from './components/Leaderboard';
import AdminDashboard from './components/AdminDashboard';
import { Language } from './types';
import { useUserData } from './hooks/useUserData';

type ActiveView = 'home' | 'discovery' | 'build' | 'whatif' | 'chat' | 'timeline' | 'retell' | 'challenge' | 'leaderboard' | 'admin';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [showDailyWidget, setShowDailyWidget] = useState(true);
  const [showUserProfile, setShowUserProfile] = useState(false);
  
  const { currentUser, userProgress, userStats, login, logout, addGameScore } = useUserData();

  // If no user is logged in, show login page
  if (!currentUser) {
    return <LoginPage onLogin={login} userStats={userStats} />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'discovery':
        return <DiscoveryQuest language={currentLanguage} onBack={() => setActiveView('home')} />;
      case 'build':
        return (
          <BuildItRight 
            language={currentLanguage} 
            onBack={() => setActiveView('home')}
            onGameComplete={(score) => addGameScore({
              gameType: 'build',
              score: score.score,
              maxScore: score.maxScore,
              completionTime: score.time || 0,
              details: score
            })}
          />
        );
      case 'whatif':
        return <WhatIfSandbox language={currentLanguage} onBack={() => setActiveView('home')} />;
      case 'chat':
        return <InventorChat language={currentLanguage} onBack={() => setActiveView('home')} />;
      case 'timeline':
        return (
          <TimelineTreasureHunt 
            language={currentLanguage} 
            onBack={() => setActiveView('home')}
            onGameComplete={(score) => addGameScore({
              gameType: 'timeline',
              score: score.score,
              maxScore: score.maxScore,
              completionTime: score.time || 0,
              details: score
            })}
          />
        );
      case 'retell':
        return <RetellMode language={currentLanguage} onBack={() => setActiveView('home')} />;
      case 'challenge':
        return <InventChallenge language={currentLanguage} onBack={() => setActiveView('home')} />;
      case 'leaderboard':
        return (
          <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.button
                onClick={() => setActiveView('home')}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors mb-8"
                whileHover={{ x: -5 }}
              >
                <span>← Back to Home</span>
              </motion.button>
              <Leaderboard currentUser={currentUser} />
            </div>
          </div>
        );
      case 'admin':
        return (
          <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.button
                onClick={() => setActiveView('home')}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors mb-8"
                whileHover={{ x: -5 }}
              >
                <span>← Back to Home</span>
              </motion.button>
              <AdminDashboard />
            </div>
          </div>
        );
      default:
        return (
          <div>
            <Hero onNavigate={setActiveView} />
            {/* User Stats Widget */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
              <UserStats stats={userStats} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Header 
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onNavigate={setActiveView}
        activeView={activeView}
        currentUser={currentUser}
        onShowProfile={() => setShowUserProfile(true)}
      />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="pt-20"
        >
          {renderActiveView()}
        </motion.main>
      </AnimatePresence>

      {/* Invention of the Day Widget */}
      <AnimatePresence>
        {showDailyWidget && activeView === 'home' && (
          <InventionOfTheDay 
            language={currentLanguage}
            onClose={() => setShowDailyWidget(false)}
          />
        )}
      </AnimatePresence>

      {/* User Profile Modal */}
      <AnimatePresence>
        {showUserProfile && userProgress && (
          <UserProfile
            user={currentUser}
            userProgress={userProgress}
            onClose={() => setShowUserProfile(false)}
            onLogout={() => {
              logout();
              setShowUserProfile(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Admin Access (Demo - in production this would be role-based) */}
      {currentUser.username === 'Demo Explorer' && (
        <motion.button
          onClick={() => setActiveView('admin')}
          className="fixed bottom-4 left-4 px-4 py-2 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 transition-colors z-40"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Admin Dashboard
        </motion.button>
      )}
    </div>
  );
}

export default App;