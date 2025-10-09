/*
  # Create User Settings Tables

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text)
      - `major` (text)
      - `student_id` (text)
      - `semester` (text)
      - `is_verified` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `user_study_settings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `pomodoro_time` (integer, default 25)
      - `break_time` (integer, default 5)
      - `daily_goal_hours` (integer, default 4)
      - `notification_study_start` (boolean, default true)
      - `notification_study_end` (boolean, default true)
      - `notification_break_time` (boolean, default true)
      - `notification_daily_goal` (boolean, default true)
      - `dark_mode` (boolean, default false)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own settings
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  major text,
  student_id text,
  semester text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS user_study_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  pomodoro_time integer DEFAULT 25,
  break_time integer DEFAULT 5,
  daily_goal_hours integer DEFAULT 4,
  notification_study_start boolean DEFAULT true,
  notification_study_end boolean DEFAULT true,
  notification_break_time boolean DEFAULT true,
  notification_daily_goal boolean DEFAULT true,
  dark_mode boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_study_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own study settings"
  ON user_study_settings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own study settings"
  ON user_study_settings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own study settings"
  ON user_study_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_profiles_student_id ON user_profiles(student_id);
CREATE INDEX IF NOT EXISTS idx_user_study_settings_user_id ON user_study_settings(user_id);
