/*
  # Initial schema for personnel management system

  1. New Tables
    - `personnel` - Bảng thông tin chung của cán bộ
      - id: UUID primary key
      - full_name: Họ tên
      - birth_date: Ngày sinh
      - position: Chức vụ
      - unit: Đơn vị
      - hometown: Quê quán
      - residence: Trú quán
      - created_at: Thời gian tạo

    - `party_members` - Thông tin đảng viên
      - id: UUID primary key
      - personnel_id: Reference to personnel
      - join_date: Ngày vào đảng
      - notes: Ghi chú

    - `ethnic_minorities` - Thông tin dân tộc thiểu số
      - id: UUID primary key
      - personnel_id: Reference to personnel
      - ethnicity: Dân tộc
      - notes: Ghi chú

    - `religious_affiliations` - Thông tin tôn giáo
      - id: UUID primary key
      - personnel_id: Reference to personnel
      - religion: Tôn giáo
      - notes: Ghi chú

    - `education` - Thông tin trình độ học vấn
      - id: UUID primary key
      - personnel_id: Reference to personnel
      - education_level: Trình độ đào tạo
      - education_type: Hệ đào tạo
      - school_name: Tên trường
      - major: Ngành học

    - `marriage_info` - Thông tin hôn nhân
      - id: UUID primary key
      - personnel_id: Reference to personnel
      - spouse_name: Họ tên vợ/chồng
      - marriage_date: Thời gian kết hôn
      - notes: Ghi chú

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create personnel table
CREATE TABLE personnel (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  birth_date date,
  position text,
  unit text,
  hometown text,
  residence text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create party_members table
CREATE TABLE party_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  personnel_id uuid REFERENCES personnel(id) ON DELETE CASCADE,
  join_date date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ethnic_minorities table
CREATE TABLE ethnic_minorities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  personnel_id uuid REFERENCES personnel(id) ON DELETE CASCADE,
  ethnicity text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create religious_affiliations table
CREATE TABLE religious_affiliations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  personnel_id uuid REFERENCES personnel(id) ON DELETE CASCADE,
  religion text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create education table
CREATE TABLE education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  personnel_id uuid REFERENCES personnel(id) ON DELETE CASCADE,
  education_level text NOT NULL,
  education_type text,
  school_name text,
  major text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create marriage_info table
CREATE TABLE marriage_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  personnel_id uuid REFERENCES personnel(id) ON DELETE CASCADE,
  spouse_name text,
  marriage_date date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE personnel ENABLE ROW LEVEL SECURITY;
ALTER TABLE party_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE ethnic_minorities ENABLE ROW LEVEL SECURITY;
ALTER TABLE religious_affiliations ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE marriage_info ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for authenticated users" ON personnel
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON personnel
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON personnel
  FOR UPDATE TO authenticated USING (true);

-- Repeat similar policies for other tables
CREATE POLICY "Enable read access for authenticated users" ON party_members
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON party_members
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON party_members
  FOR UPDATE TO authenticated USING (true);

-- Add similar policies for other tables...