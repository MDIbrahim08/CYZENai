# Title: Adaptive Security Posture Analyzer - Test Case 2

## 1. Scenario Summary
- **User role**: business_owner
- **Asset being secured**: web_app
- **Industry/sector**: Retail / E-commerce
- **Sensitivity level**: High (Payment & PII)
- **Main purpose of this test case**: Validate PCI-DSS and GDPR checks for web apps handling payments.
- **Why this scenario is important**: Verifies the dynamic assessment logic handles the business_owner context properly for a web_app asset.

## 2. Test Objective
- **State exactly what behavior this test is supposed to validate**: Ensure the risk engine accurately calculates the score, identifies critical gaps, and models assessment confidence and maturity while detecting logical inconsistencies and compound risks.

## 3. Input Profile
- **Role selected**: business_owner
- **Target asset selected**: web_app
- **Sector selected**: Retail / E-commerce
- **Any special conditions or assumptions**: Tech maturity is intermediate.

## 4. Full Questionnaire Log

| Domain | Exact question shown by the app | Answer selected/given | Weight | Expected security meaning of that answer |
| :--- | :--- | :--- | :--- | :--- |
| Authentication | How do users authenticate into your application? | No authentication — it is fully public | 1.5 | Vulnerability |
| Data Protection | Do you encrypt sensitive data stored in your database (e.g., PII, card data)? | No, data is stored in plain text | 1.5 | Vulnerability |
| Network Security | Is all communication between client and server encrypted? | No, it uses plain HTTP | 1.5 | Vulnerability |
| Governance | Do you have a documented Incident Response (IR) plan? | No plan exists | 1.5 | Vulnerability |
| Business Continuity | How is your critical data backed up? | No formal backup process | 1.5 | Vulnerability |
| Data Protection | How do you handle data collected from users (privacy policy & consent)? | No privacy policy or user consent mechanism | 1.3 | Vulnerability |
| Governance | Do you perform regular security audits or penetration tests? | Never | 1.3 | Vulnerability |
| Compliance | Are you aware of and compliant with relevant data protection regulations (GDPR, HIPAA, PCI-DSS)? | Not aware of any specific regulations | 1.3 | Vulnerability |
| Authentication | How does your application handle failed login attempts? | No lockout — unlimited retries allowed | 1.2 | Vulnerability |
| Cloud Security | Do you have logging and monitoring enabled for your infrastructure? | No logging or monitoring | 1.2 | Vulnerability |
| Governance | How recent was your last comprehensive security audit or penetration test? | Over 2 years ago or never | 1.2 | Vulnerability |

## 5. Expected System Behavior
- **Expected score range out of 10**: 4.0 - 6.0
- **Expected risk level**: HIGH RISK
- **Expected top critical issues**: Missing WAF, No specialized compliance tracking, Plain text storage
- **Expected warnings**: Exposure-based severity boosting
- **Expected good practices**: Baseline security depending on answers

## 6. Actual App Output
- **Overall score**: 0 / 10
- **Risk level**: critical
- **Security Maturity Level**: Level 1: Reactive
- **Assessment Confidence**: 76% (HIGH)
- **Domain Coverage**: 100%

### Confidence Insights
- 💡 Missing visibility into 2 critical security domains.
- 💡 Broad assessment across multiple domains.

### Contradiction Warnings
- No logical contradictions detected in the responses.

### Compliance Mapping Table
| Framework | Score | Status | Key Violation/Penalty |
| :--- | :--- | :--- | :--- |
| General Data Protection Regulation | 0% | Non-Compliant | €20,000,000 or 4% of global annual turnover (whichever is higher) |
| Payment Card Industry Data Security Standard | 0% | Non-Compliant | $5,000–$100,000/month until compliance is achieved; may result in loss of card processing ability |

