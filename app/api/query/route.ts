import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cosineSimilarity, embedTextLarge } from '@/lib/embeddings';
import { openai, resolveModelFromMode, type QueryMode } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const question: string = (body?.question ?? '').toString();
    const mode: QueryMode = (body?.mode ?? 'general') as QueryMode;
    if (!question) {
      return NextResponse.json({ error: 'question is required' }, { status: 400 });
    }

    // Embed question
    const qEmbedding = await embedTextLarge(question);

    // Fetch all docs (small demo scale). For larger datasets, use a vector DB.
    const docs = await prisma.document.findMany();

    const scored = docs.map(d => ({
      doc: d,
      score: cosineSimilarity(qEmbedding, (d.embedding as unknown as number[]) ?? []),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

    const context = scored.map(s => `Document: ${s.doc.name}\n${s.doc.content}`).join('\n\n---\n\n');

    const model = resolveModelFromMode(mode);

    const messages = [
      { role: 'system', content: 'You are a helpful assistant. Use the provided documents as context when relevant. If the answer is not in the context, answer based on your general knowledge and say when you are unsure.' },
      { role: 'user', content: `Context:\n${context}\n\nQuestion: ${question}` },
    ] as const;

    const chat = await openai.chat.completions.create({
      model,
      messages,
      temperature: 0.2,
    });

    const answer = chat.choices[0]?.message?.content ?? '';

    return NextResponse.json({ answer, topDocs: scored.map(s => ({ id: s.doc.id, name: s.doc.name, score: s.score })) });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

