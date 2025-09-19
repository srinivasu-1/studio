'use server';

import {
  recommendPlacesOfInterest,
  RecommendPlacesOfInterestInput,
  RecommendPlacesOfInterestOutput,
} from '@/ai/flows/recommend-places-of-interest';

export async function getRecommendations(
  input: RecommendPlacesOfInterestInput
): Promise<RecommendPlacesOfInterestOutput> {
  const result = await recommendPlacesOfInterest(input);
  return result;
}
