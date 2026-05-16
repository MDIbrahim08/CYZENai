/**
 * COMPLIANCE RULES ENGINE
 * Maps user profile + risk factors to regulatory framework requirements
 */

const complianceFrameworks = {
  GDPR: {
    name: "General Data Protection Regulation",
    fullName: "GDPR (EU) 2016/679",
    jurisdiction: "European Union (applies to any org collecting EU residents' data)",
    maxPenalty: "€20,000,000 or 4% of global annual turnover (whichever is higher)",
    applicableWhen: (profile) =>
      profile.collects_user_data || profile.role === "business_owner" || profile.role === "startup_founder",
    requirements: [
      {
        id: "GDPR_1",
        article: "Art. 5 & 6",
        title: "Lawful Basis for Processing",
        description: "You must have a documented lawful basis for every type of personal data you collect and process.",
        checkedBy: (riskFactors) => !riskFactors.includes("no_privacy_policy"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("weak_privacy_policy"),
      },
      {
        id: "GDPR_2",
        article: "Art. 13 & 14",
        title: "Transparency & Privacy Notice",
        description: "Users must be informed about what data is collected, why, how long it is kept, and their rights.",
        checkedBy: (riskFactors) => !riskFactors.includes("no_privacy_policy") && !riskFactors.includes("weak_privacy_policy"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("weak_privacy_policy"),
      },
      {
        id: "GDPR_3",
        article: "Art. 17",
        title: "Right to Erasure (Right to be Forgotten)",
        description: "Users have the right to request deletion of their personal data, and you must be able to comply.",
        checkedBy: (riskFactors) => !riskFactors.includes("no_privacy_policy"),
        partiallyMetBy: () => false,
      },
      {
        id: "GDPR_4",
        article: "Art. 25",
        title: "Data Protection by Design and Default",
        description: "Privacy must be built into your system architecture, not added as an afterthought.",
        checkedBy: (riskFactors) =>
          !riskFactors.includes("no_encryption_at_rest") && !riskFactors.includes("plaintext_passwords"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("partial_encryption"),
      },
      {
        id: "GDPR_5",
        article: "Art. 32",
        title: "Security of Processing",
        description: "Appropriate technical and organizational measures must be in place (encryption, pseudonymization, access controls).",
        checkedBy: (riskFactors) =>
          !riskFactors.includes("no_https") &&
          !riskFactors.includes("plaintext_passwords") &&
          !riskFactors.includes("no_encryption_at_rest"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("mixed_content") || riskFactors.includes("weak_hashing"),
      },
      {
        id: "GDPR_6",
        article: "Art. 33",
        title: "Data Breach Notification (72-hour rule)",
        description: "In the event of a personal data breach, you must notify the supervisory authority within 72 hours.",
        checkedBy: (riskFactors) => !riskFactors.includes("no_ir_plan"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("weak_ir_plan"),
      },
    ],
  },

  PCI_DSS: {
    name: "Payment Card Industry Data Security Standard",
    fullName: "PCI-DSS v4.0",
    jurisdiction: "Global (applies to any org handling credit/debit card data)",
    maxPenalty: "$5,000–$100,000/month until compliance is achieved; may result in loss of card processing ability",
    applicableWhen: (profile) => profile.handles_payments,
    requirements: [
      {
        id: "PCI_1",
        article: "Req. 2",
        title: "Apply Secure Configurations",
        description: "Do not use vendor-supplied defaults for system passwords. Develop configuration standards for all system components.",
        checkedBy: (riskFactors) => !riskFactors.includes("hardcoded_secrets") && !riskFactors.includes("exposed_env_secrets"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("weak_secrets_mgmt"),
      },
      {
        id: "PCI_2",
        article: "Req. 3",
        title: "Protect Stored Account Data",
        description: "Cardholder data must be protected using strong cryptography. PAN must never be stored unencrypted.",
        checkedBy: (riskFactors) => !riskFactors.includes("no_encryption_at_rest") && !riskFactors.includes("plaintext_passwords"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("partial_encryption"),
      },
      {
        id: "PCI_3",
        article: "Req. 4",
        title: "Protect Cardholder Data with Strong Cryptography During Transmission",
        description: "All transmissions of cardholder data over open networks must be encrypted.",
        checkedBy: (riskFactors) => !riskFactors.includes("no_https") && !riskFactors.includes("mixed_content"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("mixed_content"),
      },
      {
        id: "PCI_4",
        article: "Req. 6",
        title: "Develop and Maintain Secure Systems and Software",
        description: "Protect all system components from known vulnerabilities by installing security patches.",
        checkedBy: (riskFactors) => !riskFactors.includes("outdated_dependencies") && !riskFactors.includes("unvetted_dependencies"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("outdated_dependencies"),
      },
      {
        id: "PCI_5",
        article: "Req. 7",
        title: "Restrict Access to System Components",
        description: "Limit access to system components and cardholder data to only those individuals whose job requires such access.",
        checkedBy: (riskFactors) => !riskFactors.includes("over_privileged_access"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("weak_access_control"),
      },
      {
        id: "PCI_6",
        article: "Req. 8",
        title: "Identify Users and Authenticate Access to System Components",
        description: "All users must be identified and authenticated with strong credentials including MFA for administrative access.",
        checkedBy: (riskFactors) => !riskFactors.includes("missing_mfa") && !riskFactors.includes("no_auth"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("optional_mfa"),
      },
      {
        id: "PCI_7",
        article: "Req. 10",
        title: "Log and Monitor All Access to System Components",
        description: "Logging mechanisms must be in place to track and monitor all access to network resources and cardholder data.",
        checkedBy: (riskFactors) => !riskFactors.includes("no_monitoring"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("weak_monitoring"),
      },
      {
        id: "PCI_8",
        article: "Req. 12",
        title: "Support Information Security with Organizational Policies and Programs",
        description: "An information security policy that addresses all PCI DSS requirements must be established and maintained.",
        checkedBy: (riskFactors) => !riskFactors.includes("no_ir_plan"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("weak_ir_plan"),
      },
    ],
  },

  HIPAA: {
    name: "Health Insurance Portability and Accountability Act",
    fullName: "HIPAA Security Rule (45 CFR Part 164)",
    jurisdiction: "United States (applies to covered entities and business associates handling PHI)",
    maxPenalty: "$100–$50,000 per violation; up to $1.9 million per violation category per year; criminal penalties up to 10 years imprisonment",
    applicableWhen: (profile) => profile.handles_health_data,
    requirements: [
      {
        id: "HIPAA_1",
        article: "§164.312(a)(1)",
        title: "Access Control",
        description: "Implement technical policies to allow only authorized persons or software to access electronic PHI.",
        checkedBy: (riskFactors) => !riskFactors.includes("over_privileged_access") && !riskFactors.includes("no_auth"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("weak_access_control"),
      },
      {
        id: "HIPAA_2",
        article: "§164.312(a)(2)(iv)",
        title: "Encryption and Decryption of ePHI",
        description: "Electronic PHI must be encrypted at rest and in transit to ensure it cannot be intercepted.",
        checkedBy: (riskFactors) => !riskFactors.includes("no_https") && !riskFactors.includes("no_encryption_at_rest"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("mixed_content") || riskFactors.includes("partial_encryption"),
      },
      {
        id: "HIPAA_3",
        article: "§164.312(b)",
        title: "Audit Controls",
        description: "Hardware, software, and procedural mechanisms must record and examine activity in systems containing ePHI.",
        checkedBy: (riskFactors) => !riskFactors.includes("no_monitoring"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("weak_monitoring"),
      },
      {
        id: "HIPAA_4",
        article: "§164.308(a)(5)",
        title: "Security Awareness and Training",
        description: "All workforce members must receive security awareness training, including protection from malicious software.",
        checkedBy: (riskFactors) => !riskFactors.includes("no_security_training"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("weak_security_training"),
      },
      {
        id: "HIPAA_5",
        article: "§164.308(a)(6)",
        title: "Security Incident Procedures",
        description: "Procedures must be in place to identify, respond to, and mitigate security incidents, including breaches of ePHI.",
        checkedBy: (riskFactors) => !riskFactors.includes("no_ir_plan"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("weak_ir_plan"),
      },
      {
        id: "HIPAA_6",
        article: "§164.308(a)(7)",
        title: "Contingency Plan (Backup & Disaster Recovery)",
        description: "Establish and implement policies to respond to emergencies that damage systems containing ePHI.",
        checkedBy: (riskFactors) => !riskFactors.includes("no_backups") && !riskFactors.includes("no_bcp"),
        partiallyMetBy: (riskFactors) => riskFactors.includes("untested_backups") || riskFactors.includes("weak_bcp"),
      },
    ],
  },
};

module.exports = complianceFrameworks;
