import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, User, ExternalLink, Search, Filter } from 'lucide-react';
import { Language, Invention } from '../types';

interface InventionMapProps {
  language: Language;
}

const InventionMap: React.FC<InventionMapProps> = ({ language }) => {
  const [selectedInvention, setSelectedInvention] = useState<Invention | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample invention data (in production, this would come from Wikipedia API)
  const inventions: Invention[] = [
    {
      id: '1',
      name: 'Chess',
      description: 'The strategic board game originated in India during the Gupta Empire',
      inventor: 'Ancient Indian scholars',
      year: 600,
      location: 'Northern India',
      coordinates: [26.8467, 80.9462],
      category: 'Games & Sports',
      significance: 'Became the world\'s most popular strategy game',
      wikiUrl: 'https://en.wikipedia.org/wiki/Chess',
    },
    {
      id: '2',
      name: 'Zero',
      description: 'The mathematical concept and numeral for zero',
      inventor: 'Brahmagupta',
      year: 628,
      location: 'Rajasthan',
      coordinates: [27.0238, 74.2179],
      category: 'Mathematics',
      significance: 'Revolutionary concept that enabled modern mathematics',
      wikiUrl: 'https://en.wikipedia.org/wiki/0',
    },
    {
      id: '3',
      name: 'Ayurveda',
      description: 'Ancient system of medicine and healthcare',
      inventor: 'Ancient Indian physicians',
      year: -1500,
      location: 'Ancient India',
      coordinates: [20.5937, 78.9629],
      category: 'Medicine',
      significance: 'Holistic approach to health still practiced worldwide',
      wikiUrl: 'https://en.wikipedia.org/wiki/Ayurveda',
    },
    {
      id: '4',
      name: 'Yoga',
      description: 'Physical, mental, and spiritual practices',
      inventor: 'Ancient Indian sages',
      year: -3000,
      location: 'Indus Valley',
      coordinates: [30.3753, 69.3451],
      category: 'Health & Wellness',
      significance: 'Global practice for physical and mental well-being',
      wikiUrl: 'https://en.wikipedia.org/wiki/Yoga',
    },
    {
      id: '5',
      name: 'Steel Production',
      description: 'Advanced metallurgy and steel manufacturing',
      inventor: 'Ancient Indian blacksmiths',
      year: 400,
      location: 'Southern India',
      coordinates: [15.9129, 79.7400],
      category: 'Technology',
      significance: 'Wootz steel was highly prized across ancient world',
      wikiUrl: 'https://en.wikipedia.org/wiki/Wootz_steel',
    },
    {
      id: '6',
      name: 'Decimal System',
      description: 'Base-10 number system with place value notation',
      inventor: 'Ancient Indian mathematicians',
      year: 100,
      location: 'Ancient India',
      coordinates: [23.4734, 77.9479],
      category: 'Mathematics',
      significance: 'Foundation of modern numerical calculations',
      wikiUrl: 'https://en.wikipedia.org/wiki/Decimal',
    },
  ];

  const categories = [
    'all',
    'Mathematics',
    'Medicine',
    'Technology',
    'Games & Sports',
    'Health & Wellness',
  ];

  const filteredInventions = inventions.filter(invention => {
    const matchesSearch = invention.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invention.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || invention.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-6">
            <MapPin className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">
              Interactive Invention Map
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Discover India's Innovations
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the geographical origins of India's greatest inventions and their impact on the world
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y:0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search inventions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Map Placeholder and Inventions Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-3xl p-8 h-96 flex items-center justify-center relative overflow-hidden shadow-lg">
              <div className="text-center z-10">
                <MapPin className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Interactive Map</h3>
                <p className="text-gray-600">
                  Map visualization will be integrated with Leaflet.js
                </p>
              </div>
              
              {/* Floating dots representing locations */}
              {filteredInventions.slice(0, 6).map((invention, index) => (
                <motion.div
                  key={invention.id}
                  className="absolute w-4 h-4 bg-red-500 rounded-full shadow-lg cursor-pointer"
                  style={{
                    left: `${20 + (index % 3) * 25}%`,
                    top: `${30 + Math.floor(index / 3) * 30}%`,
                  }}
                  animate={{
                    scale: selectedInvention?.id === invention.id ? 1.5 : 1,
                    backgroundColor: selectedInvention?.id === invention.id ? '#f59e0b' : '#ef4444',
                  }}
                  whileHover={{ scale: 1.3 }}
                  onClick={() => setSelectedInvention(invention)}
                />
              ))}
            </div>
          </motion.div>

          {/* Selected Invention Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {selectedInvention ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{selectedInvention.name}</h3>
                  <div className="flex items-center text-sm opacity-90">
                    <Calendar className="h-4 w-4 mr-1" />
                    {selectedInvention.year > 0 ? `${selectedInvention.year} CE` : `${Math.abs(selectedInvention.year)} BCE`}
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {selectedInvention.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">Inventor:</span>
                      <span className="ml-2 font-medium">{selectedInvention.inventor}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">Location:</span>
                      <span className="ml-2 font-medium">{selectedInvention.location}</span>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-orange-800 mb-2">Historical Significance</h4>
                    <p className="text-orange-700 text-sm">{selectedInvention.significance}</p>
                  </div>
                  
                  {selectedInvention.wikiUrl && (
                    <a
                      href={selectedInvention.wikiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <span>Learn More</span>
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Select an Invention
                </h3>
                <p className="text-gray-500">
                  Click on a location dot to learn more about that invention
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Inventions List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">All Inventions</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInventions.map((invention, index) => (
              <motion.div
                key={invention.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg border transition-all cursor-pointer ${
                  selectedInvention?.id === invention.id
                    ? 'border-orange-300 shadow-xl'
                    : 'border-gray-100 hover:border-orange-200 hover:shadow-xl'
                }`}
                onClick={() => setSelectedInvention(invention)}
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 text-sm font-medium rounded-full">
                      {invention.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {invention.year > 0 ? `${invention.year} CE` : `${Math.abs(invention.year)} BCE`}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {invention.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {invention.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {invention.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InventionMap;