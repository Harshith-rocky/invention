import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, RefreshCw, Lightbulb } from 'lucide-react';
import { Language } from '../types';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface WhatIfChatProps {
  language: Language;
}

const WhatIfChat: React.FC<WhatIfChatProps> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your What-If History Explorer. I can help you explore alternative timelines for Indian inventions. Try asking me something like 'What if chess was never invented in India?' or 'What if zero wasn't discovered by Indian mathematicians?'",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What if chess was never invented in India?",
    "What if the concept of zero wasn't discovered?",
    "What if Ayurveda wasn't developed in ancient India?",
    "What if yoga never originated in India?",
    "What if Indian steel-making techniques weren't advanced?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = (userMessage: string): string => {
    const responses = {
      chess: "Fascinating question! If chess hadn't been invented in India, the world of strategic thinking would be very different. Chess, known as 'Chaturanga' in ancient India, influenced military strategy, mathematical thinking, and even computer science. Without it, we might not have developed the same level of strategic planning in warfare, business, or technology. Board games might have evolved differently, and the concept of artificial intelligence might have taken a different path, as chess has been crucial in AI development.",
      
      zero: "What an incredible thought experiment! Without the Indian concept of zero, mathematics and science would be fundamentally different. The decimal system, algebra, calculus, and modern computing would either not exist or be incredibly complex. European mathematics was revolutionized when they adopted the Indian numeral system. Without zero, we might still be using Roman numerals for calculations, making scientific advancement much slower. The digital age might never have arrived!",
      
      ayurveda: "If Ayurveda hadn't been developed, holistic medicine might have evolved very differently. This 5000-year-old system influenced medical practices worldwide, emphasizing prevention and treating the root cause rather than just symptoms. Without Ayurveda, modern integrative medicine might not exist, and our understanding of the mind-body connection could be limited. The global wellness industry, worth billions today, might have taken a completely different form.",
      
      yoga: "Without yoga originating in India, physical and mental wellness practices globally would look very different! Yoga has influenced everything from physical therapy to stress management techniques. The concept of mindfulness, now widely adopted in psychology and medicine, has deep roots in yogic philosophy. Modern stress management, meditation apps, and even corporate wellness programs might not exist. Physical rehabilitation and sports training would also be different without yoga's influence.",
      
      steel: "If India hadn't developed advanced steel-making techniques, the course of global technology and warfare would be dramatically altered. Indian wootz steel was so superior that it became legendary (Damascus steel was made from Indian wootz). Without these techniques, the Industrial Revolution might have been delayed, modern construction would be different, and even the development of precision instruments and tools would have taken alternative paths. India's trade relationships with other civilizations would also have been vastly different.",
      
      default: "That's a thought-provoking question! Indian innovations have had profound impacts on world civilization. Each invention created ripple effects that shaped how we live, think, and interact today. Consider how the absence of any major Indian contribution would have changed the trajectory of human knowledge and development. What specific aspect of this alternative timeline interests you most?"
    };

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('chess') || lowerMessage.includes('chaturanga')) {
      return responses.chess;
    } else if (lowerMessage.includes('zero') || lowerMessage.includes('number')) {
      return responses.zero;
    } else if (lowerMessage.includes('ayurveda') || lowerMessage.includes('medicine')) {
      return responses.ayurveda;
    } else if (lowerMessage.includes('yoga') || lowerMessage.includes('meditation')) {
      return responses.yoga;
    } else if (lowerMessage.includes('steel') || lowerMessage.includes('metal')) {
      return responses.steel;
    } else {
      return responses.default;
    }
  };

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || inputValue.trim();
    if (!content) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: simulateBotResponse(content),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([messages[0]]); // Keep the initial bot message
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mb-6">
            <Sparkles className="h-5 w-5 text-orange-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">
              Alternative History Explorer
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            What-If Scenarios
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore alternative timelines and discover how different choices could have shaped history
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI History Explorer</h3>
                  <p className="text-sm opacity-90">Ready to explore alternative timelines</p>
                </div>
              </div>
              
              <motion.button
                onClick={clearChat}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
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
                        : 'bg-gradient-to-br from-blue-500 to-purple-500'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="h-5 w-5 text-white" />
                      ) : (
                        <Bot className="h-5 w-5 text-white" />
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
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                    <Bot className="h-5 w-5 text-white" />
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="px-6 pb-4"
            >
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-600">Suggested Questions:</span>
              </div>
              
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="block w-full text-left p-3 bg-gray-50 hover:bg-orange-50 rounded-xl transition-colors text-sm text-gray-700 hover:text-orange-700"
                    whileHover={{ x: 4 }}
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Input */}
          <div className="border-t border-gray-100 p-6">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about alternative history scenarios..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows={2}
                  disabled={isTyping}
                />
              </div>
              
              <motion.button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhatIfChat;