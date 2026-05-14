import { create } from 'zustand';
import { SecureStorage } from '@/utils/storage';

/**
 * Progress tracking configuration
 */
const PROGRESS_CONFIG = {
  /** Daily goal in minutes */
  DAILY_GOAL_MINUTES: 30,
  /** Points for correct answer */
  POINTS_CORRECT: 10,
  /** Points for mastering a formula */
  POINTS_MASTERED: 50,
};

interface DailyProgress {
  date: string; // YYYY-MM-DD
  studyMinutes: number;
  correctAnswers: number;
  totalAnswers: number;
}

interface ProgressState {
  // Streak tracking
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  
  // Formula mastery
  masteredFormulas: string[];
  
  // Study time
  totalStudyMinutes: number;
  todayStudyMinutes: number;
  
  // Quiz performance
  totalCorrect: number;
  totalAttempts: number;
  
  // Activity history
  recentActivity: Array<{
    id: string;
    type: 'viewed' | 'practiced' | 'mastered';
    formulaId: string;
    formulaTitle: string;
    timestamp: number;
  }>;
  
  // Daily progress history
  dailyProgress: DailyProgress[];
}

interface ProgressStore extends ProgressState {
  // Actions
  recordStudyTime: (minutes: number) => void;
  recordQuizAttempt: (formulaId: string, formulaTitle: string, isCorrect: boolean) => void;
  markFormulaMastered: (formulaId: string) => void;
  unmarkFormulaMastered: (formulaId: string) => void;
  recordFormulaView: (formulaId: string, formulaTitle: string) => void;
  getDailyGoalProgress: () => number;
  getTodayStats: () => { studyMinutes: number; correctRate: number };
  clearProgress: () => void;
}

const STORAGE_KEY = 'progress_state';

/**
 * Get today's date as YYYY-MM-DD
 */
function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Check if two dates are consecutive days
 */
function areConsecutiveDays(date1: string, date2: string): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

/**
 * Load persisted progress state
 */
function loadProgress(): Partial<ProgressState> {
  return SecureStorage.get<Partial<ProgressState>>(STORAGE_KEY, {});
}

/**
 * Persist progress state
 */
function persistProgress(state: ProgressState): void {
  SecureStorage.set(STORAGE_KEY, state);
}

/**
 * Default state
 */
const defaultState: ProgressState = {
  currentStreak: 0,
  longestStreak: 0,
  lastStudyDate: null,
  masteredFormulas: [],
  totalStudyMinutes: 0,
  todayStudyMinutes: 0,
  totalCorrect: 0,
  totalAttempts: 0,
  recentActivity: [],
  dailyProgress: [],
};

/**
 * Progress tracking store
 */