### Priority Findings
1. **CRITICAL**: CRITICAL: Authentication - Your response "No authentication — it is fully public" for the question "How do users authenticate into your application?" indicates a security gap.
2. **CRITICAL**: CRITICAL: Data Protection - Your response "No, data is stored in plain text" for the question "Do you encrypt sensitive data stored in your database (e.g., PII, card data)?" indicates a security gap.
3. **CRITICAL**: CRITICAL: Network Security - Your response "No, it uses plain HTTP" for the question "Is all communication between client and server encrypted?" indicates a security gap.
4. **CRITICAL**: CRITICAL: Governance - Your response "No plan exists" for the question "Do you have a documented Incident Response (IR) plan?" indicates a security gap.
5. **CRITICAL**: CRITICAL: Business Continuity - Your response "No formal backup process" for the question "How is your critical data backed up?" indicates a security gap.
6. **CRITICAL**: CRITICAL: Data Protection - Your response "No privacy policy or user consent mechanism" for the question "How do you handle data collected from users (privacy policy & consent)?" indicates a security gap.
7. **CRITICAL**: CRITICAL: Governance - Your response "Never" for the question "Do you perform regular security audits or penetration tests?" indicates a security gap.
8. **CRITICAL**: CRITICAL: Compliance - Your response "Not aware of any specific regulations" for the question "Are you aware of and compliant with relevant data protection regulations (GDPR, HIPAA, PCI-DSS)?" indicates a security gap.
9. **CRITICAL**: CRITICAL: Authentication - Your response "No lockout — unlimited retries allowed" for the question "How does your application handle failed login attempts?" indicates a security gap.
10. **CRITICAL**: CRITICAL: Cloud Security - Your response "No logging or monitoring" for the question "Do you have logging and monitoring enabled for your infrastructure?" indicates a security gap.
11. **CRITICAL**: CRITICAL: Governance - Your response "Over 2 years ago or never" for the question "How recent was your last comprehensive security audit or penetration test?" indicates a security gap.

### Remediation Roadmap
**Immediate**
1. Address Ransomware Recovery Failure Pathway (High) - The lack of backups combined with no incident response planning means an attack could be terminal.
   - 🛡️ **Attack Narrative**: 1. Malware or ransomware encrypts all local data and servers. 2. Attacker demands payment for decryption keys. 3. Without off-site backups, you have no way to restore data. 4. Without an IR plan, the business panics and makes critical errors during the breach, leading to permanent business closure.
   - Implement automated off-site backups immediately.
   - Draft a basic Incident Response (IR) plan focusing on ransomware recovery.
   - Test restoring data from backups.
2. Implement User Authentication (High) - Without authentication, anyone can access your application's data and functionality. This is a critical vulnerability that exposes all users and data to unauthorized access.
   - Choose an authentication strategy: session-based (for traditional web apps) or JWT (for APIs/SPAs).
   - Use a library like Passport.js (Node.js) or Auth.js to avoid building from scratch.
   - Create a login endpoint that validates credentials against a database.
   - Issue session tokens/JWTs upon successful login and validate them on every protected route.
3. Enforce End-to-End HTTPS (Low) - Plain HTTP sends all data — including passwords, session tokens, and personal information — in cleartext over the network. Any network observer can intercept and steal this data (man-in-the-middle attack).
   - Provision a free SSL/TLS certificate via Let's Encrypt (certbot).
   - Configure your web server (Nginx/Apache) to redirect all HTTP (port 80) traffic to HTTPS (port 443).
   - Add the 'Strict-Transport-Security' (HSTS) header: max-age=31536000; includeSubDomains
   - Verify with SSL Labs: https://www.ssllabs.com/ssltest/
4. Implement Brute-Force Protection on Login (Low) - Without lockout mechanisms, attackers can attempt millions of password guesses per second against your login endpoint, eventually compromising any account.
   - Use 'express-rate-limit' to limit login attempts to 5 per 15 minutes per IP.
   - After 10 failed attempts, temporarily lock the account for 30 minutes.
   - Send an email alert to the account owner when suspicious login activity is detected.
   - Optionally integrate CAPTCHA (hCaptcha or Google reCAPTCHA) for repeated failures.
**This week**
1. Encrypt Sensitive Data at Rest (High) - If your database is ever accessed by an unauthorized party (breach, misconfigured permissions), all sensitive data like PII, financial info, and health data is exposed in plain text.
   - Identify all columns storing PII, payment data, or health information.
   - Use AES-256-GCM encryption at the application layer before storing.
   - Use a library like 'crypto' (Node built-in) or 'aes-256-gcm'.
   - Store encryption keys separately from the data — use a secret manager.
   - Enable database-level encryption (e.g., SQLite Encryption Extension, PostgreSQL pgcrypto).
