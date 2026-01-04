export type Scheme = {
  id: string;
  name: string;
  description: string;
  category: 'Education' | 'Health' | 'Finance' | 'Housing' | 'Employment';
  eligibility: {
    age?: { min?: number; max?: number };
    annualIncome?: { max: number };
    category?: string[];
    disability?: boolean;
    location?: string[];
  };
  benefits: string;
  applyLink: string;
};

export type Application = {
  id: string;
  schemeId: string;
  schemeName: string;
  dateApplied: string;
  status: 'Submitted' | 'In Review' | 'Approved' | 'Rejected';
};
