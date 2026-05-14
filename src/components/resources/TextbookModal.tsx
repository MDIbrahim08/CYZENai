import { motion } from 'framer-motion';
import { ExternalLink, Star, BookOpen, CheckCircle } from 'lucide-react';
import { TextbookResource } from '@/data/resources';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TextbookModalProps {
  textbook: TextbookResource | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TextbookModal = ({ textbook, isOpen, onClose }: TextbookModalProps) => {
  if (!textbook) return null;

  const handleGetBook = () => {
    window.open(textbook.purchaseUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden rounded-3xl max-h-[90vh]">
        <ScrollArea className="max-h-[90vh]">
          {/* Header with Cover */}
          <div className="relative p-6 gradient-teal">
            <div className="flex gap-4">
              {/* Cover */}
              <div className="flex-shrink-0 w-24">
                <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-lg bg-white">
                  <img
                    src={textbook.coverUrl}
                    alt={textbook.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Title Info */}
              <div className="flex-1 text-white">
                <DialogHeader>
                  <DialogTitle className="font-heading text-lg text-left text-white">
                    {textbook.title}
                  </DialogTitle>
                </DialogHeader>
                <p className="text-white/90 text-sm mt-1">{textbook.author}</p>
                <p className="text-white/70 text-xs mt-1">
                  {textbook.publisher} • {textbook.year}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5">
                    <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                    <span className="text-sm font-medium">{textbook.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Relevance Badge */}
            <Badge
              variant="outline"
              className={`${
                textbook.relevance === 'high'
                  ? 'bg-success/10 border-success/30 text-success'
                  : 'bg-warning/10 border-warning/30 text-warning'
              }`}
            >
              {textbook.relevance === 'high' ? '🟢 Highly Relevant' : '🟡 Moderately Relevant'}
            </Badge>

            {/* Description */}
            <div>
              <h4 className="font-heading font-semibold text-sm mb-2">About This Book</h4>
              <p className="text-text-secondary text-sm">
                {textbook.description}
              </p>
            </div>

            {/* ISBN */}
            {textbook.isbn && (
              <div>
                <h4 className="font-heading font-semibold text-sm mb-1">ISBN</h4>
                <p className="text-text-secondary text-sm font-mono">{textbook.isbn}</p>
              </div>
            )}

            {/* Chapters */}
            {textbook.chapters && textbook.chapters.length > 0 && (
              <div>
                <h4 className="font-heading font-semibold text-sm mb-2">Recommended Chapters</h4>
                <div className="space-y-2">
                  {textbook.chapters.map((chapter, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle className="w-4 h-4 text-success" />
                      {chapter}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Formulas */}
            <div>
              <h4 className="font-heading font-semibold text-sm mb-2">Covers These Formulas</h4>
              <div className="flex flex-wrap gap-1.5">
                {textbook.relatedFormulas.map((formula) => (
                  <Badge
                    key={formula}
                    variant="outline"
                    className="text-xs bg-primary/5 border-primary/20 text-primary"
                  >
                    {formula}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 rounded-xl"
              >
                Back
              </Button>
              <Button
                onClick={handleGetBook}
                className="flex-1 gradient-teal text-white rounded-xl"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Get Book
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
