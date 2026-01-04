import type { Scheme, Application } from '@/lib/types';

export const schemes: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'Pradhan Mantri Kisan Samman Nidhi',
    description: 'A government scheme that provides income support to all landholding farmer families in the country.',
    category: 'Finance',
    eligibility: {
      annualIncome: { max: 75000 },
    },
    benefits: 'Up to ₹6,000 per year as minimum income support.',
    applyLink: '#',
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana',
    description: 'A national public health insurance fund of India that aims to provide free access to health insurance coverage for low income earners in the country.',
    category: 'Health',
    eligibility: {
      annualIncome: { max: 120000 },
    },
    benefits: 'Health insurance coverage of up to ₹5 lakh per family per year.',
    applyLink: '#',
  },
  {
    id: 'pm-awaas-yojana',
    name: 'Pradhan Mantri Awaas Yojana',
    description: 'An initiative by the Government of India in which affordable housing will be provided to the urban poor.',
    category: 'Housing',
    eligibility: {
      annualIncome: { max: 300000 },
    },
    benefits: 'Affordable housing with subsidies on interest for home loans.',
    applyLink: '#',
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana',
    description: 'A small deposit scheme of the Government of India meant exclusively for a girl child.',
    category: 'Education',
    eligibility: {
      age: { max: 10 },
    },
    benefits: 'Financial security for a girl child for her education and marriage expenses.',
    applyLink: '#',
  },
  {
    id: 'skill-india',
    name: 'Skill India Mission',
    description: 'A campaign launched by Prime Minister Narendra Modi which aims to train over 40 crore people in India in different skills by 2022.',
    category: 'Employment',
    eligibility: {},
    benefits: 'Provides vocational training and certification to Indian youth for a better livelihood.',
    applyLink: '#',
  },
];

export const applications: Application[] = [
  {
    id: 'app-1',
    schemeId: 'pm-kisan',
    schemeName: 'Pradhan Mantri Kisan Samman Nidhi',
    dateApplied: '2023-05-15',
    status: 'In Review',
  },
  {
    id: 'app-2',
    schemeId: 'ayushman-bharat',
    schemeName: 'Ayushman Bharat PMJAY',
    dateApplied: '2023-04-20',
    status: 'Approved',
  },
  {
    id: 'app-3',
    schemeId: 'pm-awaas-yojana',
    schemeName: 'Pradhan Mantri Awaas Yojana',
    dateApplied: '2023-06-01',
    status: 'Submitted',
  },
];
