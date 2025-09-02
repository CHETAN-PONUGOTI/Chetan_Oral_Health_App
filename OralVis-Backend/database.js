import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';

// This function initializes the database and creates tables if they don't exist.
export async function initializeDatabase() {
  const db = await open({
    filename: './oralvis.db',
    driver: sqlite3.Database
  });

  // Create users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('Technician', 'Dentist'))
    )
  `);

  // Create scans table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS scans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patientName TEXT NOT NULL,
      patientId TEXT NOT NULL,
      scanType TEXT NOT NULL,
      region TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // --- Seed initial users (for testing) ---
  const users = await db.all('SELECT * FROM users');
  if (users.length === 0) {
    const salt = await bcrypt.genSalt(10);
    const techPassword = await bcrypt.hash('password123', salt);
    const dentistPassword = await bcrypt.hash('password123', salt);

    await db.run('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', 'tech@oralvis.com', techPassword, 'Technician');
    await db.run('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', 'dentist@oralvis.com', dentistPassword, 'Dentist');
    console.log('Default users created.');
  }

  return db;
}