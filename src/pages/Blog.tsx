import { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, PenLine, Shield, ArrowRight, Clock, User, Calendar, Share2, Bookmark } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { staticBlogs, Blog } from "@/data/blogsData";

const CATEGORIES = ["All Topics", "Scam Protection", "Identity & Access", "Network Security", "Travel Security", "Malware Education", "Social Privacy", "Device Safety", "Identity Protection", "Data Recovery", "Money Safety", "Email Safety", "Web Safety", "Family Safety", "Workplace Safety", "Senior Protection", "Basic Maintenance", "Advanced Threats", "Gaming Safety", "Basic Cryptography", "Physical Security"];

const categoryIcons: Record<string, string> = {
  "Scam Protection": "🛡️",
  "Identity & Access": "🔑",
  "Network Security": "📡",
  "Travel Security": "✈️",
  "Malware Education": "🦠",
  "Social Privacy": "👁️",
  "Device Safety": "📱",
  "Identity Protection": "👤",
  "Data Recovery": "💾",
  "Money Safety": "💰",
  "Email Safety": "📧",
  "Web Safety": "🌐",
  "Family Safety": "👨‍👩‍👧",
  "Workplace Safety": "🏢",
  "Senior Protection": "🧓",
  "Basic Maintenance": "🔧",
  "Advanced Threats": "⚡",
  "Gaming Safety": "🎮",
  "Basic Cryptography": "🔒",
  "Physical Security": "🏠",
};

const categoryImages: Record<string, string> = {
  "Scam Protection": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400",
  "Identity & Access": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=400",
  "Network Security": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400",
  "Travel Security": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=400",
  "Malware Education": "https://images.unsplash.com/photo-1614064641913-6b71a2ea2e88?auto=format&fit=crop&q=80&w=400",
  "Social Privacy": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400",
  "Device Safety": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400",
  "Identity Protection": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400",
  "Data Recovery": "https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80&w=400",
  "Money Safety": "https://images.unsplash.com/photo-1613243555988-441166d4d6fd?auto=format&fit=crop&q=80&w=400",
  "Email Safety": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=400",
  "Web Safety": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400",
  "Family Safety": "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&q=80&w=400",
  "Workplace Safety": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400",
  "Senior Protection": "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=400",
  "Basic Maintenance": "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&q=80&w=400",
  "Advanced Threats": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400",
  "Gaming Safety": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400",
  "Basic Cryptography": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=400",
  "Physical Security": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400",
};

