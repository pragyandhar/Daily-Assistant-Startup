-- Fix conversations table to accept text IDs instead of UUIDs
-- This matches how your app generates conversation IDs

-- Step 1: Drop existing table (WARNING: This will delete all existing conversations)
DROP TABLE IF EXISTS conversations;

-- Step 2: Recreate table with TEXT id instead of UUID
CREATE TABLE conversations (
  id TEXT PRIMARY KEY,  -- Changed from UUID to TEXT
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR NOT NULL,
  messages JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 3: Re-enable Row Level Security
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Step 4: Recreate policies for conversations table
CREATE POLICY "Users can view own conversations" ON conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations" ON conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations" ON conversations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own conversations" ON conversations
  FOR DELETE USING (auth.uid() = user_id);

-- Step 5: Recreate indexes
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);
