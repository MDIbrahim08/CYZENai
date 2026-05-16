/**
 * REMEDIATION BANK
 * Maps risk factors to actionable, step-by-step remediation plans
 * Each entry: action, whyItMatters, steps, difficulty, timeEstimate, urgency, links
 */

const remediationBank = {
  no_auth: {
    action: "Implement User Authentication",
    whyItMatters: "Without authentication, anyone can access your application's data and functionality. This is a critical vulnerability that exposes all users and data to unauthorized access.",
    steps: [
      "Choose an authentication strategy: session-based (for traditional web apps) or JWT (for APIs/SPAs).",
      "Use a library like Passport.js (Node.js) or Auth.js to avoid building from scratch.",
      "Create a login endpoint that validates credentials against a database.",
      "Issue session tokens/JWTs upon successful login and validate them on every protected route."
    ],
    difficulty: "High",
    timeEstimate: "3–5 days",
    urgency: "immediate",
    links: ["https://www.passportjs.org/", "https://authjs.dev/"]
  },

  missing_mfa: {
    action: "Enforce Multi-Factor Authentication (MFA)",
    whyItMatters: "Passwords alone are frequently compromised through phishing or data breaches. MFA blocks over 99% of account takeover attacks even when the password is known.",
    steps: [
      "Integrate a TOTP library: 'speakeasy' or 'otplib' on the backend.",
      "Add an MFA setup flow in user profile settings (generate QR code for authenticator apps).",
      "Update the login controller to require a TOTP code after password verification.",
      "Provide backup codes for account recovery and store them hashed."
    ],
    difficulty: "Medium",
    timeEstimate: "1–2 days",
    urgency: "immediate",
    links: ["https://github.com/speakeasyjs/speakeasy", "https://authy.com/guides/github/"]
  },

  optional_mfa: {
    action: "Migrate from Optional to Mandatory MFA",
    whyItMatters: "Optional MFA provides false security. Users who skip it (often the majority) remain fully vulnerable to credential-based attacks.",
    steps: [
      "Send in-app notifications and emails announcing the MFA mandate.",
      "Set a 30-day grace period for users to enroll.",
      "After the deadline, block access to sensitive features unless MFA is enabled.",
      "Monitor MFA adoption rates through an admin dashboard."
    ],
    difficulty: "Low",
    timeEstimate: "2–4 hours",
    urgency: "this_week",
    links: ["https://owasp.org/www-community/controls/Multi-Factor_Authentication"]
  },

  no_brute_force_protection: {
    action: "Implement Brute-Force Protection on Login",
    whyItMatters: "Without lockout mechanisms, attackers can attempt millions of password guesses per second against your login endpoint, eventually compromising any account.",
    steps: [
      "Use 'express-rate-limit' to limit login attempts to 5 per 15 minutes per IP.",
      "After 10 failed attempts, temporarily lock the account for 30 minutes.",
      "Send an email alert to the account owner when suspicious login activity is detected.",
      "Optionally integrate CAPTCHA (hCaptcha or Google reCAPTCHA) for repeated failures."
    ],
    difficulty: "Low",
    timeEstimate: "2–4 hours",
    urgency: "immediate",
    links: ["https://www.npmjs.com/package/express-rate-limit", "https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks"]
  },

  insecure_sessions: {
    action: "Secure Session Token Storage and Handling",
    whyItMatters: "Storing JWTs in localStorage exposes them to XSS attacks. Any malicious script injected into your page can steal all user sessions.",
    steps: [
      "Move token storage from localStorage to Secure, HttpOnly, SameSite=Strict cookies.",
      "Set an appropriate token expiry (e.g., 15 minutes for access tokens).",
      "Implement refresh token rotation to maintain user sessions securely.",
      "Add the 'Content-Security-Policy' header to mitigate XSS attack vectors."
    ],
    difficulty: "Medium",
    timeEstimate: "4–8 hours",
    urgency: "immediate",
    links: ["https://owasp.org/www-community/HttpOnly", "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html"]
  },

  plaintext_passwords: {
    action: "Implement Secure Password Hashing Immediately",
    whyItMatters: "Plain-text passwords in a database means any data breach or SQL injection exposes every user's account — and potentially their other accounts if they reuse passwords. This also violates GDPR and PCI-DSS requirements.",
    steps: [
      "Install 'bcryptjs': npm install bcryptjs",
      "Replace all password storage with: bcrypt.hash(password, 12)",
      "Replace all password checks with: bcrypt.compare(inputPassword, storedHash)",
      "Run a script to invalidate all existing sessions and force a password reset via email.",
      "Ensure plaintext passwords are never logged in console or error logs."
    ],
    difficulty: "High",
    timeEstimate: "4–8 hours",
    urgency: "immediate",
    links: ["https://www.npmjs.com/package/bcryptjs", "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html"]
  },

  weak_hashing: {
    action: "Upgrade Password Hashing Algorithm",
    whyItMatters: "MD5 and SHA-1 are cryptographically broken. Precomputed rainbow tables can crack MD5-hashed passwords in seconds. This exposes all your users' credentials.",
    steps: [
      "Replace MD5/SHA-1 with bcrypt (cost factor 12+) or Argon2id.",
      "Implement a 'rehash on login' strategy: when a user logs in successfully with the old hash, transparently rehash using the new algorithm.",
      "Update the User model/auth hooks to always use the new algorithm for new registrations.",
      "Deprecate old hashes after a migration period."
    ],
    difficulty: "Medium",
    timeEstimate: "1 day",
    urgency: "immediate",
    links: ["https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html"]
  },

  no_encryption_at_rest: {
    action: "Encrypt Sensitive Data at Rest",
    whyItMatters: "If your database is ever accessed by an unauthorized party (breach, misconfigured permissions), all sensitive data like PII, financial info, and health data is exposed in plain text.",
    steps: [
      "Identify all columns storing PII, payment data, or health information.",
      "Use AES-256-GCM encryption at the application layer before storing.",
      "Use a library like 'crypto' (Node built-in) or 'aes-256-gcm'.",
      "Store encryption keys separately from the data — use a secret manager.",
      "Enable database-level encryption (e.g., SQLite Encryption Extension, PostgreSQL pgcrypto)."
    ],
    difficulty: "High",
    timeEstimate: "2–3 days",
    urgency: "this_week",
    links: ["https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html"]
  },

  no_privacy_policy: {
    action: "Create a Privacy Policy and Consent Mechanism",
    whyItMatters: "Under GDPR, collecting any user data without a lawful basis and proper disclosure can result in fines of up to €20 million or 4% of global annual turnover.",
    steps: [
      "Create a privacy policy using a generator (Termly, iubenda) or legal counsel.",
      "Add a cookie consent banner that allows users to accept/reject non-essential cookies.",
      "Implement a 'Delete My Account' feature for the right to erasure (GDPR Art. 17).",
      "Link to the privacy policy from the registration form, footer, and cookie banner."
    ],
    difficulty: "Medium",
    timeEstimate: "1–2 days",
    urgency: "this_week",
    links: ["https://termly.io/", "https://gdpr.eu/privacy-notice/"]
  },

  no_https: {
    action: "Enforce End-to-End HTTPS",
    whyItMatters: "Plain HTTP sends all data — including passwords, session tokens, and personal information — in cleartext over the network. Any network observer can intercept and steal this data (man-in-the-middle attack).",
    steps: [
      "Provision a free SSL/TLS certificate via Let's Encrypt (certbot).",
      "Configure your web server (Nginx/Apache) to redirect all HTTP (port 80) traffic to HTTPS (port 443).",
      "Add the 'Strict-Transport-Security' (HSTS) header: max-age=31536000; includeSubDomains",
      "Verify with SSL Labs: https://www.ssllabs.com/ssltest/"
    ],
    difficulty: "Low",
    timeEstimate: "2–4 hours",
    urgency: "immediate",
    links: ["https://letsencrypt.org/getting-started/", "https://www.ssllabs.com/ssltest/"]
  },

  mixed_content: {
    action: "Resolve Mixed Content Issues",
    whyItMatters: "Mixed content (HTTP assets on HTTPS pages) triggers browser security warnings, can be blocked by modern browsers, and creates attack vectors for MITM attacks.",
    steps: [
      "Run a site audit using Chrome DevTools > Security tab to identify all HTTP resources.",
      "Update all hardcoded URLs from http:// to https:// in your frontend code.",
      "Add the Content-Security-Policy header: 'upgrade-insecure-requests'.",
      "Verify with https://www.whynopadlock.com/"
    ],
    difficulty: "Low",
    timeEstimate: "2–4 hours",
    urgency: "this_week",
    links: ["https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content"]
  },

  no_waf: {
    action: "Deploy a Web Application Firewall (WAF)",
    whyItMatters: "Without a WAF, your application is exposed to SQL injection, XSS, CSRF, and DDoS attacks that can take down your service or exfiltrate all user data.",
    steps: [
      "For cloud deployments: Enable AWS WAF, Cloudflare WAF, or Azure WAF.",
      "For self-hosted: Deploy ModSecurity with the OWASP Core Rule Set (CRS).",
      "Enable DDoS protection: Cloudflare Free tier provides basic DDoS mitigation.",
      "Configure rate limiting rules specific to your application's normal usage patterns."
    ],
    difficulty: "Medium",
    timeEstimate: "4–8 hours",
    urgency: "this_week",
    links: ["https://owasp.org/www-project-modsecurity-core-rule-set/", "https://developers.cloudflare.com/waf/"]
  },

  no_rate_limiting: {
    action: "Implement API Rate Limiting",
    whyItMatters: "Without rate limiting, your API is vulnerable to brute force attacks, credential stuffing, scraping, and denial-of-service attacks that can overwhelm your server.",
    steps: [
      "Install 'express-rate-limit': npm install express-rate-limit",
      "Apply a global rate limit: 100 requests/15 minutes per IP.",
      "Apply stricter limits on sensitive routes: /api/auth/login — 5 requests/15 minutes.",
      "Return 429 Too Many Requests with Retry-After header.",
      "Consider a Redis-backed store for distributed rate limiting in production."
    ],
    difficulty: "Low",
    timeEstimate: "1–2 hours",
    urgency: "immediate",
    links: ["https://www.npmjs.com/package/express-rate-limit"]
  },

  no_input_validation: {
    action: "Implement Server-Side Input Validation",
    whyItMatters: "Trusting client-side validation means any request crafted by an attacker bypasses all your checks, opening you to SQL injection, XSS, and data corruption.",
    steps: [
      "Install Zod or Joi for schema validation: npm install zod",
      "Define schemas for all request bodies, query params, and URL params.",
      "Add a validation middleware that rejects malformed requests with clear 400 errors.",
      "Sanitize HTML input using 'DOMPurify' on the frontend and 'sanitize-html' on the backend."
    ],
    difficulty: "Medium",
    timeEstimate: "1 day",
    urgency: "immediate",
    links: ["https://zod.dev/", "https://github.com/hapijs/joi"]
  },

  hardcoded_secrets: {
    action: "Remove Hardcoded Secrets from Source Code IMMEDIATELY",
    whyItMatters: "Hardcoded secrets in source code are discovered within minutes when code is pushed to a public repository. Even in private repos, they persist in git history forever. This is one of the most common causes of major data breaches.",
    steps: [
      "URGENT: Rotate/revoke ALL exposed API keys, DB credentials, and tokens NOW.",
      "Remove all secrets from source code and add them to a .env file.",
      "Add .env to your .gitignore: echo '.env' >> .gitignore",
      "Use git-filter-repo to purge secrets from git history: pip install git-filter-repo",
      "For production: Use AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault.",
      "Enable secret scanning on GitHub/GitLab to prevent future commits."
    ],
    difficulty: "Medium",
    timeEstimate: "2–4 hours",
    urgency: "immediate",
    links: ["https://docs.github.com/en/code-security/secret-scanning", "https://aws.amazon.com/secrets-manager/"]
  },

  exposed_env_secrets: {
    action: "Ensure .env Files Are Not Committed to Version Control",
    whyItMatters: "A .env file committed to a public (or even private) repository exposes all your credentials to every team member and potentially the public.",
    steps: [
      "Check if .env is in git: git ls-files | grep .env",
      "If tracked: git rm --cached .env, then add to .gitignore.",
      "Immediately rotate all credentials that may have been exposed.",
      "Use git-filter-repo to purge from history.",
      "For production deployments, use environment variables set directly in the hosting platform (Heroku, Railway, Vercel, etc.)."
    ],
    difficulty: "Low",
    timeEstimate: "1–2 hours",
    urgency: "immediate",
    links: ["https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository"]
  },

  over_privileged_access: {
    action: "Implement Principle of Least Privilege (PoLP)",
    whyItMatters: "When every user or service has admin-level access, a single compromised account gives attackers full control over your entire system.",
    steps: [
      "Audit all user and service accounts and their current permission levels.",
      "Define roles (e.g., read-only, editor, admin) with minimum required permissions.",
      "Implement RBAC (Role-Based Access Control) in your application.",
      "For cloud: Create separate IAM roles per service, using only required permissions.",
      "Review and recertify access permissions quarterly."
    ],
    difficulty: "High",
    timeEstimate: "2–5 days",
    urgency: "this_week",
    links: ["https://owasp.org/www-community/Access_Control", "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"]
  },

  no_monitoring: {
    action: "Implement Centralized Logging and Monitoring",
    whyItMatters: "Without monitoring, you have no visibility into attacks in progress, breaches that have already occurred, or system failures. The average breach goes undetected for 207 days.",
    steps: [
      "Implement application logging using 'winston' or 'pino' for Node.js.",
      "Log all authentication events, authorization failures, and errors with context.",
      "Set up a centralized log aggregation: ELK Stack, CloudWatch, or Datadog.",
      "Create alerts for: repeated failed logins, unusual API traffic spikes, and error rate increases.",
      "Never log sensitive data (passwords, tokens, PII) in logs."
    ],
    difficulty: "High",
    timeEstimate: "2–3 days",
    urgency: "this_week",
    links: ["https://www.elastic.co/what-is/elk-stack", "https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/"]
  },

  outdated_dependencies: {
    action: "Automate Dependency Security Scanning",
    whyItMatters: "Outdated dependencies are the leading cause of security vulnerabilities. The Log4Shell vulnerability (CVE-2021-44228) affected millions of systems running an unpatched logging library.",
    steps: [
      "Run 'npm audit' immediately to see current vulnerabilities.",
      "Fix critical vulnerabilities: npm audit fix --force",
      "Enable Dependabot on GitHub to automatically open PRs for security updates.",
      "Integrate Snyk into your CI/CD pipeline: npx snyk test",
      "Establish a monthly 'Security Patching' cycle for non-critical updates."
    ],
    difficulty: "Low",
    timeEstimate: "2–4 hours",
    urgency: "this_week",
    links: ["https://snyk.io/", "https://docs.github.com/en/code-security/dependabot"]
  },

  no_ir_plan: {
    action: "Develop an Incident Response (IR) Plan",
    whyItMatters: "Without a plan, a breach causes panic. Teams make poor decisions under pressure, breach notification deadlines are missed (GDPR: 72 hours), and the damage is significantly worse.",
    steps: [
      "Define the IR team: who is the incident lead, who handles comms, who handles technical response.",
      "Create a severity classification: P1 (active breach), P2 (suspected breach), P3 (vulnerability found).",
      "Write a step-by-step runbook for P1 incidents: Identify → Contain → Eradicate → Recover → Learn.",
      "Define breach notification procedures (regulatory bodies, affected users, legal team).",
      "Run a tabletop exercise simulating a real breach scenario."
    ],
    difficulty: "Medium",
    timeEstimate: "3–5 days",
    urgency: "this_month",
    links: ["https://www.sans.org/white-papers/incident-handlers-handbook/", "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf"]
  },

  no_security_training: {
    action: "Launch a Security Awareness Training Program",
    whyItMatters: "Over 90% of successful cyberattacks start with human error — phishing emails, weak passwords, or accidental data sharing. Your team is your biggest vulnerability without training.",
    steps: [
      "Sign up for a free or paid security training platform: KnowBe4, Proofpoint, or SANS.",
      "Conduct a phishing simulation to assess current vulnerability levels.",
      "Create mandatory annual training covering: phishing, password hygiene, data handling, and incident reporting.",
      "Send monthly security awareness micro-updates (newsletters, Slack tips).",
      "Track completion rates and test scores in a dashboard."
    ],
    difficulty: "Medium",
    timeEstimate: "1–2 weeks to set up",
    urgency: "this_month",
    links: ["https://www.knowbe4.com/", "https://www.sans.org/security-awareness-training/"]
  },

  no_vendor_assessment: {
    action: "Establish Vendor Risk Management Process",
    whyItMatters: "Third-party vendors with poor security become your security problem. The Target data breach (110M records) happened through an HVAC vendor with network access.",
    steps: [
      "Create a tiered vendor classification: critical (access to sensitive data), standard, low-risk.",
      "Develop a Security Assessment Questionnaire for all new critical vendors.",
      "Require SOC 2 Type II or ISO 27001 certifications from critical service providers.",
      "Include 'Right to Audit' clauses in all vendor contracts.",
      "Perform annual re-assessments of all critical vendors."
    ],
    difficulty: "Medium",
    timeEstimate: "1–2 weeks",
    urgency: "this_month",
    links: ["https://owasp.org/www-project-vendor-security-questionnaire/"]
  },

  no_pentest: {
    action: "Perform Regular Security Testing and Penetration Tests",
    whyItMatters: "Unknown vulnerabilities in your application are being exploited every day. Regular testing finds issues before attackers do.",
    steps: [
      "Start with free automated scanning: OWASP ZAP, Nikto for web applications.",
      "Use 'npm audit' and 'snyk test' for dependency vulnerabilities.",
      "Run OWASP Top 10 checks manually or with Burp Suite Community Edition.",
      "For production systems: hire a professional penetration tester annually.",
      "Implement a Vulnerability Disclosure Policy (VDP) or Bug Bounty program."
    ],
    difficulty: "High",
    timeEstimate: "Ongoing",
    urgency: "this_month",
    links: ["https://www.zaproxy.org/", "https://portswigger.net/burp/communitydownload"]
  },

  no_backups: {
    action: "Implement an Automated Backup Strategy",
    whyItMatters: "Without backups, a ransomware attack, accidental deletion, or hardware failure means permanent data loss. Ransomware attacks have doubled year-over-year.",
    steps: [
      "Configure automated daily database backups.",
      "Follow the 3-2-1 rule: 3 copies, 2 different media types, 1 offsite.",
      "Encrypt all backups at rest using AES-256.",
      "Store backups in a geographically separate location (different cloud region).",
      "Test backup restoration quarterly to verify data integrity."
    ],
    difficulty: "Medium",
    timeEstimate: "1–2 days",
    urgency: "this_week",
    links: ["https://www.backblaze.com/blog/the-3-2-1-backup-strategy/"]
  },

  unprotected_endpoints: {
    action: "Enable Full Endpoint Security Suite",
    whyItMatters: "Unprotected devices are entry points for malware, ransomware, and data theft. 68% of organizations experienced endpoint attacks that compromised data.",
    steps: [
      "Enable full-disk encryption: BitLocker (Windows) or FileVault (macOS).",
      "Install reputable antivirus/EDR: Windows Defender (free) or Malwarebytes.",
      "Enable automatic screen lock after 5 minutes of inactivity.",
      "Enable firewall on all devices.",
      "For work devices: consider Mobile Device Management (MDM) like Microsoft Intune."
    ],
    difficulty: "Low",
    timeEstimate: "2–4 hours",
    urgency: "immediate",
    links: ["https://support.microsoft.com/en-us/windows/turn-on-device-encryption-0c453637-bc88-5f74-5105-741561aae838"]
  },

  password_reuse: {
    action: "Adopt a Password Manager",
    whyItMatters: "Password reuse means one breached service exposes all your accounts. Over 80% of hacking-related breaches involve stolen or reused credentials.",
    steps: [
      "Sign up for Bitwarden (free) or 1Password and install browser extensions.",
      "Import any existing saved passwords from your browser.",
      "Generate unique, 20+ character passwords for every new account.",
      "Enable emergency access and set up secure account recovery.",
      "Enable 2FA on your password manager account itself."
    ],
    difficulty: "Low",
    timeEstimate: "1–2 hours",
    urgency: "immediate",
    links: ["https://bitwarden.com/", "https://1password.com/"]
  },

  unsafe_remote_access: {
    action: "Use a VPN for All Remote Work",
    whyItMatters: "Public Wi-Fi is routinely monitored by attackers. Any data sent over public Wi-Fi without encryption (including HTTPS sessions) can be intercepted through various attacks.",
    steps: [
      "Subscribe to a reputable VPN: ProtonVPN, Mullvad, or your company's corporate VPN.",
      "Enable 'VPN on startup' and 'kill switch' to prevent traffic leaking if VPN drops.",
      "For business: deploy a corporate VPN (OpenVPN, WireGuard) for all employees.",
      "Educate your team: never access corporate systems without VPN enabled.",
      "Alternatively, implement Zero Trust Network Access (ZTNA) for modern setups."
    ],
    difficulty: "Low",
    timeEstimate: "1–2 hours",
    urgency: "immediate",
    links: ["https://protonvpn.com/", "https://www.wireguard.com/"]
  },

  no_compliance_awareness: {
    action: "Conduct a Regulatory Compliance Assessment",
    whyItMatters: "Ignorance of regulations is not a legal defense. GDPR fines can reach €20M, PCI-DSS non-compliance can result in card processing termination, and HIPAA violations carry criminal penalties.",
    steps: [
      "Identify which regulations apply: GDPR (EU users), HIPAA (US health data), PCI-DSS (payment cards).",
      "Conduct a gap analysis using free templates from NIST or SANS.",
      "Create a compliance roadmap prioritizing the highest-risk gaps.",
      "Consider engaging a compliance consultant or using a GRC tool.",
      "Document all compliance activities for audit purposes."
    ],
    difficulty: "High",
    timeEstimate: "2–4 weeks",
    urgency: "this_month",
    links: ["https://www.nist.gov/cyberframework", "https://gdpr.eu/compliance/"]
  }
};

module.exports = remediationBank;
