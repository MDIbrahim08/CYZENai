import { useState } from "react";
import { Eye, EyeOff, CheckCircle2, XCircle, ShieldQuestion, Search, AlertTriangle, Info, ShieldCheck, ArrowLeft, Send, ShieldAlert, History, Download, Activity, Shield } from "lucide-react";
import { FlippingCard } from "@/components/ui/FlippingCard";

/* ───────── LOGIC HELPERS ───────── */
function getPasswordStrength(pw: string) {
  let score = 0;
  const checks = [
    { label: "8+ characters", pass: pw.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(pw) },
    { label: "Lowercase letter", pass: /[a-z]/.test(pw) },
    { label: "Number", pass: /[0-9]/.test(pw) },
    { label: "Special character", pass: /[^A-Za-z0-9]/.test(pw) },
    { label: "12+ characters", pass: pw.length >= 12 },
  ];
  checks.forEach((c) => c.pass && score++);
  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong", "Excellent"];
  const colors = ["bg-red-500", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-400", "bg-green-500", "bg-emerald-500"];
  return { score, total: 6, label: labels[score], color: colors[score], checks };
}

function analyzePhishing(text: string) {
  if (!text) return null;
  const indicators = [
    { label: "Urgent language", detected: /(urgent|immediate|action required|suspended|blocked|limited)/i.test(text), weight: 20 },
    { label: "Suspicious links", detected: /(bit\.ly|t\.co|goo\.gl|tinyurl|click here|verify now|update details)/i.test(text), weight: 30 },
    { label: "Sensitive requests", detected: /(password|ssn|social security|credit card|bank account|cvv|pin)/i.test(text), weight: 25 },
    { label: "Generic greeting", detected: /(dear customer|dear user|valued member|hello there)/i.test(text), weight: 15 },
    { label: "Spelling errors", detected: /(accountt|verifi|succesfully|payement)/i.test(text), weight: 10 },
  ];
  const score = indicators.reduce((acc, ind) => acc + (ind.detected ? ind.weight : 0), 0);
  let risk = "Low";
  let color = "text-green-400";
  if (score > 60) { risk = "High"; color = "text-red-500"; }
  else if (score > 30) { risk = "Medium"; color = "text-yellow-400"; }
  return { score, risk, color, indicators };
}

/* ───────── COMPONENTS ───────── */

const IframeTool = ({ title, url, onBack }: { title: string; url: string; onBack: () => void }) => {
  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col animate-in fade-in duration-500 mt-20">
      <div className="px-8 py-4 bg-[#0a0a0f] border-b border-white/5 flex items-center justify-between z-10">
        <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>
        <h2 className="text-xl font-bold text-white tracking-wide">{title}</h2>
        <div className="w-20"></div>
      </div>
      <div className="flex-1 w-full bg-[#0a0a0f] relative rounded-b-2xl overflow-hidden border-x border-b border-white/5">
        <iframe 
          src={url} 
          className="absolute inset-0 w-full h-full border-0" 
          title={title}
        />
      </div>
    </div>
  );
};

/* ───────── MAIN PAGE ───────── */

