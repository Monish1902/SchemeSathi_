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
  prompt: `You are an expert advisor on Indian government schemes. Based on the user's details below, recommend the most relevant schemes.

User Details:
Age: {{{age}}}
Gender: {{{gender}}}
Annual Income: {{{annualIncome}}}
Family Size: {{{familySize}}}
Location: {{{location}}}
Category: {{{category}}}
Disability: {{{disability}}}
Occupation: {{{occupation}}}

Consider various government schemes and recommend those for which the user is eligible. For each recommendation, provide a detailed reasoning that explains exactly which eligibility criteria the user meets. For example, "You are eligible because your annual income of X is within the Y limit for this scheme." Only include schemes the user qualifies for.

Format your output as a JSON array of scheme recommendations, each with schemeName and reasoning. Do not include a match score.
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
