
'use server';
/**
 * @fileOverview Recommends government schemes based on user eligibility criteria.
 *
 * - recommendSchemes - A function that recommends government schemes based on user eligibility.
 * - RecommendSchemesInput - The input type for the recommendSchemes function.
 * - RecommendSchemesOutput - The return type for the recommendSchemes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendSchemesInputSchema = z.object({
    name: z.string(),
    age: z.number().describe('The age of the user. Important for age-specific schemes like pensions (60+) or student schemes (8-21).'),
    gender: z.enum(['male', 'female', 'other']).describe('The gender of the user. Note if a scheme is women-headed priority.'),
    annualIncome: z.number().describe('The annual family income in Rupees. Critical for income-based eligibility brackets like <₹1.2L, <₹2.5L etc.'),
    familySize: z.number().describe('The number of family members.'),
    location: z.enum(['Urban', 'Rural']).describe('The location type of the user. Affects income thresholds (e.g., <₹10k rural, <₹12k urban).'),
    district: z.string().describe('The district in Andhra Pradesh. Used to prioritize local or district-specific schemes.'),
    mandal: z.string().describe('The mandal in Andhra Pradesh.'),
    category: z.enum(['SC', 'ST', 'BC', 'EBC', 'Minority', 'Brahmin', 'EWS', 'General']).describe('The social category of the user (e.g., SC, ST, BC, EBC, Minority).'),
    disability: z.boolean().describe('Whether the user has a disability.'),
    occupation: z.enum(['student', 'employed', 'unemployed', 'farmer', 'driver', 'weaver', 'daily worker', 'other', 'fisherman', 'housewife']).describe('The occupation of the user (e.g., Farmer, Student, Fisherman).'),
    landHolding: z.string().optional().describe('The amount of land owned, if any. Critical for farmer schemes (e.g., 0-3 acres wet, 0-10 acres dry).'),
    vehiclesOwned: z.boolean().describe('Whether the user or their family owns a four-wheeler vehicle. This is often a disqualifier.'),
    houseType: z.enum(['owned', 'rented', 'none']).describe('The user\'s housing situation (Owned, Rented, or No House).'),
    educationQualification: z.enum(['uneducated', '1-10', 'inter', 'bachelors', 'masters']).describe('The user\'s highest level of education.'),
});
export type RecommendSchemesInput = z.infer<typeof RecommendSchemesInputSchema>;

const SchemeRecommendationSchema = z.object({
  schemeName: z.string().describe('The name of the recommended government scheme.'),
  reasoning: z
    .string()
    .describe(
      'A detailed explanation of why the user is eligible for this scheme, referencing their specific details (like age, income, etc.) against the scheme\'s requirements.'
    ),
});

const RecommendSchemesOutputSchema = z.array(SchemeRecommendationSchema);
export type RecommendSchemesOutput = z.infer<typeof RecommendSchemesOutputSchema>;

export async function recommendSchemes(input: RecommendSchemesInput): Promise<RecommendSchemesOutput> {
  return recommendSchemesFlow(input);
}

const recommendSchemesPrompt = ai.definePrompt({
  name: 'recommendSchemesPrompt',
  model: 'gemini-pro',
  input: {schema: RecommendSchemesInputSchema},
  output: {schema: RecommendSchemesOutputSchema},
  prompt: `You are an expert advisor on Indian government schemes, specifically for Andhra Pradesh. Based on the user's detailed profile below, you must recommend exactly three schemes.

User Details:
Age: {{{age}}} (Consider ranges like 18-59, 60+ for pensions, student ranges 8-21)
Gender: {{{gender}}} (Prioritize women-headed schemes if applicable)
Annual Family Income: ₹{{{annualIncome}}} (Check against thresholds like <₹1.2L, <₹2.5L)
Family Size: {{{familySize}}}
Location Type: {{{location}}} (Note income limits: <₹10k rural, <₹12k urban)
District: {{{district}}}
Mandal: {{{mandal}}}
Social Category: {{{category}}} (Crucial for category-specific schemes like SC/ST/BC/Minority/EWS)
Disability: {{{disability}}}
Occupation: {{{occupation}}} (Match with schemes for Farmers, Fishermen, Students, etc.)
Land Holding: {{{landHolding}}} (For farmer schemes, e.g., 0-3 acres wet, 0-10 acres dry)
Owns 4-Wheeler Vehicle: {{{vehiclesOwned}}} (This often disqualifies users from welfare schemes)
House Type: {{{houseType}}} (Crucial for housing schemes if 'rented' or 'none')
Education Qualification: {{{educationQualification}}} (Relevant for student or skill development schemes)

Your recommendations must follow these specific rules:
1.  **Health or Housing (1 Scheme):** Recommend ONE scheme that is primarily focused on health/medical benefits OR a housing scheme. If user's houseType is 'owned', do not recommend a housing scheme.
2.  **Occupation-Based Scheme (1 Scheme):** Recommend ONE scheme that is directly relevant to the user's stated occupation (e.g., a farmer scheme for a 'Farmer', a student scheme for a 'Student'). If occupation is 'unemployed' or 'housewife', find a suitable welfare or empowerment scheme.
3.  **Income/Category Scheme (1 Scheme):** Recommend ONE scheme related to financial assistance or empowerment based on their income level and social category (e.g., YSR Cheyutha for women in specific categories).

For each of the three recommendations, provide a detailed reasoning that explains exactly which eligibility criteria the user meets. For example, "You are eligible because your annual income of ₹{{{annualIncome}}} is within the limit for this scheme, and your occupation as a {{{occupation}}} is targeted." Only include schemes the user qualifies for.

Format your output as a JSON array of exactly three scheme recommendations, each with a schemeName and detailed reasoning. Do not include a match score.
`,
});

const recommendSchemesFlow = ai.defineFlow(
  {
    name: 'recommendSchemesFlow',
    inputSchema: RecommendSchemesInputSchema,
    outputSchema: RecommendSchemesOutputSchema,
  },
  async input => {
    const {output} = await recommendSchemesPrompt(input);
    return output!;
  }
);
