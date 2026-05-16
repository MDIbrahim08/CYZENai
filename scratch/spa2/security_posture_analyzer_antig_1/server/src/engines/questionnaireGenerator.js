const questionBank = require('../data/questionBank');

/**
 * Generates a tailored questionnaire of 15–25 questions
 * based on user role, target asset, and tech maturity.
 */
const generateQuestionnaire = (profile) => {
  const { role, targetAsset, techMaturity } = profile;

  // Filter questions relevant to this profile
  const filtered = questionBank.filter((q) => {
    const roleMatch =
      q.applicableRoles.length === 0 || q.applicableRoles.includes(role);
    const targetMatch =
      q.applicableTargets.length === 0 || q.applicableTargets.includes(targetAsset);
    // Exclude advanced questions for beginners
    const maturityMatch = techMaturity !== 'beginner' || q.difficulty !== 'advanced';

    return roleMatch && targetMatch && maturityMatch;
  });

  // Sort by weight descending to prioritize high-impact questions
  const sorted = [...filtered].sort((a, b) => (b.weight || 1) - (a.weight || 1));

  // Take up to 20 questions — top-weighted ones first, then shuffle the rest slightly
  const top = sorted.slice(0, 10);
  const rest = sorted.slice(10).sort(() => Math.random() - 0.5);
  const combined = [...top, ...rest].slice(0, 20);

  return combined;
};

module.exports = { generateQuestionnaire };
