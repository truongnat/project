export interface Soldier {
  // Basic Info
  id: string;
  fullName: string;
  dateOfBirth: string;
  position: string;
  unit: string;
  hometown: string;
  currentAddress: string;
  notes?: string;
  
  // Appendix specific fields
  isPartyMember?: boolean;
  ethnicity?: string;
  religion?: string;
  fatherName?: string;
  motherName?: string;

  // Party Member Info
  partyJoinDate?: string;

  // Parents Info
  parentsPartyMember?: {
    father: boolean;
    mother: boolean;
  };
  parentsAreVeterans?: {
    father: boolean;
    mother: boolean;
    details: string;
  };

  // Education
  education: {
    level: 'university' | 'college' | 'vocational';
    type: string; // Regular, part-time etc
    schoolName: string;
    major: string;
  };

  // Marriage Status
  marriageStatus: {
    isMarried: boolean;
    spouseName?: string;
    marriageDate?: string;
    isDivorced?: boolean;
    livingWith?: string; // In case of divorce
  };

  // Family Status
  familyStatus: {
    isParentDeceased?: {
      father: boolean;
      mother: boolean;
    };
    policyFamily?: boolean; // Gia đình chính sách
    policyDetails?: string;
  };

  // Legal Issues
  legalIssues?: {
    personalViolations: {
      date: string;
      reason: string;
      punishment: string;
      verificationResult: string;
    }[];
    familyViolations: {
      relative: string;
      violation: string;
      date: string;
      sentence: string;
    }[];
  };

  // Special Marks
  tattoos?: {
    description: string;
    location: string;
  }[];

  // Debt Information
  appLoans?: {
    lender: string;
    amount: number;
    date: string;
    remainingDebt: number;
    purpose: string;
  }[];

  // Foreign Relations
  foreignRelatives?: {
    relativeName: string;
    relationship: string;
    country: string;
  }[];
  
  foreignTravel?: {
    country: string;
    visa: string;
    frequency: number;
    dateFrom: string;
    dateTo: string;
    purpose: string;
    verificationResult: string;
  }[];

  // Health & Social Issues
  drugUse?: {
    type: string;
    verificationResult: string;
  };
  
  seriousIllness?: {
    condition: string;
    details: string;
  };

  hardship?: {
    description: string;
    details: string;
  };

  // Special Recruitment
  specialRecruitment?: {
    details: string;
  };
}
