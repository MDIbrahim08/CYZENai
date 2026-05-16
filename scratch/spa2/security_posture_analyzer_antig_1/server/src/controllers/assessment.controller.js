const { v4: uuidv4 } = require('uuid');
const { get, run, query } = require('../config/db');
const { generateQuestionnaire } = require('../engines/questionnaireGenerator');
const { calculateScore } = require('../engines/scoringEngine');
const { checkCompliance } = require('../engines/complianceEngine');
const { generateRecommendations } = require('../engines/recommendationEngine');
const { evaluateConfidence } = require('../engines/confidenceEngine');

// POST /api/assessments/start
const startAssessment = async (req, res) => {
  const {
    role, targetAsset, techMaturity, organizationName,
    handlesPayments, handlesHealthData, collectsUserData, employeeCount
  } = req.body;

  if (!role || !targetAsset || !techMaturity) {
    return res.status(400).json({ success: false, message: 'Role, target asset, and tech maturity are required.' });
  }

  const profile = {
    role,
    targetAsset,
    techMaturity,
    handles_payments: handlesPayments || false,
    handles_health_data: handlesHealthData || false,
    collects_user_data: collectsUserData || false,
  };

  const questions = generateQuestionnaire(profile);

  if (questions.length === 0) {
    return res.status(400).json({ success: false, message: 'No questions found for this profile combination.' });
  }

  const sessionId = uuidv4();

  try {
    await run(`
      INSERT INTO assessment_sessions
      (id, user_id, role, target_asset, tech_maturity, organization_name, handles_payments, handles_health_data, collects_user_data, employee_count)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      sessionId,
      req.user.id,
      role, targetAsset, techMaturity,
      organizationName || null,
      handlesPayments ? 1 : 0,
      handlesHealthData ? 1 : 0,
      collectsUserData ? 1 : 0,
      employeeCount || null
    ]);

    res.status(201).json({
      success: true,
      message: 'Assessment session started.',
      data: {
        sessionId,
        questionCount: questions.length,
        questions: questions.map((q) => ({
          id: q.id,
          text: q.text,
          category: q.category,
          difficulty: q.difficulty,
          weight: q.weight,
          options: q.options.map((o) => ({ text: o.text })),
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to start assessment', error: error.message });
  }
};

// POST /api/assessments/:sessionId/submit
const submitAssessment = async (req, res) => {
  const { sessionId } = req.params;
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ success: false, message: 'Answers array is required.' });
  }

  try {
    const session = await get('SELECT * FROM assessment_sessions WHERE id = ? AND user_id = ?', [sessionId, req.user.id]);

    if (!session) {
      return res.status(404).json({ success: false, message: 'Assessment session not found.' });
    }
    if (session.status === 'completed') {
      return res.status(409).json({ success: false, message: 'This assessment has already been submitted.' });
    }

    const profile = {
      role: session.role,
      targetAsset: session.target_asset,
      techMaturity: session.tech_maturity,
      handles_payments: !!session.handles_payments,
      handles_health_data: !!session.handles_health_data,
      collects_user_data: !!session.collects_user_data,
    };

    const questions = generateQuestionnaire(profile);
    const questionMap = new Map(questions.map((q) => [q.id, q]));

    const enrichedAnswers = [];
    const confidenceInput = [];

    for (const ans of answers) {
      const question = questionMap.get(ans.questionId);
      if (!question) continue;

      const option = question.options[ans.selectedOptionIndex];
      if (!option) continue;

      const enriched = {
        question_id: question.id,
        question_text: question.text,
        category: question.category,
        selected_option_text: option.text,
        score_value: option.scoreValue,
        risk_factor: option.riskFactor || null,
        weight: question.weight || 1,
      };
      enrichedAnswers.push(enriched);
      confidenceInput.push({ questionId: question.id, selectedOptionIndex: ans.selectedOptionIndex });

      await run(`
        INSERT INTO session_answers
        (id, session_id, question_id, question_text, category, selected_option_text, score_value, risk_factor)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        uuidv4(), sessionId,
        enriched.question_id, enriched.question_text, enriched.category,
        enriched.selected_option_text, enriched.score_value, enriched.risk_factor
      ]);
    }

    const confidenceResults = evaluateConfidence(confidenceInput);
    const { overallScore, riskLevel, maturityLevel, findings, riskFactors } = calculateScore(enrichedAnswers, confidenceResults);
    
    // Set overallScore in profile for elite hardening logic in recommendation engine
    profile.overallScore = overallScore;
    
    const complianceResults = checkCompliance(profile, riskFactors);
    const { recommendations, roadmap } = generateRecommendations(riskFactors, profile, confidenceResults);

    for (const f of findings) {
      await run(`
        INSERT INTO findings (id, session_id, severity, category, title, description, risk_factor)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [uuidv4(), sessionId, f.severity, f.category, f.title, f.description, f.riskFactor || null]);
    }

    await run(`
      UPDATE assessment_sessions
      SET overall_score = ?, risk_level = ?, status = 'completed', completed_at = datetime('now')
      WHERE id = ?
    `, [overallScore, riskLevel, sessionId]);

    // Note: In a real app, we would also save confidenceResults and maturityLevel to the DB.
    // For now, we will return them in the response for the audit/test cases.

    const categoryScores = {};
    for (const ans of enrichedAnswers) {
      if (!categoryScores[ans.category]) {
        categoryScores[ans.category] = { total: 0, max: 0, count: 0 };
      }
      categoryScores[ans.category].total += ans.score_value;
      categoryScores[ans.category].max += 10;
      categoryScores[ans.category].count++;
    }
    const categoryBreakdown = Object.entries(categoryScores).map(([cat, data]) => ({
      category: cat,
      score: parseFloat(((data.total / data.max) * 10).toFixed(1)),
    }));

    res.json({
      success: true,
      message: 'Assessment completed.',
      data: {
        sessionId,
        overallScore,
        riskLevel,
        maturityLevel,
        confidence: confidenceResults,
        findings,
        categoryBreakdown,
        compliance: complianceResults,
        recommendations,
        roadmap,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit assessment', error: error.message });
  }
};

// GET /api/assessments
const listAssessments = async (req, res) => {
  try {
    const sessions = await query(`
      SELECT id, role, target_asset, tech_maturity, organization_name,
             overall_score, risk_level, status, created_at, completed_at
      FROM assessment_sessions
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 20
    `, [req.user.id]);

    res.json({ success: true, data: { sessions } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to list assessments', error: error.message });
  }
};

// GET /api/assessments/:sessionId
const getAssessment = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await get('SELECT * FROM assessment_sessions WHERE id = ? AND user_id = ?', [sessionId, req.user.id]);
    if (!session) {
      return res.status(404).json({ success: false, message: 'Assessment not found.' });
    }

    const answers = await query('SELECT * FROM session_answers WHERE session_id = ?', [sessionId]);
    const findings = await query('SELECT * FROM findings WHERE session_id = ?', [sessionId]);

    const riskFactors = [...new Set(answers.filter(a => a.risk_factor).map(a => a.risk_factor))];

    const profile = {
      role: session.role,
      targetAsset: session.target_asset,
      techMaturity: session.tech_maturity,
      handles_payments: !!session.handles_payments,
      handles_health_data: !!session.handles_health_data,
      collects_user_data: !!session.collects_user_data,
      overallScore: session.overall_score
    };

    const confidenceInputForRe = answers.map(a => ({ questionId: a.question_id, selectedOptionIndex: 0 })); // Simplified for re-calculation
    // Note: To be perfect, we'd need to store confidenceResults in the DB or re-map option text back to index.
    // For now, we pass empty confidence to avoid crashes, it will just default to High.
    const confidenceResults = { confidenceScore: 100, contradictions: [], confidenceFactors: [] }; 

    const complianceResults = checkCompliance(profile, riskFactors);
    const { recommendations, roadmap } = generateRecommendations(riskFactors, profile, confidenceResults);

    const categoryScores = {};
    for (const ans of answers) {
      if (!categoryScores[ans.category]) {
        categoryScores[ans.category] = { total: 0, max: 0 };
      }
      categoryScores[ans.category].total += ans.score_value;
      categoryScores[ans.category].max += 10;
    }
    const categoryBreakdown = Object.entries(categoryScores).map(([cat, data]) => ({
      category: cat,
      score: parseFloat(((data.total / data.max) * 10).toFixed(1)),
    }));

    res.json({
      success: true,
      data: {
        session,
        findings,
        categoryBreakdown,
        compliance: complianceResults,
        recommendations,
        roadmap,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get assessment', error: error.message });
  }
};

module.exports = { startAssessment, submitAssessment, listAssessments, getAssessment };
