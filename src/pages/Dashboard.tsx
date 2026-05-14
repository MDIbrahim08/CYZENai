import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Trophy, 
  Clock, 
  Star,
  ArrowRight,
  Sparkles,
  BookOpen,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProgressStore } from '@/stores/progressStore';
import { getDailyQuote } from '@/data/quotes';
import { formulas } from '@/data/formulas';
import { ProgressRing } from '@/components/ui/progress-ring';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const {
    currentStreak,
    masteredFormulas,
    todayStudyMinutes,
    getDailyGoalProgress,
    recentActivity,
  } = useProgressStore();

  const quote = useMemo(() => getDailyQuote(), []);
  const dailyProgress = getDailyGoalProgress();

  // Get recently viewed formulas
  const recentFormulas = useMemo(() => {
    const viewedIds = recentActivity
      .filter(a => a.type === 'viewed')
      .slice(0, 3)
      .map(a => a.formulaId);
    
    return viewedIds
      .map(id => formulas.find(f => f.id === id))
      .filter(Boolean) as typeof formulas;
  }, [recentActivity]);

  // Get unmastered formulas for recommendations
  const recommendedFormulas = useMemo(() => {
    return formulas
      .filter(f => !masteredFormulas.includes(f.id))
      .slice(0, 4);
  }, [masteredFormulas]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 space-y-6"
    >
      {/* Header with Avatar */}
      <motion.header variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center text-white font-bold text-lg">
            PS
          </div>
          <div>
            <p className="text-text-secondary text-sm">Hello,</p>
            <h1 className="font-heading font-bold text-foreground">Scholar 🎓</h1>
          </div>
        </div>
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center shadow-soft"
        >
          <Sparkles className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.header>

      {/* Hero Banner */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl gradient-orange p-6 text-white shadow-colored-orange"
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/2 animate-pulse-soft" />
        <div className="absolute bottom-0 right-8 w-16 h-16 rounded-full bg-white/15 translate-y-1/2 animation-delay-200 animate-pulse-soft" />
        
        <div className="relative z-10">
          <h2 className="font-heading font-bold text-2xl mb-2">
            Statistics Pro 🧠
          </h2>
          <p className="text-white/90 text-sm mb-4 max-w-[200px]">
            Master psychology statistics one formula at a time
          </p>
          <Link 
            to="/practice"
            className="inline-flex items-center gap-2 bg-white/25 hover:bg-white/35 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Start Practice <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-lg">My Progress</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Streak Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="card-playful p-4 relative overflow-hidden"
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gold/20 animate-pulse-soft" />
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
                <Flame className={cn('w-5 h-5 text-gold-foreground', currentStreak > 0 && 'animate-bounce-gentle')} />
              </div>
            </div>
            <p className="font-heading font-bold text-2xl text-foreground">{currentStreak}</p>
            <p className="text-sm text-text-secondary">Day Streak 🔥</p>
          </motion.div>

          {/* Mastered Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="card-playful p-4 relative overflow-hidden"
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-accent/20 animate-pulse-soft animation-delay-200" />
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl gradient-teal flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="font-heading font-bold text-2xl text-foreground">{masteredFormulas.length}</p>
            <p className="text-sm text-text-secondary">Mastered 🏆</p>
          </motion.div>

          {/* Time Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="card-playful p-4 relative overflow-hidden"
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-pink/20 animate-pulse-soft animation-delay-400" />
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl gradient-pink flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="font-heading font-bold text-2xl text-foreground">{todayStudyMinutes}m</p>
            <p className="text-sm text-text-secondary">Today ⏰</p>
          </motion.div>

          {/* Goal Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="card-playful p-4 relative overflow-hidden"
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-primary/20 animate-pulse-soft animation-delay-600" />
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="font-heading font-bold text-2xl text-foreground">{dailyProgress}%</p>
            <p className="text-sm text-text-secondary">Goal 🎯</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Daily Quote */}
      <motion.div 
        variants={itemVariants}
        className="card-playful p-5 border-l-4 border-primary"
      >
        <p className="text-text-secondary italic mb-2">"{quote.text}"</p>
        <p className="text-sm font-medium text-primary">— {quote.author}</p>
      </motion.div>

      {/* My Courses / Formulas */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-lg">All Formulas ✨</h2>
          <Link to="/library" className="text-primary text-sm font-medium flex items-center gap-1">
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 custom-scrollbar">
          {recommendedFormulas.map((formula, index) => {
            const gradients = ['gradient-purple', 'gradient-pink', 'gradient-orange', 'gradient-teal'];
            const shadows = ['shadow-colored-purple', 'shadow-colored-pink', 'shadow-colored-orange', 'shadow-colored-teal'];
            
            return (
              <motion.div
                key={formula.id}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0"
              >
                <Link to="/library">
                  <div className={cn(
                    'w-36 h-44 rounded-3xl p-4 text-white relative overflow-hidden',
                    gradients[index % gradients.length],
                    shadows[index % shadows.length]
                  )}>
                    {/* Decorative blob */}
                    <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-white/20" />
                    
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="w-10 h-10 rounded-xl bg-white/25 backdrop-blur-sm flex items-center justify-center mb-3">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <h3 className="font-heading font-semibold text-sm leading-tight mb-2 line-clamp-2">
                        {formula.title}
                      </h3>
                      <div className="mt-auto flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-xs font-medium">
                          {formula.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Recent Activity */}
      {recentFormulas.length > 0 && (
        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-lg">Continue Learning 📚</h2>
          </div>

          <div className="space-y-3">
            {recentFormulas.map((formula) => (
              <motion.div
                key={formula.id}
                whileHover={{ x: 4 }}
                className="card-elevated p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl gradient-purple flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{formula.title}</h3>
                  <p className="text-sm text-text-secondary">{formula.category}</p>
                </div>
                <Link 
                  to="/library"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
}
