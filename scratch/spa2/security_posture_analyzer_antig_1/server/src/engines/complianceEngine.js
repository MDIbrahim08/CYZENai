const complianceFrameworks = require('../data/complianceRules');

/**
 * COMPLIANCE ENGINE
 * Checks user answers (via risk factors) against applicable regulatory frameworks.
 * Returns per-framework compliance reports.
 */

const checkCompliance = (profile, riskFactors) => {
  const results = [];

  for (const [key, framework] of Object.entries(complianceFrameworks)) {
    // Check if this framework applies to the user's profile
    if (!framework.applicableWhen(profile)) continue;

    const requirementResults = framework.requirements.map((req) => {
      const isMet = req.checkedBy(riskFactors);
      const isPartial = !isMet && req.partiallyMetBy(riskFactors);

      let status;
      if (isMet) status = 'met';
      else if (isPartial) status = 'partial';
      else status = 'missing';

      return {
        id: req.id,
        article: req.article,
        title: req.title,
        description: req.description,
        status,
      };
    });

    const metCount = requirementResults.filter((r) => r.status === 'met').length;
    const partialCount = requirementResults.filter((r) => r.status === 'partial').length;
    const missingCount = requirementResults.filter((r) => r.status === 'missing').length;
    const total = requirementResults.length;

    let complianceScore = Math.round(
      ((metCount + partialCount * 0.5) / total) * 100
    );

    let hardStopTriggered = false;
    let hardStopReason = null;

    // Rule-Based Hard Stops
    if (key === 'GDPR' && (riskFactors.includes('no_privacy_policy') || riskFactors.includes('plaintext_passwords') || riskFactors.includes('no_https') || riskFactors.includes('weak_hashing') || riskFactors.includes('exposed_env_secrets') || riskFactors.includes('mixed_content'))) {
      complianceScore = 0;
      hardStopTriggered = true;
      hardStopReason = "Critical vulnerability detected (e.g., weak hashing, no HTTPS, or plaintext passwords). This triggers an automatic 0% score regardless of other requirements met.";
    }
    if (key === 'PCI_DSS' && (riskFactors.includes('plaintext_passwords') || riskFactors.includes('no_encryption_at_rest') || riskFactors.includes('hardcoded_secrets') || riskFactors.includes('no_https') || riskFactors.includes('mixed_content') || riskFactors.includes('exposed_env_secrets'))) {
      complianceScore = 0;
      hardStopTriggered = true;
      hardStopReason = "Critical vulnerability detected (e.g., hardcoded secrets or plaintext passwords). This triggers an automatic 0% score.";
    }
    if (key === 'HIPAA' && (riskFactors.includes('no_encryption_at_rest') || riskFactors.includes('no_auth') || riskFactors.includes('no_https') || riskFactors.includes('plaintext_passwords') || riskFactors.includes('mixed_content') || riskFactors.includes('weak_hashing'))) {
      complianceScore = 0;
      hardStopTriggered = true;
      hardStopReason = "Critical vulnerability detected (e.g., missing encryption or weak hashing). This triggers an automatic 0% score.";
    }

    results.push({
      key,
      name: framework.name,
      fullName: framework.fullName,
      jurisdiction: framework.jurisdiction,
      maxPenalty: framework.maxPenalty,
      complianceScore,
      hardStopTriggered,
      hardStopReason,
      metCount,
      partialCount,
      missingCount,
      total,
      requirements: requirementResults,
    });
  }

  return results;
};

module.exports = { checkCompliance };
