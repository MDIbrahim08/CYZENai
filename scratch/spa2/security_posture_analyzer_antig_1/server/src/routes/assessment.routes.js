const express = require('express');
const {
  startAssessment,
  submitAssessment,
  listAssessments,
  getAssessment,
} = require('../controllers/assessment.controller');
const authenticate = require('../middleware/auth.middleware');

const router = express.Router();

// All assessment routes require authentication
router.use(authenticate);

router.post('/start', startAssessment);
router.post('/:sessionId/submit', submitAssessment);
router.get('/', listAssessments);
router.get('/:sessionId', getAssessment);

module.exports = router;
