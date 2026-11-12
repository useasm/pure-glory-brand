interface TagProps {
  variant?: 'outline' | 'solid' | 'accent';
  children: React.ReactNode;
  className?: string;
}

export function Tag({ variant = 'outline', children, className = '' }: TagProps) {
  return <span className={`tag tag--${variant} ${className}`}>{children}</span>;
}
