import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'emails.db');

function getDb() {
  const db = new Database(dbPath);
  
  // Create table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      session_id TEXT NOT NULL,
      created_at INTEGER NOT NULL
    )
  `);
  
  return db;
}

export async function POST(req: NextRequest) {
  try {
    const { email, session_id } = await req.json();

    if (!email || !session_id) {
      return NextResponse.json(
        { error: 'Email and session_id are required' },
        { status: 400 }
      );
    }

    const db = getDb();
    const stmt = db.prepare('INSERT INTO leads (email, session_id, created_at) VALUES (?, ?, ?)');
    stmt.run(email, session_id, Date.now());
    db.close();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email capture error:', error);
    return NextResponse.json(
      { error: 'Failed to capture email' },
      { status: 500 }
    );
  }
}
