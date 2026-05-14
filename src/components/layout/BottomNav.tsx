import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen, Brain, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/library', icon: BookOpen, label: 'Library' },
  { to: '/practice', icon: Brain, label: 'Practice' },
  { to: '/resources', icon: FileText, label: 'Resources' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="bottom-nav flex items-center gap-2"
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.to;
        
        return (
          <NavLink key={item.to} to={item.to}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn('nav-item', isActive && 'active')}
            >
              <item.icon className="w-5 h-5" />
            </motion.div>
          </NavLink>
        );
      })}
    </motion.nav>
  );
}
