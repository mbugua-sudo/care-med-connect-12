import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { embedTextLarge } from '@/lib/embeddings';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name: string = (body?.name ?? '').toString();
    const content: string = (body?.content ?? '').toString();

    if (!name || !content) {
      return NextResponse.json({ error: 'name and content are required' }, { status: 400 });
    }

    const embedding = await embedTextLarge(content);

    const doc = await prisma.document.create({
      data: { name, content, embedding },
    });

    return NextResponse.json({ id: doc.id });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

