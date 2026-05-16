import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, AlertTriangle, CheckCircle2, Info, ArrowRight, Download, 
  RefreshCcw, ChevronRight, LayoutDashboard, FileText, ListChecks, HelpCircle,
  Activity, Target
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';
import useStore from '../store/useStore';
import api from '../api/api';
import ScoreGauge from './shared/ScoreGauge';
import toast from 'react-hot-toast';

const ResultsDashboard = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { currentReport, setCurrentReport } = useStore();
  const [loading, setLoading] = useState(!currentReport);
  const [activeTab, setActiveTab] = useState('summary');

  useEffect(() => {
    const fetchReport = async () => {
      if (!currentReport) {
        try {
          const res = await api.get(`/assessments/${sessionId}`);
          if (res.data.success) {
            setCurrentReport(res.data.data);
          }
        } catch (err) {
          toast.error('Failed to fetch report');
          navigate('/setup');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReport();
  }, [sessionId, currentReport, setCurrentReport, navigate]);

  if (loading) {
    return (
      <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <RefreshCcw className="animate-spin accent-text" size={40} />
      </div>
    );
  }

  const { overallScore, riskLevel, maturityLevel, confidence, findings, categoryBreakdown, compliance, roadmap } = currentReport;

  const renderSummary = () => {
    const criticalFindings = findings.filter(f => f.severity === 'critical');
    
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-container">
        {criticalFindings.length > 0 && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ 
              background: 'rgba(239, 68, 68, 0.05)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444' }}>
              <AlertTriangle size={24} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Priority Security Fixes</h3>
              <span className="badge badge-critical" style={{ marginLeft: 'auto' }}>{criticalFindings.length} Critical</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
              {criticalFindings.slice(0, 3).map((f, i) => (
                <div key={i} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px 16px', borderRadius: '10px', fontSize: '0.9rem', color: '#f8fafc', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  • {f.title}
                </div>
              ))}
            </div>
            <button 
              onClick={() => setActiveTab('roadmap')}
              style={{ background: 'none', color: '#ef4444', fontWeight: 600, fontSize: '0.85rem', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}
            >
              View fix instructions in roadmap <ChevronRight size={14} />
            </button>
          </motion.div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '48px' }}>
          <div className="glass" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ScoreGauge score={overallScore} riskLevel={riskLevel} />
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge badge-low" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', padding: '4px 12px' }}>
                  {maturityLevel}
                </span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                Overall posture is <strong>{riskLevel.toUpperCase()} RISK</strong>. 
                {findings.filter(f => f.severity === 'critical').length > 0 && ` Found ${findings.filter(f => f.severity === 'critical').length} critical issues.`}
              </p>
            </div>
          </div>

          <div className="glass" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Assessment Confidence</h3>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: confidence?.confidenceScore > 70 ? '#10b981' : confidence?.confidenceScore > 40 ? '#f59e0b' : '#ef4444' }}>
                  {confidence?.confidenceScore}%
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>{confidence?.confidenceLevel}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {confidence?.confidenceFactors?.map((factor, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.85rem', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.02)', padding: '8px 12px', borderRadius: '8px' }}>
                  <Info size={14} className="accent-text" /> {factor}
                </div>
              ))}
              {confidence?.contradictions?.length > 0 && (
                <div style={{ marginTop: '12px', padding: '12px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                  <div style={{ display: 'flex', gap: '8px', color: '#ef4444', fontWeight: 700, fontSize: '0.8rem', marginBottom: '8px', textTransform: 'uppercase' }}>
                    <AlertTriangle size={14} /> Contradiction Warnings
                  </div>
                  {confidence.contradictions.map((c, i) => (
                    <p key={i} style={{ fontSize: '0.85rem', color: '#fca5a5', marginBottom: '4px' }}>• {c}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', marginBottom: '48px' }}>
          <div className="glass" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', textAlign: 'center' }}>Security Domain Analysis</h3>
            <div style={{ height: '280px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={categoryBreakdown}>
                  <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '24px' }}>Key Findings</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {findings.map((finding, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ 
                  padding: '12px', 
                  borderRadius: '12px', 
                  background: finding.severity === 'critical' ? 'rgba(239, 68, 68, 0.1)' : finding.severity === 'warning' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                  color: finding.severity === 'critical' ? '#ef4444' : finding.severity === 'warning' ? '#f59e0b' : '#10b981',
                  flexShrink: 0
                }}>
                  {finding.severity === 'critical' ? <AlertTriangle size={24} /> : finding.severity === 'warning' ? <Info size={24} /> : <CheckCircle2 size={24} />}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '1.1rem' }}>{finding.title}</h4>
                    <span className={`badge badge-${finding.severity}`}>{finding.severity}</span>
                  </div>
                  <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{finding.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderCompliance = () => {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '12px' }}>Regulatory Compliance Report</h2>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Mapping your security posture against international frameworks.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {compliance.map((frame) => (
            <div key={frame.key} className="glass" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{frame.name}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{frame.fullName}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: frame.complianceScore > 80 ? '#10b981' : frame.complianceScore > 50 ? '#f59e0b' : '#ef4444' }}>
                    {frame.complianceScore}%
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>Compliance Score</div>
                </div>
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '12px', color: '#ef4444', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>
                  <AlertTriangle size={16} /> Maximum Potential Penalty
                </div>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{frame.maxPenalty}</p>
              </div>

              {frame.hardStopTriggered && (
                <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', gap: '12px', color: '#f59e0b', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>
                    <Info size={16} /> Automatic Score Penalty Triggered
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{frame.hardStopReason}</p>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {frame.requirements.map((req) => (
                  <div key={req.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ 
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        background: req.status === 'met' ? 'rgba(16, 185, 129, 0.1)' : req.status === 'partial' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: req.status === 'met' ? '#10b981' : req.status === 'partial' ? '#f59e0b' : '#ef4444'
                      }}>
                        {req.status === 'met' ? <CheckCircle2 size={18} /> : req.status === 'partial' ? <AlertTriangle size={18} /> : <div style={{ fontSize: '10px' }}>X</div>}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{req.title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{req.article}</div>
                      </div>
                    </div>
                    <div className={`badge badge-${req.status === 'met' ? 'low' : req.status === 'partial' ? 'medium' : 'critical'}`}>
                      {req.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderRoadmap = () => {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '12px' }}>Remediation Roadmap</h2>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Prioritized action items to secure your application.</p>

        {['immediate', 'this_week', 'this_month'].map((tier) => (
          <div key={tier} style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ 
                padding: '6px 16px', 
                borderRadius: '20px', 
                fontSize: '0.8rem', 
                fontWeight: 700, 
                textTransform: 'uppercase',
                background: tier === 'immediate' ? 'rgba(239, 68, 68, 0.2)' : tier === 'this_week' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                color: tier === 'immediate' ? '#ef4444' : tier === 'this_week' ? '#f59e0b' : '#818cf8',
                border: '1px solid',
                borderColor: tier === 'immediate' ? 'rgba(239, 68, 68, 0.3)' : tier === 'this_week' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(99, 102, 241, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {tier === 'immediate' && <AlertTriangle size={14} />}
                {tier === 'this_week' && <Activity size={14} />}
                {tier === 'this_month' && <Target size={14} />}
                {tier.replace('_', ' ')}
              </div>
              <div style={{ height: '1px', flex: 1, background: 'rgba(255, 255, 255, 0.1)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {roadmap[tier].length === 0 ? (
                <p style={{ color: '#64748b', fontStyle: 'italic', paddingLeft: '12px' }}>No actions identified for this tier.</p>
              ) : (
                roadmap[tier].map((item, i) => (
                  <div key={i} className="glass" style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{item.action}</h3>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>⏱️ {item.timeEstimate}</span>
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>📊 Difficulty: {item.difficulty}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Why it matters</h4>
                      <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{item.whyItMatters}</p>
                      
                      {item.attackNarrative && (
                        <div style={{ marginTop: '16px', padding: '16px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.05)', borderLeft: '4px solid #6366f1' }}>
                          <h5 style={{ fontSize: '0.85rem', color: '#818cf8', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Shield size={14} /> Attack Narrative
                          </h5>
                          <p style={{ fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.5, fontStyle: 'italic' }}>{item.attackNarrative}</p>
                        </div>
                      )}

                      {item.confidenceInsights?.length > 0 && (
                        <div style={{ marginTop: '16px', padding: '16px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.05)', borderLeft: '4px solid #f59e0b' }}>
                          <h5 style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Info size={14} /> Reliability Insight
                          </h5>
                          {item.confidenceInsights.map((ins, ii) => (
                            <p key={ii} style={{ fontSize: '0.85rem', color: '#f8fafc', marginBottom: '4px' }}>• {ins}</p>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>Steps to resolve</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {item.steps.map((step, si) => (
                          <div key={si} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <div style={{ 
                              width: '24px', 
                              height: '24px', 
                              borderRadius: '50%', 
                              background: 'rgba(99, 102, 241, 0.1)', 
                              color: '#6366f1',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              flexShrink: 0
                            }}>
                              {si + 1}
                            </div>
                            <p style={{ color: '#f8fafc', fontSize: '0.95rem' }}>{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {item.links && item.links.length > 0 && (
                      <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', gap: '16px' }}>
                        {item.links.map((link, li) => (
                          <a key={li} href={link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6366f1', fontSize: '0.85rem', fontWeight: 600 }}>
                            Documentation <ArrowRight size={14} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="container section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Security <span className="accent-text">Analysis</span></h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.9rem' }}>
            <FileText size={14} /> Report Generated on {new Date().toLocaleDateString()}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => window.print()} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={18} /> Export PDF
          </button>
          <button onClick={() => navigate('/setup')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCcw size={18} /> New Assessment
          </button>
        </div>
      </div>

      <div className="glass" style={{ padding: '8px', display: 'flex', gap: '8px', marginBottom: '40px' }}>
        {[
          { id: 'summary', label: 'Executive Summary', icon: <LayoutDashboard size={18} /> },
          { id: 'compliance', label: 'Compliance Report', icon: <FileText size={18} /> },
          { id: 'roadmap', label: 'Remediation Roadmap', icon: <ListChecks size={18} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.2s',
              background: activeTab === tab.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              color: activeTab === tab.id ? '#6366f1' : '#94a3b8',
              border: '1px solid',
              borderColor: activeTab === tab.id ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ minHeight: '600px' }}>
        {activeTab === 'summary' && renderSummary()}
        {activeTab === 'compliance' && renderCompliance()}
        {activeTab === 'roadmap' && renderRoadmap()}
      </div>

      <div style={{ marginTop: '60px', padding: '24px 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.8rem' }}>
        <span>Session Reference: {sessionId}</span>
        <span>&copy; 2026 CyberShield AI Adaptive Security</span>
      </div>
    </div>
  );
};

export default ResultsDashboard;
