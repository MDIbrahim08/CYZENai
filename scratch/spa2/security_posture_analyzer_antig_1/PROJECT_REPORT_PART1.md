# Adaptive Security Posture Analyzer — Complete Project Report

## PART 1: Introduction, Architecture & Project Setup

---

# 1. PROJECT OVERVIEW

## 1.1 What Is This Application?

The **Adaptive Security Posture Analyzer** is a full-stack web application that acts as an intelligent cybersecurity advisory engine. It evaluates the security posture of any digital asset — whether it is a web application, a mobile app, a set of APIs, cloud infrastructure, personal devices, or business operations — and produces a detailed, personalized security report.

Unlike simple checklist tools, this system uses **weighted scoring**, **compound risk modeling**, **temporal decay**, **exposure-aware analysis**, **contradiction detection**, and **compliance mapping** to produce results that mirror what a senior security consultant would deliver in a real-world audit.

## 1.2 Who Is This For?

The application is designed for multiple personas:

| Persona | Description | Example Use Case |
|---|---|---|
| `developer` | Software engineers building apps | Assess API security of a SaaS product |
| `it_admin` | IT administrators managing infrastructure | Audit cloud infrastructure security |
| `student` | CS students learning security basics | Evaluate a class project for common flaws |
| `startup_founder` | Founders building MVPs | Check if their product is GDPR-ready |
| `business_owner` | Non-technical business operators | Assess if their e-commerce store is PCI-DSS compliant |
| `freelancer` | Independent contractors | Verify basic API hygiene for client work |
| `general_user` | Non-technical individuals | Check personal device security |

## 1.3 What Does It Produce?

For every assessment, the system outputs:

1. **Overall Security Score** (0–10 scale) with non-linear risk multipliers
2. **Risk Level** (Critical / High / Medium / Low) with provisional labeling when confidence is low
3. **Security Maturity Level** (Level 1: Reactive → Level 5: Resilient)
4. **Assessment Confidence Score** (0–100%) with domain coverage tracking
5. **Contradiction Warnings** — flags logically inconsistent answers
6. **Compliance Mapping** — auto-detects applicable frameworks (GDPR, PCI-DSS, HIPAA) and scores compliance
7. **Priority Findings** — categorized as Critical, High, Medium, or Good Practice
8. **Category Breakdown** — per-domain scores (Authentication, Network, Data Protection, etc.)
9. **Remediation Roadmap** — prioritized into Immediate / This Week / This Month tiers
10. **Attack Narratives** — real-world exploit chain stories explaining how vulnerabilities are exploited
11. **Elite Hardening Advice** — post-maturity recommendations (SBOM, ZTNA, Canary Tokens) for top-tier profiles

---

# 2. TECHNOLOGY STACK

## 2.1 Backend (Server)

| Technology | Purpose | Version |
|---|---|---|
| **Node.js** | JavaScript runtime for the server | v18+ |
| **Express.js** | Web framework for REST API | ^4.18.3 |
| **SQLite3** | Lightweight embedded database (no external DB server needed) | ^5.1.7 |
| **bcryptjs** | Password hashing (12 salt rounds) | ^2.4.3 |
| **jsonwebtoken** | JWT-based authentication tokens | ^9.0.2 |
| **helmet** | HTTP security headers (XSS, MIME sniffing, etc.) | ^7.1.0 |
| **cors** | Cross-Origin Resource Sharing | ^2.8.5 |
| **express-rate-limit** | API rate limiting (100 req/15 min) | ^7.2.0 |
| **morgan** | HTTP request logging | ^1.10.0 |
| **uuid** | Unique ID generation for sessions/users | ^9.0.1 |
| **dotenv** | Environment variable management | ^16.4.5 |
| **nodemon** | Auto-restart during development | ^3.1.0 |

## 2.2 Frontend (Client)

