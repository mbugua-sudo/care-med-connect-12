import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Next AI Docs',
  description: 'Upload, search, and chat with your documents',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold">
              Next AI Docs
            </Link>
            <nav className="flex items-center gap-4">
              <Link className="text-sm text-gray-600 hover:text-gray-900" href="/chat">Chat</Link>
              <Link className="text-sm text-gray-600 hover:text-gray-900" href="/upload">Upload</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl p-4">{children}</main>
      </body>
    </html>
  );
}

