import { motion } from 'framer-motion';
import { ArrowRight, Video, BookOpen } from 'lucide-react';
import { CuratedCollection } from '@/data/resources';
import { Button } from '@/components/ui/button';

interface CuratedCollectionsProps {
  collections: CuratedCollection[];
}

export const CuratedCollections = ({ collections }: CuratedCollectionsProps) => {
  return (
    <section className="space-y-6">
      <h2 className="font-heading font-bold text-xs uppercase tracking-[0.3em] text-white/40 flex items-center gap-2">
        <span className="w-8 h-px bg-emerald-500/20" />
        Curated Intelligence Modules
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#161b22] border border-white/5 rounded-2xl p-6 hover:border-emerald-500/30 transition-all group relative overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/10 transition-colors" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {collection.icon}
                </div>
                <div className="p-2 rounded-full bg-white/5 text-white/20 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-all">
                  <ArrowRight size={16} />
                </div>
              </div>

              <h3 className="font-heading font-bold text-lg text-white mb-2">
                {collection.title}
              </h3>
              <p className="text-white/40 text-sm mb-6 leading-relaxed">
                {collection.description}
              </p>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-500/60">
                  <Video size={12} />
                  {collection.videoCount} Modules
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-500/60">
                  <BookOpen size={12} />
                  {collection.textbookCount} Sources
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
