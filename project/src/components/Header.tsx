import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Globe, Compass, Gamepad2, MessageCircle, Home, Wrench, BookOpen, Palette, Trophy } from 'lucide-react';
import { Language } from '../types';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  onNavigate: (view: string) => void;
  activeView: string;
}

const Header: React.FC<HeaderProps> = ({ 
  currentLanguage, 
  onLanguageChange, 
  onNavigate,
  activeView 
}) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discovery', icon: Compass, label: 'Discovery Quest' },
    { id: 'build', icon: Wrench, label: 'Build It!' },
    { id: 'whatif', icon: MessageCircle, label: 'What-If' },
    { id: 'chat', icon: BookOpen, label: 'Inventor Chat' },
    { id: 'timeline', icon: Trophy, label: 'Treasure Hunt' },
    { id: 'challenge', icon: Palette, label: 'Invent This!' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-2 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-lg">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                InventIndia
              </h1>
              <p className="text-sm text-gray-600">Chronicles of Curiosity</p>
            </div>
          </motion.div>

          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeView === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-100 to-blue-100 text-orange-600 shadow-md'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="font-medium text-sm">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
            />
            <motion.div
              className="p-2 bg-gradient-to-br from-blue-100 to-orange-100 rounded-xl"
              whileHover={{ scale: 1.1 }}
            >
              <Globe className="h-5 w-5 text-blue-600" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;