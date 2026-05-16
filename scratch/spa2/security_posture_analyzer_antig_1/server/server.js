require('dotenv').config();
const app = require('./src/app');
const { initDB } = require('./src/config/db');

const PORT = process.env.PORT || 5000;

const start = async () => {
  initDB();
  app.listen(PORT, () => {
    console.log(`\n🛡️  Adaptive Security Posture Analyzer API`);
    console.log(`✅  Server running at http://localhost:${PORT}`);
    console.log(`🌍  Environment: ${process.env.NODE_ENV || 'development'}\n`);
  });
};

start();
