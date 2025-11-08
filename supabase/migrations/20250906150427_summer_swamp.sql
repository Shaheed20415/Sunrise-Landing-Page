/*
  # Complete Enquiry System Database Schema

  1. New Tables
    - `enquiries`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `mobile` (text, required)
      - `subject` (text, required)
      - `message` (text, required)
      - `status` (text, default 'unread')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `enquiries` table
    - Add policies for authenticated users to manage enquiries
    - Add policy for public users to insert enquiries

  3. Functions
    - Auto-update `updated_at` timestamp on record changes
*/

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  mobile text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'in_progress', 'resolved')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert enquiries"
  ON enquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all enquiries"
  ON enquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update enquiries"
  ON enquiries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete enquiries"
  ON enquiries
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO enquiries (name, email, mobile, subject, message, status) VALUES
  ('John Doe', 'john@example.com', '9876543210', 'Property Investment', 'I am interested in investing in residential properties. Can you provide more details about current opportunities?', 'unread'),
  ('Jane Smith', 'jane@example.com', '9876543211', 'Commercial Space', 'Looking for commercial space for my business. Need around 2000 sq ft in prime location.', 'read'),
  ('Mike Johnson', 'mike@example.com', '9876543212', 'Home Loan Assistance', 'Need help with home loan process and documentation. First time buyer.', 'resolved');

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_mobile ON enquiries(mobile);