| Technology | Purpose | Version |
|---|---|---|
| **React** | UI component library | ^19.2.5 |
| **Vite** | Build tool and dev server | ^8.0.10 |
| **React Router DOM** | Client-side routing | ^7.15.0 |
| **Zustand** | Global state management | ^5.0.13 |
| **Axios** | HTTP client for API calls | ^1.16.0 |
| **Framer Motion** | Animations and transitions | ^12.38.0 |
| **Lucide React** | Icon library | ^1.14.0 |
| **Recharts** | Data visualization (Radar charts) | ^3.8.1 |
| **React Hot Toast** | Notification toasts | ^2.6.0 |

## 2.3 Testing

| Technology | Purpose |
|---|---|
| **Python 3 + requests** | Automated API test suite (15 scenarios) |
| **Markdown** | Test case reports for external AI review |

---

# 3. PROJECT STRUCTURE (Every File Explained)

```
security_posture_analyzer_antig_1/
│
├── server/                          # ← BACKEND (Node.js + Express)
│   ├── .env                         # Environment variables (PORT, JWT secret, DB path)
│   ├── package.json                 # Server dependencies and scripts
│   ├── server.js                    # ← ENTRY POINT: Starts the Express server
│   ├── database.db                  # SQLite database file (auto-created)
│   └── src/
│       ├── app.js                   # Express app configuration (middleware, routes)
│       ├── config/
│       │   └── db.js                # Database connection + schema + helper functions
│       ├── middleware/
│       │   ├── auth.middleware.js    # JWT token verification middleware
│       │   └── errorHandler.js      # Global error handling middleware
│       ├── routes/
│       │   ├── auth.routes.js       # Authentication routes (/register, /login, /me)
│       │   └── assessment.routes.js # Assessment routes (/start, /submit, /list, /get)
│       ├── controllers/
│       │   ├── auth.controller.js   # Registration, login, and "get me" logic
│       │   └── assessment.controller.js # Start assessment, submit answers, orchestrate engines
│       ├── engines/                 # ← THE BRAIN: All security intelligence lives here
│       │   ├── questionnaireGenerator.js  # Filters questions by role/asset/maturity
│       │   ├── scoringEngine.js           # Weighted scoring + compound risk + temporal decay
│       │   ├── confidenceEngine.js        # Trust modeling + contradiction detection
│       │   ├── complianceEngine.js        # GDPR / PCI-DSS / HIPAA mapping
│       │   └── recommendationEngine.js    # Remediation roadmap + attack narratives
│       └── data/                    # ← THE KNOWLEDGE BASE: All security data lives here
│           ├── questionBank.js      # 32 questions across 10+ security domains
│           ├── complianceRules.js   # Regulatory framework rules (GDPR, PCI-DSS, HIPAA)
│           └── remediationBank.js   # Step-by-step fix instructions for each risk factor
│
├── client/                          # ← FRONTEND (React + Vite)
│   ├── package.json                 # Client dependencies
│   ├── vite.config.js               # Vite config with API proxy to backend
│   ├── index.html                   # HTML entry point
│   └── src/
│       ├── main.jsx                 # React app bootstrap with BrowserRouter
│       ├── App.jsx                  # Root component with route definitions
│       ├── App.css                  # App-level styles
│       ├── index.css                # Global design system (dark theme, glassmorphism)
│       ├── api/
│       │   └── api.js               # Axios instance with JWT interceptor
│       ├── store/
│       │   └── useStore.js          # Zustand global state (auth, session, report)
│       └── components/
│           ├── LandingPage.jsx      # Public landing page
│           ├── AuthPage.jsx         # Login/Register forms
│           ├── ProfileSetup.jsx     # Role/asset/maturity selection
│           ├── Questionnaire.jsx    # Interactive question answering UI
│           ├── ResultsDashboard.jsx # Full results dashboard with tabs
│           └── shared/
│               ├── Navbar.jsx       # Navigation bar
│               └── ScoreGauge.jsx   # Animated circular score display
│
├── tests/                           # ← AUTOMATED TEST SUITE
│   ├── generate_advanced_test_cases.py  # 15-scenario automated audit
│   ├── generate_tests.py           # Earlier 10-scenario test suite
│   ├── run_tests.py                # Basic test runner
│   └── test_case_1.md ... test_case_15.md  # Generated test reports
│
├── test_review_chatgpt.txt          # External AI review feedback
└── engine_overhaul_validation_report.md  # Engine upgrade validation
```

