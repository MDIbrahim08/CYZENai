import { useState } from "react";
import { Eye, EyeOff, CheckCircle2, XCircle, ShieldQuestion, Search, AlertTriangle, Info, ShieldCheck, ArrowLeft, Send, ShieldAlert, History, Download, Activity, Shield, Image as ImageIcon } from "lucide-react";
import { FlippingCard } from "@/components/ui/FlippingCard";
import { DeepfakeStudio } from "@/components/tools/DeepfakeStudio";

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
interface ToolsProps {
  initialTool?: 'password' | 'phishing' | 'emergency' | 'posture' | 'deepfake' | null;
}

const Tools = ({ initialTool = null }: ToolsProps) => {
  const [activeTool, setActiveTool] = useState<'password' | 'phishing' | 'emergency' | 'posture' | 'deepfake' | null>(initialTool);
  if (activeTool === 'password') return <div className="px-6 sm:px-12 min-h-screen bg-[#0a0a0f]"><IframeTool title="Password Shield" url="/tools/password_analyzer/index.html" onBack={() => setActiveTool(null)} /></div>;
  if (activeTool === 'phishing') return <div className="px-6 sm:px-12 min-h-screen bg-[#0a0a0f]"><IframeTool title="Phishing Scanner" url="/tools/phishing_detection_engine/index.html" onBack={() => setActiveTool(null)} /></div>;
  if (activeTool === 'emergency') return <div className="px-6 sm:px-12 min-h-screen bg-[#0a0a0f]"><IframeTool title="Emergency Response Kit" url="/tools/emergency-response-kit/index.html" onBack={() => setActiveTool(null)} /></div>;
  if (activeTool === 'posture') return <div className="px-6 sm:px-12 min-h-screen bg-[#0a0a0f]"><IframeTool title="Security Posture Analyzer" url="/tools/security_posture_analyzer/index.html" onBack={() => setActiveTool(null)} /></div>;
  if (activeTool === 'deepfake') return <div className="min-h-screen bg-[#0a0a0f] pt-28 px-6 sm:px-12"><DeepfakeStudio onBack={() => setActiveTool(null)} /></div>;

  const toolsData = [
    {
      id: 'password',
      icon: ShieldQuestion,
      iconColor: 'text-cyan-400',
      title: 'Password Shield',
      subtitle: 'Credential Analysis',
      desc: 'Analyze your credentials for vulnerabilities using our trained offline model. Check against complexity rules and common hacking patterns.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'phishing',
      icon: Search,
      iconColor: 'text-red-400',
      title: 'Phishing Scanner',
      subtitle: 'Threat Detection',
      desc: 'Scan suspicious emails, SMS, or web content using our trained detection engine for social engineering tactics and malicious intent.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'emergency',
      icon: Activity,
      iconColor: 'text-orange-400',
      title: 'Emergency Response',
      subtitle: 'Incident Mitigation',
      desc: 'A comprehensive trained toolkit to quickly isolate, analyze, and mitigate active security breaches in your network.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'posture',
      icon: Shield,
      iconColor: 'text-purple-400',
      title: 'Posture Analyzer',
      subtitle: 'System Auditing',
      desc: 'Trained auditing tool that evaluates your system configuration against industry best practices and highlights misconfigurations.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'deepfake',
      icon: ImageIcon,
      iconColor: 'text-purple-400',
      title: 'Deepfake Studio',
      subtitle: 'AI Media Forensics',
      desc: 'Generate photorealistic synthetic media to understand how AI constructs deepfakes and learn to spot digital manipulation.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className="py-24 px-6 sm:px-12 max-w-6xl mx-auto min-h-screen animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">Security Command Center</h2>
        <p className="text-white/40 max-w-xl mx-auto text-lg">Choose a specialized tool to analyze threats and strengthen your digital presence.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {toolsData.map((tool) => (
          <div 
            key={tool.id}
            onClick={() => setActiveTool(tool.id as any)}
            className="group relative w-full h-[400px] overflow-hidden rounded-3xl border border-white/10 bg-[#0f1218] shadow-lg transition-all duration-300 ease-in-out hover:shadow-[0_20px_40px_rgba(0,240,255,0.15)] hover:-translate-y-2 cursor-pointer"
          >
            {/* Background Image with Zoom Effect on Hover */}
            <img
              src={tool.image}
              alt={tool.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 opacity-60"
            />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/20"></div>

            {/* Content Container */}
            <div className="relative flex h-full flex-col justify-between p-8 text-white">
              
              {/* Top Section: Icon Logo */}
              <div className="flex h-16 items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md shadow-xl ${tool.iconColor}`}>
                  <tool.icon size={20} />
                </div>
              </div>
              
              {/* Middle Section: Details (slides up on hover) */}
              <div className="space-y-4 transition-transform duration-500 ease-in-out group-hover:-translate-y-[88px] mt-auto">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1 drop-shadow-md">{tool.title}</h3>
                  <p className={`text-sm ${tool.iconColor} font-medium uppercase tracking-wider`}>{tool.subtitle}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 text-xs tracking-widest uppercase mb-2">Overview</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Section: Button (revealed on hover) */}
              <div className="absolute -bottom-24 left-0 w-full p-8 opacity-0 transition-all duration-500 ease-in-out group-hover:bottom-0 group-hover:opacity-100 bg-gradient-to-t from-black via-black to-transparent pt-10">
                <div className="flex items-end justify-end">
                  <div
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-all"
                  >
                    Launch Tool <Send size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
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
