import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, User, Menu, X, BookOpen } from 'lucide-react';
import { useState } from 'react';
import useStore from '../../store/useStore';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      margin: '1rem',
      padding: '0.75rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '20px'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          padding: '8px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)'
        }}>
          <Shield size={24} color="white" />
        </div>
        <span style={{ 
          fontWeight: 800, 
          fontSize: '1.25rem', 
          letterSpacing: '-0.02em',
          background: 'linear-gradient(to right, #fff, #94a3b8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          CyberShield <span style={{ color: '#6366f1', WebkitTextFillColor: '#6366f1' }}>AI</span>
        </span>
      </Link>

      {/* Desktop Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {isAuthenticated ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94a3b8' }}>
              <User size={18} />
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user?.name}</span>
            </div>
            <Link 
              to="/guide" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                color: '#94a3b8', 
                fontWeight: 500, 
                fontSize: '0.9rem',
                padding: '8px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
                transition: 'all 0.2s'
              }}
            >
              <BookOpen size={16} />
              Guide
            </Link>
            <button 
              onClick={handleLogout}
              className="btn-secondary" 
              style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/auth" style={{ color: '#94a3b8', fontWeight: 500, fontSize: '0.9rem' }}>Login</Link>
            <Link to="/auth" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
