import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Newspaper, Zap, Globe, TrendingUp, Users, Calendar } from 'lucide-react';
import { Language, WhatIfScenario } from '../types';

interface WhatIfSandboxProps {
  language: Language;
  onBack: () => void;
}

const WhatIfSandbox: React.FC<WhatIfSandboxProps> = ({ language, onBack }) => {
  const [selectedScenario, setSelectedScenario] = useState<WhatIfScenario | null>(null);
  const [generatedStory, setGeneratedStory] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const scenarios: WhatIfScenario[] = [
    {
      id: '1',
      title: 'What if Paper Wasn\'t Invented in India?',
      description: 'Explore a world where paper manufacturing never developed in ancient India',
      invention: {
        id: '1',
        name: 'Paper Manufacturing',
        description: 'Ancient techniques for creating paper from plant fibers',
        inventor: 'Ancient Indian craftsmen',
        year: 100,
        location: 'Ancient India',
        category: 'Technology',
        significance: 'Revolutionized knowledge preservation and communication'
      },
      alternativeOutcome: 'Without Indian paper-making techniques, knowledge preservation would rely heavily on palm leaves, stone tablets, and expensive parchment. The spread of literacy and education would be significantly slower.',
      rippleEffects: [
        'Books would remain luxury items for centuries longer',
        'Scientific knowledge would spread much more slowly',
        'Religious and philosophical texts would be harder to preserve',
        'The printing revolution would be delayed by centuries',
        'Global trade in knowledge would be severely limited'
      ],
      newspaperHeadline: 'KNOWLEDGE CRISIS: Scholars Struggle Without Affordable Writing Material'
    },
    {
      id: '2',
      title: 'What if Rockets Weren\'t Shared with Europe in 1780?',
      description: 'Imagine if Tipu Sultan\'s rocket technology remained secret in India',
      invention: {
        id: '2',
        name: 'Mysorean Rockets',
        description: 'Advanced military rockets with iron tubes and explosive warheads',
        inventor: 'Tipu Sultan and Mysore engineers',
        year: 1780,
        location: 'Mysore Kingdom',
        category: 'Military Technology',
        significance: 'First iron-cased rockets that influenced modern rocketry'
      },
      alternativeOutcome: 'If rocket technology remained in India, the balance of colonial power could have shifted dramatically. India might have maintained technological superiority in warfare.',
      rippleEffects: [
        'European colonial expansion would face stronger resistance',
        'Space exploration might have originated from India',
        'The Industrial Revolution could have taken a different path',
        'Modern missile technology would have different origins',
        'Geopolitical power structures would be fundamentally different'
      ],
      newspaperHeadline: 'MYSORE MAINTAINS MILITARY SUPREMACY: Rocket Technology Gives Edge Over Colonial Forces'
    },
    {
      id: '3',
      title: 'What if the Decimal System Never Spread from India?',
      description: 'A world where Indian mathematical innovations remained localized',
      invention: {
        id: '3',
        name: 'Decimal System',
        description: 'Base-10 number system with place value notation',
        inventor: 'Ancient Indian mathematicians',
        year: 500,
        location: 'Ancient India',
        category: 'Mathematics',
        significance: 'Foundation of modern mathematical calculations'
      },
      alternativeOutcome: 'Without the decimal system spreading globally, mathematics and science would develop along completely different lines, with each civilization using their own complex number systems.',
      rippleEffects: [
        'Scientific calculations would remain extremely complex',
        'Trade and commerce would be severely hampered',
        'The development of algebra and calculus would be delayed',
        'Computer science might never have emerged',
        'Global standardization of mathematics would be impossible'
      ],
      newspaperHeadline: 'MATHEMATICAL CHAOS: Scholars Struggle with Complex Roman Numerals in Advanced Calculations'
    },
    {
      id: '4',
      title: 'What if Steel Production Techniques Weren\'t Developed?',
      description: 'Explore a world without India\'s advanced metallurgy',
      invention: {
        id: '4',
        name: 'Wootz Steel',
        description: 'Superior steel production creating legendary Damascus steel',
        inventor: 'Ancient Indian metallurgists',
        year: 400,
        location: 'Southern India',
        category: 'Metallurgy',
        significance: 'Produced the world\'s finest steel for centuries'
      },
      alternativeOutcome: 'Without advanced Indian steel-making, global technology and warfare would develop very differently. The quality gap between Indian and European tools would never exist.',
      rippleEffects: [
        'Weapons and tools would remain inferior quality',
        'Construction techniques would be limited',
        'The Industrial Revolution would be significantly delayed',
        'Trade relationships would be fundamentally different',
        'Technological advancement would follow alternative paths'
      ],
      newspaperHeadline: 'METALLURGY CRISIS: Inferior Steel Quality Hampers Technological Progress Worldwide'
    }
  ];

  const generateAlternativeStory = async (scenario: WhatIfScenario) => {
    setIsGenerating(true);
    
    // Simulate AI story generation
    setTimeout(() => {
      const storyTemplate = `
        In this alternative timeline, the absence of ${scenario.invention.name} has created a cascade of changes throughout history.
        
        **Immediate Impact (${scenario.invention.year} CE):**
        ${scenario.alternativeOutcome}
        
        **Ripple Effects Through History:**
        ${scenario.rippleEffects.map((effect, index) => `${index + 1}. ${effect}`).join('\n')}
        
        **Modern Day Consequences:**
        Today's world would be unrecognizable. The technological landscape would be fundamentally different, with innovations following entirely new paths. Societies would have adapted in unexpected ways, creating alternative solutions that we can barely imagine.
        
        **The Butterfly Effect:**
        This single missing innovation demonstrates how interconnected human progress truly is. Every invention builds upon previous knowledge, and removing one crucial element can reshape the entire trajectory of civilization.
      `;
      
      setGeneratedStory(storyTemplate);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            onClick={selectedScenario ? () => setSelectedScenario(null) : onBack}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{selectedScenario ? 'Back to Scenarios' : 'Back to Home'}</span>
          </motion.button>

          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-md">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span className="font-bold text-purple-600">What-If Sandbox</span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedScenario ? (
            <motion.div
              key="scenario-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Title */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6">
                  <Zap className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Alternative History Sandbox
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  What-If Scenarios
                </h1>
                
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Explore alternative timelines where Indian inventions never existed. Discover how different choices could have reshaped world history.
                </p>
              </div>

              {/* Scenarios Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                {scenarios.map((scenario, index) => (
                  <motion.div
                    key={scenario.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedScenario(scenario)}
                    whileHover={{ y: -10 }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-purple-200 h-full">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <Newspaper className="h-8 w-8" />
                          </div>
                          <div className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            {scenario.invention.category}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3 group-hover:scale-105 transition-transform">
                          {scenario.title}
                        </h3>
                        
                        <p className="text-lg opacity-90 leading-relaxed">
                          {scenario.description}
                        </p>
                      </div>

                      <div className="p-6">
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 mb-2">Featured Invention:</h4>
                          <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-gray-800">{scenario.invention.name}</span>
                              <span className="text-sm text-gray-500">
                                {scenario.invention.year} CE
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm">{scenario.invention.description}</p>
                          </div>
                        </div>

                        <div className="bg-purple-50 rounded-xl p-4 mb-4">
                          <h4 className="font-semibold text-purple-800 mb-2">Alternative Outcome:</h4>
                          <p className="text-purple-700 text-sm leading-relaxed">
                            {scenario.alternativeOutcome}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-600">
                            <Globe className="h-4 w-4 mr-1" />
                            Global Impact Analysis
                          </div>
                          <motion.div
                            className="text-purple-600 font-semibold flex items-center group-hover:translate-x-2 transition-transform"
                            whileHover={{ x: 5 }}
                          >
                            Explore Timeline →
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="scenario-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Scenario Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  {selectedScenario.title}
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {selectedScenario.description}
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Scenario Info */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Invention Details */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
                      <h2 className="text-2xl font-bold mb-2">Original Invention</h2>
                      <p className="opacity-90">Understanding what we're removing from history</p>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-2">{selectedScenario.invention.name}</h3>
                          <p className="text-gray-600 mb-4">{selectedScenario.invention.description}</p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              <span>{selectedScenario.invention.year} CE</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Users className="h-4 w-4 text-gray-400 mr-2" />
                              <span>{selectedScenario.invention.inventor}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 rounded-xl p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Historical Significance</h4>
                          <p className="text-blue-700 text-sm">{selectedScenario.invention.significance}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Alternative Outcome */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                      <h2 className="text-2xl font-bold mb-2">Alternative Timeline</h2>
                      <p className="opacity-90">How history would unfold differently</p>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-gray-700 leading-relaxed text-lg mb-6">
                        {selectedScenario.alternativeOutcome}
                      </p>
                      
                      <h3 className="font-bold text-gray-800 mb-4">Ripple Effects Through History:</h3>
                      <div className="space-y-3">
                        {selectedScenario.rippleEffects.map((effect, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3 p-3 bg-orange-50 rounded-xl"
                          >
                            <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-gray-700">{effect}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Generate Story Button */}
                  <div className="text-center">
                    <motion.button
                      onClick={() => generateAlternativeStory(selectedScenario)}
                      disabled={isGenerating}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isGenerating ? (
                        <span className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Generating Story...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Newspaper className="mr-2 h-5 w-5" />
                          Generate Alternative History Story
                        </span>
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Newspaper Panel */}
                <div className="space-y-6">
                  {/* Newspaper Headline */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 text-white">
                      <div className="text-center">
                        <h3 className="text-lg font-bold">THE ALTERNATIVE TIMES</h3>
                        <p className="text-sm opacity-75">Special Historical Edition</p>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-bold text-lg text-gray-800 mb-2 leading-tight">
                        {selectedScenario.newspaperHeadline}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Breaking news from our alternative timeline correspondent...
                      </p>
                    </div>
                  </div>

                  {/* Generated Story */}
                  {generatedStory && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-green-500 to-teal-500 p-4 text-white">
                        <h3 className="font-bold">Generated Alternative History</h3>
                      </div>
                      
                      <div className="p-4">
                        <div className="prose prose-sm max-w-none">
                          <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
                            {generatedStory}
                          </pre>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Impact Metrics */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-800 mb-4">Impact Analysis</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Technological Progress</span>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-red-600 font-semibold">-75%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Global Trade</span>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-red-600 font-semibold">-60%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Knowledge Spread</span>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-red-600 font-semibold">-85%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WhatIfSandbox;