---

# 4. HOW THE APPLICATION WAS BUILT (Step-by-Step History)

## Phase 1: Foundation (Day 1)

### Step 1: Project Initialization
We started by creating two separate projects:
- **Server**: `npm init` inside the `server/` directory, then installed Express, SQLite3, bcryptjs, jsonwebtoken, helmet, cors, morgan, uuid, dotenv, and nodemon.
- **Client**: `npx create-vite@latest ./` inside the `client/` directory with the React template, then installed axios, zustand, react-router-dom, framer-motion, lucide-react, recharts, and react-hot-toast.

### Step 2: Database Schema Design (`server/src/config/db.js`)
We chose **SQLite** because it requires zero configuration — no external database server, no connection strings to manage. The database file (`database.db`) is created automatically when the server starts.

We designed 4 tables:
1. **`users`** — stores registered users (id, name, email, hashed password)
2. **`assessment_sessions`** — stores each assessment attempt (role, target asset, maturity, score, status)
3. **`session_answers`** — stores every answer the user gave (question ID, text, score, risk factor)
4. **`findings`** — stores the security findings generated from each assessment

### Step 3: Authentication System (`auth.controller.js` + `auth.middleware.js`)
We implemented a complete JWT-based auth system:
- **Register**: Validates input → checks for duplicate email → hashes password with bcrypt (12 rounds) → generates UUID → inserts into DB → signs a JWT token → returns token + user
- **Login**: Validates input → finds user by email → compares password hash → signs JWT → returns token
- **Auth Middleware**: Extracts Bearer token from header → verifies with JWT secret → queries DB to confirm user exists → attaches user to `req.user`

### Step 4: Express App Configuration (`app.js`)
We configured the Express app with production-grade middleware:
- `helmet()` — sets security HTTP headers (X-Content-Type-Options, X-Frame-Options, etc.)
- `cors({ origin: '*' })` — allows frontend to call the API
- `express.json()` — parses JSON request bodies
- `morgan('dev')` — logs every HTTP request to the console
- `express-rate-limit` — limits each IP to 100 requests per 15 minutes
- Routes mounted at `/api/auth` and `/api/assessments`
- Health check endpoint at `/api/health`

### Step 5: Server Entry Point (`server.js`)
This is the file you run with `node server.js`. It:
1. Loads environment variables from `.env`
2. Calls `initDB()` to connect to SQLite and create tables
3. Starts the Express server on the configured PORT (default 5000)

---

## Phase 2: The Security Intelligence Engine (Day 1–2)

This is the heart of the entire application. Five engines work together in a pipeline:

```
User Profile → Questionnaire Generator → User Answers → Scoring Engine
                                                             ↓
                                              Confidence Engine (parallel)
                                                             ↓
                                              Compliance Engine (parallel)
                                                             ↓
                                           Recommendation Engine (final)
                                                             ↓
                                              Complete Security Report
```

### Step 6: Question Bank (`questionBank.js`)
We created 32 security questions across 10+ domains. Each question has:
- `id` — unique identifier (e.g., `Q_AUTH_001`)
- `text` — the question shown to the user
- `category` — security domain (Authentication, Data Protection, Network Security, etc.)
- `applicableRoles` — which user personas see this question (empty array = everyone)
- `applicableTargets` — which asset types trigger this question
- `difficulty` — beginner, intermediate, or advanced
- `weight` — importance multiplier (1.0 to 2.0). Higher weight = more impact on score
- `options` — array of answer choices, each with a `scoreValue` (0–10) and optional `riskFactor`

The `riskFactor` is the key innovation. It is a string tag like `"plaintext_passwords"` or `"no_https"` that gets passed downstream to every other engine. This single tag drives scoring multipliers, compliance checks, and remediation lookups.

