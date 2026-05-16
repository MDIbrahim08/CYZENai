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
      <DialogContent className="max-w-lg p-0 overflow-hidden rounded-3xl max-h-[90vh] bg-[#0a0a0f] border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <ScrollArea className="max-h-[90vh]">
          {/* Header with Cover */}
          <div className="relative p-8 bg-emerald-500/10 border-b border-white/5">
            <div className="flex gap-6">
              {/* Cover */}
              <div className="flex-shrink-0 w-28">
                <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl bg-black/40 border border-white/10">
                  <img
                    src={textbook.coverUrl}
                    alt={textbook.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Title Info */}
              <div className="flex-1 min-w-0">
                <DialogHeader>
                  <DialogTitle className="font-heading text-xl text-left text-white leading-tight">
                    {textbook.title}
                  </DialogTitle>
                </DialogHeader>
                <p className="text-emerald-400/80 text-sm mt-2 font-medium">{textbook.author}</p>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mt-2">
                  {textbook.publisher} • {textbook.year}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center gap-1.5 bg-emerald-500/10 rounded-full px-3 py-1 border border-emerald-500/20">
                    <Star className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400">{textbook.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Relevance Badge */}
            <Badge
              className={`rounded-xl px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest ${
                textbook.relevance === 'high'
                  ? 'bg-emerald-500 text-black'
                  : 'bg-white/5 text-white/40 border border-white/10'
              }`}
            >
              {textbook.relevance === 'high' ? 'High Priority Resource' : 'Reference Material'}
            </Badge>

            {/* Description */}
            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-white/20 mb-3">Briefing</h4>
              <p className="text-white/40 text-sm leading-relaxed">
                {textbook.description}
              </p>
            </div>

            {/* Chapters */}
            {textbook.chapters && textbook.chapters.length > 0 && (
              <div>
                <h4 className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-white/20 mb-3">Critical Chapters</h4>
                <div className="space-y-2">
                  {textbook.chapters.map((chapter, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-white/60 bg-white/5 p-3 rounded-xl border border-white/5">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      {chapter}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Tools */}
            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-white/20 mb-3">Core Toolset</h4>
              <div className="flex flex-wrap gap-2">
                {textbook.relatedTools.map((tool) => (
                  <Badge
                    key={tool}
                    variant="outline"
                    className="text-[10px] font-bold uppercase tracking-widest bg-emerald-500/5 border-emerald-500/20 text-emerald-400 px-3 py-1"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-white/5">
              <Button
                variant="ghost"
                onClick={onClose}
                className="flex-1 rounded-xl text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
              >
                Close File
              </Button>
              <Button
                onClick={handleGetBook}
                className="flex-1 bg-emerald-500 text-black hover:bg-emerald-400 rounded-xl font-bold uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Acquire Source
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
