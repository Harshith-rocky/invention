import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, MapPin, User, ExternalLink, Sparkles } from 'lucide-react';
import { Language, Invention } from '../types';

interface InventionOfTheDayProps {
  language: Language;
  onClose: () => void;
}

const InventionOfTheDay: React.FC<InventionOfTheDayProps> = ({ language, onClose }) => {
  // This would typically fetch from an API or rotate through a curated list
  const todaysInvention: Invention = {
    id: 'daily-1',
    name: 'Cataract Surgery',
    description: 'Ancient surgical technique for removing cataracts from the eye, pioneered by Sushruta',
    inventor: 'Sushruta',
    year: -600,
    location: 'Ancient India',
    category: 'Medicine & Surgery',
    significance: 'First documented cataract surgery technique, still influences modern ophthalmology',
    story: 'Sushruta developed a technique called "couching" where a sharp instrument was used to push the clouded lens away from the line of sight. This revolutionary procedure restored sight to countless patients and established principles still used in modern eye surgery.',
    wikiUrl: 'https://en.wikipedia.org/wiki/Sushruta'
  };

  const funFacts = [
    'This surgery was performed over 2,600 years ago!',
    'Sushruta\'s techniques were so advanced they weren\'t improved upon for centuries',
    'The procedure required incredible precision without modern anesthesia',
    'Ancient Indian surgeons had a success rate that amazed foreign visitors'
  ];

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
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white relative overflow-hidden">
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-5 w-5" />
          </motion.button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Sparkles className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Invention of the Day</h2>
              <p className="opacity-90">{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {todaysInvention.name}
          </h1>
          
          <p className="text-lg opacity-90">
            {todaysInvention.description}
          </p>
          
          {/* Floating decorative elements */}
          <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white/20 rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-white/20 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <User className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-gray-800">Inventor</span>
              </div>
              <p className="text-gray-700">{todaysInvention.inventor}</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-gray-800">Time Period</span>
              </div>
              <p className="text-gray-700">
                {todaysInvention.year > 0 ? `${todaysInvention.year} CE` : `${Math.abs(todaysInvention.year)} BCE`}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-5 w-5 text-orange-600" />
                <span className="font-semibold text-gray-800">Location</span>
              </div>
              <p className="text-gray-700">{todaysInvention.location}</p>
            </div>
          </div>

          {/* Story */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">The Story</h3>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6">
              <p className="text-gray-700 leading-relaxed">
                {todaysInvention.story}
              </p>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Fun Facts</h3>
            <div className="grid gap-3">
              {funFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-xl"
                >
                  <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{fact}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Significance */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Historical Significance</h3>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
              <p className="text-gray-700 leading-relaxed">
                {todaysInvention.significance}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            {todaysInvention.wikiUrl && (
              <motion.a
                href={todaysInvention.wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Learn More
              </motion.a>
            )}
            
            <motion.button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore More Inventions
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InventionOfTheDay;