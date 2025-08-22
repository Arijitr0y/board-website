'use server';

/**
 * @fileOverview Suggests potential optimizations to a PCB design based on AI analysis.
 *
 * - suggestPcbOptimizations - A function that suggests PCB design optimizations.
 * - SuggestPcbOptimizationsInput - The input type for the suggestPcbOptimizations function.
 * - SuggestPcbOptimizationsOutput - The return type for the suggestPcbOptimizations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPcbOptimizationsInputSchema = z.object({
  gerberData: z
    .string()
    .describe('Gerber files data as a string.'),
  pcbSpecifications: z.string().describe('The specifications of the PCB design.'),
  analysisResults: z.string().describe('The results of the manufacturability analysis.'),
});
export type SuggestPcbOptimizationsInput = z.infer<typeof SuggestPcbOptimizationsInputSchema>;

const SuggestPcbOptimizationsOutputSchema = z.object({
  optimizations: z
    .string()
    .describe('Suggested optimizations for the PCB design, such as alternative materials or layer configurations.'),
});
export type SuggestPcbOptimizationsOutput = z.infer<typeof SuggestPcbOptimizationsOutputSchema>;

export async function suggestPcbOptimizations(input: SuggestPcbOptimizationsInput): Promise<SuggestPcbOptimizationsOutput> {
  return suggestPcbOptimizationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPcbOptimizationsPrompt',
  input: {schema: SuggestPcbOptimizationsInputSchema},
  output: {schema: SuggestPcbOptimizationsOutputSchema},
  prompt: `You are an expert PCB design optimizer. Based on the provided Gerber data, PCB specifications, and manufacturability analysis results, suggest potential optimizations to the PCB design to reduce costs or improve manufacturability. Consider alternative materials, layer configurations, and design changes.

Gerber Data: {{{gerberData}}}
PCB Specifications: {{{pcbSpecifications}}}
Analysis Results: {{{analysisResults}}}

Suggest Optimizations:`,
});

const suggestPcbOptimizationsFlow = ai.defineFlow(
  {
    name: 'suggestPcbOptimizationsFlow',
    inputSchema: SuggestPcbOptimizationsInputSchema,
    outputSchema: SuggestPcbOptimizationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
