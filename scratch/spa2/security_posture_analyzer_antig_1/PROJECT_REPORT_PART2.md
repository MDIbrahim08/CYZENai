# Adaptive Security Posture Analyzer — Complete Project Report

## PART 2: Frontend, Data Flow, Testing & Evolution History

---

# 5. FRONTEND ARCHITECTURE (Brief Overview)

## 5.1 How the Frontend Is Set Up

The frontend is a **React 19** single-page application built with **Vite** as the bundler. It runs on its own dev server (port 5173) and proxies all `/api` requests to the backend (port 5000) via the Vite proxy config in `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
}
```

This means the frontend never talks to `localhost:5000` directly — it sends requests to itself, and Vite forwards them.

## 5.2 State Management (`useStore.js`)

We use **Zustand** (a minimal state management library) instead of Redux. The store holds:
- `user` — the logged-in user object
- `token` — JWT token (also persisted in localStorage)
- `isAuthenticated` — boolean derived from token presence
- `activeSession` — the current assessment session data
- `currentReport` — the full results report from the API

Key methods:
- `setToken(token)` — saves to localStorage AND updates Zustand state
- `logout()` — clears everything (localStorage + state)

## 5.3 API Client (`api.js`)

An Axios instance configured with:
- `baseURL: '/api'` — relative URL (goes through Vite proxy)
- **Request interceptor** — automatically attaches the JWT token from localStorage to every request as `Authorization: Bearer <token>`

## 5.4 Application Routing (`App.jsx`)

The app has 6 routes:

| Route | Component | Protected? | Purpose |
|---|---|---|---|
| `/` | `LandingPage` | No | Public marketing page |
| `/auth` | `AuthPage` | No (redirects if logged in) | Login/Register forms |
| `/setup` | `ProfileSetup` | Yes | Select role, asset, maturity |
| `/assessment/:sessionId` | `Questionnaire` | Yes | Answer security questions |
| `/results/:sessionId` | `ResultsDashboard` | Yes | View full security report |
| `/dashboard` | `ProfileSetup` | Yes | Alias for /setup |

On app load, `App.jsx` checks if a token exists in localStorage, calls `/api/auth/me` to verify it, and sets the user in the store.

## 5.5 UI Components

### `LandingPage.jsx` (5,615 bytes)
The public-facing marketing page with animated hero section, feature highlights, and a call-to-action button. Uses Framer Motion for entrance animations.

### `AuthPage.jsx` (6,601 bytes)
A tabbed Login/Register form with:
- Input validation (name, email, password with 6+ char requirement)
- API error handling with toast notifications
- Auto-redirects to `/setup` on successful auth

### `ProfileSetup.jsx` (10,893 bytes)
The assessment configuration screen where users select:
- **Role** (developer, IT admin, student, etc.)
- **Target Asset** (web app, APIs, cloud infra, etc.)
- **Tech Maturity** (beginner, intermediate, advanced)
- **Compliance Flags** (handles payments, health data, user data)

On submit, calls `POST /api/assessments/start` and navigates to the questionnaire.

### `Questionnaire.jsx` (8,066 bytes)
An interactive question-answering interface:
- Shows one question at a time with a progress bar
- Highlights the selected option
- Tracks answers in local state
- On completion, calls `POST /api/assessments/:sessionId/submit`
- Navigates to the results dashboard

### `ResultsDashboard.jsx` (23,333 bytes)
The largest and most complex component. A multi-tab dashboard with:

**Summary Tab**: Score gauge, risk level badge, maturity level, critical findings alert box, radar chart showing per-category scores

**Findings Tab**: Color-coded list of all findings (red = critical, orange = high, yellow = medium, green = good practice)

**Compliance Tab**: Framework cards showing compliance percentage, met/partial/missing requirement counts, and specific article violations

**Remediation Tab**: Tiered roadmap (Immediate → This Week → This Month) with expandable recommendation cards showing:
- Action title
- Why it matters
- Attack narrative (if applicable)
- Step-by-step remediation instructions
- Difficulty and time estimate

### `shared/Navbar.jsx`
Navigation bar with logo, auth status, and logout button.

### `shared/ScoreGauge.jsx`
An animated circular gauge that displays the overall score with color-coded rings (red → orange → yellow → green).

