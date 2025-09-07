'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function handleUpload() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Upload error');
      setResult(`Uploaded with id: ${data.id}`);
      setName('');
      setContent('');
    } catch (e: unknown) {
      console.error(e);
      setResult('Failed to upload. See console.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-xl border bg-white p-6 shadow">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Name</label>
            <input
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Document name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Content</label>
            <textarea
              className="min-h-[200px] w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Paste document text here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              className="rounded-md bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700 disabled:opacity-60"
              onClick={handleUpload}
              disabled={loading || !name.trim() || !content.trim()}
            >
              {loading ? 'Uploading…' : 'Upload'}
            </button>
            {result && <span className="text-sm text-gray-600">{result}</span>}
          </div>
        </div>
      </div>
      <div className="rounded-xl border bg-white p-6 shadow">
        <p className="text-sm text-gray-600">Currently only raw text content is accepted. PDF/DOCX parsing can be added later.</p>
      </div>
    </div>
  );
}

