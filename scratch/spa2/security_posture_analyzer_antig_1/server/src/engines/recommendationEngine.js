const remediationBank = require('../data/remediationBank');

/**
 * RECOMMENDATION ENGINE
 * Generates a prioritized remediation roadmap from identified risk factors.
 * Tiers: immediate, this_week, this_month
 */

const generateRecommendations = (riskFactors, profile = {}, confidenceResult = {}) => {
  const recommendations = [];
  const riskSet = new Set(riskFactors);
  const isLowConfidence = (confidenceResult.confidenceScore || 100) < 60;
  const hasContradictions = (confidenceResult.contradictions || []).length > 0;

  // 1. Explainable Confidence Insight (The "Transparency" Layer)
  if (isLowConfidence || hasContradictions) {
    recommendations.push({
      riskFactor: 'confidence_insight',
      action: "Review Assessment Confidence & Reliability",
      whyItMatters: "The system has detected factors that may lower the reliability of this security assessment.",
      confidenceInsights: confidenceResult.confidenceFactors || [],
      steps: [
        "Provide more evidence by answering skipped questions in critical domains.",
        "Resolve logical contradictions flagged by the engine.",
        "Verify that self-reported 'Good Practices' are operationally enforced."
      ],
      difficulty: "Low",
      timeEstimate: "1 hour",
      urgency: "immediate",
      isInsight: true
    });
  }

  // Exposure Warning: Public Internet Visibility
  if (riskSet.has('high_exposure')) {
    recommendations.push({
      riskFactor: 'high_exposure_warning',
      action: "URGENT: Public Internet Exposure Detected",
      whyItMatters: "This system is directly accessible from the public internet, meaning every vulnerability is 10x more likely to be exploited by automated scanners.",
      attackNarrative: "1. Bots and automated scanners constantly crawl the public internet for known vulnerabilities. 2. Since your system is public, it will be found within minutes of deployment. 3. Any simple weakness (like a default password or unpatched library) will be immediately exploited without human intervention.",
      steps: [
        "Restrict access to a VPN or specific IP addresses if possible.",
        "Verify that no debug ports (like 5000, 8080) are exposed to the public.",
        "Implement a Web Application Firewall (WAF) to filter malicious traffic."
      ],
      difficulty: "Medium",
      timeEstimate: "1 day",
      urgency: "immediate"
    });
  }

  // Threat Chaining: Compound Risks
  if (riskSet.has('weak_hashing') && (riskSet.has('missing_mfa') || riskSet.has('optional_mfa'))) {
    const isCritical = (profile.overallScore || 10) < 4;
    recommendations.push({
      riskFactor: 'chain_account_takeover',
      action: isCritical ? "STOP CRITICAL: Account Takeover / Credential Stuffing Pathway" : "Address Account Takeover Pathway",
      whyItMatters: "The combination of weak password hashing and lack of mandatory MFA creates a severe threat path.",
      attackNarrative: "1. Attacker obtains leaked password hashes from a third-party breach or local exposure. 2. Attacker uses high-speed GPU clusters to crack the weak hashes. 3. Attacker uses the discovered passwords to log in to your system. 4. Since MFA is not required, the attacker gains full access immediately.",
      steps: ["Upgrade hashing to bcrypt/Argon2id.", "Enforce mandatory MFA."],
      difficulty: "High",
      timeEstimate: "3-5 days",
      urgency: "immediate",
      links: []
    });
  }

  if (riskSet.has('no_backups') && (riskSet.has('no_ir_plan') || riskSet.has('no_bcp'))) {
    recommendations.push({
      riskFactor: 'chain_ransomware_recovery',
      action: "Address Ransomware Recovery Failure Pathway",
      whyItMatters: "The lack of backups combined with no incident response planning means an attack could be terminal.",
      attackNarrative: "1. Malware or ransomware encrypts all local data and servers. 2. Attacker demands payment for decryption keys. 3. Without off-site backups, you have no way to restore data. 4. Without an IR plan, the business panics and makes critical errors during the breach, leading to permanent business closure.",
      steps: ["Implement automated off-site backups immediately.", "Draft a basic Incident Response (IR) plan focusing on ransomware recovery.", "Test restoring data from backups."],
      difficulty: "High",
      timeEstimate: "1-2 weeks",
      urgency: "immediate",
      links: []
    });
  }

  if (riskSet.has('no_https') && (riskSet.has('insecure_sessions') || riskSet.has('weak_sessions'))) {
    recommendations.push({
      riskFactor: 'chain_session_hijacking',
      action: "Address Session Hijacking Pathway",
      whyItMatters: "Using plain HTTP combined with insecure session handling allows for trivial session theft.",
      attackNarrative: "1. Attacker sits on the same network (e.g., public Wi-Fi). 2. Attacker intercepts the session cookie sent in plain HTTP. 3. Attacker injects the stolen cookie into their own browser. 4. Attacker is now logged in as the victim without ever needing a password.",
      steps: ["Enforce HTTPS across all endpoints.", "Set 'Secure' and 'HttpOnly' flags on all session cookies.", "Implement short session expiration times."],
      difficulty: "Medium",
      timeEstimate: "2-4 days",
      urgency: "immediate",
      links: []
    });
  }

  if ((riskSet.has('exposed_env_secrets') || riskSet.has('hardcoded_secrets')) && 
      (riskSet.has('weak_iam') || riskSet.has('over_privileged_access')) && 
      (riskSet.has('no_monitoring') || riskSet.has('weak_monitoring'))) {
    recommendations.push({
      riskFactor: 'chain_cloud_compromise',
      action: "Address Cloud Infrastructure Compromise Pathway",
      whyItMatters: "Exposed secrets and weak IAM create a 'silent kill' environment.",
      attackNarrative: "1. Attacker finds a hardcoded API key or .env file in a public repository. 2. Attacker uses the key to access your cloud environment. 3. Because the key has 'Admin' or overly broad permissions, the attacker can create new users or delete resources. 4. Lack of monitoring means the attacker operates for months without being noticed.",
      steps: ["Revoke and rotate all exposed secrets immediately.", "Implement a secrets manager.", "Enforce Least Privilege IAM roles.", "Enable CloudTrail or equivalent API logging with alerts."],
      difficulty: "High",
      timeEstimate: "1-2 weeks",
      urgency: "immediate",
      links: []
    });
  }

  for (const factor of riskFactors) {
    const remedy = remediationBank[factor];
    if (!remedy) continue;

    let customizedSteps = [...remedy.steps];
    let customizedAction = remedy.action;

    // Trust Modeling: Downgrade labels if confidence is low
    if (isLowConfidence || hasContradictions) {
      if (customizedAction.startsWith("Good Practice:")) {
        customizedAction = customizedAction.replace("Good Practice:", "Claimed Control (Unverified):");
      }
    }

    // Domain Specialization based on Profile
    if (profile.targetAsset === 'mobile_app') {
      if (factor === 'no_encryption_at_rest' || factor === 'plaintext_passwords') {
        customizedSteps.push("Implement encrypted local storage (e.g., iOS Keychain, Android Keystore).");
        customizedSteps.push("Support remote device wipe / MDM for corporate devices.");
      }
    } else if (profile.targetAsset === 'apis') {
      if (factor === 'no_input_validation' || factor === 'weak_input_validation') {
        customizedSteps.push("Implement strict schema validation (e.g., Zod, Joi).");
        customizedSteps.push("Ensure protection against SSRF and Mass Assignment.");
      }
    }

    if (profile.role === 'student' || profile.role === 'beginner') {
      // Filter out high-burden/enterprise steps for beginners
      customizedSteps = customizedSteps.filter(step => 
        !step.toLowerCase().includes("ci/cd") && 
        !step.toLowerCase().includes("drift detection") &&
        !step.toLowerCase().includes("iam reviews") &&
        !step.toLowerCase().includes("hsm") &&
        !step.toLowerCase().includes("soc2") &&
        !step.toLowerCase().includes("iso 27001") &&
        !step.toLowerCase().includes("annual penetration test")
      );

      customizedSteps = customizedSteps.map(step => 
        step.includes("Implement strict schema validation") ? "Use a simple validation library like Zod or express-validator." :
        step.includes("Upgrade hashing to bcrypt/Argon2id") ? "Switch to using the 'bcrypt' library for all passwords." :
        step.includes("Enforce HTTPS across all endpoints") ? "Turn on 'Force HTTPS' in your hosting provider's dashboard." : 
        step.includes("Provision a free SSL/TLS certificate") ? "Use a service like Let's Encrypt or your hosting's free SSL." : step
      );
    }

    recommendations.push({
      riskFactor: factor,
      action: customizedAction,
      whyItMatters: remedy.whyItMatters,
      steps: customizedSteps,
      difficulty: remedy.difficulty,
      timeEstimate: remedy.timeEstimate,
      urgency: remedy.urgency,
      links: remedy.links || [],
    });
  }

  // Elite Profile Handling (Level 4/5 Hardening) - Restricted to high-scale targets
  const isHighScale = ['cloud_infra', 'web_app', 'apis'].includes(profile.targetAsset);
  if (isHighScale && (recommendations.filter(r => !r.isInsight).length === 0 || (profile.overallScore || 0) > 8.5)) {
    const eliteAction = (profile.overallScore || 0) > 9 ? "Advanced Post-Maturity Hardening" : "Maintain and Verify Controls";
    recommendations.push({
      riskFactor: 'elite_hardening',
      action: eliteAction,
      whyItMatters: "Your posture is strong. These steps represent the next frontier of security to move from 'Resilient' to 'Adaptive'.",
      steps: [
        "Generate and verify a Software Bill of Materials (SBOM) for all production releases.",
        "Implement Canary Tokens (Honeytokens) in secrets managers and sensitive files to detect early breach attempts.",
        "Transition from traditional VPN to a Zero Trust Network Access (ZTNA) model.",
        "Automate continuous compliance and configuration drift detection (CSPM).", 
        "Conduct quarterly access and IAM reviews.", 
        "Schedule an annual third-party penetration test.",
        "Perform tabletop Incident Response (IR) exercises semi-annually."
      ],
      difficulty: "High",
      timeEstimate: "Ongoing",
      urgency: "this_month",
      links: []
    });
  }

  // Sort by urgency: immediate > this_week > this_month
  const urgencyOrder = { immediate: 0, this_week: 1, this_month: 2 };
  recommendations.sort(
    (a, b) => (urgencyOrder[a.urgency] ?? 3) - (urgencyOrder[b.urgency] ?? 3)
  );

  // Group into tiers
  const roadmap = {
    immediate: recommendations.filter((r) => r.urgency === 'immediate'),
    this_week: recommendations.filter((r) => r.urgency === 'this_week'),
    this_month: recommendations.filter((r) => r.urgency === 'this_month'),
  };

  return { recommendations, roadmap };
};

module.exports = { generateRecommendations };
