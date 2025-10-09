/*
  # Learning Help System Schema

  1. New Tables
    - `focus_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `session_type` (text) - 'pomodoro', 'custom', etc.
      - `duration_minutes` (integer)
      - `completed` (boolean)
      - `subject` (text) - optional subject focus
      - `notes` (text) - optional session notes
      - `started_at` (timestamptz)
      - `completed_at` (timestamptz)
      - `created_at` (timestamptz)

    - `study_goals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `description` (text)
      - `target_minutes` (integer)
      - `completed_minutes` (integer)
      - `deadline` (timestamptz)
      - `completed` (boolean)
      - `created_at` (timestamptz)

    - `study_materials`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `subject` (text)
      - `title` (text)
      - `description` (text)
      - `material_type` (text) - 'notes', 'video', 'document', 'link'
      - `content_url` (text)
      - `shared` (boolean) - whether shared with community
      - `created_at` (timestamptz)

    - `learning_reflections`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `date` (date)
      - `subjects_studied` (text[]) - array of subjects
      - `total_focus_minutes` (integer)
      - `challenges` (text) - what was difficult
      - `achievements` (text) - what went well
      - `ai_analysis` (jsonb) - AI generated insights
      - `created_at` (timestamptz)

    - `tutor_requests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `subject` (text)
      - `topic` (text)
      - `description` (text)
      - `urgency` (text) - 'low', 'medium', 'high'
      - `status` (text) - 'pending', 'matched', 'completed'
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for shared study materials
*/

-- Focus Sessions Table
CREATE TABLE IF NOT EXISTS focus_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_type text NOT NULL DEFAULT 'pomodoro',
  duration_minutes integer NOT NULL,
  completed boolean DEFAULT false,
  subject text,
  notes text,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE focus_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own focus sessions"
  ON focus_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own focus sessions"
  ON focus_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own focus sessions"
  ON focus_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own focus sessions"
  ON focus_sessions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Study Goals Table
CREATE TABLE IF NOT EXISTS study_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  target_minutes integer NOT NULL DEFAULT 60,
  completed_minutes integer DEFAULT 0,
  deadline timestamptz,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE study_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own study goals"
  ON study_goals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own study goals"
  ON study_goals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own study goals"
  ON study_goals FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own study goals"
  ON study_goals FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Study Materials Table
CREATE TABLE IF NOT EXISTS study_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject text NOT NULL,
  title text NOT NULL,
  description text,
  material_type text NOT NULL DEFAULT 'notes',
  content_url text,
  shared boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE study_materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own study materials"
  ON study_materials FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view shared study materials"
  ON study_materials FOR SELECT
  TO authenticated
  USING (shared = true);

CREATE POLICY "Users can create own study materials"
  ON study_materials FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own study materials"
  ON study_materials FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own study materials"
  ON study_materials FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Learning Reflections Table
CREATE TABLE IF NOT EXISTS learning_reflections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  subjects_studied text[] DEFAULT '{}',
  total_focus_minutes integer DEFAULT 0,
  challenges text,
  achievements text,
  ai_analysis jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE learning_reflections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own learning reflections"
  ON learning_reflections FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own learning reflections"
  ON learning_reflections FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own learning reflections"
  ON learning_reflections FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own learning reflections"
  ON learning_reflections FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Tutor Requests Table
CREATE TABLE IF NOT EXISTS tutor_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject text NOT NULL,
  topic text NOT NULL,
  description text,
  urgency text DEFAULT 'medium',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tutor_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tutor requests"
  ON tutor_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own tutor requests"
  ON tutor_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tutor requests"
  ON tutor_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tutor requests"
  ON tutor_requests FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS focus_sessions_user_id_idx ON focus_sessions(user_id);
CREATE INDEX IF NOT EXISTS focus_sessions_started_at_idx ON focus_sessions(started_at);
CREATE INDEX IF NOT EXISTS study_goals_user_id_idx ON study_goals(user_id);
CREATE INDEX IF NOT EXISTS study_materials_user_id_idx ON study_materials(user_id);
CREATE INDEX IF NOT EXISTS study_materials_shared_idx ON study_materials(shared);
CREATE INDEX IF NOT EXISTS learning_reflections_user_id_idx ON learning_reflections(user_id);
CREATE INDEX IF NOT EXISTS learning_reflections_date_idx ON learning_reflections(date);
CREATE INDEX IF NOT EXISTS tutor_requests_user_id_idx ON tutor_requests(user_id);
