import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Calendar, MapPin, Users, TrendingUp, BookOpen, Zap } from 'lucide-react';
import { Language, WhatIfScenario } from '../types';

interface ReimagineHistoryProps {
  language: Language;
  onBack: () => void;
}

const ReimagineHistory: React.FC<ReimagineHistoryProps> = ({ language, onBack }) => {
  const [selectedScenario, setSelectedScenario] = useState<WhatIfScenario | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const scenarios: WhatIfScenario[] = [
    {
      id: '1',
      title: 'What if Chess Never Existed?',
      description: 'Explore a world where the strategic board game never originated in India',
      invention: {
        id: '1',
        name: 'Chess',
        description: 'Strategic board game from ancient India',
        inventor: 'Ancient Indian scholars',
        year: 600,
        location: 'Northern India',
        category: 'Games',
        significance: 'Strategic thinking development'
      },
      alternativeOutcome: 'Without chess, strategic thinking in warfare, business, and AI development would have evolved very differently. Computer science might have taken decades longer to develop game theory and artificial intelligence algorithms.'
    },
    {
      id: '2',
      title: 'What if Zero Was Never Discovered?',
      description: 'Imagine mathematics without the concept of zero',
      invention: {
        id: '2',
        name: 'Zero',
        description: 'Mathematical concept of nothingness',
        inventor: 'Brahmagupta',
        year: 628,
        location: 'Rajasthan',
        category: 'Mathematics',
        significance: 'Foundation of modern mathematics'
      },
      alternativeOutcome: 'Mathematics and science would be fundamentally limited. The decimal system, algebra, calculus, and computer science would either not exist or be incredibly complex. The digital age might never have arrived.'
    },
    {
      id: '3',
      title: 'What if Yoga Never Developed?',
      description: 'A world without the ancient practice of yoga and meditation',
      invention: {
        id: '3',
        name: 'Yoga',
        description: 'Physical and spiritual practice',
        inventor: 'Ancient Indian sages',
        year: -3000,
        location: 'Indus Valley',
        category: 'Health',
        significance: 'Mind-body wellness practice'
      },
      alternativeOutcome: 'Modern wellness culture, stress management techniques, and the understanding of mind-body connection would be completely different. Mental health treatment and physical therapy might be decades behind current practices.'
    },
    {
      id: '4',
      title: 'What if Ayurveda Was Never Created?',
      description: 'Explore healthcare without ancient Indian holistic medicine',
      invention: {
        id: '4',
        name: 'Ayurveda',
        description: 'Ancient system of medicine',
        inventor: 'Ancient Indian physicians',
        year: -1500,
        location: 'Ancient India',
        category: 'Medicine',
        significance: 'Holistic healthcare approach'
      },
      alternativeOutcome: 'Modern integrative medicine and holistic healthcare approaches might not exist. The focus on prevention rather than treatment and the understanding of personalized medicine would be significantly delayed.'
    }
  ];

  const scenarioSteps = [
    {
      title: 'Historical Context',
      icon: Calendar,
      description: 'Understanding the original invention and its time period'
    },
    {
      title: 'Global Impact',
      icon: MapPin,
      description: 'How this invention spread and influenced the world'
    },
    {
      title: 'Alternative Timeline',
      icon: TrendingUp,
      description: 'Exploring what might have happened instead'
    },
    {
      title: 'Modern Implications',
      icon: Zap,
      description: 'How today\'s world would be different'
    }
  ];

  const renderScenarioContent = () => {
    if (!selectedScenario) return null;

    const steps = [
      {
        title: 'Historical Context',
        content: (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
              <h4 className="font-bold text-gray-800 mb-3">Original Invention</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Name</p>
                  <p className="font-semibold">{selectedScenario.invention.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Time Period</p>
                  <p className="font-semibold">
                    {selectedScenario.invention.year > 0 
                      ? `${selectedScenario.invention.year} CE` 
                      : `${Math.abs(selectedScenario.invention.year)} BCE`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  <p className="font-semibold">{selectedScenario.invention.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Creator</p>
                  <p className="font-semibold">{selectedScenario.invention.inventor}</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {selectedScenario.invention.description}. This innovation became significant because {selectedScenario.invention.significance.toLowerCase()}.
            </p>
          </div>
        )
      },
      {
        title: 'Global Impact',
        content: (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
              <h4 className="font-bold text-gray-800 mb-3">How It Spread</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <p>Originated in ancient India through innovation and cultural development</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <p>Spread through trade routes and cultural exchange</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <p>Adapted and refined by different civilizations</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  <p>Became integral to modern civilization and culture</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: 'Alternative Timeline',
        content: (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6">
              <h4 className="font-bold text-gray-800 mb-3">The World Without This Invention</h4>
              <p className="text-gray-700 leading-relaxed">
                {selectedScenario.alternativeOutcome}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-red-200 rounded-xl p-4">
                <h5 className="font-semibold text-red-700 mb-2">Challenges</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Slower technological progress</li>
                  <li>• Different cultural development</li>
                  <li>• Alternative problem-solving methods</li>
                  <li>• Delayed scientific breakthroughs</li>
                </ul>
              </div>
              
              <div className="bg-white border border-green-200 rounded-xl p-4">
                <h5 className="font-semibold text-green-700 mb-2">Potential Alternatives</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Different innovations might emerge</li>
                  <li>• Alternative cultural practices</li>
                  <li>• New forms of knowledge systems</li>
                  <li>• Different global interactions</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        title: 'Modern Implications',
        content: (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
              <h4 className="font-bold text-gray-800 mb-3">Today's World Would Be...</h4>
              <div className="grid gap-4">
                <div className="bg-white rounded-xl p-4 border border-purple-200">
                  <h5 className="font-semibold text-purple-700 mb-2">Technology</h5>
                  <p className="text-sm text-gray-600">
                    Computing, internet, and digital technologies would be fundamentally different or non-existent.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-blue-200">
                  <h5 className="font-semibold text-blue-700 mb-2">Society</h5>
                  <p className="text-sm text-gray-600">
                    Education, communication, and social structures would have evolved along different paths.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-green-200">
                  <h5 className="font-semibold text-green-700 mb-2">Culture</h5>
                  <p className="text-sm text-gray-600">
                    Art, entertainment, philosophy, and human expression would reflect entirely different values.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
              <h4 className="font-bold mb-3">Reflection Question</h4>
              <p className="italic">
                "How do you think humanity would have developed differently? What other innovations might have taken its place?"
              </p>
            </div>
          </div>
        )
      }
    ];

    return steps[currentStep];
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
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{selectedScenario ? 'Back to Scenarios' : 'Back to Games'}</span>
          </motion.button>

          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-md">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span className="font-bold text-blue-600">Reimagine History</span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedScenario ? (
            <motion.div
              key="scenarios"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Title */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Alternative History Explorer
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Reimagine History
                </h1>
                
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Explore alternative timelines and discover how the world might be different without India's greatest innovations
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
                    onClick={() => {
                      setSelectedScenario(scenario);
                      setCurrentStep(0);
                    }}
                  >
                    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-blue-200 h-full">
                      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                              <Sparkles className="h-8 w-8" />
                            </div>
                            <div className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                              {scenario.invention.category}
                            </div>
                          </div>
                          
                          <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            {scenario.title}
                          </h3>
                          
                          <p className="text-lg opacity-90 leading-relaxed">
                            {scenario.description}
                          </p>
                        </div>
                        
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white rounded-full"></div>
                          <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white rounded-full"></div>
                        </div>
                      </div>

                      <div className="p-8">
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 mb-3">Featured Invention:</h4>
                          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-lg text-gray-800">{scenario.invention.name}</span>
                              <span className="text-sm text-gray-500">
                                {scenario.invention.year > 0 
                                  ? `${scenario.invention.year} CE` 
                                  : `${Math.abs(scenario.invention.year)} BCE`}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm">{scenario.invention.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-1" />
                            Interactive Exploration
                          </div>
                          <motion.div
                            className="text-blue-600 font-semibold flex items-center group-hover:translate-x-2 transition-transform"
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

              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex justify-center">
                  <div className="flex items-center space-x-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                    {scenarioSteps.map((step, index) => {
                      const IconComponent = step.icon;
                      const isActive = index === currentStep;
                      const isCompleted = index < currentStep;
                      
                      return (
                        <React.Fragment key={index}>
                          <motion.button
                            onClick={() => setCurrentStep(index)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                                : isCompleted
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <IconComponent className="h-5 w-5" />
                            <span className="font-medium text-sm">{step.title}</span>
                          </motion.button>
                          
                          {index < scenarioSteps.length - 1 && (
                            <div className={`w-8 h-0.5 ${
                              index < currentStep ? 'bg-green-400' : 'bg-gray-200'
                            }`} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Content */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-white">
                  <h2 className="text-3xl font-bold mb-2">{scenarioSteps[currentStep].title}</h2>
                  <p className="text-lg opacity-90">{scenarioSteps[currentStep].description}</p>
                </div>
                
                <div className="p-8">
                  {renderScenarioContent()?.content}
                </div>

                {/* Navigation */}
                <div className="p-8 pt-0 flex justify-between">
                  <motion.button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Previous
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setCurrentStep(Math.min(scenarioSteps.length - 1, currentStep + 1))}
                    disabled={currentStep === scenarioSteps.length - 1}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentStep === scenarioSteps.length - 1 ? 'Complete' : 'Next'}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReimagineHistory;