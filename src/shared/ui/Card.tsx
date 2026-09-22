
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

const PADDINGS = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export function Card({ children, className = '', padding = 'md' }: Props) {
  return (
    <div
      className={`
        bg-white rounded-xl border border-slate-200 shadow-sm
        ${PADDINGS[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}