export default function Blog() {
  const { user } = useAuth();
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [activeFilter, setActiveFilter] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ title: "", category: "", image: "", content: "" });
  const searchRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const HLS_SRC = "https://stream.mux.com/BuGGTsiXq1T00WUb8qfURrHkTCbhrkfFLSv4uAOZzdhw.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari — native HLS support
      video.src = HLS_SRC;
    } else if (Hls.isSupported()) {
      const hls = new Hls({ autoStartLoad: true });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });
      const dbBlogs: Blog[] = (data && !error) ? data.map((b: any) => ({
        id: b.id,
        title: b.title,
        category: b.category,
        author: b.author,
        date: new Date(b.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        readTime: b.read_time || "5 min read",
        image: b.image,
        excerpt: b.excerpt,
        content: b.content,
        is_user_blog: true,
      })) : [];
      setAllBlogs([...dbBlogs, ...staticBlogs]);
    } catch {
      setAllBlogs(staticBlogs);
    }
    setLoading(false);
  }

  async function handlePublish(e: React.FormEvent) {
    e.preventDefault();
    if (!user) { showToast("Please sign in to publish a blog."); return; }
    setSubmitting(true);
    const excerpt = form.content.replace(/<[^>]*>/g, "").substring(0, 150) + "...";
    const { error } = await supabase.from("blogs").insert([{
      title: form.title,
      category: form.category,
      image: form.image,
      content: form.content,
      author: user.email?.split("@")[0] || "CYZEN Member",
      excerpt,
      read_time: "5 min read",
    }]);
    if (error) { showToast("Error publishing. Please try again."); }
    else {
      showToast("Blog published successfully! 🎉");
      setShowWriteModal(false);
      setForm({ title: "", category: "", image: "", content: "" });
      fetchBlogs();
    }
    setSubmitting(false);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  }

  const filtered = allBlogs.filter(b => {
    const matchCat = activeFilter === "All Topics" || b.category === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q) || b.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const featured = allBlogs.slice(0, 2);
  const categories = [...new Set(allBlogs.map(b => b.category))];

  return (
    <div className="min-h-screen bg-[#05070a] text-[#e2e8f0] overflow-x-hidden">

      {/* ── Video Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* HLS Video Background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Dark overlay + grid */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/50 to-[#05070a]" />
        <div className="absolute inset-0 z-[2] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />

        {/* Cyan / Violet ambient glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-400 opacity-10 blur-[140px] z-[2] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-600 opacity-10 blur-[140px] z-[2] pointer-events-none" />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto px-6 pt-32 pb-10"
        >
          <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <Shield size={14} /> CYZEN Cybersecurity Awareness Blog
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-none drop-shadow-2xl">
            Your Complete Guide to{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%] animate-[shine_5s_linear_infinite]">
              Cybersecurity
            </span>
          </h1>
          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto drop-shadow">
            Expert articles on phishing, passwords, malware, privacy and more — for everyone from beginners to pros.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-10 mb-10">
            {[
              { num: allBlogs.length, label: "Articles" },
              { num: categories.length, label: "Categories" },
              { num: allBlogs.reduce((a, b) => a + parseInt(b.readTime || "0"), 0) + "+", label: "Min Reading" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-black text-white drop-shadow">{s.num}</div>
                <div className="text-sm text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-lg mx-auto mb-8">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-white/40 outline-none focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(0,240,255,0.15)] transition-all"
            />
            {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"><X size={16} /></button>}
          </div>

          {/* Write CTA */}
          <button
            onClick={() => setShowWriteModal(true)}
            className="inline-flex items-center gap-2 bg-cyan-400 text-black font-bold px-7 py-3.5 rounded-2xl hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all text-base"
          >
            <PenLine size={18} /> Write Your Own Blog
          </button>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/30 text-xs"
        >
          <span>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </motion.div>
      </section>

      {/* Page-level subtle grid (below hero) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-violet-600 opacity-5 blur-[120px]" />
      </div>

      <section className="relative z-10 px-6 max-w-7xl mx-auto mb-20">
        <div className="text-center mb-10">
          <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Explore Topics</span>
          <h2 className="text-3xl font-bold mt-2">Browse by Category</h2>
        </div>
        <div className="flex overflow-x-auto pb-8 pt-2 gap-5 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map(cat => {
            const count = allBlogs.filter(b => b.category === cat).length;
            const fallbackImage = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400";
            return (
              <div
                key={cat}
                onClick={() => { setActiveFilter(cat); document.getElementById("all-articles")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group relative block overflow-hidden rounded-xl border border-white/10 bg-[#0f1218] text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 cursor-pointer min-w-[280px] flex-shrink-0 snap-start"
              >
                {/* Image container with 16/9 aspect ratio */}
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img
                    src={categoryImages[cat] || fallbackImage}
                    alt={cat}
                    className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </div>
                
                {/* Card content */}
                <div className="p-5 bg-transparent">
                  <h3 className="font-semibold text-base leading-tight truncate text-white">{cat}</h3>
                  <p className="mt-1 text-sm text-[#94a3b8]">{count} {count === 1 ? 'guide' : 'guides'}</p>
                </div>

                {/* Save button - appears on hover */}
                <button
                  className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:bg-white/20 border border-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Category saved to bookmarks!");
                  }}
                  aria-label="Save category"
                >
                  <Bookmark className="h-4 w-4 text-white" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="relative z-10 px-6 max-w-7xl mx-auto mb-20">
          <div className="text-center mb-10">
            <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Must Read</span>
            <h2 className="text-3xl font-bold mt-2">Featured Articles</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map(blog => (
              <div
                key={blog.id}
                onClick={() => setSelectedBlog(blog)}
                className="group relative w-full h-[340px] overflow-hidden rounded-2xl border border-white/10 bg-[#0f1218] shadow-lg transition-all duration-300 ease-in-out hover:shadow-[0_20px_40px_rgba(0,240,255,0.1)] hover:-translate-y-2 cursor-pointer"
              >
                {/* Background Image with Zoom Effect on Hover */}
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>

                {/* Content Container */}
                <div className="relative flex h-full flex-col justify-between p-8 text-white">
                  {/* Top Section: Category Badge */}
                  <div className="flex h-12 items-start">
                    <span className="bg-cyan-400 text-black text-xs font-bold px-4 py-1.5 rounded-full inline-block backdrop-blur-md">
                      {blog.is_user_blog ? "👤 Community" : blog.category}
                    </span>
                  </div>
                  
                  {/* Middle Section: Details (slides up on hover) */}
                  <div className="space-y-4 transition-transform duration-500 ease-in-out group-hover:-translate-y-16 mt-auto">
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-tight mb-2 drop-shadow-md">{blog.title}</h3>
                      <p className="text-sm text-cyan-400/80 font-medium">{blog.author} • {blog.date}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white/90 text-sm tracking-widest uppercase mb-2">Overview</h4>
                      <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Section: Read Time and Button (revealed on hover) */}
                  <div className="absolute -bottom-20 left-0 w-full p-8 opacity-0 transition-all duration-500 ease-in-out group-hover:bottom-0 group-hover:opacity-100 bg-gradient-to-t from-black via-black/90 to-transparent pt-12">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-2xl font-bold text-white flex items-center gap-2">
                          <Clock size={20} className="text-cyan-400" />
                          {blog.readTime}
                        </span>
                      </div>
                      <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-white/20 transition-all">
                        Read Now <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Articles — Normal Vertical Grid */}
      <section id="all-articles" className="relative z-10 px-6 max-w-7xl mx-auto pb-24">
        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-3 pt-16 pb-8">
          {["All Topics", ...categories].map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeFilter === cat
                  ? "bg-cyan-400 text-black border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                  : "bg-[#0f1218] border-white/10 text-[#94a3b8] hover:border-cyan-400/50 hover:text-white"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-[#64748b]">
            <Search size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">No articles found. Try a different search.</p>
          </div>
        ) : (
          <motion.div
            key={activeFilter + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(0,240,255,0.15)" }}
                onClick={() => setSelectedBlog(blog)}
                className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f1218] text-white shadow-lg cursor-pointer transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1218] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-cyan-400 border border-cyan-400/30 px-3 py-1 rounded-full">
                    {blog.is_user_blog ? "👤 Community" : blog.category}
                  </span>
                </div>
                {/* Content */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <h3 className="text-[14px] font-bold leading-snug line-clamp-2 text-white">{blog.title}</h3>
                  <p className="text-xs text-white/40 line-clamp-2 flex-1">{blog.excerpt}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1 text-xs text-cyan-400">
                      <Clock size={12} />{blog.readTime}
                    </span>
                    <button className="flex items-center gap-1 text-xs font-semibold text-white/60 hover:text-white transition-colors">
                      Read Now <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-start justify-center overflow-y-auto py-10 px-4"
            onClick={e => { if (e.target === e.currentTarget) setSelectedBlog(null); }}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0f1218] border border-white/10 rounded-3xl max-w-3xl w-full p-8 md:p-12 relative">
              <button onClick={() => setSelectedBlog(null)}
                className="fixed top-6 right-6 w-10 h-10 rounded-full bg-[#0f1218] border border-white/10 flex items-center justify-center hover:bg-rose-500 transition-colors z-50">
                <X size={18} />
              </button>
              <span className="inline-block bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full mb-4">{selectedBlog.category}</span>
              <h1 className="text-2xl md:text-3xl font-black mb-4 leading-tight">{selectedBlog.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-[#94a3b8] mb-6">
                <span className="flex items-center gap-1"><User size={14} />{selectedBlog.author}</span>
                <span className="flex items-center gap-1"><Calendar size={14} />{selectedBlog.date}</span>
                <span className="flex items-center gap-1"><Clock size={14} />{selectedBlog.readTime}</span>
              </div>
              <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-64 object-cover rounded-2xl mb-8" />
              <div className="prose prose-invert max-w-none text-[#e2e8f0] leading-relaxed [&_h2]:text-xl [&_h2]:font-black [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-bold [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:text-[#94a3b8] [&_p]:mb-4 [&_ul]:pl-5 [&_ol]:pl-5 [&_li]:mb-2 [&_li]:text-[#94a3b8] [&_.tip-box]:bg-cyan-400/5 [&_.tip-box]:border [&_.tip-box]:border-cyan-400/20 [&_.tip-box]:rounded-xl [&_.tip-box]:p-4 [&_.tip-box]:my-5 [&_.tip-box]:text-sm [&_strong]:text-white"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
              <div className="mt-10 pt-8 border-t border-white/10 text-center">
                <p className="text-[#94a3b8] mb-4">Found this helpful? Share it!</p>
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); showToast("Link copied!"); }}
                  className="inline-flex items-center gap-2 bg-cyan-400 text-black font-bold px-5 py-2.5 rounded-xl hover:brightness-110 transition-all">
                  <Share2 size={16} /> Share This Guide
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Write Blog Modal */}
      <AnimatePresence>
        {showWriteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-start justify-center overflow-y-auto py-10 px-4"
            onClick={e => { if (e.target === e.currentTarget) setShowWriteModal(false); }}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0f1218] border border-white/10 rounded-3xl max-w-2xl w-full p-8 relative">
              <button onClick={() => setShowWriteModal(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-rose-500 transition-colors">
                <X size={16} />
              </button>
              <div className="mb-6">
                <span className="inline-block bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full mb-3">Contribute</span>
                <h2 className="text-2xl font-black">Write Your Own Blog</h2>
                <p className="text-[#94a3b8] text-sm mt-1">Share your cybersecurity knowledge with the community.</p>
                {!user && <p className="text-amber-400 text-sm mt-2 bg-amber-400/10 border border-amber-400/20 rounded-lg px-3 py-2">⚠️ You must be signed in to publish.</p>}
              </div>
              <form onSubmit={handlePublish} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Title *</label>
                  <input type="text" required placeholder="Enter an engaging title..." value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(0,240,255,0.1)] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Category *</label>
                  <select required value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-400 transition-all">
                    <option value="">Select a Category</option>
                    {CATEGORIES.filter(c => c !== "All Topics").map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Cover Image URL *</label>
                  <input type="url" required placeholder="https://images.unsplash.com/..." value={form.image}
                    onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-400 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Content (HTML allowed) *</label>
                  <textarea required rows={8} placeholder="<p>Write your content here...</p>" value={form.content}
                    onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-400 transition-all resize-y font-mono" />
                </div>
                <button type="submit" disabled={submitting || !user}
                  className="w-full bg-cyan-400 text-black font-bold py-3 rounded-xl hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
                  {submitting ? <><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Publishing...</> : <><PenLine size={16} /> Publish Blog</>}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#0f1218] border border-cyan-400/30 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-xl flex items-center gap-2">
            ✓ {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes shine { to { background-position: 200% center; } }`}</style>
    </div>
  );
}
