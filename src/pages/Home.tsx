import { Link } from "react-router-dom";
import { Bot, Mail, Gamepad2, Lock, Award, ShieldCheck, ArrowRight } from "lucide-react";
import { FlippingCard } from "@/components/ui/FlippingCard";

const BG_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4";

const features = [
  { 
    icon: Bot, 
    title: "AI Chat Assistant", 
    desc: "Ask anything about cybersecurity. Powered by Google Gemini AI for real-time, context-aware answers.", 
    backDesc: "Engage with our advanced AI to resolve your security queries, learn about threats, and get best practice advice instantly.",
    color: "from-cyan-500 to-blue-600", 
    path: "/chat" 
  },
  { 
    icon: Mail, 
    title: "Phishing Analyzer", 
    desc: "Paste suspicious emails and get instant AI-powered risk analysis with red-flag detection.", 
    backDesc: "Our intelligent engine scans headers, links, and content to identify hidden phishing markers and keep you safe.",
    color: "from-red-500 to-pink-600", 
    path: "/tools" 
  },
  { 
    icon: Gamepad2, 
    title: "Interactive Scenarios", 
    desc: "Train with 10 real-world cyber threat scenarios across beginner to advanced levels.", 
    backDesc: "Learn by doing. Navigate through simulated attacks and make critical decisions in a safe, controlled environment.",
    color: "from-purple-500 to-indigo-600", 
    path: "/scenarios" 
  },
  { 
    icon: Lock, 
    title: "Password Checker", 
    desc: "Test your password strength in real-time with crack-time estimates and tips.", 
    backDesc: "Understand how long it takes for a hacker to crack your password and learn how to create unhackable credentials.",
    color: "from-green-500 to-emerald-600", 
    path: "/tools" 
  },
  { 
    icon: Award, 
    title: "Gamification", 
    desc: "Earn points, unlock 12 badges, and level up from Beginner to Master.", 
    backDesc: "Stay motivated as you learn. Track your progress, compete for high scores, and showcase your security expertise.",
    color: "from-yellow-500 to-orange-600", 
    path: "/profile" 
  },
  { 
    icon: ShieldCheck, 
    title: "Security Quiz", 
    desc: "15-question assessment across 5 categories with personalized recommendations.", 
    backDesc: "Validate your knowledge with our comprehensive quiz and get a personalized learning path based on your results.",
    color: "from-teal-500 to-cyan-600", 
    path: "/quiz" 
  },
];

import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative w-full h-screen">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline src={BG_VIDEO} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-black/40 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 z-20 px-6 sm:px-12 pb-16 sm:pb-24 max-w-2xl text-left">
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight mb-4">
            Learn Cybersecurity, Stay Safe Online
          </h1>
          <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
            AI-powered companion for cybersecurity awareness — detect phishing, train with real-world scenarios, and build digital safety habits.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link to={user ? "/chat" : "/auth"} className="bg-white text-black text-sm sm:text-base font-medium px-7 py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
              {user ? "Go to Dashboard" : "Start Learning"}
            </Link>
            <a href="#features" className="liquid-glass text-white text-sm sm:text-base font-medium px-7 py-3 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 sm:py-28 px-6 sm:px-12 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-3 text-white">Everything You Need</h2>
        <p className="text-white/40 text-center mb-14 max-w-lg mx-auto">Six powerful tools to master cybersecurity awareness, all in one platform.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <FlippingCard 
              key={f.title}
              frontContent={
                <div className="flex flex-col h-full text-left">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4`}>
                    <f.icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{f.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                </div>
              }
              backContent={
                <div className="flex flex-col h-full justify-between py-2">
                   <div>
                     <h3 className="text-lg font-semibold mb-3 text-white">{f.title}</h3>
                     <p className="text-white/60 text-sm leading-relaxed">{f.backDesc}</p>
                   </div>
                   <Link 
                    to={f.path} 
                    className="flex items-center gap-2 text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors mt-4 self-center"
                   >
                     Try Now <ArrowRight size={14} />
                   </Link>
                </div>
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
