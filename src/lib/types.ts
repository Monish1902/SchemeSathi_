
export type Scheme = {
  schemeId: string;
  schemeName: string;
  description: string;
  category: string;
  benefitAmount: number;
  benefitCurrency: string;
  applicablePortal: string;
  eligibilityCriteria: {
    ageRange: { minimumAge: number; maximumAge: number; };
    incomeLimit: number;
    socialCategoryRequired: string[];
    genderSpecific?: string;
    employmentStatus?: string[];
    housingStatus?: string[];
    disabilityRequired?: boolean;
    educationRequired?: string[];
  };
  documentsRequired: string[];
  applicationProcess: string;
};

export type UserApplication = {
  applicationId: string;
  userId: string;
  schemeId: string;
  schemeName: string;
  applicationDate: string; // ISO String
  applicationStatus: 'Draft' | 'Submitted' | 'Under-Review' | 'Approved' | 'Rejected' | 'Appealed' | 'Withdrawn' | 'Pending-Documents';
  lastStatusUpdateDate: string; // ISO String
};
