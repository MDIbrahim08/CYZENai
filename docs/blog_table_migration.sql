-- Run this in Supabase SQL Editor to create the blogs table

CREATE TABLE IF NOT EXISTS public.blogs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL,
  author text NOT NULL,
  image text NOT NULL,
  excerpt text,
  content text NOT NULL,
  read_time text DEFAULT '5 min read',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Anyone can read blogs
CREATE POLICY "Public read access" ON public.blogs
  FOR SELECT USING (true);

-- Only authenticated users can insert
CREATE POLICY "Authenticated users can insert" ON public.blogs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