### Step 7: Questionnaire Generator (`questionnaireGenerator.js`)
This engine takes the user's profile and filters the question bank:
1. **Role Filter**: Only shows questions applicable to the user's role
2. **Target Filter**: Only shows questions relevant to the asset type
3. **Maturity Filter**: Hides "advanced" questions from "beginner" users
4. **Weight Sorting**: Sorts by weight descending to prioritize high-impact questions
5. **Selection**: Takes the top 10 by weight, then randomly shuffles the rest, and caps at 20 questions total

### Step 8: Scoring Engine (`scoringEngine.js`)
This is the most mathematically sophisticated engine. It processes answers in multiple phases:

**Phase 1: Weighted Average**
```
rawScore = (sum of scoreValue × weight) / (sum of maxScore × weight) × 10
```
But before calculating, it applies two dynamic adjustments:
- **Exposure Context**: If `high_exposure` is in the risk factors and the current answer scores below 5, the weight is multiplied by 1.3 (vulnerabilities matter 30% more on public-facing assets)
- **Temporal Decay**: If `stale_security_validation` is detected and the current answer is in the Governance category, the weight is halved (old audits provide less trust)

**Phase 2: Compound Risk Multipliers**
After the raw score is calculated, the engine checks for dangerous combinations:
- `missing_mfa` + `no_brute_force_protection` → 0.8× penalty (Authentication Collapse)
- `no_backups` + `no_ir_plan` → 0.7× penalty (Recovery Failure)
- `high_exposure` + `hardcoded_secrets` → 0.6× penalty (Exposed Infrastructure)
- `no_privacy_policy` + `no_encryption_at_rest` → 0.9× penalty (Compliance Paradox)

**Phase 3: Foundational Multipliers**
Certain individual risk factors are so severe that they cap the multiplier:
- `plaintext_passwords` → multiplier capped at 0.5
- `no_auth` → multiplier capped at 0.4
- `hardcoded_secrets` → multiplier capped at 0.6

**Phase 4: Score Capping and Floors**
- Maximum score is capped at 9.5 (no system is 100% secure)
- If confidence is below 60%, score is capped at 8.0
- Minimum score floor is 1.5 (unless catastrophic: `no_auth` or `plaintext_passwords` + `exposed_env_secrets`)

**Phase 5: Risk Level and Maturity**
- Score ≥ 7.5 → Low Risk
- Score ≥ 5.0 → Medium Risk
- Score ≥ 2.5 → High Risk
- Score < 2.5 → Critical Risk
- If confidence < 60%, the label becomes `provisional_low`, `provisional_high`, etc.
- Maturity levels range from Level 1: Reactive to Level 5: Resilient, also provisional when confidence is low

### Step 9: Confidence Engine (`confidenceEngine.js`)
This engine evaluates how much we should trust the assessment results:

1. **Domain Coverage**: Checks how many security domains were covered. Expects at least 5 for high confidence.
2. **Critical Domain Penalty**: Missing Authentication, Access Control, Data Protection, or Secrets Management drops confidence by 12% per domain.
3. **Contradiction Detection** (5 built-in rules):
   - Claims compliance but has plaintext passwords → -25%
   - Claims tested DR plan but has no backups → -25%
   - Claims regular pentesting but has hardcoded secrets → -20%
   - Claims enforced MFA but everyone has root access → -15%
   - Claims RBAC but app has no authentication → -20%

Output: confidence score (0–100), confidence level (LOW/MEDIUM/HIGH), list of contradictions, and human-readable confidence factors.

### Step 10: Compliance Engine (`complianceEngine.js`)
This engine automatically detects which regulatory frameworks apply based on the user's profile:

- **GDPR** → applies if `collects_user_data` is true, or role is `business_owner` or `startup_founder`
- **PCI-DSS** → applies if `handles_payments` is true
- **HIPAA** → applies if `handles_health_data` is true

For each applicable framework, it checks every requirement against the user's risk factors. Each requirement can be `met`, `partial`, or `missing`. The compliance score is calculated as:
```
complianceScore = ((metCount + partialCount × 0.5) / totalRequirements) × 100
```

**Hard Stops**: Certain risk factors instantly set compliance to 0%:
- GDPR → 0% if plaintext passwords, no HTTPS, weak hashing, or exposed secrets
- PCI-DSS → 0% if plaintext passwords, no encryption at rest, hardcoded secrets
- HIPAA → 0% if no encryption, no auth, no HTTPS, or plaintext passwords

