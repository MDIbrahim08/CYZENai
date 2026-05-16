const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../database.db');

let db;

const getDB = () => {
  if (!db) throw new Error('Database not initialized. Call initDB() first.');
  return db;
};

// Promisified DB methods
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

const initDB = () => {
  db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('❌  Error opening database', err.message);
    } else {
      console.log('✅  SQLite database connected at', DB_PATH);
    }
  });

  db.serialize(() => {
    db.run('PRAGMA journal_mode = WAL');
    db.run('PRAGMA foreign_keys = ON');

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS assessment_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        role TEXT NOT NULL,
        target_asset TEXT NOT NULL,
        tech_maturity TEXT NOT NULL,
        organization_name TEXT,
        handles_payments INTEGER DEFAULT 0,
        handles_health_data INTEGER DEFAULT 0,
        collects_user_data INTEGER DEFAULT 0,
        employee_count TEXT,
        overall_score REAL,
        risk_level TEXT,
        status TEXT DEFAULT 'in_progress',
        created_at TEXT DEFAULT (datetime('now')),
        completed_at TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS session_answers (
        id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL,
        question_id TEXT NOT NULL,
        question_text TEXT NOT NULL,
        category TEXT NOT NULL,
        selected_option_text TEXT NOT NULL,
        score_value INTEGER NOT NULL,
        risk_factor TEXT,
        FOREIGN KEY (session_id) REFERENCES assessment_sessions(id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS findings (
        id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL,
        severity TEXT NOT NULL,
        category TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        risk_factor TEXT,
        FOREIGN KEY (session_id) REFERENCES assessment_sessions(id)
      )
    `);
  });

  return db;
};

module.exports = { initDB, getDB, query, get, run };
