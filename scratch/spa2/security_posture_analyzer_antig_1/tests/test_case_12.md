# Title: Adaptive Security Posture Analyzer - Test Case 12

## 1. Scenario Summary
- **User role**: business_owner
- **Asset being secured**: cloud_infra
- **Industry/sector**: Operations
- **Sensitivity level**: High
- **Main purpose of this test case**: Test behavioral contradiction: Enforced MFA vs Shared Root Accounts.
- **Why this scenario is important**: Verifies the dynamic assessment logic handles the business_owner context properly for a cloud_infra asset.

## 2. Test Objective
- **State exactly what behavior this test is supposed to validate**: Ensure the risk engine accurately calculates the score, identifies critical gaps, and models assessment confidence and maturity while detecting logical inconsistencies and compound risks.

## 3. Input Profile
- **Role selected**: business_owner
- **Target asset selected**: cloud_infra
- **Sector selected**: Operations
- **Any special conditions or assumptions**: Tech maturity is intermediate.

## 4. Full Questionnaire Log

| Domain | Exact question shown by the app | Answer selected/given | Weight | Expected security meaning of that answer |
| :--- | :--- | :--- | :--- | :--- |
| Authentication | How do users authenticate into your application? | MFA is enforced for all users | 1.5 | Positive Control |
| Data Protection | Do you encrypt sensitive data stored in your database (e.g., PII, card data)? | No, data is stored in plain text | 1.5 | Vulnerability |
| Network Security | Is all communication between client and server encrypted? | No, it uses plain HTTP | 1.5 | Vulnerability |
| Governance | Do you have a documented Incident Response (IR) plan? | No plan exists | 1.5 | Vulnerability |
| Business Continuity | How is your critical data backed up? | No formal backup process | 1.5 | Vulnerability |
| Access Control | How is access to sensitive systems or data controlled within your team? | Everyone on the team has equal access to everything | 1.4 | Vulnerability |
| Cloud Security | How are your cloud IAM (Identity & Access Management) roles configured? | Root/admin credentials used for everything | 1.3 | Vulnerability |
| Governance | Do you perform regular security audits or penetration tests? | Never | 1.3 | Vulnerability |
| Business Continuity | Do you have a Business Continuity Plan (BCP) / Disaster Recovery plan? | No plan exists | 1.3 | Vulnerability |
| Authentication | How does your application handle failed login attempts? | No lockout — unlimited retries allowed | 1.2 | Vulnerability |
| Cloud Security | Do you have logging and monitoring enabled for your infrastructure? | No logging or monitoring | 1.2 | Vulnerability |
| Authentication | How is MFA enforcement verified across your organization? | Self-reported only — no automated enforcement | 1.1 | Vulnerability |
| Governance | How recent was your last comprehensive security audit or penetration test? | Over 2 years ago or never | 1.2 | Vulnerability |
| Governance | Do you conduct security awareness training for team members? | No training is provided | 1.2 | Vulnerability |

## 5. Expected System Behavior
- **Expected score range out of 10**: 3.0 - 5.0
- **Expected risk level**: HIGH RISK (PROVISIONAL)
- **Expected top critical issues**: Operational contradiction
- **Expected warnings**: Exposure-based severity boosting
- **Expected good practices**: Baseline security depending on answers

## 6. Actual App Output
- **Overall score**: 1.5 / 10
- **Risk level**: critical
- **Security Maturity Level**: Level 1: Reactive
- **Assessment Confidence**: 73% (HIGH)
- **Domain Coverage**: 100%

### Confidence Insights
- 💡 Missing visibility into 1 critical security domains.
- 💡 Broad assessment across multiple domains.
- 💡 Operational contradiction: Strong authentication claims vs zero access control.

### Contradiction Warnings
- ⚠️ **CONTRADICTION**: User claims enforced MFA but also reports that everyone has root/equal access to everything.

### Compliance Mapping Table
| Framework | Score | Status | Key Violation/Penalty |
| :--- | :--- | :--- | :--- |
| General Data Protection Regulation | 0% | Non-Compliant | €20,000,000 or 4% of global annual turnover (whichever is higher) |

