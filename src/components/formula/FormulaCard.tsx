import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, BookOpen, Star } from 'lucide-react';
import { Formula } from '@/data/formulas';
import { FormulaDisplay } from './FormulaDisplay';
import { cn } from '@/lib/utils';
import { useProgressStore } from '@/stores/progressStore';
import { Badge } from '@/components/ui/badge';

interface FormulaCardProps {
  formula: Formula;
  onClick?: () => void;
  showDetails?: boolean;
}

const difficultyColors = {
  beginner: 'bg-success/10 text-success border-success/20',
  intermediate: 'bg-warning/10 text-warning border-warning/20',
  advanced: 'bg-destructive/10 text-destructive border-destructive/20',
};

const categoryColors = {
  Descriptive: 'bg-primary/10 text-primary border-primary/20',
  Correlation: 'bg-secondary/10 text-secondary border-secondary/20',
  Inferential: 'bg-accent text-accent-foreground border-accent',
  Tests: 'bg-muted text-muted-foreground border-border',
};

export function FormulaCard({ formula, onClick, showDetails = true }: FormulaCardProps) {
  const { masteredFormulas, markFormulaMastered, unmarkFormulaMastered, recordFormulaView } = useProgressStore();
  const isMastered = masteredFormulas.includes(formula.id);

  const handleMasterToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMastered) {
      unmarkFormulaMastered(formula.id);
    } else {
      markFormulaMastered(formula.id);
    }
  };

  const handleClick = () => {
    recordFormulaView(formula.id, formula.title);
    onClick?.();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      onClick={handleClick}
      className={cn(
        'card-interactive p-6 cursor-pointer group',
        isMastered && 'ring-2 ring-success/30 bg-success/5'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant="outline" className={categoryColors[formula.category]}>
              {formula.category}
            </Badge>
            <Badge variant="outline" className={difficultyColors[formula.difficulty]}>
              {formula.difficulty}
            </Badge>
          </div>
          <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {formula.title}
          </h3>
        </div>
        
        {/* Master Toggle */}
        <button
          onClick={handleMasterToggle}
          className={cn(
            'p-2 rounded-full transition-all duration-200',
            isMastered 
              ? 'bg-success text-success-foreground shadow-md' 
              : 'bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary'
          )}
          aria-label={isMastered ? 'Unmark as mastered' : 'Mark as mastered'}
        >
          {isMastered ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Formula */}
      <div className="bg-surface rounded-lg p-4 mb-4 overflow-x-auto">
        <FormulaDisplay latex={formula.latex} block />
      </div>

      {/* Description */}
      {showDetails && (
        <>
          <p className="text-sm text-text-secondary mb-4 line-clamp-2">
            {formula.description}
          </p>

          {/* Example Preview */}
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <BookOpen className="w-4 h-4" />
            <span className="line-clamp-1">{formula.examples[0]}</span>
          </div>
        </>
      )}
    </motion.div>
  );
}
