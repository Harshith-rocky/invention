import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Wrench, CheckCircle, XCircle, RotateCcw, Trophy, Target } from 'lucide-react';
import { Language, BuildingComponent } from '../types';

interface BuildItRightProps {
  language: Language;
  onBack: () => void;
  onGameComplete?: (score: { score: number; maxScore: number; time?: number }) => void;
}

const BuildItRight: React.FC<BuildItRightProps> = ({ language, onBack, onGameComplete }) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [gameState, setGameState] = useState<'playing' | 'completed' | 'failed'>('playing');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const dragRef = useRef<HTMLDivElement>(null);

  const games = [
    {
      id: 'stepwell',
      title: 'Build a Stepwell (Baoli)',
      description: 'Construct an ancient Indian stepwell by arranging architectural components correctly',
      difficulty: 'Medium',
      maxScore: 100,
      components: [
        { id: 'foundation', name: 'Foundation', type: 'foundation' as const, position: { x: 0, y: 0 }, isPlaced: false },
        { id: 'steps1', name: 'Lower Steps', type: 'structure' as const, position: { x: 0, y: 0 }, isPlaced: false },
        { id: 'steps2', name: 'Middle Steps', type: 'structure' as const, position: { x: 0, y: 0 }, isPlaced: false },
        { id: 'steps3', name: 'Upper Steps', type: 'structure' as const, position: { x: 0, y: 0 }, isPlaced: false },
        { id: 'pillars', name: 'Decorative Pillars', type: 'decoration' as const, position: { x: 0, y: 0 }, isPlaced: false },
        { id: 'arches', name: 'Arched Galleries', type: 'decoration' as const, position: { x: 0, y: 0 }, isPlaced: false },
      ]
    },
    {
      id: 'telescope',
      title: 'Assemble Ancient Telescope',
      description: 'Arrange mirrors and lenses to create a working astronomical instrument',
      difficulty: 'Hard',
      maxScore: 150,
      components: [
        { id: 'base', name: 'Telescope Base', type: 'foundation' as const, position: { x: 0, y: 0 }, isPlaced: false },
        { id: 'tube', name: 'Main Tube', type: 'structure' as const, position: { x: 0, y: 0 }, isPlaced: false },
        { id: 'primary', name: 'Primary Mirror', type: 'mechanism' as const, position: { x: 0, y: 0 }, isPlaced: false },
        { id: 'secondary', name: 'Secondary Mirror', type: 'mechanism' as const, position: { x: 0, y: 0 }, isPlaced: false },
        { id: 'eyepiece', name: 'Eyepiece', type: 'mechanism' as const, position: { x: 0, y: 0 }, isPlaced: false },
        { id: 'mount', name: 'Mounting System', type: 'structure' as const, position: { x: 0, y: 0 }, isPlaced: false },
      ]
    },
    {
      id: 'printing',
      title: 'Build Printing Press',
      description: 'Assemble components of an ancient printing mechanism',
      difficulty: 'Easy',
      maxScore: 80,
      components: [
        { id: 'frame', name: 'Wooden Frame', type: 'foundation' as const, position: { x: 0, y: 0 }, isPlaced: false },
        { id: 'plate', name: 'Printing Plate', type: 'mechanism' as const, position: { x: 0, y: 0 }, isPlaced: false },
        { id: 'roller', name: 'Ink Roller', type: 'mechanism' as const, position: { x: 0, y: 0 }, isPlaced: false },
        { id: 'press', name: 'Press Mechanism', type: 'structure' as const, position: { x: 0, y: 0 }, isPlaced: false },
        { id: 'paper', name: 'Paper Holder', type: 'structure' as const, position: { x: 0, y: 0 }, isPlaced: false },
      ]
    }
  ];

  const currentGame = games.find(g => g.id === selectedGame);
  const [components, setComponents] = useState<BuildingComponent[]>([]);

  const initializeGame = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (game) {
      setComponents(game.components.map(comp => ({ ...comp, isPlaced: false, isCorrect: false })));
      setGameState('playing');
      setScore(0);
      setAttempts(0);
      setStartTime(Date.now());
    }
  };

  const handleDrop = (componentId: string, dropZoneId: string) => {
    setComponents(prev => prev.map(comp => {
      if (comp.id === componentId) {
        const isCorrect = validatePlacement(comp, dropZoneId);
        return { ...comp, isPlaced: true, isCorrect };
      }
      return comp;
    }));
    
    setAttempts(prev => prev + 1);
    checkGameCompletion();
  };

  const validatePlacement = (component: BuildingComponent, dropZoneId: string): boolean => {
    // Simplified validation logic
    const validPlacements: Record<string, string[]> = {
      'foundation': ['zone-1'],
      'structure': ['zone-2', 'zone-3'],
      'mechanism': ['zone-3', 'zone-4'],
      'decoration': ['zone-4', 'zone-5']
    };
    
    return validPlacements[component.type]?.includes(dropZoneId) || false;
  };

  const checkGameCompletion = () => {
    const allPlaced = components.every(comp => comp.isPlaced);
    const allCorrect = components.every(comp => comp.isCorrect);
    
    if (allPlaced) {
      if (allCorrect) {
        const finalScore = Math.max(0, (currentGame?.maxScore || 100) - (attempts * 5));
        const completionTime = Math.floor((Date.now() - startTime) / 1000);
        setScore(finalScore);
        setGameState('completed');
        
        // Call the completion callback
        if (onGameComplete) {
          onGameComplete({
            score: finalScore,
            maxScore: currentGame?.maxScore || 100,
            time: completionTime
          });
        }
      } else {
        setGameState('failed');
      }
    }
  };

  const resetGame = () => {
    if (selectedGame) {
      initializeGame(selectedGame);
    }
  };

  const getComponentColor = (type: string) => {
    const colors = {
      foundation: 'from-stone-400 to-stone-600',
      structure: 'from-blue-400 to-blue-600',
      mechanism: 'from-purple-400 to-purple-600',
      decoration: 'from-yellow-400 to-yellow-600'
    };
    return colors[type as keyof typeof colors] || 'from-gray-400 to-gray-600';
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
            onClick={selectedGame ? () => setSelectedGame(null) : onBack}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{selectedGame ? 'Back to Games' : 'Back to Home'}</span>
          </motion.button>

          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-md">
            <Wrench className="h-5 w-5 text-blue-600" />
            <span className="font-bold text-blue-600">Build It Right!</span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div
              key="game-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Title */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-6">
                  <Target className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Interactive Building Games
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Build It Right!
                </h1>
                
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Master ancient Indian engineering by building stepwells, telescopes, and printing presses through interactive drag-and-drop challenges.
                </p>
              </div>

              {/* Games Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {games.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => {
                      setSelectedGame(game.id);
                      initializeGame(game.id);
                    }}
                    whileHover={{ y: -10 }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-blue-200 h-full">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <Wrench className="h-8 w-8" />
                          </div>
                          <div className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            {game.difficulty}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3 group-hover:scale-105 transition-transform">
                          {game.title}
                        </h3>
                        
                        <p className="text-lg opacity-90 leading-relaxed">
                          {game.description}
                        </p>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Trophy className="h-4 w-4 mr-1" />
                            Max Score: {game.maxScore}
                          </div>
                          <div className="text-sm text-gray-600">
                            {game.components.length} Components
                          </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Components to Build:</h4>
                          <div className="space-y-1">
                            {game.components.slice(0, 3).map((comp) => (
                              <div key={comp.id} className="text-sm text-blue-700">
                                • {comp.name}
                              </div>
                            ))}
                            {game.components.length > 3 && (
                              <div className="text-sm text-blue-600 italic">
                                +{game.components.length - 3} more...
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="game-play"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Game Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  {currentGame?.title}
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {currentGame?.description}
                </p>
                
                <div className="flex justify-center items-center space-x-6 mt-6">
                  <div className="bg-white px-4 py-2 rounded-xl shadow-md">
                    <span className="text-sm text-gray-600">Score: </span>
                    <span className="font-bold text-blue-600">{score}</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl shadow-md">
                    <span className="text-sm text-gray-600">Attempts: </span>
                    <span className="font-bold text-orange-600">{attempts}</span>
                  </div>
                  <motion.button
                    onClick={resetGame}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Reset</span>
                  </motion.button>
                </div>
              </div>

              {/* Game Area */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Components Panel */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Components</h3>
                  <div className="space-y-3">
                    {components.filter(comp => !comp.isPlaced).map((component) => (
                      <motion.div
                        key={component.id}
                        className={`p-4 bg-gradient-to-r ${getComponentColor(component.type)} text-white rounded-xl cursor-move shadow-md`}
                        whileHover={{ scale: 1.05 }}
                        whileDrag={{ scale: 1.1 }}
                        drag
                        dragConstraints={dragRef}
                        onDragEnd={(event, info) => {
                          // Handle drop logic here
                          console.log('Dropped component:', component.id);
                        }}
                      >
                        <div className="font-semibold">{component.name}</div>
                        <div className="text-sm opacity-90 capitalize">{component.type}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Building Area */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Building Area</h3>
                  <div ref={dragRef} className="relative h-96 bg-gradient-to-b from-sky-100 to-green-100 rounded-xl border-2 border-dashed border-gray-300">
                    {/* Drop Zones */}
                    {[1, 2, 3, 4, 5].map((zone) => (
                      <div
                        key={zone}
                        className="absolute w-24 h-24 border-2 border-blue-300 rounded-xl bg-blue-50/50 flex items-center justify-center text-blue-600 font-semibold"
                        style={{
                          left: `${(zone - 1) * 20 + 10}%`,
                          top: `${zone * 15}%`
                        }}
                      >
                        Zone {zone}
                      </div>
                    ))}
                    
                    {/* Placed Components */}
                    {components.filter(comp => comp.isPlaced).map((component) => (
                      <motion.div
                        key={component.id}
                        className={`absolute p-3 rounded-xl text-white text-sm font-semibold ${
                          component.isCorrect 
                            ? 'bg-green-500 border-2 border-green-300' 
                            : 'bg-red-500 border-2 border-red-300'
                        }`}
                        style={{
                          left: component.position.x,
                          top: component.position.y
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <div className="flex items-center space-x-2">
                          {component.isCorrect ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                          <span>{component.name}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Game Result Modal */}
              <AnimatePresence>
                {gameState !== 'playing' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center"
                    >
                      {gameState === 'completed' ? (
                        <>
                          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trophy className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">Congratulations!</h3>
                          <p className="text-gray-600 mb-4">You successfully built the {currentGame?.title}!</p>
                          <div className="text-3xl font-bold text-green-600 mb-6">{score} Points</div>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <XCircle className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">Try Again!</h3>
                          <p className="text-gray-600 mb-6">Some components aren't in the right place. Keep trying!</p>
                        </>
                      )}
                      
                      <div className="flex space-x-4">
                        <motion.button
                          onClick={resetGame}
                          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Play Again
                        </motion.button>
                        <motion.button
                          onClick={() => setSelectedGame(null)}
                          className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Choose Game
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BuildItRight;