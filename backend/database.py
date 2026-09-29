import sqlite3
import json
import os

DB_FILE = os.path.join(os.path.dirname(__file__), "pathwise.db")

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create tables
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS assessments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT,
        degree TEXT,
        branch TEXT,
        current_year TEXT,
        cgpa REAL,
        strong_subjects TEXT,
        difficult_subjects TEXT,
        time_per_day TEXT,
        profile_json TEXT,
        dna_json TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS missions (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        career_id TEXT,
        title TEXT,
        phase TEXT,
        completed INTEGER DEFAULT 0,
        description TEXT
    )
    ''')
    
    conn.commit()
    conn.close()

def save_assessment(user_id, profile_data, dna_data):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Insert assessment record
    cursor.execute('''
    INSERT INTO assessments (user_id, degree, branch, current_year, cgpa, strong_subjects, difficult_subjects, time_per_day, profile_json, dna_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        user_id,
        profile_data.get('degree', ''),
        profile_data.get('branch', ''),
        profile_data.get('current_year', ''),
        float(profile_data.get('cgpa', 0) or 0),
        json.dumps(profile_data.get('strong_subjects', [])),
        json.dumps(profile_data.get('difficult_subjects', [])),
        profile_data.get('time_per_day', '1 hour/day'),
        json.dumps(profile_data),
        json.dumps(dna_data)
    ))
    
    conn.commit()
    assessment_id = cursor.lastrowid
    conn.close()
    return assessment_id

def get_latest_assessment(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
    SELECT * FROM assessments WHERE user_id = ? ORDER BY id DESC LIMIT 1
    ''', (user_id,))
    row = cursor.fetchone()
    conn.close()
    
    if not row:
        return None
        
    return {
        "id": row["id"],
        "user_id": row["user_id"],
        "profile": json.loads(row["profile_json"]) if row["profile_json"] else {},
        "dna": json.loads(row["dna_json"]) if row["dna_json"] else {},
        "created_at": row["created_at"]
    }

def get_user_missions(user_id, career_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
    SELECT * FROM missions WHERE user_id = ? AND career_id = ?
    ''', (user_id, career_id))
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]

def save_user_missions(user_id, career_id, missions):
    conn = get_db_connection()
    cursor = conn.cursor()
    for m in missions:
        cursor.execute('''
        INSERT OR REPLACE INTO missions (id, user_id, career_id, title, phase, completed, description)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (m["id"], user_id, career_id, m["title"], m.get("phase", "Phase 1"), 1 if m.get("completed") else 0, m.get("description", "")))
    conn.commit()
    conn.close()

def update_mission_status(user_id, mission_id, completed):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
    UPDATE missions SET completed = ? WHERE user_id = ? AND id = ?
    ''', (1 if completed else 0, user_id, mission_id))
    conn.commit()
    conn.close()
