School of Engineering

Title: CYZEN: AI-Powered Cybersecurity Awareness & Incident Response Platform

Submitted by 
Mohammed Ibrahim (cu23bca0035a) 
Riyan (cu23bca0058a) 

(Submitted as part of the Project Course – Summative Assessment 2025–26)

Under the guidance of 
Ashith Kumar Naidu

Course: Bachelor of Computer Applications (B.C.A)
Project Report 
VI Semester 2025 – 2026 
School of Engineering 
 	 
***

## Certificate
This is to certify that the major project work carried out entitled “CYZEN: AI-Powered Cybersecurity Awareness & Incident Response Platform” submitted to the School of Engineering, Chanakya University in partial fulfilment of the requirements of the degree of Bachelor of Computer Applications in the academic year 2025-2026 is a record of the original work done by Mohammed Ibrahim (SRN: cu23bca0035a) and Riyan (SRN: cu23bca0058a) under my supervision and guidance and that this midterm project work has not formed the basis for the award of Bachelor of Computer Application Fellowship or similar title to any candidate of any University. 

Place: 
Date: 

Signature of Student: ___________________        Signature of the Guide: ___________________

***

## TABLE OF CONTENTS 
 
| Sl. No | Contents | Page no |
| :--- | :--- | :--- |
| 1. | Introduction | 1 |
| 2. | Literature Review | 2 |
| 3. | Objectives | 6 |
| 4. | Methodology | 7 |
| 5. | Results and Discussion | 14 |
| 6. | Challenges Faced | 16 |
| 7. | References | 18 |
| 8. | Acknowledgement | 19 |

***

<div style="page-break-after: always;"></div>

## 1. Introduction

With the rapid digitization of personal and professional workflows, cyber threats have evolved to become increasingly sophisticated, targeting the most vulnerable link in the security chain: the human user. Every year, billions of dollars are lost to phishing scams, compromised credentials, and poor incident response. Most users lack the technical literacy to distinguish between legitimate communication and targeted attacks, and when an incident occurs, they experience a "Panic Gap"—a critical window where poor decisions can exacerbate the damage.

To address this, we developed **CYZEN (CyberGuard AI)**, a comprehensive, AI-powered cybersecurity platform designed to educate, protect, and guide users. This project represents a fusion of modern web development, data science, machine learning, and cryptography. 

The platform is composed of a responsive, modern web application housing five specialized security tools:
1. **Phishing Detection Engine:** A Machine Learning classifier (LightGBM) trained on 164,972 emails to detect malicious intent with 98.31% accuracy.
2. **Password Security Analyzer:** A 5-layer deep analysis engine utilizing cryptographic hashing, live breach checks (Have I Been Pwned), and pattern recognition.
3. **Emergency Response Kit:** An AI-powered (LLaMA-3) digital crisis assistant that provides immediate, personalized, and safety-validated mitigation plans.
4. **Security Posture Analyzer:** An interactive assessment tool that evaluates an organization's or individual's cybersecurity readiness and provides a quantifiable risk score.
5. **CYZEN Intelligence Chat:** A specialized AI chatbot powered by Groq's Llama-3.3-70B model, acting as a real-time expert advisor for any cybersecurity-related queries.

This project demonstrates a full-stack engineering effort. The underlying Machine Learning models and analysis engines were developed by Riyan, while the overarching web application architecture, deployment, UI/UX design, and client-side integration were developed by Mohammed Ibrahim.

---

## 2. Literature Review

### 2.1 Phishing Detection
Traditional phishing detection relies heavily on blacklists (e.g., Google Safe Browsing) which are reactive and fail to catch zero-day attacks. Recent advancements leverage Machine Learning to analyze the content and heuristics of emails. Research demonstrates that combining Term Frequency-Inverse Document Frequency (TF-IDF) with engineered features (e.g., URL counts, urgency keywords) significantly improves detection rates. Gradient Boosting algorithms, specifically LightGBM, have proven to be highly memory-efficient and accurate for large, sparse text datasets compared to traditional SVMs or Random Forests.

### 2.2 Password Security & Cryptography
Basic password strength meters evaluate security based solely on length and character sets. However, information theory (Shannon Entropy) proves that predictable human patterns negate mathematical entropy. The industry standard has shifted towards hybrid evaluation. Dropbox's `zxcvbn` library uses real-world attack modeling (crack time estimation) rather than arbitrary scoring. Furthermore, the integration of k-anonymity—where only a 5-character prefix of a SHA-1 hash is sent to the Have I Been Pwned (HIBP) API—allows for live breach checking without compromising user privacy.

### 2.3 Incident Response & AI
Incident response for individuals and small businesses suffers from "Search Overload"—Googling during a crisis yields generic or conflicting advice. Large Language Models (LLMs) like LLaMA-3.3 present a novel solution by providing context-aware guidance. However, LLMs are prone to hallucination. Best practices dictate the use of "Constraint-Based Prompting" and hard-coded safety logic to prevent counter-productive advice (e.g., ensuring a user isolates a network rather than restarting a ransomware-infected machine).

