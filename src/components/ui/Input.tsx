import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', ...rest }: InputProps) {
  return (
    <label className="flex flex-col gap-2" style={{ fontFamily: 'var(--font-sans)' }}>
      {label && (
        <span className="eyebrow" style={{ color: 'var(--text-muted)' }}>
          {label}
        </span>
      )}
      <input className={`input-underline ${className}`} {...rest} />
    </label>
  );
}

interface NewsletterInputProps {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  /** inverse is for dark surfaces (footer) */
  tone?: 'default' | 'inverse';
}

export function NewsletterInput({
  placeholder = 'your email',
  onSubmit,
  tone = 'default',
}: NewsletterInputProps) {
  const inverse = tone === 'inverse';
  const textColor = inverse ? 'var(--text-inverse)' : 'var(--text-primary)';
  return (
    <form
      className="flex items-end gap-4 pb-2.5"
      style={{
        borderBottom: `1px solid ${
          inverse ? 'var(--border-hairline-inverse)' : 'var(--border-hairline-strong)'
        }`,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        const input = e.currentTarget.elements.namedItem(
          'email',
        ) as HTMLInputElement;
        onSubmit?.(input.value);
        input.value = '';
      }}
    >
      <input
        name="email"
        type="email"
        required
        placeholder={placeholder}
        className="font-display flex-1 border-none bg-transparent outline-none"
        style={{ fontSize: 'var(--fs-heading-m)', color: textColor }}
      />
      <button
        type="submit"
        className="eyebrow cursor-pointer border-none bg-transparent pb-1"
        style={{
          color: textColor,
          borderBottom: `1px solid ${textColor}`,
        }}
      >
        Subscribe
      </button>
    </form>
  );
}
