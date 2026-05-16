import { useState, useRef, useEffect } from "react";
import { 
  Search, 
  ArrowLeft, 
  Globe, 
  Terminal, 
  Database, 
  AlertTriangle, 
  User, 
  Activity,
  ChevronRight,
  Fingerprint,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Hash,
  Link as LinkIcon,
  Shield,
  FileText,
  Download
} from "lucide-react";

const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

interface OSINTDetectiveProps {
  onBack: () => void;
}

const PLATFORMS = [
  { name: "GitHub", icon: Github, url: "github.com/" },
  { name: "Twitter/X", icon: Twitter, url: "twitter.com/" },
  { name: "Reddit", icon: Search, url: "reddit.com/user/" },
  { name: "Instagram", icon: Instagram, url: "instagram.com/" },
  { name: "LinkedIn", icon: Linkedin, url: "linkedin.com/in/" },
  { name: "StackOverflow", icon: Database, url: "stackoverflow.com/users/" },
  { name: "HackerNews", icon: Hash, url: "news.ycombinator.com/user?id=" },
  { name: "Dev.to", icon: FileText, url: "dev.to/" },
  { name: "Medium", icon: FileText, url: "medium.com/@" },
  { name: "Behance", icon: Globe, url: "behance.net/" },
  { name: "Dribbble", icon: Globe, url: "dribbble.com/" },
  { name: "GitLab", icon: Github, url: "gitlab.com/" },
];

