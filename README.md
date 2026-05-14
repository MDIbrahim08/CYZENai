# 🔐 CyberGuard AI - Cybersecurity Awareness Platform

**BCA Final Year Project - Academic Year 2025-26**

An AI-powered interactive platform for learning cybersecurity through conversational AI, phishing detection, scenario-based training, and gamification.

---

## 🎯 Project Overview

CyberGuard AI is a comprehensive cybersecurity education platform that makes learning digital safety engaging and accessible. Built with modern web technologies and powered by AI, it provides:

- **AI Chat Assistant**: Natural conversations about cybersecurity topics using Google Gemini 3 Flash
- **Phishing Email Analyzer**: Real-time detection of phishing indicators in suspicious emails
- **Interactive Scenarios**: Gamified training with 10 real-world cyber threat scenarios
- **Security Assessment**: 15-question quiz with personalized recommendations
- **Password Checker**: Real-time password strength analysis with feedback
- **Gamification System**: Points, badges, levels, and progress tracking

---

## 🚀 Features

### Tier 1 - Core Features (Demo-Ready)

#### 1. AI Chat Interface ✨
- Conversational AI powered by OnSpace AI (Google Gemini 3 Flash)
- Context-aware responses with conversation history
- Fallback responses for offline/demo mode
- Real-time typing indicators
- Message persistence for authenticated users

#### 2. Phishing Email Analyzer 🎯
- AI-powered email analysis
- Risk level classification (Low/Medium/High)
- Visual red flag highlighting
- Detailed explanations and recommendations
- Sample phishing emails for testing

#### 3. Interactive Scenarios 🎮
- 10 pre-loaded cybersecurity scenarios
- Difficulty levels: Beginner, Intermediate, Advanced
- Multiple choice questions with detailed explanations
- Points and badges rewards
- Progress tracking

### Tier 2 - Supporting Features

#### 4. Security Assessment Quiz 📋
- 15 questions across 5 categories:
  - Password Security
  - Email Security
  - Device Security
  - Social Media Safety
  - Public WiFi & Browsing
- Personalized score and recommendations
- Category breakdown visualization

#### 5. Password Strength Checker 🔒
- Real-time password analysis
- Strength meter (Weak → Excellent)
- Requirements checklist
- Crack time estimation
- Secure password generator

#### 6. Gamification System 🏆
- Points for completing activities
- 12 achievement badges
- Level progression (Beginner → Master)
- User dashboard with stats
- Progress tracking

---

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - UI framework
- **TypeScript 5.5.3** - Type safety
- **Vite 5.4.1** - Build tool
- **Tailwind CSS 3.4.11** - Styling
- **shadcn/ui** - UI components
- **React Router DOM 6** - Navigation
- **Sonner** - Toast notifications
- **Lucide React** - Icons

### Backend
- **OnSpace Cloud** - Serverless backend (Supabase-compatible)
- **PostgreSQL** - Database
- **Edge Functions** - Serverless functions (Deno)
- **OnSpace AI** - AI integration (Google Gemini 3 Flash)

### Authentication
- Supabase Auth with OTP + Password flow
- Session management
- Row-level security (RLS)

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ or Bun
- OnSpace account (for deployment)

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd cyberguard-ai
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Environment Variables**

The project uses OnSpace Cloud, so environment variables are auto-configured:
- `VITE_SUPABASE_URL` - Auto-generated
- `VITE_SUPABASE_ANON_KEY` - Auto-generated

4. **Run development server**
```bash
npm run dev
# or
bun dev
```

5. **Open browser**
```
http://localhost:5173
```

---

## 🗄️ Database Schema

### Tables Created

#### `user_profiles`
- User account data
- Points, level, streak tracking
- Extended from Supabase auth.users

#### `chat_sessions`
- Chat conversation sessions
- Linked to users (or anonymous)

#### `chat_messages`
- Individual chat messages
- Role: user | assistant

#### `scenarios`
- Pre-loaded training scenarios
- Questions, options, explanations

#### `scenario_attempts`
- User scenario completions
- Tracks correct/incorrect answers

#### `assessments`
- Security quiz results
- Scores, weak areas, recommendations

#### `badges`
- Achievement definitions
- Criteria and point requirements

#### `user_badges`
- Earned badges per user

#### `phishing_analyses`
- Email analysis history
- Risk levels and red flags

---

## 🔐 Security Features

### Row Level Security (RLS)
- All tables protected with RLS policies
- Users can only access their own data
- Public read for master data (scenarios, badges)

### Authentication
- OTP email verification
- Password hashing (bcrypt)
- Session-based auth
- CSRF protection

### Best Practices
- Input sanitization
- SQL injection prevention (Supabase ORM)
- XSS protection
- Secure password requirements

---

## 🎮 Usage Guide

### For Anonymous Users
1. Visit homepage
2. Access all features (chat, phishing analyzer, scenarios, etc.)
3. Progress is session-based (not saved)

### For Registered Users
1. Sign up with email (OTP verification)
2. Set password and username
3. Login to access dashboard
4. All progress is saved:
   - Chat history
   - Scenario completions
   - Assessment results
   - Badges and points

