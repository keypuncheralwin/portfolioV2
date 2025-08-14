-- Create AI bots detection table
CREATE TABLE public.ai_bots (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    timestamp text NOT NULL,
    bot_detected boolean NOT NULL DEFAULT false,
    bot_name text,
    bot_service text,
    bot_type text,
    user_agent text NOT NULL,
    url text NOT NULL,
    referrer text,
    ip text,
    PRIMARY KEY (id)
);

-- Set up row level security
ALTER TABLE public.ai_bots ENABLE ROW LEVEL SECURITY;

-- Create policy to allow only the owner of the site to select data
CREATE POLICY "Enable read access for authenticated users only" 
ON public.ai_bots
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Allow inserts from the client side (since we want to track unauthenticated visitors)
CREATE POLICY "Enable insert access for all users" 
ON public.ai_bots
FOR INSERT 
WITH CHECK (true);

-- Add a comment
COMMENT ON TABLE public.ai_bots IS 'Table storing AI bot detection information from website visitors';
