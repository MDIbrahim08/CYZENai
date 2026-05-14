import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  Brain, 
  FileText, 
  ChevronLeft,
  ChevronRight,
  LogOut,
  Flame,
  Trophy
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { useProgressStore } from '@/stores/progressStore';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/library', icon: BookOpen, label: 'Formula Library' },
  { to: '/practice', icon: Brain, label: 'Practice Mode' },
  { to: '/resources', icon: FileText, label: 'Resources' },
];

function NavItem({ to, icon: Icon, label, isCollapsed }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink to={to} className="block">
      <motion.div
        whileHover={{ x: isCollapsed ? 0 : 4 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
          isActive
            ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg'
            : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
        )}
      >
        <Icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'animate-pulse-glow')} />
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="font-medium whitespace-nowrap overflow-hidden"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </NavLink>
  );
}

export function AppSidebar({ isCollapsed, onToggle }: SidebarProps) {
  const { logout } = useAuthStore();
  const { currentStreak, masteredFormulas } = useProgressStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen bg-sidebar sticky top-0 flex flex-col shadow-xl z-50"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
                <Brain className="w-6 h-6 text-sidebar-primary-foreground" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-sidebar-foreground">PsyStat</h1>
                <p className="text-xs text-sidebar-foreground/60">Formula Coach</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map(item => (
          <NavItem key={item.to} {...item} isCollapsed={isCollapsed} />
        ))}
      </nav>

      {/* Stats Section */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        {/* Streak */}
        <div className={cn(
          'flex items-center gap-3 px-4 py-3 rounded-xl bg-sidebar-accent/50',
          isCollapsed && 'justify-center'
        )}>
          <div className="relative">
            <Flame className={cn(
              'w-5 h-5 text-warning',
              currentStreak > 0 && 'animate-flicker'
            )} />
            {currentStreak > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full animate-ping" />
            )}
          </div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1"
              >
                <p className="text-xs text-sidebar-foreground/60">Current Streak</p>
                <p className="font-bold text-sidebar-foreground">{currentStreak} day{currentStreak !== 1 ? 's' : ''}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mastered */}
        <div className={cn(
          'flex items-center gap-3 px-4 py-3 rounded-xl bg-sidebar-accent/50',
          isCollapsed && 'justify-center'
        )}>
          <Trophy className="w-5 h-5 text-secondary" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1"
              >
                <p className="text-xs text-sidebar-foreground/60">Mastered</p>
                <p className="font-bold text-sidebar-foreground">{masteredFormulas.length} formulas</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={logout}
          className={cn(
            'flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sidebar-foreground/80 hover:bg-destructive/20 hover:text-destructive transition-all',
            isCollapsed && 'justify-center'
          )}
        >
          <LogOut className="w-5 h-5" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
