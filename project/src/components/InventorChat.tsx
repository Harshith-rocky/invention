import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, User, Bot, BookOpen, Calendar, MapPin, Lightbulb } from 'lucide-react';
import { Language } from '../types';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'inventor';
  timestamp: Date;
}

interface Inventor {
  id: string;
  name: string;
  invention: string;
  period: string;
  location: string;
  description: string;
  personality: string;
  avatar: string;
  background: string;
}

interface InventorChatProps {
  language: Language;
  onBack: () => void;
}

const InventorChat: React.FC<InventorChatProps> = ({ language, onBack }) => {
  const [selectedInventor, setSelectedInventor] = useState<Inventor | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const inventors: Inventor[] = [
    {
      id: 'brahmagupta',
      name: 'Brahmagupta',
      invention: 'Zero and Mathematical Rules',
      period: '628 CE',
      location: 'Rajasthan, India',
      description: 'Ancient mathematician who first gave rules for computing with zero',
      personality: 'Wise, methodical, passionate about mathematical precision',
      avatar: '🧮',
      background: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'sushruta',
      name: 'Sushruta',
      invention: 'Plastic Surgery & Medical Procedures',
      period: '600 BCE',
      location: 'Ancient India',
      description: 'Ancient surgeon who pioneered plastic surgery and cataract operations',
      personality: 'Compassionate healer, innovative, detail-oriented',
      avatar: '⚕️',
      background: 'from-green-500 to-emerald-600'
    },
    {
      id: 'charaka',
      name: 'Charaka',
      invention: 'Ayurvedic Medicine System',
      period: '300 BCE',
      location: 'Ancient India',
      description: 'Father of Ayurveda who systematized holistic medicine',
      personality: 'Holistic thinker, patient teacher, deeply spiritual',
      avatar: '🌿',
      background: 'from-green-500 to-teal-600'
    },
    {
      id: 'patanjali',
      name: 'Patanjali',
      invention: 'Yoga Philosophy & Practice',
      period: '400 CE',
      location: 'Ancient India',
      description: 'Sage who compiled the Yoga Sutras and systematized yoga practice',
      personality: 'Serene, philosophical, focused on inner peace',
      avatar: '🧘',
      background: 'from-purple-500 to-pink-600'
    },
    {
      id: 'tipu',
      name: 'Tipu Sultan',
      invention: 'Mysorean Rockets',
      period: '1780 CE',
      location: 'Mysore Kingdom',
      description: 'Ruler and innovator who developed advanced military rockets',
      personality: 'Strategic, innovative, fiercely independent',
      avatar: '🚀',
      background: 'from-orange-500 to-red-600'
    },
    {
      id: 'ancient_sage',
      name: 'Ancient Chess Master',
      invention: 'Chess (Chaturanga)',
      period: '600 CE',
      location: 'Northern India',
      description: 'Legendary strategist who created the game of chess',
      personality: 'Strategic thinker, patient teacher, loves intellectual challenges',
      avatar: '♟️',
      background: 'from-gray-600 to-gray-800'
    },
    {
      id: 'aryabhata',
      name: 'Aryabhata',
      invention: 'Trigonometry & Astronomy',
      period: '499 CE',
      location: 'Ancient India',
      description: 'Mathematician and astronomer who developed trigonometry',
      personality: 'Brilliant observer, precise calculator, cosmic thinker',
      avatar: '🔭',
      background: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'virahanka',
      name: 'Virahanka',
      invention: 'Fibonacci Numbers',
      period: '1150 CE',
      location: 'Karnataka',
      description: 'Mathematician who first described the Fibonacci sequence',
      personality: 'Pattern seeker, poetic mathematician, nature lover',
      avatar: '🔢',
      background: 'from-teal-500 to-cyan-600'
    },
    {
      id: 'indus_engineer',
      name: 'Indus Valley Engineer',
      invention: 'Urban Planning & Sanitation',
      period: '2600 BCE',
      location: 'Indus Valley',
      description: 'Ancient engineer who designed the world\'s first urban sanitation systems',
      personality: 'Practical visionary, community-focused, engineering genius',
      avatar: '🏗️',
      background: 'from-amber-500 to-orange-600'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = (inventor: Inventor) => {
    const welcomeMessage: Message = {
      id: '1',
      content: `Greetings! I am ${inventor.name}, creator of ${inventor.invention}. I lived in ${inventor.period} in ${inventor.location}. I'm delighted to share my knowledge and experiences with you. What would you like to know about my work, my time, or the challenges I faced?`,
      sender: 'inventor',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  const generateInventorResponse = (userMessage: string, inventor: Inventor): string => {
    const responses = {
      brahmagupta: {
        about: "I spent my life studying the mysteries of numbers. Zero was not just a symbol to me - it represented the void, the beginning of all possibilities. When I wrote the Brahmasphutasiddhanta, I wanted to give mathematicians tools to calculate with precision.",
        challenges: "The greatest challenge was convincing scholars that 'nothing' could be 'something' - that zero was a number with its own properties. Many thought it was philosophical nonsense!",
        invention: "Zero allows for place value notation. Without it, you cannot have our decimal system. I also established rules: zero minus zero equals zero, and any number multiplied by zero equals zero.",
        modern: "I'm amazed that my work with zero became the foundation for your computers and digital technology! Every calculation in your modern world uses principles I helped establish.",
        default: "Mathematics is the language of the universe. Every pattern, every calculation, every discovery builds upon the foundation of understanding numbers and their relationships."
      },
      sushruta: {
        about: "I dedicated my life to healing and understanding the human body. Surgery was not just cutting - it required deep knowledge of anatomy, careful preparation, and gentle hands.",
        challenges: "Operating without your modern anesthesia was incredibly difficult. We used wine and herbs to dull pain, but patients needed tremendous courage. Keeping wounds clean was also a constant battle.",
        invention: "I developed techniques for rhinoplasty - rebuilding noses - and cataract surgery. The Sushruta Samhita describes over 300 surgical procedures and 120 surgical instruments.",
        modern: "I'm thrilled that modern plastic surgery still uses principles I developed! The idea of reconstructive surgery to restore both function and appearance remains unchanged.",
        default: "A surgeon must have the heart of a lion, the hands of a woman, and the eyes of an eagle. Healing is both art and science."
      },
      charaka: {
        about: "I believed in treating the whole person, not just the disease. The body, mind, and spirit are interconnected - healing one requires understanding all three.",
        challenges: "Convincing people that prevention is better than cure was difficult. Many wanted quick fixes rather than lifestyle changes. Also, training physicians to think holistically took years.",
        invention: "Ayurveda is not just medicine - it's a way of living in harmony with nature. I systematized treatments based on individual constitution, seasonal changes, and life stages.",
        modern: "I'm pleased that your modern medicine is rediscovering holistic approaches! Personalized medicine and preventive care were always central to Ayurveda.",
        default: "Health is not merely the absence of disease, but a state of complete physical, mental, and spiritual well-being. This balance is the key to a fulfilling life."
      },
      patanjali: {
        about: "I sought to understand the nature of consciousness and how to achieve inner peace. Yoga is not just physical exercise - it's a complete system for spiritual development.",
        challenges: "The greatest challenge was explaining that true yoga is about controlling the mind, not just the body. Many focused only on physical postures and missed the deeper purpose.",
        invention: "The eight limbs of yoga - ethical guidelines, physical practices, breathing techniques, and meditation - form a complete path to self-realization and inner peace.",
        modern: "I'm amazed that yoga has spread worldwide! Though I hope people remember that the physical poses are just preparation for the deeper spiritual practices.",
        default: "Yoga is the cessation of fluctuations of the mind. When the mind is still, we can see our true nature and find lasting peace."
      },
      tipu: {
        about: "I was both a ruler and an innovator. My kingdom faced constant threats from colonial powers, so I had to think strategically about both warfare and technology.",
        challenges: "Fighting against superior numbers and resources required innovation. I had to develop new weapons while also protecting my people and maintaining our independence.",
        invention: "My rockets used iron tubes instead of bamboo, making them more powerful and accurate. They could travel over a mile and struck fear into enemy forces.",
        modern: "I'm fascinated that rocket technology led to space exploration! From defending my kingdom to reaching the stars - what an incredible journey.",
        default: "Innovation comes from necessity. When faced with challenges, we must think beyond conventional solutions and dare to try new approaches."
      },
      ancient_sage: {
        about: "I created Chaturanga to teach strategy and warfare to princes. Each piece represents a different military unit, and the game mirrors the complexities of battle.",
        challenges: "Balancing the game was difficult - making it challenging but fair, educational but entertaining. I wanted it to develop strategic thinking, not just provide amusement.",
        invention: "Chaturanga means 'four divisions' - infantry, cavalry, elephants, and chariots. The king must be protected while using all forces strategically.",
        modern: "I'm amazed that chess became a global game! And that it's now used to develop artificial intelligence - the strategic principles remain timeless.",
        default: "Strategy is about seeing many moves ahead, understanding your opponent, and using all your resources wisely. These lessons apply to life, not just games."
      },
      aryabhata: {
        about: "I studied the movements of celestial bodies and developed mathematical tools to understand the cosmos. Trigonometry was essential for accurate astronomical calculations.",
        challenges: "Creating precise sine tables without modern instruments was incredibly challenging. I had to develop new methods for calculating astronomical positions.",
        invention: "I introduced sine functions and created tables that astronomers used for centuries. My work helped predict eclipses and planetary movements.",
        modern: "I'm amazed that trigonometry is now used in computer graphics, GPS systems, and engineering! The mathematical principles remain unchanged.",
        default: "The universe follows mathematical laws. By understanding these patterns, we can predict celestial events and navigate both land and sea."
      },
      virahanka: {
        about: "I discovered beautiful patterns in numbers while studying Sanskrit poetry meters. Mathematics and art are deeply connected - both reveal the harmony of creation.",
        challenges: "Explaining how numbers could appear in nature was difficult. People saw mathematics as abstract, but I showed them it exists everywhere around us.",
        invention: "The sequence where each number equals the sum of the two before it appears in flower petals, shell spirals, and tree branches. Nature follows mathematical rules!",
        modern: "I'm delighted that this sequence is now used in computer algorithms and financial markets! The patterns I found in poetry are everywhere in your modern world.",
        default: "Mathematics is the poetry of the universe. Every spiral, every growth pattern, every natural form follows the same beautiful numerical relationships."
      },
      indus_engineer: {
        about: "I designed cities where every citizen had access to clean water and proper sanitation. Urban planning must serve the community's health and well-being.",
        challenges: "Creating drainage systems that worked during both dry and monsoon seasons was complex. We had to engineer solutions that lasted for generations.",
        invention: "Our cities had the world's first flush toilets, covered drains, and standardized brick sizes. Every house connected to the city-wide water and waste system.",
        modern: "I'm proud that modern cities still use principles we developed! Clean water and proper sanitation remain the foundation of healthy urban life.",
        default: "A civilization is judged by how it treats its people's basic needs. Clean water, proper sanitation, and well-planned cities are the foundation of human progress."
      }
    };

    const inventorResponses = responses[inventor.id as keyof typeof responses];
    if (!inventorResponses) {
      return "I appreciate your question! As an ancient innovator, I'm always eager to share knowledge about my work and the challenges of my time.";
    }

    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('about') || lowerMessage.includes('yourself') || lowerMessage.includes('who')) {
      return inventorResponses.about;
    } else if (lowerMessage.includes('challenge') || lowerMessage.includes('difficult') || lowerMessage.includes('problem')) {
      return inventorResponses.challenges;
    } else if (lowerMessage.includes('invention') || lowerMessage.includes('create') || lowerMessage.includes('develop')) {
      return inventorResponses.invention;
    } else if (lowerMessage.includes('modern') || lowerMessage.includes('today') || lowerMessage.includes('now')) {
      return inventorResponses.modern;
    } else {
      return inventorResponses.default;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !selectedInventor) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const inventorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateInventorResponse(inputValue, selectedInventor),
        sender: 'inventor',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, inventorResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "Tell me about yourself and your work",
    "What challenges did you face creating your invention?",
    "How do you think your invention impacts the modern world?",
    "What inspired you to pursue this field?",
    "What advice would you give to young innovators?"
  ];

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
            onClick={selectedInventor ? () => setSelectedInventor(null) : onBack}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-orange-600 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{selectedInventor ? 'Choose Inventor' : 'Back to Home'}</span>
          </motion.button>

          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-md">
            <BookOpen className="h-5 w-5 text-orange-600" />
            <span className="font-bold text-orange-600">Chat with Inventors</span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedInventor ? (
            <motion.div
              key="inventor-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Title */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mb-6">
                  <User className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Meet the Innovators
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Chat with Inventors
                </h1>
                
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Have conversations with history's greatest Indian innovators. Ask them about their inventions, challenges, and insights.
                </p>
                
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                    <span className="text-sm font-medium text-blue-700">
                      🎭 Now featuring {inventors.length} legendary inventors!
                    </span>
                  </div>
                </div>
              </div>

              {/* Inventors Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {inventors.map((inventor, index) => (
                  <motion.div
                    key={inventor.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => {
                      setSelectedInventor(inventor);
                      initializeChat(inventor);
                    }}
                    whileHover={{ y: -10 }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-orange-200 h-full">
                      <div className={`bg-gradient-to-br ${inventor.background} p-6 text-white`}>
                        <div className="text-center mb-4">
                          <div className="text-4xl mb-3">{inventor.avatar}</div>
                          <h3 className="text-xl font-bold group-hover:scale-105 transition-transform">
                            {inventor.name}
                          </h3>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm opacity-90 font-medium mb-1">
                            {inventor.invention}
                          </p>
                          <p className="text-xs opacity-75">
                            {inventor.period}
                          </p>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-gray-600">Period:</span>
                            <span className="ml-2 font-medium">{inventor.period}</span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-gray-600">Location:</span>
                            <span className="ml-2 font-medium">{inventor.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {inventor.description}
                        </p>
                        
                        <div className="bg-orange-50 rounded-xl p-3">
                          <p className="text-orange-700 text-xs font-medium">
                            Personality: {inventor.personality}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chat-interface"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              {/* Chat Header */}
              <div className="bg-white rounded-t-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className={`bg-gradient-to-r ${selectedInventor.background} p-6 text-white`}>
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{selectedInventor.avatar}</div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedInventor.name}</h2>
                      <p className="opacity-90">{selectedInventor.invention}</p>
                      <p className="text-sm opacity-75">{selectedInventor.period} • {selectedInventor.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="bg-white border-x border-gray-100 h-96 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-3 max-w-3xl ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`p-2 rounded-xl ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-br from-orange-500 to-red-500' 
                            : `bg-gradient-to-br ${selectedInventor.background}`
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="h-5 w-5 text-white" />
                          ) : (
                            <span className="text-lg">{selectedInventor.avatar}</span>
                          )}
                        </div>
                        
                        <div className={`p-4 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-br from-orange-100 to-red-100 text-orange-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="leading-relaxed">{message.content}</p>
                          <div className="text-xs opacity-70 mt-2">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 bg-gradient-to-br ${selectedInventor.background} rounded-xl`}>
                        <span className="text-lg text-white">{selectedInventor.avatar}</span>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="bg-white border-x border-gray-100 px-6 pb-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Lightbulb className="h-5 w-5 text-orange-500" />
                    <span className="text-sm font-medium text-gray-600">Suggested Questions:</span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setInputValue(question)}
                        className="text-left p-3 bg-gray-50 hover:bg-orange-50 rounded-xl transition-colors text-sm text-gray-700 hover:text-orange-700"
                        whileHover={{ x: 4 }}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input */}
              <div className="bg-white rounded-b-3xl shadow-lg border border-gray-100 border-t-0 p-6">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Ask ${selectedInventor.name} anything...`}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      rows={2}
                      disabled={isTyping}
                    />
                  </div>
                  
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className={`px-6 py-3 bg-gradient-to-r ${selectedInventor.background} text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InventorChat;