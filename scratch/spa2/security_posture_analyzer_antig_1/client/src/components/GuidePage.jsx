import { motion } from 'framer-motion';
import { 
  BookOpen, Shield, Activity, Target, AlertTriangle, CheckCircle2, 
  BarChart3, FileText, ArrowRight, HelpCircle, Gauge, Brain, Scale,
  Zap, ChevronDown, ChevronUp
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Section = ({ icon: Icon, title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        marginBottom: '16px',
        overflow: 'hidden'
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <div style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          padding: '10px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Icon size={20} color="white" />
        </div>
        <span style={{ fontWeight: 700, fontSize: '1.1rem', flex: 1 }}>{title}</span>
        {isOpen ? <ChevronUp size={20} color="#94a3b8" /> : <ChevronDown size={20} color="#94a3b8" />}
      </button>
      {isOpen && (
        <div style={{ padding: '0 24px 24px', color: '#cbd5e1', lineHeight: 1.8, fontSize: '0.95rem' }}>
          {children}
        </div>
      )}
    </motion.div>
  );
};

const TermCard = ({ term, definition, color = '#6366f1' }) => (
  <div style={{
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderLeft: `3px solid ${color}`,
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '12px'
  }}>
    <div style={{ fontWeight: 700, color: '#fff', marginBottom: '6px', fontSize: '0.95rem' }}>{term}</div>
    <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>{definition}</div>
  </div>
);

const GuidePage = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <div style={{
          display: 'inline-flex',
          padding: '12px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          marginBottom: '1.5rem',
          boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)'
        }}>
          <BookOpen size={32} color="white" />
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          How to Use <span style={{ color: '#6366f1' }}>CyberShield AI</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
          A complete guide to understanding your security assessment results and what every number, label, and recommendation means.
        </p>
      </motion.div>

      {/* Getting Started */}
      <Section icon={Zap} title="Getting Started — How the Assessment Works" defaultOpen={true}>
        <p style={{ marginBottom: '16px' }}>CyberShield AI works in <strong style={{ color: '#fff' }}>4 simple steps</strong>:</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
          {[
            { step: '1', title: 'Set Your Profile', desc: 'Tell us your role, what you\'re protecting, and your technical level' },
            { step: '2', title: 'Answer Questions', desc: 'Answer 15-20 security questions honestly about your current practices' },
            { step: '3', title: 'Get Your Report', desc: 'Receive a detailed security analysis with scores and findings' },
            { step: '4', title: 'Follow the Roadmap', desc: 'Use the prioritized remediation plan to fix issues step by step' },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(99, 102, 241, 0.05)',
              border: '1px solid rgba(99, 102, 241, 0.15)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#6366f1', marginBottom: '4px' }}>{item.step}</div>
              <div style={{ fontWeight: 600, color: '#fff', marginBottom: '4px', fontSize: '0.85rem' }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <p>The questions you see are <strong style={{ color: '#fff' }}>personalized</strong> to your role and the type of asset you're protecting. A startup founder sees different questions than a student.</p>
      </Section>

      {/* Score Explanation */}
      <Section icon={Gauge} title="Understanding Your Security Score (0-10)">
        <p style={{ marginBottom: '16px' }}>Your <strong style={{ color: '#fff' }}>Overall Security Score</strong> is a number from 0 to 10 that represents how secure your system is. Here's what each range means:</p>
        
        <TermCard term="9.0 – 10.0 → Excellent" definition="Your security posture is elite. You have strong controls across all domains. Focus on maintaining and continuously improving." color="#22c55e" />
        <TermCard term="7.5 – 8.9 → Good (Low Risk)" definition="You have solid fundamentals with minor gaps. Address the remaining recommendations to reach elite status." color="#22c55e" />
        <TermCard term="5.0 – 7.4 → Moderate (Medium Risk)" definition="Significant gaps exist in your security. Attackers could exploit these weaknesses. Prioritize the 'Immediate' remediation items." color="#eab308" />
        <TermCard term="2.5 – 4.9 → Poor (High Risk)" definition="Your system has serious vulnerabilities. You are at real risk of a breach. Treat every 'Immediate' remediation item as an emergency." color="#f97316" />
        <TermCard term="0.0 – 2.4 → Critical" definition="Your system is extremely vulnerable. A breach is not a matter of 'if' but 'when.' Stop all other work and address security immediately." color="#ef4444" />

        <p style={{ marginTop: '16px' }}><strong style={{ color: '#fff' }}>How is the score calculated?</strong> Each question has a weight based on its importance. Critical questions (like password storage and encryption) weigh more than less critical ones (like WAF). The score also accounts for dangerous <em>combinations</em> of vulnerabilities — for example, having no MFA AND no login lockout is much worse than either alone.</p>
      </Section>

      {/* Risk Level */}
      <Section icon={AlertTriangle} title="Risk Level — What It Means">
        <p style={{ marginBottom: '16px' }}>The <strong style={{ color: '#fff' }}>Risk Level</strong> is a plain-English label derived from your score:</p>
        <TermCard term="🟢 LOW RISK" definition="Your security posture is strong. Continue monitoring and improving. Score ≥ 7.5." color="#22c55e" />
        <TermCard term="🟡 MEDIUM RISK" definition="Some vulnerabilities exist. They should be fixed soon, but your system is not in immediate danger. Score 5.0 – 7.4." color="#eab308" />
        <TermCard term="🟠 HIGH RISK" definition="Significant vulnerabilities exist. Your system could be breached. Fix issues this week. Score 2.5 – 4.9." color="#f97316" />
        <TermCard term="🔴 CRITICAL" definition="Your system is extremely vulnerable. A breach is likely imminent. Fix issues TODAY. Score < 2.5." color="#ef4444" />
        <p style={{ marginTop: '12px' }}>If the system adds the word <strong style={{ color: '#fff' }}>"Provisional"</strong> before the risk level (e.g., "Provisional Low"), it means the engine isn't fully confident in the assessment — usually because not enough questions were answered or contradictions were detected.</p>
      </Section>

      {/* Maturity Level */}
      <Section icon={BarChart3} title="Security Maturity Level — Your Organization's Growth Stage">
        <p style={{ marginBottom: '16px' }}>The <strong style={{ color: '#fff' }}>Security Maturity Level</strong> tells you how mature your security practices are compared to industry standards:</p>
        <TermCard term="Level 1: Reactive" definition="No formal security processes. You only respond to problems after they happen. Score < 2.5." color="#ef4444" />
        <TermCard term="Level 2: Developing" definition="Some security measures exist, but they are basic and inconsistent. Score 2.5 – 4.9." color="#f97316" />
        <TermCard term="Level 3: Defined" definition="Security processes are documented and followed, but not continuously monitored. Score 5.0 – 6.9." color="#eab308" />
        <TermCard term="Level 4: Managed" definition="Security is actively measured, monitored, and improved. Incidents are handled with defined procedures. Score 7.0 – 8.4." color="#22c55e" />
        <TermCard term="Level 5: Resilient" definition="Security is fully integrated into operations. The system can detect, respond to, and recover from attacks autonomously. Score ≥ 8.5." color="#10b981" />
      </Section>

      {/* Confidence */}
      <Section icon={Brain} title="Assessment Confidence — How Much to Trust the Results">
        <p style={{ marginBottom: '16px' }}>The <strong style={{ color: '#fff' }}>Confidence Score</strong> (0-100%) tells you how reliable the assessment results are:</p>
        <TermCard term="HIGH (70-100%)" definition="The assessment covered most security domains and no contradictions were found. You can trust these results." color="#22c55e" />
        <TermCard term="MEDIUM (40-69%)" definition="Some security domains were not covered, or minor inconsistencies were detected. Results are mostly reliable but may have blind spots." color="#eab308" />
        <TermCard term="LOW (0-39%)" definition="Major gaps in coverage or significant contradictions detected. Take these results with caution and consider answering more questions." color="#ef4444" />
        <p style={{ marginTop: '12px' }}><strong style={{ color: '#fff' }}>What are Contradictions?</strong> The system detects when your answers don't logically make sense together. For example, if you claim to have "active compliance" but also store passwords in plain text — that's a contradiction. The engine flags this and reduces confidence.</p>
      </Section>

      {/* Compliance */}
      <Section icon={Scale} title="Compliance Report — Regulatory Framework Mapping">
        <p style={{ marginBottom: '16px' }}>If your profile indicates you handle payments, health data, or personal data, the system automatically checks your answers against real regulatory frameworks:</p>
        <TermCard term="GDPR (General Data Protection Regulation)" definition="European Union law governing the collection and processing of personal data. Applies if you collect data from EU/UK residents. Maximum penalty: €20 million or 4% of global annual turnover." color="#3b82f6" />
        <TermCard term="PCI-DSS (Payment Card Industry Data Security Standard)" definition="Global standard for handling credit/debit card data. Applies if you process, store, or transmit cardholder data. Penalty: $5K-$100K/month until compliance." color="#3b82f6" />
        <TermCard term="HIPAA (Health Insurance Portability and Accountability Act)" definition="US law governing the protection of patient health information (PHI). Applies if you handle medical records or health data. Penalty: up to $1.9M per violation." color="#3b82f6" />
        <p style={{ marginTop: '12px' }}><strong style={{ color: '#fff' }}>What does 0% Compliance mean?</strong> Certain violations are so severe that they instantly set compliance to 0% — for example, storing passwords in plain text makes GDPR, PCI-DSS, and HIPAA compliance impossible regardless of what else you do right.</p>
      </Section>

      {/* Findings */}
      <Section icon={AlertTriangle} title="Findings — What Are Critical, High, Medium?">
        <p style={{ marginBottom: '16px' }}>Each finding represents a specific security issue detected in your answers:</p>
        <TermCard term="🔴 CRITICAL" definition="The most severe type of vulnerability. If exploited, an attacker gains full access or all data is exposed. These must be fixed IMMEDIATELY." color="#ef4444" />
        <TermCard term="🟠 HIGH" definition="A significant vulnerability that creates real risk. While not immediately catastrophic, it should be fixed within 1-2 days." color="#f97316" />
        <TermCard term="🟡 MEDIUM" definition="A moderate weakness that could be exploited under the right conditions. Should be addressed within 1-2 weeks." color="#eab308" />
        <TermCard term="🟢 GOOD PRACTICE" definition="You are doing this correctly. This finding acknowledges areas where your security is strong." color="#22c55e" />
      </Section>

      {/* Remediation */}
      <Section icon={FileText} title="Remediation Roadmap — Your Action Plan">
        <p style={{ marginBottom: '16px' }}>The <strong style={{ color: '#fff' }}>Remediation Roadmap</strong> is your prioritized to-do list, organized into three urgency tiers:</p>
        <TermCard term="🔴 Immediate — Do Today" definition="These are emergency items. If you do nothing else, fix these. They represent active, exploitable vulnerabilities." color="#ef4444" />
        <TermCard term="🟡 This Week" definition="Important improvements that significantly reduce your attack surface. Schedule these into your current sprint." color="#eab308" />
        <TermCard term="🟢 This Month" definition="Strategic enhancements that improve long-term resilience. Plan these into your roadmap." color="#22c55e" />
        <p style={{ marginTop: '12px' }}><strong style={{ color: '#fff' }}>Attack Narratives:</strong> Some remediation items include an "Attack Narrative" — a step-by-step story showing exactly how an attacker would exploit the vulnerability. These are designed to help you understand the real-world risk, not just the technical issue.</p>
      </Section>

      {/* Radar Chart */}
      <Section icon={Target} title="Radar Chart — Domain Breakdown">
        <p>The <strong style={{ color: '#fff' }}>Radar Chart</strong> shows your score across each security domain (Authentication, Data Protection, Network Security, etc.) on a visual spider graph. A perfect pentagon/circle means you are equally strong across all domains. Indentations show your weak spots — these are the domains to prioritize.</p>
      </Section>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ textAlign: 'center', marginTop: '3rem' }}
      >
        <Link to="/setup" className="btn-primary" style={{
          padding: '14px 32px',
          fontSize: '1.05rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          Start Your Assessment <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  );
};

export default GuidePage;
