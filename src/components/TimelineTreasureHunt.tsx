import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trophy, ArrowLeft, CheckCircle, XCircle, Lightbulb, Target, Star, Award } from 'lucide-react';
import { Language, GameQuestion, CollectibleCard } from '../types';

interface TimelineTreasureHuntProps {
  language: Language;
  onBack: () => void;
  onGameComplete?: (score: { score: number; maxScore: number; time?: number }) => void;
}

const TimelineTreasureHunt: React.FC<TimelineTreasureHuntProps> = ({ language, onBack, onGameComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [gameState, setGameState] = useState<'playing' | 'finished' | 'paused'>('playing');
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [collectedCards, setCollectedCards] = useState<CollectibleCard[]>([]);
  const [showCardReward, setShowCardReward] = useState<CollectibleCard | null>(null);
  const [startTime] = useState<number>(Date.now());

  const questions: GameQuestion[] = [
    {
      id: '1',
      question: 'This ancient board game from India involves strategic warfare with pieces representing different military units.',
      clues: [
        'Originally called Chaturanga, meaning "four divisions"',
        'Has a piece that can only move diagonally',
        'The goal is to capture the enemy king',
        'Spread from India to Persia and then Europe'
      ],
      answer: 'Chess',
      invention: {
        id: '1',
        name: 'Chess',
        description: 'Strategic board game that became the foundation for modern chess',
        inventor: 'Ancient Indian scholars',
        year: 600,
        location: 'Northern India',
        category: 'Games & Strategy',
        significance: 'World\'s most popular strategy game'
      },
      difficulty: 'medium',
      points: 20
    },
    {
      id: '2',
      question: 'This mathematical concept revolutionized calculations and made modern mathematics possible.',
      clues: [
        'Represents nothingness or empty space',
        'Essential for the decimal system',
        'Makes place value notation possible',
        'First used as a number by Brahmagupta in 628 CE'
      ],
      answer: 'Zero',
      invention: {
        id: '2',
        name: 'Zero',
        description: 'Mathematical concept of nothingness that enabled modern mathematics',
        inventor: 'Brahmagupta',
        year: 628,
        location: 'Rajasthan',
        category: 'Mathematics',
        significance: 'Foundation of modern mathematics and computing'
      },
      difficulty: 'easy',
      points: 10
    },
    {
      id: '3',
      question: 'This ancient healing system focuses on balance between mind, body, and spirit.',
      clues: [
        'Uses herbs, diet, and lifestyle changes for treatment',
        'Means "knowledge of life" in Sanskrit',
        'Emphasizes prevention over cure',
        'One of the world\'s oldest medical systems'
      ],
      answer: 'Ayurveda',
      invention: {
        id: '3',
        name: 'Ayurveda',
        description: 'Comprehensive system of medicine focusing on holistic health',
        inventor: 'Ancient Indian physicians',
        year: -1500,
        location: 'Ancient India',
        category: 'Medicine & Health',
        significance: 'World\'s oldest medical system emphasizing prevention'
      },
      difficulty: 'medium',
      points: 20
    },
    {
      id: '4',
      question: 'This practice combines physical postures, breathing techniques, and meditation.',
      clues: [
        'Means "union" or "to join" in Sanskrit',
        'Includes physical poses called asanas',
        'Often practiced on a mat',
        'Has eight limbs according to Patanjali\'s system'
      ],
      answer: 'Yoga',
      invention: {
        id: '4',
        name: 'Yoga',
        description: 'Physical, mental, and spiritual practices for achieving harmony',
        inventor: 'Patanjali and ancient sages',
        year: -3000,
        location: 'Indus Valley',
        category: 'Health & Spirituality',
        significance: 'Global practice for physical fitness and mental well-being'
      },
      difficulty: 'easy',
      points: 10
    },
    {
      id: '5',
      question: 'This advanced metallurgy technique produced steel so fine it became legendary worldwide.',
      clues: [
        'Known for its distinctive watered pattern',
        'Superior to European steel of its time',
        'Used to make the famous Damascus blades',
        'The secret of its making was eventually lost'
      ],
      answer: 'Wootz Steel',
      invention: {
        id: '5',
        name: 'Wootz Steel',
        description: 'Superior steel production creating legendary Damascus steel',
        inventor: 'Ancient Indian metallurgists',
        year: 400,
        location: 'Southern India',
        category: 'Technology & Engineering',
        significance: 'Produced the world\'s finest steel for centuries'
      },
      difficulty: 'hard',
      points: 30
    }
  ];

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      finishGame();
    }
  }, [timeLeft, gameState]);

  const finishGame = () => {
    const completionTime = Math.floor((Date.now() - startTime) / 1000);
    const maxPossibleScore = questions.reduce((sum, q) => sum + q.points, 0);
    
    setGameState('finished');
    
    if (onGameComplete) {
      onGameComplete({
        score,
        maxScore: maxPossibleScore,
        time: completionTime
      });
    }
  };

  const handleAnswerSubmit = () => {
    const correct = selectedAnswer.toLowerCase() === questions[currentQuestion].answer.toLowerCase();
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    
    if (correct) {
      const points = questions[currentQuestion].points;
      setScore(score + points);
      
      // Award collectible card
      const newCard: CollectibleCard = {
        id: questions[currentQuestion].id,
        invention: questions[currentQuestion].invention,
        rarity: questions[currentQuestion].difficulty === 'hard' ? 'legendary' : 
                questions[currentQuestion].difficulty === 'medium' ? 'rare' : 'common',
        unlocked: true,
        dateUnlocked: new Date()
      };
      
      setCollectedCards(prev => [...prev, newCard]);
      setShowCardReward(newCard);
      
      setTimeout(() => setShowCardReward(null), 3000);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setShowResult(false);
      } else {
        finishGame();
      }
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreGrade = () => {
    const maxPossible = questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = (score / maxPossible) * 100;
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { grade: 'D', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'rare': return 'from-purple-400 to-blue-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  if (gameState === 'finished') {
    const scoreGrade = getScoreGrade();
    
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-8 text-white text-center">
              <Trophy className="h-16 w-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-2">Quest Complete!</h1>
              <p className="text-lg opacity-90">Your treasure hunt adventure is finished</p>
            </div>
            
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Results */}
                <div>
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center px-6 py-3 ${scoreGrade.bgColor} rounded-full mb-4`}>
                      <span className={`text-2xl font-bold ${scoreGrade.color}`}>
                        Grade: {scoreGrade.grade}
                      </span>
                    </div>
                    
                    <div className="text-4xl font-bold text-gray-800 mb-2">
                      {score} points
                    </div>
                    
                    <p className="text-gray-600">
                      You answered {answers.filter((answer, index) => 
                        answer.toLowerCase() === questions[index].answer.toLowerCase()
                      ).length} out of {questions.length} questions correctly
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                    <h3 className="font-bold text-gray-800 mb-4">Your Performance</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Correct Answers:</span>
                        <span className="font-semibold text-green-600">
                          {answers.filter((answer, index) => 
                            answer.toLowerCase() === questions[index].answer.toLowerCase()
                          ).length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time Used:</span>
                        <span className="font-semibold">{formatTime(300 - timeLeft)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cards Collected:</span>
                        <span className="font-semibold text-purple-600">{collectedCards.length}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      onClick={onBack}
                      className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Back to Home
                    </motion.button>
                    
                    <motion.button
                      onClick={() => {
                        setCurrentQuestion(0);
                        setScore(0);
                        setTimeLeft(300);
                        setGameState('playing');
                        setSelectedAnswer('');
                        setShowResult(false);
                        setAnswers([]);
                        setCollectedCards([]);
                      }}
                      className="px-8 py-3 border-2 border-yellow-300 text-yellow-700 rounded-xl font-semibold hover:bg-yellow-50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Play Again
                    </motion.button>
                  </div>
                </div>

                {/* Collected Cards */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Collection</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {collectedCards.map((card) => (
                      <motion.div
                        key={card.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`bg-gradient-to-r ${getRarityColor(card.rarity)} p-4 rounded-xl text-white shadow-lg`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold">{card.invention.name}</h4>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4" />
                            <span className="text-sm capitalize">{card.rarity}</span>
                          </div>
                        </div>
                        <p className="text-sm opacity-90">{card.invention.description}</p>
                        <div className="text-xs opacity-75 mt-2">
                          Unlocked: {card.dateUnlocked?.toLocaleDateString()}
                        </div>
                      </motion.div>
                    ))}
                    
                    {collectedCards.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Award className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No cards collected this round</p>
                        <p className="text-sm">Answer questions correctly to earn collectible cards!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer.toLowerCase() === currentQ.answer.toLowerCase();

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-yellow-600 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </motion.button>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-md">
              <Clock className="h-5 w-5 text-yellow-600" />
              <span className="font-bold text-yellow-600">{formatTime(timeLeft)}</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-md">
              <Trophy className="h-5 w-5 text-orange-600" />
              <span className="font-bold text-orange-600">{score} pts</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-md">
              <Star className="h-5 w-5 text-purple-600" />
              <span className="font-bold text-purple-600">{collectedCards.length} cards</span>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-yellow-600 capitalize">
                {currentQ.difficulty}
              </span>
              <span className="text-sm text-gray-500">
                {currentQ.points} pts
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-8 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="h-8 w-8" />
              <h2 className="text-2xl font-bold">Treasure Hunt Clue</h2>
            </div>
            <p className="text-lg leading-relaxed opacity-90">
              {currentQ.question}
            </p>
          </div>

          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="h-5 w-5 text-orange-500" />
                <span className="font-semibold text-gray-700">Clues:</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-3">
                {currentQ.clues.map((clue, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl"
                  >
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{clue}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Your Answer:
              </label>
              <input
                type="text"
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                placeholder="Enter the name of the invention..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                disabled={showResult}
              />
            </div>

            <AnimatePresence>
              {showResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`p-6 rounded-2xl border-2 ${
                    isCorrect 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {isCorrect ? (
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-600" />
                    )}
                    <div>
                      <h3 className={`text-xl font-bold ${
                        isCorrect ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                      </h3>
                      <p className={`${
                        isCorrect ? 'text-green-600' : 'text-red-600'
                      }`}>
                        The answer is: <strong>{currentQ.answer}</strong>
                        {isCorrect && (
                          <span className="ml-2 text-yellow-600 font-bold">
                            +{currentQ.points} points!
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">About this invention:</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {currentQ.invention.description} - {currentQ.invention.significance}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  onClick={handleAnswerSubmit}
                  disabled={!selectedAnswer.trim()}
                  className="w-full py-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Answer
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Card Reward Notification */}
        <AnimatePresence>
          {showCardReward && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              className="fixed bottom-8 right-8 z-50"
            >
              <div className={`bg-gradient-to-r ${getRarityColor(showCardReward.rarity)} p-6 rounded-2xl text-white shadow-2xl max-w-sm`}>
                <div className="flex items-center space-x-3 mb-3">
                  <Star className="h-6 w-6" />
                  <span className="font-bold">Card Unlocked!</span>
                </div>
                <h4 className="font-bold text-lg">{showCardReward.invention.name}</h4>
                <p className="text-sm opacity-90 capitalize">{showCardReward.rarity} Card</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TimelineTreasureHunt;