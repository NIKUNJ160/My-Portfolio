// Type definitions for the Cloudflare Workers environment

export interface Env {
    DB: D1Database;
}

export interface SessionPayload {
    sub: number;
    username: string;
    iat: number;
    exp: number;
}

export type Variables = {
    user: SessionPayload;
};

// Database row types matching schema.sql

export interface ProjectRow {
    id: number;
    title: string;
    description: string | null;
    image_url: string | null;
    tags: string | null;
    project_url: string | null;
    repo_url: string | null;
    is_featured: number;
    created_at: string;
}

export interface SkillRow {
    id: number;
    name: string;
    category: 'frontend' | 'backend' | 'tools' | 'other';
    proficiency: number;
    created_at: string;
}

export interface ServiceRow {
    id: number;
    title: string;
    description: string;
    icon: string | null;
    created_at: string;
}

export interface MessageRow {
    id: number;
    name: string;
    email: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    created_at: string;
}

export interface UserRow {
    id: number;
    username: string;
    password_hash: string;
    created_at: string;
}