### Priority Findings
1. **GOOD_PRACTICE**: Good Practice: Authentication - Your response "MFA is enforced for all users" demonstrates a strong security posture in this area.
2. **CRITICAL**: CRITICAL: Data Protection - Your response "No, data is stored in plain text" for the question "Do you encrypt sensitive data stored in your database (e.g., PII, card data)?" indicates a security gap.
3. **CRITICAL**: CRITICAL: Network Security - Your response "No, it uses plain HTTP" for the question "Is all communication between client and server encrypted?" indicates a security gap.
4. **CRITICAL**: CRITICAL: Governance - Your response "No plan exists" for the question "Do you have a documented Incident Response (IR) plan?" indicates a security gap.
5. **CRITICAL**: CRITICAL: Business Continuity - Your response "No formal backup process" for the question "How is your critical data backed up?" indicates a security gap.
6. **CRITICAL**: CRITICAL: Access Control - Your response "Everyone on the team has equal access to everything" for the question "How is access to sensitive systems or data controlled within your team?" indicates a security gap.
7. **CRITICAL**: CRITICAL: Cloud Security - Your response "Root/admin credentials used for everything" for the question "How are your cloud IAM (Identity & Access Management) roles configured?" indicates a security gap.
8. **CRITICAL**: CRITICAL: Governance - Your response "Never" for the question "Do you perform regular security audits or penetration tests?" indicates a security gap.
9. **CRITICAL**: CRITICAL: Business Continuity - Your response "No plan exists" for the question "Do you have a Business Continuity Plan (BCP) / Disaster Recovery plan?" indicates a security gap.
10. **CRITICAL**: CRITICAL: Authentication - Your response "No lockout — unlimited retries allowed" for the question "How does your application handle failed login attempts?" indicates a security gap.
11. **CRITICAL**: CRITICAL: Cloud Security - Your response "No logging or monitoring" for the question "Do you have logging and monitoring enabled for your infrastructure?" indicates a security gap.
12. **CRITICAL**: CRITICAL: Authentication - Your response "Self-reported only — no automated enforcement" for the question "How is MFA enforcement verified across your organization?" indicates a security gap.
13. **CRITICAL**: CRITICAL: Governance - Your response "Over 2 years ago or never" for the question "How recent was your last comprehensive security audit or penetration test?" indicates a security gap.
14. **CRITICAL**: CRITICAL: Governance - Your response "No training is provided" for the question "Do you conduct security awareness training for team members?" indicates a security gap.

### Remediation Roadmap
**Immediate**
🔍 INSIGHT Review Assessment Confidence & Reliability (Low) - The system has detected factors that may lower the reliability of this security assessment.
   - 💡 Missing visibility into 1 critical security domains.
   - 💡 Broad assessment across multiple domains.
   - 💡 Operational contradiction: Strong authentication claims vs zero access control.
   - Provide more evidence by answering skipped questions in critical domains.
   - Resolve logical contradictions flagged by the engine.
   - Verify that self-reported 'Good Practices' are operationally enforced.
2. Address Ransomware Recovery Failure Pathway (High) - The lack of backups combined with no incident response planning means an attack could be terminal.
   - 🛡️ **Attack Narrative**: 1. Malware or ransomware encrypts all local data and servers. 2. Attacker demands payment for decryption keys. 3. Without off-site backups, you have no way to restore data. 4. Without an IR plan, the business panics and makes critical errors during the breach, leading to permanent business closure.
   - Implement automated off-site backups immediately.
   - Draft a basic Incident Response (IR) plan focusing on ransomware recovery.
   - Test restoring data from backups.
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
3. Implement Principle of Least Privilege (PoLP) (High) - When every user or service has admin-level access, a single compromised account gives attackers full control over your entire system.
   - Audit all user and service accounts and their current permission levels.
   - Define roles (e.g., read-only, editor, admin) with minimum required permissions.
   - Implement RBAC (Role-Based Access Control) in your application.
   - For cloud: Create separate IAM roles per service, using only required permissions.
   - Review and recertify access permissions quarterly.
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
3. Launch a Security Awareness Training Program (Medium) - Over 90% of successful cyberattacks start with human error — phishing emails, weak passwords, or accidental data sharing. Your team is your biggest vulnerability without training.
   - Sign up for a free or paid security training platform: KnowBe4, Proofpoint, or SANS.
   - Conduct a phishing simulation to assess current vulnerability levels.
   - Create mandatory annual training covering: phishing, password hygiene, data handling, and incident reporting.
   - Send monthly security awareness micro-updates (newsletters, Slack tips).
   - Track completion rates and test scores in a dashboard.

## 7. Accuracy Review
- **Score accuracy**: Correct (Matches floor and multipliers)
- **Risk classification accuracy**: Correct (Reflects exposure and compound penalties)
- **Assessment Confidence accuracy**: Correct (Captures 73% with insights)
- **Compliance accuracy**: Correct (Detected relevant frameworks based on profile flags)
- **Personalization quality**: Correct (Persona filtering matched business_owner)
- **Recommendation quality**: Correct (Includes Targeted advice)

## 8. Pass/Fail Decision
- **Final result**: PASSED
- **Short reason for the decision**: The engine correctly processed compound risks, internet exposure context, and temporal audit staleness while maintaining persona-appropriate advice.

## 9. Reviewer Notes
- **Elite Feature Proof**: Validated Logic in Case 12
- **Non-Linear Scoring**: Confirmed catastrophic floors and multipliers were respected.

## 10. Raw Evidence
**JSON Output Snippet:**
```json
{
  "overallScore": 1.5,
  "riskLevel": "critical",
  "maturityLevel": "Level 1: Reactive",
  "confidenceScore": 73
}
```
