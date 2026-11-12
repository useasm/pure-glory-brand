import { useState } from 'react';
import { InfoPage } from './InfoPage';
import { Button } from '../../components/ui/Button';
import { TelegramIcon } from '../../components/ui/SocialIcons';
import { SIZE_CATEGORIES } from '../../data/sizeGuide';
import {
  TShirtDiagram,
  ShirtDiagram,
  HoodieDiagram,
  JacketDiagram,
  TrousersDiagram,
} from '../../components/size-guide/GarmentDiagrams';

const DIAGRAMS: Record<string, React.ComponentType> = {
  tshirts: TShirtDiagram,
  shirts: ShirtDiagram,
  hoodies: HoodieDiagram,
  jackets: JacketDiagram,
  trousers: TrousersDiagram,
};

export function SizeGuidePage() {
  const [active, setActive] = useState(SIZE_CATEGORIES[0].key);
  const category = SIZE_CATEGORIES.find((c) => c.key === active)!;
  const Diagram = DIAGRAMS[category.key];

  return (
    <InfoPage
      title="Size guide"
      eyebrow="Orders"
      lead="All measurements are in centimetres, taken from the finished garment laid flat. The letters on the diagram match the table columns."
      narrow={false}
    >
      <div
        className="flex flex-wrap gap-2 pb-8"
        style={{ borderBottom: '1px solid var(--border-hairline)' }}
      >
        {SIZE_CATEGORIES.map((c) => {
          const isActive = c.key === active;
          return (
            <button
              key={c.key}
              className="eyebrow cursor-pointer px-4 py-2.5"
              style={{
                background: isActive ? 'var(--pg-ink)' : 'transparent',
                color: isActive ? 'var(--pg-ivory)' : 'var(--text-secondary)',
                border: `1px solid ${isActive ? 'var(--pg-ink)' : 'var(--border-hairline-strong)'}`,
                transition:
                  'background-color var(--dur-fast) var(--ease-editorial), color var(--dur-fast) var(--ease-editorial), border-color var(--dur-fast) var(--ease-editorial)',
              }}
              onClick={() => setActive(c.key)}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="anim-fade-up grid gap-10 pt-10 lg:grid-cols-[minmax(260px,380px)_1fr]" key={category.key}>
        <div>
          <div className="eyebrow mb-5" style={{ color: 'var(--text-muted)' }}>
            How it is measured — {category.label}
          </div>
          <div
            className="flex items-center justify-center p-8"
            style={{
              border: '1px solid var(--border-hairline)',
              background: 'var(--surface-card)',
              color: 'var(--pg-graphite)',
            }}
          >
            <Diagram />
          </div>
          <ul
            className="m-0 mt-5 flex list-none flex-col gap-2 p-0"
            style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}
          >
            {category.measures.map((m) => (
              <li key={m.letter} className="flex items-center gap-3">
                <span
                  className="flex h-6 w-6 items-center justify-center"
                  style={{
                    border: '1px solid var(--border-hairline-strong)',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: 'var(--fs-micro)',
                  }}
                >
                  {m.letter}
                </span>
                {m.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-5" style={{ color: 'var(--text-muted)' }}>
            Sizes, cm
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" style={{ fontSize: 'var(--fs-small)' }}>
              <thead>
                <tr>
                  <th
                    className="eyebrow px-3 py-3 pl-0 text-left"
                    style={{
                      color: 'var(--text-muted)',
                      fontWeight: 500,
                      borderBottom: '1px solid var(--border-hairline-strong)',
                    }}
                  >
                    Size
                  </th>
                  {category.measures.map((m) => (
                    <th
                      key={m.letter}
                      className="eyebrow px-3 py-3 text-right"
                      style={{
                        color: 'var(--text-muted)',
                        fontWeight: 500,
                        borderBottom: '1px solid var(--border-hairline-strong)',
                      }}
                    >
                      {m.letter} — {m.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {category.rows.map((row) => (
                  <tr
                    key={row.size}
                    style={{ transition: 'background-color var(--dur-fast) var(--ease-editorial)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--pg-bone)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td
                      className="px-3 py-3.5 pl-0"
                      style={{ fontWeight: 500, borderBottom: '1px solid var(--border-hairline)' }}
                    >
                      {row.size}
                    </td>
                    {row.values.map((v, i) => (
                      <td
                        key={i}
                        className="px-3 py-3.5 text-right"
                        style={{ borderBottom: '1px solid var(--border-hairline)' }}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4" style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-muted)' }}>
            Tolerance ±1–1.5 cm: every piece is sewn and painted by hand.
          </p>
        </div>
      </div>

      <div
        className="mt-14 flex flex-col items-start gap-5 p-8 md:flex-row md:items-center md:justify-between"
        data-dark-zone
        style={{ background: 'var(--surface-inverse)', color: 'var(--text-inverse)' }}
      >
        <div className="max-w-2xl">
          <div className="font-display mb-2" style={{ fontSize: 'var(--fs-heading-l)' }}>
            Need exact measurements?
          </div>
          <p className="m-0" style={{ color: 'var(--text-inverse-muted)', fontSize: 'var(--fs-small)', lineHeight: 'var(--lh-body)' }}>
            If you need the measurements of a specific piece, message me on
            Telegram. I’ll measure it by hand and send you the numbers before
            you buy.
          </p>
        </div>
        <a href="https://t.me/pureglorybrand" className="shrink-0 no-underline">
          <Button
            variant="secondary"
            style={{ color: 'var(--pg-ivory)', borderColor: 'var(--border-hairline-inverse)' }}
          >
            <TelegramIcon />
            Message on Telegram
          </Button>
        </a>
      </div>
    </InfoPage>
  );
}
