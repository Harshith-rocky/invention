import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, User, BookOpen, Sparkles, Filter, Search } from 'lucide-react';
import { Language, Invention } from '../types';

interface DiscoveryQuestProps {
  language: Language;
  onBack: () => void;
}

const DiscoveryQuest: React.FC<DiscoveryQuestProps> = ({ language, onBack }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('all');
  const [selectedInvention, setSelectedInvention] = useState<Invention | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const regions = [
    'all', 'Northern India', 'Southern India', 'Western India', 'Eastern India', 
    'Central India', 'Rajasthan', 'Tamil Nadu', 'Kerala', 'Bengal', 'Gujarat', 
    'Maharashtra', 'Punjab', 'Odisha', 'Karnataka'
  ];

  const timelines = [
    'all', 'Ancient Period (3000 BCE - 600 CE)', 'Classical Period (600 - 1200 CE)', 
    'Medieval Period (1200 - 1700 CE)', 'Modern Period (1700 - Present)'
  ];

  const inventions: Invention[] = [
    {
      id: '1',
      name: 'Chess (Chaturanga)',
      description: 'The strategic board game that became the foundation for modern chess',
      inventor: 'Ancient Indian scholars',
      year: 600,
      location: 'Northern India',
      region: 'Northern India',
      timeline: 'Classical Period (600 - 1200 CE)',
      category: 'Games & Strategy',
      significance: 'Revolutionized strategic thinking and influenced military tactics worldwide',
      story: 'Originally called Chaturanga, meaning "four divisions of the military" - infantry, cavalry, elephants, and chariotry. The game was designed to simulate battlefield strategy and teach military tactics to princes and nobles.',
      challenges: ['Creating balanced gameplay', 'Representing military hierarchy', 'Making it educational yet entertaining'],
      modernRelevance: 'Chess remains the world\'s most popular strategy game and is crucial in AI development and cognitive research.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Chess'
    },
    {
      id: '2',
      name: 'Zero (Shunya)',
      description: 'The mathematical concept that revolutionized calculations and enabled modern mathematics',
      inventor: 'Brahmagupta',
      year: 628,
      location: 'Rajasthan',
      region: 'Rajasthan',
      timeline: 'Classical Period (600 - 1200 CE)',
      category: 'Mathematics',
      significance: 'Made decimal system possible and became foundation of modern mathematics and computing',
      story: 'Brahmagupta was the first to give rules for computing with zero. He described zero as the result of subtracting a number from itself, and established mathematical operations involving zero.',
      challenges: ['Conceptualizing nothingness as a number', 'Defining mathematical operations with zero', 'Convincing scholars of its validity'],
      modernRelevance: 'Essential for all digital technology, computer programming, and advanced mathematics.',
      wikiUrl: 'https://en.wikipedia.org/wiki/0'
    },
    {
      id: '3',
      name: 'Ayurveda',
      description: 'Comprehensive system of medicine focusing on holistic health and prevention',
      inventor: 'Charaka, Sushruta, and other ancient physicians',
      year: -1500,
      location: 'Ancient India',
      region: 'all',
      timeline: 'Ancient Period (3000 BCE - 600 CE)',
      category: 'Medicine & Health',
      significance: 'World\'s oldest medical system emphasizing prevention and holistic treatment',
      story: 'Developed over thousands of years, Ayurveda combines detailed knowledge of anatomy, surgery, pharmacology, and psychology. The Charaka Samhita and Sushruta Samhita remain influential medical texts.',
      challenges: ['Systematizing vast medical knowledge', 'Balancing spiritual and physical healing', 'Training skilled practitioners'],
      modernRelevance: 'Influences modern integrative medicine, wellness practices, and pharmaceutical research.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Ayurveda'
    },
    {
      id: '4',
      name: 'Yoga',
      description: 'Physical, mental, and spiritual practices for achieving harmony and enlightenment',
      inventor: 'Patanjali and ancient sages',
      year: -3000,
      location: 'Indus Valley',
      region: 'Northern India',
      timeline: 'Ancient Period (3000 BCE - 600 CE)',
      category: 'Health & Spirituality',
      significance: 'Global practice for physical fitness, mental health, and spiritual development',
      story: 'Yoga, meaning "union," was developed as a comprehensive system combining physical postures (asanas), breathing techniques (pranayama), and meditation to achieve spiritual enlightenment.',
      challenges: ['Preserving ancient knowledge', 'Adapting practices for different abilities', 'Maintaining spiritual essence'],
      modernRelevance: 'Practiced by millions worldwide for health, stress relief, and personal development.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Yoga'
    },
    {
      id: '5',
      name: 'Wootz Steel',
      description: 'Superior steel production technique creating legendary Damascus steel',
      inventor: 'Ancient Indian metallurgists',
      year: 400,
      location: 'Southern India',
      region: 'Southern India',
      timeline: 'Classical Period (600 - 1200 CE)',
      category: 'Technology & Engineering',
      significance: 'Produced the world\'s finest steel, superior to European steel for centuries',
      story: 'Indian metallurgists developed techniques to create steel with distinctive watered patterns and exceptional sharpness. This steel was exported to Damascus and became legendary as Damascus steel.',
      challenges: ['Controlling carbon content precisely', 'Maintaining consistent quality', 'Keeping techniques secret'],
      modernRelevance: 'Influenced modern metallurgy and materials science research.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Wootz_steel'
    },
    {
      id: '6',
      name: 'Plastic Surgery',
      description: 'Surgical techniques for reconstructive and cosmetic procedures',
      inventor: 'Sushruta',
      year: -600,
      location: 'Ancient India',
      region: 'Northern India',
      timeline: 'Ancient Period (3000 BCE - 600 CE)',
      category: 'Medicine & Surgery',
      significance: 'Established principles and techniques still used in modern plastic surgery',
      story: 'Sushruta described detailed surgical procedures including rhinoplasty (nose reconstruction), cataract surgery, and various reconstructive techniques in the Sushruta Samhita.',
      challenges: ['Developing sterile techniques', 'Managing pain without modern anesthesia', 'Training skilled surgeons'],
      modernRelevance: 'Foundation of modern plastic and reconstructive surgery.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Sushruta'
    },
    {
      id: '7',
      name: 'Fibonacci Numbers (Virahanka Numbers)',
      description: 'Mathematical sequence where each number is the sum of the two preceding ones',
      inventor: 'Virahanka and Hemachandra',
      year: 1150,
      location: 'Karnataka',
      region: 'Southern India',
      timeline: 'Classical Period (600 - 1200 CE)',
      category: 'Mathematics',
      significance: 'Fundamental mathematical concept appearing throughout nature and architecture',
      story: 'Indian mathematicians Virahanka and later Hemachandra described this sequence centuries before Fibonacci. They used it to analyze Sanskrit poetry meters and mathematical patterns.',
      challenges: ['Understanding recursive patterns', 'Applying to poetic analysis', 'Recognizing natural occurrences'],
      modernRelevance: 'Used in computer algorithms, financial markets, and understanding natural patterns.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Fibonacci_number'
    },
    {
      id: '8',
      name: 'Cataract Surgery',
      description: 'Surgical removal of clouded eye lenses to restore vision',
      inventor: 'Sushruta',
      year: -600,
      location: 'Ancient India',
      region: 'Northern India',
      timeline: 'Ancient Period (3000 BCE - 600 CE)',
      category: 'Medicine & Surgery',
      significance: 'First documented cataract surgery technique, restoring sight to thousands',
      story: 'Sushruta developed the "couching" technique, using a sharp instrument to push the clouded lens away from the line of sight. This procedure was performed with remarkable precision.',
      challenges: ['Operating without anesthesia', 'Preventing infection', 'Achieving precise movements'],
      modernRelevance: 'Modern cataract surgery still follows principles established by Sushruta.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Cataract_surgery'
    },
    {
      id: '9',
      name: 'Trigonometry',
      description: 'Mathematical study of triangles and their relationships',
      inventor: 'Aryabhata and other mathematicians',
      year: 499,
      location: 'Ancient India',
      region: 'Northern India',
      timeline: 'Classical Period (600 - 1200 CE)',
      category: 'Mathematics',
      significance: 'Essential for astronomy, navigation, and engineering calculations',
      story: 'Aryabhata introduced sine tables and trigonometric functions. Indian mathematicians developed concepts that were later transmitted to the Islamic world and Europe.',
      challenges: ['Calculating precise values', 'Creating accurate tables', 'Applying to astronomical observations'],
      modernRelevance: 'Fundamental to engineering, physics, computer graphics, and GPS technology.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Trigonometry'
    },
    {
      id: '10',
      name: 'Flush Toilet System',
      description: 'Advanced sanitation system with water-based waste removal',
      inventor: 'Indus Valley engineers',
      year: -2600,
      location: 'Indus Valley',
      region: 'Northern India',
      timeline: 'Ancient Period (3000 BCE - 600 CE)',
      category: 'Engineering & Sanitation',
      significance: 'World\'s first urban sanitation system with sophisticated drainage',
      story: 'The Indus Valley Civilization created the world\'s first known flush toilet systems with elaborate drainage networks. Every house had access to water and waste management.',
      challenges: ['Engineering water flow', 'Preventing contamination', 'Maintaining city-wide systems'],
      modernRelevance: 'Foundation of modern urban sanitation and public health systems.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Flush_toilet'
    },
    {
      id: '11',
      name: 'Dock and Lighthouse System',
      description: 'Advanced harbor engineering with navigation aids',
      inventor: 'Indus Valley and later Indian engineers',
      year: -2300,
      location: 'Gujarat (Lothal)',
      region: 'Western India',
      timeline: 'Ancient Period (3000 BCE - 600 CE)',
      category: 'Engineering & Navigation',
      significance: 'World\'s first known dock with tidal engineering and lighthouse systems',
      story: 'The port of Lothal featured the world\'s earliest known dock, with sophisticated tidal locks and navigation aids. It facilitated trade across the Arabian Sea.',
      challenges: ['Understanding tidal patterns', 'Building durable structures', 'Creating navigation systems'],
      modernRelevance: 'Principles still used in modern port engineering and maritime navigation.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Lothal'
    },
    {
      id: '12',
      name: 'Crucible Steel',
      description: 'High-quality steel production using crucible furnaces',
      inventor: 'Ancient Indian metallurgists',
      year: 300,
      location: 'Southern India',
      region: 'Southern India',
      timeline: 'Classical Period (600 - 1200 CE)',
      category: 'Metallurgy',
      significance: 'Produced the highest quality steel in the ancient world',
      story: 'Indian metallurgists perfected crucible steel production, creating steel so pure and strong that it became the standard for weapons and tools across Asia and Europe.',
      challenges: ['Achieving high temperatures', 'Controlling carbon content', 'Scaling production'],
      modernRelevance: 'Influenced modern steel production and materials engineering.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Crucible_steel'
    },
    {
      id: '13',
      name: 'Ink (India Ink)',
      description: 'Carbon-based writing ink for permanent documentation',
      inventor: 'Ancient Indian scribes',
      year: -400,
      location: 'Ancient India',
      region: 'all',
      timeline: 'Ancient Period (3000 BCE - 600 CE)',
      category: 'Writing Technology',
      significance: 'Enabled permanent record-keeping and artistic expression',
      story: 'Indian scribes developed carbon-based ink from lampblack and binding agents. This "India ink" became the standard for important documents and artistic works.',
      challenges: ['Creating permanent formulations', 'Ensuring smooth flow', 'Preventing fading'],
      modernRelevance: 'Still used in calligraphy, art, and important document signing.',
      wikiUrl: 'https://en.wikipedia.org/wiki/India_ink'
    },
    {
      id: '14',
      name: 'Seamless Globe',
      description: 'Celestial and terrestrial globes cast in seamless metal',
      inventor: 'Kashmirian metalworkers',
      year: 1200,
      location: 'Kashmir',
      region: 'Northern India',
      timeline: 'Medieval Period (1200 - 1700 CE)',
      category: 'Astronomy & Geography',
      significance: 'Advanced metallurgy creating perfect spherical astronomical instruments',
      story: 'Kashmirian artisans developed techniques to cast perfect metal spheres without seams, creating celestial globes that were marvels of both science and craftsmanship.',
      challenges: ['Achieving perfect spherical shape', 'Seamless casting techniques', 'Precise astronomical markings'],
      modernRelevance: 'Influenced precision manufacturing and astronomical instrument making.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Celestial_globe'
    },
    {
      id: '15',
      name: 'Shampoo',
      description: 'Hair cleansing treatment using natural herbs and oils',
      inventor: 'Ancient Indian healers',
      year: -1500,
      location: 'Ancient India',
      region: 'all',
      timeline: 'Ancient Period (3000 BCE - 600 CE)',
      category: 'Personal Care',
      significance: 'Revolutionized hair care and hygiene practices globally',
      story: 'The word "shampoo" comes from the Hindi "champo," meaning to massage. Indian healers developed herbal hair treatments that cleansed and nourished hair naturally.',
      challenges: ['Identifying effective herbs', 'Creating pleasant formulations', 'Standardizing treatments'],
      modernRelevance: 'Foundation of the global hair care industry worth billions today.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Shampoo'
    },
    {
      id: '16',
      name: 'Buttons',
      description: 'Decorative and functional clothing fasteners',
      inventor: 'Indus Valley craftsmen',
      year: -2800,
      location: 'Indus Valley',
      region: 'Northern India',
      timeline: 'Ancient Period (3000 BCE - 600 CE)',
      category: 'Fashion & Textiles',
      significance: 'Revolutionized clothing design and personal adornment',
      story: 'The Indus Valley Civilization created the world\'s first buttons from seashells, with geometric designs. Initially decorative, they later became functional fasteners.',
      challenges: ['Creating durable materials', 'Designing attractive patterns', 'Developing attachment methods'],
      modernRelevance: 'Essential element of modern clothing and fashion design.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Button'
    },
    {
      id: '17',
      name: 'Ruler (Measuring Scale)',
      description: 'Standardized measurement tool for length and distance',
      inventor: 'Indus Valley engineers',
      year: -2600,
      location: 'Indus Valley',
      region: 'Northern India',
      timeline: 'Ancient Period (3000 BCE - 600 CE)',
      category: 'Measurement & Standards',
      significance: 'Enabled precise construction and standardized measurements',
      story: 'The Indus Valley Civilization created the world\'s first standardized rulers with decimal subdivisions. These enabled the precise construction of their remarkably uniform cities.',
      challenges: ['Creating accurate standards', 'Ensuring durability', 'Maintaining consistency across regions'],
      modernRelevance: 'Foundation of all modern measurement systems and precision engineering.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Ruler'
    },
    {
      id: '18',
      name: 'Stepwell (Baoli)',
      description: 'Architectural water storage and cooling system',
      inventor: 'Ancient Indian architects',
      year: 600,
      location: 'Western India',
      region: 'Western India',
      timeline: 'Classical Period (600 - 1200 CE)',
      category: 'Architecture & Engineering',
      significance: 'Ingenious water management combining function with artistic beauty',
      story: 'Stepwells were architectural marvels that provided water access during dry seasons while creating cool microclimates. They featured intricate carvings and geometric designs.',
      challenges: ['Managing water table fluctuations', 'Preventing structural collapse', 'Integrating artistic elements'],
      modernRelevance: 'Inspiring modern sustainable architecture and water management systems.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Stepwell'
    },
    {
      id: '19',
      name: 'Cashmere Wool Processing',
      description: 'Techniques for processing fine goat hair into luxury fabric',
      inventor: 'Kashmiri artisans',
      year: 1400,
      location: 'Kashmir',
      region: 'Northern India',
      timeline: 'Medieval Period (1200 - 1700 CE)',
      category: 'Textiles & Fashion',
      significance: 'Created the world\'s finest and most sought-after luxury fabric',
      story: 'Kashmiri artisans developed sophisticated techniques to process the ultra-fine undercoat of Himalayan goats into incredibly soft and warm fabric.',
      challenges: ['Handling delicate fibers', 'Achieving consistent quality', 'Creating intricate patterns'],
      modernRelevance: 'Remains the gold standard for luxury textiles and fashion.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Cashmere_wool'
    },
    {
      id: '20',
      name: 'Rockets (Mysorean)',
      description: 'Iron-cased military rockets with explosive warheads',
      inventor: 'Tipu Sultan and Mysore engineers',
      year: 1780,
      location: 'Mysore Kingdom',
      region: 'Southern India',
      timeline: 'Modern Period (1700 - Present)',
      category: 'Military Technology',
      significance: 'First iron-cased rockets that influenced modern rocketry and space exploration',
      story: 'Tipu Sultan\'s engineers created the world\'s first iron-cased rockets, which could travel over a mile and struck fear into enemy forces. These influenced European rocket development.',
      challenges: ['Achieving stable flight', 'Creating effective warheads', 'Mass production for warfare'],
      modernRelevance: 'Direct ancestor of modern rockets and space exploration technology.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Mysorean_rockets'
    },
    {
      id: '21',
      name: 'Calico Printing',
      description: 'Technique for printing colorfast patterns on cotton fabric',
      inventor: 'Indian textile artisans',
      year: 1000,
      location: 'Gujarat and Tamil Nadu',
      region: 'Western India',
      timeline: 'Classical Period (600 - 1200 CE)',
      category: 'Textiles & Art',
      significance: 'Revolutionized textile decoration and global fashion',
      story: 'Indian artisans developed techniques to print intricate, colorfast patterns on cotton using natural dyes and mordants. These "calico" fabrics became highly prized in Europe.',
      challenges: ['Creating lasting colors', 'Achieving precise patterns', 'Scaling production'],
      modernRelevance: 'Foundation of modern textile printing and fashion industry.',
      wikiUrl: 'https://en.wikipedia.org/wiki/Calico'
    }
  ];

  const filteredInventions = inventions.filter(invention => {
    const matchesSearch = invention.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invention.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || invention.region === selectedRegion || invention.region === 'all';
    const matchesTimeline = selectedTimeline === 'all' || invention.timeline === selectedTimeline;
    return matchesSearch && matchesRegion && matchesTimeline;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-emerald-600 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </motion.button>

          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-md">
            <Sparkles className="h-5 w-5 text-emerald-600" />
            <span className="font-bold text-emerald-600">Discovery Quest</span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedInvention ? (
            <motion.div
              key="quest-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Title */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-6">
                  <BookOpen className="h-5 w-5 text-emerald-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Invention Discovery Quest
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Explore by Region & Time
                </h1>
                
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Journey through India's innovation history. Select regions and timelines to discover the stories behind groundbreaking inventions.
                </p>
                
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full">
                    <span className="text-sm font-medium text-orange-700">
                      🎉 Now featuring {inventions.length} incredible Indian inventions!
                    </span>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search inventions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Filter className="h-5 w-5 text-gray-400" />
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        {regions.map(region => (
                          <option key={region} value={region}>
                            {region === 'all' ? 'All Regions' : region}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <select
                        value={selectedTimeline}
                        onChange={(e) => setSelectedTimeline(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        {timelines.map(timeline => (
                          <option key={timeline} value={timeline}>
                            {timeline === 'all' ? 'All Time Periods' : timeline}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center text-sm text-gray-600">
                    Showing {filteredInventions.length} of {inventions.length} inventions
                  </div>
                </div>
              </motion.div>

              {/* Inventions Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredInventions.map((invention, index) => (
                  <motion.div
                    key={invention.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedInvention(invention)}
                    whileHover={{ y: -10 }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-emerald-200 h-full">
                      <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-sm font-medium rounded-full">
                            {invention.category}
                          </span>
                          <span className="text-sm opacity-90">
                            {invention.year > 0 ? `${invention.year} CE` : `${Math.abs(invention.year)} BCE`}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 group-hover:scale-105 transition-transform">
                          {invention.name}
                        </h3>
                        
                        <p className="text-sm opacity-90 leading-relaxed">
                          {invention.description}
                        </p>
                      </div>

                      <div className="p-6">
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center text-sm">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-gray-600">Creator:</span>
                            <span className="ml-2 font-medium">{invention.inventor}</span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-gray-600">Location:</span>
                            <span className="ml-2 font-medium">{invention.location}</span>
                          </div>
                        </div>
                        
                        <div className="bg-emerald-50 rounded-xl p-3">
                          <p className="text-emerald-700 text-sm font-medium">
                            {invention.significance}
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
              key="invention-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              {/* Invention Detail View */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <motion.button
                      onClick={() => setSelectedInvention(null)}
                      className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors"
                      whileHover={{ x: -5 }}
                    >
                      <ArrowLeft className="h-5 w-5" />
                      <span>Back to Quest</span>
                    </motion.button>
                    
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      {selectedInvention.category}
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {selectedInvention.name}
                  </h1>
                  
                  <p className="text-xl opacity-90 leading-relaxed">
                    {selectedInvention.description}
                  </p>
                </div>

                <div className="p-8">
                  {/* Basic Info */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <User className="h-6 w-6 text-emerald-600" />
                        <h3 className="font-bold text-gray-800">Creator</h3>
                      </div>
                      <p className="text-gray-700">{selectedInvention.inventor}</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Calendar className="h-6 w-6 text-blue-600" />
                        <h3 className="font-bold text-gray-800">Time Period</h3>
                      </div>
                      <p className="text-gray-700">
                        {selectedInvention.year > 0 ? `${selectedInvention.year} CE` : `${Math.abs(selectedInvention.year)} BCE`}
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <MapPin className="h-6 w-6 text-orange-600" />
                        <h3 className="font-bold text-gray-800">Location</h3>
                      </div>
                      <p className="text-gray-700">{selectedInvention.location}</p>
                    </div>
                  </div>

                  {/* Story Section */}
                  {selectedInvention.story && (
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">The Story Behind It</h3>
                      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {selectedInvention.story}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Challenges */}
                  {selectedInvention.challenges && (
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Challenges Faced</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {selectedInvention.challenges.map((challenge, index) => (
                          <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 rounded-xl">
                            <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-gray-700">{challenge}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Modern Relevance */}
                  {selectedInvention.modernRelevance && (
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Modern Relevance</h3>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {selectedInvention.modernRelevance}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Learn More */}
                  {selectedInvention.wikiUrl && (
                    <div className="text-center">
                      <a
                        href={selectedInvention.wikiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        <BookOpen className="mr-2 h-5 w-5" />
                        Learn More on Wikipedia
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiscoveryQuest;