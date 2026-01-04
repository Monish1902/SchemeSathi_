export type Scheme = {
  id: string;
  name: string;
  description: string;
  category: 'Education' | 'Health' | 'Finance' | 'Housing' | 'Employment';
  benefits: string;
  applyLink: string;
  eligibilityCriteria: string[];
  documentsRequired: string[];
  applicationProcess: string;
};

export type Application = {
  id: string;
  schemeId: string;
  schemeName: string;
  dateApplied: string;
  status: 'Submitted' | 'In Review' | 'Approved' | 'Rejected';
};
