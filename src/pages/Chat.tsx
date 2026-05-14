import { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowRight, Trash2, X } from "lucide-react";

const chatResponses: Record<string, string> = {
  phishing: "Phishing is a social engineering attack where attackers send fraudulent messages to trick victims into revealing sensitive information. Look for: suspicious sender addresses, urgent language, misspelled URLs, and requests for personal data. Always verify links before clicking!",
  password: "A strong password should be 12+ characters with uppercase, lowercase, numbers, and symbols. Never reuse passwords across sites. Use a password manager like Bitwarden or 1Password. Enable 2FA wherever possible!",
  malware: "Malware is malicious software designed to damage or exploit systems. Types include viruses, worms, trojans, ransomware, and spyware. Protect yourself by keeping software updated, using antivirus, and avoiding suspicious downloads.",
  vpn: "A VPN (Virtual Private Network) encrypts your internet traffic and hides your IP address. Use a reputable VPN on public WiFi, but remember — a VPN doesn't make you anonymous. It's one layer in a defense-in-depth strategy.",
  default: "Great question! Cybersecurity is about protecting systems, networks, and data from digital attacks. Key areas include network security, application security, information security, and disaster recovery. What specific topic would you like to learn more about?",
};

const INITIAL_MESSAGE = { role: "assistant", text: "Hello! I'm CYZEN. Ask me anything about cybersecurity — phishing, passwords, malware, VPNs, and more!" };

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<{ role: string; text: string }[]>([INITIAL_MESSAGE]);
  const [chatInput, setChatInput] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const msg = chatInput.toLowerCase();
    setChatMessages((prev) => [...prev, { role: "user", text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      const key = Object.keys(chatResponses).find((k) => msg.includes(k)) || "default";
      setChatMessages((prev) => [...prev, { role: "assistant", text: chatResponses[key] }]);
    }, 600);
  };

  const clearChat = () => {
    setChatMessages([INITIAL_MESSAGE]);
    setShowClearConfirm(false);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col pt-24 pb-12 px-4 sm:px-6 md:px-8">
      {/* Video Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 mix-blend-screen"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" /> {/* Dimming overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/80" /> {/* Fade edges */}
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex-1 flex flex-col h-[calc(100vh-8rem)]">
        
        {/* Title Section */}
        <div className="text-center mb-8 relative">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-3 drop-shadow-xl">CYZEN Intelligence</h1>
          <p className="text-white/60 text-lg font-medium drop-shadow-md">Your personal cybersecurity advisor.</p>
          {/* Clear Chat Button */}
          {chatMessages.length > 1 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="absolute right-0 top-1 flex items-center gap-2 text-xs text-white/30 hover:text-red-400 transition-colors group px-3 py-2 rounded-full border border-white/10 hover:border-red-500/30"
              title="Clear chat"
            >
              <Trash2 size={14} className="group-hover:scale-110 transition-transform" />
              <span>Clear Chat</span>
            </button>
          )}
        </div>

        {/* Apple Style Curved Glass Chat Container */}
        <div className="flex-1 flex flex-col overflow-hidden rounded-[2.5rem] border border-white/[0.12] bg-white/[0.03] backdrop-blur-3xl shadow-2xl">
          
          {/* Scrollable Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar">
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 shrink-0 shadow-inner border border-white/5">
                     <Sparkles size={14} className="text-white/80" />
                  </div>
                )}
                <div className={`max-w-[85%] sm:max-w-[75%] px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ${
                    m.role === "user" 
                      ? "rounded-[1.5rem] rounded-tr-sm bg-white text-black font-medium" 
                      : "rounded-[1.5rem] rounded-tl-sm bg-white/[0.08] text-white/90 border border-white/[0.08]"
                  }`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} className="h-2" />
          </div>

          {/* Input Area */}
          <div className="p-4 sm:p-6 border-t border-white/[0.08] bg-black/20">
            
            {/* Quick Suggestions */}
            <div className="flex overflow-x-auto gap-2 pb-4 hide-scrollbar">
              {["What is phishing?", "Password tips", "Tell me about malware", "What is a VPN?"].map((q) => (
                <button 
                  key={q} 
                  onClick={() => { setChatInput(q); }} 
                  className="whitespace-nowrap text-[13px] font-medium px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Pill-shaped Input Field */}
            <div className="relative flex items-center bg-white/[0.06] border border-white/[0.12] rounded-full px-2 py-1.5 focus-within:border-white/30 focus-within:bg-white/[0.08] transition-all shadow-inner">
              <input 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && sendChat()} 
                placeholder="Ask CYZEN anything..." 
                className="flex-1 bg-transparent px-4 py-2.5 text-[15px] text-white placeholder-white/40 outline-none w-full"
              />
              <button 
                onClick={sendChat} 
                disabled={!chatInput.trim()}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-black transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shrink-0"
              >
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Clear Chat Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f0f1a] border border-white/10 rounded-3xl p-8 max-w-sm mx-4 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-5">
              <Trash2 size={26} className="text-red-400" />
            </div>
            <h3 className="text-white text-xl font-bold mb-2">Clear Chat History?</h3>
            <p className="text-white/40 text-sm mb-7 leading-relaxed">All messages will be permanently deleted and the conversation will restart.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-3 rounded-2xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={clearChat}
                className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-400 text-white transition-all text-sm font-bold"
              >
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
