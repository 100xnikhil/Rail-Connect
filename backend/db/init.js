const { pool } = require('./pool');

const createTables = async () => {
  const usersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

const trainsTableQuery = `
    CREATE TABLE IF NOT EXISTS trains (
      id SERIAL PRIMARY KEY,
      train_number VARCHAR(50) UNIQUE NOT NULL,
      train_name VARCHAR(100) NOT NULL,
      source VARCHAR(100) NOT NULL,
      destination VARCHAR(100) NOT NULL,
      departure_time TIME NOT NULL,
      arrival_time TIME NOT NULL,
      total_seats INT NOT NULL
    );
  `;

  try {
    console.log('⏳ Creating tables...');
    await pool.query(usersTableQuery);
    console.log('✅ "users" table created successfully (or already exists).');
    await pool.query(trainsTableQuery);
    console.log('✅ "trains" table created successfully (or already exists).');
  } catch (err) {
    console.error('❌ Error creating tables:', err.message);
  } finally {
    pool.end();
  }
};

createTables();
