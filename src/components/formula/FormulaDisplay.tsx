import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface FormulaDisplayProps {
  latex: string;
  block?: boolean;
  className?: string;
}

/**
 * Renders mathematical formulas using KaTeX
 * Handles LaTeX syntax errors gracefully
 */
export function FormulaDisplay({ latex, block = false, className = '' }: FormulaDisplayProps) {
  try {
    if (block) {
      return (
        <div className={`overflow-x-auto ${className}`}>
          <BlockMath math={latex} />
        </div>
      );
    }
    
    return (
      <span className={className}>
        <InlineMath math={latex} />
      </span>
    );
  } catch (error) {
    // Fallback for invalid LaTeX
    console.error('KaTeX rendering error:', error);
    return (
      <code className={`font-mono text-sm bg-muted px-2 py-1 rounded ${className}`}>
        {latex}
      </code>
    );
  }
}
