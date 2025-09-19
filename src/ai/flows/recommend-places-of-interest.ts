'use server';
/**
 * @fileOverview An AI agent that recommends places of interest to a traveler.
 *
 * - recommendPlacesOfInterest - A function that recommends places of interest.
 * - RecommendPlacesOfInterestInput - The input type for the recommendPlacesOfInterest function.
 * - RecommendPlacesOfInterestOutput - The return type for the recommendPlacesOfInterest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendPlacesOfInterestInputSchema = z.object({
  currentLocation: z
    .string()
    .describe('The current location of the traveler.'),
  pastTravelHistory: z
    .string()
    .describe('The past travel history of the traveler.'),
  statedPreferences: z
    .string()
    .describe('The stated preferences of the traveler.'),
  realTimeWeatherConditions: z
    .string()
    .describe('The real-time weather conditions at the current location.'),
  timeOfDay: z.string().describe('The time of day.'),
});
export type RecommendPlacesOfInterestInput = z.infer<
  typeof RecommendPlacesOfInterestInputSchema
>;

const RecommendPlacesOfInterestOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of recommended places of interest.'),
});
export type RecommendPlacesOfInterestOutput = z.infer<
  typeof RecommendPlacesOfInterestOutputSchema
>;

export async function recommendPlacesOfInterest(
  input: RecommendPlacesOfInterestInput
): Promise<RecommendPlacesOfInterestOutput> {
  return recommendPlacesOfInterestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendPlacesOfInterestPrompt',
  input: {schema: RecommendPlacesOfInterestInputSchema},
  output: {schema: RecommendPlacesOfInterestOutputSchema},
  prompt: `You are a travel expert. Based on the traveler's current location, past travel history, stated preferences, real-time weather conditions, and the time of day, recommend places of interest.

Current location: {{{currentLocation}}}
Past travel history: {{{pastTravelHistory}}}
Stated preferences: {{{statedPreferences}}}
Real-time weather conditions: {{{realTimeWeatherConditions}}}
Time of day: {{{timeOfDay}}}

Recommendations:`,
});

const recommendPlacesOfInterestFlow = ai.defineFlow(
  {
    name: 'recommendPlacesOfInterestFlow',
    inputSchema: RecommendPlacesOfInterestInputSchema,
    outputSchema: RecommendPlacesOfInterestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
