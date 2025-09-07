# Next AI Docs

Upload, search, and chat with your documents using Next.js 14, Prisma (SQLite), and OpenAI (chat, embeddings, TTS).

## Features

- **Stack**: Next.js 14 App Router + TypeScript + TailwindCSS
- **Database**: SQLite via Prisma ORM
- **Upload**: Store id, name, content, embedding
- **Embeddings**: `text-embedding-3-large` stored as JSON array
- **Search**: Cosine similarity in TypeScript
- **Chat**: Modes map to models: general → gpt-5, fast → gpt-5-nano, deep → o4-mini-deep-research
- **TTS**: `tts-1-hd` voice `alloy` → MP3

## Getting Started

1) Install dependencies
```bash
npm install
```

2) Create `.env` from example and set keys
```bash
cp .env.example .env
# Edit .env
# OPENAI_API_KEY=sk-...
# DATABASE_URL="file:./dev.db"
```

3) Initialize Prisma and database
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4) Run the dev server
```bash
npm run dev
```

Open `http://localhost:3000`.

## API

- **POST** `/api/upload`
  - Body: `{ name: string, content: string }`
  - Creates `Document` with `text-embedding-3-large` embedding
- **POST** `/api/query`
  - Body: `{ question: string, mode?: 'general'|'fast'|'deep' }`
  - Retrieves top 3 similar documents and queries selected model
- **POST** `/api/tts`
  - Body: `{ text: string }`
  - Returns MP3 audio buffer

## Prisma Schema

```prisma
model Document {
  id        String   @id @default(cuid())
  name      String
  content   String
  embedding Json
  createdAt DateTime @default(now())
}
```

## Notes

- For demo scale, similarity is computed in-process from all documents. For large datasets, use a vector DB.
- Currently only text input is supported. Add PDF/DOCX parsing later.
