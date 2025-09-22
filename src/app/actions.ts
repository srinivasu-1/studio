'use server';

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

import {
    chat,
    ChatInput,
    ChatOutput
} from '@/ai/flows/chat-flow';

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

export async function getChatReply(
    input: ChatInput
): Promise<ChatOutput> {
    const result = await chat(input);
    return result;
}
