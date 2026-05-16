import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, ChevronLeft, Loader2, Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../store/useStore';
import api from '../api/api';

const Questionnaire = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { activeSession, setCurrentReport } = useStore();
  
  const [questions, setQuestions] = useState(activeSession?.questions || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(!activeSession);

  useEffect(() => {
    // If no active session (e.g. refreshed page), we could fetch it here
    // For now just redirect if missing as this is a one-way flow
    if (!activeSession) {
      navigate('/setup');
    }
  }, [activeSession, navigate]);

  const handleSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [questions[currentIndex].id]: optionIndex
    });
    
    // Auto-advance after small delay
    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300);
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error('Please answer all questions before submitting');
      return;
    }

    setSubmitting(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([id, index]) => ({
        questionId: id,
        selectedOptionIndex: index
      }));

      const res = await api.post(`/assessments/${sessionId}/submit`, { answers: formattedAnswers });
      if (res.data.success) {
        toast.success('Assessment completed!');
        setCurrentReport(res.data.data);
        navigate(`/results/${sessionId}`);
      }
    } catch (err) {
      toast.error('Failed to submit assessment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="container section">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Progress Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
            <div>
              <span className="accent-text" style={{ fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>
                {currentQuestion.category}
              </span>
              <h2 style={{ fontSize: '1.5rem', marginTop: '4px' }}>Question {currentIndex + 1} <span style={{ color: '#64748b', fontSize: '1.1rem' }}>of {questions.length}</span></h2>
            </div>
            <span style={{ fontWeight: 600, color: '#94a3b8' }}>{Math.round(progress)}% Complete</span>
          </div>
          <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', borderRadius: '4px' }} 
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass"
            style={{ padding: '48px' }}
          >
            <h3 style={{ fontSize: '1.75rem', lineHeight: 1.4, marginBottom: '40px' }}>
              {currentQuestion.text}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className="glass-card"
                  style={{
                    padding: '20px 24px',
                    textAlign: 'left',
                    fontSize: '1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    border: '2px solid',
                    borderColor: answers[currentQuestion.id] === idx ? '#6366f1' : 'transparent',
                    background: answers[currentQuestion.id] === idx ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                  }}
                >
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    border: '2px solid',
                    borderColor: answers[currentQuestion.id] === idx ? '#6366f1' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {answers[currentQuestion.id] === idx && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#6366f1' }} />}
                  </div>
                  {option.text}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Footer */}
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="btn-secondary"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                opacity: currentIndex === 0 ? 0.3 : 1,
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={20} /> Back
            </button>
            
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to quit? Your progress will be lost.')) {
                  navigate('/setup');
                }
              }}
              style={{ 
                background: 'none', 
                color: '#64748b', 
                fontSize: '0.85rem', 
                fontWeight: 600,
                padding: '0 12px'
              }}
            >
              Quit Assessment
            </button>
          </div>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              className="btn-primary"
              disabled={submitting || Object.keys(answers).length < questions.length}
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }}
            >
              {submitting ? <Loader2 className="animate-spin" /> : (
                <>
                  Complete Assessment <Send size={18} />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="btn-secondary"
              disabled={answers[currentQuestion.id] === undefined}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Next <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
