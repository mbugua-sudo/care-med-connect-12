import React, { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

type DocumentRow = {
  id: number
  filename: string
  filetype: string
  text_path?: string
  ocr_used: boolean
  created_at: string
}

type QueryMessage = {
  role: 'user' | 'assistant'
  content: string
  meta?: any
}

export default function App() {
  const [documents, setDocuments] = useState<DocumentRow[]>([])
  const [indexInfo, setIndexInfo] = useState<any>(null)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<QueryMessage[]>([])
  const [deep, setDeep] = useState(false)
  const [voice, setVoice] = useState(false)
  const [genImage, setGenImage] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [building, setBuilding] = useState(false)
  const fileRef = useRef<HTMLInputElement | null>(null)

  async function refresh() {
    const [docs, idx] = await Promise.all([
      axios.get(`${API_BASE}/documents`).then(r => r.data.documents),
      axios.get(`${API_BASE}/index-info`).then(r => r.data),
    ])
    setDocuments(docs)
    setIndexInfo(idx)
  }

  useEffect(() => { refresh() }, [])

  async function handleUpload() {
    const file = fileRef.current?.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      await axios.post(`${API_BASE}/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      await refresh()
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  async function handleBuildIndex() {
    setBuilding(true)
    try {
      await axios.post(`${API_BASE}/build-index`, { rebuild: true })
      await refresh()
    } finally { setBuilding(false) }
  }

  async function handleAsk() {
    if (!question.trim()) return
    const userMsg: QueryMessage = { role: 'user', content: question }
    setMessages(m => [...m, userMsg])
    setQuestion('')
    const resp = await axios.post(`${API_BASE}/query`, { question: userMsg.content, deep, voice, generate_image: genImage })
    const data = resp.data.data
    const answerMsg: QueryMessage = { role: 'assistant', content: data.answer, meta: data }
    setMessages(m => [...m, answerMsg])
  }

  const lastAnswer = useMemo(() => messages.filter(m => m.role === 'assistant').slice(-1)[0], [messages])

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Document Research & Q&A</h1>
        <div className="text-sm text-gray-600">API: {API_BASE}</div>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-4 rounded-lg border bg-white shadow-sm">
          <h2 className="font-medium mb-2">Upload</h2>
          <input ref={fileRef} type="file" className="block w-full text-sm" />
          <button onClick={handleUpload} disabled={uploading} className="mt-3 px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50">{uploading ? 'Uploading…' : 'Upload'}</button>
        </div>

        <div className="p-4 rounded-lg border bg-white shadow-sm">
          <h2 className="font-medium mb-2">Build Index</h2>
          <div className="text-sm text-gray-700">{indexInfo?.exists ? `Index vectors: ${indexInfo?.num_vectors}` : 'No index yet'}</div>
          <button onClick={handleBuildIndex} disabled={building} className="mt-3 px-3 py-2 rounded bg-emerald-600 text-white disabled:opacity-50">{building ? 'Building…' : 'Build Index'}</button>
        </div>

        <div className="p-4 rounded-lg border bg-white shadow-sm">
          <h2 className="font-medium mb-2">Options</h2>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={deep} onChange={e => setDeep(e.target.checked)} /> Deep reasoning</label>
          <label className="flex items-center gap-2 text-sm mt-2"><input type="checkbox" checked={genImage} onChange={e => setGenImage(e.target.checked)} /> Generate diagram</label>
          <label className="flex items-center gap-2 text-sm mt-2"><input type="checkbox" checked={voice} onChange={e => setVoice(e.target.checked)} /> Voice output</label>
          {lastAnswer?.meta?.image_path && (
            <a href={`${API_BASE}${lastAnswer.meta.image_path.startsWith('/')?'': '/'}${lastAnswer.meta.image_path}`} target="_blank" className="block text-blue-600 underline text-sm mt-3">Download image</a>
          )}
          {lastAnswer?.meta?.tts_audio_path && (
            <audio controls className="mt-3 w-full"><source src={`${API_BASE}${lastAnswer.meta.tts_audio_path.startsWith('/')?'': '/'}${lastAnswer.meta.tts_audio_path}`} type="audio/mpeg" /></audio>
          )}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-4 rounded-lg border bg-white shadow-sm">
          <h2 className="font-medium mb-3">Chat</h2>
          <div className="space-y-2 max-h-96 overflow-auto border rounded p-3 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={`inline-block px-3 py-2 rounded ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>{m.content}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input value={question} onChange={e => setQuestion(e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="Ask a question…" />
            <button onClick={handleAsk} className="px-3 py-2 rounded bg-indigo-600 text-white">Ask</button>
          </div>
        </div>
        <div className="p-4 rounded-lg border bg-white shadow-sm">
          <h2 className="font-medium mb-3">Files</h2>
          <ul className="space-y-2 max-h-96 overflow-auto">
            {documents.map(d => (
              <li key={d.id} className="text-sm">
                <div className="font-medium">{d.filename}</div>
                <div className="text-gray-600">{d.filetype} {d.ocr_used ? '(OCR)' : ''}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="p-4 rounded-lg border bg-white shadow-sm">
        <h2 className="font-medium mb-2">Export</h2>
        <div className="flex gap-2">
          <a className="px-3 py-2 rounded bg-gray-800 text-white" href={`${API_BASE}/export`} onClick={e => e.preventDefault()}>Use buttons:</a>
          <a className="px-3 py-2 rounded bg-gray-700 text-white" href={`${API_BASE}/export?format=csv`} target="_blank">CSV</a>
          <a className="px-3 py-2 rounded bg-gray-700 text-white" href={`${API_BASE}/export?format=xlsx`} target="_blank">XLSX</a>
        </div>
      </section>
    </div>
  )
}

