
import { ReactNode } from 'react';

type Variant = 'default' | 'success' | 'danger' | 'warning' | 'info' | 'neutral' | 'primary';

interface Props {
  children: ReactNode;
  variant?: Variant;
}

const VARIANTS: Record<Variant, string> = {
  default: 'bg-slate-100 text-slate-700',
  neutral: 'bg-slate-100 text-slate-600',
  success: 'bg-green-100 text-green-700',
  danger: 'bg-red-100 text-red-700',
  warning: 'bg-orange-100 text-orange-700',
  info: 'bg-blue-100 text-blue-700',
  primary: 'bg-orange-100 text-orange-700',
};

export function Badge({ children, variant = 'default' }: Props) {
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5
        text-xs font-medium rounded-full
        ${VARIANTS[variant]}
      `}
    >
      {children}
    </span>
  );
}