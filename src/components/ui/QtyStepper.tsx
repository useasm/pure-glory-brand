interface QtyStepperProps {
  value: number;
  onChange: (next: number) => void;
}

export function QtyStepper({ value, onChange }: QtyStepperProps) {
  const btn =
    'h-7 w-7 cursor-pointer border-none bg-transparent leading-none';
  return (
    <div
      className="inline-flex items-center"
      style={{ border: '1px solid var(--border-hairline-strong)' }}
    >
      <button
        className={btn}
        aria-label="Decrease"
        onClick={() => onChange(value - 1)}
      >
        −
      </button>
      <span
        className="min-w-7 text-center"
        style={{ fontSize: 'var(--fs-small)' }}
      >
        {value}
      </span>
      <button
        className={btn}
        aria-label="Increase"
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}