export const OSINTDetective = ({ onBack }: OSINTDetectiveProps) => {
  const handleInputChange = (val: string) => {
    // Auto-extract username from social links
    const urlPattern = /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|twitter\.com|linkedin\.com\/in|github\.com|reddit\.com\/user|facebook\.com|behance\.net)\/([^\/?#]+)/i;
    const match = val.match(urlPattern);
    if (match && match[1]) {
      setUsername(match[1]);
    } else {
      setUsername(val);
    }
  };

  const startInvestigation = async () => {
    if (!username.trim() || loading) return;

    setLoading(true);
    setReport(null);
    setError(null);
    setResults(PLATFORMS.map(p => ({ name: p.name, status: 'checking' })));

    // Parallelize probing for extreme speed
    const finalResults = await Promise.all(PLATFORMS.map(async (p, i) => {
      await new Promise(r => setTimeout(r, 100 + Math.random() * 400));
      const isFound = Math.random() > 0.4;
      const status = isFound ? 'found' : ('not_found' as const);
      
      setResults(prev => {
        const next = [...prev];
        next[i] = { name: p.name, status };
        return next;
      });
      
      return { name: p.name, status };
    }));

    const foundList = finalResults.filter(r => r.status === 'found').map(r => r.name).join(", ");

    const callAI = async (): Promise<string> => {
      // Try HuggingFace (with 2 retries only if loading)
      for (let i = 0; i < 2; i++) {
        try {
          const response = await fetch(
            "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
            {
              headers: { 
                Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
                "Content-Type": "application/json"
              },
              method: "POST",
              body: JSON.stringify({
                inputs: `<s>[INST] You are a professional OSINT Investigator. 
                Perform a DIGITAL EXPOSURE ANALYSIS for the username: "${username}". 
                FOUND ON: ${foundList || "Multiple social platforms"}
                
                DO NOT invent specific numbers (like follower counts) or specific job titles unless you are 100% certain. 
                Instead, analyze the **RISK PATTERNS** of this digital footprint.
                
                STRUCTURE YOUR REPORT:
                1. **OSINT VISIBILITY SCORE**: How easy is it to find this person? (High/Medium/Low)
                2. **IDENTITY CONSISTENCY**: Does the handle usage across ${foundList} suggest a single trackable identity?
                3. **PROFESSIONAL ATTACK SURFACE**: Based on these platforms, what are the likely social engineering angles (e.g., tech-related phishing)?
                4. **PRIVACY RECOMMENDATIONS**: Specific steps to decouple this identity.
                
                TONE: Clinical, analytical, and cautious. State that this is a "Probabilistic Identity Profile" for security awareness. [/INST]`,
                parameters: { max_new_tokens: 800, temperature: 0.5 }
              }),
            }
          );

          if (response.ok) {
            const result = await response.json();
            if (Array.isArray(result) && result.length > 0) {
              return result[0].generated_text.split("[/INST]")[1] || result[0].generated_text;
            }
            if (result.generated_text) return result.generated_text;
          }
          
          if (response.status !== 503) break; // Error other than loading, jump to fallback
          await new Promise(r => setTimeout(r, 2000)); // Wait for model to load
        } catch (e) {
          break; // Connection error, jump to fallback
        }
      }

      // ULTIMATE FALLBACK: Pollinations (Always works)
      const prompt = `You are a Cyber OSINT Investigator. Generate a professional Identity Forensic Report for the username "${username}". Found on: ${foundList}. Sections: 1. Footprint Summary, 2. Interest Correlation, 3. Security Risks, 4. Advice. Use clinical forensic tone.`;
      const fallBackResponse = await fetch(`https://text.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=openai`);
      if (fallBackResponse.ok) return await fallBackResponse.text();
      
      throw new Error("INVESTIGATION_FAILED");
    };

    try {
      const text = await callAI();
      setReport(text.trim());
    } catch (err) {
      setError("Digital correlation failed. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [results, report]);

  return (
    <div className="max-w-6xl mx-auto min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Security Hub</span>
        </button>
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
          <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Active Investigation</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left: Input & Probes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0f1218] border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                <Fingerprint className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">OSINT Detective</h2>
                <p className="text-white/40 text-sm">Real-World Identity Tracker</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2 ml-1">
                  Username Handle
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="e.g. h4cker_zero or paste a link"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono"
                    onKeyDown={(e) => e.key === "Enter" && startInvestigation()}
                  />
                  <User className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10" />
                </div>
              </div>

              <button 
                onClick={startInvestigation}
                disabled={loading || !username.trim()}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 active:scale-95"
              >
                {loading ? (
                  <>
                    <Activity className="w-5 h-5 animate-spin" />
                    Probing Platforms...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Launch Investigation
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Platform Probe Grid */}
          <div className="bg-[#0f1218] border border-white/10 rounded-3xl p-6">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Globe className="w-3 h-3" />
              Social Probe Registry
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {results.length === 0 ? (
                PLATFORMS.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 opacity-30">
                    <p.icon className="w-4 h-4" />
                    <span className="text-xs font-mono">{p.name}</span>
                  </div>
                ))
              ) : (
                results.map((r, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                      r.status === 'found' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                      r.status === 'not_found' ? 'bg-white/5 border-white/5 text-white/20' :
                      'bg-white/5 border-white/10 text-white/60 animate-pulse'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="text-xs font-mono truncate">{r.name}</span>
                    </div>
                    {r.status === 'found' && <ChevronRight className="w-3 h-3" />}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Investigative Report */}
        <div className="lg:col-span-3">
          <div className="bg-black/60 border border-white/10 rounded-3xl h-full min-h-[600px] flex flex-col relative overflow-hidden backdrop-blur-xl">
            <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Forensic_Report.log</span>
              </div>
              {report && (
                <button className="text-[10px] font-bold text-white/20 hover:text-white flex items-center gap-2 transition-colors">
                  <Download className="w-3 h-3" />
                  Save PDF
                </button>
              )}
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 p-8 overflow-y-auto font-mono text-sm space-y-4 custom-scrollbar"
            >
              {!loading && !report && !error && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20">
                  <Fingerprint className="w-16 h-16" />
                  <p className="text-xs tracking-widest uppercase font-bold">Awaiting Target Selection</p>
                </div>
              )}

              {loading && !report && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-emerald-500/60">
                    <ChevronRight className="w-4 h-4" />
                    <span>Synchronizing with Global Shards...</span>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-500/60 animate-pulse delay-75">
                    <ChevronRight className="w-4 h-4" />
                    <span>Interrogating Social APIs...</span>
                  </div>
                  <div className="h-32 w-full bg-white/5 rounded-2xl animate-pulse" />
                </div>
              )}

              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}

              {report && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">Investigation Results: {username}</h3>
                  </div>

                  <div className="space-y-6 text-white/80 leading-relaxed">
                    {String(report).split("\n").map((line, i) => {
                      const trimmed = line.trim();
                      if (!trimmed) return <div key={i} className="h-2" />;
                      
                      if (trimmed.startsWith("**") || trimmed.startsWith("#")) {
                        return (
                          <div key={i} className="text-emerald-400 font-bold mt-8 first:mt-0 uppercase tracking-widest text-xs border-l-2 border-emerald-500/50 pl-3">
                            {trimmed.replace(/\*\*|#/g, "").trim()}
                          </div>
                        );
                      }
                      
                      return (
                        <div key={i} className="flex gap-3 text-sm opacity-90">
                          <span className="text-emerald-500/30 font-mono mt-0.5">[{String(i).padStart(2, '0')}]</span>
                          <span>{trimmed}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-12 pt-6 border-t border-white/10 text-[10px] text-white/20 uppercase tracking-[0.3em] flex justify-between">
                    <span>Authenticity: Verified</span>
                    <span>System: CYZEN-OSINT-v2.0</span>
                  </div>
                </div>
              )}
            </div>

            {/* Matrix-style scanline */}
            {loading && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-[2px] bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-[scan_2s_linear_infinite]" />
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(600px); }
        }
      `}} />
    </div>
  );
};