### Step 11: Recommendation Engine (`recommendationEngine.js`)
This is the advisory layer that transforms risk factors into actionable advice:

1. **Confidence Insight** — if confidence is low or contradictions exist, the first recommendation explains why
2. **Exposure Warning** — if `high_exposure` is detected, generates an "URGENT: Public Internet Exposure" alert with an attack narrative
3. **Threat Chaining** — detects compound vulnerabilities and generates attack stories:
   - Weak hashing + missing MFA → Account Takeover narrative
   - No backups + no IR plan → Ransomware Recovery narrative
   - No HTTPS + insecure sessions → Session Hijacking narrative
   - Exposed secrets + weak IAM + no monitoring → Cloud Compromise narrative
4. **Individual Remediation** — looks up each risk factor in `remediationBank.js` and generates step-by-step fixes
5. **Trust Modeling** — if confidence is low, relabels "Good Practice" as "Claimed Control (Unverified)"
6. **Domain Specialization** — adds mobile-specific steps for mobile apps, API-specific steps for APIs
7. **Persona Filtering** — for students/beginners, removes enterprise jargon (SOC2, HSM, annual pentests) and simplifies language
8. **Elite Hardening** — for scores above 8.5 on high-scale targets, recommends SBOM, Canary Tokens, ZTNA, CSPM
9. **Urgency Sorting** — sorts all recommendations by urgency (immediate → this_week → this_month)
10. **Roadmap Grouping** — groups into three tiers for the frontend to display

### Step 12: Remediation Bank (`remediationBank.js`)
A 448-line knowledge base mapping every risk factor to:
- `action` — what to do (e.g., "Implement Secure Password Hashing Immediately")
- `whyItMatters` — plain-English explanation of the real-world risk
- `steps` — exact terminal commands and code changes needed
- `difficulty` — Low / Medium / High
- `timeEstimate` — how long it takes (e.g., "4–8 hours")
- `urgency` — immediate / this_week / this_month
- `links` — reference URLs (OWASP, npm packages, etc.)

### Step 13: Compliance Rules (`complianceRules.js`)
A 204-line data file defining three regulatory frameworks with:
- Framework metadata (name, jurisdiction, max penalty)
- `applicableWhen()` — function that checks if this framework applies
- `requirements[]` — array of specific articles/requirements, each with:
  - `checkedBy()` — function that checks if the requirement is met
  - `partiallyMetBy()` — function that checks for partial compliance

---

## Phase 3: The Assessment Controller (The Orchestrator)

### Step 14: Assessment Controller (`assessment.controller.js`)
This is the 279-line file that ties everything together. It has 4 endpoints:

**`POST /api/assessments/start`**
1. Receives user profile (role, targetAsset, techMaturity, flags)
2. Calls `generateQuestionnaire(profile)` to get filtered questions
3. Creates a new session in the database
4. Returns the session ID and questions (with options, but without score values — the client never sees the scoring)

**`POST /api/assessments/:sessionId/submit`**
1. Receives the array of answers (questionId + selectedOptionIndex)
2. Looks up the session and verifies ownership
3. Regenerates the questionnaire to get the full question objects
4. Enriches each answer with the question text, category, score value, risk factor, and weight
5. Saves each answer to `session_answers` table
6. Calls `evaluateConfidence()` → gets confidence score + contradictions
7. Calls `calculateScore()` → gets overall score, risk level, maturity, findings, risk factors
8. Calls `checkCompliance()` → gets per-framework compliance reports
9. Calls `generateRecommendations()` → gets prioritized roadmap
10. Saves findings to `findings` table
11. Updates session with final score and status
12. Calculates per-category score breakdown
13. Returns the complete report as JSON

**`GET /api/assessments`** — lists all assessments for the current user (max 20, newest first)

**`GET /api/assessments/:sessionId`** — retrieves a previously completed assessment with full report regeneration

---

*Continued in PART 2: Frontend, Testing, and Evolution History*
