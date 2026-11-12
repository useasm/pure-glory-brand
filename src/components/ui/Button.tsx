import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'm' | 's';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = 'primary',
  size = 'm',
  className = '',
  ...rest
}: ButtonProps) {
  const sizeClass = variant === 'ghost' ? '' : `btn--${size}`;
  return (
    <button
      className={`btn btn--${variant} ${sizeClass} ${className}`}
      {...rest}
    />
  );
}