const Tools = () => {
  const [activeTool, setActiveTool] = useState<'password' | 'phishing' | 'emergency' | 'posture' | null>(null);

  if (activeTool === 'password') return <div className="px-6 sm:px-12 min-h-screen bg-[#0a0a0f]"><IframeTool title="Password Shield" url="/tools/password_analyzer/index.html" onBack={() => setActiveTool(null)} /></div>;
  if (activeTool === 'phishing') return <div className="px-6 sm:px-12 min-h-screen bg-[#0a0a0f]"><IframeTool title="Phishing Scanner" url="/tools/phishing_detection_engine/index.html" onBack={() => setActiveTool(null)} /></div>;
  if (activeTool === 'emergency') return <div className="px-6 sm:px-12 min-h-screen bg-[#0a0a0f]"><IframeTool title="Emergency Response Kit" url="/tools/emergency-response-kit/index.html" onBack={() => setActiveTool(null)} /></div>;
  if (activeTool === 'posture') return <div className="px-6 sm:px-12 min-h-screen bg-[#0a0a0f]"><IframeTool title="Security Posture Analyzer" url="/tools/security_posture_analyzer/index.html" onBack={() => setActiveTool(null)} /></div>;

  return (
    <div className="py-24 px-6 sm:px-12 max-w-6xl mx-auto min-h-screen animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">Security Command Center</h2>
        <p className="text-white/40 max-w-xl mx-auto text-lg">Choose a specialized tool to analyze threats and strengthen your digital presence.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* PASSWORD TOOL CARD */}
        <div 
          onClick={() => setActiveTool('password')}
          className="liquid-glass rounded-[2rem] p-10 cursor-pointer hover:bg-white/[0.03] transition-all group border border-white/5"
        >
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
            <ShieldQuestion size={32} className="text-cyan-400" />
          </div>
          <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">Password Shield</h3>
          <p className="text-white/40 text-lg leading-relaxed mb-8">
            Analyze your credentials for vulnerabilities using our trained offline model. Check against complexity rules and common hacking patterns.
          </p>
          <div className="flex items-center gap-3 text-cyan-400 font-bold uppercase tracking-widest text-xs">
            <span>Launch Tool</span>
            <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>

        {/* PHISHING TOOL CARD */}
        <div 
          onClick={() => setActiveTool('phishing')}
          className="liquid-glass rounded-[2rem] p-10 cursor-pointer hover:bg-white/[0.03] transition-all group border border-white/5"
        >
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
            <Search size={32} className="text-red-400" />
          </div>
          <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-red-400 transition-colors">Phishing Scanner</h3>
          <p className="text-white/40 text-lg leading-relaxed mb-8">
            Scan suspicious emails, SMS, or web content using our trained detection engine for social engineering tactics and malicious intent.
          </p>
          <div className="flex items-center gap-3 text-red-400 font-bold uppercase tracking-widest text-xs">
            <span>Launch Tool</span>
            <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>

        {/* EMERGENCY RESPONSE KIT CARD */}
        <div 
          onClick={() => setActiveTool('emergency')}
          className="liquid-glass rounded-[2rem] p-10 cursor-pointer hover:bg-white/[0.03] transition-all group border border-white/5"
        >
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
            <Activity size={32} className="text-orange-400" />
          </div>
          <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors">Emergency Response</h3>
          <p className="text-white/40 text-lg leading-relaxed mb-8">
            A comprehensive trained toolkit to quickly isolate, analyze, and mitigate active security breaches in your network.
          </p>
          <div className="flex items-center gap-3 text-orange-400 font-bold uppercase tracking-widest text-xs">
            <span>Launch Toolkit</span>
            <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>

        {/* SECURITY POSTURE ANALYZER CARD */}
        <div 
          onClick={() => setActiveTool('posture')}
          className="liquid-glass rounded-[2rem] p-10 cursor-pointer hover:bg-white/[0.03] transition-all group border border-white/5"
        >
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
            <Shield size={32} className="text-purple-400" />
          </div>
          <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">Posture Analyzer</h3>
          <p className="text-white/40 text-lg leading-relaxed mb-8">
            Trained auditing tool that evaluates your system configuration against industry best practices and highlights misconfigurations.
          </p>
          <div className="flex items-center gap-3 text-purple-400 font-bold uppercase tracking-widest text-xs">
            <span>Launch Analyzer</span>
            <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>
      </div>

      <div className="mt-20 p-12 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent border border-white/5 text-center">
        <ShieldCheck size={48} className="text-white/10 mx-auto mb-6" />
        <h4 className="text-2xl font-bold text-white/80 mb-3">Professional Suite Coming Soon</h4>
        <p className="text-white/30 max-w-md mx-auto leading-relaxed">
          We're building more advanced utilities including a Network Vulnerability Scanner and an AI-driven Malware Sandbox.
        </p>
      </div>
    </div>
  );
};

export default Tools;
