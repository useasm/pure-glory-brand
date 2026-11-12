import { useState, type ReactNode } from 'react';

export interface Column<T> {
  key: string;
  title: string;
  render: (row: T) => ReactNode;
  align?: 'left' | 'right';
}

interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  /** makes rows clickable and shows the action label on hover */
  onRowClick?: (row: T) => void;
  rowActionLabel?: string;
}

export function Table<T>({
  columns,
  rows,
  rowKey,
  onRowClick,
  rowActionLabel = 'Open',
}: TableProps<T>) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse" style={{ fontSize: 'var(--fs-small)' }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="eyebrow px-3 py-3 first:pl-0 last:pr-0"
                style={{
                  color: 'var(--text-muted)',
                  textAlign: col.align ?? 'left',
                  borderBottom: '1px solid var(--border-hairline-strong)',
                  fontWeight: 500,
                }}
              >
                {col.title}
              </th>
            ))}
            {onRowClick && (
              <th style={{ borderBottom: '1px solid var(--border-hairline-strong)' }} />
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const key = rowKey(row);
            const isHovered = hovered === key;
            return (
              <tr
                key={key}
                onMouseEnter={() => setHovered(key)}
                onMouseLeave={() => setHovered(null)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                style={{
                  cursor: onRowClick ? 'pointer' : 'default',
                  background: isHovered && onRowClick ? 'var(--pg-bone)' : 'transparent',
                  transition: 'background-color var(--dur-fast) var(--ease-editorial)',
                }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-3 py-3.5 first:pl-0 last:pr-0"
                    style={{
                      textAlign: col.align ?? 'left',
                      borderBottom: '1px solid var(--border-hairline)',
                    }}
                  >
                    {col.render(row)}
                  </td>
                ))}
                {onRowClick && (
                  <td
                    className="px-3 py-3.5 pr-0 text-right"
                    style={{ borderBottom: '1px solid var(--border-hairline)', width: 90 }}
                  >
                    <span
                      className="eyebrow whitespace-nowrap"
                      style={{
                        color: 'var(--pg-oxblood)',
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateX(0)' : 'translateX(-6px)',
                        display: 'inline-block',
                        transition:
                          'opacity var(--dur-fast) var(--ease-editorial), transform var(--dur-fast) var(--ease-editorial)',
                      }}
                    >
                      {rowActionLabel} →
                    </span>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
