'use server';
/**
 * @fileOverview Summarizes the details of a government scheme.
 *
 * - summarizeSchemeDetails - A function that summarizes the scheme details.
 * - SummarizeSchemeDetailsInput - The input type for the summarizeSchemeDetails function.
 * - SummarizeSchemeDetailsOutput - The return type for the summarizeSchemeDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSchemeDetailsInputSchema = z.object({
  schemeDetails: z.string().describe('Detailed information about the government scheme.'),
});
export type SummarizeSchemeDetailsInput = z.infer<typeof SummarizeSchemeDetailsInputSchema>;

const SummarizeSchemeDetailsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the scheme details, highlighting key benefits and requirements.'),
});
export type SummarizeSchemeDetailsOutput = z.infer<typeof SummarizeSchemeDetailsOutputSchema>;

export async function summarizeSchemeDetails(input: SummarizeSchemeDetailsInput): Promise<SummarizeSchemeDetailsOutput> {
  return summarizeSchemeDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSchemeDetailsPrompt',
  input: {schema: SummarizeSchemeDetailsInputSchema},
  output: {schema: SummarizeSchemeDetailsOutputSchema},
  prompt: `You are an AI assistant that summarizes government schemes, highlighting key benefits and requirements so users can assess their relevance quickly.

Scheme Details: {{{schemeDetails}}}`,
});

const summarizeSchemeDetailsFlow = ai.defineFlow(
  {
    name: 'summarizeSchemeDetailsFlow',
    inputSchema: SummarizeSchemeDetailsInputSchema,
    outputSchema: SummarizeSchemeDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
