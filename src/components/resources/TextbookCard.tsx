import { motion } from 'framer-motion';
import { ExternalLink, Star, BookOpen } from 'lucide-react';
import { TextbookResource } from '@/data/resources';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TextbookCardProps {
  textbook: TextbookResource;
  onViewDetails: (textbook: TextbookResource) => void;
}

export const TextbookCard = ({ textbook, onViewDetails }: TextbookCardProps) => {
  const handleGetBook = () => {
    window.open(textbook.purchaseUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      className="card-elevated overflow-hidden group"
    >
      <div className="flex gap-4 p-4">
        {/* Book Cover */}
        <div className="flex-shrink-0 w-20 md:w-24">
          <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-md bg-muted">
            <img
              src={textbook.coverUrl}
              alt={textbook.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Title */}
          <h3 className="font-heading font-semibold text-base line-clamp-2 text-foreground">
            {textbook.title}
          </h3>

          {/* Author & Publisher */}
          <div className="space-y-0.5">
            <p className="text-sm text-text-secondary">{textbook.author}</p>
            <p className="text-xs text-muted-foreground">
              {textbook.publisher} • {textbook.year}
            </p>
          </div>

          {/* Rating & Relevance */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-gold fill-gold" />
              <span className="text-sm font-medium">{textbook.rating}</span>
            </div>
            <Badge
              variant="outline"
              className={`text-xs ${
                textbook.relevance === 'high'
                  ? 'bg-success/10 border-success/30 text-success'
                  : 'bg-warning/10 border-warning/30 text-warning'
              }`}
            >
              {textbook.relevance === 'high' ? '🟢 Highly Relevant' : '🟡 Moderately Relevant'}
            </Badge>
          </div>

          {/* ISBN */}
          {textbook.isbn && (
            <p className="text-xs text-muted-foreground">
              ISBN: {textbook.isbn}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="px-4 pb-3">
        <p className="text-sm text-text-secondary line-clamp-2">
          {textbook.description}
        </p>
      </div>

      {/* Related Tools */}
      <div className="px-4 pb-3">
        <div className="flex flex-wrap gap-1.5">
          {textbook.relatedTools.slice(0, 4).map((tool) => (
            <Badge
              key={tool}
              variant="outline"
              className="text-[10px] bg-emerald-500/5 border-emerald-500/20 text-emerald-400 font-bold uppercase tracking-tighter"
            >
              {tool}
            </Badge>
          ))}
          {textbook.relatedTools.length > 4 && (
            <Badge variant="outline" className="text-[10px] border-white/10 text-white/40">
              +{textbook.relatedTools.length - 4}
            </Badge>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(textbook)}
          className="flex-1 rounded-xl border-white/10 text-white/40 hover:text-white hover:border-white/20 text-[10px] font-bold uppercase tracking-widest"
        >
          <BookOpen className="w-3 h-3 mr-2" />
          Technical Specs
        </Button>
        <Button
          size="sm"
          onClick={handleGetBook}
          className="flex-1 bg-emerald-500 text-black hover:bg-emerald-400 rounded-xl font-bold uppercase tracking-widest text-[10px]"
        >
          Secure Copy
          <ExternalLink className="w-3 h-3 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};
