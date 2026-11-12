const WEEKS = [
  { label: 'May 19', value: 46 },
  { label: 'May 26', value: 61 },
  { label: 'Jun 2', value: 38 },
  { label: 'Jun 9', value: 74 },
  { label: 'Jun 16', value: 58 },
  { label: 'Jun 23', value: 89 },
  { label: 'Jun 30', value: 67 },
  { label: 'Jul 7', value: 96 },
];

export function SalesChart() {
  const max = Math.max(...WEEKS.map((w) => w.value));
  return (
    <div
      className="p-5"
      style={{ border: '1px solid var(--border-hairline)', background: 'var(--surface-card)' }}
    >
      <div className="mb-6 flex items-baseline justify-between">
        <div className="eyebrow" style={{ color: 'var(--text-muted)' }}>
          Sales, 8 weeks
        </div>
        <div style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-muted)' }}>
          k ₽ / week
        </div>
      </div>
      <div className="flex items-end gap-2 sm:gap-3">
        {WEEKS.map((week, i) => (
          <div key={week.label} className="group flex flex-1 flex-col items-center justify-end gap-2">
            <div
              className="relative w-full"
              style={{
                height: Math.round((week.value / max) * 150),
                background: i === WEEKS.length - 1 ? 'var(--pg-oxblood)' : 'var(--pg-ink)',
                opacity: i === WEEKS.length - 1 ? 1 : 0.85,
                transformOrigin: 'bottom',
                animation: `pg-fade-up var(--dur-base) var(--ease-editorial) both`,
                animationDelay: `${i * 70}ms`,
                transition: 'opacity var(--dur-fast) var(--ease-editorial)',
              }}
              title={`${week.value}k ₽`}
            />
            <span style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-muted)' }}>
              {week.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
