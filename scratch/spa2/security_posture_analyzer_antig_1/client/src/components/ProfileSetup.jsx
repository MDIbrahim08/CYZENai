import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Target, Rocket, Briefcase, GraduationCap, Laptop, Globe, Server, Database, Smartphone, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../store/useStore';
import api from '../api/api';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { setActiveSession } = useStore();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    role: '',
    targetAsset: '',
    techMaturity: 'intermediate',
    organizationName: '',
    handlesPayments: false,
    handlesHealthData: false,
    collectsUserData: false,
  });

  const roles = [
    { id: 'student', title: 'Student', icon: <GraduationCap size={20} />, color: '#6366f1' },
    { id: 'developer', title: 'Developer', icon: <Laptop size={20} />, color: '#a855f7' },
    { id: 'startup_founder', title: 'Startup Founder', icon: <Rocket size={20} />, color: '#f59e0b' },
    { id: 'it_admin', title: 'IT Admin', icon: <Server size={20} />, color: '#0ea5e9' },
    { id: 'business_owner', title: 'Business Owner', icon: <Briefcase size={20} />, color: '#10b981' },
    { id: 'freelancer', title: 'Freelancer', icon: <Globe size={20} />, color: '#ec4899' },
  ];

  const targets = [
    { id: 'web_app', title: 'Web Application', icon: <Globe size={20} /> },
    { id: 'mobile_app', title: 'Mobile Application', icon: <Smartphone size={20} /> },
    { id: 'apis', title: 'API Infrastructure', icon: <Database size={20} /> },
    { id: 'cloud_infra', title: 'Cloud Environment', icon: <Server size={20} /> },
    { id: 'business_ops', title: 'Business Operations', icon: <Briefcase size={20} /> },
    { id: 'personal_devices', title: 'Personal Devices', icon: <Laptop size={20} /> },
  ];

  const handleStart = async () => {
    if (!formData.role || !formData.targetAsset) {
      toast.error('Please select your role and target asset');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/assessments/start', formData);
      if (res.data.success) {
        setActiveSession(res.data.data);
        navigate(`/assessment/${res.data.data.sessionId}`);
      }
    } catch (err) {
      toast.error('Failed to start assessment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Profile <span className="accent-text">Discovery</span></h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Tell us about your context so we can tailor the assessment to your specific needs.</p>
        </div>

        <div className="glass" style={{ padding: '40px' }}>
          {/* Role Selection */}
          <div style={{ marginBottom: '40px' }}>
            <label style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} className="accent-text" /> 1. What is your primary role?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setFormData({ ...formData, role: r.id })}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '20px',
                    borderRadius: '16px',
                    border: '2px solid',
                    borderColor: formData.role === r.id ? r.color : 'rgba(255, 255, 255, 0.05)',
                    background: formData.role === r.id ? `${r.color}15` : 'rgba(255, 255, 255, 0.02)',
                    transition: 'all 0.2s ease',
                    color: formData.role === r.id ? 'white' : '#94a3b8'
                  }}
                >
                  <div style={{ 
                    padding: '10px', 
                    borderRadius: '12px', 
                    background: formData.role === r.id ? r.color : 'rgba(255, 255, 255, 0.05)',
                    color: formData.role === r.id ? 'white' : '#64748b',
                    position: 'relative'
                  }}>
                    {r.icon}
                    {formData.role === r.id && (
                      <div style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        background: '#10b981',
                        borderRadius: '50%',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid var(--bg-secondary)'
                      }}>
                        <CheckCircle2 size={12} color="white" />
                      </div>
                    )}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Target Asset Selection */}
          <div style={{ marginBottom: '40px' }}>
            <label style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={18} className="accent-text" /> 2. What are you trying to secure?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {targets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setFormData({ ...formData, targetAsset: t.id })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    borderRadius: '16px',
                    border: '2px solid',
                    borderColor: formData.targetAsset === t.id ? '#6366f1' : 'rgba(255, 255, 255, 0.05)',
                    background: formData.targetAsset === t.id ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                    transition: 'all 0.2s ease',
                    color: formData.targetAsset === t.id ? 'white' : '#94a3b8',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ 
                    padding: '8px', 
                    borderRadius: '10px', 
                    background: formData.targetAsset === t.id ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    color: formData.targetAsset === t.id ? '#6366f1' : 'inherit'
                  }}>
                    {t.icon}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.title}</span>
                  {formData.targetAsset === t.id && (
                    <CheckCircle2 size={16} color="#6366f1" style={{ marginLeft: 'auto' }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Context */}
          <div style={{ marginBottom: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label>Technical Maturity</label>
              <select 
                value={formData.techMaturity}
                onChange={(e) => setFormData({ ...formData, techMaturity: e.target.value })}
                style={{ width: '100%' }}
              >
                <option value="beginner">Beginner (Non-technical)</option>
                <option value="intermediate">Intermediate (General Tech)</option>
                <option value="advanced">Advanced (Cybersecurity Pro)</option>
              </select>
            </div>
            <div>
              <label>Organization / Project Name</label>
              <input 
                type="text" 
                placeholder="Optional"
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Compliance Checkboxes */}
          <div style={{ marginBottom: '40px' }}>
            <label style={{ fontSize: '1rem', marginBottom: '16px' }}>Compliance Scoping</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { id: 'handlesPayments', label: 'Handles payment card information (PCI-DSS scorable)', icon: '💳' },
                { id: 'handlesHealthData', label: 'Handles patient health data (HIPAA scorable)', icon: '🏥' },
                { id: 'collectsUserData', label: 'Collects EU/UK resident personal data (GDPR scorable)', icon: '🇪🇺' },
              ].map((item) => (
                <label key={item.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '16px', 
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'background 0.2s'
                }}>
                  <input 
                    type="checkbox" 
                    checked={formData[item.id]}
                    onChange={(e) => setFormData({ ...formData, [item.id]: e.target.checked })}
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span style={{ fontSize: '0.95rem', color: formData[item.id] ? 'white' : '#94a3b8' }}>
                    <span style={{ marginRight: '8px' }}>{item.icon}</span> {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button 
            onClick={handleStart}
            className="btn-primary" 
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '1.1rem' }}
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                Generate Personalized Questionnaire <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