export const useProgressStore = create<ProgressStore>((set, get) => {
  // Load and merge with defaults
  const persisted = loadProgress();
  const today = getTodayDate();
  
  // Reset today's study minutes if it's a new day
  let todayStudyMinutes = persisted.todayStudyMinutes ?? 0;
  if (persisted.lastStudyDate !== today) {
    todayStudyMinutes = 0;
  }

  return {
    ...defaultState,
    ...persisted,
    todayStudyMinutes,

    /**
     * Record study time in minutes
     */
    recordStudyTime: (minutes: number) => {
      // Validate input
      if (typeof minutes !== 'number' || minutes < 0 || minutes > 480) {
        console.warn('Invalid study time');
        return;
      }
      
      const state = get();
      const today = getTodayDate();
      
      // Update streak
      let newStreak = state.currentStreak;
      if (state.lastStudyDate !== today) {
        if (state.lastStudyDate && areConsecutiveDays(state.lastStudyDate, today)) {
          newStreak += 1;
        } else if (state.lastStudyDate !== today) {
          newStreak = 1;
        }
      }
      
      const newLongest = Math.max(state.longestStreak, newStreak);
      
      // Update daily progress
      const todayProgress = state.dailyProgress.find(p => p.date === today);
      let newDailyProgress = [...state.dailyProgress];
      
      if (todayProgress) {
        newDailyProgress = newDailyProgress.map(p => 
          p.date === today 
            ? { ...p, studyMinutes: p.studyMinutes + minutes }
            : p
        );
      } else {
        newDailyProgress.push({
          date: today,
          studyMinutes: minutes,
          correctAnswers: 0,
          totalAnswers: 0,
        });
      }
      
      // Keep only last 30 days
      newDailyProgress = newDailyProgress
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 30);
      
      const newState = {
        ...state,
        currentStreak: newStreak,
        longestStreak: newLongest,
        lastStudyDate: today,
        totalStudyMinutes: state.totalStudyMinutes + minutes,
        todayStudyMinutes: (state.lastStudyDate === today ? state.todayStudyMinutes : 0) + minutes,
        dailyProgress: newDailyProgress,
      };
      
      set(newState);
      persistProgress(newState as ProgressState);
    },

    /**
     * Record a quiz attempt
     */
    recordQuizAttempt: (formulaId: string, formulaTitle: string, isCorrect: boolean) => {
      // Validate inputs
      if (!formulaId || typeof formulaId !== 'string' || formulaId.length > 100) {
        console.warn('Invalid formula ID');
        return;
      }
      
      const state = get();
      const today = getTodayDate();
      
      // Update totals
      const newTotalCorrect = state.totalCorrect + (isCorrect ? 1 : 0);
      const newTotalAttempts = state.totalAttempts + 1;
      
      // Update daily progress
      const todayProgress = state.dailyProgress.find(p => p.date === today);
      let newDailyProgress = [...state.dailyProgress];
      
      if (todayProgress) {
        newDailyProgress = newDailyProgress.map(p => 
          p.date === today 
            ? { 
                ...p, 
                correctAnswers: p.correctAnswers + (isCorrect ? 1 : 0),
                totalAnswers: p.totalAnswers + 1,
              }
            : p
        );
      } else {
        newDailyProgress.push({
          date: today,
          studyMinutes: 0,
          correctAnswers: isCorrect ? 1 : 0,
          totalAnswers: 1,
        });
      }
      
      // Add to recent activity
      const newActivity = [
        {
          id: `${Date.now()}-${formulaId}`,
          type: 'practiced' as const,
          formulaId,
          formulaTitle: formulaTitle.substring(0, 100), // Limit title length
          timestamp: Date.now(),
        },
        ...state.recentActivity,
      ].slice(0, 20); // Keep only last 20 activities
      
      const newState = {
        ...state,
        totalCorrect: newTotalCorrect,
        totalAttempts: newTotalAttempts,
        recentActivity: newActivity,
        dailyProgress: newDailyProgress,
      };
      
      set(newState);
      persistProgress(newState as ProgressState);
    },

    /**
     * Mark a formula as mastered
     */
    markFormulaMastered: (formulaId: string) => {
      if (!formulaId || typeof formulaId !== 'string') return;
      
      const state = get();
      if (state.masteredFormulas.includes(formulaId)) return;
      
      const formula = state.recentActivity.find(a => a.formulaId === formulaId);
      
      const newState = {
        ...state,
        masteredFormulas: [...state.masteredFormulas, formulaId],
        recentActivity: [
          {
            id: `${Date.now()}-mastered-${formulaId}`,
            type: 'mastered' as const,
            formulaId,
            formulaTitle: formula?.formulaTitle ?? formulaId,
            timestamp: Date.now(),
          },
          ...state.recentActivity,
        ].slice(0, 20),
      };
      
      set(newState);
      persistProgress(newState as ProgressState);
    },

    /**
     * Unmark a formula as mastered
     */
    unmarkFormulaMastered: (formulaId: string) => {
      if (!formulaId || typeof formulaId !== 'string') return;
      
      const state = get();
      const newState = {
        ...state,
        masteredFormulas: state.masteredFormulas.filter(id => id !== formulaId),
      };
      
      set(newState);
      persistProgress(newState as ProgressState);
    },

    /**
     * Record viewing a formula
     */
    recordFormulaView: (formulaId: string, formulaTitle: string) => {
      if (!formulaId || typeof formulaId !== 'string') return;
      
      const state = get();
      
      // Don't duplicate recent views
      const lastView = state.recentActivity.find(a => a.formulaId === formulaId);
      if (lastView && Date.now() - lastView.timestamp < 60000) return;
      
      const newState = {
        ...state,
        recentActivity: [
          {
            id: `${Date.now()}-view-${formulaId}`,
            type: 'viewed' as const,
            formulaId,
            formulaTitle: formulaTitle.substring(0, 100),
            timestamp: Date.now(),
          },
          ...state.recentActivity,
        ].slice(0, 20),
      };
      
      set(newState);
      persistProgress(newState as ProgressState);
    },

    /**
     * Get daily goal progress as percentage (0-100)
     */
    getDailyGoalProgress: () => {
      const { todayStudyMinutes } = get();
      return Math.min(100, Math.round((todayStudyMinutes / PROGRESS_CONFIG.DAILY_GOAL_MINUTES) * 100));
    },

    /**
     * Get today's statistics
     */
    getTodayStats: () => {
      const state = get();
      const today = getTodayDate();
      const todayProgress = state.dailyProgress.find(p => p.date === today);
      
      return {
        studyMinutes: state.todayStudyMinutes,
        correctRate: todayProgress && todayProgress.totalAnswers > 0
          ? Math.round((todayProgress.correctAnswers / todayProgress.totalAnswers) * 100)
          : 0,
      };
    },

    /**
     * Clear all progress (for testing/reset)
     */
    clearProgress: () => {
      set(defaultState);
      SecureStorage.remove(STORAGE_KEY);
    },
  };
});