## 5.6 Styling (`index.css` + `App.css`)

The design system uses a dark theme with glassmorphism effects:
- Background: deep navy/charcoal gradients
- Cards: semi-transparent with `backdrop-filter: blur(10px)`
- Accent colors: cyan/teal for primary actions, red for critical alerts
- Typography: clean sans-serif
- Animations: smooth transitions via Framer Motion

---

# 6. COMPLETE DATA FLOW (Request Lifecycle)

Here is what happens when a user completes an entire assessment, from start to finish:

## Step 1: User Opens the App
```
Browser → GET / → LandingPage renders
```

## Step 2: User Registers
```
Browser → POST /api/auth/register { name, email, password }
Server → Validates → bcrypt.hash(password, 12) → INSERT into users → jwt.sign() → Returns token
Browser → Stores token in localStorage → Zustand updates isAuthenticated → Redirects to /setup
```

## Step 3: User Configures Assessment
```
Browser → User selects: role="developer", targetAsset="apis", techMaturity="advanced"
Browser → POST /api/assessments/start { role, targetAsset, techMaturity, ... }
Server → questionnaireGenerator.js filters questionBank → 15-20 questions selected
Server → INSERT into assessment_sessions → Returns sessionId + questions (without scores)
Browser → Navigates to /assessment/:sessionId
```

## Step 4: User Answers Questions
```
Browser → Shows questions one at a time → User selects answers
Browser → Stores answers in local state: [{ questionId: "Q_AUTH_001", selectedOptionIndex: 3 }, ...]
```

## Step 5: User Submits Assessment
```
Browser → POST /api/assessments/:sessionId/submit { answers: [...] }

Server (assessment.controller.js):
  1. Loads session from DB, verifies user owns it
  2. Regenerates questionnaire to get full question objects
  3. For each answer:
     - Looks up the question by ID
     - Gets the selected option
     - Creates enriched answer: { question_text, category, score_value, risk_factor, weight }
     - Saves to session_answers table
  4. Calls evaluateConfidence(answers) → { confidenceScore: 76, contradictions: [], ... }
  5. Calls calculateScore(enrichedAnswers, confidence) → { overallScore: 8.2, riskLevel: "low", ... }
  6. Sets profile.overallScore for elite hardening logic
  7. Calls checkCompliance(profile, riskFactors) → [{ name: "GDPR", complianceScore: 85, ... }]
  8. Calls generateRecommendations(riskFactors, profile, confidence) → { recommendations, roadmap }
  9. Saves findings to DB
  10. Updates session: overall_score, risk_level, status='completed'
  11. Calculates categoryBreakdown
  12. Returns complete JSON response
```

## Step 6: Dashboard Renders
```
Browser → Receives JSON → Stores in Zustand (currentReport)
Browser → Navigates to /results/:sessionId
ResultsDashboard → Renders Summary, Findings, Compliance, and Remediation tabs
```

---

# 7. HOW TO RUN THE APPLICATION

## 7.1 Prerequisites
- Node.js v18 or later
- Python 3 (only for running test cases)
- npm (comes with Node.js)

## 7.2 Starting the Backend
```bash
cd server
npm install          # Install all dependencies
node server.js       # Start the server on port 5000
```

You should see:
```
✅  SQLite database connected at ./database.db
🛡️  Adaptive Security Posture Analyzer API
✅  Server running at http://localhost:5000
🌍  Environment: development
```

## 7.3 Starting the Frontend
```bash
cd client
npm install          # Install all dependencies
npm run dev          # Start the Vite dev server on port 5173
```

## 7.4 Running the Automated Tests
```bash
cd tests
pip install requests   # Install the HTTP client for Python
python generate_advanced_test_cases.py
```

This will:
1. Register/login 15 test users
2. Start 15 assessments with different profiles
3. Answer all questions using predefined strategies (best/worst/mixed/contradict/catastrophic)
4. Submit assessments and collect results
5. Generate 15 markdown test reports (`test_case_1.md` through `test_case_15.md`)

---

# 8. THE QUESTION BANK — DOMAIN BREAKDOWN

The question bank contains 32 questions across these security domains:

