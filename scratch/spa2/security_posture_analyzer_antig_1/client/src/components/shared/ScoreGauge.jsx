import { motion } from 'framer-motion';

const ScoreGauge = ({ score, riskLevel }) => {
  const normalizedScore = score / 10;
  const circumference = 2 * Math.PI * 90; // radius = 90
  const offset = circumference - normalizedScore * circumference;

  const getColor = () => {
    if (score >= 8) return '#10b981'; // Green
    if (score >= 6) return '#0ea5e9'; // Blue
    if (score >= 4) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const color = getColor();

  return (
    <div style={{ position: 'relative', width: '240px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Animated Glow Backdrop */}
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: color,
          filter: 'blur(40px)',
          zIndex: 0
        }}
      />

      <svg width="240" height="240" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)', zIndex: 1 }}>
        {/* Background Circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="12"
        />
        {/* Progress Circle */}
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
        />
      </svg>
      
      <div style={{ position: 'absolute', textAlign: 'center', zIndex: 2 }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}
        >
          {score}
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', marginTop: '4px' }}
        >
          Security Score
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className={`badge badge-${riskLevel}`} 
          style={{ 
            marginTop: '12px', 
            fontSize: '0.8rem', 
            padding: '6px 16px',
            boxShadow: `0 0 15px ${color}30`
          }}
        >
          {riskLevel} Risk
        </motion.div>
      </div>
    </div>
  );
};

export default ScoreGauge;
