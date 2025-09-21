function getGeminiApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set in the environment variables.');
    // In a real app, you might throw an error or have a better handling mechanism.
    // For this context, returning an empty string to avoid crashing the server on startup.
    return '';
  }
  return apiKey;
}

export const GEMINI_API_KEY = getGeminiApiKey();
