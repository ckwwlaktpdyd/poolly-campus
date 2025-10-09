/*
  # Add Focus Tool Features

  1. New Tables
    - `body_doubling_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `is_active` (boolean) - whether user is currently studying
      - `subject` (text) - what they're studying
      - `started_at` (timestamptz)
      - `last_heartbeat` (timestamptz) - to track active users
      - `created_at` (timestamptz)

    - `distraction_notes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `note` (text) - the distraction thought
      - `handled` (boolean) - whether they dealt with it
      - `focus_session_id` (uuid) - optional link to session
      - `created_at` (timestamptz)

    - `user_achievements`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `achievement_type` (text) - 'pomodoro_10', 'streak_7', 'early_bird', etc.
      - `earned_at` (timestamptz)
      - `created_at` (timestamptz)

    - `user_stats`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users, unique)
      - `total_focus_minutes` (integer) - lifetime total
      - `total_sessions` (integer)
      - `current_streak` (integer) - consecutive days
      - `longest_streak` (integer)
      - `level` (integer) - gamification level
      - `experience_points` (integer)
      - `last_study_date` (date)
      - `updated_at` (timestamptz)
      - `created_at` (timestamptz)

    - `daily_schedule_blocks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `date` (date)
      - `start_time` (time)
      - `end_time` (time)
      - `subject` (text)
      - `completed` (boolean)
      - `color` (text) - for visual timeline
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Users can only access their own data
    - Body doubling sessions are visible to all authenticated users (for count)
*/

CREATE TABLE IF NOT EXISTS body_doubling_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  is_active boolean DEFAULT true,
  subject text,
  started_at timestamptz NOT NULL DEFAULT now(),
  last_heartbeat timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE body_doubling_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all active body doubling sessions"
  ON body_doubling_sessions FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Users can create own body doubling sessions"
  ON body_doubling_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own body doubling sessions"
  ON body_doubling_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own body doubling sessions"
  ON body_doubling_sessions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS distraction_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  note text NOT NULL,
  handled boolean DEFAULT false,
  focus_session_id uuid,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE distraction_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own distraction notes"
  ON distraction_notes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own distraction notes"
  ON distraction_notes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own distraction notes"
  ON distraction_notes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own distraction notes"
  ON distraction_notes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_type text NOT NULL,
  earned_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own achievements"
  ON user_achievements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS user_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  total_focus_minutes integer DEFAULT 0,
  total_sessions integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  level integer DEFAULT 1,
  experience_points integer DEFAULT 0,
  last_study_date date,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own stats"
  ON user_stats FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own stats"
  ON user_stats FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stats"
  ON user_stats FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS daily_schedule_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  start_time time NOT NULL,
  end_time time NOT NULL,
  subject text NOT NULL,
  completed boolean DEFAULT false,
  color text DEFAULT '#3b82f6',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE daily_schedule_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own schedule blocks"
  ON daily_schedule_blocks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own schedule blocks"
  ON daily_schedule_blocks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own schedule blocks"
  ON daily_schedule_blocks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own schedule blocks"
  ON daily_schedule_blocks FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS body_doubling_sessions_active_idx ON body_doubling_sessions(is_active, last_heartbeat);
CREATE INDEX IF NOT EXISTS distraction_notes_user_id_idx ON distraction_notes(user_id);
CREATE INDEX IF NOT EXISTS user_achievements_user_id_idx ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS user_stats_user_id_idx ON user_stats(user_id);
CREATE INDEX IF NOT EXISTS daily_schedule_blocks_user_date_idx ON daily_schedule_blocks(user_id, date);