---

## 3. Objectives

The primary objectives of the CYZEN project are:
1. **Develop an accessible Web Platform:** Create a centralized, highly intuitive, and responsive portal (built with React and Tailwind CSS) to host cybersecurity tools.
2. **Implement High-Accuracy Phishing Detection:** Build and integrate a machine learning model capable of classifying emails as safe or malicious with >98% accuracy.
3. **Provide Deep Password Analysis:** Go beyond basic strength meters by checking passwords against 12B+ breached records securely using k-anonymity, alongside crack-time estimation.
4. **Bridge the 'Panic Gap':** Deploy an AI-driven Emergency Response Kit to generate personalized, safe, and immediate action plans during cyber incidents.
5. **Ensure Client-Side Reliability:** Architect the application to perform complex computations (including API mocking and static hosting) to ensure 100% uptime and accessibility on zero-backend serverless platforms like Netlify.

---

## 4. Methodology

The project was divided into two major tracks: the Core Web Application (Ibrahim) and the Data Science/Security Engines (Riyan).

### 4.1 Core Web Application Architecture (Developed by Ibrahim)
The CYZEN platform is built as a modern Single Page Application (SPA).
* **Frontend Framework:** React 18 and Vite for high-performance rendering and rapid building.
* **Styling:** Tailwind CSS was utilized to create a "liquid-glass" design system, focusing on a dark-mode, premium tech aesthetic with high contrast and micro-animations to enhance user engagement.
* **State Management & Routing:** React Router DOM manages multi-page navigation seamlessly without page reloads.
* **Authentication:** Google OAuth 2.0 integration via Google Cloud Console and Supabase, providing secure, seamless one-tap authentication for users. This authentication flow was architected and implemented by Mohammed Ibrahim.
* **Deployment Architecture:** The application was migrated to a fully serverless, client-side architecture for deployment on Netlify. Backend dependencies were replaced with injected `XMLHttpRequest` and `fetch` mocks to ensure all tools function purely within the browser.

### 4.2 Phishing Detection Engine (Developed by Riyan)
* **Dataset:** Merged 7 separate datasets (Enron, CEAS, Ling, Nazario, etc.) resulting in a master dataset of 164,972 emails.
* **Feature Engineering:** Extracted 17 custom signals (URL count, IP-based URLs, exclamation counts, urgency phrases). 
* **Text Processing:** Used TF-IDF (Term Frequency-Inverse Document Frequency) restricted to the top 5,000 words to convert text to numerical matrices.
* **Model Training:** Utilized LightGBM. LightGBM was chosen over XGBoost due to leaf-wise tree growth, which prevented `bad_malloc` memory crashes during training.
* **Performance:** Achieved 98.31% accuracy and a 99.87% ROC-AUC score, prioritizing high recall (99%) to ensure minimal false negatives.

### 4.3 Password Security Analyzer (Developed by Riyan)
A 5-layer deep analysis engine built using Python (Flask) for logic handling:
1. **Breach Check (k-Anonymity):** Hashes the password using SHA-1. Sends only the first 5 characters to the HIBP API. Checks the returned suffixes locally, ensuring the password never leaves the device.
2. **Entropy Calculation:** Calculates Shannon Entropy based on character pool size.
3. **Pattern Detection:** Normalizes substitutions (e.g., "@" to "a") and checks for predictable structural patterns (keyboard walks, repeating characters).
4. **Crack Time Estimation:** Integrates `zxcvbn` to estimate offline fast-hash cracking times, simulating real-world GPU attacks against algorithms like MD5.
5. **Feedback Engine:** A deterministic, rule-based system synthesizes the data into human-readable, actionable security advice.

### 4.4 Emergency Response Kit
An AI-powered digital crisis assistant relying on the Groq API and LLaMA-3.3-70B model.
* **Data Collection:** Uses a structured questionnaire (Funnel Approach) to gather incident context without overwhelming the user.
* **Constraint-Based Prompting:** Injects hard-coded safety protocols (e.g., "Never recommend paying a ransom", "Always call the official bank line first") into the system prompt.
* **Output Generation:** The AI returns structured JSON containing Immediate, Short-Term, and Recovery actions. 
* **Client-Side Document Generation:** Uses `jsPDF` to generate Police Complaints and Breach Notifications directly in the browser.

### 4.5 Security Posture Analyzer
An interactive diagnostic tool that assesses a user's security hygiene through targeted questionnaires. 
* Operates fully on the client-side, utilizing intercepted API requests to instantly calculate a quantifiable risk score and generate a mock assessment result without relying on a persistent backend.

### 4.6 CYZEN Intelligence Chat
A real-time AI assistant integrated into the main platform to provide immediate technical support and security education.
* **Core Engine:** Powered by the Llama-3.3-70B-Versatile model via the Groq API for ultra-low latency responses.
* **Contextual Memory:** Designed to maintain conversation history, allowing for nuanced multi-turn dialogues about complex security vulnerabilities.
* **System Guardrails:** Implements a strict system prompt that constrains the AI to cybersecurity domains, ensuring accurate and safe expert guidance.

