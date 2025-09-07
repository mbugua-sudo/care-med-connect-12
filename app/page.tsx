export default function HomePage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <a href="/chat" className="block rounded-xl border bg-white p-6 shadow hover:shadow-md transition">
        <h2 className="text-xl font-semibold mb-2">Chat</h2>
        <p className="text-sm text-gray-600">Ask questions and get answers with document context.</p>
      </a>
      <a href="/upload" className="block rounded-xl border bg-white p-6 shadow hover:shadow-md transition">
        <h2 className="text-xl font-semibold mb-2">Upload</h2>
        <p className="text-sm text-gray-600">Add new documents to your knowledge base.</p>
      </a>
    </div>
  );
}

