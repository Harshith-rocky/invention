import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Palette, Download, Share2, Lightbulb, Scroll, Sparkles, Award } from 'lucide-react';
import { Language, InventionChallenge } from '../types';

interface InventChallengeProps {
  language: Language;
  onBack: () => void;
}

const InventChallenge: React.FC<InventChallengeProps> = ({ language, onBack }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<InventionChallenge | null>(null);
  const [userInvention, setUserInvention] = useState({
    name: '',
    description: '',
    purpose: '',
    materials: '',
    impact: ''
  });
  const [drawing, setDrawing] = useState<string>('');
  const [showPatent, setShowPatent] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const challenges: InventionChallenge[] = [
    {
      id: '1',
      prompt: 'Create an invention to help farmers during monsoon season',
      era: '800 AD - Medieval India',
      constraints: [
        'Must use materials available in 800 AD',
        'Should work without electricity',
        'Must be affordable for common farmers',
        'Should solve water management issues'
      ],
      examples: [
        'Advanced irrigation systems',
        'Water storage solutions',
        'Crop protection devices',
        'Drainage mechanisms'
      ]
    },
    {
      id: '2',
      prompt: 'Design a communication system for ancient trade routes',
      era: '300 BCE - Mauryan Empire',
      constraints: [
        'Must work across long distances',
        'Should be faster than walking messengers',
        'Must use ancient technology only',
        'Should be reliable in all weather'
      ],
      examples: [
        'Signal fire networks',
        'Drum communication systems',
        'Carrier pigeon improvements',
        'Visual signaling devices'
      ]
    },
    {
      id: '3',
      prompt: 'Invent a tool to help ancient astronomers',
      era: '500 CE - Gupta Period',
      constraints: [
        'Must improve astronomical observations',
        'Should be portable for traveling scholars',
        'Must use available metals and materials',
        'Should work day and night'
      ],
      examples: [
        'Advanced astrolabes',
        'Star mapping devices',
        'Time measurement tools',
        'Celestial calculators'
      ]
    },
    {
      id: '4',
      prompt: 'Create a medical device for ancient surgeons',
      era: '600 BCE - Time of Sushruta',
      constraints: [
        'Must assist in surgical procedures',
        'Should be sterilizable with available methods',
        'Must be precise and reliable',
        'Should improve patient outcomes'
      ],
      examples: [
        'Surgical instruments',
        'Wound treatment devices',
        'Anesthesia delivery systems',
        'Diagnostic tools'
      ]
    },
    {
      id: '5',
      prompt: 'Design a learning tool for ancient students',
      era: '400 CE - University Period',
      constraints: [
        'Must make learning more effective',
        'Should be reusable and durable',
        'Must work without modern technology',
        'Should accommodate different subjects'
      ],
      examples: [
        'Calculation devices',
        'Memory aids',
        'Writing improvements',
        'Knowledge storage systems'
      ]
    }
  ];

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const generatePatent = () => {
    if (!selectedChallenge || !userInvention.name) return;
    
    setShowPatent(true);
  };

  const downloadPatent = () => {
    // In a real app, this would generate a PDF
    const patentContent = `
ANCIENT INDIAN PATENT SCROLL
═══════════════════════════════

Invention: ${userInvention.name}
Era: ${selectedChallenge?.era}
Inventor: [Your Name]
Date: ${new Date().toLocaleDateString()}

DESCRIPTION:
${userInvention.description}

PURPOSE:
${userInvention.purpose}

MATERIALS REQUIRED:
${userInvention.materials}

EXPECTED IMPACT:
${userInvention.impact}

CHALLENGE ADDRESSED:
${selectedChallenge?.prompt}

═══════════════════════════════
Certified by the Ancient Innovation Council
    `;

    const element = document.createElement('a');
    const file = new Blob([patentContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${userInvention.name}_patent.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
            onClick={selectedChallenge ? () => setSelectedChallenge(null) : onBack}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-pink-600 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{selectedChallenge ? 'Back to Challenges' : 'Back to Home'}</span>
          </motion.button>

          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-md">
            <Palette className="h-5 w-5 text-pink-600" />
            <span className="font-bold text-pink-600">Invent This!</span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedChallenge ? (
            <motion.div
              key="challenge-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Title */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full mb-6">
                  <Lightbulb className="h-5 w-5 text-pink-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Creative Innovation Challenge
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Invent This!
                </h1>
                
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Step into the shoes of ancient Indian innovators. Choose a historical challenge and create your own invention using period-appropriate technology.
                </p>
              </div>

              {/* Challenges Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedChallenge(challenge)}
                    whileHover={{ y: -10 }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-pink-200 h-full">
                      <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <Lightbulb className="h-8 w-8" />
                          </div>
                          <div className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            Challenge #{challenge.id}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 group-hover:scale-105 transition-transform">
                          {challenge.prompt}
                        </h3>
                        
                        <p className="text-sm opacity-90 font-medium">
                          {challenge.era}
                        </p>
                      </div>

                      <div className="p-6">
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 mb-2">Constraints:</h4>
                          <div className="space-y-1">
                            {challenge.constraints.slice(0, 2).map((constraint, idx) => (
                              <div key={idx} className="text-sm text-gray-600">
                                • {constraint}
                              </div>
                            ))}
                            {challenge.constraints.length > 2 && (
                              <div className="text-sm text-gray-500 italic">
                                +{challenge.constraints.length - 2} more constraints...
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-pink-50 rounded-xl p-3">
                          <h4 className="font-semibold text-pink-800 mb-2">Example Ideas:</h4>
                          <div className="text-sm text-pink-700">
                            {challenge.examples.slice(0, 2).join(', ')}...
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
              key="invention-creator"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Challenge Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  {selectedChallenge.prompt}
                </h1>
                <p className="text-lg text-gray-600">
                  Era: {selectedChallenge.era}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column: Challenge Details & Form */}
                <div className="space-y-6">
                  {/* Challenge Details */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Challenge Details</h2>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-700 mb-2">Constraints:</h3>
                      <div className="space-y-2">
                        {selectedChallenge.constraints.map((constraint, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600 text-sm">{constraint}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Example Solutions:</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedChallenge.examples.map((example, index) => (
                          <div key={index} className="bg-pink-50 rounded-lg p-2 text-sm text-pink-700">
                            {example}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Invention Form */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Describe Your Invention</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Invention Name
                        </label>
                        <input
                          type="text"
                          value={userInvention.name}
                          onChange={(e) => setUserInvention(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Give your invention a creative name..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={userInvention.description}
                          onChange={(e) => setUserInvention(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="How does your invention work?"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Purpose & Benefits
                        </label>
                        <textarea
                          value={userInvention.purpose}
                          onChange={(e) => setUserInvention(prev => ({ ...prev, purpose: e.target.value }))}
                          placeholder="What problem does it solve? How does it help people?"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Materials & Construction
                        </label>
                        <textarea
                          value={userInvention.materials}
                          onChange={(e) => setUserInvention(prev => ({ ...prev, materials: e.target.value }))}
                          placeholder="What materials would you use? How would it be built?"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expected Impact
                        </label>
                        <textarea
                          value={userInvention.impact}
                          onChange={(e) => setUserInvention(prev => ({ ...prev, impact: e.target.value }))}
                          placeholder="How would this invention change society or daily life?"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Drawing & Patent */}
                <div className="space-y-6">
                  {/* Drawing Canvas */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-800">Draw Your Invention</h2>
                      <motion.button
                        onClick={clearCanvas}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Clear
                      </motion.button>
                    </div>
                    
                    <canvas
                      ref={canvasRef}
                      width={400}
                      height={300}
                      className="w-full border-2 border-dashed border-gray-300 rounded-xl cursor-crosshair"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />
                    
                    <p className="text-sm text-gray-500 mt-2">
                      Click and drag to draw your invention design
                    </p>
                  </div>

                  {/* Generate Patent */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Create Your Patent</h2>
                    
                    <motion.button
                      onClick={generatePatent}
                      disabled={!userInvention.name || !userInvention.description}
                      className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="flex items-center justify-center">
                        <Scroll className="mr-2 h-5 w-5" />
                        Generate Ancient Patent Scroll
                      </span>
                    </motion.button>

                    {showPatent && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6"
                      >
                        <div className="text-center mb-4">
                          <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                          <h3 className="font-bold text-yellow-800">Patent Scroll Generated!</h3>
                          <p className="text-sm text-yellow-700">Your invention has been officially documented</p>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 mb-4 border border-yellow-200">
                          <div className="text-center mb-3">
                            <h4 className="font-bold text-gray-800">🏛️ ANCIENT INDIAN PATENT SCROLL 🏛️</h4>
                            <div className="text-sm text-gray-600">═══════════════════════════════</div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div><strong>Invention:</strong> {userInvention.name}</div>
                            <div><strong>Era:</strong> {selectedChallenge.era}</div>
                            <div><strong>Challenge:</strong> {selectedChallenge.prompt}</div>
                            <div><strong>Status:</strong> ✅ Certified by Innovation Council</div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <motion.button
                            onClick={downloadPatent}
                            className="flex-1 flex items-center justify-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </motion.button>
                          
                          <motion.button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Share2 className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
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

export default InventChallenge;