---

## 📊 Demo Scenarios

### Demonstration Flow (5-7 minutes)

1. **Homepage** (30 sec)
   - Show features overview
   - Click "Start Learning"

2. **AI Chat** (2 min)
   - Ask: "What is phishing and how can I spot it?"
   - Show AI response
   - Ask follow-up question

3. **Phishing Analyzer** (2 min)
   - Load sample phishing email
   - Click "Analyze"
   - Show risk level and red flags

4. **Interactive Scenario** (2 min)
   - Select a Beginner scenario
   - Read scenario
   - Answer question
   - Show feedback and points

5. **Dashboard** (1 min)
   - Show points, badges, progress
   - Quick tour of gamification

---

## 🏆 Gamification System

### Points
- Chat with AI: 5 points per conversation
- Scenario completion: 10-20 points (based on difficulty)
- Assessment completion: 50 points
- Phishing analysis: 5 points each

### Levels
- **Beginner**: 0-99 points
- **Intermediate**: 100-299 points
- **Advanced**: 300-599 points
- **Expert**: 600-999 points
- **Master**: 1000+ points

### Badges (12 total)
- First Steps, Conversationalist, Quiz Master
- Perfect Score, Phishing Detective, Scenario Starter
- Scenario Expert, Password Pro, 7-Day Streak
- Security Champion, Cyber Guardian, Knowledge Sharer

---

## 🎨 Design System

### Color Palette
- **Primary (Cyan)**: `#00D9FF` - Main accent, links, highlights
- **Secondary (Purple)**: `#8B5CF6` - Secondary actions, badges
- **Success (Green)**: `#10B981` - Correct answers, success states
- **Warning (Yellow)**: `#F59E0B` - Cautions, medium risk
- **Danger (Red)**: `#EF4444` - Errors, high risk
- **Background**: `#0F172A` - Dark theme base

### Typography
- **Headings**: Bold, large sizes (24-64px)
- **Body**: 16px base, 1.6 line-height
- **Code**: Mono font for technical content

### Components
- Glassmorphism cards with backdrop blur
- Gradient buttons with hover effects
- Smooth transitions (300ms)
- Responsive breakpoints (640px, 768px, 1024px)

---

## 📁 Project Structure

```
cyberguard-ai/
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   └── layout/      # Navbar, Footer
│   ├── pages/           # Page components
│   ├── contexts/        # AuthContext
│   ├── lib/             # Utilities, Supabase client
│   ├── types/           # TypeScript definitions
│   ├── data/            # Assessment questions
│   ├── App.tsx          # Main app with routing
│   └── main.tsx         # Entry point
├── supabase/
│   └── functions/       # Edge Functions (chat, analyze-phishing)
├── index.html           # HTML entry point
├── tailwind.config.ts   # Tailwind configuration
└── README.md            # This file
```

---

## 🔧 Edge Functions

### `/chat`
- Handles AI chat conversations
- Uses OnSpace AI (Google Gemini 3 Flash)
- Maintains conversation context
- Fallback responses for offline mode

### `/analyze-phishing`
- Analyzes emails for phishing indicators
- Returns risk level and red flags
- AI-powered with structured JSON response
- Saves analysis history

---

## 📝 Academic Notes

### Project Highlights for Viva/Defense

1. **Modern Architecture**
   - Serverless backend (Edge Functions)
   - React SPA with TypeScript
   - Real-time AI integration

2. **Practical Application**
   - Addresses real-world problem (cyber awareness)
   - Educational and accessible
   - Gamified learning increases engagement

3. **Technical Complexity**
   - AI integration (OnSpace AI)
   - Database design with RLS
   - Authentication flow (OTP + Password)
   - Responsive UI with dark theme

4. **Scalability**
   - Serverless architecture
   - PostgreSQL database
   - Edge Function deployment

### Code Quality
- Extensive inline comments
- TypeScript for type safety
- Modular component structure
- Error handling throughout
- Responsive design

---

## 🚢 Deployment

### OnSpace Platform
1. Push code to GitHub
2. Connect repository in OnSpace
3. Auto-deploy on push
4. Published at: `https://your-app.onspace.app`

### Custom Domain (Optional)
- Configure in OnSpace dashboard
- Add DNS records
- SSL auto-configured

---

## 🤝 Contributing

This is an academic project for BCA final year. For suggestions or issues:
- Open GitHub issue
- Contact: [your-email]

---

## 📄 License

Educational project - MIT License

---

## 👨‍💻 Author

**[Your Name]**
- BCA Final Year Student
- Academic Year: 2025-26
- Institution: [Your College Name]

---

## 🙏 Acknowledgments

- OnSpace AI for AI capabilities
- Supabase for backend infrastructure
- shadcn/ui for UI components
- Tailwind CSS for styling
- React and TypeScript communities

---

## 📧 Support

For questions or issues:
- Email: [your-email]
- GitHub Issues: [repository-url]/issues

---

**Built with 💙 for cybersecurity awareness education**
