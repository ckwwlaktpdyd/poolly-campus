/*
  # Create Anonymous Mentor-Mentee System

  1. New Tables
    - `mentor_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `anonymous_name` (text) - e.g., "멘토123", "선배456"
      - `subjects` (text array) - subjects they can help with
      - `mentor_level` (integer, default 1)
      - `mentor_points` (integer, default 0)
      - `total_helped` (integer, default 0)
      - `rating_average` (decimal)
      - `is_active` (boolean, default true)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `help_requests` (Q&A Board)
      - `id` (uuid, primary key)
      - `mentee_id` (uuid, references auth.users)
      - `anonymous_name` (text) - e.g., "멘티789"
      - `subject` (text)
      - `title` (text)
      - `content` (text)
      - `difficulty_level` (text) - 'beginner', 'intermediate', 'advanced'
      - `urgency` (text) - 'low', 'medium', 'high'
      - `status` (text) - 'open', 'answered', 'resolved'
      - `view_count` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `help_responses`
      - `id` (uuid, primary key)
      - `request_id` (uuid, references help_requests)
      - `mentor_id` (uuid, references auth.users)
      - `anonymous_name` (text)
      - `content` (text)
      - `helpful_count` (integer, default 0)
      - `is_accepted` (boolean, default false)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `mentor_ratings`
      - `id` (uuid, primary key)
      - `response_id` (uuid, references help_responses)
      - `mentee_id` (uuid, references auth.users)
      - `rating` (integer) - 1 to 5
      - `is_helpful` (boolean)
      - `created_at` (timestamptz)

    - `chat_rooms`
      - `id` (uuid, primary key)
      - `mentor_id` (uuid, references auth.users)
      - `mentee_id` (uuid, references auth.users)
      - `subject` (text)
      - `status` (text) - 'active', 'completed', 'cancelled'
      - `mentor_anonymous_name` (text)
      - `mentee_anonymous_name` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `completed_at` (timestamptz)

    - `chat_messages`
      - `id` (uuid, primary key)
      - `room_id` (uuid, references chat_rooms)
      - `sender_id` (uuid, references auth.users)
      - `sender_anonymous_name` (text)
      - `content` (text)
      - `is_read` (boolean, default false)
      - `created_at` (timestamptz)

    - `study_groups`
      - `id` (uuid, primary key)
      - `subject` (text)
      - `title` (text)
      - `description` (text)
      - `max_members` (integer, default 6)
      - `current_members` (integer, default 1)
      - `creator_id` (uuid, references auth.users)
      - `creator_anonymous_name` (text)
      - `status` (text) - 'recruiting', 'active', 'completed'
      - `meeting_schedule` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `study_group_members`
      - `id` (uuid, primary key)
      - `group_id` (uuid, references study_groups)
      - `user_id` (uuid, references auth.users)
      - `anonymous_name` (text)
      - `role` (text) - 'creator', 'member'
      - `joined_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Users can view public information but manage only their own data
    - Anonymous names protect user identity
*/

CREATE TABLE IF NOT EXISTS mentor_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  anonymous_name text NOT NULL,
  subjects text[] DEFAULT '{}',
  mentor_level integer DEFAULT 1,
  mentor_points integer DEFAULT 0,
  total_helped integer DEFAULT 0,
  rating_average decimal(3,2),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE mentor_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active mentor profiles"
  ON mentor_profiles
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Users can update own mentor profile"
  ON mentor_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own mentor profile"
  ON mentor_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS help_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentee_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  anonymous_name text NOT NULL,
  subject text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  difficulty_level text DEFAULT 'beginner',
  urgency text DEFAULT 'medium',
  status text DEFAULT 'open',
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE help_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view help requests"
  ON help_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own help requests"
  ON help_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = mentee_id);

CREATE POLICY "Users can update own help requests"
  ON help_requests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = mentee_id)
  WITH CHECK (auth.uid() = mentee_id);

CREATE TABLE IF NOT EXISTS help_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES help_requests ON DELETE CASCADE,
  mentor_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  anonymous_name text NOT NULL,
  content text NOT NULL,
  helpful_count integer DEFAULT 0,
  is_accepted boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE help_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view responses"
  ON help_responses
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own responses"
  ON help_responses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = mentor_id);

CREATE POLICY "Users can update own responses"
  ON help_responses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = mentor_id)
  WITH CHECK (auth.uid() = mentor_id);

CREATE TABLE IF NOT EXISTS mentor_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id uuid NOT NULL REFERENCES help_responses ON DELETE CASCADE,
  mentee_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  is_helpful boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(response_id, mentee_id)
);

ALTER TABLE mentor_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ratings"
  ON mentor_ratings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own ratings"
  ON mentor_ratings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = mentee_id);

CREATE TABLE IF NOT EXISTS chat_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  mentee_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  subject text NOT NULL,
  status text DEFAULT 'active',
  mentor_anonymous_name text NOT NULL,
  mentee_anonymous_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chat rooms"
  ON chat_rooms
  FOR SELECT
  TO authenticated
  USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);

CREATE POLICY "Users can insert chat rooms as mentor or mentee"
  ON chat_rooms
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = mentor_id OR auth.uid() = mentee_id);

CREATE POLICY "Room participants can update"
  ON chat_rooms
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = mentor_id OR auth.uid() = mentee_id)
  WITH CHECK (auth.uid() = mentor_id OR auth.uid() = mentee_id);

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES chat_rooms ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  sender_anonymous_name text NOT NULL,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Room participants can view messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_rooms
      WHERE chat_rooms.id = chat_messages.room_id
      AND (chat_rooms.mentor_id = auth.uid() OR chat_rooms.mentee_id = auth.uid())
    )
  );

CREATE POLICY "Room participants can insert messages"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM chat_rooms
      WHERE chat_rooms.id = chat_messages.room_id
      AND (chat_rooms.mentor_id = auth.uid() OR chat_rooms.mentee_id = auth.uid())
    )
  );

CREATE TABLE IF NOT EXISTS study_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  max_members integer DEFAULT 6,
  current_members integer DEFAULT 1,
  creator_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  creator_anonymous_name text NOT NULL,
  status text DEFAULT 'recruiting',
  meeting_schedule text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE study_groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view study groups"
  ON study_groups
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own study groups"
  ON study_groups
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creator can update study group"
  ON study_groups
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_id)
  WITH CHECK (auth.uid() = creator_id);

CREATE TABLE IF NOT EXISTS study_group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES study_groups ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  anonymous_name text NOT NULL,
  role text DEFAULT 'member',
  joined_at timestamptz DEFAULT now(),
  UNIQUE(group_id, user_id)
);

ALTER TABLE study_group_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view group members"
  ON study_group_members
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can join groups"
  ON study_group_members
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave groups"
  ON study_group_members
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_help_requests_subject ON help_requests(subject);
CREATE INDEX IF NOT EXISTS idx_help_requests_status ON help_requests(status);
CREATE INDEX IF NOT EXISTS idx_help_responses_request ON help_responses(request_id);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_mentor ON chat_rooms(mentor_id);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_mentee ON chat_rooms(mentee_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_room ON chat_messages(room_id);
CREATE INDEX IF NOT EXISTS idx_study_groups_status ON study_groups(status);
CREATE INDEX IF NOT EXISTS idx_study_group_members_group ON study_group_members(group_id);
