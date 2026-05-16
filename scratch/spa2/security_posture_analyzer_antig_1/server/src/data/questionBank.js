/**
 * ADAPTIVE SECURITY POSTURE ANALYZER
 * Question Bank — 32 questions across 8 security domains
 *
 * applicableRoles: [] = all roles
 * applicableTargets: [] = all targets
 * weight: multiplier for scoring importance (default 1)
 */

const questionBank = [
  // ─── AUTHENTICATION ──────────────────────────────────────────────────
  {
    id: "Q_AUTH_001",
    text: "How do users authenticate into your application?",
    category: "Authentication",
    applicableRoles: ["developer", "it_admin", "student", "startup_founder", "business_owner"],
    applicableTargets: [],
    difficulty: "beginner",
    weight: 1.5,
    options: [
      { text: "No authentication — it is fully public", scoreValue: 0, riskFactor: "no_auth" },
      { text: "Username and password only", scoreValue: 2, riskFactor: "missing_mfa" },
      { text: "Username and password with optional MFA", scoreValue: 6, riskFactor: "optional_mfa" },
      { text: "MFA is enforced for all users", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_AUTH_002",
    text: "How does your application handle failed login attempts?",
    category: "Authentication",
    applicableRoles: ["developer", "it_admin", "student", "startup_founder", "business_owner"],
    applicableTargets: [],
    difficulty: "beginner",
    weight: 1.2,
    options: [
      { text: "No lockout — unlimited retries allowed", scoreValue: 0, riskFactor: "no_brute_force_protection" },
      { text: "Basic CAPTCHA after a few attempts", scoreValue: 5, riskFactor: "weak_brute_force_protection" },
      { text: "Account lockout after N failed attempts with alerting", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_AUTH_003",
    text: "How do you manage session tokens/cookies?",
    category: "Authentication",
    applicableRoles: ["developer", "student", "startup_founder"],
    applicableTargets: ["web_app", "mobile_app"],
    difficulty: "intermediate",
    weight: 1.2,
    options: [
      { text: "Stored in localStorage with no expiry", scoreValue: 0, riskFactor: "insecure_sessions" },
      { text: "HttpOnly cookies with short expiry, no refresh tokens", scoreValue: 6, riskFactor: "weak_sessions" },
      { text: "Secure, HttpOnly, SameSite cookies with token rotation", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_AUTH_004",
    text: "How is MFA enforcement verified across your organization?",
    category: "Authentication",
    applicableRoles: ["it_admin", "startup_founder", "business_owner"],
    applicableTargets: ["cloud_infra", "business_ops"],
    difficulty: "intermediate",
    weight: 1.1,
    options: [
      { text: "Self-reported only — no automated enforcement", scoreValue: 3, riskFactor: "unverified_mfa" },
      { text: "Enforced via policy but allows bypass for some users", scoreValue: 6, riskFactor: "bypassable_mfa" },
      { text: "Technically enforced via SSO/IdP conditional access with zero bypasses", scoreValue: 10, riskFactor: null }
    ]
  },

  // ─── DATA PROTECTION ─────────────────────────────────────────────────
  {
    id: "Q_DATA_001",
    text: "How is sensitive user data (like passwords) stored in your database?",
    category: "Data Protection",
    applicableRoles: ["developer", "student", "startup_founder"],
    applicableTargets: ["web_app", "mobile_app", "apis"],
    difficulty: "beginner",
    weight: 2.0,
    options: [
      { text: "Plain text or simple encoding (e.g., Base64)", scoreValue: 0, riskFactor: "plaintext_passwords" },
      { text: "Hashed using old algorithms (MD5, SHA-1)", scoreValue: 3, riskFactor: "weak_hashing" },
      { text: "Hashed with modern algorithms (bcrypt, Argon2) and salted", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_DATA_002",
    text: "Do you encrypt sensitive data stored in your database (e.g., PII, card data)?",
    category: "Data Protection",
    applicableRoles: ["developer", "it_admin", "startup_founder", "business_owner"],
    applicableTargets: ["web_app", "mobile_app", "cloud_infra"],
    difficulty: "intermediate",
    weight: 1.5,
    options: [
      { text: "No, data is stored in plain text", scoreValue: 0, riskFactor: "no_encryption_at_rest" },
      { text: "Some sensitive fields are encrypted", scoreValue: 5, riskFactor: "partial_encryption" },
      { text: "All sensitive fields are encrypted at rest using AES-256", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_DATA_003",
    text: "How do you handle data collected from users (privacy policy & consent)?",
    category: "Data Protection",
    applicableRoles: ["developer", "business_owner", "startup_founder"],
    applicableTargets: ["web_app", "mobile_app", "business_ops"],
    difficulty: "beginner",
    weight: 1.3,
    options: [
      { text: "No privacy policy or user consent mechanism", scoreValue: 0, riskFactor: "no_privacy_policy" },
      { text: "Basic privacy policy exists but no granular consent", scoreValue: 5, riskFactor: "weak_privacy_policy" },
      { text: "Clear consent flows, privacy policy, and right-to-deletion support", scoreValue: 10, riskFactor: null }
    ]
  },

  // ─── NETWORK SECURITY ────────────────────────────────────────────────
  {
    id: "Q_NET_001",
    text: "Is all communication between client and server encrypted?",
    category: "Network Security",
    applicableRoles: [],
    applicableTargets: [],
    difficulty: "beginner",
    weight: 1.5,
    options: [
      { text: "No, it uses plain HTTP", scoreValue: 0, riskFactor: "no_https" },
      { text: "Partial — some pages use HTTP, some HTTPS", scoreValue: 4, riskFactor: "mixed_content" },
      { text: "Yes, HTTPS is strictly enforced with HSTS", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_NET_002",
    text: "Do you use a Web Application Firewall (WAF) or DDoS protection?",
    category: "Network Security",
    applicableRoles: ["developer", "it_admin", "startup_founder"],
    applicableTargets: ["web_app", "apis", "cloud_infra"],
    difficulty: "intermediate",
    weight: 1.2,
    options: [
      { text: "No protection in place", scoreValue: 0, riskFactor: "no_waf" },
      { text: "Basic rate limiting only", scoreValue: 4, riskFactor: "weak_waf" },
      { text: "WAF + DDoS protection (e.g., Cloudflare, AWS Shield)", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_NET_003",
    text: "Is the target asset directly accessible from the public internet?",
    category: "Network Security",
    applicableRoles: ["developer", "it_admin", "startup_founder"],
    applicableTargets: ["web_app", "apis", "cloud_infra"],
    difficulty: "beginner",
    weight: 1.5,
    options: [
      { text: "Yes, fully public access", scoreValue: 2, riskFactor: "high_exposure" },
      { text: "Partial — behind a proxy or VPN with some public endpoints", scoreValue: 6, riskFactor: "medium_exposure" },
      { text: "No, strictly internal/private network only", scoreValue: 10, riskFactor: "low_exposure" }
    ]
  },

  // ─── API SECURITY ────────────────────────────────────────────────────
  {
    id: "Q_API_001",
    text: "How do you protect your API endpoints from abuse or DoS attacks?",
    category: "API Security",
    applicableRoles: ["developer", "it_admin", "startup_founder"],
    applicableTargets: ["web_app", "apis", "mobile_app"],
    difficulty: "intermediate",
    weight: 1.3,
    options: [
      { text: "No protection, open access", scoreValue: 0, riskFactor: "no_rate_limiting" },
      { text: "Basic API key authentication", scoreValue: 6, riskFactor: "weak_api_security" },
      { text: "Rate limiting, authentication, and input validation on all endpoints", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_API_002",
    text: "How do you validate and sanitize user input on the backend?",
    category: "API Security",
    applicableRoles: ["developer", "student", "startup_founder"],
    applicableTargets: ["web_app", "apis", "mobile_app"],
    difficulty: "beginner",
    weight: 1.5,
    options: [
      { text: "No validation — we trust client-side validation", scoreValue: 0, riskFactor: "no_input_validation" },
      { text: "Basic checks but no schema validation library", scoreValue: 4, riskFactor: "weak_input_validation" },
      { text: "Strict schema validation (e.g., Zod, Joi) on all endpoints", scoreValue: 10, riskFactor: null }
    ]
  },

  // ─── CLOUD & INFRASTRUCTURE ──────────────────────────────────────────
  {
    id: "Q_CLOUD_001",
    text: "How are secrets (API keys, DB connection strings) managed?",
    category: "Cloud Security",
    applicableRoles: ["developer", "it_admin", "startup_founder"],
    applicableTargets: ["cloud_infra", "web_app", "apis"],
    difficulty: "beginner",
    weight: 2.0,
    options: [
      { text: "Hardcoded directly in source code", scoreValue: 0, riskFactor: "hardcoded_secrets" },
      { text: "Stored in .env files committed to version control", scoreValue: 2, riskFactor: "exposed_env_secrets" },
      { text: ".env files excluded from git, used locally", scoreValue: 6, riskFactor: "weak_secrets_mgmt" },
      { text: "Dedicated secret manager (AWS Secrets Manager, HashiCorp Vault)", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_CLOUD_002",
    text: "How are your cloud IAM (Identity & Access Management) roles configured?",
    category: "Cloud Security",
    applicableRoles: ["it_admin", "startup_founder", "business_owner"],
    applicableTargets: ["cloud_infra"],
    difficulty: "intermediate",
    weight: 1.3,
    options: [
      { text: "Root/admin credentials used for everything", scoreValue: 0, riskFactor: "over_privileged_access" },
      { text: "Some role separation but not enforced", scoreValue: 5, riskFactor: "weak_iam" },
      { text: "Principle of least privilege enforced with separate roles per service", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_CLOUD_003",
    text: "Do you have logging and monitoring enabled for your infrastructure?",
    category: "Cloud Security",
    applicableRoles: ["it_admin", "startup_founder", "developer", "business_owner"],
    applicableTargets: ["cloud_infra", "web_app"],
    difficulty: "intermediate",
    weight: 1.2,
    options: [
      { text: "No logging or monitoring", scoreValue: 0, riskFactor: "no_monitoring" },
      { text: "Basic server logs, but no alerting", scoreValue: 4, riskFactor: "weak_monitoring" },
      { text: "Centralized logging with real-time alerting (e.g., CloudWatch, Datadog)", scoreValue: 10, riskFactor: null }
    ]
  },

  // ─── SUPPLY CHAIN ────────────────────────────────────────────────────
  {
    id: "Q_DEP_001",
    text: "How often do you update your software dependencies?",
    category: "Supply Chain",
    applicableRoles: ["developer", "student", "startup_founder"],
    applicableTargets: ["web_app", "mobile_app", "apis"],
    difficulty: "beginner",
    weight: 1.2,
    options: [
      { text: "Rarely or never", scoreValue: 0, riskFactor: "outdated_dependencies" },
      { text: "Occasionally, when a major issue is reported", scoreValue: 5, riskFactor: "outdated_dependencies" },
      { text: "Regularly with automated scanning tools (Snyk, Dependabot)", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_DEP_002",
    text: "Do you review or scan third-party libraries before integrating them?",
    category: "Supply Chain",
    applicableRoles: ["developer", "student", "startup_founder"],
    applicableTargets: ["web_app", "mobile_app", "apis"],
    difficulty: "intermediate",
    weight: 1.0,
    options: [
      { text: "No — we install and use them directly", scoreValue: 0, riskFactor: "unvetted_dependencies" },
      { text: "Check npm/GitHub stars and last update date", scoreValue: 5, riskFactor: "weak_dependency_vetting" },
      { text: "Formal security review including license and vulnerability scan", scoreValue: 10, riskFactor: null }
    ]
  },

  // ─── GOVERNANCE ──────────────────────────────────────────────────────
  {
    id: "Q_GOV_001",
    text: "Do you have a documented Incident Response (IR) plan?",
    category: "Governance",
    applicableRoles: ["it_admin", "business_owner", "startup_founder"],
    applicableTargets: [],
    difficulty: "intermediate",
    weight: 1.5,
    options: [
      { text: "No plan exists", scoreValue: 0, riskFactor: "no_ir_plan" },
      { text: "Informal, undocumented process", scoreValue: 4, riskFactor: "weak_ir_plan" },
      { text: "Formal documented IR plan, tested annually", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_GOV_002",
    text: "Do you conduct security awareness training for team members?",
    category: "Governance",
    applicableRoles: ["business_owner", "it_admin", "startup_founder"],
    applicableTargets: ["business_ops", "cloud_infra"],
    difficulty: "beginner",
    weight: 1.2,
    options: [
      { text: "No training is provided", scoreValue: 0, riskFactor: "no_security_training" },
      { text: "Occasional email or onboarding session only", scoreValue: 4, riskFactor: "weak_security_training" },
      { text: "Annual training with regular phishing simulations", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_GOV_003",
    text: "Do you assess the security posture of third-party vendors?",
    category: "Governance",
    applicableRoles: ["business_owner", "it_admin"],
    applicableTargets: ["business_ops"],
    difficulty: "intermediate",
    weight: 1.2,
    options: [
      { text: "No, we trust vendors implicitly", scoreValue: 0, riskFactor: "no_vendor_assessment" },
      { text: "Informal check during onboarding", scoreValue: 5, riskFactor: "weak_vendor_assessment" },
      { text: "Formal questionnaire and certification review (SOC2/ISO 27001)", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_GOV_004",
    text: "Do you perform regular security audits or penetration tests?",
    category: "Governance",
    applicableRoles: ["developer", "it_admin", "startup_founder", "business_owner"],
    applicableTargets: ["web_app", "cloud_infra", "apis", "business_ops"],
    difficulty: "intermediate",
    weight: 1.3,
    options: [
      { text: "Never", scoreValue: 0, riskFactor: "no_pentest" },
      { text: "Ad-hoc, only when a breach is suspected", scoreValue: 3, riskFactor: "weak_pentest" },
      { text: "Regular penetration testing and vulnerability assessments", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_GOV_005",
    text: "How recent was your last comprehensive security audit or penetration test?",
    category: "Governance",
    applicableRoles: ["it_admin", "business_owner", "startup_founder"],
    applicableTargets: ["web_app", "cloud_infra", "apis"],
    difficulty: "intermediate",
    weight: 1.2,
    options: [
      { text: "Over 2 years ago or never", scoreValue: 0, riskFactor: "stale_security_validation" },
      { text: "Within the last 12-24 months", scoreValue: 5, riskFactor: "stale_security_validation" },
      { text: "Within the last 12 months", scoreValue: 10, riskFactor: null }
    ]
  },

  // ─── BUSINESS CONTINUITY ─────────────────────────────────────────────
  {
    id: "Q_BCP_001",
    text: "How is your critical data backed up?",
    category: "Business Continuity",
    applicableRoles: [],
    applicableTargets: [],
    difficulty: "beginner",
    weight: 1.5,
    options: [
      { text: "No formal backup process", scoreValue: 0, riskFactor: "no_backups" },
      { text: "Automated backups, but never tested for recovery", scoreValue: 5, riskFactor: "untested_backups" },
      { text: "Automated, off-site backups with regular restoration drills", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_BCP_002",
    text: "Do you have a Business Continuity Plan (BCP) / Disaster Recovery plan?",
    category: "Business Continuity",
    applicableRoles: ["business_owner", "it_admin"],
    applicableTargets: ["business_ops", "cloud_infra"],
    difficulty: "intermediate",
    weight: 1.3,
    options: [
      { text: "No plan exists", scoreValue: 0, riskFactor: "no_bcp" },
      { text: "Informal understanding but not documented", scoreValue: 4, riskFactor: "weak_bcp" },
      { text: "Documented and tested BCP with defined RTO/RPO", scoreValue: 10, riskFactor: null }
    ]
  },

  // ─── ACCESS CONTROL ──────────────────────────────────────────────────
  {
    id: "Q_ACC_001",
    text: "How is access to sensitive systems or data controlled within your team?",
    category: "Access Control",
    applicableRoles: ["business_owner", "it_admin", "startup_founder"],
    applicableTargets: ["business_ops", "cloud_infra"],
    difficulty: "beginner",
    weight: 1.4,
    options: [
      { text: "Everyone on the team has equal access to everything", scoreValue: 0, riskFactor: "over_privileged_access" },
      { text: "Access is informally limited by job role", scoreValue: 5, riskFactor: "weak_access_control" },
      { text: "Role-Based Access Control (RBAC) with formal access reviews", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_ACC_002",
    text: "What happens to access credentials when an employee leaves?",
    category: "Access Control",
    applicableRoles: ["business_owner", "it_admin"],
    applicableTargets: ["business_ops"],
    difficulty: "beginner",
    weight: 1.3,
    options: [
      { text: "We often forget to revoke access immediately", scoreValue: 0, riskFactor: "poor_offboarding" },
      { text: "Access is revoked but not centrally managed", scoreValue: 5, riskFactor: "weak_offboarding" },
      { text: "Automated offboarding checklist with immediate SSO/AD revocation", scoreValue: 10, riskFactor: null }
    ]
  },

  // ─── PERSONAL DEVICES ────────────────────────────────────────────────
  {
    id: "Q_DEV_001",
    text: "Are the personal devices you use for work protected?",
    category: "Endpoint Security",
    applicableRoles: ["general_user", "freelancer", "student"],
    applicableTargets: ["personal_devices"],
    difficulty: "beginner",
    weight: 1.2,
    options: [
      { text: "No antivirus or disk encryption", scoreValue: 0, riskFactor: "unprotected_endpoints" },
      { text: "Antivirus only, no disk encryption", scoreValue: 5, riskFactor: "weak_endpoint_security" },
      { text: "Antivirus + full disk encryption (BitLocker/FileVault) + auto-lock", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_DEV_002",
    text: "How do you handle software updates on your devices?",
    category: "Endpoint Security",
    applicableRoles: ["general_user", "freelancer", "student"],
    applicableTargets: ["personal_devices"],
    difficulty: "beginner",
    weight: 1.0,
    options: [
      { text: "I often delay or skip updates", scoreValue: 0, riskFactor: "unpatched_systems" },
      { text: "I install updates when reminded", scoreValue: 5, riskFactor: "weak_patch_management" },
      { text: "Automatic updates enabled for OS and all applications", scoreValue: 10, riskFactor: null }
    ]
  },
  {
    id: "Q_DEV_003",
    text: "How do you manage your passwords?",
    category: "Endpoint Security",
    applicableRoles: ["general_user", "freelancer", "student"],
    applicableTargets: ["personal_devices"],
    difficulty: "beginner",
    weight: 1.2,
    options: [
      { text: "I reuse the same password across multiple sites", scoreValue: 0, riskFactor: "password_reuse" },
      { text: "I try to use different passwords but store them in a text file", scoreValue: 3, riskFactor: "weak_password_management" },
      { text: "I use a password manager (Bitwarden, 1Password, etc.)", scoreValue: 10, riskFactor: null }
    ]
  },

  // ─── REMOTE WORK ─────────────────────────────────────────────────────
  {
    id: "Q_REM_001",
    text: "What network do you use when accessing work systems remotely?",
    category: "Remote Work Security",
    applicableRoles: ["freelancer", "general_user", "it_admin"],
    applicableTargets: ["personal_devices", "business_ops"],
    difficulty: "beginner",
    weight: 1.2,
    options: [
      { text: "Public Wi-Fi without VPN", scoreValue: 0, riskFactor: "unsafe_remote_access" },
      { text: "Home network without VPN", scoreValue: 5, riskFactor: "weak_remote_access" },
      { text: "VPN required for all remote work access", scoreValue: 10, riskFactor: null }
    ]
  },

  // ─── COMPLIANCE ──────────────────────────────────────────────────────
  {
    id: "Q_COMP_001",
    text: "Are you aware of and compliant with relevant data protection regulations (GDPR, HIPAA, PCI-DSS)?",
    category: "Compliance",
    applicableRoles: ["business_owner", "startup_founder", "it_admin"],
    applicableTargets: ["business_ops", "web_app"],
    difficulty: "intermediate",
    weight: 1.3,
    options: [
      { text: "Not aware of any specific regulations", scoreValue: 0, riskFactor: "no_compliance_awareness" },
      { text: "Aware but have not taken formal steps", scoreValue: 4, riskFactor: "non_compliant" },
      { text: "Actively working to maintain compliance", scoreValue: 10, riskFactor: null }
    ]
  }
];

module.exports = questionBank;
