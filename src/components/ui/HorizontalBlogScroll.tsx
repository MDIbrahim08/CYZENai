import { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
  Clock,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Blog } from "@/data/blogsData";

gsap.registerPlugin(ScrollTrigger);

// ─── Adapted PlaceCard for Blog ──────────────────────────────────────────────

interface BlogCardProps {
  blog: Blog;
  index: number;
  isTopRated?: boolean;
  className?: string;
  onSelect: (b: Blog) => void;
}

const BlogCard = ({ blog, index, isTopRated = false, className, onSelect }: BlogCardProps) => {
  // A blog has one cover image; future-proofed to support multiple
  const images = [blog.image];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const changeImage = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  };

  const carouselVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? "100%" : "-100%", opacity: 0 }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.09 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0 },
  };

  // Derive a pseudo-rating from index for visual variety (4.5–5.0)
  const rating = (4.5 + (index % 3) * 0.2).toFixed(1);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      variants={contentVariants}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 16px 40px -8px rgba(0,240,255,0.15)",
        transition: { type: "spring", stiffness: 300, damping: 22 },
      }}
      onClick={() => onSelect(blog)}
      className={cn(
        "blog-h-card flex-shrink-0 w-[320px] md:w-[350px] overflow-hidden rounded-3xl border border-white/10 bg-[#0f1218] text-[#e2e8f0] shadow-lg cursor-pointer",
        className
      )}
    >
      {/* ── Image Carousel ── */}
      <div className="relative group h-56 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={blog.title}
            custom={direction}
            variants={carouselVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1218] via-[#0f1218]/10 to-transparent" />

        {/* Carousel navigation — only shown if multiple images */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={(e) => { e.stopPropagation(); changeImage(-1); }}
              className="rounded-full bg-black/40 hover:bg-black/60 text-white p-1.5 backdrop-blur-sm transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); changeImage(1); }}
              className="rounded-full bg-black/40 hover:bg-black/60 text-white p-1.5 backdrop-blur-sm transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Category badge (top-left) */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-cyan-400 border border-cyan-400/30 px-3 py-1 rounded-full">
            {blog.is_user_blog ? "👤 Community" : blog.category}
          </span>
        </div>

        {/* Rating badge (top-right) */}
        <div className="absolute top-3 right-3 z-10">
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/10">
            <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
            {rating}
          </span>
        </div>

        {/* Pagination dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  currentIndex === i ? "w-4 bg-white" : "w-1.5 bg-white/40"
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <motion.div variants={contentVariants} className="p-5 space-y-3">

        {/* Title + Top Rated */}
        <motion.div variants={itemVariants} className="flex justify-between items-start gap-2">
          <h3 className="text-[15px] font-bold leading-snug line-clamp-2 group-hover:text-cyan-400 transition-colors">
            {blog.title}
          </h3>
          {isTopRated && (
            <span className="flex-shrink-0 text-[10px] font-bold border border-white/20 text-white/60 px-2 py-0.5 rounded-full">
              Top rated
            </span>
          )}
        </motion.div>

        {/* Date • Author */}
        <motion.div variants={itemVariants} className="flex items-center gap-1.5 text-xs text-white/40">
          <Calendar className="h-3 w-3" />
          <span>{blog.date}</span>
          <span>•</span>
          <span className="truncate max-w-[120px]">{blog.author}</span>
        </motion.div>

        {/* Excerpt */}
        <motion.p variants={itemVariants} className="text-xs text-white/40 leading-relaxed line-clamp-3">
          {blog.excerpt}
        </motion.p>

        {/* Footer: read time + CTA */}
        <motion.div variants={itemVariants} className="flex justify-between items-center pt-1 mt-auto">
          <p className="flex items-center gap-1 text-sm font-semibold text-white/70">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            {blog.readTime}
          </p>
          <button className="group flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-white/20 transition-all">
            Read Now
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ─── Horizontal Scroll Container ─────────────────────────────────────────────

interface Props {
  blogs: Blog[];
  onSelect: (blog: Blog) => void;
}

export function HorizontalBlogScroll({ blogs, onSelect }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const totalScroll = track.scrollWidth - window.innerWidth;
      if (totalScroll <= 0) return;

      const ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1.2,
            start: "top top",
            end: () => `+=${totalScroll}`,
            invalidateOnRefresh: true,
          },
        });
      }, section);

      return () => ctx.revert();
    }, 150);

    return () => clearTimeout(timer);
  }, [blogs]);

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-[#05070a]">
      {/* Section header */}
      <div className="absolute top-0 left-0 w-full z-20 pt-10 pb-4 px-10 pointer-events-none select-none">
        <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase">
          Complete Library
        </span>
        <h2 className="text-3xl md:text-4xl font-black mt-1 text-white">
          All Articles{" "}
          <span className="text-white/20 text-xl font-medium">
            — scroll to explore →
          </span>
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex items-center gap-6 px-10 will-change-transform"
        style={{ paddingTop: "130px", paddingBottom: "60px" }}
      >
        {blogs.map((blog, i) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            index={i}
            isTopRated={i < 3}
            onSelect={onSelect}
          />
        ))}

        {/* End cap */}
        <div className="flex-shrink-0 w-52 h-[440px] rounded-3xl border border-white/5 flex flex-col items-center justify-center gap-3 text-white/20 mx-4">
          <span className="text-5xl">📚</span>
          <p className="text-sm font-semibold text-center px-4 leading-snug">
            You've explored all articles!
          </p>
        </div>
      </div>

      {/* Edge fades */}
      <div className="absolute top-0 right-0 h-full w-28 pointer-events-none bg-gradient-to-l from-[#05070a] to-transparent z-10" />
      <div className="absolute top-0 left-0 h-full w-10 pointer-events-none bg-gradient-to-r from-[#05070a] to-transparent z-10" />
    </div>
  );
}
