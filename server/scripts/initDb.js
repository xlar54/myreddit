const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const config = require('../config/database');

async function initDb() {
  const connection = await mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
  });

  try {
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${config.database}`);
    // Use the database
    await connection.query(`USE ${config.database}`);

    const scriptPath = path.join(__dirname, 'database.sql');
    const script = fs.readFileSync(scriptPath, 'utf8');
    
    // Split script by semicolon to handle multiple statements
    const statements = script.split(';').map(statement => statement.trim()).filter(Boolean);

    for (const statement of statements) {
      await connection.query(statement);
    }
    
    console.log('Database initialized successfully.');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await connection.end();
  }
}

initDb();