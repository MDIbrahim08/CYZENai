import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Mail, User, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../store/useStore';
import api from '../api/api';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken, setUser } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    
    try {
      const res = await api.post(endpoint, formData);
      if (res.data.success) {
        toast.success(isLogin ? 'Welcome back!' : 'Account created!');
        setToken(res.data.data.token);
        setUser(res.data.data.user);
        navigate('/setup');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ 
      minHeight: 'calc(100vh - 100px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass"
        style={{ 
          width: '100%',
          maxWidth: '450px',
          padding: '40px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            display: 'inline-flex', 
            background: 'rgba(99, 102, 241, 0.1)',
            padding: '12px',
            borderRadius: '16px',
            marginBottom: '16px',
            color: '#6366f1'
          }}>
            <Shield size={28} />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>
            {isLogin ? 'Welcome Back' : 'Get Started'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            {isLogin ? 'Access your security command center' : 'Join the elite security community'}
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="glass" style={{ 
          padding: '4px',
          display: 'flex',
          marginBottom: '32px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <button 
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              background: isLogin ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              color: isLogin ? '#6366f1' : '#64748b',
              border: isLogin ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid transparent'
            }}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              background: !isLogin ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              color: !isLogin ? '#6366f1' : '#64748b',
              border: !isLogin ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid transparent'
            }}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: '#64748b' }} />
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    required 
                    style={{ width: '100%', paddingLeft: '40px' }}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: '#64748b' }} />
              <input 
                type="email" 
                placeholder="name@example.com" 
                required 
                style={{ width: '100%', paddingLeft: '40px' }}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: '#64748b' }} />
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
                style={{ width: '100%', paddingLeft: '40px' }}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: '8px', padding: '14px' }}
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AuthPage;
