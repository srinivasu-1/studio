'use server';

import 'dotenv/config';

import {
  recommendPlacesOfInterest,
  RecommendPlacesOfInterestInput,
  RecommendPlacesOfInterestOutput,
} from '@/ai/flows/recommend-places-of-interest';

import {
    generateGuide,
    GenerateGuideInput,
    GenerateGuideOutput,
} from '@/ai/flows/generate-guide-flow';

export async function getRecommendations(
  input: RecommendPlacesOfInterestInput
): Promise<RecommendPlacesOfInterestOutput> {
  const result = await recommendPlacesOfInterest(input);
  return result;
}

export async function getGuide(
    input: GenerateGuideInput
): Promise<GenerateGuideOutput> {
    const result = await generateGuide(input);
    return result;
}