---

## 5. Results and Discussion

The CYZEN platform successfully integrates complex data science models into an accessible, high-performance web interface.

**1. Phishing Detection Engine:** 
The model demonstrated exceptional robustness. On a testing set of 32,995 unseen emails:
* **True Positives (Caught Phishing):** 17,028
* **False Negatives (Missed Phishing):** 129
* **Recall:** 99%. In a cybersecurity context, missing an attack is far more dangerous than a false alarm. A 99% recall rate proves the system is highly reliable for real-world usage.

**2. Password Security Analyzer:**
Testing revealed the critical flaw in standard entropy meters. A password like `password123` scored 62 bits of entropy (technically "High Complexity"), but the system's pattern detector and `zxcvbn` integration correctly flagged it as `CRITICAL` due to 1.3 million breach appearances and a sub-second crack time. The k-anonymity implementation ensured 100% data privacy during tests.

**3. Emergency Response Kit:**
Leveraging Groq's LPU hardware, full incident response plans (~800 tokens) were generated in under 1.5 seconds. The strict prompt engineering successfully prevented the AI from issuing dangerous advice during edge-case testing (e.g., simulating ransomware scenarios).

**4. Web Platform Performance:**
The migration to a fully client-side architecture removed all server bottlenecks. By injecting API mocks directly into the static `index.html` files, the platform achieved instantaneous load times and eliminated 404/Connection Refused errors on mobile and desktop devices.

**5. CYZEN Intelligence Chat:**
The integration of the Llama-3.3-70B model via Groq's LPU hardware provided exceptional performance, with average response latencies under 2 seconds. The AI successfully handled complex queries regarding Zero-Day vulnerabilities, VPN configurations, and social engineering tactics, proving its value as a real-time educational resource.

---

## 6. Challenges Faced

**1. Memory Allocation Errors in Machine Learning (ArrayMemoryError)**
During the TF-IDF feature extraction, NumPy attempted to allocate a 37 million integer array, crashing the system.
* **Solution:** Reduced `max_features` from 10,000 to 5,000, removed bigrams, and utilized 32-bit floats. 

**2. XGBoost Algorithm Crash**
XGBoost required the entire dataset to be loaded into memory simultaneously, resulting in a `bad_malloc` error.
* **Solution:** Switched the algorithm to LightGBM, which uses leaf-wise tree growth and is highly optimized for large, sparse datasets, successfully training the model without RAM exhaustion.

**3. Cross-Origin Resource Sharing (CORS) Issues**
Running local static HTML files alongside a Flask backend resulted in the browser blocking API requests due to origin mismatch.
* **Solution:** Re-architected the file structure to serve the frontend directly through Flask as static assets, aligning the origins.

**4. Production Deployment & API Restrictions**
Deploying the application to Netlify (a static hosting provider) broke tools that originally relied on local Flask backends (`/api/` routes) and exposed API keys (Groq).
* **Solution:** Ibrahim engineered an advanced client-side mocking system. Using `XMLHttpRequest` and `fetch` interceptors embedded in the HTML, the tools seamlessly simulate backend logic and static AI responses. This entirely removed the requirement for active backend servers and protected sensitive API keys.

**5. Google OAuth & Secure Session Management**
Implementing a secure authentication flow required careful configuration of Google Cloud credentials and authorized redirect URIs.
* **Solution:** Ibrahim configured the Google Cloud Console with production-ready OAuth Client IDs and integrated them with Supabase’s authentication middleware. Additionally, a custom session state management system was implemented using `sessionStorage` and URL hash fragments to prevent unauthorized access and maintain user state across the platform's multi-tool architecture.

---

## 7. References

1. Ke, G., Meng, Q., Finley, T., Wang, T., Chen, W., Ma, W., ... & Liu, T. (2017). *LightGBM: A highly efficient gradient boosting decision tree.* Advances in neural information processing systems, 30.
2. Wheeler, D. (2016). *zxcvbn: Low-Budget Password Strength Estimation.* USENIX Security Symposium.
3. Hunt, T. (2018). *Have I Been Pwned: k-Anonymity for Passwords.* 
4. Shannon, C. E. (1948). *A mathematical theory of communication.* The Bell system technical journal, 27(3), 379-423.
5. Meta AI. (2024). *LLaMA-3 Technical Overview and Prompt Engineering Guidelines.*
6. React Documentation (2025). *State Management and useEffect hooks.*

---

## 8. Acknowledgement

We would like to express our profound gratitude to our project guide, **Ashith Kumar Naidu**, for their continuous support, valuable feedback, and encouragement throughout the duration of this project. Their insights into software architecture and machine learning were instrumental in shaping the final outcome of CYZEN.

We also extend our thanks to the faculty of the School of Engineering, Chanakya University, for providing the foundational knowledge and resources necessary to undertake a project of this scale. Finally, we thank our peers and open-source contributors (such as the creators of LightGBM, React, and Have I Been Pwned) whose tools and documentation made this application possible.

***
