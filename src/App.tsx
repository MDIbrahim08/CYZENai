import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Shield, Menu, X, Github, Twitter, Linkedin, LogOut, User } from "lucide-react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Home from "@/pages/Home";
import Chat from "@/pages/Chat";
import Tools from "@/pages/Tools";
import Resources from "@/pages/Resources";
import Auth from "@/pages/Auth";
import Blog from "@/pages/Blog";
import NotFound from "@/pages/NotFound";
import { TextPressure } from "@/components/ui/TextPressure";
import { IntroOverlay } from "@/components/ui/IntroOverlay";
import { AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isAuthPage = location.pathname === "/auth";
  if (isAuthPage) return null;

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Blog", path: "/blog" },
    { label: "AI Chat", path: "/chat" },
    { label: "Tools", path: "/tools" },
    { label: "Resources", path: "/resources" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4 bg-black/40 backdrop-blur-md border-b border-white/5">
      <Link to="/" className="flex items-center gap-2 text-white font-semibold text-base">
        <Shield size={22} strokeWidth={1.5} className="text-cyan-400" />
        <TextPressure text="CYZEN" className="text-xl tracking-wider font-black" />
      </Link>

      <div className="hidden md:flex liquid-glass items-center gap-1 rounded-xl px-2 py-2">
        {navLinks.map((l) => (
          <Link
            key={l.label}
            to={l.path}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              location.pathname === l.path ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10">
               <User size={16} className="text-cyan-400" />
               <span className="text-xs text-white/70 max-w-[100px] truncate">{user.email}</span>
            </div>
            <button 
              onClick={() => signOut()}
              className="liquid-glass text-white text-sm font-medium p-2.5 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <>
            <Link to="/auth" className="liquid-glass text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/5 transition-colors">Sign In</Link>
            <Link to="/auth" className="bg-white text-black text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/90 transition-colors">Get Started</Link>
          </>
        )}
      </div>

      <button className="md:hidden liquid-glass text-white p-2 rounded-lg" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-[72px] left-4 right-4 z-50 md:hidden liquid-glass rounded-2xl p-4 flex flex-col gap-1 bg-black/60 backdrop-blur-xl border border-white/10">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.path}
              onClick={() => setMenuOpen(false)}
              className={`w-full px-4 py-3 rounded-lg text-sm text-left transition-colors ${
                location.pathname === l.path ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-2 pt-3 border-t border-white/10">
            {user ? (
              <button 
                onClick={() => { signOut(); setMenuOpen(false); }}
                className="flex-1 liquid-glass text-white text-sm font-medium py-2.5 rounded-full flex items-center justify-center gap-2"
              >
                <LogOut size={16} /> Sign Out
              </button>
            ) : (
              <Link 
                to="/auth" 
                onClick={() => setMenuOpen(false)}
                className="flex-1 bg-white text-black text-sm font-medium py-2.5 rounded-full text-center"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const location = useLocation();
  if (location.pathname === "/auth") return null;

  return (
    <footer className="border-t border-white/5 py-12 px-6 sm:px-12 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-white/60">
          <Shield size={18} className="text-cyan-400" />
          <span className="text-sm">© 2026 CYZEN. BCA Final Year Project.</span>
        </div>
        <div className="flex items-center gap-4">
          {[Github, Twitter, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="text-white/30 hover:text-white transition-colors"><Icon size={18} /></a>
          ))}
        </div>
      </div>
    </footer>
  );
};

// Auth guard for already-logged-in users
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const AppContent = () => {
  const { user, loading } = useAuth();
  const [hasEntered, setHasEntered] = useState(() => {
    // Skip intro if already marked, OR if there's an OAuth hash in the URL
    return sessionStorage.getItem("cyzen-entered") === "true" || 
           window.location.hash.includes("access_token");
  });

  // Also skip intro once auth loads and user is confirmed
  useEffect(() => {
    if (!loading && user && !hasEntered) {
      setHasEntered(true);
      sessionStorage.setItem("cyzen-entered", "true");
    }
  }, [user, loading]);

  const handleEnter = () => {
    setHasEntered(true);
    sessionStorage.setItem("cyzen-entered", "true");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!hasEntered && (
          <IntroOverlay key="intro" onEnter={handleEnter} />
        )}
      </AnimatePresence>

      <div className={`transition-all duration-1000 ${hasEntered ? "opacity-100" : "opacity-0 invisible h-0 overflow-hidden"}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<PublicRoute><Auth /></PublicRoute>} />
          
          {/* Protected Routes */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/tools" element={<ProtectedRoute><Tools /></ProtectedRoute>} />
          <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />

          {/* Catch broken card links */}
          <Route path="/quiz" element={<ProtectedRoute><Tools initialTool="posture" /></ProtectedRoute>} />
          <Route path="/darkweb" element={<ProtectedRoute><Tools initialTool="darkweb" /></ProtectedRoute>} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
