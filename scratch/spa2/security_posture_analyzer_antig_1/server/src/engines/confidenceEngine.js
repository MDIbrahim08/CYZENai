const questionBank = require('../data/questionBank');

/**
 * Calculates assessment confidence and detects logical contradictions.
 * @param {Array} answers - Array of answer objects { questionId, selectedOptionIndex }
 * @returns {Object} { confidenceScore, confidenceLevel, coveragePercentage, contradictions }
 */
function evaluateConfidence(answers) {
  if (!answers || answers.length === 0) {
    return {
      confidenceScore: 0,
      confidenceLevel: 'NONE',
      coveragePercentage: 0,
      contradictions: ['No answers provided']
    };
  }

  const answeredDomains = new Set();
  const riskFactors = new Set();
  const criticalDomainsAnswered = new Set();
  
  const criticalDomains = ['Authentication', 'Access Control', 'Data Protection', 'Secrets Management'];

  // Populate domains and risk factors
  answers.forEach(ans => {
    const q = questionBank.find(q => q.id === ans.questionId);
    if (q) {
      answeredDomains.add(q.category);
      if (criticalDomains.includes(q.category)) {
        criticalDomainsAnswered.add(q.category);
      }
      const selectedOption = q.options[ans.selectedOptionIndex];
      if (selectedOption && selectedOption.riskFactor) {
        riskFactors.add(selectedOption.riskFactor);
      }
    }
  });

  // Coverage Metric: Expect at least 5 domains for high confidence
  const expectedDomains = 5; 
  let coveragePercentage = Math.min((answeredDomains.size / expectedDomains) * 100, 100);
  
  let baseConfidence = coveragePercentage;
  let contradictions = [];

  // Critical Domain Penalty: If you skip critical domains, confidence drops even if coverage seems okay
  const missingCriticalCount = criticalDomains.length - criticalDomainsAnswered.size;
  let confidenceFactors = [];

  if (missingCriticalCount === 0) {
    confidenceFactors.push("High critical domain coverage.");
  } else {
    confidenceFactors.push(`Missing visibility into ${missingCriticalCount} critical security domains.`);
    baseConfidence -= (missingCriticalCount * 12); // Slightly more aggressive penalty
  }

  if (coveragePercentage >= 80) {
    confidenceFactors.push("Broad assessment across multiple domains.");
  }

  // Contradiction Detection Logic
  // Example 1: Claims compliance but has critical failures
  const hasCriticalDataFailure = riskFactors.has('plaintext_passwords') || riskFactors.has('no_encryption_at_rest') || riskFactors.has('no_auth');
  if (hasCriticalDataFailure && answers.some(a => {
    const q = questionBank.find(q => q.id === a.questionId);
    return q && q.id === 'Q_COMP_001' && a.selectedOptionIndex === 2; // Actively maintaining compliance
  })) {
    contradictions.push("User claims active compliance but has critical security failures (e.g., plaintext data or no auth).");
    confidenceFactors.push("Severe reliability penalty: Compliance claims conflict with reported technical reality.");
    baseConfidence -= 25;
  }

  // Example 2: Tested DR plan but no backups
  if (riskFactors.has('no_backups') && answers.some(a => {
    const q = questionBank.find(q => q.id === a.questionId);
    return q && q.id === 'Q_BCP_002' && a.selectedOptionIndex === 2; // Documented and tested BCP
  })) {
    contradictions.push("User claims a tested Disaster Recovery plan but has no formal backup process.");
    confidenceFactors.push("Logic gap: Tested recovery plan claimed despite no formal backups.");
    baseConfidence -= 25;
  }

  // Example 3: Semantic Contradiction: Regular Pentesting but Fundamental Gaps
  if ((riskFactors.has('outdated_dependencies') || riskFactors.has('hardcoded_secrets')) && answers.some(a => {
    const q = questionBank.find(q => q.id === a.questionId);
    return q && q.id === 'Q_GOV_004' && a.selectedOptionIndex === 2; // Regular audits/pentests
  })) {
    contradictions.push("User claims regular security audits/pentesting but reports fundamental flaws like hardcoded secrets or unpatched dependencies.");
    confidenceFactors.push("Consistency warning: Professional audits claimed alongside catastrophic fundamental gaps.");
    baseConfidence -= 20;
  }

  // Example 4: Behavioral Contradiction: MFA vs Shared Accounts
  if (riskFactors.has('over_privileged_access') && answers.some(a => {
    const q = questionBank.find(q => q.id === a.questionId);
    return q && q.id === 'Q_AUTH_001' && a.selectedOptionIndex === 3; // Enforced MFA
  })) {
    contradictions.push("User claims enforced MFA but also reports that everyone has root/equal access to everything.");
    confidenceFactors.push("Operational contradiction: Strong authentication claims vs zero access control.");
    baseConfidence -= 15;
  }

  // Example 5: RBAC but no authentication
  if (riskFactors.has('no_auth') && answers.some(a => {
    const q = questionBank.find(q => q.id === a.questionId);
    return q && q.id === 'Q_ACC_001' && a.selectedOptionIndex === 2; // RBAC
  })) {
    contradictions.push("User claims Role-Based Access Control but application has no authentication.");
    confidenceFactors.push("Logic gap: RBAC claimed for a public/unauthenticated application.");
    baseConfidence -= 20;
  }

  // Base Floor: If any positive answers were given, we shouldn't be at 0%
  const hasPositiveEvidence = answers.some(a => {
    const q = questionBank.find(q => q.id === a.questionId);
    return q && q.options[a.selectedOptionIndex].scoreValue > 5;
  });
  
  let finalConfidence = Math.max(hasPositiveEvidence ? 15 : 0, Math.min(100, baseConfidence));

  // Determine label
  let confidenceLevel = 'HIGH';
  if (finalConfidence < 40) confidenceLevel = 'LOW';
  else if (finalConfidence < 70) confidenceLevel = 'MEDIUM';

  return {
    confidenceScore: Math.round(finalConfidence),
    confidenceLevel,
    coveragePercentage: Math.round(coveragePercentage),
    contradictions,
    confidenceFactors
  };
}

module.exports = { evaluateConfidence };
