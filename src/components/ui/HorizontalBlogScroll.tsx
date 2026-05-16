import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Blog } from "@/data/blogsData";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  blogs: Blog[];
  onSelect: (blog: Blog) => void;
}

export function HorizontalBlogScroll({ blogs, onSelect }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Small delay to guarantee DOM is painted and widths are accurate
    const timer = setTimeout(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const totalScroll = track.scrollWidth - window.innerWidth;

      const ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            // end is dynamic so it re-calculates correctly after resize
            end: () => `+=${totalScroll}`,
            invalidateOnRefresh: true,
          },
        });
      }, section);

      return () => ctx.revert();
    }, 120); // 120 ms safety margin for React paint

    return () => clearTimeout(timer);
  }, [blogs]);

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-[#05070a]">
      {/* Section header — sits above the track, doesn't scroll */}
      <div className="absolute top-0 left-0 w-full z-20 pt-10 pb-6 px-10 pointer-events-none">
        <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase">
          Complete Library
        </span>
        <h2 className="text-3xl font-black mt-1 text-white">
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
        style={{ paddingTop: "120px", paddingBottom: "48px" }}
      >
        {blogs.map((blog, i) => (
          <BlogCard key={blog.id} blog={blog} index={i} onSelect={onSelect} />
        ))}

        {/* End spacer card */}
        <div className="flex-shrink-0 w-64 h-[420px] rounded-3xl border border-white/5 bg-white/2 flex flex-col items-center justify-center gap-3 text-white/20">
          <span className="text-5xl">📚</span>
          <p className="text-sm font-semibold text-center px-6">
            You've reached the end! More articles coming soon.
          </p>
        </div>
      </div>

      {/* Right-edge fade hint */}
      <div className="absolute top-0 right-0 h-full w-32 pointer-events-none bg-gradient-to-l from-[#05070a] to-transparent z-10" />
    </div>
  );
}

/* ── Individual card ── */
function BlogCard({
  blog,
  index,
  onSelect,
}: {
  blog: Blog;
  index: number;
  onSelect: (b: Blog) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Staggered entrance fade driven by the horizontal scroll position
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: ScrollTrigger.getAll()[0], // attach to the horizontal scroll
            start: "left 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, card);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      onClick={() => onSelect(blog)}
      className="flex-shrink-0 w-[340px] h-[460px] rounded-3xl overflow-hidden border border-white/8 bg-[#0f1218] cursor-pointer group relative flex flex-col"
      style={{ opacity: 0 }} // start hidden; GSAP will reveal
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <img
          src={blog.image}
          alt={blog.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient over image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1218] via-transparent" />
        {/* Badge */}
        <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-full border border-cyan-400/30 uppercase tracking-wider">
          {blog.is_user_blog ? "👤 Community" : blog.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex gap-3 text-[11px] text-white/30 mb-2">
          <span className="flex items-center gap-1">
            <Calendar size={10} />
            {blog.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {blog.readTime}
          </span>
        </div>

        <h3 className="font-bold text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
          {blog.title}
        </h3>

        <p className="text-[13px] text-white/40 line-clamp-3 flex-1">
          {blog.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-white/8 flex items-center justify-between">
          <span className="text-xs text-white/30">{blog.author}</span>
          <span className="flex items-center gap-1 text-cyan-400 text-[11px] font-bold uppercase tracking-wide">
            Read <ArrowRight size={12} />
          </span>
        </div>
      </div>

      {/* Hover glow border */}
      <div className="absolute inset-0 rounded-3xl border border-cyan-400/0 group-hover:border-cyan-400/30 transition-all duration-500 pointer-events-none" />
    </div>
  );
}
