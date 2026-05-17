import { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowRight, Trash2, X, ExternalLink, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "Inter, sans-serif",
});

const Mermaid = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && chart) {
      ref.current.removeAttribute("data-processed");
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div className="mermaid mt-4 bg-white/5 p-4 rounded-2xl border border-white/10" ref={ref}>
      {chart}
    </div>
  );
};

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const INITIAL_MESSAGE = { role: "assistant", text: "Hello! I'm CYZEN. Ask me anything about cybersecurity — phishing, passwords, malware, VPNs, and more! I can also generate flowcharts for you if you ask." };

const SYSTEM_PROMPT = {
  role: "system",
  content: `You are CYZEN, a professional cybersecurity AI assistant. 
  
  CORE CAPABILITIES:
  1. EXPERT ADVICE: Provide concise, accurate, and safety-focused advice on cybersecurity.
  2. FLOWCHARTS: If the user asks for a process, flowchart, or diagram, generate it using Mermaid.js syntax. Wrap it in triple backticks like this: \`\`\`mermaid\ngraph TD\nA[Start] --> B[End]\n\`\`\`.
  3. INTERNAL TOOL SUGGESTIONS: If a user asks about a specific task we have a tool for, suggest it using the format: [[LINK:/path:Label]]. 
     - For Passwords: [[LINK:/tools:Password Shield]]
     - For Phishing: [[LINK:/tools:Phishing Scanner]]
     - For Deepfakes/AI Media: [[LINK:/deepfake:Deepfake Studio]]
     - For Knowledge Assessment: [[LINK:/quiz:Security Quiz]]
     - For General Tools: [[LINK:/tools:Toolkit]]
     - For Articles/Videos: [[LINK:/blog:Cyber Blog]]
  4. EXTERNAL LINKS & REAL-WORLD TOOLS: If the user asks for the best tools from the overall internet, industry standards, or specific external resources (e.g., HaveIBeenPwned, Bitwarden, VirusTotal, Nmap), you MUST search your knowledge and provide the actual, real-world URLs to those tools in a standard markdown link format (e.g., [VirusTotal](https://www.virustotal.com)). Do NOT just suggest our internal tools if they are asking for real-world or external tools.
  
  TONE: Expert, helpful, and concise. Politely steer non-security topics back to cybersecurity.`
};

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<{ role: string; text: string }[]>([INITIAL_MESSAGE]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendChat = async () => {
    if (!chatInput.trim() || isLoading) return;

    const userMessage = { role: "user", text: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            SYSTEM_PROMPT,
            ...chatMessages.map(m => ({
              role: m.role,
              content: m.text
            })),
            { role: "user", content: chatInput }
          ],
          temperature: 0.7,
          max_tokens: 1536,
        }),
      });

      const data = await response.json();
      const assistantText = data.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";
      
      setChatMessages((prev) => [...prev, { role: "assistant", text: assistantText }]);
    } catch (error) {
      console.error("Groq API Error:", error);
      setChatMessages((prev) => [...prev, { role: "assistant", text: "I encountered a technical error. Please check your internet connection and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = (text: string) => {
    const parts = text.split(/(```mermaid[\s\S]*?```|\[\[LINK:.*?\]\])/g);
    
    return parts.map((part, index) => {
      if (part.startsWith("```mermaid")) {
        const chart = part.replace("```mermaid", "").replace("```", "").trim();
        return <Mermaid key={index} chart={chart} />;
      }
      
      if (part.startsWith("[[LINK:")) {
        const linkData = part.replace("[[LINK:", "").replace("]]", "");
        const [path, label] = linkData.split(":");
        return (
          <Link 
            key={index} 
            to={path} 
            className="inline-flex items-center gap-2 px-4 py-2 mt-2 mr-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-cyan-400 font-semibold transition-all group"
          >
            <ExternalLink size={14} className="group-hover:scale-110" />
            {label}
            <ChevronRight size={14} className="group-hover:translate-x-1" />
          </Link>
        );
      }
      
      return <span key={index} className="whitespace-pre-wrap">{part}</span>;
    });
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
                <div className={`max-w-[85%] sm:max-w-[90%] px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ${
                    m.role === "user" 
                      ? "rounded-[1.5rem] rounded-tr-sm bg-white text-black font-medium" 
                      : "rounded-[1.5rem] rounded-tl-sm bg-white/[0.08] text-white/90 border border-white/[0.08]"
                  }`}>
                  {renderContent(m.text)}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start items-center">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 shrink-0 shadow-inner border border-white/5">
                   <Sparkles size={14} className="text-white/80 animate-pulse" />
                </div>
                <div className="bg-white/[0.08] text-white/40 px-5 py-3.5 rounded-[1.5rem] rounded-tl-sm border border-white/[0.08] flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"></div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} className="h-2" />
          </div>

          {/* Input Area */}
          <div className="p-4 sm:p-6 border-t border-white/[0.08] bg-black/20">
            
            {/* Quick Suggestions */}
            <div className="flex overflow-x-auto gap-2 pb-4 hide-scrollbar">
              {["Generate a password security flowchart", "Show me the deepfake tool", "Security quiz", "Recent cyber blogs"].map((q) => (
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
                placeholder="Ask CYZEN for flowcharts or tools..." 
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
