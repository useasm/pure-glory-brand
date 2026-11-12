import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  text?: string;
  action?: ReactNode;
}

export function EmptyState({ title, text, action }: EmptyStateProps) {
  return (
    <div className="anim-fade-up flex flex-col items-center gap-4 py-16 text-center">
      <div
        className="font-display"
        style={{ fontSize: 'var(--fs-display-m)', color: 'var(--text-primary)' }}
      >
        {title}
      </div>
      {text && (
        <p
          className="m-0 max-w-sm"
          style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}
        >
          {text}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
