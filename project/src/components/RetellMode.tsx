import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Volume2, Download, Share2, Sparkles, FileText, Mic } from 'lucide-react';
import { Language, Invention } from '../types';

interface RetellModeProps {
  language: Language;
  onBack: () => void;
}

const RetellMode: React.FC<RetellModeProps> = ({ language, onBack }) => {
  const [selectedInvention, setSelectedInvention] = useState<Invention | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [generatedStory, setGeneratedStory] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const inventions: Invention[] = [
    {
      id: '1',
      name: 'Chess (Chaturanga)',
      description: 'Strategic board game that became the foundation for modern chess',
      inventor: 'Ancient Indian scholars',
      year: 600,
      location: 'Northern India',
      category: 'Games & Strategy',
      significance: 'World\'s most popular strategy game'
    },
    {
      id: '2',
      name: 'Zero (Shunya)',
      description: 'Mathematical concept that revolutionized calculations',
      inventor: 'Brahmagupta',
      year: 628,
      location: 'Rajasthan',
      category: 'Mathematics',
      significance: 'Foundation of modern mathematics and computing'
    },
    {
      id: '3',
      name: 'Yoga',
      description: 'Physical, mental, and spiritual practices for harmony',
      inventor: 'Patanjali and ancient sages',
      year: -3000,
      location: 'Indus Valley',
      category: 'Health & Spirituality',
      significance: 'Global practice for physical fitness and mental well-being'
    },
    {
      id: '4',
      name: 'Ayurveda',
      description: 'Comprehensive system of holistic medicine',
      inventor: 'Ancient Indian physicians',
      year: -1500,
      location: 'Ancient India',
      category: 'Medicine & Health',
      significance: 'World\'s oldest medical system'
    }
  ];

  const retellStyles = [
    {
      id: 'poetic',
      name: 'Poetic Verse',
      description: 'Transform the story into beautiful poetry with rhythm and rhyme',
      icon: '🎭',
      example: 'In ancient lands where wisdom grew...'
    },
    {
      id: 'kids',
      name: 'Kid-Friendly Tale',
      description: 'Simple, engaging story perfect for young minds',
      icon: '🧸',
      example: 'Once upon a time, in a magical land called India...'
    },
    {
      id: 'cinematic',
      name: 'Cinematic Epic',
      description: 'Dramatic, movie-like narrative with vivid scenes',
      icon: '🎬',
      example: 'The camera pans across ancient India as our story begins...'
    },
    {
      id: 'documentary',
      name: 'Documentary Style',
      description: 'Factual, educational narrative like a nature documentary',
      icon: '📺',
      example: 'In the scholarly halls of ancient India, a revolution was brewing...'
    },
    {
      id: 'adventure',
      name: 'Adventure Story',
      description: 'Exciting quest narrative with heroes and challenges',
      icon: '⚔️',
      example: 'Our hero embarked on a quest to solve the greatest puzzle...'
    },
    {
      id: 'comic',
      name: 'Comic Book Style',
      description: 'Action-packed story with dramatic dialogue',
      icon: '💥',
      example: 'BOOM! The discovery that would change the world forever!'
    }
  ];

  const generateStory = async () => {
    if (!selectedInvention || !selectedStyle) return;

    setIsGenerating(true);
    
    // Simulate story generation
    setTimeout(() => {
      const storyTemplates = {
        poetic: `
**The Ballad of ${selectedInvention.name}**

In ancient times when wisdom flowed,
Through India's sacred, learned abode,
A mind so bright, a soul so keen,
Created what had never been seen.

${selectedInvention.inventor}, with vision clear,
Brought forth an idea we hold dear,
In ${selectedInvention.location}, where knowledge grew,
A gift to humanity, forever true.

The ${selectedInvention.name}, born of thought divine,
Would cross all borders, transcend all time,
From ${selectedInvention.year > 0 ? selectedInvention.year + ' CE' : Math.abs(selectedInvention.year) + ' BCE'} to this very day,
Its influence lights our way.

Oh marvel of the human mind,
A treasure for all humankind,
In India's soil, this seed was sown,
Now worldwide, its worth is known.
        `,
        kids: `
**The Amazing Story of ${selectedInvention.name}**

Once upon a time, in the beautiful land of India, there lived a very smart person named ${selectedInvention.inventor}. They lived in a place called ${selectedInvention.location}, where lots of wise people liked to think about big ideas.

One day, ${selectedInvention.inventor} had a super special idea! They thought, "What if I could create something that would help people all around the world?" And so they worked very hard to invent ${selectedInvention.name}.

This invention was so amazing that it helped people in ways they never imagined! It was like magic, but it was real science and wisdom.

The best part? This wonderful invention traveled from India to countries all over the world, helping millions and millions of people. And even today, we still use this incredible gift from ancient India!

Isn't it amazing how one person's big idea can change the whole world? That's the power of creativity and hard work!
        `,
        cinematic: `
**${selectedInvention.name}: An Epic Tale**

FADE IN:

EXT. ${selectedInvention.location.toUpperCase()} - ${selectedInvention.year > 0 ? selectedInvention.year + ' CE' : Math.abs(selectedInvention.year) + ' BCE'}

The camera sweeps across the ancient landscape of India. Golden sunlight bathes the scholarly centers where great minds gather to push the boundaries of human knowledge.

INT. STUDY CHAMBER - DAY

${selectedInvention.inventor} sits surrounded by scrolls and instruments, their eyes burning with the fire of discovery. The weight of an idea that could change the world rests upon their shoulders.

NARRATOR (V.O.)
In an age when the impossible seemed within reach, one visionary dared to dream beyond the limits of their time.

Close-up on ${selectedInventor.inventor}'s hands as they work, crafting what would become ${selectedInvention.name}. The camera pulls back to reveal the magnitude of this moment.

NARRATOR (V.O.)
Little did they know, this single innovation would ripple through time, touching every corner of human civilization.

MONTAGE - THE SPREAD OF KNOWLEDGE

- The invention travels along trade routes
- Scholars in distant lands marvel at its brilliance
- Generations pass, but the impact grows stronger

FADE TO BLACK.

TITLE CARD: "Some discoveries transcend time. This is one of them."
        `,
        documentary: `
**${selectedInvention.name}: A Documentary Exploration**

In the scholarly centers of ancient ${selectedInvention.location}, circa ${selectedInvention.year > 0 ? selectedInvention.year + ' CE' : Math.abs(selectedInvention.year) + ' BCE'}, a remarkable breakthrough was taking shape.

${selectedInvention.inventor}, working within the rich intellectual tradition of ancient India, was about to introduce an innovation that would fundamentally alter the course of human development.

The creation of ${selectedInvention.name} represents a pivotal moment in the history of ${selectedInvention.category.toLowerCase()}. This wasn't merely an incremental improvement on existing knowledge – it was a revolutionary leap forward that would establish new paradigms for understanding and interaction.

Archaeological evidence and historical texts suggest that the development process was both methodical and inspired. The inventor drew upon centuries of accumulated wisdom while simultaneously breaking free from conventional thinking.

The significance of this innovation cannot be overstated. ${selectedInvention.significance}, establishing principles that remain relevant in our modern world.

From its origins in ${selectedInvention.location}, this knowledge spread through trade networks and scholarly exchanges, eventually reaching every corner of the known world. Today, we continue to benefit from this ancient Indian innovation, a testament to the enduring power of human creativity and intellectual courage.
        `,
        adventure: `
**The Quest for ${selectedInvention.name}**

In the mystical realm of ancient ${selectedInvention.location}, where knowledge was the greatest treasure and wisdom the most powerful weapon, our hero ${selectedInvention.inventor} faced their greatest challenge yet.

The year was ${selectedInvention.year > 0 ? selectedInvention.year + ' CE' : Math.abs(selectedInvention.year) + ' BCE'}, and the world was crying out for a solution that seemed impossible to achieve. Scholars had tried for generations, but none had succeeded in creating what would become known as ${selectedInvention.name}.

Our brave innovator embarked on a perilous journey through the labyrinth of knowledge, facing obstacles that would have defeated lesser minds:

- The Challenge of Convention: Breaking free from traditional thinking
- The Trial of Persistence: Working through countless failed attempts  
- The Test of Vision: Seeing possibilities others couldn't imagine
- The Final Battle: Bringing the impossible into reality

Armed with nothing but determination, wisdom, and an unshakeable belief in the power of human ingenuity, ${selectedInvention.inventor} pressed forward. Through sleepless nights and endless experimentation, they forged ahead.

And then, in a moment of brilliant inspiration, the breakthrough came! ${selectedInvention.name} was born, destined to become one of humanity's greatest treasures.

The quest was complete, but the adventure was just beginning. This innovation would travel across continents, inspiring countless others and changing the world forever.

Victory belonged not just to our hero, but to all of humanity!
        `,
        comic: `
**THE INCREDIBLE ${selectedInvention.name.toUpperCase()}!**

*PANEL 1*
CAPTION: Ancient ${selectedInvention.location}, ${selectedInvention.year > 0 ? selectedInvention.year + ' CE' : Math.abs(selectedInvention.year) + ' BCE'}...

*PANEL 2*
${selectedInvention.inventor.toUpperCase()}: "The world needs something revolutionary... something that will change everything!"

*PANEL 3*
SOUND EFFECT: *THINK! THINK! THINK!*
CAPTION: Our hero works tirelessly, pushing the boundaries of what's possible!

*PANEL 4*
${selectedInvention.inventor.toUpperCase()}: "Wait... what if I tried..."

*PANEL 5*
SOUND EFFECT: *EUREKA!*
CAPTION: BREAKTHROUGH! The moment that would change history!

*PANEL 6*
DRAMATIC REVEAL: ${selectedInvention.name.toUpperCase()} is born!

*PANEL 7*
CAPTION: Little did they know, this innovation would spread across the globe...

*PANEL 8*
MONTAGE: The invention travels to distant lands, amazing people everywhere!

*PANEL 9*
CAPTION: From ancient India to the modern world...

*PANEL 10*
CAPTION: The legacy of ${selectedInvention.name} lives on!

*THE END... OR IS IT THE BEGINNING?*
        `
      };

      setGeneratedStory(storyTemplates[selectedStyle as keyof typeof storyTemplates] || storyTemplates.documentary);
      setIsGenerating(false);
    }, 2000);
  };

  const playNarration = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => setIsPlaying(false), 5000);
  };

  const downloadStory = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedStory], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedInvention?.name}_${selectedStyle}_story.txt`;
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
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-green-600 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </motion.button>

          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-md">
            <BookOpen className="h-5 w-5 text-green-600" />
            <span className="font-bold text-green-600">Retell Mode</span>
          </div>
        </motion.div>

        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-6">
            <Sparkles className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">
              Creative Story Generator
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Retell Mode
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform invention stories into different narrative styles. Create poetic verses, kid-friendly tales, or cinematic epics.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Step 1: Choose Invention */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">1. Choose Invention</h2>
              <div className="space-y-3">
                {inventions.map((invention) => (
                  <motion.button
                    key={invention.id}
                    onClick={() => setSelectedInvention(invention)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedInvention?.id === invention.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="font-semibold text-gray-800">{invention.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{invention.description}</p>
                    <div className="text-xs text-gray-500 mt-2">
                      {invention.year > 0 ? `${invention.year} CE` : `${Math.abs(invention.year)} BCE`} • {invention.location}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Choose Style */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">2. Choose Style</h2>
              <div className="space-y-3">
                {retellStyles.map((style) => (
                  <motion.button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedStyle === style.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{style.icon}</span>
                      <h3 className="font-semibold text-gray-800">{style.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{style.description}</p>
                    <p className="text-xs text-gray-500 italic">"{style.example}"</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Generate & View */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">3. Generate Story</h2>
              
              <motion.button
                onClick={generateStory}
                disabled={!selectedInvention || !selectedStyle || isGenerating}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Story
                  </span>
                )}
              </motion.button>

              {generatedStory && (
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <motion.button
                      onClick={playNarration}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isPlaying ? (
                        <>
                          <div className="animate-pulse w-4 h-4 bg-white rounded-full mr-2"></div>
                          Playing...
                        </>
                      ) : (
                        <>
                          <Volume2 className="h-4 w-4 mr-2" />
                          Narrate
                        </>
                      )}
                    </motion.button>
                    
                    <motion.button
                      onClick={downloadStory}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="h-4 w-4" />
                    </motion.button>
                    
                    <motion.button
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Generated Story Display */}
        <AnimatePresence>
          {generatedStory && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="mt-8"
            >
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Your Generated Story</h2>
                      <p className="opacity-90">
                        {selectedInvention?.name} in {retellStyles.find(s => s.id === selectedStyle)?.name} style
                      </p>
                    </div>
                    <FileText className="h-8 w-8" />
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="prose prose-lg max-w-none">
                    <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed font-sans">
                      {generatedStory}
                    </pre>
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

export default RetellMode;