export interface Soldier {
  id: string;
  name: string;
  dateOfBirth: string;
  enlistmentDate: string;
  position: string;
  rank: string;
  unit: string;
  education: string;
  politicalStatus: 'Đảng' | 'Đoàn';
  ethnicity: string;
  religion: string;
  hometown: string;
  familyInfo: string;
  notes?: string;
} 