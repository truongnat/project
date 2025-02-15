export interface Personnel {
  id: string;
  full_name: string;
  birth_date: string;
  position: string;
  unit: string;
  hometown: string;
  residence: string;
  created_at: string;
  updated_at: string;
}

export interface PartyMember {
  id: string;
  personnel_id: string;
  join_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface EthnicMinority {
  id: string;
  personnel_id: string;
  ethnicity: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ReligiousAffiliation {
  id: string;
  personnel_id: string;
  religion: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  personnel_id: string;
  education_level: string;
  education_type: string;
  school_name: string;
  major: string;
  created_at: string;
  updated_at: string;
}

export interface MarriageInfo {
  id: string;
  personnel_id: string;
  spouse_name: string;
  marriage_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}