import React from 'react';

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`card-glass rounded-xl p-4 shadow-glass ${className}`}>{children}</div>
  );
}