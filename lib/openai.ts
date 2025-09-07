import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  // Avoid throwing at import-time in tooling; API routes can validate
  console.warn('OPENAI_API_KEY is not set. Set it in .env');
}

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export type QueryMode = 'general' | 'fast' | 'deep';

export function resolveModelFromMode(mode: QueryMode | undefined): string {
  if (mode === 'fast') return 'gpt-5-nano';
  if (mode === 'deep') return 'o4-mini-deep-research';
  return 'gpt-5';
}

