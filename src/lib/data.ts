import type { Scheme, Application } from '@/lib/types';

export const schemes: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'Pradhan Mantri Kisan Samman Nidhi',
    description: 'A government scheme that provides income support to all landholding farmer families in the country.',
    category: 'Finance',
    benefits: 'Up to ₹6,000 per year as minimum income support.',
    applyLink: 'https://pmkisan.gov.in/',
    eligibilityCriteria: [
        "Must be an Indian citizen.",
        "Must own cultivable land.",
        "Annual household income should not exceed the limit set by the state government.",
        "Should not be an institutional landholder.",
    ],
    documentsRequired: [
        "Aadhaar Card",
        "Landholding papers",
        "Bank account details",
        "Citizenship certificate",
    ],
    applicationProcess: `1. Visit the official PM-Kisan website (pmkisan.gov.in).
2. Click on the 'New Farmer Registration' option on the homepage.
3. Enter your Aadhaar number, mobile number, and select your state.
4. Fill in the application form with your personal and land details.
5. Upload the required documents and submit the form.`
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana',
    description: 'A national public health insurance fund of India that aims to provide free access to health insurance coverage for low income earners in the country.',
    category: 'Health',
    benefits: 'Health insurance coverage of up to ₹5 lakh per family per year.',
    applyLink: 'https://abdm.gov.in/',
     eligibilityCriteria: [
        "Family must be listed in the Socio-Economic Caste Census (SECC) 2011 database.",
        "No age limit for beneficiaries.",
        "Must not be a government employee or pensioner.",
        "Specific criteria for rural and urban households apply."
    ],
    documentsRequired: [
        "Aadhaar Card or other government-issued photo ID.",
        "Ration Card or proof of family.",
        "Proof of inclusion in the SECC 2011 list (if available).",
        "Mobile number.",
    ],
    applicationProcess: `1. Check your eligibility on the official PMJAY website or by calling the helpline.
2. If eligible, you can get your Ayushman Card from a Common Service Center (CSC) or an empanelled hospital.
3. Provide your documents for verification.
4. Once verified, your card will be issued, which can be used to avail cashless treatment at empanelled hospitals.`
  },
  {
    id: 'pm-awaas-yojana',
    name: 'Pradhan Mantri Awaas Yojana',
    description: 'An initiative by the Government of India in which affordable housing will be provided to the urban poor.',
    category: 'Housing',
    benefits: 'Affordable housing with subsidies on interest for home loans.',
    applyLink: 'https://pmaymis.gov.in/',
     eligibilityCriteria: [
        "The beneficiary family should not own a pucca house in any part of India.",
        "The family should not have availed of any central/state housing scheme.",
        "Annual income must fall within the defined categories (EWS, LIG).",
        "The property must be co-owned by a female member of the family."
    ],
    documentsRequired: [
        "Aadhaar Card of all family members.",
        "Income proof (e.g., salary slips, ITR).",
        "Bank account statements.",
        "Affidavit stating that the family does not own a pucca house.",
    ],
    applicationProcess: `1. Visit the official PMAY website.
2. Select the 'Citizen Assessment' option and choose the appropriate category.
3. Enter your Aadhaar details for verification.
4. Fill out the detailed application form with personal, income, and bank details.
5. Save and submit the application. Note down the application number for future reference.`
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana',
    description: 'A small deposit scheme of the Government of India meant exclusively for a girl child.',
    category: 'Education',
    benefits: 'Financial security for a girl child for her education and marriage expenses.',
    applyLink: 'https://www.indiapost.gov.in/Financial/Pages/Content/sukanya-samriddhi-yojana.aspx',
     eligibilityCriteria: [
        "The account can be opened for a girl child below the age of 10.",
        "Only one account is allowed per girl child.",
        "A family can open a maximum of two accounts for two different girl children.",
        "The guardian must be a resident Indian."
    ],
    documentsRequired: [
        "Birth certificate of the girl child.",
        "Identity and address proof of the guardian (Aadhaar, PAN card).",
        "Account opening form from the post office or authorized bank.",
        "Initial deposit amount."
    ],
    applicationProcess: `1. Visit a nearby post office or an authorized bank branch.
2. Fill out the Sukanya Samriddhi Yojana account opening form.
3. Submit the required documents along with the form.
4. Make the initial deposit (minimum ₹250).
5. The account will be opened, and a passbook will be provided.`
  },
  {
    id: 'skill-india',
    name: 'Skill India Mission',
    description: 'A campaign launched by Prime Minister Narendra Modi which aims to train over 40 crore people in India in different skills by 2022.',
    category: 'Employment',
    benefits: 'Provides vocational training and certification to Indian youth for a better livelihood.',
    applyLink: 'https://www.skillindia.gov.in/',
     eligibilityCriteria: [
        "Must be an Indian national.",
        "Age and educational qualifications may vary depending on the specific skill course.",
        "Open to unemployed youth, school/college dropouts, and employed individuals seeking skill upgradation."
    ],
    documentsRequired: [
        "Aadhaar Card.",
        "Bank account details.",
        "Educational qualification certificates (if applicable).",
        "Passport-sized photographs."
    ],
    applicationProcess: `1. Visit the Skill India portal or a PMKVY training center.
2. Choose a skill course based on your interest and eligibility.
3. Enroll in the course by providing your details and required documents.
4. Complete the training program.
5. After successful assessment, you will receive a government-recognized certificate.`
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
