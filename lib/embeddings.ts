import { openai } from './openai';

export async function embedTextLarge(text: string): Promise<number[]> {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-large',
    input: text,
  });
  const vector = res.data[0]?.embedding ?? [];
  return vector;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i++) {
    const ai = a[i];
    const bi = b[i];
    dot += ai * bi;
    magA += ai * ai;
    magB += bi * bi;
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom === 0 ? 0 : dot / denom;
}

