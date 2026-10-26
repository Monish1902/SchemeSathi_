import type { Scheme } from '@/lib/types';

export const schemes: Scheme[] = [
  // --- FARMER SCHEMES ---
  {
    schemeId: 'annadata-sukhibhava',
    schemeName: 'Annadata Sukhibhava Scheme',
    description: 'Provides annual financial assistance of ₹20,000 to small and marginal farmers for agricultural input and livelihood support.',
    category: 'Farmer',
    benefitAmount: 20000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://annadatasukhibhava.ap.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 100 },
      incomeLimit: 300000,
      socialCategoryRequired: [],
      employmentStatus: ['farmer']
    },
    documentsRequired: ['Aadhaar Card', 'Land Ownership Pattadar Passbook', 'Bank Account Passbook', 'White Ration Card'],
    applicationProcess: 'Farmers can enroll and verify their survey numbers through their local Raithu Seva Kendram (RSK) or Village Secretariat.'
  },
  {
    schemeId: 'rythu-bharosa',
    schemeName: 'Rythu Bharosa Scheme',
    description: 'Investment support scheme providing ₹13,500 per year directly into farmer bank accounts in three scheduled installments.',
    category: 'Farmer',
    benefitAmount: 13500,
    benefitCurrency: 'INR',
    applicablePortal: 'https://ysrrythubharosa.ap.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 100 },
      incomeLimit: 250000,
      socialCategoryRequired: [],
      employmentStatus: ['farmer']
    },
    documentsRequired: ['Aadhaar Card', '1-B Adangal Land Record', 'Bank Account Details', 'Active Mobile Number'],
    applicationProcess: 'Apply at the Village/Ward Secretariat (Sachivalayam) with land documents and biometric authentication.'
  },
  {
    schemeId: 'pm-kisan-samman-nidhi',
    schemeName: 'PM-KISAN Samman Nidhi',
    description: 'Central government income support scheme providing ₹6,000 per year in three equal quarterly installments of ₹2,000 to landholding farmer families.',
    category: 'Farmer',
    benefitAmount: 6000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://pmkisan.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 100 },
      incomeLimit: 400000,
      socialCategoryRequired: [],
      employmentStatus: ['farmer']
    },
    documentsRequired: ['Aadhaar Card', 'Land Ownership Records', 'Bank Account Linked with NPCI/Aadhaar'],
    applicationProcess: 'Self-register on the PM-KISAN portal or visit your nearest Common Service Centre (CSC) / RSK.'
  },
  {
    schemeId: 'pm-fasal-bima-yojana',
    schemeName: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    description: 'Comprehensive crop insurance covering non-preventable natural risks from pre-sowing to post-harvest stages with minimal farmer premium share.',
    category: 'Farmer',
    benefitAmount: 50000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://pmfby.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 100 },
      incomeLimit: 500000,
      socialCategoryRequired: [],
      employmentStatus: ['farmer']
    },
    documentsRequired: ['Aadhaar Card', 'Land Sowing Certificate', 'Pattadar Passbook / Tenant Agreement', 'Bank Details'],
    applicationProcess: 'Enroll through bank branch while taking crop loan, or self-apply through PMFBY portal before cutoff dates.'
  },

  // --- HEALTHCARE SCHEMES ---
  {
    schemeId: 'dr-ntr-vaidya-seva',
    schemeName: 'Dr. NTR Vaidya Seva Scheme (Aarogyasri)',
    description: 'Universal cashless medical treatment scheme providing comprehensive coverage up to ₹25 lakh per family per year across network hospitals.',
    category: 'Health',
    benefitAmount: 2500000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://drntrvaidyaseva.ap.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 0, maximumAge: 100 },
      incomeLimit: 500000,
      socialCategoryRequired: []
    },
    documentsRequired: ['Aadhaar Card', 'Aarogyasri Health Card / White BPL Ration Card'],
    applicationProcess: 'Approach the Aarogya Mithra desk at any empanelled government or private network hospital for instantaneous cashless admission.'
  },

  // --- WOMEN EMPOWERMENT SCHEMES ---
  {
    schemeId: 'aadabidda-nidhi',
    schemeName: 'Aadabidda Nidhi Scheme',
    description: 'Direct monthly financial assistance of ₹1,500 (₹18,000 annually) for women aged 18 to 59 to foster personal financial independence and security.',
    category: 'Women',
    benefitAmount: 18000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://gsws-nbm.ap.gov.in/NBM/',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 59 },
      incomeLimit: 144000,
      socialCategoryRequired: [],
      genderSpecific: 'female'
    },
    documentsRequired: ['Aadhaar Card', 'White Ration Card', 'Active Bank Account with Aadhaar Seeded', 'Income Certificate'],
    applicationProcess: 'Apply online through the GSWS Navasakam Beneficiary Management (NBM) portal or your Village Secretariat.'
  },
  {
    schemeId: 'ysr-cheyutha',
    schemeName: 'YSR Cheyutha Scheme',
    description: 'Financial assistance of ₹75,000 distributed over four years (₹18,750 per year) for women belonging to SC, ST, BC, and Minority communities.',
    category: 'Women',
    benefitAmount: 18750,
    benefitCurrency: 'INR',
    applicablePortal: 'https://gsws-nbm.ap.gov.in/NBM/',
    eligibilityCriteria: {
      ageRange: { minimumAge: 45, maximumAge: 60 },
      incomeLimit: 120000,
      socialCategoryRequired: ['SC', 'ST', 'BC', 'Minority'],
      genderSpecific: 'female'
    },
    documentsRequired: ['Aadhaar Card', 'Integrated Caste Certificate', 'Income Certificate', 'Bank Passbook'],
    applicationProcess: 'Village/Ward Volunteers complete digital verification and door-step enrollment.'
  },
  {
    schemeId: 'ysr-kapu-nestham',
    schemeName: 'YSR Kapu Nestham',
    description: 'Annual financial aid of ₹15,000 (total ₹75,000 across 5 years) for women of Kapu, Balija, Telaga, and Ontari communities.',
    category: 'Women',
    benefitAmount: 15000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://gsws-nbm.ap.gov.in/NBM/',
    eligibilityCriteria: {
      ageRange: { minimumAge: 45, maximumAge: 60 },
      incomeLimit: 120000,
      socialCategoryRequired: ['General', 'EBC', 'EWS'],
      genderSpecific: 'female'
    },
    documentsRequired: ['Aadhaar Card', 'Community Caste Certificate', 'Ration Card', 'Bank Passbook'],
    applicationProcess: 'Submit your application and documentation at your Ward or Grama Sachivalayam.'
  },
  {
    schemeId: 'ysr-sunna-vaddi',
    schemeName: 'YSR Sunna Vaddi (Zero-Interest Loan Scheme)',
    description: 'Interest subvention directly paid by the government for Self Help Group (SHG) women who repay their bank loans on time.',
    category: 'Women',
    benefitAmount: 10000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://serp.ap.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 60 },
      incomeLimit: 150000,
      socialCategoryRequired: [],
      genderSpecific: 'female'
    },
    documentsRequired: ['SHG Member ID', 'Aadhaar Card', 'Bank Loan Account Number', 'Prompt Repayment Record'],
    applicationProcess: 'Calculated and credited automatically to the SHG group bank account through SERP and MEPMA networks.'
  },
  {
    schemeId: 'sukanya-samriddhi-yojana',
    schemeName: 'Sukanya Samriddhi Yojana (SSY)',
    description: 'Government-backed high-yield small deposit savings scheme for girl children below 10 years of age with tax-exempt returns under Section 80C.',
    category: 'Women',
    benefitAmount: 150000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://www.indiapost.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 0, maximumAge: 10 },
      incomeLimit: 1000000,
      socialCategoryRequired: [],
      genderSpecific: 'female'
    },
    documentsRequired: ["Girl Child's Birth Certificate", "Parent/Guardian Aadhaar and PAN", 'Address Proof'],
    applicationProcess: 'Open an account at any Post Office or authorized public/private commercial bank.'
  },

  // --- EDUCATION & STUDENT SCHEMES ---
  {
    schemeId: 'thalliki-vandanam',
    schemeName: 'Thalliki Vandanam Scheme (Amma Vodi)',
    description: 'Annual financial incentive of ₹15,000 deposited directly into the bank accounts of mothers who send their children to recognized schools.',
    category: 'Student',
    benefitAmount: 15000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://gsws-nbm.ap.gov.in/NBM/',
    eligibilityCriteria: {
      ageRange: { minimumAge: 5, maximumAge: 18 },
      incomeLimit: 120000,
      socialCategoryRequired: [],
      employmentStatus: ['student']
    },
    documentsRequired: ['Student Child ID (UDISE)', "Mother's Aadhaar Card", 'White Ration Card', 'Bank Passbook'],
    applicationProcess: 'School headmasters upload enrollment and 75% attendance metrics to the official Education Department portal.'
  },
  {
    schemeId: 'jagananna-vidya-deevena',
    schemeName: 'Jagananna Vidya Deevena (RTF)',
    description: 'Full tuition fee reimbursement for eligible students pursuing ITI, Polytechnic, Degree, Engineering, Medicine, and Post-Graduate degrees.',
    category: 'Student',
    benefitAmount: 35000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://jnanabhumi.ap.gov.in/',
    eligibilityCriteria: {
      ageRange: { minimumAge: 15, maximumAge: 35 },
      incomeLimit: 250000,
      socialCategoryRequired: ['SC', 'ST', 'BC', 'EBC', 'Minority', 'EWS'],
      employmentStatus: ['student']
    },
    documentsRequired: ['Student & Mother Aadhaar Cards', 'Caste and Income Certificates', 'College Admission Allotment Order'],
    applicationProcess: 'Register and submit college verification online via the Jnanabhumi scholarship portal.'
  },
  {
    schemeId: 'jagananna-vasathi-deevena',
    schemeName: 'Jagananna Vasathi Deevena (MTF)',
    description: 'Annual allowance of ₹10,000 to ₹20,000 to cover boarding and hostel accommodation expenses for higher education students.',
    category: 'Student',
    benefitAmount: 20000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://jnanabhumi.ap.gov.in/',
    eligibilityCriteria: {
      ageRange: { minimumAge: 15, maximumAge: 35 },
      incomeLimit: 250000,
      socialCategoryRequired: [],
      employmentStatus: ['student']
    },
    documentsRequired: ['Hostel Admission Receipt', 'Jnanabhumi Registration ID', "Mother's Aadhaar & Bank Account"],
    applicationProcess: 'Disbursed in bi-annual installments upon biometric attendance verification by the respective college.'
  },
  {
    schemeId: 'dokka-seethamma-midday-meal',
    schemeName: 'Dokka Seethamma Midday Meal Scheme (PM POSHAN)',
    description: 'Nutritious wholesome hot cooked meals provided every school day to government school children from Class 1 to 10.',
    category: 'Student',
    benefitAmount: 0,
    benefitCurrency: 'INR',
    applicablePortal: 'https://pmposhan.education.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 5, maximumAge: 16 },
      incomeLimit: 999999,
      socialCategoryRequired: [],
      employmentStatus: ['student']
    },
    documentsRequired: ['Active Government / Aided School Enrollment'],
    applicationProcess: 'Provided automatically daily across all state government, municipal, and zilla parishad schools.'
  },

  // --- EMPLOYMENT & SKILL DEVELOPMENT SCHEMES ---
  {
    schemeId: 'ap-skill-development',
    schemeName: 'AP Skill Development Schemes (APSSDC & PMKVY)',
    description: 'Free NSQF-aligned job-oriented technical & vocational skill training, certifications, and industry placement assistance for youth.',
    category: 'Employment',
    benefitAmount: 0,
    benefitCurrency: 'INR',
    applicablePortal: 'https://naipunyam.ap.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 35 },
      incomeLimit: 300000,
      socialCategoryRequired: [],
      employmentStatus: ['unemployed', 'student', 'employed']
    },
    documentsRequired: ['Aadhaar Card', 'Educational Marksheet / Diploma / Degree', 'Resume'],
    applicationProcess: 'Register on the APSSDC Naipunyam portal and select preferred technical domain or local training center.'
  },
  {
    schemeId: 'pm-mudra-yojana',
    schemeName: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    description: 'Collateral-free institutional micro-loans up to ₹10 Lakh in three tiers (Shishu up to ₹50k, Kishore up to ₹5L, Tarun up to ₹10L) for small business owners.',
    category: 'Employment',
    benefitAmount: 500000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://www.mudra.org.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 65 },
      incomeLimit: 600000,
      socialCategoryRequired: [],
      employmentStatus: ['employed', 'unemployed', 'other']
    },
    documentsRequired: ['Aadhaar Card', 'PAN Card', 'Business Enterprise Proposal / Proof of Business', 'Bank Statement (6 Months)'],
    applicationProcess: 'Apply online through the UdyamiMitra portal or visit any commercial bank or Regional Rural Bank (RRB).'
  },
  {
    schemeId: 'pm-svanidhi',
    schemeName: 'PM Street Vendor AtmaNirbhar Nidhi (PM SVANidhi)',
    description: 'Micro-credit working capital loan starting at ₹10,000 with step-up credit to ₹20,000 and ₹50,000 on prompt digital repayment, with 7% interest subsidy.',
    category: 'Employment',
    benefitAmount: 50000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://pmsvanidhi.mohua.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 65 },
      incomeLimit: 200000,
      socialCategoryRequired: [],
      employmentStatus: ['other', 'unemployed']
    },
    documentsRequired: ['Vending Certificate / Identity Card issued by ULB', 'Aadhaar Card', 'Bank Account Details'],
    applicationProcess: 'Apply directly through the PM SVANidhi portal, mobile application, or your local Urban Local Body (Municipality).'
  },
  {
    schemeId: 'pm-vishwakarma',
    schemeName: 'PM Vishwakarma Scheme',
    description: 'End-to-end support including free skill training, ₹15,000 toolkit e-voucher, and collateral-free enterprise loans up to ₹3 Lakh at 5% interest for traditional artisans.',
    category: 'Employment',
    benefitAmount: 15000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://pmvishwakarma.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 65 },
      incomeLimit: 300000,
      socialCategoryRequired: [],
      employmentStatus: ['other', 'employed']
    },
    documentsRequired: ['Aadhaar Card', 'Artisan Trade Identification Proof', 'Active Mobile Number', 'Bank Details'],
    applicationProcess: 'Register at your nearest Common Service Centre (CSC) with biometric verification.'
  },

  // --- TRANSPORT & DRIVERS SCHEMES ---
  {
    schemeId: 'ysr-vahana-mitra',
    schemeName: 'YSR Vahana Mitra Scheme (Auto Driver Sevalo)',
    description: 'Annual financial assistance of ₹15,000 to self-employed auto-rickshaw, taxi, and maxi-cab drivers to meet insurance, fitness certificate, and repair expenses.',
    category: 'Driver',
    benefitAmount: 15000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://gsws-nbm.ap.gov.in/NBM/',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 65 },
      incomeLimit: 144000,
      socialCategoryRequired: [],
      employmentStatus: ['driver']
    },
    documentsRequired: ['Aadhaar Card', 'Valid Commercial Driving License', 'Vehicle Registration Certificate (RC) in Applicant Name', 'White Ration Card'],
    applicationProcess: 'Submit your RC and license documents through the local Transport Department window or Sachivalayam.'
  },

  // --- FISHERMEN SCHEMES ---
  {
    schemeId: 'ysr-matsyakara-bharosa',
    schemeName: 'YSR Matsyakara Bharosa',
    description: 'Financial support of ₹10,000 per family during the annual marine fishing conservation ban period (April 15 - June 14) along with subsidized diesel.',
    category: 'Fisherman',
    benefitAmount: 10000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://apfisheries.gov.in/',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 60 },
      incomeLimit: 150000,
      socialCategoryRequired: [],
      employmentStatus: ['fisherman']
    },
    documentsRequired: ['Aadhaar Card', 'Fisherman Biometric ID Card', 'Registered Boat Certificate', 'Bank Account Details'],
    applicationProcess: 'Verified and disbursed by the Fisheries Development Officer (FDO) at the coastal landing centers.'
  },

  // --- WEAVERS SCHEMES ---
  {
    schemeId: 'ysr-nethanna-nestham',
    schemeName: 'YSR Nethanna Nestham',
    description: 'Financial assistance of ₹24,000 annually provided to handloom weaver families owning a functional handloom to modernize and purchase yarn/raw materials.',
    category: 'Employment',
    benefitAmount: 24000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://gsws-nbm.ap.gov.in/NBM/',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 65 },
      incomeLimit: 150000,
      socialCategoryRequired: [],
      employmentStatus: ['other', 'employed']
    },
    documentsRequired: ['Aadhaar Card', 'Handloom Geotagged Survey Record', 'Weaver Cooperative / Society Membership', 'Bank Passbook'],
    applicationProcess: 'Field verification by the Handlooms & Textiles department and enrollment at the Village Secretariat.'
  },

  // --- SOCIAL SECURITY PENSION SCHEMES ---
  {
    schemeId: 'ntr-bharosa-pension',
    schemeName: 'NTR Bharosa Pension Scheme (Old Age Pension)',
    description: 'Monthly social security pension of ₹4,000 (₹48,000 annually) delivered to the doorsteps of elderly citizens aged 60 and above.',
    category: 'Pension',
    benefitAmount: 48000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://sspensions.ap.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 60, maximumAge: 100 },
      incomeLimit: 120000,
      socialCategoryRequired: []
    },
    documentsRequired: ['Aadhaar Card', 'Age Verification Document (Voter ID / Birth Certificate)', 'BPL White Ration Card', 'Bank Account Details'],
    applicationProcess: 'Apply at your Grama/Ward Sachivalayam. Once sanctioned, pensions are paid on the 1st of every month.'
  },
  {
    schemeId: 'ysr-pension-widow',
    schemeName: 'YSR Pension Kanuka - Widow Pension',
    description: 'Monthly pension of ₹4,000 to assist widowed women and protect their household livelihood.',
    category: 'Pension',
    benefitAmount: 48000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://sspensions.ap.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 59 },
      incomeLimit: 120000,
      socialCategoryRequired: [],
      genderSpecific: 'female'
    },
    documentsRequired: ['Aadhaar Card', "Husband's Death Certificate", 'White Ration Card', 'Bank Account Details'],
    applicationProcess: 'Submit death certificate and pension application at your local Sachivalayam counter.'
  },
  {
    schemeId: 'ysr-pension-disabled',
    schemeName: 'YSR Pension Kanuka - Differently Abled (Disabled)',
    description: 'Monthly pension of ₹6,000 to ₹15,000 based on disability severity (SADAREM certificate 40%+) to support differently-abled citizens.',
    category: 'Pension',
    benefitAmount: 72000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://sspensions.ap.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 1, maximumAge: 100 },
      incomeLimit: 200000,
      socialCategoryRequired: [],
      disabilityRequired: true
    },
    documentsRequired: ['Aadhaar Card', 'SADAREM Disability Certificate (40%+)', 'White Ration Card', 'Bank Passbook'],
    applicationProcess: 'Apply via Ward/Grama Secretariat with a verified SADAREM medical board certificate.'
  },
  {
    schemeId: 'atal-pension-yojana',
    schemeName: 'Atal Pension Yojana (APY)',
    description: 'Guaranteed government lifelong monthly pension of ₹1,000 to ₹5,000 after age 60 for unorganized sector workers with low monthly contributions.',
    category: 'Pension',
    benefitAmount: 60000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://www.npscra.nsdl.co.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 40 },
      incomeLimit: 500000,
      socialCategoryRequired: []
    },
    documentsRequired: ['Aadhaar Card', 'Active Savings Bank Account', 'Mobile Number'],
    applicationProcess: 'Enroll at any bank branch or through your internet banking portal with auto-debit facility.'
  },

  // --- HOUSING SCHEMES ---
  {
    schemeId: 'indiramma-housing',
    schemeName: 'INDIRAMMA Housing Scheme (Pedalandariki Illu)',
    description: 'Government subsidy of ₹2.5 to ₹5 Lakh along with free housing site patta to construct a permanent pucca house for homeless BPL families.',
    category: 'Housing',
    benefitAmount: 500000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://housing.ap.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 100 },
      incomeLimit: 120000,
      socialCategoryRequired: [],
      housingStatus: ['rented', 'none']
    },
    documentsRequired: ['Aadhaar Card', 'White BPL Ration Card', 'Proof of No Existing Pucca House in Name of Family', 'Bank Details'],
    applicationProcess: 'Applications verified through GIS geotagging and processed via AP State Housing Corporation Limited.'
  },
  {
    schemeId: 'pm-awas-yojana-urban',
    schemeName: 'Pradhan Mantri Awas Yojana - Urban (PMAY-U)',
    description: 'Interest subsidy on home loans up to 6.5% for EWS/LIG families and financial assistance for pucca house construction in urban municipalities.',
    category: 'Housing',
    benefitAmount: 267000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://pmaymis.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 100 },
      incomeLimit: 300000,
      socialCategoryRequired: [],
      housingStatus: ['rented', 'none']
    },
    documentsRequired: ['Aadhaar Card', 'Income Certificate', 'Affidavit of No Pucca House Owned in India', 'Bank Account Statement'],
    applicationProcess: 'Apply online on the PMAY portal or through your City Municipal Corporation / MEPMA office.'
  },

  // --- ENERGY & UTILITY SCHEMES ---
  {
    schemeId: 'pm-surya-ghar',
    schemeName: 'PM Surya Ghar: Muft Bijli Yojana',
    description: 'Direct central subsidy up to ₹78,000 for installing residential rooftop solar panels, providing up to 300 units of free clean electricity every month.',
    category: 'Utility',
    benefitAmount: 78000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://pmsuryaghar.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 100 },
      incomeLimit: 600000,
      socialCategoryRequired: [],
      housingStatus: ['owned']
    },
    documentsRequired: ['Electricity Bill of Proposed Installation Premise', 'Aadhaar Card', 'Bank Account Details', 'Rooftop Ownership Proof'],
    applicationProcess: 'Register on the national portal pmsuryaghar.gov.in and select a certified local solar DISCOM vendor.'
  },
  {
    schemeId: 'deepam-lpg-scheme',
    schemeName: 'Deepam Scheme (Free Cooking Gas Cylinders)',
    description: 'Free LPG cooking gas connections and 3 free LPG gas cylinder refills per calendar year for low-income BPL households.',
    category: 'Utility',
    benefitAmount: 3000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://civilsupplies.ap.gov.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 100 },
      incomeLimit: 144000,
      socialCategoryRequired: [],
      genderSpecific: 'female'
    },
    documentsRequired: ['Aadhaar Card of Female Head of Family', 'Active White Ration Card', 'Gas Connection Passbook / Consumer Number'],
    applicationProcess: 'Book refill through your local gas agency; subsidy is automatically reimbursed directly to your Aadhaar-linked bank account.'
  },
  {
    schemeId: 'national-family-benefit',
    schemeName: 'National Family Benefit Scheme (NFBS)',
    description: 'One-time lump sum grant of ₹20,000 provided to a BPL family upon the unfortunate death of the primary breadwinner aged 18-59.',
    category: 'General',
    benefitAmount: 20000,
    benefitCurrency: 'INR',
    applicablePortal: 'https://nsap.nic.in',
    eligibilityCriteria: {
      ageRange: { minimumAge: 18, maximumAge: 59 },
      incomeLimit: 120000,
      socialCategoryRequired: []
    },
    documentsRequired: ['Death Certificate of Breadwinner', 'Aadhaar Card of Dependent', 'BPL Ration Card', 'Bank Details'],
    applicationProcess: 'Apply at your local Revenue Divisional Office (RDO) or Tahsildar / Sachivalayam office.'
  }
];
