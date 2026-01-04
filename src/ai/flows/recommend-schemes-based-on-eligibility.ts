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
  age: z.number().describe('The age of the user.'),
  gender: z.enum(['male', 'female', 'other']).describe('The gender of the user.'),
  annualIncome: z.number().describe('The annual income of the user.'),
  familySize: z.number().describe('The number of family members.'),
  location: z.string().describe('The location of the user.'),
  category: z.string().describe('The category of the user (e.g., SC, ST, OBC, General).'),
  disability: z.boolean().describe('Whether the user has a disability.'),
  occupation: z.string().describe('The occupation of the user.'),
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
  input: {schema: RecommendSchemesInputSchema},
  output: {schema: RecommendSchemesOutputSchema},
  prompt: `You are an expert advisor on Indian government schemes. Based on the user's details below, you must recommend exactly three schemes.

User Details:
Age: {{{age}}}
Gender: {{{gender}}}
Annual Income: {{{annualIncome}}}
Family Size: {{{familySize}}}
Location: {{{location}}}
Category: {{{category}}}
Disability: {{{disability}}}
Occupation: {{{occupation}}}

Your recommendations must follow these specific rules:
1.  **Health Scheme (1 Scheme):** Recommend one scheme that is primarily focused on health or medical benefits.
2.  **Occupation-Based Scheme (1 Scheme):** Recommend one scheme that is directly relevant to the user's stated occupation (e.g., a farmer scheme for a 'Farmer', a student scheme for a 'Student').
3.  **Income/Housing Scheme (1 Scheme):** Recommend one scheme related to financial assistance based on their income level or a housing scheme.

For each of the three recommendations, provide a detailed reasoning that explains exactly which eligibility criteria the user meets. For example, "You are eligible because your annual income of X is within the Y limit for this scheme." Only include schemes the user qualifies for.

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
