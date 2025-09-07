import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text: string = (body?.text ?? '').toString();
    if (!text) {
      return NextResponse.json({ error: 'text is required' }, { status: 400 });
    }

    const result = await openai.audio.speech.create({
      model: 'tts-1-hd',
      voice: 'alloy',
      input: text,
      format: 'mp3',
    } as any);

    const buffer = Buffer.from(await result.arrayBuffer());
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

