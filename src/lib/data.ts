
import type { Scheme } from '@/lib/types';

// This data is now static. In a real application, this would come from the 'schemes' collection in Firestore.
export const schemes: Scheme[] = [
  // The existing schemes need to be mapped to the new, richer 'Scheme' type.
  // This is a sample mapping. More fields would be populated from a real data source.
  {
    schemeId: 'aadabidda-nidhi',
    schemeName: 'Aadabidda Nidhi Scheme',
    description: 'A flagship women empowerment scheme providing direct financial assistance to eligible women.',
    category: 'Women',
    benefitAmount: 1500,
    benefitCurrency: 'INR',
    applicablePortal: 'https://gsws-nbm.ap.gov.in/NBM/',
    eligibilityCriteria: {
        ageRange: { minimumAge: 18, maximumAge: 59 },
        incomeLimit: 120000,
        socialCategoryRequired: ['SC', 'ST', 'BC']
    },
    documentsRequired: ["Aadhaar Card", "White Ration Card", "Bank Account Passbook"],
    applicationProcess: `Application status can be tracked through the official NBM Portal.`
  },
  {
    schemeId: 'annadata-sukhibhava',
    schemeName: 'Annadata Sukhibhava Scheme',
    description: 'Provides annual financial assistance to small and marginal farmers.',
    category: 'Farmer',
    benefitAmount: 20000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://annadatasukhibhava.ap.gov.in',
    eligibilityCriteria: {
        ageRange: { minimumAge: 18, maximumAge: 100 },
        incomeLimit: 999999, // No practical income limit for this
        socialCategoryRequired: []
    },
    documentsRequired: ["Aadhaar Card", "Land Ownership Document", "Bank Account Passbook"],
    applicationProcess: `Applications are made through Raithu Seva Kendrams (Farmer Service Centers).`
  },
    {
    schemeId: 'ysr-vahana-mitra',
    schemeName: 'YSR Vahana Mitra Scheme (Auto Driver Sevalo)',
    description: 'Provides annual financial assistance to self-employed auto and taxi drivers.',
    category: 'Driver',
    benefitAmount: 15000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://gsws-nbm.ap.gov.in/NBM/',
    eligibilityCriteria: {
        ageRange: { minimumAge: 18, maximumAge: 100 },
        incomeLimit: 144000,
        socialCategoryRequired: []
    },
    documentsRequired: ["Aadhaar Number", "Valid Driving License", "BPL/White Ration Card"],
    applicationProcess: `Application status can be tracked on the Navasakam Beneficiary Management (NBM) Portal.`
  },
  {
    schemeId: 'thalliki-vandanam',
    schemeName: 'Thalliki Vandanam Scheme',
    description: 'Provides annual financial assistance to mothers/guardians of school children.',
    category: 'Student',
    benefitAmount: 15000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://gsws-nbm.ap.gov.in/NBM/',
    eligibilityCriteria: {
        ageRange: { minimumAge: 1, maximumAge: 100 },
        incomeLimit: 120000,
        socialCategoryRequired: []
    },
    documentsRequired: ["Student School Registration Details", "Aadhaar Card (mother's)", "White Ration Card"],
    applicationProcess: `Eligible lists and payment status can be checked on the GSWS NBM Portal.`
  },
  {
    schemeId: 'dr-ntr-vaidya-seva',
    schemeName: 'Dr. NTR Vaidya Seva Scheme',
    description: 'Provides cashless healthcare coverage up to ₹25 lakh per beneficiary annually.',
    category: 'Health',
    benefitAmount: 2500000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://drntrvaidyaseva.ap.gov.in',
    eligibilityCriteria: {
        ageRange: { minimumAge: 0, maximumAge: 100 },
        incomeLimit: 999999, // Universal for residents
        socialCategoryRequired: []
    },
    documentsRequired: ["Aadhaar Card", "White Ration Card", "Health Card"],
    applicationProcess: `Beneficiaries can get their health card and view the hospital network on the official portal.`
  },
  {
    schemeId: 'ysr-cheyutha',
    schemeName: 'YSR Cheyutha Scheme',
    description: 'Provides financial assistance over four years to eligible women for livelihood empowerment.',
    category: 'Women',
    benefitAmount: 18750,
    benefitCurrency: 'INR',
    applicablePortal: 'https://gsws-nbm.ap.gov.in/NBM/',
    eligibilityCriteria: {
        ageRange: { minimumAge: 45, maximumAge: 60 },
        incomeLimit: 120000,
        socialCategoryRequired: ['SC', 'ST', 'BC', 'Minority']
    },
    documentsRequired: ["Aadhaar Card", "Caste Certificate", "Income Certificate"],
    applicationProcess: `Applications can be made through the Navasakam Beneficiary Management Portal.`
  },
  {
    schemeId: 'indiramma-housing',
    schemeName: 'INDIRAMMA Housing Scheme',
    description: 'Provides a subsidy to construct permanent houses for BPL families.',
    category: 'Housing',
    benefitAmount: 500000, // Example subsidy amount
    benefitCurrency: 'INR',
    applicablePortal: 'https://housing.ap.gov.in',
    eligibilityCriteria: {
        ageRange: { minimumAge: 18, maximumAge: 100 },
        incomeLimit: 120000,
        socialCategoryRequired: []
    },
    documentsRequired: ["Aadhaar Card", "BPL/White Ration Card", "Land Ownership Documents"],
    applicationProcess: `Applications and information are available on the AP Housing Department portal.`
  },
  {
    schemeId: 'ap-skill-development',
    schemeName: 'AP Skill Development Schemes (APSSDC & PMKVY)',
    description: 'Offers free vocational training and job placement assistance to youth.',
    category: 'Employment',
    benefitAmount: 0, // Non-financial benefit
    benefitCurrency: 'INR',
    applicablePortal: 'https://naipunyam.ap.gov.in',
    eligibilityCriteria: {
        ageRange: { minimumAge: 18, maximumAge: 35 },
        incomeLimit: 999999,
        socialCategoryRequired: []
    },
    documentsRequired: ["Aadhaar Card", "Educational Certificate", "Identity Proof"],
    applicationProcess: `Registration and training information is available on the Naipunyam Portal.`
  },
  {
    schemeId: 'ntr-bharosa-pension',
    schemeName: 'NTR Bharosa Pension Scheme',
    description: 'Provides monthly financial assistance to various vulnerable groups.',
    category: 'General',
    benefitAmount: 4000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://sspensions.ap.gov.in',
    eligibilityCriteria: {
        ageRange: { minimumAge: 60, maximumAge: 100 },
        incomeLimit: 120000,
        socialCategoryRequired: []
    },
    documentsRequired: ["Aadhaar Card", "Age Proof", "Bank Account Details"],
    applicationProcess: `Application and status checks can be done through the SS Pension Portal.`
  },
  {
    schemeId: 'dokka-seethamma-midday-meal',
    schemeName: 'Dokka Seethamma Midday Meal Scheme (PM POSHAN)',
    description: 'Provides free nutritious meals to government school students daily.',
    category: 'Student',
    benefitAmount: 0, // Non-financial benefit
    benefitCurrency: 'INR',
    applicablePortal: 'https://pmposhan.education.gov.in',
    eligibilityCriteria: {
        ageRange: { minimumAge: 6, maximumAge: 14 },
        incomeLimit: 999999,
        socialCategoryRequired: []
    },
    documentsRequired: ["School Registration/Enrollment Details"],
    applicationProcess: `Students are automatically covered upon enrollment in a government school.`
  },
  {
    schemeId: 'rythu-bharosa',
    schemeName: 'Rythu Bharosa Scheme',
    description: 'A farmer investment support scheme providing financial assistance to land-owning farmers.',
    category: 'Farmer',
    benefitAmount: 13500,
    benefitCurrency: 'INR',
    applicablePortal: 'https://gramawardsachivalayam.ap.gov.in/GSWS/Home/Main',
    eligibilityCriteria: {
        ageRange: { minimumAge: 18, maximumAge: 100 },
        incomeLimit: 999999,
        socialCategoryRequired: []
    },
    documentsRequired: ["Aadhaar Card", "Land ownership documents (Pattadar Passbook)", "Bank account details"],
    applicationProcess: `Farmers can apply through the local Village/Ward Secretariat (Sachivalayam).`
  },
  {
    schemeId: 'ysr-kapu-nestham',
    schemeName: 'YSR Kapu Nestham',
    description: 'Provides financial assistance to women of the Kapu, Balija, Telaga, and Ontari communities.',
    category: 'Women',
    benefitAmount: 15000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://gsws-nbm.ap.gov.in/NBM/',
    eligibilityCriteria: {
        ageRange: { minimumAge: 45, maximumAge: 60 },
        incomeLimit: 120000,
        socialCategoryRequired: ["General"] // Kapu falls here
    },
    documentsRequired: ["Aadhaar Card", "Caste certificate", "Income certificate"],
    applicationProcess: `Applications can be submitted through the local Village/Ward Secretariat (Sachivalayam).`
  },
  {
    schemeId: 'ysr-pension-kanuka',
    schemeName: 'YSR Pension Kanuka',
    description: 'A comprehensive social security pension scheme for various vulnerable sections.',
    category: 'General',
    benefitAmount: 3000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://sspensions.ap.gov.in/default.aspx',
    eligibilityCriteria: {
        ageRange: { minimumAge: 60, maximumAge: 100 },
        incomeLimit: 120000,
        socialCategoryRequired: []
    },
    documentsRequired: ["Aadhaar Card", "White Ration Card", "Bank Account Passbook"],
    applicationProcess: 'Applications are submitted at the Village/Ward Secretariat.'
  },
  {
    schemeId: 'jagananna-vidya-deevena',
    schemeName: 'Jagananna Vidya Deevena',
    description: 'A full fee reimbursement scheme for students pursuing post-matric courses.',
    category: 'Student',
    benefitAmount: 0, // Fee reimbursement, not direct cash
    benefitCurrency: 'INR',
    applicablePortal: 'https://jnanabhumi.ap.gov.in/',
    eligibilityCriteria: {
        ageRange: { minimumAge: 15, maximumAge: 40 },
        incomeLimit: 250000,
        socialCategoryRequired: ['SC', 'ST', 'BC', 'EBC', 'Kapu', 'Minority']
    },
    documentsRequired: ["Aadhaar Card of student and parents", "Caste and Income certificates", "College admission details"],
    applicationProcess: 'Students apply through the Jnanabhumi portal.'
  },
   {
    schemeId: 'ysr-matsyakara-bharosa',
    schemeName: 'YSR Matsyakara Bharosa',
    description: 'Provides financial support to fishermen during the annual marine fishing ban period.',
    category: 'Fisherman',
    benefitAmount: 10000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://apfisheries.gov.in/',
    eligibilityCriteria: {
        ageRange: { minimumAge: 18, maximumAge: 60 },
        incomeLimit: 999999,
        socialCategoryRequired: []
    },
    documentsRequired: ["Aadhaar Card", "Fisherman Biometric ID Card", "Boat Registration Certificate"],
    applicationProcess: 'Applications are processed through the Fisheries Department.'
  }
];
