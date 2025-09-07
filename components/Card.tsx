import type { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow">
      {children}
    </div>
  );
}

