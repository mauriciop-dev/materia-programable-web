
-- Enable pgvector extension for RAG
CREATE EXTENSION IF NOT EXISTS vector;

-- Table for scientific articles/posts
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content_html TEXT NOT NULL, -- Max 2400 chars recommendation in prompt
  image_url TEXT,
  image_prompt TEXT,
  category TEXT DEFAULT 'General',
  language TEXT DEFAULT 'es',
  references_html TEXT,
  embedding VECTOR(1536), -- For RAG (OpenAI or Gemini embeddings)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for email subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  frequency TEXT CHECK (frequency IN ('diaria', 'semanal')) DEFAULT 'diaria',
  preferences JSONB DEFAULT '{"topics": ["claytronics", "nanotech"]}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for action logging (Agents & Users)
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id TEXT, -- For tracking A2UI/A2A actions
  action_type TEXT NOT NULL, -- 'POST_CREATED', 'USER_SIGNUP', 'VECTOR_SEARCH'
  metadata JSONB,
  severity TEXT DEFAULT 'info',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Read policies
CREATE POLICY "Public can read posts" ON posts FOR SELECT USING (TRUE);