| Domain | Question IDs | Questions | Focus |
|---|---|---|---|
| Authentication | Q_AUTH_001 to Q_AUTH_004 | 4 | MFA, lockout, sessions, MFA verification |
| Data Protection | Q_DATA_001 to Q_DATA_003 | 3 | Password storage, encryption at rest, privacy policy |
| Network Security | Q_NET_001 to Q_NET_003 | 3 | HTTPS, WAF, public internet exposure |
| API Security | Q_API_001 to Q_API_002 | 2 | Rate limiting, input validation |
| Cloud Security | Q_CLOUD_001 to Q_CLOUD_003 | 3 | Secrets management, IAM, logging |
| Supply Chain | Q_DEP_001 to Q_DEP_002 | 2 | Dependency updates, library vetting |
| Governance | Q_GOV_001 to Q_GOV_005 | 5 | IR plan, training, vendor assessment, audits, audit recency |
| Business Continuity | Q_BCP_001 to Q_BCP_002 | 2 | Backups, disaster recovery |
| Access Control | Q_ACC_001 to Q_ACC_002 | 2 | Privilege management, offboarding |
| Endpoint Security | Q_DEV_001 to Q_DEV_003 | 3 | Device protection, updates, passwords |
| Remote Work | Q_REM_001 | 1 | VPN usage |
| Compliance | Q_COMP_001 | 1 | Regulatory awareness |

### Weight Distribution
- **Weight 2.0 (Highest Impact)**: Password storage (Q_DATA_001), Secrets management (Q_CLOUD_001)
- **Weight 1.5**: Authentication method, Encryption at rest, HTTPS, Input validation, Internet exposure, IR plan, Backups
- **Weight 1.3–1.4**: API protection, IAM, Privacy policy, Audits, Access control, Offboarding, BCP
- **Weight 1.0–1.2**: Session management, WAF, Dependencies, Library vetting, Training, Vendor assessment, Device security, Remote work, Compliance

---

# 9. RISK FACTORS — THE COMPLETE DICTIONARY

Every answer option can produce a `riskFactor` string. Here is the complete list and what each one triggers:

| Risk Factor | Source Question | Scoring Impact | Compliance Impact | Remediation |
|---|---|---|---|---|
| `no_auth` | Q_AUTH_001 | Multiplier capped at 0.4 | HIPAA 0%, PCI-DSS Req.8 fail | Implement authentication |
| `missing_mfa` | Q_AUTH_001 | Compound with no_brute_force (0.8×) | PCI-DSS Req.8 fail | Enforce MFA |
| `optional_mfa` | Q_AUTH_001 | Minor | PCI-DSS Req.8 partial | Mandate MFA |
| `no_brute_force_protection` | Q_AUTH_002 | Compound with missing_mfa (0.8×) | — | Add lockout |
| `insecure_sessions` | Q_AUTH_003 | Compound with no_https | — | Secure cookies |
| `weak_sessions` | Q_AUTH_003 | Compound with no_https | — | Add token rotation |
| `unverified_mfa` | Q_AUTH_004 | — | — | Verify MFA enforcement |
| `plaintext_passwords` | Q_DATA_001 | Multiplier capped at 0.5 | GDPR/PCI/HIPAA 0% | Implement bcrypt |
| `weak_hashing` | Q_DATA_001 | Compound with missing_mfa | GDPR 0% | Upgrade to bcrypt |
| `no_encryption_at_rest` | Q_DATA_002 | Multiplier capped at 0.6 | PCI/HIPAA 0% | Add AES-256 |
| `no_privacy_policy` | Q_DATA_003 | Compound with no_encryption (0.9×) | GDPR requirements fail | Add privacy policy |
| `no_https` | Q_NET_001 | Multiplier capped at 0.7 | GDPR/PCI/HIPAA 0% | Enforce HTTPS |
| `mixed_content` | Q_NET_001 | — | GDPR/PCI/HIPAA 0% | Fix mixed content |
| `high_exposure` | Q_NET_003 | Weight ×1.3, Compound with hardcoded (0.6×) | — | Restrict access |
| `hardcoded_secrets` | Q_CLOUD_001 | Multiplier capped at 0.6 | PCI-DSS 0% | Use secrets manager |
| `exposed_env_secrets` | Q_CLOUD_001 | — | PCI-DSS 0% | Remove from git |
| `over_privileged_access` | Q_CLOUD_002/Q_ACC_001 | — | PCI Req.7, HIPAA fail | Enforce RBAC |
| `no_monitoring` | Q_CLOUD_003 | — | PCI Req.10, HIPAA fail | Add logging |
| `no_backups` | Q_BCP_001 | Compound with no_ir_plan (0.7×) | HIPAA Req. fail | Add backups |
| `no_ir_plan` | Q_GOV_001 | Compound with no_backups (0.7×) | GDPR Art.33, PCI Req.12 | Create IR plan |
| `stale_security_validation` | Q_GOV_005 | Governance weight ×0.5 | — | Schedule audit |
| `outdated_dependencies` | Q_DEP_001 | — | PCI Req.6 fail | Run npm audit |

