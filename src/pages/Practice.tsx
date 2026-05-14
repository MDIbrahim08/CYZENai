import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Trophy,
  Sparkles,
  Play
} from 'lucide-react';
import { formulas, Formula, FormulaCategory, getCategories } from '@/data/formulas';
import { FormulaDisplay } from '@/components/formula/FormulaDisplay';
import { useProgressStore } from '@/stores/progressStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type QuizState = 'setup' | 'question' | 'feedback' | 'complete';

interface QuizQuestion {
  formula: Formula;
  type: 'identify';
  question: string;
  correctAnswer: string;
}

// Confetti particles
function Confetti() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#8B7CF6', '#FF3D7F', '#FFD93D', '#4ECDC4'][Math.floor(Math.random() * 4)],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: 0, x: `${p.x}%`, opacity: 1, scale: 1 }}
          animate={{ y: -150, opacity: 0, rotate: 720 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute bottom-0 w-3 h-3 rounded-full"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}

const categoryGradients: Record<FormulaCategory | 'all', string> = {
  all: 'gradient-purple',
  Descriptive: 'gradient-orange',
  Correlation: 'gradient-pink',
  Inferential: 'gradient-purple',
  Tests: 'gradient-teal',
};

export default function Practice() {
  const [quizState, setQuizState] = useState<QuizState>('setup');
  const [selectedCategory, setSelectedCategory] = useState<FormulaCategory | 'all'>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const { recordQuizAttempt, recordStudyTime } = useProgressStore();
  const categories = getCategories();

  // Generate questions
  const generateQuestions = useCallback(() => {
    let availableFormulas = selectedCategory === 'all' 
      ? [...formulas] 
      : formulas.filter(f => f.category === selectedCategory);
    
    availableFormulas = availableFormulas.sort(() => Math.random() - 0.5);
    const selectedFormulas = availableFormulas.slice(0, Math.min(5, availableFormulas.length));
    
    return selectedFormulas.map(formula => ({
      formula,
      type: 'identify' as const,
      question: `Name this formula:`,
      correctAnswer: formula.title.toLowerCase(),
    }));
  }, [selectedCategory]);

  const startQuiz = () => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizState('question');
    recordStudyTime(5);
  };

  const checkAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const correct = userAnswer.toLowerCase().trim().includes(
      currentQuestion.correctAnswer.split(' ')[0]
    );
    
    setIsCorrect(correct);
    setQuizState('feedback');
    
    if (correct) {
      setScore(s => s + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    }
    
    recordQuizAttempt(
      currentQuestion.formula.id,
      currentQuestion.formula.title,
      correct
    );
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 >= questions.length) {
      setQuizState('complete');
    } else {
      setCurrentQuestionIndex(i => i + 1);
      setUserAnswer('');
      setIsCorrect(null);
      setQuizState('question');
    }
  };

  const restartQuiz = () => {
    setQuizState('setup');
    setUserAnswer('');
    setIsCorrect(null);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = questions.length > 0 
    ? ((currentQuestionIndex + (quizState === 'feedback' ? 1 : 0)) / questions.length) * 100 
    : 0;

  return (
    <div className="p-4 min-h-screen">
      <AnimatePresence mode="wait">
        {/* Setup Screen */}
        {quizState === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="text-center pt-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-purple shadow-colored-purple mb-6"
              >
                <Brain className="w-12 h-12 text-white" />
              </motion.div>
              <h1 className="font-heading font-bold text-2xl mb-2">Practice Mode 🧠</h1>
              <p className="text-text-secondary">Test your formula knowledge!</p>
            </div>

            {/* Category Selection */}
            <div className="space-y-3">
              <p className="font-medium text-center">Choose a category:</p>
              <div className="grid grid-cols-2 gap-3">
                {['all', ...categories].map((cat) => (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(cat as FormulaCategory | 'all')}
                    className={cn(
                      'p-4 rounded-2xl text-center font-medium transition-all',
                      selectedCategory === cat
                        ? cn(categoryGradients[cat as FormulaCategory | 'all'], 'text-white shadow-medium')
                        : 'bg-surface text-foreground shadow-soft'
                    )}
                  >
                    {cat === 'all' ? 'All Topics' : cat}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                onClick={startQuiz} 
                className="w-full h-16 rounded-2xl gradient-purple text-lg font-semibold shadow-colored-purple"
              >
                <Play className="w-6 h-6 mr-2" />
                Start Quiz
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Question Screen */}
        {quizState === 'question' && currentQuestion && (
          <motion.div
            key={`question-${currentQuestionIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Question {currentQuestionIndex + 1}/{questions.length}</span>
                <span className="font-medium text-primary">Score: {score}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full gradient-purple rounded-full"
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="card-playful p-6 space-y-6">
              <div className={cn(
                'w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold',
                categoryGradients[currentQuestion.formula.category]
              )}>
                {currentQuestion.formula.title.charAt(0)}
              </div>
              
              <h2 className="font-heading font-semibold text-lg">
                {currentQuestion.question}
              </h2>

              {/* Formula Display */}
              <div className="bg-muted rounded-2xl p-5 overflow-x-auto">
                <FormulaDisplay latex={currentQuestion.formula.latex} block />
              </div>

              {/* Answer Input */}
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type the formula name..."
                className="h-14 rounded-2xl text-base bg-surface border-0"
                onKeyDown={(e) => e.key === 'Enter' && userAnswer.trim() && checkAnswer()}
                autoFocus
              />

              <Button
                onClick={checkAnswer}
                disabled={!userAnswer.trim()}
                className="w-full h-14 rounded-2xl gradient-purple font-semibold"
              >
                Check Answer <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Feedback Screen */}
        {quizState === 'feedback' && currentQuestion && (
          <motion.div
            key={`feedback-${currentQuestionIndex}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 pt-8"
          >
            <div className={cn(
              'card-playful p-8 text-center relative overflow-hidden',
              isCorrect ? 'ring-4 ring-success/30' : 'ring-4 ring-destructive/30'
            )}>
              {showConfetti && <Confetti />}
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
                className={cn(
                  'inline-flex items-center justify-center w-20 h-20 rounded-full mb-4',
                  isCorrect ? 'bg-success/20' : 'bg-destructive/20'
                )}
              >
                {isCorrect ? (
                  <CheckCircle2 className="w-10 h-10 text-success" />
                ) : (
                  <motion.div animate={!isCorrect ? { x: [0, -5, 5, -5, 5, 0] } : {}}>
                    <XCircle className="w-10 h-10 text-destructive" />
                  </motion.div>
                )}
              </motion.div>
              
              <h2 className={cn(
                'font-heading font-bold text-2xl mb-2',
                isCorrect ? 'text-success' : 'text-destructive'
              )}>
                {isCorrect ? 'Correct! 🎉' : 'Not quite...'}
              </h2>
              
              <p className="text-text-secondary mb-4">
                The answer is <span className="font-semibold text-foreground">{currentQuestion.formula.title}</span>
              </p>

              <div className="bg-muted rounded-2xl p-4 mb-6">
                <FormulaDisplay latex={currentQuestion.formula.latex} block />
              </div>

              <Button
                onClick={nextQuestion}
                className="w-full h-14 rounded-2xl gradient-purple font-semibold"
              >
                {currentQuestionIndex + 1 >= questions.length ? (
                  <>See Results <Trophy className="w-5 h-5 ml-2" /></>
                ) : (
                  <>Next Question <ArrowRight className="w-5 h-5 ml-2" /></>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Complete Screen */}
        {quizState === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center pt-12 space-y-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="inline-flex items-center justify-center w-28 h-28 rounded-full gradient-gold shadow-lg"
            >
              <Trophy className="w-14 h-14 text-gold-foreground" />
            </motion.div>

            <div>
              <h2 className="font-heading font-bold text-3xl mb-2">Quiz Complete!</h2>
              <p className="text-text-secondary">Great job practicing!</p>
            </div>

            <div className="card-playful p-8 max-w-xs mx-auto">
              <div className="text-5xl font-heading font-bold text-foreground mb-2">
                {score}/{questions.length}
              </div>
              <p className="text-text-secondary">
                {score === questions.length 
                  ? 'Perfect! 🌟' 
                  : score >= questions.length * 0.8 
                    ? 'Excellent! 🎉' 
                    : 'Keep practicing! 💪'}
              </p>
              
              <div className="mt-4 h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / questions.length) * 100}%` }}
                  transition={{ delay: 0.3 }}
                  className={score === questions.length ? 'gradient-gold' : 'gradient-purple'}
                  style={{ height: '100%' }}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={restartQuiz} 
                variant="outline" 
                className="flex-1 h-14 rounded-2xl"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                New Quiz
              </Button>
              <Button 
                onClick={startQuiz}
                className="flex-1 h-14 rounded-2xl gradient-purple"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Try Again
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
