/**
 * SCORING ENGINE
 * Weighted average scoring: (sum of scoreValue * weight) / (max possible weighted score) * 10
 * Categorizes findings into critical, warning, and good_practice.
 */

// Context-aware finding descriptions mapped to risk factors
const findingDescriptions = {
  no_auth: "Your application has no authentication. Anyone on the internet can access all data and functionality without logging in. This is the single most dangerous vulnerability possible.",
  missing_mfa: "Users rely on passwords alone. If a password is leaked, phished, or brute-forced, the attacker gains full access with zero additional barriers.",
  optional_mfa: "MFA exists but is optional. Most users will skip it, leaving their accounts vulnerable to credential-based attacks.",
  no_brute_force_protection: "There is no limit on login attempts. Attackers can try millions of passwords per second until they find the right one.",
  weak_brute_force_protection: "Basic CAPTCHA provides minimal protection. Sophisticated attackers can bypass CAPTCHA using automated solvers.",
  insecure_sessions: "Session tokens stored in localStorage are exposed to any XSS attack. A single malicious script can steal every active user session.",
  weak_sessions: "Sessions use HttpOnly cookies but lack token rotation. If a session token is intercepted, it remains valid until expiry.",
  unverified_mfa: "MFA enforcement is self-reported with no automated verification. Users may believe MFA is active when it can actually be bypassed.",
  bypassable_mfa: "MFA policy allows bypass for some users. These bypass accounts become the primary target for attackers.",
  plaintext_passwords: "Passwords are stored in plain text. A single database breach exposes every user's credentials instantly — including passwords they reuse on other sites.",
  weak_hashing: "Passwords are hashed with MD5 or SHA-1, which are cryptographically broken. Attackers with GPU clusters can crack millions of these hashes per second.",
  no_encryption_at_rest: "Sensitive data sits unencrypted in the database. Any database breach, backup leak, or unauthorized access exposes all user data in readable form.",
  partial_encryption: "Only some sensitive fields are encrypted. Unencrypted fields remain fully exposed in the event of a breach.",
  no_privacy_policy: "There is no privacy policy or user consent mechanism. This is a direct violation of GDPR, and users have no way to know how their data is used.",
  weak_privacy_policy: "A basic privacy policy exists but lacks granular consent controls. Users cannot selectively opt out of data collection practices.",
  no_https: "All communication is sent over unencrypted HTTP. Attackers on the same network can read passwords, session tokens, and personal data in real time.",
  mixed_content: "Some pages use HTTP while others use HTTPS. Attackers can intercept data on the unencrypted pages and use it to compromise secure sessions.",
  high_exposure: "The system is directly accessible from the public internet. Every vulnerability is discoverable by automated scanners within minutes of deployment.",
  medium_exposure: "The system is partially exposed with some public endpoints. Attackers can probe these endpoints to find weaknesses.",
  no_rate_limiting: "API endpoints have no rate limiting or abuse protection. Attackers can flood endpoints with requests, scrape data, or launch denial-of-service attacks.",
  weak_api_security: "Basic API key authentication provides minimal security. API keys are easily leaked through logs, URLs, or client-side code.",
  no_input_validation: "User input is not validated on the backend. This opens the door to SQL injection, XSS, command injection, and other code execution attacks.",
  weak_input_validation: "Basic input checks exist but no schema validation library is used. Edge cases and complex payloads can bypass these checks.",
  hardcoded_secrets: "API keys and database credentials are hardcoded directly in source code. Anyone with access to the codebase (including public Git repos) can steal these secrets.",
  exposed_env_secrets: "Secrets are stored in .env files committed to version control. These are visible in the repository history even if later removed.",
  weak_secrets_mgmt: ".env files are used locally but excluded from git. This is acceptable for development but not for production deployments.",
  over_privileged_access: "Root or admin credentials are used for everything. If one account is compromised, the attacker has full control over the entire system.",
  weak_iam: "Some role separation exists but is not enforced. Users may accumulate privileges over time without review.",
  weak_access_control: "Access is informally limited by job role with no technical enforcement. Any team member can access sensitive systems.",
  no_monitoring: "There is no logging or monitoring. Attackers can operate inside your systems for months without being detected.",
  weak_monitoring: "Basic server logs exist but there is no real-time alerting. Attacks are only discovered when damage is already done.",
  outdated_dependencies: "Software dependencies are rarely or never updated. Known vulnerabilities (like Log4Shell) remain exploitable indefinitely.",
  unvetted_dependencies: "Third-party libraries are installed without any security review. Malicious packages can steal data or inject backdoors.",
  weak_dependency_vetting: "Libraries are checked by popularity only. Popular packages can still contain vulnerabilities or be compromised via supply chain attacks.",
  no_ir_plan: "No Incident Response plan exists. When a breach occurs, the team will panic and make critical errors that worsen the damage.",
  weak_ir_plan: "An informal IR process exists but is not documented. Key steps may be forgotten under the pressure of a real incident.",
  no_security_training: "No security awareness training is provided. Team members are the weakest link — vulnerable to phishing, social engineering, and accidental data exposure.",
  weak_security_training: "Occasional training sessions occur but lack depth. Without regular reinforcement, security awareness fades quickly.",
  no_vendor_assessment: "Third-party vendors are trusted implicitly. A breach at a vendor with access to your systems compromises your data too.",
  weak_vendor_assessment: "Vendor security is informally checked during onboarding only. Vendor security posture can degrade over time without ongoing review.",
  no_pentest: "Security audits and penetration tests have never been performed. Vulnerabilities remain hidden until an attacker finds them first.",
  weak_pentest: "Security audits are ad-hoc, only when a breach is suspected. Proactive testing would catch vulnerabilities before attackers do.",
  stale_security_validation: "The last comprehensive security audit was over 12 months ago. Your threat landscape has changed since then — new vulnerabilities emerge daily.",
  no_backups: "There is no formal backup process. A ransomware attack, hardware failure, or accidental deletion means permanent data loss.",
  untested_backups: "Automated backups exist but have never been tested. Backups that can't be restored are as useless as having no backups at all.",
  no_bcp: "No Business Continuity or Disaster Recovery plan exists. A major outage could shut down operations with no path to recovery.",
  weak_bcp: "An informal recovery understanding exists but is not documented. Without written procedures, recovery will be slow and error-prone.",
  poor_offboarding: "Access credentials are often not revoked when employees leave. Former employees retain access to sensitive systems and data.",
  weak_offboarding: "Access is revoked but not centrally managed. Some accounts or services may be missed during offboarding.",
  no_compliance_awareness: "There is no awareness of applicable data protection regulations. This exposes the organization to significant legal and financial penalties.",
  non_compliant: "Regulatory requirements are known but no formal compliance steps have been taken. Regulators can impose penalties at any time.",
  no_waf: "No Web Application Firewall or DDoS protection is in place. The application is defenseless against automated attacks and traffic floods.",
  weak_waf: "Basic rate limiting is in place but no WAF. Sophisticated attacks like SQL injection or XSS bypass simple rate limits entirely.",
  unprotected_endpoints: "Personal devices have no antivirus or disk encryption. If stolen, all data on the device is immediately accessible.",
  weak_endpoint_security: "Antivirus is installed but disk encryption is missing. A stolen device exposes all local files and cached credentials.",
  password_reuse: "The same password is reused across multiple sites. A breach on any one site compromises all other accounts using that password.",
  weak_password_management: "Passwords are stored in a plain text file. If the device is compromised, every password is immediately exposed.",
  unsafe_remote_access: "Work systems are accessed over public Wi-Fi without a VPN. Attackers on the same network can intercept all traffic.",
  weak_remote_access: "Home network is used without a VPN. While safer than public Wi-Fi, it still lacks the encryption and access controls of a corporate VPN.",
  unpatched_systems: "Software updates are often delayed or skipped. Known vulnerabilities remain exploitable until patches are applied.",
  weak_patch_management: "Updates are installed when reminded but not proactively managed. Critical patches may be delayed for weeks.",
};

