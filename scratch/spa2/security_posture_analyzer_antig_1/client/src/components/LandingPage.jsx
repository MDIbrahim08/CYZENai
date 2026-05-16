import { Link } from 'react-router-dom';
import { Shield, Target, Zap, Lock, ChevronRight, CheckCircle, Activity, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="container" style={{ paddingBottom: '100px' }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '100px 0 60px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ 
            background: 'rgba(99, 102, 241, 0.1)',
            padding: '8px 20px',
            borderRadius: '30px',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            color: '#818cf8',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Zap size={14} />
          Adaptive Security Intelligence v2.0
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
            lineHeight: 1.1,
            marginBottom: '24px',
            maxWidth: '900px'
          }}
        >
          Your Security <span className="accent-text">Adaptive</span> and <span className="gradient-text">Automated</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ 
            fontSize: '1.25rem', 
            color: '#94a3b8', 
            maxWidth: '700px', 
            marginBottom: '40px',
            lineHeight: 1.6
          }}
        >
          The most comprehensive and personalized security posture analyzer. Tailored for students, developers, and businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ display: 'flex', gap: '16px' }}
        >
          <Link to="/auth" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
            Analyze My Security <ChevronRight size={20} />
          </Link>
          <a href="#features" className="btn-secondary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
            See How It Works
          </a>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" style={{ padding: '60px 0' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px' 
        }}>
          {[
            {
              icon: <Target color="#6366f1" size={32} />,
              title: "Adaptive Assessment",
              desc: "Context-aware questions based on your specific role and assets. No generic checklists."
            },
            {
              icon: <Activity color="#a855f7" size={32} />,
              title: "Weighted Scoring",
              desc: "Deep analysis using our proprietary algorithm to calculate your real-world risk level."
            },
            {
              icon: <Shield color="#10b981" size={32} />,
              title: "Compliance Mapping",
              desc: "Automatic status reporting for GDPR, PCI-DSS, and HIPAA frameworks."
            },
            {
              icon: <BarChart3 color="#0ea5e9" size={32} />,
              title: "Actionable Roadmap",
              desc: "Prioritized remediation steps with clear instructions and difficulty ratings."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card"
              style={{ padding: '32px' }}
            >
              <div style={{ marginBottom: '20px' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{feature.title}</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="glass" style={{ 
        marginTop: '60px', 
        padding: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        textAlign: 'center',
        gap: '40px'
      }}>
        {[
          { label: "Security Domains", val: "8+" },
          { label: "Risk Factors", val: "50+" },
          { label: "Compliance Frameworks", val: "3" },
          { label: "Accuracy Rate", val: "99.9%" }
        ].map((stat, i) => (
          <div key={i}>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: 800, 
              color: 'white', 
              marginBottom: '4px' 
            }}>{stat.val}</div>
            <div style={{ color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default LandingPage;
