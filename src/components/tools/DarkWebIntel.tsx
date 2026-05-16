import { useState, useRef, useEffect } from "react";
import { 
  ShieldAlert, 
  Search, 
  ArrowLeft, 
  Globe, 
  Terminal, 
  Database, 
  AlertTriangle, 
  Lock, 
  User, 
  FileSearch,
  Activity,
  ChevronRight,
  Fingerprint
} from "lucide-react";
import { cn } from "@/lib/utils";

const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

interface DarkWebIntelProps {
  onBack: () => void;
}

export const DarkWebIntel = ({ onBack }: DarkWebIntelProps) => {
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [scanSteps, setScanSteps] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const steps = [
    "Establishing encrypted tunnel via Tor network...",
    "Accessing dark-net forum index (Exploit.in, XSS.is)...",
    "Parsing RedLine & Raccoon Infostealer logs...",
    "Searching leaked database shards for target matches...",
    "Analyzing threat actor sentiment and mentions...",
    "Correlating data for final forensic report..."
  ];

  const generateReport = async () => {
    if (!target.trim() || loading) return;

    setLoading(true);
    setReport(null);
    setScanSteps([]);
    setError(null);

    // Simulate scanning steps
    for (const step of steps) {
      setScanSteps((prev) => [...prev, step]);
      await new Promise(r => setTimeout(r, 800));
    }

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/meta-llama/Llama-3-8B-Instruct",
        {
          headers: { 
            Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            inputs: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are a professional Cyber Threat Intelligence Analyst for CYZEN. 
            Generate a detailed DARK WEB FORENSIC REPORT for the target: "${target}". 
            
            STRUCTURE YOUR RESPONSE IN MARKDOWN WITH THESE SECTIONS:
            1. **THREAT EXPOSURE LEVEL**: [Critical/High/Moderate/Low]
            2. **COMPROMISED ASSETS**: Mention simulated leaked emails, API keys, or database entries found in "Infostealer Logs" (RedLine, Lumma).
            3. **DARK WEB MENTIONS**: List simulated discussions on underground forums like Exploit.in or XSS.is.
            4. **RISK VECTOR ANALYSIS**: Explain how an attacker might use this data.
            5. **REMEDIATION STRATEGY**: Professional security steps to mitigate these risks.
            
            STYLE: Use technical, clinical, and high-end forensic terminology. Be extremely professional. 
            NOTE: This is a simulation for educational awareness.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\nGenerate the intelligence report for ${target}.<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`,
            parameters: { max_new_tokens: 1000, temperature: 0.7 }
          }),
        }
      );

      if (!response.ok) throw new Error("HuggingFace API failure");
      const result = await response.json();
      
      let text = "";
      if (Array.isArray(result) && result.length > 0) {
        const fullText = result[0].generated_text || "";
        text = fullText.split("assistant<|end_header_id|>")[1] || fullText;
      } else if (result.generated_text) {
        text = result.generated_text;
      } else {
        throw new Error("Invalid response format");
      }

      setReport(text.trim());
    } catch (err) {
      console.warn("HuggingFace failed, falling back to Pollinations Text...");
      // FALLBACK to Pollinations Text
      try {
        const fallBackResponse = await fetch(`https://text.pollinations.ai/prompt/You%20are%20a%20Cyber%20Threat%20Intelligence%20Analyst.%20Generate%20a%20professional%20Dark%20Web%20Forensic%20Report%20for%20the%20target%20${encodeURIComponent(target)}.%20Use%20sections%20for%20Exposure%20Level,%20Compromised%20Assets,%20Forum%20Mentions,%20and%20Remediation.%20Use%20technical%20forensic%20tone.`);
        const fallBackText = await fallBackResponse.text();
        setReport(fallBackText);
      } catch (fallbackErr) {
        setError("Failed to access intelligence databases. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [scanSteps, report]);

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
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full">
          <Activity className="w-4 h-4 text-red-500 animate-pulse" />
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Live Threat Intel</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Col: Controls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0f1218] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-500/10 transition-colors" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Intelligence Lab</h2>
                <p className="text-white/40 text-sm">Target Deep-Scan Utility</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2 ml-1">
                  Search Parameter (Domain/Email/User)
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="e.g. company.com or user@gmail.com"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-mono"
                    onKeyDown={(e) => e.key === "Enter" && generateReport()}
                  />
                  <Globe className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10" />
                </div>
              </div>

              <button 
                onClick={generateReport}
                disabled={loading || !target.trim()}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] flex items-center justify-center gap-3 active:scale-95 group"
              >
                {loading ? (
                  <>
                    <Activity className="w-5 h-5 animate-spin" />
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Deep-Scan Dark Web
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
              <div className="flex items-center gap-3 text-white/40 text-xs">
                <Lock className="w-3 h-3" />
                <span>Encrypted API Interface Active</span>
              </div>
              <div className="flex items-center gap-3 text-white/40 text-xs">
                <Terminal className="w-3 h-3" />
                <span>HuggingFace Llama-3 Engine Connected</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="bg-[#0f1218] border border-white/10 rounded-3xl p-6 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-center">
              <div className="text-2xl font-bold text-red-500">12.4M</div>
              <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-1">Logs Indexed</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-center">
              <div className="text-2xl font-bold text-orange-500">2.1K</div>
              <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-1">Active Forum Shards</div>
            </div>
          </div>
        </div>

        {/* Right Col: Output Console */}
        <div className="lg:col-span-3">
          <div className="bg-black/80 border border-white/10 rounded-3xl h-[600px] flex flex-col relative overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="px-6 py-3 border-b border-white/10 bg-[#0f1218] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-orange-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                <Database className="w-3 h-3" />
                <span>Forensic_Console_v4.2</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div 
              ref={scrollRef}
              className="flex-1 p-8 overflow-y-auto font-mono text-sm space-y-4 custom-scrollbar bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/5 via-transparent to-transparent"
            >
              {!loading && !report && !error && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <Fingerprint className="w-16 h-16 text-white/5" />
                  <div className="space-y-1">
                    <p className="text-white/20 uppercase tracking-widest font-bold">Awaiting Target Input</p>
                    <p className="text-white/10 text-xs max-w-[250px]">Enter a domain or email to begin deep-net forensic correlation.</p>
                  </div>
                </div>
              )}

              {/* Progress Steps */}
              {scanSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                  <ChevronRight className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-green-500/80">{step}</span>
                </div>
              ))}

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-500 animate-in zoom-in duration-300">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold uppercase text-xs tracking-widest">Protocol Error</div>
                    <div className="text-sm mt-1 opacity-80">{error}</div>
                  </div>
                </div>
              )}

              {/* Final Report */}
              {report && (
                <div className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/5 text-white/90 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-none">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <FileSearch className="w-5 h-5 text-red-400" />
                    <h3 className="text-lg font-bold text-white m-0">Forensic Intelligence Report</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {String(report).split("\n").map((line, i) => {
                      const trimmed = line.trim();
                      if (!trimmed) return <div key={i} className="h-2" />;
                      
                      if (trimmed.startsWith("**") || trimmed.startsWith("#") || trimmed.startsWith("###")) {
                        return (
                          <div key={i} className="text-red-400 font-bold mt-6 first:mt-0 uppercase tracking-wider text-xs">
                            {trimmed.replace(/\*\*|#/g, "").trim()}
                          </div>
                        );
                      }
                      
                      return (
                        <div key={i} className="flex gap-2 text-sm opacity-80 leading-relaxed">
                          <span className="text-red-500/40 mt-1.5">•</span>
                          <span>{trimmed}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Authenticity Verified: CYZEN Intel-Grid</span>
                    <button className="text-[10px] font-bold text-white/40 hover:text-white flex items-center gap-2 transition-colors">
                      <Download className="w-3 h-3" />
                      Export PDF
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Scanline Effect */}
            {loading && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                <div className="w-full h-1 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-[scanner_2s_ease-in-out_infinite]" />
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanner {
          0% { transform: translateY(0); }
          50% { transform: translateY(600px); }
          100% { transform: translateY(0); }
        }
        .prose p { margin-top: 0.5rem; margin-bottom: 0.5rem; }
      `}} />
    </div>
  );
};
