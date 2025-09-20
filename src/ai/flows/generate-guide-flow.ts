'use server';
/**
 * @fileOverview An AI agent that generates a travel guide for a given query.
 *
 * - generateGuide - A function that generates a travel guide.
 * - GenerateGuideInput - The input type for the generateGuide function.
 * - GenerateGuideOutput - The return type for the generateGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGuideInputSchema = z.object({
  query: z.string().describe('The user\'s query for a travel guide.'),
});
export type GenerateGuideInput = z.infer<typeof GenerateGuideInputSchema>;

const GenerateGuideOutputSchema = z.object({
  title: z.string().describe('The title of the travel guide.'),
  description: z.string().describe('A one-paragraph summary of the guide.'),
  highlights: z.array(z.string()).describe('A list of 3-5 key highlights or attractions, each as a short, compelling sentence.'),
});
export type GenerateGuideOutput = z.infer<typeof GenerateGuideOutputSchema>;

export async function generateGuide(
  input: GenerateGuideInput
): Promise<GenerateGuideOutput> {
  return generateGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateGuidePrompt',
  input: {schema: GenerateGuideInputSchema},
  output: {schema: GenerateGuideOutputSchema},
  prompt: `You are an expert travel guide writer. A user wants a travel guide about "{{{query}}}".

Generate a concise and engaging travel guide based on their query. Provide the following:
- A clear, catchy title for the guide.
- A one-paragraph summary.
- A list of 3 to 5 key highlights or attractions. Each highlight should be a short, single sentence that is compelling and easy to read.

Ensure the content is focused on travel within India.
`,
});

const generateGuideFlow = ai.defineFlow(
  {
    name: 'generateGuideFlow',
    inputSchema: GenerateGuideInputSchema,
    outputSchema: GenerateGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
