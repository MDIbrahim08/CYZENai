import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Star, Clock, ChevronDown } from 'lucide-react';
import { formulas, getCategories, searchFormulas, FormulaCategory } from '@/data/formulas';
import { FormulaDisplay } from '@/components/formula/FormulaDisplay';
import { useProgressStore } from '@/stores/progressStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const categoryGradients: Record<FormulaCategory, string> = {
  Descriptive: 'gradient-orange',
  Correlation: 'gradient-pink',
  Inferential: 'gradient-purple',
  Tests: 'gradient-teal',
};

const categoryShadows: Record<FormulaCategory, string> = {
  Descriptive: 'shadow-colored-orange',
  Correlation: 'shadow-colored-pink',
  Inferential: 'shadow-colored-purple',
  Tests: 'shadow-colored-teal',
};

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FormulaCategory | 'all'>('all');
  const [selectedFormula, setSelectedFormula] = useState<typeof formulas[0] | null>(null);

  const { masteredFormulas, markFormulaMastered, unmarkFormulaMastered, recordStudyTime, recordFormulaView } = useProgressStore();
  const categories = getCategories();

  // Filter formulas
  const filteredFormulas = useMemo(() => {
    let result = searchQuery ? searchFormulas(searchQuery) : formulas;
    
    if (selectedCategory !== 'all') {
      result = result.filter(f => f.category === selectedCategory);
    }
    
    return result;
  }, [searchQuery, selectedCategory]);

  // Handle formula click
  const handleFormulaClick = (formula: typeof formulas[0]) => {
    setSelectedFormula(formula);
    recordFormulaView(formula.id, formula.title);
    recordStudyTime(1);
  };

  const toggleMastered = (formulaId: string) => {
    if (masteredFormulas.includes(formulaId)) {
      unmarkFormulaMastered(formulaId);
    } else {
      markFormulaMastered(formulaId);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="font-heading font-bold text-2xl">All Formulas ✨</h1>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-full gap-2">
              {selectedCategory === 'all' ? 'Popular' : selectedCategory}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-2xl">
            <DropdownMenuItem onClick={() => setSelectedCategory('all')}>
              All Categories
            </DropdownMenuItem>
            {categories.map(cat => (
              <DropdownMenuItem key={cat} onClick={() => setSelectedCategory(cat)}>
                {cat}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search formulas..."
          className="pl-12 h-14 rounded-2xl bg-surface border-0 shadow-soft text-base"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-muted flex items-center justify-center"
          >
            <X className="w-4 h-4 text-text-muted" />
          </button>
        )}
      </motion.div>

      {/* Formula Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4"
      >
        {filteredFormulas.map((formula) => {
          const isMastered = masteredFormulas.includes(formula.id);
          
          return (
            <motion.div
              key={formula.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFormulaClick(formula)}
              className={cn(
                'rounded-3xl p-4 text-white cursor-pointer relative overflow-hidden min-h-[160px] flex flex-col',
                categoryGradients[formula.category],
                categoryShadows[formula.category],
                isMastered && 'ring-2 ring-gold ring-offset-2'
              )}
            >
              {/* Decorative blob */}
              <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-white/20" />
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/10" />
              
              {/* Icon Badge */}
              <div className="w-10 h-10 rounded-xl bg-white/25 backdrop-blur-sm flex items-center justify-center mb-3">
                <span className="text-lg font-bold">
                  {formula.title.charAt(0)}
                </span>
              </div>
              
              <h3 className="font-heading font-semibold text-sm leading-tight line-clamp-2 flex-1">
                {formula.title}
              </h3>
              
              <div className="flex items-center gap-2 mt-3">
                <Star className="w-4 h-4 fill-current text-gold" />
                <span className="text-xs">{formula.difficulty}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Empty State */}
      {filteredFormulas.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-text-secondary mb-4">No formulas found</p>
          <Button 
            variant="outline" 
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="rounded-full"
          >
            Clear Filters
          </Button>
        </motion.div>
      )}

      {/* Formula Detail Dialog */}
      <Dialog open={!!selectedFormula} onOpenChange={() => setSelectedFormula(null)}>
        <DialogContent className="rounded-3xl max-w-lg mx-4 max-h-[85vh] overflow-y-auto">
          {selectedFormula && (
            <>
              <DialogHeader className="pb-0">
                <div className={cn(
                  'w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-4',
                  categoryGradients[selectedFormula.category]
                )}>
                  {selectedFormula.title.charAt(0)}
                </div>
                <DialogTitle className="font-heading text-xl text-left">
                  {selectedFormula.title}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={cn('rounded-full', categoryGradients[selectedFormula.category])}>
                    {selectedFormula.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-gold">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs">{selectedFormula.difficulty}</span>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-5 mt-6">
                {/* Formula */}
                <div className="bg-muted rounded-2xl p-5 overflow-x-auto">
                  <FormulaDisplay latex={selectedFormula.latex} block />
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-heading font-semibold mb-2">About this formula</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {selectedFormula.description}
                  </p>
                </div>

                {/* Examples */}
                <div className="gradient-purple rounded-2xl p-4 text-white">
                  <h4 className="font-heading font-semibold mb-2">🧪 Psychology Examples</h4>
                  <ul className="text-sm text-white/90 leading-relaxed space-y-2">
                    {selectedFormula.examples.slice(0, 3).map((ex, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-white/60">•</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mastery Toggle */}
                <Button
                  onClick={() => toggleMastered(selectedFormula.id)}
                  className={cn(
                    'w-full h-14 rounded-2xl font-semibold',
                    masteredFormulas.includes(selectedFormula.id)
                      ? 'bg-gold text-gold-foreground hover:bg-gold/90'
                      : 'gradient-purple'
                  )}
                >
                  {masteredFormulas.includes(selectedFormula.id) 
                    ? '✓ Mastered!' 
                    : 'Mark as Mastered'}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
