import pool from './db/connection.js';

async function test() {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    console.log('✅ Database connected!');
    console.log('Users:', rows);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

test();