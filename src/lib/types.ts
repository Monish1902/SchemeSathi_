
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
  };
  documentsRequired: string[];
  applicationProcess: string; // Assuming this maps from your old structure.
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
