import { Link } from "react-router-dom";
import { Bot, Mail, Gamepad2, Lock, Award, ShieldCheck, ArrowRight } from "lucide-react";
import { FlippingCard } from "@/components/ui/FlippingCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useAuth } from "@/contexts/AuthContext";

const BG_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4";

const features = [
  {
    icon: Bot,
    title: "AI Chat Assistant",
    subtitle: "24/7 Security Support",
    desc: "Engage with our advanced AI to resolve your security queries, learn about threats, and get best practice advice instantly.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    path: "/chat",
  },
  {
    icon: Mail,
    title: "Phishing Analyzer",
    subtitle: "AI Threat Detection",
    desc: "Our intelligent engine scans headers, links, and content to identify hidden phishing markers and keep you safe.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
    path: "/tools",
  },
  {
    icon: Gamepad2,
    title: "Interactive Scenarios",
    subtitle: "Real-world Training",
    desc: "Learn by doing. Navigate through simulated attacks and make critical decisions in a safe, controlled environment.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
    path: "/scenarios",
  },
  {
    icon: Lock,
    title: "Password Checker",
    subtitle: "Strength Estimation",
    desc: "Understand how long it takes for a hacker to crack your password and learn how to create unhackable credentials.",
    image: "https://images.unsplash.com/photo-1614064641913-6b71a2ea2e88?auto=format&fit=crop&q=80&w=600",
    path: "/tools",
  },
  {
    icon: Award,
    title: "Gamification",
    subtitle: "Track Your Progress",
    desc: "Stay motivated as you learn. Track your progress, compete for high scores, and showcase your security expertise.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600",
    path: "/profile",
  },
  {
    icon: ShieldCheck,
    title: "Security Quiz",
    subtitle: "Knowledge Assessment",
    desc: "Validate your knowledge with our comprehensive quiz and get a personalized learning path based on your results.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600",
    path: "/quiz",
  },
];

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="w-full">
      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section className="relative w-full h-screen">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src={BG_VIDEO}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-black/40 to-transparent z-10" />

        {/* Hero text – slides up as page loads (slight delay after intro) */}
        <div className="absolute bottom-0 left-0 z-20 px-6 sm:px-12 pb-16 sm:pb-24 max-w-2xl text-left">
          <ScrollReveal animation="fade-up" delay={200} duration={900}>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight mb-4">
              Learn Cybersecurity,<br />Stay Safe Online
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={400} duration={900}>
            <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
              AI-powered companion for cybersecurity awareness — detect phishing, train with real-world scenarios, and build digital safety habits.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={600} duration={900}>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={user ? "/chat" : "/auth"}
                className="bg-white text-black text-sm sm:text-base font-medium px-7 py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer"
              >
                {user ? "Go to Dashboard" : "Start Learning"}
              </Link>
              <a
                href="#features"
                className="liquid-glass text-white text-sm sm:text-base font-medium px-7 py-3 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              >
                Explore Features
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FEATURES SECTION ─────────────────────────────────── */}
      <section id="features" className="py-20 sm:py-28 px-6 sm:px-12 max-w-6xl mx-auto">

        {/* Section heading */}
        <ScrollReveal animation="fade-up" delay={0} duration={800}>
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-3 text-white">
            Everything You Need
          </h2>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100} duration={800}>
          <p className="text-white/40 text-center mb-14 max-w-lg mx-auto">
            Six powerful tools to master cybersecurity awareness, all in one platform.
          </p>
        </ScrollReveal>

        {/* Feature cards – staggered entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <ScrollReveal
              key={f.title}
              animation="fade-up"
              delay={i * 100}
              duration={750}
              threshold={0.1}
            >
              <div className="group relative w-full h-[400px] overflow-hidden rounded-2xl border border-white/10 bg-[#0f1218] shadow-lg transition-all duration-300 ease-in-out hover:shadow-[0_20px_40px_rgba(0,240,255,0.15)] hover:-translate-y-2">
                
                {/* Background Image with Zoom Effect on Hover */}
                <img
                  src={f.image}
                  alt={f.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 opacity-60"
                />

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/20"></div>

                {/* Content Container */}
                <div className="relative flex h-full flex-col justify-between p-6 sm:p-8 text-white">
                  
                  {/* Top Section: Icon Logo */}
                  <div className="flex h-16 items-start">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md shadow-xl text-cyan-400">
                      <f.icon size={20} />
                    </div>
                  </div>
                  
                  {/* Middle Section: Details (slides up on hover) */}
                  <div className="space-y-4 transition-transform duration-500 ease-in-out group-hover:-translate-y-[88px] mt-auto">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 drop-shadow-md">{f.title}</h3>
                      <p className="text-xs sm:text-sm text-cyan-400 font-medium uppercase tracking-wider">{f.subtitle}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white/90 text-xs tracking-widest uppercase mb-2">Overview</h4>
                      <p className="text-sm text-white/70 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Section: Button (revealed on hover) */}
                  <div className="absolute -bottom-24 left-0 w-full p-6 sm:p-8 opacity-0 transition-all duration-500 ease-in-out group-hover:bottom-0 group-hover:opacity-100 bg-gradient-to-t from-black via-black to-transparent pt-10">
                    <div className="flex items-end justify-end">
                      <Link
                        to={f.path}
                        className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-all"
                      >
                        Try Now <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
