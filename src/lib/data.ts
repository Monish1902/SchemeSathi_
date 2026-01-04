
import type { Scheme, Application } from '@/lib/types';

export const schemes: Scheme[] = [
  {
    id: 'aadabidda-nidhi',
    name: 'Aadabidda Nidhi Scheme',
    description: 'Aadabidda Nidhi is a flagship women empowerment scheme providing ₹1,500 per month directly to eligible women aged 18-59 years through Direct Benefit Transfer (DBT). It aims to reduce the gender-income gap and promote economic independence among vulnerable women in Andhra Pradesh. Beneficiaries also receive free bus travel on all APSRTC buses within the state. The scheme covers over 80 lakh women with transparent digital verification.',
    category: 'Women',
    benefits: '₹1,500 per month (₹18,000 annually) and free bus travel on APSRTC buses.',
    applyLink: 'https://gsws-nbm.ap.gov.in/NBM/',
    eligibilityCriteria: [
        "Female beneficiaries aged 18-59 years",
        "Permanent residents of Andhra Pradesh",
        "Belonging to economically weaker sections, SC, ST, or BC communities",
        "Not receiving other conflicting scheme benefits",
        "Not a government employee or income taxpayer"
    ],
    documentsRequired: [
        "Aadhaar Card (linked with permanent address in AP)",
        "White Ration Card",
        "Bank Account Passbook (NPCI-linked)",
        "Residential/Domicile Certificate",
        "Household Mapping Document (from Gram/Ward Sachivalayam)",
        "Passport-size Photograph (recent)",
        "Phone Number (working and linked with Aadhaar)"
    ],
    applicationProcess: `Application status can be tracked through the official NBM Portal.`
  },
  {
    id: 'annadata-sukhibhava',
    name: 'Annadata Sukhibhava Scheme',
    description: 'Annadata Sukhibhava provides ₹20,000 annual financial assistance to small and marginal farmers in three installments via Direct Benefit Transfer. The scheme includes subsidized seeds, fertilizers, and disaster compensation to support agricultural activities and manage crop failures. Application is made through Raithu Seva Kendrams (Farmer Service Centers). The scheme covers all crop types including cereals, pulses, oilseeds, and horticultural crops.',
    category: 'Farmer',
    benefits: '₹20,000 annual financial assistance, subsidized seeds, fertilizers, and disaster compensation.',
    applyLink: 'https://annadatasukhibhava.ap.gov.in',
    eligibilityCriteria: [
        "Small and marginal farmers with land holding <5 acres",
        "Permanent residents of Andhra Pradesh",
        "Must possess valid pattadar passbook (land ownership certificate)",
        "Tenant farmers with valid CCRC (Cultivating Tenancy Certificate)",
        "Not income taxpayers or government employees",
        "Age minimum 18 years with name linked to Aadhaar"
    ],
    documentsRequired: [
        "Aadhaar Card (linked with name)",
        "Land Ownership Document (ROR 1B/Patta/Passbook)",
        "Bank Account Passbook (Aadhaar-linked, NPCI mapped)",
        "Survey Numbers (as per Record of Rights)",
        "Passport-size Photograph",
        "Mobile Number (working and active)",
        "For Tenant Farmers: CCRC (Cultivating Tenancy Certificate)"
    ],
    applicationProcess: `Applications are made through Raithu Seva Kendrams (Farmer Service Centers) where officials verify documents and forward cases to higher authorities. Registration and status checks can be done on the official portal.`
  },
  {
    id: 'ysr-vahana-mitra',
    name: 'YSR Vahana Mitra Scheme (Auto Driver Sevalo)',
    description: 'YSR Vahana Mitra provides ₹15,000 annual financial assistance to self-employed auto and taxi drivers to support maintenance costs, insurance, and periodic vehicle fitness requirements. The scheme uses transparent digital verification through the NBM portal with multiple status tracking stages. Beneficiaries can track application status using Aadhaar-OTP verification and receive payments through Aadhaar Enabled Payment System (AePS).',
    category: 'Driver',
    benefits: '₹15,000 annual financial assistance for vehicle maintenance and insurance.',
    applyLink: 'https://gsws-nbm.ap.gov.in/NBM/',
    eligibilityCriteria: [
        "Self-employed auto-rickshaw, taxi, or maxi-cab drivers",
        "Operating within Andhra Pradesh",
        "Must own and drive the vehicle personally",
        "Valid driving license for auto/light motor vehicle",
        "Permanent AP resident",
        "Aadhaar-linked bank account required",
        "Only one vehicle per family (husband, wife, minor children)"
    ],
    documentsRequired: [
        "Aadhaar Number (for self and family members)",
        "Valid Driving License (for operating auto/taxi/maxi-cab)",
        "BPL/White Ration Card/Annapurna/Antyodaya Card",
        "Vehicle Registration Certificate & Tax Records",
        "Bank Account Details (Account no., bank name, branch, IFSC Code)",
        "Current Vehicle Photograph (with beneficiary)",
        "Residential Certificate/Address Proof",
        "Caste Certificate (if applicable)",
        "Electricity Bill or consumption data verification"
    ],
    applicationProcess: `Application status can be tracked on the Navasakam Beneficiary Management (NBM) Portal using Aadhaar-OTP verification.`
  },
  {
    id: 'thalliki-vandanam',
    name: 'Thalliki Vandanam Scheme',
    description: 'Thalliki Vandanam provides ₹15,000 annual financial assistance to mothers/guardians of school children to promote enrollment and reduce dropout rates. Payments are directly transferred to mother\'s accounts via DBT, conditional on maintaining 75% school attendance. The scheme covers approximately 67 lakh students across AP. Beneficiary lists are verified through schools and gram/ward secretariat data.',
    category: 'Student',
    benefits: '₹15,000 annual financial assistance to mothers/guardians.',
    applyLink: 'https://gsws-nbm.ap.gov.in/NBM/',
    eligibilityCriteria: [
        "Mother or Guardian of school-going children",
        "Child enrolled in Classes 1-12 (government schools)",
        "Minimum 75% school attendance maintained",
        "Family monthly income <₹10,000 (rural)/₹12,000 (urban)",
        "Beneficiary in official household database",
        "White Ration Card holder",
        "Aadhaar-linked bank account (mother's name)",
        "Child not enrolled in ITI/Polytechnic/IIIT with fee reimbursement"
    ],
    documentsRequired: [
        "Student School Registration Details",
        "Aadhaar Card (mother's)",
        "Birth Certificate (child)",
        "Caste Certificate (if applicable)",
        "Parent's ID Proof (Voter ID/PAN)",
        "Address Proof (residence certificate)",
        "Income Proof Certificate",
        "White Ration Card",
        "Mother/Guardian's Bank Account Passbook (NPCI-linked)",
        "Passport-size Photograph (recent)"
    ],
    applicationProcess: `Eligible lists and payment status can be checked on the GSWS NBM Portal. Verification is done through schools and gram/ward secretariats.`
  },
  {
    id: 'dr-ntr-vaidya-seva',
    name: 'Dr. NTR Vaidya Seva Scheme',
    description: 'Dr. NTR Vaidya Seva provides cashless healthcare coverage up to ₹25 lakh per beneficiary annually through a network of 10,000+ empaneled hospitals. The scheme covers emergency care, planned hospitalization, and 949+ specialized treatments including cancer, kidney transplant, cardiac surgeries, and neurological disorders without upfront payment. It is managed by Dr. Nandamuri Taraka Rama Rao Vaidya Seva Trust with real-time online claim processing.',
    category: 'Health',
    benefits: 'upto 25,00,000',
    applyLink: 'https://drntrvaidyaseva.ap.gov.in',
    eligibilityCriteria: [
        "All Andhra Pradesh residents eligible for coverage",
        "Special provisions for BPL (Below Poverty Line) families",
        "SC/ST communities and economically weaker sections prioritized",
        "Enhanced coverage for vulnerable populations",
        "No age restriction for most treatments",
        "Coverage extends for medical emergencies and planned procedures"
    ],
    documentsRequired: [
        "Aadhaar Card (beneficiary)",
        "White Ration Card (BPL status proof)",
        "Voter ID or Identity Proof",
        "Health Card (Aarogyasri Health Card if already issued)",
        "Hospital Authorization (for planned surgeries)",
        "Medical prescriptions (for treatments)",
        "Proof of address (electricity bill/ration card)",
        "Bank account details (for reimbursement if applicable)"
    ],
    applicationProcess: `Beneficiaries can get their health card and view the hospital network on the official Dr. NTR Vaidya Seva Portal.`
  },
  {
    id: 'ysr-cheyutha',
    name: 'YSR Cheyutha Scheme',
    description: 'YSR Cheyutha provides ₹75,000 over four years (₹18,750 annually) to eligible women aged 45-60 from SC/ST/BC/Minority communities for livelihood empowerment. The scheme partners with corporations to create income-generating opportunities like grocery franchises and animal husbandry businesses. The multi-year structure supports sustained livelihood activities with dedicated tracking through the "Cheyutha Dashboard".',
    category: 'Women',
    benefits: '₹75,000 financial assistance over four years for livelihood activities.',
    applyLink: 'https://gsws-nbm.ap.gov.in/NBM/',
    eligibilityCriteria: [
        "Female beneficiaries aged 45-60 years",
        "Belonging to SC, ST, BC, or Minority communities",
        "Permanent Andhra Pradesh resident",
        "Family annual income <₹1,20,000 (rural)/₹1,44,000 (urban)",
        "Not owning four-wheeler vehicle (except taxi/tractor/auto)",
        "Not government employees or pensioners",
        "Electricity consumption <300 units/month",
        "Identified in Navasakam State Survey"
    ],
    documentsRequired: [
        "Aadhaar Card (linked with permanent address)",
        "Caste Certificate (SC/ST/BC/Minority Certificate)",
        "Income Certificate (official)",
        "Age Proof (Birth Certificate/SSC Marks Sheet/Voter ID)",
        "Bank Account Passbook (Aadhaar-linked)",
        "Residential/Domicile Certificate",
        "Passport-size Photograph (recent)",
        "Address Proof (Ration Card/Electricity Bill)"
    ],
    applicationProcess: `Applications can be made through the Navasakam Beneficiary Management Portal.`
  },
  {
    id: 'indiramma-housing',
    name: 'INDIRAMMA Housing Scheme',
    description: 'INDIRAMMA Housing Scheme provides a subsidy (₹5 lakh for SC/ST, ₹45,000-₹80,000 for General/BC) to construct permanent houses. The scheme approved G+1 (two-storey) construction in 2025, allowing vertical expansion. Identification is done through Gram Sabhas and Ward Sabhas. Beneficiaries receive construction assistance with regular monitoring by rural development officials.',
    category: 'Housing',
    benefits: 'Subsidy of ₹5 lakh for SC/ST and ₹45,000-₹80,000 for General/BC categories for house construction.',
    applyLink: 'https://housing.ap.gov.in',
    eligibilityCriteria: [
        "Below Poverty Line (BPL) families",
        "Landless laborers and economically weaker sections",
        "Rural and urban residents without permanent housing",
        "Permanent Andhra Pradesh residents",
        "Sufficient land or suitable site for construction",
        "Not owning existing pucca (permanent) house",
        "SC/ST/BC families given additional preference",
        "Widows, disabled, and single women prioritized"
    ],
    documentsRequired: [
        "Aadhaar Card",
        "BPL/White Ration Card",
        "Income Certificate (official)",
        "Land Ownership Documents (with survey details)",
        "SC/ST/OBC Certificate (if applicable)",
        "Passport-size Photographs (2-3)",
        "Address Proof (residence certificate)",
        "Bank Account Details (for fund transfer)",
        "Site/Land Measurement Documents (if land owned)",
        "Beneficiary Identity Certificate"
    ],
    applicationProcess: `Applications and information are available on the AP Housing Department portal.`
  },
  {
    id: 'ap-skill-development',
    name: 'AP Skill Development Schemes (APSSDC & PMKVY)',
    description: 'AP Skill Development operates 100+ centers offering free training in IT, healthcare, hospitality, manufacturing, and emerging technologies. The scheme partners with major corporations for internationally-recognized certifications and provides placement assistance, ensuring a high job placement rate. Training covers 24 sectors with 99+ job roles and includes entrepreneurship support.',
    category: 'General',
    benefits: 'Free vocational training, industry-recognized certifications, and job placement assistance.',
    applyLink: 'https://naipunyam.ap.gov.in',
    eligibilityCriteria: [
        "Youth aged 18-35 years",
        "School students (engineering/degree/polytechnic)",
        "Unemployed graduates and post-graduates",
        "College dropouts and school leavers",
        "Women seeking vocational training",
        "SC/ST/BC/Minority candidates eligible",
        "Permanent Andhra Pradesh resident",
        "Willing to undergo industry-relevant training"
    ],
    documentsRequired: [
        "Aadhaar Card",
        "Educational Certificate (10th/12th/Degree)",
        "Identity Proof (Voter ID/PAN/Passport)",
        "Address Proof (Ration Card/Electricity Bill)",
        "Bank Account Details (for stipend transfer if applicable)",
        "Passport-size Photographs (2-3)",
        "Birth Certificate/Age Proof",
        "SC/ST/BC Certificate (if applicable)",
        "Medical Fitness Certificate (for some programs)"
    ],
    applicationProcess: `Registration and training information is available on the Naipunyam Portal.`
  },
  {
    id: 'ntr-bharosa-pension',
    name: 'NTR Bharosa Pension Scheme',
    description: 'NTR Bharosa Pension provides monthly financial assistance from ₹4,000 to ₹15,000 to various categories including the elderly, widows, disabled, and other vulnerable groups. Over 64 lakh households benefit from direct bank transfers. The scheme was digitally upgraded in 2025 for improved processing and real-time verification. A spouse category pension was added for widows of deceased pensioners.',
    category: 'General',
    benefits: 'Monthly pension ranging from ₹4,000 to ₹15,000.',
    applyLink: 'https://sspensions.ap.gov.in',
    eligibilityCriteria: [
        "Permanent Andhra Pradesh residents",
        "Monthly income <₹10,000 (rural)/₹12,000 (urban)",
        "Belonging to qualifying categories: Elderly (60+), Widow, Disabled, Toddy Tapper, Weaver, Fisherman, Single Woman, Cobbler, Transgender, Chronic Disease Patients",
        "Not government employees or current pensioners",
        "Not income taxpayers",
        "Possessing white ration card and Aadhaar-linked bank account"
    ],
    documentsRequired: [
        "Aadhaar Card",
        "Age Proof (Birth Certificate/Voter ID/High School Marks)",
        "Bank Account Details (with IFSC code)",
        "Ration Card (white/BPL)",
        "Mobile Number (working)",
        "Passport-size Photograph (recent)",
        "Income Certificate (official)",
        "Husband Death Certificate (widow applicants only)",
        "SADAREM Certificate (for disabled applicants)",
        "Medical Certificate (for chronic disease/disability)"
    ],
    applicationProcess: `Application and status checks can be done through the SS Pension Portal.`
  },
  {
    id: 'dokka-seethamma-midday-meal',
    name: 'Dokka Seethamma Midday Meal Scheme (PM POSHAN)',
    description: 'Dokka Seethamma Midday Meal provides free nutritious meals to over 50 lakh government school students daily, including rice/grains, protein, vegetables, and supplements. Zone-wise customized menus were implemented in 2025. The scheme includes health monitoring, micronutrient supplementation, and attendance tracking with feedback mechanisms for menu refinement.',
    category: 'Student',
    benefits: 'Free daily nutritious meals for government school students.',
    applyLink: 'https://pmposhan.education.gov.in',
    eligibilityCriteria: [
        "Government school children (Classes 1-12, ages 6-14)",
        "Government-aided primary and upper-primary schools",
        "Pre-primary education students at government schools",
        "All students regardless of socio-economic background",
        "No age or income restrictions",
        "Automatic coverage upon school enrollment",
        "Extended to intermediate students in some zones"
    ],
    documentsRequired: [
        "School Registration/Enrollment Details",
        "Birth Date Records (from school database)",
        "No additional personal documents required",
        "School maintains beneficiary roll through UDISE portal",
        "Health assessment records (maintained by school)",
        "Attendance records (for program continuity)",
        "School Principal/Teacher Certification",
        "Medical examination records (routine check-ups)"
    ],
    applicationProcess: `Students are automatically covered upon enrollment in a government school. Program tracking is available on the PM POSHAN portal.`
  },
  {
    id: 'rythu-bharosa',
    name: 'Rythu Bharosa Scheme',
    description: 'Rythu Bharosa is a farmer investment support scheme providing financial assistance to land-owning farmers to help with the costs of cultivation. The scheme aims to alleviate the financial burden on farmers and empower them to make timely investments in their crops, leading to increased productivity and income. It covers various pre-sowing and post-harvest expenses.',
    category: 'Farmer',
    benefits: '₹13,500 per farmer family per year, provided in three installments.',
    applyLink: 'https://gramawardsachivalayam.ap.gov.in/GSWS/Home/Main',
    eligibilityCriteria: [
        "Must be a land-owning farmer in Andhra Pradesh.",
        "Small, marginal, and tenant farmers are also eligible.",
        "The farmer must be a permanent resident of the state.",
        "Must have a valid Aadhaar card.",
        "Family should not include government employees or income taxpayers."
    ],
    documentsRequired: [
        "Aadhaar Card",
        "Land ownership documents (Pattadar Passbook)",
        "Bank account details (Passbook)",
        "Residential Certificate",
        "Passport-size Photograph"
    ],
    applicationProcess: `Farmers can apply through the local Village/Ward Secretariat (Sachivalayam) or online through the official portal. Verification is conducted by village revenue officers.`
  }
];


export const applications: Application[] = [
  {
    id: 'app-1',
    schemeId: 'ysr-vahana-mitra',
    schemeName: 'YSR Vahana Mitra Scheme',
    dateApplied: '2023-05-15',
    status: 'In Review',
  },
  {
    id: 'app-2',
    schemeId: 'dr-ntr-vaidya-seva',
    schemeName: 'Dr. NTR Vaidya Seva Scheme',
    dateApplied: '2023-04-20',
    status: 'Approved',
  },
  {
    id: 'app-3',
    schemeId: 'indiramma-housing',
    schemeName: 'INDIRAMMA Housing Scheme',
    dateApplied: '2023-06-01',
    status: 'Submitted',
  },
];
