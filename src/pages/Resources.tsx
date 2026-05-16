import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Search, Video, BookOpen, GraduationCap, CheckCircle2, BookMarked, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { VideoCard } from '@/components/resources/VideoCard';
import { TextbookCard } from '@/components/resources/TextbookCard';
import { VideoModal } from '@/components/resources/VideoModal';
import { TextbookModal } from '@/components/resources/TextbookModal';
import { CuratedCollections } from '@/components/resources/CuratedCollections';
import { CareerTimeline } from '@/components/resources/CareerTimeline';
import { CountryPathCard } from '@/components/resources/CountryPathCard';
import { PortfolioGallery } from '@/components/resources/PortfolioGallery';
import {
  videoResources,
  textbookResources,
  curatedCollections,
  getVideosByCategory,
  getTextbooksByCategory,
  searchVideos,
  searchTextbooks,
  VideoResource,
  TextbookResource
} from '@/data/resources';
import { careerTimeline, currentStepDetails, countryPaths } from '@/data/careerPaths';

const categories = ['All', 'Network Security', 'Cryptography', 'Social Engineering', 'Cloud Security', 'Forensics'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Resources = () => {
  const [mainTab, setMainTab] = useState<'resources' | 'career'>('resources');
  const [resourceTab, setResourceTab] = useState<'videos' | 'textbooks'>('videos');
  const [videoCategory, setVideoCategory] = useState('All');
  const [textbookCategory, setTextbookCategory] = useState('All');
  const [videoSearch, setVideoSearch] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<VideoResource | null>(null);
  const [selectedTextbook, setSelectedTextbook] = useState<TextbookResource | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Filter videos
  const filteredVideos = useMemo(() => {
    let videos = videoSearch 
      ? searchVideos(videoSearch) 
      : getVideosByCategory(videoCategory);
    return videos;
  }, [videoCategory, videoSearch]);

  // Filter textbooks
  const filteredTextbooks = useMemo(() => {
    let textbooks = textbookSearch 
      ? searchTextbooks(textbookSearch) 
      : getTextbooksByCategory(textbookCategory);
    return textbooks;
  }, [textbookCategory, textbookSearch]);

  return (
    <div className="relative w-full">
      {/* Background Video */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-15"
        >
          <source src="https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo/medium.mp4" type="video/mp4" />
          <source src="https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8" type="application/x-mpegURL" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/80 to-[#0a0a0f]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 pb-24 space-y-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="space-y-3 pt-12 text-center md:text-left">
          <Badge className="bg-emerald-500/10 text-emerald-400/80 border-emerald-500/20 text-[9px] font-black uppercase tracking-[0.4em] px-4 py-1.5 mx-auto md:mx-0">
            Intelligence Stream
          </Badge>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white tracking-tighter leading-none">
            SECURITY <span className="text-emerald-500/80">HUBS</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl font-medium leading-relaxed mx-auto md:mx-0">
            Operational intelligence and strategic roadmaps for cybersecurity operators.
          </p>
        </motion.div>

      {/* Main Tabs: Resources vs Career */}
      <motion.div variants={itemVariants}>
        <Tabs value={mainTab} onValueChange={(v) => setMainTab(v as 'resources' | 'career')}>
          <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10 rounded-2xl p-1 h-auto backdrop-blur-md">
            <TabsTrigger 
              value="resources" 
              className="rounded-xl py-4 data-[state=active]:bg-emerald-500 data-[state=active]:text-black transition-all font-black uppercase tracking-widest text-[10px] text-white/60 hover:text-white"
            >
              <BookMarked className="w-4 h-4 mr-2" />
              Intelligence Center
            </TabsTrigger>
            <TabsTrigger 
              value="career"
              className="rounded-xl py-4 data-[state=active]:bg-emerald-500 data-[state=active]:text-black transition-all font-black uppercase tracking-widest text-[10px] text-white/60 hover:text-white"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Career Roadmap
            </TabsTrigger>
          </TabsList>

          {/* Resources Tab Content */}
          <TabsContent value="resources" className="mt-8 space-y-8">
            {/* Resource Type Tabs */}
            <Tabs value={resourceTab} onValueChange={(v) => setResourceTab(v as 'videos' | 'textbooks')}>
              <TabsList className="flex w-fit bg-white/5 border border-white/10 rounded-xl p-1 mb-8">
                <TabsTrigger 
                  value="videos" 
                  className="rounded-lg px-8 py-2 data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400 transition-all text-xs font-black uppercase tracking-wider text-white/50"
                >
                  <Video className="w-3.5 h-3.5 mr-2" />
                  Technical Videos
                </TabsTrigger>
                <TabsTrigger 
                  value="textbooks"
                  className="rounded-lg px-8 py-2 data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400 transition-all text-xs font-black uppercase tracking-wider text-white/50"
                >
                  <BookOpen className="w-3.5 h-3.5 mr-2" />
                  Whitepapers & Books
                </TabsTrigger>
              </TabsList>

              {/* Videos Tab */}
              <TabsContent value="videos" className="mt-5 space-y-5">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <Input
                    placeholder="Search videos..."
                    value={videoSearch}
                    onChange={(e) => setVideoSearch(e.target.value)}
                    className="pl-10 rounded-xl bg-muted border-0 h-11"
                  />
                </div>

                {/* Category Filters */}
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setVideoCategory(cat);
                        setVideoSearch('');
                      }}
                      className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border
                        ${videoCategory === cat 
                          ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                          : 'bg-white/5 text-white/70 border-white/10 hover:border-white/20'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Portfolio Gallery Layout for Videos */}
                <PortfolioGallery 
                  videos={filteredVideos}
                  onVideoClick={setSelectedVideo}
                />

                {filteredVideos.length === 0 && (
                  <div className="text-center py-12 text-white/40">
                    <Video className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No videos found matching your search.</p>
                  </div>
                )}

                {/* Curated Collections */}
                <CuratedCollections collections={curatedCollections} />
              </TabsContent>

              {/* Textbooks Tab */}
              <TabsContent value="textbooks" className="mt-5 space-y-5">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <Input
                    placeholder="Search textbooks..."
                    value={textbookSearch}
                    onChange={(e) => setTextbookSearch(e.target.value)}
                    className="pl-10 rounded-xl bg-muted border-0 h-11"
                  />
                </div>

                {/* Category Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setTextbookCategory(cat);
                        setTextbookSearch('');
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                        ${textbookCategory === cat 
                          ? 'gradient-teal text-white' 
                          : 'bg-muted text-text-secondary hover:bg-muted/80'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Textbook Grid */}
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredTextbooks.map((textbook) => (
                      <TextbookCard
                        key={textbook.id}
                        textbook={textbook}
                        onViewDetails={setSelectedTextbook}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>

                {filteredTextbooks.length === 0 && (
                  <div className="text-center py-12 text-white/40">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No textbooks found matching your search.</p>
                  </div>
                )}

                {/* Curated Collections */}
                <CuratedCollections collections={curatedCollections} />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Career Path Tab Content */}
          <TabsContent value="career" className="mt-10 space-y-10">
            {/* Career Header */}
            <motion.div 
              variants={itemVariants}
              className="bg-emerald-500 rounded-3xl p-8 text-black relative overflow-hidden shadow-2xl mb-10"
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-black/5 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-4 right-8 w-32 h-32 rounded-full bg-black/5" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-black/10 backdrop-blur-sm flex items-center justify-center mb-6">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h2 className="font-heading font-black text-3xl uppercase tracking-tighter">
                  Cybersecurity Specialist Roadmap
                </h2>
                <p className="text-black/60 text-lg mt-2 font-medium">
                  From Certifications to Chief Information Security Officer (CISO)
                </p>
              </div>
            </motion.div>

            <div className="relative" ref={containerRef}>
              {/* Journey Line SVG */}
              <div className="absolute left-6 top-12 bottom-12 w-8 pointer-events-none hidden md:block">
                <svg width="2" height="100%" className="overflow-visible">
                  <line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="100%"
                    stroke="white"
                    strokeWidth="2"
                    strokeOpacity="0.05"
                  />
                  <motion.line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="100%"
                    stroke="#10b981"
                    strokeWidth="2"
                    style={{ pathLength }}
                  />
                </svg>
              </div>

              {/* Timeline Section */}
              <motion.section variants={itemVariants} className="space-y-6 relative z-10">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="font-heading font-black text-xl uppercase tracking-tight text-white">Mission Roadmap</h3>
                </div>
                <div className="bg-[#161b22]/50 backdrop-blur-xl border border-white/5 p-8 rounded-3xl">
                  <CareerTimeline steps={careerTimeline} />
                </div>
              </motion.section>
            </div>

            {/* Current Step Details */}
            <motion.section variants={itemVariants} className="space-y-4">
              <h3 className="font-heading font-semibold text-lg">📘 Current Step: {currentStepDetails.title}</h3>
              
              <div className="card-elevated p-5 rounded-2xl space-y-5">
                {/* Duration */}
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500 text-black font-bold px-3 py-1">
                    Duration: {currentStepDetails.duration}
                  </Badge>
                </div>

                {/* Subjects */}
                <div>
                  <h4 className="font-heading font-semibold text-sm mb-2">Typical Subjects</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {currentStepDetails.subjects.map((subject, i) => (
                      <Badge key={i} variant="outline" className="text-xs bg-primary/5 border-primary/20">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Learning Outcomes */}
                <div>
                  <h4 className="font-heading font-semibold text-sm mb-2">What You're Learning</h4>
                  <ul className="space-y-1.5">
                    {currentStepDetails.learningOutcomes.map((outcome, i) => (
                      <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Actions */}
                <div>
                  <h4 className="font-heading font-semibold text-sm mb-2">Recommended Actions</h4>
                  <ul className="space-y-2">
                    {currentStepDetails.recommendedActions.map((action, i) => (
                      <li 
                        key={i} 
                        className={`text-sm flex items-start gap-2 p-2 rounded-xl ${
                          action.completed ? 'bg-success/10' : 'bg-muted/50'
                        }`}
                      >
                        <CheckCircle2 
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            action.completed ? 'text-emerald-500' : 'text-white/20'
                          }`} 
                        />
                        <div>
                          <span className={action.completed ? 'line-through text-muted-foreground' : ''}>
                            {action.text}
                          </span>
                          <span className="text-xs text-white/40 ml-2">
                            ({action.note})
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Master's Degree by Country */}
            <motion.section variants={itemVariants} className="space-y-4">
              <h3 className="font-heading font-semibold text-lg">🌍 Master's Degree by Country</h3>
              <p className="text-sm text-text-secondary">
                Tap a country to see detailed requirements, costs, and career prospects
              </p>
              
              <div className="space-y-3">
                {countryPaths.map((country, index) => (
                  <CountryPathCard key={country.id} country={country} index={index} />
                ))}
              </div>
            </motion.section>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Modals */}
      <VideoModal 
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
      <TextbookModal
        textbook={selectedTextbook}
        isOpen={!!selectedTextbook}
        onClose={() => setSelectedTextbook(null)}
      />
    </motion.div>
    </div>
  );
};

export default Resources;