---

# 10. TESTING STRATEGY & TEST CASES

## 10.1 Test Suite Architecture

The test suite is a Python script (`generate_advanced_test_cases.py`) that:
1. Defines 15 test scenarios with different profiles and answer strategies
2. For each scenario: registers a user → starts assessment → answers questions → submits → generates a markdown report
3. Each markdown report follows a strict 10-section format for external AI review

## 10.2 The 15 Test Scenarios

| # | Scenario | Role | Asset | Strategy | Expected Score | Purpose |
|---|---|---|---|---|---|---|
| 1 | SaaS Developer - Cloud API | developer | apis | best | 8.5-10.0 | Strong API security |
| 2 | E-commerce Owner | business_owner | web_app | worst | 4.0-6.0 | PCI-DSS + GDPR failures |
| 3 | IT Admin - Corporate | it_admin | cloud_infra | best | 8.5-10.0 | NIST CSF checks |
| 4 | Lead Developer - SaaS | developer | apis | mixed | 6.0-8.0 | Partial OWASP coverage |
| 5 | Healthcare Compliance | business_owner | mobile_app | worst | 3.0-5.0 | HIPAA violations |
| 6 | Freelancer - Client APIs | freelancer | apis | best | 7.0-8.5 | Lightweight API hygiene |
| 7 | Student - Educational | student | web_app | mixed | 5.0-7.0 | Beginner persona filtering |
| 8 | Startup - Data Aggregator | startup_founder | cloud_infra | mixed | 6.5-8.5 | GDPR compliance |
| 9 | Small Business - Internal | business_owner | business_ops | worst | 4.0-6.0 | Operational security |
| 10 | Developer - Personal Devices | developer | personal_devices | best | 8.0-10.0 | Endpoint security |
| 11 | Dishonest Reporting | startup_founder | web_app | contradict | 2.0-4.0 | Contradiction engine |
| 12 | Access Contradiction | business_owner | cloud_infra | contradict_access | 3.0-5.0 | MFA vs root access |
| 13 | Audit Logic Gap | it_admin | web_app | contradict_audit | 2.0-4.0 | Pentesting vs no backups |
| 14 | Elite DevSecOps | developer | cloud_infra | best | 9.5-10.0 | Level 5 hardening |
| 15 | Public SaaS Compound | startup_founder | apis | catastrophic_compound | 0.5-2.0 | Compound failure validation |

## 10.3 Answer Strategies

| Strategy | How It Works |
|---|---|
| `best` | Always selects the last (strongest) option. New questions: Low exposure, Recent audit, Verified MFA |
| `worst` | Always selects the first (weakest) option. New questions: High exposure, Stale audit, Unverified MFA |
| `mixed` | Selects the middle option (index 1) |
| `contradict` | Claims compliance + regular audits BUT has plaintext passwords + hardcoded secrets |
| `contradict_access` | Claims enforced MFA BUT everyone has root access |
| `contradict_audit` | Claims regular pentesting + tested BCP BUT has no backups |
| `catastrophic_compound` | High exposure + Hardcoded secrets + Password-only auth + No lockout |

## 10.4 Pass/Fail Criteria
- `worst` strategy: score must be ≤ 4.0 (if higher → FAIL)
- `best` strategy: score must be ≥ 8.0 (if lower → FAIL)
- All other strategies: PASS if the engine runs without errors

---

*Continued in PART 3: Evolution History and What Changed Over Time*
