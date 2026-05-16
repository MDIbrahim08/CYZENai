import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import useStore from './store/useStore';
import api from './api/api';

// Components
import Navbar from './components/shared/Navbar';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import ProfileSetup from './components/ProfileSetup';
import Questionnaire from './components/Questionnaire';
import ResultsDashboard from './components/ResultsDashboard';
import GuidePage from './components/GuidePage';

function App() {
  const { isAuthenticated, setUser, setToken } = useStore();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.data.user);
          } else {
            setToken(null);
          }
        } catch (err) {
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [setUser, setToken]);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="accent-text" style={{ fontSize: '1.5rem', fontWeight: 600 }}>🛡️ Initializing Secure Environment...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/dashboard" />} />
          
          {/* Protected Routes */}
          <Route path="/setup" element={isAuthenticated ? <ProfileSetup /> : <Navigate to="/auth" />} />
          <Route path="/assessment/:sessionId" element={isAuthenticated ? <Questionnaire /> : <Navigate to="/auth" />} />
          <Route path="/results/:sessionId" element={isAuthenticated ? <ResultsDashboard /> : <Navigate to="/auth" />} />
          <Route path="/guide" element={isAuthenticated ? <GuidePage /> : <Navigate to="/auth" />} />
          
          <Route path="/dashboard" element={isAuthenticated ? <ProfileSetup /> : <Navigate to="/auth" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
