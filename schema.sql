-- D1 (SQLite) Schema for Portfolio

-- Users table for Admin Authentication
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
);

-- Projects table for Portfolio Showcase
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    tags TEXT,
    project_url TEXT,
    repo_url TEXT,
    is_featured INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
);

-- Messages table for Contact Form Inquiries
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK(status IN ('new', 'read', 'replied')),
    created_at TEXT DEFAULT (datetime('now'))
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK(category IN ('frontend', 'backend', 'tools', 'other')),
    proficiency INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);
