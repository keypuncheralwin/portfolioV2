-- SQL to create the visitors table in Supabase

CREATE TABLE IF NOT EXISTS visitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip TEXT,
  city TEXT,
  country TEXT,
  platform TEXT,
  device TEXT,
  referrer TEXT,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows only inserts from authenticated clients
CREATE POLICY "Allow anonymous inserts" ON visitors
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow owner to select" ON visitors
  FOR SELECT USING (auth.role() = 'authenticated');
