'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing Gerber files for Design for Manufacturability (DFM) issues using AI.
 *
 * - analyzeGerberForDfmIssues - A function that initiates the DFM analysis process.
 * - AnalyzeGerberForDfmIssuesInput - The input type for the analyzeGerberForDfmIssues function, including Gerber file data.
 * - AnalyzeGerberForDfmIssuesOutput - The return type for the analyzeGerberForDfmIssues function, providing a DFM analysis report.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeGerberForDfmIssuesInputSchema = z.object({
  gerberDataUri: z
    .string()
    .describe(
      'The Gerber file data as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
  specifications: z
    .string()
    .optional()
    .describe('Additional specifications and requirements for the PCB.'),
});
export type AnalyzeGerberForDfmIssuesInput = z.infer<typeof AnalyzeGerberForDfmIssuesInputSchema>;

const AnalyzeGerberForDfmIssuesOutputSchema = z.object({
  dfmAnalysisReport: z.string().describe('A detailed report of potential DFM issues found in the Gerber files.'),
});
export type AnalyzeGerberForDfmIssuesOutput = z.infer<typeof AnalyzeGerberForDfmIssuesOutputSchema>;

export async function analyzeGerberForDfmIssues(input: AnalyzeGerberForDfmIssuesInput): Promise<AnalyzeGerberForDfmIssuesOutput> {
  return analyzeGerberForDfmIssuesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dfmAnalysisPrompt',
  input: {schema: AnalyzeGerberForDfmIssuesInputSchema},
  output: {schema: AnalyzeGerberForDfmIssuesOutputSchema},
  prompt: `You are an expert in Design for Manufacturability (DFM) for printed circuit boards (PCBs). Analyze the provided Gerber file data for potential manufacturing issues.

  Gerber File Data: {{media url=gerberDataUri}}

  Specifications: {{{specifications}}}

  Identify any potential problems that could arise during manufacturing, such as insufficient spacing, trace width violations, drill size limitations, or other common DFM concerns. Provide a detailed report of your findings, including specific locations and descriptions of each issue.
  Focus on critical manufacturability issues that could impact the yield and reliability of the final PCB.
`,
});

const analyzeGerberForDfmIssuesFlow = ai.defineFlow(
  {
    name: 'analyzeGerberForDfmIssuesFlow',
    inputSchema: AnalyzeGerberForDfmIssuesInputSchema,
    outputSchema: AnalyzeGerberForDfmIssuesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
