import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [textbookSearch, setTextbookSearch] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<VideoResource | null>(null);
  const [selectedTextbook, setSelectedTextbook] = useState<TextbookResource | null>(null);

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pb-24 space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="font-heading font-bold text-4xl text-white tracking-tight">
          <span className="text-emerald-400">Security</span> Intelligence Hub
        </h1>
        <p className="text-white/40 text-lg max-w-2xl">
          Elite curated videos, high-fidelity technical textbooks, and global career roadmaps to forge your path in cybersecurity.
        </p>
      </motion.div>

      {/* Main Tabs: Resources vs Career */}
      <motion.div variants={itemVariants}>
        <Tabs value={mainTab} onValueChange={(v) => setMainTab(v as 'resources' | 'career')}>
          <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10 rounded-2xl p-1 h-auto backdrop-blur-md">
            <TabsTrigger 
              value="resources" 
              className="rounded-xl py-4 data-[state=active]:bg-emerald-500 data-[state=active]:text-black transition-all font-bold uppercase tracking-widest text-[10px]"
            >
              <BookMarked className="w-4 h-4 mr-2" />
              Intelligence Center
            </TabsTrigger>
            <TabsTrigger 
              value="career"
              className="rounded-xl py-4 data-[state=active]:bg-emerald-500 data-[state=active]:text-black transition-all font-bold uppercase tracking-widest text-[10px]"
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
                  className="rounded-lg px-8 py-2 data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400 transition-all text-xs font-bold uppercase tracking-wider"
                >
                  <Video className="w-3.5 h-3.5 mr-2" />
                  Technical Videos
                </TabsTrigger>
                <TabsTrigger 
                  value="textbooks"
                  className="rounded-lg px-8 py-2 data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400 transition-all text-xs font-bold uppercase tracking-wider"
                >
                  <BookOpen className="w-3.5 h-3.5 mr-2" />
                  Whitepapers & Books
                </TabsTrigger>
              </TabsList>

              {/* Videos Tab */}
              <TabsContent value="videos" className="mt-5 space-y-5">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border
                        ${videoCategory === cat 
                          ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                          : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Video Grid */}
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredVideos.map((video) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        onWatch={setSelectedVideo}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>

                {filteredVideos.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
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
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
                  <div className="text-center py-12 text-muted-foreground">
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
              className="bg-emerald-500 rounded-3xl p-8 text-black relative overflow-hidden shadow-2xl"
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

            {/* Timeline */}
            <motion.section variants={itemVariants} className="space-y-4">
              <h3 className="font-heading font-semibold text-lg">📍 Overview Timeline</h3>
              <div className="card-elevated p-5 rounded-2xl">
                <CareerTimeline steps={careerTimeline} />
              </div>
            </motion.section>

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
                            action.completed ? 'text-success' : 'text-muted-foreground'
                          }`} 
                        />
                        <div>
                          <span className={action.completed ? 'line-through text-muted-foreground' : ''}>
                            {action.text}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">
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
  );
};

export default Resources;
