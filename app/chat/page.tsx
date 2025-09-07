'use client';

import { useState } from 'react';

type Mode = 'general' | 'fast' | 'deep';

export default function ChatPage() {
  const [question, setQuestion] = useState('');
  const [mode, setMode] = useState<Mode>('general');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  async function handleAsk() {
    setLoading(true);
    setAnswer('');
    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, mode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Error');
      setAnswer(data.answer);
    } catch (e: unknown) {
      setAnswer('Error fetching answer. Check console.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSpeak() {
    if (!answer) return;
    setSpeaking(true);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: answer }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as any)?.error || 'TTS error');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => URL.revokeObjectURL(url);
      audio.play();
    } catch (e) {
      console.error(e);
    } finally {
      setSpeaking(false);
    }
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-xl border bg-white p-6 shadow">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Question</label>
          <textarea
            className="min-h-[120px] w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Ask anything..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <label className="text-sm">Mode</label>
            <select
              className="rounded-md border px-3 py-2"
              value={mode}
              onChange={(e) => setMode(e.target.value as Mode)}
            >
              <option value="general">General (gpt-5)</option>
              <option value="fast">Fast (gpt-5-nano)</option>
              <option value="deep">Deep (o4-mini-deep-research)</option>
            </select>
            <button
              className="ml-auto rounded-md bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700 disabled:opacity-60"
              onClick={handleAsk}
              disabled={loading || !question.trim()}
            >
              {loading ? 'Asking…' : 'Ask'}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Answer</h2>
          <button
            className="rounded-md border px-3 py-1.5 hover:bg-gray-50 disabled:opacity-60"
            onClick={handleSpeak}
            disabled={!answer || speaking}
          >
            {speaking ? 'Speaking…' : 'Speak Answer'}
          </button>
        </div>
        <pre className="whitespace-pre-wrap text-sm text-gray-800">{answer || 'Your answer will appear here.'}</pre>
      </div>
    </div>
  );
}