const calculateScore = (answers, confidence = null) => {
  if (!answers || answers.length === 0) {
    return { overallScore: 0, riskLevel: 'high', maturityLevel: 'Level 1: Reactive', findings: [], riskFactors: [] };
  }

  let weightedTotal = 0;
  let weightedMax = 0;
  const findings = [];
  const riskFactors = [];

  for (const answer of answers) {
    let weight = answer.weight || 1;
    
    // EXPOSURE CONTEXT: Vulnerabilities on public-facing assets matter more
    if (riskFactors.includes('high_exposure') && answer.score_value < 5) {
      weight *= 1.3;
    }

    // TEMPORAL DECAY: Stale audits reduce the "weight" of governance trust
    if (riskFactors.includes('stale_security_validation') && answer.category === 'Governance') {
      weight *= 0.5;
    }

    weightedTotal += answer.score_value * weight;
    weightedMax += 10 * weight;

    // Severity tiering
    let severity;
    if (answer.score_value <= 3) severity = 'critical';
    else if (answer.score_value <= 5) severity = 'high';
    else if (answer.score_value <= 7) severity = 'medium';
    else severity = 'good_practice';

    if (severity !== 'good_practice') {
      const contextDescription = answer.risk_factor && findingDescriptions[answer.risk_factor]
        ? findingDescriptions[answer.risk_factor]
        : `Your response "${answer.selected_option_text}" for "${answer.question_text}" indicates a security gap in ${answer.category}.`;
      
      findings.push({
        severity,
        category: answer.category,
        title: `${severity.toUpperCase()}: ${answer.category}`,
        description: contextDescription,
        riskFactor: answer.risk_factor,
      });
      if (answer.risk_factor) riskFactors.push(answer.risk_factor);
    } else {
      findings.push({
        severity: 'good_practice',
        category: answer.category,
        title: `Good Practice: ${answer.category}`,
        description: `Your response "${answer.selected_option_text}" demonstrates a strong security posture in this area.`,
        riskFactor: null,
      });
    }
  }

  let rawScore = weightedMax > 0 ? (weightedTotal / weightedMax) * 10 : 0;

  // COMPOUND RISK MULTIPLIERS (Exploit Chain Logic)
  let multiplier = 1.0;
  
  // 1. Authentication Collapse (No MFA + No Lockout)
  if (riskFactors.includes('missing_mfa') && riskFactors.includes('no_brute_force_protection')) {
    multiplier *= 0.8; // Compound penalty
  }

  // 2. Recovery Failure Pathway (No Backups + No IR Plan)
  if (riskFactors.includes('no_backups') && riskFactors.includes('no_ir_plan')) {
    multiplier *= 0.7; // Severe compound penalty
  }

  // 3. Exposed Infrastructure (High Exposure + Hardcoded Secrets)
  if (riskFactors.includes('high_exposure') && riskFactors.includes('hardcoded_secrets')) {
    multiplier *= 0.6; // Catastrophic risk
  }

  // 4. Compliance Paradox (Compliance Claimed + Foundational Gaps)
  if (riskFactors.includes('no_privacy_policy') && riskFactors.includes('no_encryption_at_rest')) {
    multiplier *= 0.9;
  }

  // Foundational Multipliers (Non-Linear Cascading Risk)
  if (riskFactors.includes('no_encryption_at_rest')) multiplier = Math.min(multiplier, 0.6);
  if (riskFactors.includes('plaintext_passwords')) multiplier = Math.min(multiplier, 0.5);
  if (riskFactors.includes('no_https')) multiplier = Math.min(multiplier, 0.7);
  if (riskFactors.includes('hardcoded_secrets')) multiplier = Math.min(multiplier, 0.6);
  if (riskFactors.includes('no_auth')) multiplier = Math.min(multiplier, 0.4);

  rawScore *= multiplier;

  // Max score capping
  if (rawScore > 9.5) rawScore = 9.5;

  // Confidence capping
  if (confidence && confidence.confidenceScore < 60) {
    if (rawScore > 8.0) {
      rawScore = 8.0;
    }
  }

  // Residual Baseline Risk (floor at 1.5 unless catastrophic)
  if (rawScore < 1.5) {
    const isCatastrophic = riskFactors.includes('no_auth') || (riskFactors.includes('plaintext_passwords') && riskFactors.includes('exposed_env_secrets'));
    if (!isCatastrophic) {
      rawScore = 1.5;
    }
  }

  const overallScore = parseFloat(rawScore.toFixed(1));

  let riskLevel =
    overallScore >= 7.5 ? 'low' :
      overallScore >= 5.0 ? 'medium' :
        overallScore >= 2.5 ? 'high' : 'critical';

  // Qualify labels if confidence is low
  if (confidence && confidence.confidenceScore < 60) {
    riskLevel = `provisional_${riskLevel}`;
  }

  // Maturity Modeling
  let maturityLevel = 'Level 1: Reactive';
  if (overallScore >= 8.5) maturityLevel = 'Level 5: Resilient';
  else if (overallScore >= 7.0) maturityLevel = 'Level 4: Managed';
  else if (overallScore >= 5.0) maturityLevel = 'Level 3: Defined';
  else if (overallScore >= 2.5) maturityLevel = 'Level 2: Developing';

  // Cap maturity if confidence is low
  if (confidence && confidence.confidenceScore < 60) {
    if (maturityLevel === 'Level 5: Resilient' || maturityLevel === 'Level 4: Managed') {
      maturityLevel = 'Level 3: Defined (Provisional)';
    } else {
      maturityLevel = `${maturityLevel} (Provisional)`;
    }
  }

  return {
    overallScore,
    riskLevel,
    maturityLevel,
    findings,
    riskFactors: [...new Set(riskFactors)], // deduplicated
  };
};

module.exports = { calculateScore };