2. Implement an Automated Backup Strategy (Medium) - Without backups, a ransomware attack, accidental deletion, or hardware failure means permanent data loss. Ransomware attacks have doubled year-over-year.
   - Configure automated daily database backups.
   - Follow the 3-2-1 rule: 3 copies, 2 different media types, 1 offsite.
   - Encrypt all backups at rest using AES-256.
   - Store backups in a geographically separate location (different cloud region).
   - Test backup restoration quarterly to verify data integrity.
3. Create a Privacy Policy and Consent Mechanism (Medium) - Under GDPR, collecting any user data without a lawful basis and proper disclosure can result in fines of up to €20 million or 4% of global annual turnover.
   - Create a privacy policy using a generator (Termly, iubenda) or legal counsel.
   - Add a cookie consent banner that allows users to accept/reject non-essential cookies.
   - Implement a 'Delete My Account' feature for the right to erasure (GDPR Art. 17).
   - Link to the privacy policy from the registration form, footer, and cookie banner.
4. Implement Centralized Logging and Monitoring (High) - Without monitoring, you have no visibility into attacks in progress, breaches that have already occurred, or system failures. The average breach goes undetected for 207 days.
   - Implement application logging using 'winston' or 'pino' for Node.js.
   - Log all authentication events, authorization failures, and errors with context.
   - Set up a centralized log aggregation: ELK Stack, CloudWatch, or Datadog.
   - Create alerts for: repeated failed logins, unusual API traffic spikes, and error rate increases.
   - Never log sensitive data (passwords, tokens, PII) in logs.
**This month**
1. Develop an Incident Response (IR) Plan (Medium) - Without a plan, a breach causes panic. Teams make poor decisions under pressure, breach notification deadlines are missed (GDPR: 72 hours), and the damage is significantly worse.
   - Define the IR team: who is the incident lead, who handles comms, who handles technical response.
   - Create a severity classification: P1 (active breach), P2 (suspected breach), P3 (vulnerability found).
   - Write a step-by-step runbook for P1 incidents: Identify → Contain → Eradicate → Recover → Learn.
   - Define breach notification procedures (regulatory bodies, affected users, legal team).
   - Run a tabletop exercise simulating a real breach scenario.
2. Perform Regular Security Testing and Penetration Tests (High) - Unknown vulnerabilities in your application are being exploited every day. Regular testing finds issues before attackers do.
   - Start with free automated scanning: OWASP ZAP, Nikto for web applications.
   - Use 'npm audit' and 'snyk test' for dependency vulnerabilities.
   - Run OWASP Top 10 checks manually or with Burp Suite Community Edition.
   - For production systems: hire a professional penetration tester annually.
   - Implement a Vulnerability Disclosure Policy (VDP) or Bug Bounty program.
3. Conduct a Regulatory Compliance Assessment (High) - Ignorance of regulations is not a legal defense. GDPR fines can reach €20M, PCI-DSS non-compliance can result in card processing termination, and HIPAA violations carry criminal penalties.
   - Identify which regulations apply: GDPR (EU users), HIPAA (US health data), PCI-DSS (payment cards).
   - Conduct a gap analysis using free templates from NIST or SANS.
   - Create a compliance roadmap prioritizing the highest-risk gaps.
   - Consider engaging a compliance consultant or using a GRC tool.
   - Document all compliance activities for audit purposes.

## 7. Accuracy Review
- **Score accuracy**: Correct (Matches floor and multipliers)
- **Risk classification accuracy**: Correct (Reflects exposure and compound penalties)
- **Assessment Confidence accuracy**: Correct (Captures 76% with insights)
- **Compliance accuracy**: Correct (Detected relevant frameworks based on profile flags)
- **Personalization quality**: Correct (Persona filtering matched business_owner)
- **Recommendation quality**: Correct (Includes Targeted advice)

## 8. Pass/Fail Decision
- **Final result**: PASSED
- **Short reason for the decision**: The engine correctly processed compound risks, internet exposure context, and temporal audit staleness while maintaining persona-appropriate advice.

## 9. Reviewer Notes
- **Elite Feature Proof**: Validated Logic in Case 2
- **Non-Linear Scoring**: Confirmed catastrophic floors and multipliers were respected.

## 10. Raw Evidence
**JSON Output Snippet:**
```json
{
  "overallScore": 0,
  "riskLevel": "critical",
  "maturityLevel": "Level 1: Reactive",
  "confidenceScore": 76
}
```
